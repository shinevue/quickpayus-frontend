import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Typography } from "antd";
import { Bar, Pie } from "@ant-design/charts";

import { analytics } from "../AdminDashboardApi";

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
  browser: string;
  users: number;
}

interface TopOS {
  os: string;
  users: number;
}

interface UserDemographics {
  topCountries: TopCountry[];
  topBrowsers: TopBrowser[];
  topOS: TopOS[];
}

const AdminDashboard: React.FC = () => {
  const [userMetrics, setUserMetrics] = useState(null);
  const [kycMetrics, setKYCMetrics] = useState(null);
  const [depositMetrics, setDepositMetrics] = useState(null);
  const [ticketMetrics, setTicketMetrics] = useState(null);
  const [programEngagementStats, setProgramEngagementStats] = useState(null);
  const [userDemographics, setUserDemographics] = useState(null);

  const [loading, setLoading] = useState<boolean>(false);
  const config = {
    paddingRight: 80,
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
    annotations: [
      {
        type: "text",
        style: {
          text: "AntV\nCharts",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 40,
          fontStyle: "bold",
        },
      },
    ],
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await analytics();
      if (Object.keys(result).length) {
        if (result.hasOwnProperty("userMetrics"))
          setUserMetrics({
            ...config,
            data: [
              { status: "activeUsers", value: result.userMetrics.activeUsers },
              {
                status: "inactiveUsers",
                value: result.userMetrics.inactiveUsers,
              },
              {
                status: "totalReferrals",
                value: result.userMetrics.totalReferrals,
              },
            ],
            angleField: "value",
            colorField: "status",
          });
        if (result.hasOwnProperty("kycMetrics")) {
          setKYCMetrics({
            ...config,
            data: [
              { status: "approved", value: result.kycMetrics.approved },
              { status: "pending", value: result.kycMetrics.pending },
              { status: "rejected", value: result.kycMetrics.rejected },
            ],
            angleField: "value",
            colorField: "status",
          });
        }
        if (result.hasOwnProperty("programStatistics"))
          setProgramEngagementStats({
            ...config,
            data: result.programStatistics,
            angleField: "users",
            colorField: "level",
          });
        if (result.hasOwnProperty("ticketMetrics"))
          setTicketMetrics({
            ...config,
            data: [
              { status: "resolved", value: result.ticketMetrics.resolved },
              { status: "pending", value: result.ticketMetrics.pending },
            ],
            angleField: "value",
            colorField: "status",
          });
        if (result.hasOwnProperty("depositMetrics"))
          setDepositMetrics({
            ...config,
            data: [
              { status: "approved", value: result.depositMetrics.approved },
              { status: "pending", value: result.depositMetrics.pending },
              { status: "rejected", value: result.depositMetrics.rejected },
            ],
            angleField: "value",
            colorField: "status",
          });
        if (result.hasOwnProperty("userDemographics"))
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
          level={1}
          className=" md:text-left text-center block admin-dashboard-title "
        >
          Dashboard
        </Title>
        <Spin spinning={loading}>
          <Row gutter={[16, 16]} justify="space-around">
            {userMetrics && (
              <Col xs={24} sm={12} lg={8} xl={8}>
                <Card
                  title={
                    <Title style={{ marginBottom: "0px" }} level={4}>
                      User Metrics
                    </Title>
                  }
                  className="dashboard-card"
                  style={{ borderRadius: "18px" }}
                >
                  <Pie {...userMetrics} />
                </Card>
              </Col>
            )}
            {kycMetrics && (
              <Col xs={24} sm={12} lg={8} xl={8}>
                <Card
                  title={
                    <Title style={{ marginBottom: "0px" }} level={4}>
                      KYC Metrics
                    </Title>
                  }
                  className="dashboard-card"
                  style={{ borderRadius: "18px" }}
                >
                  <Pie {...kycMetrics} />
                </Card>
              </Col>
            )}
            {depositMetrics && (
              <Col xs={24} sm={12} lg={8} xl={8}>
                <Card
                  title={
                    <Title style={{ marginBottom: "0px" }} level={4}>
                      Deposit Metrics
                    </Title>
                  }
                  className="dashboard-card"
                  style={{ borderRadius: "18px" }}
                >
                  <Pie {...depositMetrics} />
                </Card>
              </Col>
            )}
            {ticketMetrics && (
              <Col xs={24} sm={12} lg={12} xl={12}>
                <Card
                  title={
                    <Title style={{ marginBottom: "0px" }} level={4}>
                      Ticket Metrics
                    </Title>
                  }
                  className="dashboard-card"
                  style={{ borderRadius: "18px" }}
                >
                  <Pie {...ticketMetrics} />
                </Card>
              </Col>
            )}
            {programEngagementStats && (
              <Col xs={24} sm={24} lg={12} xl={12}>
                <Card
                  title={
                    <Title style={{ marginBottom: "0px" }} level={4}>
                      Program Engagement Statistics
                    </Title>
                  }
                  bordered={false}
                  style={{ borderRadius: "18px" }}
                >
                  <Pie {...programEngagementStats} />
                </Card>
              </Col>
            )}
            {userDemographics && (
              <Col xs={24}>
                <Card
                  title={
                    <Title style={{ marginBottom: "0px" }} level={4}>
                      User Demographics
                    </Title>
                  }
                  className="dashboard-card"
                  style={{ borderRadius: "18px" }}
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={8}>
                      <Card
                        title="Top Countries"
                        className="demographics-chart"
                        style={{ borderRadius: "18px" }}
                      >
                        <Pie
                          data={userDemographics.topCountries}
                          angleField="users"
                          colorField="country"
                          radius={0.8}
                          label={{
                            offset: "-30%",
                            content: "{users}",
                          }}
                          legend= {{
                            color: { size: 72, autoWrap: true, maxRows: 3, cols: 6, fill: "#ff0000" },
                          }}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                      <Card
                        title={
                          <Title style={{ marginBottom: "0px" }} level={4}>
                            Top Browsers
                          </Title>
                        }
                        className="demographics-chart"
                        style={{ borderRadius: "18px" }}
                      >
                        <Pie
                          data={userDemographics.topBrowsers}
                          angleField="users"
                          colorField="browsers"
                          radius={0.8}
                          label={{
                            offset: "-30%",
                            content: "{users}",
                          }}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                      <Card
                        title={
                          <Title style={{ marginBottom: "0px" }} level={4}>
                            Top Operating Systems
                          </Title>
                        }
                        className="demographics-chart"
                        style={{ borderRadius: "18px" }}
                      >
                        <Pie
                          data={userDemographics.topOS}
                          angleField="users"
                          colorField="oss"
                          radius={0.8}
                          label={{
                            offset: "-30%",
                            content: "{users}",
                          }}
                        />
                      </Card>
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
