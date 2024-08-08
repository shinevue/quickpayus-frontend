import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Typography } from "antd";

import { analytics } from "../AdminDashboardApi";
import { BarOption, inventLevel, PieOption, RadarOption } from "../ChartConfig";
import ReactApexChart from "react-apexcharts";

const { Title } = Typography;

interface UserMetrics {
  totalRegisteredUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalReferrals: number;
}

interface KYCMetrics {
  approved: number;
  rejected: number;
  pending: number;
}

interface DepositMetrics {
  approved: number;
  rejected: number;
  pending: number;
  totalCreditsDispatched: number;
}

interface TicketMetrics {
  resolved: number;
  pending: number;
}

interface ProgramEngagementStats {
  level: string;
  users: number;
}
[];

interface TopCountry {
  country: string;
  users: number;
}

interface TopBrowser {
  browsers: string;
  users: number;
}

interface TopOS {
  oss: string;
  users: number;
}

interface UserDemographics {
  topCountries: TopCountry[];
  topBrowsers: TopBrowser[];
  topOS: TopOS[];
}

const AdminDashboard: React.FC = () => {
  const [userMetrics, setUserMetrics] = useState<UserMetrics | null>(null);
  const [userMetricsConfig, setUserMetricsConfig] = useState<any>(null);
  const [kycMetrics, setKYCMetrics] = useState<KYCMetrics | null>(null);
  const [kycMetricsConfig, setKYCMetricsConfig] = useState<any>(null);
  const [depositMetrics, setDepositMetrics] = useState<DepositMetrics | null>(
    null
  );
  const [depositMetricsConfig, setDepositMetricsConfig] = useState<any>(null);
  const [ticketMetrics, setTicketMetrics] = useState<TicketMetrics | null>(
    null
  );
  const [ticketMetricsConfig, setTicketMetricsConfig] = useState<any>(null);
  const [programEngagementStats, setProgramEngagementStats] =
    useState<ProgramEngagementStats | null>(null);
  const [programEngagementStatsConfig, setProgramEngagementStatsConfig] =
    useState<any>(null);
  const [userDemographics, setUserDemographics] =
    useState<UserDemographics | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const config = {
    innerRadius: 0.6,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await analytics();
      if (Object.keys(result).length) {
        if (result.hasOwnProperty("userMetrics")) {
          setUserMetrics(result.userMetrics);
          setUserMetricsConfig([
            {
              name: "Series1",
              data: [
                result.userMetrics.activeUsers   +
                  result.userMetrics.inactiveUsers,
                result.userMetrics.activeUsers,
                result.userMetrics.inactiveUsers,
                result.userMetrics.totalReferrals,
              ],
            },
          ]);
        }
        if (result.hasOwnProperty("kycMetrics")) {
          setKYCMetrics(result.kycMetrics);
          setKYCMetricsConfig([
            {
              name: "Series1",
              data: [
                result.kycMetrics.approved,
                result.kycMetrics.rejected,
                result.kycMetrics.pending,
              ],
            },
          ]);
        }
        if (result.hasOwnProperty("programStatistics")) {
          const resProgramStatistics = result.programStatistics.sort((a, b) =>
            a.level > b.level ? 1 : -1
          );
          setProgramEngagementStats(resProgramStatistics);

          setProgramEngagementStatsConfig(
            resProgramStatistics.map((item) => item.users)
          );
          if (result.hasOwnProperty("ticketMetrics")) {
            setTicketMetrics(result.ticketMetrics);
            setTicketMetricsConfig([
              result.ticketMetrics.pending,
              result.ticketMetrics.resolved,
            ]);
          }
        }
        if (result.hasOwnProperty("depositMetrics")) {
          setDepositMetrics(result.depositMetrics);
          setDepositMetricsConfig([
            {
              name: "series1",
              data: [
                result.depositMetrics.approved,
                result.depositMetrics.rejected,
                result.depositMetrics.pending,
              ],
            },
          ]);
        }
        if (result.hasOwnProperty("userDemographics"))
          console.log(result.userDemographics);
        setUserDemographics(result.userDemographics);
      }
    };
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  return (
    <div className="admin-dashboard-container md:py-5 pt-[60px] px-6">
      <div className="admin-dashboard-content">
        <Title
          style={{ fontSize: "21px" }}
          className=" md:text-left text-center block admin-dashboard-title "
        >
          Dashboard
        </Title>
        <Spin spinning={loading}>
          <Row gutter={[16, 16]} justify="space-around">
            {kycMetrics && (
              <Col xs={24} sm={24} lg={12} xl={8}>
                <Card
                  title={
                    <Title style={{ marginBottom: "0px", fontSize: "19px" }}>
                      KYC Metrics
                    </Title>
                  }
                  className="dashboard-card"
                  style={{ borderRadius: "18px" }}
                >
                  <Row className="text-[14px] flex gap-2">
                    Approved:
                    <span className="font-bold">{kycMetrics.approved}</span>
                  </Row>
                  <Row className="text-[14px] flex gap-2">
                    Rejected:
                    <span className="font-bold">{kycMetrics.rejected}</span>
                  </Row>
                  <Row className="text-[14px] flex gap-2">
                    Pending:
                    <span className="font-bold">{kycMetrics.pending}</span>
                  </Row>
                  <ReactApexChart
                    options={RadarOption}
                    type="radar"
                    height={350}
                    width="100%"
                    series={kycMetricsConfig}
                  />
                </Card>
              </Col>
            )}
            {userMetrics && (
              <Col xs={24} sm={24} lg={12} xl={8}>
                <Card
                  title={
                    <Title
                      style={{ marginBottom: "0px", fontSize: "19px" }}
                      level={4}
                    >
                      User Metrics
                    </Title>
                  }
                  className="dashboard-card"
                  style={{ borderRadius: "18px" }}
                >
                  <Row className="text-[14px] flex gap-2">
                    Total Registered Users:
                    <span className="font-bold">
                      {userMetrics.totalRegisteredUsers}
                    </span>
                  </Row>
                  <Row className="text-[14px] flex gap-2">
                    Active Users:
                    <span className="font-bold">{userMetrics.activeUsers}</span>
                  </Row>
                  <Row className="text-[14px] flex gap-2">
                    Inactive Users:
                    <span className="font-bold">
                      {userMetrics.inactiveUsers}
                    </span>
                  </Row>
                  <Row className="text-[14px] flex gap-2">
                    Total Referrals:
                    <span className="font-bold">
                      {userMetrics.totalReferrals}
                    </span>
                  </Row>
                  <ReactApexChart
                    options={BarOption}
                    type="bar"
                    height={350}
                    width="100%"
                    series={userMetricsConfig}
                  />
                </Card>
              </Col>
            )}
            {depositMetrics && (
              <Col xs={24} sm={24} lg={12} xl={8}>
                <Card
                  title={
                    <Title
                      style={{ marginBottom: "0px", fontSize: "19px" }}
                      level={4}
                    >
                      Deposit Metrics
                    </Title>
                  }
                  className="dashboard-card"
                  style={{ borderRadius: "18px" }}
                >
                  <Row className="text-[14px] flex gap-2">
                    Approved:
                    <span className="font-bold">{depositMetrics.approved}</span>
                  </Row>
                  <Row className="text-[14px] flex gap-2">
                    Rejected:
                    <span className="font-bold">{depositMetrics.rejected}</span>
                  </Row>
                  <Row className="text-[14px] flex gap-2">
                    Pending:
                    <span className="font-bold">{depositMetrics.pending}</span>
                  </Row>
                  <Row className="text-[14px] flex gap-2">
                    Total Credits Dispatched:
                    <span className="font-bold">
                      {depositMetrics.totalCreditsDispatched}
                    </span>
                  </Row>
                  <ReactApexChart
                    options={RadarOption}
                    type="radar"
                    height={350}
                    width="100%"
                    series={depositMetricsConfig}
                  />
                </Card>
              </Col>
            )}
            {ticketMetrics && (
              <Col xs={24} sm={24} lg={12} xl={12}>
                <Card
                  title={
                    <Title
                      style={{ marginBottom: "0px", fontSize: "19px" }}
                      level={4}
                    >
                      Ticket Metrics
                    </Title>
                  }
                  className="dashboard-card"
                  style={{ borderRadius: "18px" }}
                >
                  <ReactApexChart
                    options={PieOption}
                    type="pie"
                    height={350}
                    width="100%"
                    series={ticketMetricsConfig}
                  />
                  <Row className="text-[14px] flex gap-2">
                    Resolved:
                    <span className="font-bold">{ticketMetrics.resolved}</span>
                  </Row>
                  <Row className="text-[14px] flex gap-2">
                    Pending:
                    <span className="font-bold">{ticketMetrics.pending}</span>
                  </Row>
                </Card>
              </Col>
            )}
            {programEngagementStats && (
              <Col xs={24} sm={24} lg={24} xl={12}>
                <Card
                  title={
                    <Title
                      style={{ marginBottom: "0px", fontSize: "19px" }}
                      level={4}
                    >
                      Program Engagement Statistics
                    </Title>
                  }
                  bordered={false}
                  className="dashboard-card"
                  style={{ borderRadius: "18px" }}
                >
                  <ReactApexChart
                    options={{
                      ...PieOption,
                      labels: programEngagementStats.map((item) => item.level),
                      legend: {
                        labels: {
                          colors: programEngagementStats.map(
                            (_) => "var(--color-text)"
                          ),
                        },
                      },
                    }}
                    type="pie"
                    height={350}
                    width="100%"
                    series={programEngagementStatsConfig}
                  />
                  {programEngagementStats.map((item, index) => (
                    <Row className="text-xl flex gap-2" key={index}>
                      <span className="w-48">
                        {item.level} ({inventLevel[item.level]}) :
                      </span>
                      <span className="font-bold">{item.users}</span>
                    </Row>
                  ))}
                </Card>
              </Col>
            )}
            {userDemographics && (
              <Col xs={24}>
                <Card
                  title={
                    <Title style={{ marginBottom: "0px", fontSize: "19px" }}>
                      User Demographics
                    </Title>
                  }
                  className="dashboard-card"
                  style={{ borderRadius: "18px" }}
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                      <div style={{ borderRadius: "18px", padding: "24px" }}>
                        <Title
                          style={{ marginBottom: "0px", fontSize: "14px" }}
                        >
                          Top Countries
                        </Title>
                        <ReactApexChart
                          options={{
                            ...PieOption,
                            labels: userDemographics.topCountries.map((item) =>
                              item.country ? item.country : "N/A"
                            ),
                            legend: {
                              labels: {
                                colors: userDemographics.topCountries.map(
                                  (_) => "var(--color-text)"
                                ),
                              },
                            },
                          }}
                          type="pie"
                          height={350}
                          width="100%"
                          series={userDemographics.topCountries.map(
                            (item) => item.users
                          )}
                        />
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                      <div style={{ borderRadius: "18px", padding: "24px" }}>
                        <Title
                          style={{ marginBottom: "0px", fontSize: "14px" }}
                        >
                          Top Browsers
                        </Title>
                        <ReactApexChart
                          options={{
                            ...PieOption,
                            labels: userDemographics.topBrowsers.map((item) =>
                              item.browsers ? item.browsers : "N/A"
                            ),
                            legend: {
                              labels: {
                                colors: userDemographics.topBrowsers.map(
                                  (_) => "var(--color-text)"
                                ),
                              },
                            },
                          }}
                          type="pie"
                          height={350}
                          width="100%"
                          series={userDemographics.topBrowsers.map(
                            (item) => item.users
                          )}
                        />
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                      <div style={{ borderRadius: "18px", padding: "24px" }}>
                        <Title
                          style={{ marginBottom: "0px", fontSize: "14px" }}
                        >
                          Top Operating Systems
                        </Title>
                        <ReactApexChart
                          options={{
                            ...PieOption,
                            labels: userDemographics.topOS.map((item) =>
                              item.oss ? item.oss : "N/A"
                            ),
                            legend: {
                              labels: {
                                colors: userDemographics.topBrowsers.map(
                                  (_) => "var(--color-text)"
                                ),
                              },
                            },
                          }}
                          type="pie"
                          height={350}
                          width="100%"
                          series={userDemographics.topOS.map(
                            (item) => item.users
                          )}
                        />
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            )}
          </Row>
        </Spin>
      </div>
    </div>
  );
};

export default AdminDashboard;
