const UrlConfig = {
  HOME: `/`,
  LOGIN: `/login`,
  SETTINGS: `/settings`,
  ACCOUNTS: "/accounts",
  VERSIONS: "/versions",
};

export const SettingUrl = {
  SETTING: UrlConfig.SETTINGS,
  VERSIONS: UrlConfig.VERSIONS,
};

export const AccountUrl = {
  USER_DETAIL: `${UrlConfig.ACCOUNTS}/:code`,
  USER_PERMISSION: `${UrlConfig.ACCOUNTS}/:code/permissions`,
};

export const BASE_NAME_ROUTER = "/admin";

export default UrlConfig;
