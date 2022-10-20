import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { RegUtil } from "utils/RegUtils";
import "./index.scss";
import YodyLogo from "assets/img/yody-logo.svg";

type IProps = {
  onFinish: (values: any) => void;
  loading: boolean;
};

export const LoginWeb = (props: IProps) => {
  const { onFinish, loading } = props;
  return (
    <div className="container-login">
      <div className="login">
        <div className="login-group">
          <div className="login-title">
            <img src={YodyLogo} alt="logo" width={140} height={80} />
            <div>Xin chào!</div>
          </div>
          <Form
            className="login-form"
            layout="vertical"
            initialValues={{ username: "", password: "" }}
            onFinish={onFinish}>
            <Form.Item
              className="row-form"
              label="Tên đăng nhập"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Tên đăng nhập không được bỏ trống",
                },
                {
                  pattern: RegUtil.USER_NAME,
                  message: "Tên đăng nhập sai định dạng",
                },
              ]}>
              <Input
                className="username"
                prefix={<UserOutlined style={{ color: "#c5c5c5", marginRight: 8 }} />}
                size="large"
                disabled={loading}
                placeholder="Tên đăng nhập"
              />
            </Form.Item>

            <Form.Item
              className="row-form"
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Mật khẩu không được bỏ trống" }]}>
              <Input.Password
                prefix={<LockOutlined style={{ color: "#c5c5c5", marginRight: 8 }} />}
                disabled={loading}
                size="large"
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                size="large"
                type="primary"
                htmlType="submit"
                className="login-form-button">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="copy-right">© 2022 Copyright Yody Mobile Internal. All Rights Reserved</div>
    </div>
  );
};
