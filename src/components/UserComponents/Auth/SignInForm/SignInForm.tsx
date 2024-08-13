import React from "react";
import { Formik, Field } from "formik";
// antd
import { Form } from "antd";

import * as Styled from "../SignIn.styled";

import { FloatingInput } from "../FloatingInput/FloatingInput";
import FloatingLabelInputPassword from "../FloatingInput/FloatingInputPassword";

interface FormErrors {
  email?: string;
  password?: string;
  answer?: string;
  question?: string;
  backupCode?: string;
}

interface Props {
  onSubmit: any;
}

export const SignInForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "", remember: true }}
      validate={(values) => {
        const errors: FormErrors = {};

        if (!values.email) {
          errors.email = "Please input your email / username";
        }
        if (!values.password) {
          errors.password = "Please input your password";
        }
        return errors;
      }}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleSubmit, isSubmitting }) => (
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label=""
            validateStatus={
              touched.email || values.email.length !== 0
                ? !errors.email
                  ? "success"
                  : "error"
                : ""
            }
            className={`${errors.email ? "shake" : ""}`}
            help={touched.email && errors.email ? errors.email : null}
          >
            <Field name="email">
              {({ field }: {field: any}) => (
                <FloatingInput
                  label="Email / Username"
                  name="email"
                  field={field}
                />
              )}
            </Field>
          </Form.Item>

          <Form.Item
            label=""
            validateStatus={
              touched.password || values.password.length !== 0
                ? !errors.password
                  ? "success"
                  : "error"
                : ""
            }
            style={{ marginTop: "30px" }}
            help={touched.password && errors.password ? errors.password : null}
            className={`${errors.password ? "shake" : ""}`}
          >
            <Field name="password">
              {({ field }: {field: any}) => (
                <FloatingLabelInputPassword
                  label="Password"
                  name="password"
                  field={field}
                />
              )}
            </Field>
          </Form.Item>

          <Form.Item>
            <Styled.SignInButton
              type="primary"
              htmlType="submit"
              disabled={isSubmitting}
            >
              Sign In
            </Styled.SignInButton>
          </Form.Item>

          <span>
            <Styled.ForgetTxt>
              <Styled.StyleLink to="/forgot-password">
                Forget Password?
              </Styled.StyleLink>
            </Styled.ForgetTxt>
          </span>
          <Form.Item name="remember" valuePropName="checked"></Form.Item>
        </Form>
      )}
    </Formik>
  );
};
