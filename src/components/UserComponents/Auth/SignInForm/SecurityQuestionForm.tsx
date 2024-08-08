import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { defaultSecurityQuestions } from "../Signup";
// antd
import { Form, Select, Button, Divider } from "antd";

import * as Styled from "../SignIn.styled";

import { FloatingInput } from "../FloatingInput/FloatingInput";

interface FormErrors {
  answer?: string;
  question?: string;
}

interface securityQuestionValues {
  answer: string;
  question: number;
}

interface FormikBag {
  setSubmitting: (isSubmitting: boolean) => void;
  setErrors: (error: FormErrors) => void;
}

interface Props {
  onSubmit: (values: securityQuestionValues, bag: FormikBag) => Promise<void>;
  setMode: (value: any) => void;
}
export const SecurityQuestionForm: React.FC<Props> = ({
  setMode,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={{ question: 0, answer: "" }}
      validate={(values) => {
        const errors: FormErrors = {};
        if (values.question < 0) {
          errors.question = "Select the any security question";
        }
        if (!values.answer) {
          errors.answer = "Please enter the answer of the selected question";
        }
        return errors;
      }}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, handleSubmit, setFieldValue }) => (
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            validateStatus={
              touched.question ? (!errors.question ? "success" : "error") : ""
            }
            className={`${errors.question ? "shake" : ""}`}
          >
            <Field name="question">
              {({ field }) => (
                <>
                  <Select
                    size="large"
                    {...field}
                    onChange={(value) => setFieldValue("question", value)}
                    options={defaultSecurityQuestions.map(
                      (quetion: string, index: number) => ({
                        label: quetion,
                        value: index,
                      })
                    )}
                  />
                  <ErrorMessage
                    name="question"
                    component="div"
                    className="color-red"
                  />
                </>
              )}
            </Field>
          </Form.Item>
          <Form.Item
            validateStatus={
              touched.answer ? (!errors.answer ? "success" : "error") : ""
            }
            className={`${errors.answer ? "shake" : ""}`}
          >
            <Field name="answer">
              {({ field }) => (
                <>
                  <FloatingInput label="Answer" name="answer" field={field} />
                  <ErrorMessage
                    name="answer"
                    component="div"
                    className="color-red"
                  />
                </>
              )}
            </Field>
            <Divider />
            <Button size="large" onClick={() => setMode("otp")} block>
              Previous
            </Button>
            <Styled.SignInButton
              type="primary"
              htmlType="submit"
              disabled={isSubmitting}
            >
              Submit
            </Styled.SignInButton>
            <p
              style={{
                marginTop: "20px",
                textAlign: "center",
                color: "dodgerblue",
                cursor: "pointer",
              }}
              onClick={() => setMode("bac")}
            >
              Forget your security answer? Click here to backup
            </p>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
};
