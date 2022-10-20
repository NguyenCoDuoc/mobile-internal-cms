import BaseAxios, { getAxiosBase } from "base/base.axios";
import BaseResponse from "base/base.response";
import { ApiConfig } from "config/api.config";
import { VersionResponse } from "model/version/version.model";

export const getVersions = (): Promise<BaseResponse<VersionResponse>> => {
  const local = getAxiosBase({ baseURL: "http://localhost:8180/unicorn/" });
  return local.get(`${ApiConfig.VERSION}/mobile-versions`);
  //   return BaseAxios.get(`${ApiConfig.VERSION}/mobile-versions`);
};
