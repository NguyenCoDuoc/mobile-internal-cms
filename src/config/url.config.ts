const UrlConfig = {
  HOME: `/`,
  LOGIN: `/login`,
  PRODUCT: `/products`,
  VARIANTS: `/variants`,
  ACCOUNTS: `/accounts`,
};

export const ProductTabUrl = {
  VARIANTS: UrlConfig.VARIANTS,
  PRODUCTS: UrlConfig.PRODUCT,
  PRODUCT_HISTORIES: UrlConfig.PRODUCT + "/histories",
  HISTORY_PRICES: UrlConfig.PRODUCT + "/prices-history",
  STAMP_PRINTING_HISTORY: UrlConfig.PRODUCT + "/stamp-printing-history",
};

export const AccountUrl = {
  UPDATE_PASSWORD: `${UrlConfig.ACCOUNTS}/me/update-password`,
  USER_DETAIL: `${UrlConfig.ACCOUNTS}/:code`,
  USER_PERMISSION: `${UrlConfig.ACCOUNTS}/:code/permissions`,
};

export const BASE_NAME_ROUTER = "/admin";

export default UrlConfig;
