// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import localStorageUtil from '@/utils/localStorageUtil';

export const URL_PATH = {
  login: '/user/login/login',
  refreshToken: '/user/login/refreshToken',
};

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
    // }>('/api/currentUser', {
  }>(`/api/user/login/currentUser`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/user/login/outLogin`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  // return request<API.LoginResult>('/api/login/account', {
  return request<API.BeResponseLoginResult>(`/api${URL_PATH.login}`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>(`/api/notices`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.BeResponse>(`/api/demo/rule/selectPage`, {
    // return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  }).then((response) => {
    let ruleList: API.RuleList = {
      total: 0,
      data: [],
      success: response.success,
    };
    if (response.success) {
      // convert to the format defined by RuleList interface in ant-design-pro
      ruleList.total = response.data.total;
      ruleList.data = response.data.list;
    }

    return ruleList;
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>(`/api/demo/rule/`, {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  console.log('addRule options:', options);
  return request<API.BeResponse>(`/api/demo/rule/insert`, {
    // return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    // ...(options || {}),
    data: {
      ...(options || {}),
    },
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/demo/rule`, {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    },
  });
}

/** 刷新token POST /user/login/refreshToken */
export const freshToken = async () => {
  return request<API.BeResponseLoginResult>(`/api${URL_PATH.refreshToken}`, {
    method: 'POST',
    headers: {
      refreshToken: `Bearer ${localStorageUtil.get(localStorageUtil.JwtTokenEnum.refreshToken)}`,
    },
  });
};

/** 错误消息 POST /demo/message/errorMessageDemo */
export const errorMessage = async (errorShowType: number) => {
  return request<API.BeResponse>(`/api/demo/message/errorMessageDemo`, {
    method: 'POST',
    data: { errorShowType },
  });
};
