import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Switch } from "antd";
import BottomBarContainer from "component/container/bottom-bar.container";
import ContentContainer from "component/container/content.container";
import CustomEditor from "component/custom/custom-editor";
import { SettingUrl } from "config/url.config";
import { VersionRequest } from "model/version/version.model";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createVersionApi } from "service/verions/version.service";
import { callApiNative } from "utils/ApiUtils";
import { showSuccess } from "utils/ToastUtils";
import { VersionOSCon, VersionStatusCon } from "../config";
import "./style.scss";

export interface VersionParams {
  id: string;
}

const initData: VersionRequest = {
  name: "",
  version_number: 0,
  status: "READY",
  require_update: false,
  description: "<p><br></p>",
  os: "ALL",
  title: "",
};

const VersionCreateScreen: FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = async (request: VersionRequest) => {
    if (request.expected_publish_date) {
      request.expected_publish_date = new Date(request.expected_publish_date);
    }
    if (request.publish_date) {
      request.publish_date = new Date(request.publish_date);
    }
    const res = await callApiNative({ isShowLoading: true }, dispatch, createVersionApi, request);
    if (res) {
      showSuccess("Thêm mới phiên bản thành công");
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
          name: "Thêm phiên bản",
        },
      ]}>
      <Form form={form} onFinish={onFinish} layout="vertical" initialValues={initData}>
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
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="version-create-description">
                  <Col span={24}>
                    <Form.Item
                      label="Mô tả"
                      name="description"
                      rules={[
                        { required: true, message: "Mô tả không được để trống" },
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
                        placeholder="Chọn ngày dự kiến phát hành"
                        showTime
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="publish_date"
                      label="Ngày phát hành"
                      rules={[
                        {
                          validator: async (_, value) => {
                            const today = new Date(new Date().setHours(0, 0, 0, 0));
                            const adjustDate = new Date(new Date(value).setHours(0, 0, 0, 0));
                            if (adjustDate && adjustDate < today) {
                              return Promise.reject(
                                new Error("Ngày phát hành không được nhỏ hơn ngày hiện tại")
                              );
                            }
                          },
                        },
                      ]}>
                      <DatePicker
                        disabled
                        placeholder="Chọn ngày phát hành"
                        showTime
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
        <BottomBarContainer
          back="Quay lại"
          rightComponent={
            <div>
              <Button type="primary" htmlType="submit">
                Tạo phiên bản
              </Button>
            </div>
          }
        />
      </Form>
    </ContentContainer>
  );
};

export default VersionCreateScreen;
