import { BaseObject } from "model/base/base.response";

export interface VersionResponse extends BaseObject {
  code: string;
  version: number;
  name: string;
  version_number: number;
  require_update: false;
  status: string;
  os: string;
  title: string;
  description: string;
  expected_publish_date: string;
  publish_date: string;
  un_publish_date: string;
}
