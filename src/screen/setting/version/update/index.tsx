import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Switch } from "antd";
import BottomBarContainer from "component/container/bottom-bar.container";
import ContentContainer from "component/container/content.container";
import CustomEditor from "component/custom/custom-editor";
import { SettingUrl } from "config/url.config";
import { VersionUpdate } from "model/version/version.model";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getVersionDetailApi, updateVersionApi } from "service/verions/version.service";
import { callApiNative } from "utils/ApiUtils";
import { DATE_FORMAT } from "utils/DateUtils";
import { showSuccess } from "utils/ToastUtils";
import { VersionOSCon, VersionStatusCon } from "../config";
import "./style.scss";

export interface VersionParams {
  id: string;
}

const initData: VersionUpdate = {
  name: "",
  version_number: 0,
  status: "READY",
  require_update: false,
  description: "<p><br></p>",
  os: "ALL",
  title: "",
  version: 0,
};

const VersionUpdateScreen: FC = () => {
  const { id } = useParams<VersionParams>();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [checked, setChecked] = useState<boolean>(false);

  const getDataDetail = async (id: number) => {
    let res: VersionUpdate = await callApiNative(
      { isShowLoading: true },
      dispatch,
      getVersionDetailApi,
      id
    );
    if (res) {
      if (res.expected_publish_date) {
        res.expected_publish_date = moment(res.expected_publish_date, DATE_FORMAT.YYYY_MM_DD_HHmm);
      }
      if (res.publish_date) {
        res.publish_date = moment(res.publish_date, DATE_FORMAT.YYYY_MM_DD_HHmm);
      }
      setChecked(res.require_update);
      form.setFieldsValue({ ...initData, ...res });
    }
  };

  console.log("checked", checked);

  const onFinish = async (request: VersionUpdate) => {
    if (request.expected_publish_date) {
      request.expected_publish_date = new Date(request.expected_publish_date);
    }
    if (request.publish_date) {
      request.publish_date = new Date(request.publish_date);
    }
    const res = await callApiNative(
      { isShowLoading: true },
      dispatch,
      updateVersionApi,
      parseInt(id),
      request
    );
    if (res) {
      showSuccess("Cập nhật phiên bản thành công");
      history.push(SettingUrl.VERSIONS);
    }
  };

  const validateDescription = (rule: any, value: any, callback: any): void => {
    if (!value || value === "<p><br></p>") {
      callback(`Mô tả không được để trống`);
    } else {
      callback();
    }
  };

  useEffect(() => {
    if (id) {
      getDataDetail(parseInt(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("form", form.getFieldsValue());

  return (
    <ContentContainer
      title="Quản lý phiên bản"
      breadcrumb={[
        {
          name: "Cài đặt",
        },
        {
          name: "Phiên bản",
          path: SettingUrl.VERSIONS,
        },
        {
          name: "Cập nhật phiên bản",
        },
      ]}>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={(e) => {
          console.log("e", e);

          debugger;
        }}
        layout="vertical">
        <div className="version-create">
          <Row gutter={24}>
            <Col span={18}>
              <Card title="Thông tin chi tiết">
                <Row gutter={24}>
                  <Col span={14}>
                    <Form.Item
                      label="Tiêu đề"
                      name="title"
                      rules={[
                        { required: true, message: "Tiêu đề không được để trống" },
                        { max: 500, message: "Tiêu đề không vượt quá 500 ký tự" },
                      ]}>
                      <Input placeholder="Nhập tiêu đề" maxLength={500} />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      label="Trạng thái"
                      name="status"
                      rules={[{ required: true, message: "Trạng thái không được để trống" }]}>
                      <Select placeholder="" disabled>
                        {VersionStatusCon?.map((item) => (
                          <Select.Option key={item.key} value={item.key}>
                            {item.value}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      label="Hệ điều hành"
                      name="os"
                      rules={[{ required: true, message: "Hệ điều hành không được để trống" }]}>
                      <Select placeholder="">
                        {VersionOSCon?.map((item) => (
                          <Select.Option key={item.key} value={item.key}>
                            {item.value}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={14}>
                    <Form.Item
                      label="Tên"
                      name="name"
                      rules={[
                        { required: true, message: "Tên không được để trống" },
                        { max: 36, message: "Tên không vượt quá 36 ký tự" },
                      ]}>
                      <Input placeholder="Nhập tên phiên bản" maxLength={36} />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      label="Version"
                      name="version_number"
                      rules={[{ required: true, message: "Version number không được để trống" }]}>
                      <Input type="number" min={0} />
                    </Form.Item>
                  </Col>
                  <Col span={5} style={{ textAlign: "center" }}>
                    <Form.Item
                      label="Yêu cầu cập nhật"
                      name="require_update"
                      rules={[{ required: true, message: "" }]}>
                      {form && Object.keys(form).length !== 0 ? (
                        <Switch
                          checked={checked}
                          onChange={(checked) => {
                            setChecked(checked);
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="version-create-description">
                  <Col span={24}>
                    <Form.Item
                      label="Mô tả"
                      name="description"
                      rules={[
                        {
                          validator: validateDescription,
                        },
                      ]}>
                      <CustomEditor />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Thông tin bổ sung">
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="expected_publish_date"
                      label="Ngày dự kiến phát hành"
                      rules={[
                        { required: true, message: "Ngày dự kiến phát hành không được để trống" },
                        {
                          validator: async (_, value) => {
                            const today = new Date(new Date().setHours(0, 0, 0, 0));
                            const adjustDate = new Date(new Date(value).setHours(0, 0, 0, 0));
                            if (adjustDate && adjustDate < today) {
                              return Promise.reject(
                                new Error("Ngày dự kiến phát hành không được nhỏ hơn ngày hiện tại")
                              );
                            }
                          },
                        },
                      ]}>
                      <DatePicker
                        format={DATE_FORMAT.YYYY_MM_DD_HHmm}
                        placeholder="Chọn ngày dự kiến phát hành"
                        showTime
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item name="publish_date" label="Ngày phát hành">
                      <DatePicker
                        disabled
                        placeholder="Chọn ngày phát hành"
                        showTime
                        format={DATE_FORMAT.YYYY_MM_DD_HHmm}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Form.Item hidden name="version" />
          </Row>
        </div>
        <BottomBarContainer
          back="Quay lại"
          rightComponent={
            <div>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </div>
          }
        />
      </Form>
    </ContentContainer>
  );
};

export default VersionUpdateScreen;
