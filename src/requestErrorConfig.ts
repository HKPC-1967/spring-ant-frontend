import type { RequestOptions } from '@@/plugin-request/request';
// import type { RequestConfig } from '@umijs/max';
import { getIntl, type RequestConfig } from '@umijs/max';
import { message, notification } from '@/api_core/components/MessageProvider';
import localStorageUtil from './utils/localStorageUtil';
import { isAccessTokenExpired, refreshTokenAndGetNewToken } from './utils/refreshTokenUtil';
import { URL_PATH } from '@/services/ant-design-pro/api';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

function handleApplicationLevelErrorCode(data: any, intl: any) {
  const { errorCode, showType } = data;
  const errorMessage = intl.formatMessage({ id: errorCode });

  switch (showType) {
    case ErrorShowType.SILENT:
      // do nothing
      break;
    case ErrorShowType.WARN_MESSAGE:
      message.warning(errorMessage);
      break;
    case ErrorShowType.ERROR_MESSAGE:
      message.error(errorMessage);
      break;
    case ErrorShowType.NOTIFICATION:
      notification.open({
        description: errorMessage,
        message: errorCode,
      });
      break;
    case ErrorShowType.REDIRECT:
      // redirect; can double check any other better implementations
      window.location.href = '/user/login';
      break;
    default:
      message.error(errorMessage);
  }
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // Use this baseURL config if you want to add a pre-path for all requests; Don't use it if you want to connect to multiple backends (each backend has a different pre-path)
  // baseURL: '/api',
  // 请求拦截器 Request Interceptors
  requestInterceptors: [
    async (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。 Intercepts request configuration for personalized processing.
      // const url = config?.url?.concat('?token = 123');
      const url = config?.url;
      let accessToken = localStorageUtil.get(localStorageUtil.JwtTokenEnum.accessToken);

      if (ENABLE_REFRESH_TOKEN) {
        if (url && (url.endsWith(URL_PATH.refreshToken) || url.endsWith(URL_PATH.login))) {
          return config;
        }
        if (accessToken && isAccessTokenExpired()) {
          let accessTokenNew = await refreshTokenAndGetNewToken();
          if (accessTokenNew) {
            accessToken = accessTokenNew;
          }
        }
      }

      config.headers = {
        // ...config.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };

      return config;
    },
  ],

  // 响应拦截器 Response Interceptors
  responseInterceptors: [
    [
      // handle response if no http level error
      async (response) => {
        const url = response?.config?.url;
        if (url && url.endsWith(URL_PATH.refreshToken)) {
          // as refreshToken is a hidden operation, no need to show any message
          return response;
        }

        // 拦截响应数据，进行个性化处理 Intercepts response data for personalized processing
        const { data } = response as unknown as ResponseStructure;
        const intl = getIntl();

        if (data?.success === false) {
          handleApplicationLevelErrorCode(data, intl);
        }
        return response;
      },
      // handle error
      (error: any) => {
        const url = error?.config?.url;
        if (url && url.endsWith(URL_PATH.refreshToken)) {
          // as refreshToken is a hidden operation, no need to show any message
          return Promise.reject(error);
        }

        const axiosErrorCode = error.code;
        const axiosErrorMessage = error.message;
        const responseStatus = error.response?.status;

        // message.destroy();
        const intl = getIntl();
        if (responseStatus !== undefined) {
          //if the error is http error by Axios
          console.log('http response error', error);
          switch (responseStatus) {
            case 0:
            case 403:
              message.error(intl.formatMessage({ id: 'http.' + error.response.status }));
              break;
            default:
              message.error(intl.formatMessage({ id: 'http.others' }));
              break;
          }
        } else if (axiosErrorCode && axiosErrorMessage) {
          // Could be: 1. network failure or maybe the server is totally down (but with umi framework, we tested this error is the same as responseStatus==0 above)   2. axios timeout   3...
          console.error('Axios error:', axiosErrorCode, axiosErrorMessage, error);
          // message.error("Bad network, please try again later"); // you way want to show this, instead of the axiosErrorMessage
          message.error(axiosErrorMessage);
        } else {
          // if the error is by code, NullPointerException, etc.
          console.error('Code error', error);

          // if (REACT_APP_ENV !== 'prod') {
          notification.open({
            description: error.message, // the IT can use this message to check which code is wrong
            message:
              'An small error detected, please report to IT, and you can re-login to reset the error',
          });
          // }
        }

        return Promise.reject(error);
      },
    ],
  ],
};
