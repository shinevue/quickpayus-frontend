import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { countryCodesToNames } from "./CountryInfo";

import { Col } from "antd";
import * as Styled from "./Profile.styled";

import { selectProfile } from "@/app/selectors";

const ProfileAbout = () => {
  const profile = useSelector(selectProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [countryName, setCountryName] = useState("");

  const getCountryDetails = (countryCode: string) => {
    const code = countryCode.replace("+", "");
    const country =
      countryCodesToNames[code as keyof typeof countryCodesToNames];
    if (country !== undefined) {
      return `${country.name} (${country.code || countryCode})`;
    } else {
      return "Country not found";
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchCountryData = () => {
      if (profile.countryCode) {
        try {
          const cData = getCountryDetails(profile.countryCode);
          setCountryName(cData);
        } catch (error) {
          console.error("Error fetching country data:", error);
          setCountryName("Unknown");
        }
      }
      setIsLoading(false);
    };

    fetchCountryData();
  }, [profile.countryCode]);

  return (
    <Styled.Layout>
      <Styled.AboutMainRow>
        <Col span={24}>
          <Styled.StyledUserInfo>
            <Styled.AvatarContainer>
              <Styled.StyledProfileAvatar
                style={{ background: profile?.avatarBg }}
              >
                {profile?.firstName[0]?.toUpperCase()}
              </Styled.StyledProfileAvatar>
            </Styled.AvatarContainer>
            <Styled.StyledNameLabel>
              {profile.firstName} {profile.lastName}
            </Styled.StyledNameLabel>
            <Styled.StyledLevelLabel>
              Level: {profile.investmentLevel || "A"}
            </Styled.StyledLevelLabel>
          </Styled.StyledUserInfo>
          <Styled.AboutBoxRow>
            <Styled.AboutBoxCol span={24} lg={12}>
              {isLoading ? (
                <Styled.SkeletonInputCustom size="small" active />
              ) : (
                <>
                  <Styled.AboutBoxH4>First Name :</Styled.AboutBoxH4>
                  <Styled.AboutBoxP>{profile.firstName}</Styled.AboutBoxP>
                </>
              )}
            </Styled.AboutBoxCol>
            <Styled.AboutBoxCol2 span={24} lg={12}>
              {isLoading ? (
                <Styled.SkeletonInputCustom size="small" active />
              ) : (
                <>
                  <Styled.AboutBoxH4>Last Name :</Styled.AboutBoxH4>
                  <Styled.AboutBoxP>{profile.lastName}</Styled.AboutBoxP>
                </>
              )}
            </Styled.AboutBoxCol2>
          </Styled.AboutBoxRow>
          <Styled.AboutBoxRow>
            <Styled.AboutBoxCol span={24} lg={12}>
              {isLoading ? (
                <Styled.SkeletonInputCustom size="small" active />
              ) : (
                <>
                  <Styled.AboutBoxH4>Country :</Styled.AboutBoxH4>
                  <Styled.AboutBoxP>{countryName}</Styled.AboutBoxP>
                </>
              )}
            </Styled.AboutBoxCol>
            <Styled.AboutBoxCol2 span={24} lg={12}>
              {isLoading ? (
                <Styled.SkeletonInputCustom size="small" active />
              ) : (
                <>
                  <Styled.AboutBoxH4>Number :</Styled.AboutBoxH4>
                  <Styled.AboutBoxP>{profile.phoneNumber}</Styled.AboutBoxP>
                </>
              )}
            </Styled.AboutBoxCol2>
          </Styled.AboutBoxRow>
          <Styled.AboutBoxRow>
            <Styled.AboutBoxCol span={24} lg={12}>
              {isLoading ? (
                <Styled.SkeletonInputCustom size="small" active />
              ) : (
                <>
                  <Styled.AboutBoxH4>Email :</Styled.AboutBoxH4>
                  <Styled.AboutBoxP>{profile.email}</Styled.AboutBoxP>
                </>
              )}
            </Styled.AboutBoxCol>
            <Styled.AboutBoxCol2 span={24} lg={12}>
              {isLoading ? (
                <Styled.SkeletonInputCustom size="small" active />
              ) : (
                <>
                  <Styled.AboutBoxH4>Username :</Styled.AboutBoxH4>
                  <Styled.AboutBoxP>{profile.username}</Styled.AboutBoxP>
                </>
              )}
            </Styled.AboutBoxCol2>
          </Styled.AboutBoxRow>
        </Col>
      </Styled.AboutMainRow>
    </Styled.Layout>
  );
};

export default ProfileAbout;
