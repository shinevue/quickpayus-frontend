import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// antd
import { Row, Col, Skeleton } from "antd";

// components
// import EChart from "./Charts";

// styles
import * as Styled from "./Style/Dashboard.styled";
import EChart from "./Charts";
import { API } from "@/utils/api";
import { selectAnalytics } from "@/app/selectors";
import { updateAnalytics } from "@/app/analyticsSlice";
// import { selectAnalytics, selectProfile } from "@/app/selectors";
// import { updateAnalytics } from "@/app/analyticsSlice";
// import { API } from "@/utils/api";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const analytics = useSelector(selectAnalytics);

  useEffect(() => {
    const getAnalyticsData = async () => {
      try {
        const { data, status } = await API.get("analytics/counts");
        if (status === 200) {
          dispatch(updateAnalytics({ data }));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error during get analytics data:", error);
        setLoading(false);
      }
    };
    getAnalyticsData();
  }, []);

  return (
    <>
      <Styled.StyledHeading>Account Overview</Styled.StyledHeading>
      <Row>
        <Col md={24} xl={24} xs={24}>
          {/* Account Balance */}
          <Styled.OverviewCardWrapper gutter={[16, 16]}>
            <Col span={24}>
              <Styled.OverviewCard
                className="dashboard-card"
                style={{ padding: "0" }}
              >
                <Row gutter={[16, 16]}>
                  <Col sm={8} xs={8} md={8} xl={8} style={{ padding: 0 }}>
                    <Styled.CardCol className={loading ? "" : "br-1"}>
                      {loading ? (
                        <Styled.SkeletonInputCustom active size="small" />
                      ) : (
                        <>
                          <Styled.CardH3>Account Balance</Styled.CardH3>
                          <Styled.CardP>
                            ${analytics.accountBalance.toFixed(2)}
                          </Styled.CardP>
                        </>
                      )}
                    </Styled.CardCol>
                  </Col>
                  <Col xs={8} sm={8} md={8} xl={8} style={{ padding: 0 }}>
                    <Styled.CardCol className={loading ? "" : "br-1"}>
                      {loading ? (
                        <Styled.SkeletonInputCustom
                          className="w-100"
                          active
                          size="small"
                        />
                      ) : (
                        <>
                          <Styled.CardH3>Deposit Balance</Styled.CardH3>
                          <Styled.CardP>
                            ${analytics.depositBalance.toFixed(2)}
                          </Styled.CardP>
                        </>
                      )}
                    </Styled.CardCol>
                  </Col>
                  <Col sm={8} xs={8} md={8} xl={8} style={{ padding: 0 }}>
                    <Styled.CardCol>
                      {loading ? (
                        <Styled.SkeletonInputCustom active size="small" />
                      ) : (
                        <>
                          <Styled.CardH3>Profit Balance</Styled.CardH3>
                          <Styled.CardP>
                            ${analytics.profitBalance.toFixed(2)}
                          </Styled.CardP>
                        </>
                      )}
                    </Styled.CardCol>
                  </Col>
                </Row>
              </Styled.OverviewCard>
            </Col>
          </Styled.OverviewCardWrapper>
          <Styled.OverviewCardWrapper gutter={[16, 16]}>
            <Col span={24}>
              <Styled.OverviewCard
                className="dashboard-card"
                style={{ padding: "0" }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={8} sm={8} md={8} xl={8} style={{ padding: 0 }}>
                    <Styled.CardCol className={loading ? "" : "br-1"}>
                      {loading ? (
                        <Styled.SkeletonInputCustom
                          className="w-100"
                          active
                          size="small"
                        />
                      ) : (
                        <>
                          <Styled.CardH3>Equity Balance</Styled.CardH3>
                          <Styled.CardP>
                            ${analytics.equityBalance.toFixed(2)}
                          </Styled.CardP>
                        </>
                      )}
                    </Styled.CardCol>
                  </Col>
                  <Col xs={8} sm={8} md={8} xl={8} style={{ padding: 0 }}>
                    <Styled.CardCol className={loading ? "" : ""}>
                      {loading ? (
                        <Styled.SkeletonInputCustom
                          className="w-100"
                          active
                          size="small"
                        />
                      ) : (
                        <>
                          <Styled.CardH3>Deposit Balance</Styled.CardH3>
                          <Styled.CardP>
                            ${analytics.depositBalance.toFixed(2)}
                          </Styled.CardP>
                        </>
                      )}
                    </Styled.CardCol>
                  </Col>
                </Row>
              </Styled.OverviewCard>
            </Col>
          </Styled.OverviewCardWrapper>
          <Styled.OverviewCardWrapper gutter={[16, 16]}>
            <Col span={24}>
              <Styled.OverviewCard
                className="dashboard-card"
                style={{ padding: "0" }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={24} xl={24} style={{ padding: 0 }}>
                    <Styled.CardCol>
                      {loading ? (
                        <Styled.SkeletonInputCustom
                          className="w-100"
                          active
                          size="small"
                        />
                      ) : (
                        <>
                          <Styled.CardH3>Rank Balance</Styled.CardH3>
                          <Styled.CardP>
                            ${analytics.rankRewardBalance.toFixed(2)}
                          </Styled.CardP>
                        </>
                      )}
                    </Styled.CardCol>
                  </Col>
                </Row>
              </Styled.OverviewCard>
            </Col>
          </Styled.OverviewCardWrapper>
          <Styled.ChartRow gutter={[16, 16]}>
            <Col span={24}>
              <Styled.ChartCard className="dashboard-card">
                {loading ? (
                  <>
                    <Skeleton active paragraph={{ rows: 15 }} />
                  </>
                ) : (
                  <EChart analytics={analytics} />
                )}
              </Styled.ChartCard>
            </Col>
          </Styled.ChartRow>
        </Col>
      </Row>
    </>
  );
};

export default UserDashboard;
