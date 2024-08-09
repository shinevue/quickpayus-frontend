import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "@/utils/api";

// antd
import { Button, Card, message, Modal } from "antd";

// components
import { PersonalInformationForm } from "./components/PersonalInformationForm/PersonalInformationForm";
import { IDVerificationForm } from "./components/IDVerificationForm/IDVerificationForm";
import { ReviewForm } from "./components/ReviewForm/ReviewForm";
import { CompleteForm } from "./components/FormStatus/CompleteForm";
import { AddYourPicturesForm } from "./components/AddYourPicturesForm/AddYourPicturesForm";
import PageTitle from "../PageTitle";

// redux
import { useUpdateKycVerificationDataMutation } from "@/app/slice";
import { selectKycVerification } from "@/app/selectors";
import { selectProfile } from "@/app/selectors";

// hooks
import { useDevice } from "@/utils/Hooks/useDevice";

// styles
import * as Styled from "./KycVerification.styled";
import { updateProfile } from "@/app/profileSlice";
import { updateKyc, updateKycField } from "@/app/slices/KycVerificationSlice";

export const KycVerification: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [confirmSubmitModal, setConfirmSubmitModal] = useState(false);
  const [result, setResult] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();
  const kycRedux = useSelector(selectKycVerification);
  const profileRedux = useSelector(selectProfile);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const device = useDevice();

  const [updateKycVerificationData, { isLoading }] =
    useUpdateKycVerificationDataMutation();

  useEffect(() => {
    if (!kycRedux?.status) {
      setCurrent(1);
    } else if (kycRedux?.status === "REJECTED") {
      setTimeout(() => {
        setCurrent(1);
      }, 5000);
    } else if (kycRedux?.status === "PENDING") {
      setTimeout(() => {
        navigate("/profile");
      }, 5000);
    }
  }, [kycRedux?.status, navigate]);
  const [errors, setErrors] = useState({
    dateOfBirth: "",
    occupation: "",
    addressLine: "",
    country: "",
    documents: "",
    images: "",
  });

  useEffect(() => {
    API.get(`/user/${profileRedux.uuid}`).then((response) => {
      if (response.data.data.hasOwnProperty("kyc")) {
        dispatch(
          updateKyc({
            data: response.data.data.kyc,
          })
        );
      }
      dispatch(
        updateProfile({
          data: response.data.data,
        })
      );
    });
  }, []);
  const next = () => {
    let flag = false;

    if (current === 1) {
      let tempError = {
        dateOfBirth: "",
        occupation: "",
        addressLine: "",
      };
      if (!kycRedux.dateOfBirth) {
        flag = true;
        tempError.dateOfBirth = "Please insert date of birth";
      }
      if (!kycRedux.occupation && !kycRedux.occupation.length) {
        flag = true;
        tempError.occupation = "Please insert occupation";
      }
      if (!kycRedux.addressLine && !kycRedux.addressLine.length) {
        flag = true;
        tempError.addressLine = "Please insert addressLine";
      }
      setErrors({
        ...errors,
        dateOfBirth: tempError.dateOfBirth,
        occupation: tempError.occupation,
        addressLine: tempError.addressLine,
      });
      if (flag) return;
    } else if (current === 2) {
      let tempError = {
        country: "",
        documents: "",
      };
      if (!kycRedux.country) {
        flag = true;
        tempError.country = "Please insert country";
      }
      if (!kycRedux.documents && !kycRedux.documents?.length) {
        flag = true;
        tempError.documents = "Please insert documents";
      }
      if (
        kycRedux.documentType !== "PASSPORT" &&
        kycRedux.documents?.length < 2
      ) {
        flag = true;
        tempError.documents = "Please insert both side of document";
      }
      setErrors({
        ...errors,
        country: tempError.country,
        documents: tempError.documents,
      });
      if (flag) return;
    } else if (current === 3) {
      let tempError = {
        images: "",
      };
      if (!kycRedux.images || kycRedux.images.length === 0) {
        flag = true;
        tempError.images = "Please upload your photo";
      }
      setErrors({
        ...errors,
        images: tempError.images,
      });
      if (flag) return;
    }
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmitForm = async () => {
    try {
      const formData = new FormData();

      const fields = [
        "dateOfBirth",
        "gender",
        "occupation",
        "addressLine",
        "addressLine2",
        "country",
        "documentType",
      ];
      fields.forEach((field) => formData.append(field, kycRedux[field]));

      ["documents", "images"].forEach((type) =>
        kycRedux[type].forEach((file) => formData.append(type, file.fileObj))
      );

      const response = await API.post("/user/update/kyc", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(
        updateKycField({
          field: "status",
          value: "PENDING",
        })
      );
      messageApi.open({
        type: "success",
        content:
          "Your KYC verification has been submitted. Please allow up to 72 hours for approval.",
      });
    } catch (error) {
      console.error("Error:", error);
      messageApi.open({
        type: "error",
        content: "File is too large."
      })
    }
    setCurrent(0);
    setConfirmSubmitModal(false);
  };

  const kycState = (state: string) => {
    switch (state) {
      case "APPROVED":
        return 1;
      case "REJECTED":
        return 2;
      case "PENDING":
        return 0;
    }
    return 0;
  };

  const steps = [
    {
      content: <CompleteForm state={kycState(kycRedux?.status)} />,
      title: "Complete",
    },

    {
      content: <PersonalInformationForm errors={errors} />,
      title: "personalInformation",
    },

    {
      content: <IDVerificationForm errors={errors} />,
      title: "IDVerification",
    },
    {
      content: <AddYourPicturesForm errors={errors} />,
      title: "AddYourPicture",
    },
    {
      content: <ReviewForm />,
      title: "Review",
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: "",
  }));

  return (
    <>
      {contextHolder}
      {current !== 0 && (
        <PageTitle
          title="KYC Verification"
          description="Please complete your KYC verification to continue using our services"
        />
      )}
      <Styled.Content>
        <Styled.StepsWrapper>
          {current !== 0 && (
            <Styled.Steps
              progressDot
              current={current}
              items={items}
              direction={device?.isBreakpoint("MD") ? "vertical" : "horizontal"}
              labelPlacement={
                device?.isBreakpoint("MD") ? "horizontal" : "vertical"
              }
              responsive={false}
            />
          )}
          <Styled.StepsContent>
            <Card>{steps[current].content}</Card>
            <Styled.BtnGroup>
              {current > 1 && current <= steps.length - 1 && (
                <Styled.PreviousBtn onClick={prev}>Previous</Styled.PreviousBtn>
              )}
              {current > 0 && current < steps.length - 1 && (
                <Button type="primary" onClick={next}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => setConfirmSubmitModal(true)}
                >
                  Submit
                </Button>
              )}
            </Styled.BtnGroup>
          </Styled.StepsContent>
        </Styled.StepsWrapper>
        <Modal
          title="Confirm Account Deletion"
          open={confirmSubmitModal}
          onOk={handleSubmitForm}
          onCancel={() => setConfirmSubmitModal(false)}
          centered
        >
          <p>Are you sure you want to submit your KYC verification?</p>
        </Modal>
      </Styled.Content>
    </>
  );
};
