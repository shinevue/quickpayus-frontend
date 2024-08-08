import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PhoneInput } from "react-international-phone";
import dayjs from "dayjs";

// antd
import { Form, Select, Input, DatePicker, Row, Col } from "antd";

// styled components
import * as Styled from "./PersonalInformationForm.styled";

// redux
import { useGetUserQuery } from "@/app/slice";
import { updateKycField } from "@/app/slices/KycVerificationSlice";
import {
  updateProfileField,
  updateProfile,
} from "@/app/profileSlice";
import {
  selectKycVerification,
  selectProfile,
} from "@/app/selectors";

// components
import PageTitle from "../../../PageTitle";

const { Option } = Select;

interface PersonalInformationFormProps {
  errors: {
    dateOfBirth: string;
    occupation: string;
    addressLine: string;
  };
}

export const PersonalInformationForm: React.FC<
  PersonalInformationFormProps
> = ({ errors }) => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});
  const [value, setValue] = useState();
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState(0);

  const [selectedGender, setSelectedGender] = useState("female");
  const [isFirstTimeEditing, setIsFirstTimeEditing] = useState(true);
  const kycFormData = useSelector(selectKycVerification);
  const profileFormData = useSelector(selectProfile);
  const profile = useSelector(selectProfile);

  const dispatch = useDispatch();
  //  useUpdateProfileDataMutation;
  const {
    data: user,
    error,
    isLoading,
    isFetching,
  } = useGetUserQuery({
    uuid: profile.uuid,
  });

  const span = {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 12 },
    lg: { span: 12 },
    xxl: { span: 12 },
  };

  const handleValuesChange = useCallback(
    (changedValues, _allValues) => {
      setFormValues(changedValues);
      Object.entries(changedValues).forEach(([field, value]) => {
        if (
          field === "firstName" ||
          field === "lastName" ||
          field === "username" ||
          field === "email"
        ) {
          dispatch(updateProfileField({ field, value }));
        } else if (field === "mobileNo") {
          dispatch(
            updateProfileField({
              field: "countryCode",
              value: countryCode,
            })
          );
          dispatch(updateProfileField({ field: "phoneNumber", value: phone }));
        } else if (field === "dateOfBirth") {
          const formattedDate = dayjs(value as string).format("YYYY-MM-DD");
          dispatch(updateKycField({ field, value: formattedDate }));
        } else {
          dispatch(updateKycField({ field, value }));
        }
      });
    },
    [countryCode, dispatch, phone]
  );

  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };

  const handlePhoneNumberChange = (inputValue, country) => {
    const val = inputValue.replace(`+${country.country.dialCode}`, "");
    setCountryCode(`+${country.country.dialCode}`);
    setPhone(val);
  };

  const handleChangeFloating = (value) => {};

  const makePhoneNumber = (countryCode, phoneNumber) => {
    return `${countryCode}${phoneNumber}`;
  };

  useEffect(() => {
    dispatch(updateProfile({ data: { ...user?.data } }));
  }, [form, user]);

  useEffect(() => {
    if (profile) {
      console.log(profile);
      if (Object.keys(profile?.kyc).length !== 0) {
        setIsFirstTimeEditing(false);
      } else {
        setIsFirstTimeEditing(true);
      }
    }
  }, [profile]);

  return (
    <>
      <PageTitle title="Personal Information Form" level={2} />
      <Form
        form={form}
        initialValues={{
          firstName: profileFormData?.firstName,
          lastName: profileFormData?.lastName,
          username: profileFormData?.username,
          gender: profileFormData?.gender,
          email: profileFormData?.email,
          mobileNo: makePhoneNumber(
            profileFormData?.countryCode,
            profileFormData?.phoneNumber
          ),
          dateOfBirth: kycFormData?.dateOfBirth
            ? dayjs(kycFormData?.dateOfBirth?.dateOfBirth)
            : null,
          addressLine: kycFormData?.addressLine,
          addressLine2: kycFormData?.addressLine2,
          occupation: kycFormData?.occupation,
        }}
        //Would need to already add these values on signin or signup
        onValuesChange={handleValuesChange}
        layout="vertical"
        style={{ maxWidth: isFirstTimeEditing ? "100%" : "600" }}
      >
        {isFirstTimeEditing && (
          <>
            <Form.Item label="First Name" name="firstName">
              <Input placeholder="Add your first name" />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName">
              <Input placeholder="Add your last name" />
            </Form.Item>
            <Form.Item label="Phone Number" name="mobileNo">
              <PhoneInput
                defaultCountry="bd"
                value={value}
                onChange={handlePhoneNumberChange}
              />
            </Form.Item>
          </>
        )}
        <Styled.FormInputGroup>
          <Form.Item label="Date of birth" name="dateOfBirth">
            <Styled.StyledDatePicker />
          </Form.Item>
          {errors.dateOfBirth && (
            <Styled.ErrorMessage>{errors.dateOfBirth}</Styled.ErrorMessage>
          )}
        </Styled.FormInputGroup>
        <Styled.FormInputGroup>
          <Form.Item name="gender" label="Gender">
            <Styled.StyledSelect
              value={selectedGender}
              onChange={handleGenderChange}
              placeholder="Gender"
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Styled.StyledSelect>
          </Form.Item>
        </Styled.FormInputGroup>
        <Styled.FormInputGroup>
          <Form.Item name="occupation" label="Occupation" validateStatus="">
            <Styled.StyledInput
              name="occupation"
              onChange={handleChangeFloating}
              value={value}
            />
          </Form.Item>
          {errors.occupation && (
            <Styled.ErrorMessage>{errors.occupation}</Styled.ErrorMessage>
          )}
        </Styled.FormInputGroup>
        <Styled.FormInputGroup>
          <Form.Item name="addressLine" label="Address Line 1" validateStatus="">
            <Styled.StyledInput
              name="addressLine"
              onChange={handleChangeFloating}
              value={value}
            />
          </Form.Item>
          {errors.addressLine && (
            <Styled.ErrorMessage>{errors.addressLine}</Styled.ErrorMessage>
          )}
        </Styled.FormInputGroup>
        <Styled.FormInputGroup>
          <Form.Item name="addressLine2" label="Address Line 2" validateStatus="">
            <Styled.StyledInput
              name="addressLine2"
              onChange={handleChangeFloating}
              value={value}
            />
          </Form.Item>
        </Styled.FormInputGroup>
      </Form>
    </>
  );
};
