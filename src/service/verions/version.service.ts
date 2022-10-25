import BaseAxios from "base/base.axios";
import BaseResponse from "base/base.response";
import { ApiConfig } from "config/api.config";
import {
  VersionQuery,
  VersionRequest,
  VersionResponse,
  VersionUpdate,
} from "model/version/version.model";

export const getVersions = (q: VersionQuery): Promise<BaseResponse<VersionResponse>> => {
  return BaseAxios.get(`${ApiConfig.VERSION}/mobile-versions`, { params: q });
};

export const getVersionDetailApi = (id: number): Promise<VersionResponse> => {
  return BaseAxios.get(`${ApiConfig.VERSION}/mobile-versions/${id}`);
};

export const createVersionApi = (body: VersionRequest): Promise<VersionResponse> => {
  return BaseAxios.post(`${ApiConfig.VERSION}/mobile-versions`, body);
};

export const updateVersionApi = (id: number, body: VersionUpdate): Promise<VersionResponse> => {
  return BaseAxios.put(`${ApiConfig.VERSION}/mobile-versions/${id}`, body);
};

export const delteVersionApi = (id: number): Promise<VersionResponse> => {
  return BaseAxios.delete(`${ApiConfig.VERSION}/mobile-versions/${id}`);
};
