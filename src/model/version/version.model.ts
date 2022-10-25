import { BaseQuery } from "model/base/base.query";
import { BaseObject } from "model/base/base.response";
export interface VersionBase {
  name: string;
  version_number: number;
  require_update: boolean;
  status: string;
  os: string;
  title: string;
  description: string;
  expected_publish_date?: any;
  publish_date?: any;
  un_publish_date?: any;
}
export interface VersionResponse extends VersionBase, BaseObject {}

export interface VersionQuery extends BaseQuery {
  code?: string;
  version?: number;
  search?: string;
  status?: string;
  os?: string;
  info?: string;
}

export interface VersionRequest extends VersionBase {}
export interface VersionUpdate extends VersionBase {
  version: number;
}
