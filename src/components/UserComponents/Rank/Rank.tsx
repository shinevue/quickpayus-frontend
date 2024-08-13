import React, { useState, useEffect } from "react";
import { Row, Col, Skeleton, Modal, Progress, Flex } from "antd";
import * as Styled from "./Rank.styled";
import { API } from "@/utils/api";
import RankChart from "./Charts";

import moment from "moment-timezone";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

const MyComponent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [rankData, setRankData]: any = useState({});
  const [claimResult, setClaimResult] = useState<{
    success: boolean;
    message: string;
    data: {
      title: string;
      amount: number;
    };
  }>({
    success: false,
    message: "",
    data: {
      title: "string",
      amount: 0,
    },
  });
  const [isClaimResultModalVisible, setIsClaimResultModalVisible] =
    useState(false);

  useEffect(() => {
    callRank();
  }, []);

  const callRank = async () => {
    setLoading(true);
    const { data } = await API.get("/rank");

    setLoading(false);
    setRankData(data.data);
  };
  const handleClaimed = async () => {
    API.post("/reward/claim-reward")
      .then((response) => {
        console.log('claim result', response.data);
        setClaimResult(response.data);
        callRank();
      })
      .catch((error) => {
        console.log('error result',error.response.data);
        setClaimResult(error.response.data);
      })
      .finally(() => {
        setIsClaimResultModalVisible(true);
      });
  };
  return (
    <>
      {/* <Confetti /> */}
      <Styled.RankTitle>Rank</Styled.RankTitle>
      <Styled.RankDataWrapper>
        <Styled.RankSubtitleWrapper>
          <Styled.RankSubtitle>Statistics</Styled.RankSubtitle>
        </Styled.RankSubtitleWrapper>
        <Row>
          <Col span={24} md={12}>
            <Styled.RankCol1>
              <Styled.RankDataItem>
                <Styled.RankDataLabel span={12}>
                  <h3>Current Rank</h3>
                  <span>:</span>
                </Styled.RankDataLabel>
                <Styled.RankDataValue span={12}>
                  <h3>
                    {loading ? (
                      <Skeleton.Input size="small" active />
                    ) : rankData?.rank &&
                      rankData?.rank.hasOwnProperty("title") ? (
                      rankData?.rank.title
                    ) : (
                      "N/A"
                    )}
                  </h3>
                </Styled.RankDataValue>
              </Styled.RankDataItem>
              <Styled.RankDataItem>
                <Styled.RankDataLabel span={12}>
                  <h3>Starts In</h3>
                  <span>:</span>
                </Styled.RankDataLabel>
                <Styled.RankDataValue span={12}>
                  <h3>
                    {loading ? (
                      <Skeleton.Input size="small" active />
                    ) : rankData.joiningDate ? (
                      rankData.joiningDate?.toString().slice(0, 10)
                    ) : (
                      "--------------"
                    )}
                  </h3>
                </Styled.RankDataValue>
              </Styled.RankDataItem>
              <Styled.RankDataItem>
                <Styled.RankDataLabel span={12}>
                  <h3>Ends In</h3>
                  <span>:</span>
                </Styled.RankDataLabel>
                <Styled.RankDataValue span={12}>
                  <h3>
                    {loading ? (
                      <Skeleton.Input size="small" active />
                    ) : rankData.joiningDate ? (
                      moment(rankData.joiningDate)
                        .add(30, "days")
                        .format("yyyy-MM-DD")
                    ) : (
                      "--------------"
                    )}
                  </h3>
                </Styled.RankDataValue>
              </Styled.RankDataItem>
            </Styled.RankCol1>
          </Col>
          <Col span={24} md={12}>
            <Styled.RankCol2>
              <Styled.RankDataItem>
                <Styled.RankDataLabel span={12}>
                  <h3 className="text-left">Current Sales Revenue</h3>
                  <span>:</span>
                </Styled.RankDataLabel>

                <Styled.RankDataValue>
                  <h3>
                    {loading ? (
                      <Skeleton.Input size="small" active />
                    ) : rankData.hasOwnProperty("sumOfLast30DaysSales") ? (
                      `$${rankData.sumOfLast30DaysSales}`
                    ) : (
                      "--------------"
                    )}
                  </h3>
                </Styled.RankDataValue>
                <Progress
                  percent={50}
                  trailColor="rgba(0, 0, 0, 0.06)"
                  strokeWidth={10}
                  format={() => ""}
                  size="small"
                />
              </Styled.RankDataItem>
              <Styled.RankDataItem>
                <Styled.RankDataLabel span={12}>
                  <h3 className="text-left">Direct Referrals</h3>
                  <span>:</span>
                </Styled.RankDataLabel>
                <Styled.RankDataValue>
                  <h3>
                    {loading ? (
                      <Skeleton.Input size="small" active />
                    ) : rankData.hasOwnProperty("directReferralsCount") ? (
                      `${rankData.directReferralsCount}`
                    ) : (
                      "--------------"
                    )}
                  </h3>
                </Styled.RankDataValue>
                <Progress
                  percent={50}
                  trailColor="rgba(0, 0, 0, 0.06)"
                  strokeWidth={10}
                  format={() => ""}
                  size="small"
                />
              </Styled.RankDataItem>
            </Styled.RankCol2>
          </Col>
        </Row>
        <Styled.ClaimRewardBtnWrapper>
          <Styled.ClaimRewardBtn
            type="primary"
            size="large"
            onClick={handleClaimed}
          >
            Claim
          </Styled.ClaimRewardBtn>
        </Styled.ClaimRewardBtnWrapper>
      </Styled.RankDataWrapper>
      <Styled.BlurBackgroundWrapper>
        <Styled.RankChartWrapper>
          <RankChart />
        </Styled.RankChartWrapper>
      </Styled.BlurBackgroundWrapper>
      <Modal
        open={isClaimResultModalVisible}
        onCancel={() => setIsClaimResultModalVisible(false)}
        footer={<></>}
      >
        <Styled.RankDataDescription>
          {claimResult.success ? (
            <>
              <b>Congratulations!</b>
              <br /> You have achieved your milestone. You can claim your
              rewards.
              <Fireworks autorun={{ speed: 2, duration: 1000 }} />
            </>
          ) : (
            <>
              <b>Announcement!</b>
              <br /> {claimResult.message}
            </>
          )}
        </Styled.RankDataDescription>
        {claimResult.success && (
          <Styled.RankResultWrapper>
            <Flex gap={12}>
              <Styled.RankResultTitle>Rank:</Styled.RankResultTitle>
              <Styled.RankResultContent>
                {loading ? (
                  <Skeleton.Input size="small" active />
                ) : (
                  claimResult.data?.title
                )}
              </Styled.RankResultContent>
            </Flex>
            <Flex gap={12}>
              <Styled.RankResultTitle>Reward Amount:</Styled.RankResultTitle>
              <Styled.RankResultContent>
                {loading ? (
                  <Skeleton.Input size="small" active />
                ) : (
                  `$${claimResult.data.amount}`
                )}
              </Styled.RankResultContent>
            </Flex>
          </Styled.RankResultWrapper>
        )}
      </Modal>
    </>
  );
};

export default MyComponent;
