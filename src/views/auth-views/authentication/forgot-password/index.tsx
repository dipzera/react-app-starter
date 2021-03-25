import React, { useState } from "react";
import { Card, Row, Col, Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import IntlMessage from "components/util-components/IntlMessage";

const backgroundStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/others/img-17.jpg)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onSend = async ({ email }: any) => {};

  return (
    <div className="h-100" style={backgroundStyle}>
      <div className="container d-flex flex-column justify-content-center h-100">
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={9}>
            <Card>
              <div className="my-2">
                <div className="text-center">
                  <img
                    className="img-fluid"
                    src={process.env.PUBLIC_URL + "/img/is-logo-dark.png"}
                    alt=""
                  />
                  <h3 className="mt-3 font-weight-bold">
                    <IntlMessage id={"auth.ForgotPassword"} />
                  </h3>
                  <p className="mb-4">
                    <IntlMessage id={"auth.ForgotPasswordMessage"} />
                  </p>
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form
                      form={form}
                      layout="vertical"
                      name="forget-password"
                      onFinish={onSend}
                    >
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: (
                              <IntlMessage id={"auth.MessageInsertEmail"} />
                            ),
                          },
                          {
                            type: "email",
                            message: (
                              <IntlMessage
                                id={"auth.MessageInsertValidEmail"}
                              />
                            ),
                          },
                        ]}
                      >
                        <Input
                          placeholder="Email Address"
                          prefix={<MailOutlined className="text-primary" />}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          loading={loading}
                          type="primary"
                          htmlType="submit"
                          block
                        >
                          {" "}
                          {loading ? (
                            <IntlMessage id={"auth.Sending"} />
                          ) : (
                            <IntlMessage id={"auth.Send"} />
                          )}
                        </Button>
                      </Form.Item>
                      <NavLink to={"auth/login"}>
                        <IntlMessage id={"auth.GoBack"} />
                      </NavLink>
                    </Form>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default connect(null, null)(ForgotPassword);
