import dayjs from 'dayjs';
import localStorageUtil from './localStorageUtil';
import { freshToken } from '@/services/ant-design-pro/api';

// if token will expire in 5 minutes, refresh token
const TOKEN_CHECK_IN_ADVANCE_MINUTE = 10;
const ONE_MINUTE = 60 * 1000;

const isAccessTokenExpired = () => {
  const accessTokenExpiration = localStorageUtil.get(
    localStorageUtil.JwtTokenEnum.accessTokenExpiration,
  );

  const currentTime = dayjs().valueOf();
  const tokenTimeLeftMinutes = (+accessTokenExpiration! - currentTime) / ONE_MINUTE;
  console.debug('jwt token time left:', tokenTimeLeftMinutes);

  return tokenTimeLeftMinutes < TOKEN_CHECK_IN_ADVANCE_MINUTE;
};

// refresh token and return the new access token;
const refreshTokenAndGetNewToken = async () => {
  try {
    const response = await freshToken();

    if (response.success === true) {
      const loginResult = response.data;
      localStorageUtil.setAllJwtToken(loginResult);
      return loginResult.accessToken;
    }
  } catch (error) {
    // Code will execute here after {@link requestErrorConfig.responseInterceptors}
    // as refreshToken is a hidden operation, no need to show any error message for the user
    console.error('refresh token failed:', error);
  }

  return undefined;
};

export { isAccessTokenExpired, refreshTokenAndGetNewToken };
