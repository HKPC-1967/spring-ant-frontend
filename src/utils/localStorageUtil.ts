enum JwtTokenEnum {
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
  accessTokenExpiration = 'accessTokenExpiration',
  refreshTokenExpiration = 'refreshTokenExpiration',
}

const set = (key: string, value: string | undefined): void => {
  if (value === undefined) {
    console.error(`value is undefined for key: ${key}`);
    return;
  }
  localStorage.setItem(key, value);
};

const get = (key: string): string | null => {
  return localStorage.getItem(key);
};

const remove = (key: string): void => {
  localStorage.removeItem(key);
};

/**
 * remove all keys in {@link JwtTokenEnum}
 */
const removeAllJwtToken = (): void => {
  // eslint-disable-next-line guard-for-in
  for (const key in JwtTokenEnum) {
    localStorage.removeItem(key);
  }

  // not using this because we want to keep the "umi_locale" stored in localStorage
  // localStorage.clear();
};

/**
 * remove all keys in {@link JwtTokenEnum}
 */
const setAllJwtToken = (msg: API.LoginResult): void => {
  set(JwtTokenEnum.accessToken, msg.accessToken!);

  if (ENABLE_REFRESH_TOKEN) {
    set(JwtTokenEnum.refreshToken, msg.refreshToken);
    set(JwtTokenEnum.accessTokenExpiration, msg.accessTokenExpiration);
    set(JwtTokenEnum.refreshTokenExpiration, msg.refreshTokenExpiration);
  }
};

export default { set, get, remove, setAllJwtToken, removeAllJwtToken, JwtTokenEnum };
