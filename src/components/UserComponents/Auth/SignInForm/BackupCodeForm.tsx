import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
// antd
import { Form, Button, Divider } from "antd";

import * as Styled from "../SignIn.styled";

import { FloatingInput } from "../FloatingInput/FloatingInput";

interface FormErrors {
  email?: string;
  password?: string;
  answer?: string;
  question?: string;
  backupCode?: string;
}

interface Props {
  onSubmit: any;
  setMode: any;
}

export const BackupCodeForm: React.FC<Props> = ({ setMode, onSubmit }) => {
  return (
    <Formik
      initialValues={{ backupCode: "" }}
      validate={(values) => {
        const errors: FormErrors = {};
        if (!values.backupCode) {
          errors.backupCode = "Please enter the backup code ";
        }
        return errors;
      }}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, handleSubmit, setFieldValue }) => (
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            validateStatus={
              touched.backupCode
                ? !errors.backupCode
                  ? "success"
                  : "error"
                : ""
            }
            className={`${errors.backupCode ? "shake" : ""}`}
          >
            <Field name="backupCode">
              {({ field }) => (
                <>
                  <FloatingInput
                    label="Backup Code"
                    name="backupCode"
                    field={field}
                  />
                  <ErrorMessage
                    name="backupCode"
                    component="div"
                    className="color-red"
                  />
                </>
              )}
            </Field>
            <Divider />
            <Button size="large" onClick={() => setMode("que")} block>
              Previous
            </Button>
            <Styled.SignInButton
              type="primary"
              htmlType="submit"
              disabled={isSubmitting}
            >
              Submit
            </Styled.SignInButton>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
};
