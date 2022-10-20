const ServiceNames = {
  ACCOUNT_SERVICE: "account-service",
  AUTH_SERVICE: "auth-service",
  MOBILE_SERVICE: "mobile-service",
};

const v1 = ``;

const ApiConfig = {
  ACCOUNTS: `${v1}/${ServiceNames.ACCOUNT_SERVICE}`,
  AUTH: `${v1}/${ServiceNames.AUTH_SERVICE}`,
  VERSION: `${v1}/${ServiceNames.MOBILE_SERVICE}`,
};

export { ApiConfig };
