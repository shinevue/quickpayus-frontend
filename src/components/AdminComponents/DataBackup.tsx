import React, { useState, useEffect } from "react";
import { Checkbox, Button, Input, Switch, Row, Col, Typography } from "antd";

import * as Styled from './Style/DataBackup.styled';

const {Title} = Typography;

const DataBackupPage: React.FC = () => {
  const [autoBackupEnabled, setAutoBackupEnabled] = useState<boolean>(false);
  const [backupFrequency, setBackupFrequency] = useState<number>(1);
  const [lastBackupTimestamp, setLastBackupTimestamp] = useState<Date | null>(
    null
  );
  const [backupLogs, setBackupLogs] = useState<string[]>([]);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  const handleManualBackup = () => {
    const timestamp = new Date();
    setLastBackupTimestamp(timestamp);
    setBackupLogs([
      `${timestamp.toLocaleString()} - Manual Backup (${selectedSections.join(
        ", "
      )})`,
      ...backupLogs,
    ]);
    console.log("Manual backup performed for:", selectedSections);
  };

  const handleAutoBackupToggle = (checked: boolean) => {
    setAutoBackupEnabled(checked);
  };

  const handleFrequencyChange = (value: number) => {
    setBackupFrequency(value);
  };

  const handleSectionToggle = (section: string) => {
    if (selectedSections.includes(section)) {
      setSelectedSections(selectedSections.filter((item) => item !== section));
    } else {
      setSelectedSections([...selectedSections, section]);
    }
  };

  useEffect(() => {
    if (autoBackupEnabled) {
      const interval = setInterval(() => {
        const timestamp = new Date();
        setLastBackupTimestamp(timestamp);
        setBackupLogs([
          `${timestamp.toLocaleString()} - Auto Backup (${selectedSections.join(
            ", "
          )})`,
          ...backupLogs,
        ]);
      }, backupFrequency * 24 * 3600000);
      return () => clearInterval(interval);
    }
  }, [autoBackupEnabled, backupFrequency, backupLogs, selectedSections]);

  return (
    <Styled.StyledContainer>
      <Styled.Header>Data Backup</Styled.Header>

      <Styled.Card>
        <Row justify="space-between" align="middle" gutter={16}>
          <Col>
            <Title level={4}>Manual Backup</Title>
          </Col>
          <Col>
            <Button style={{borderRadius: "8px"}} type="primary" onClick={handleManualBackup}>
              Backup Now
            </Button>
          </Col>
        </Row>
        <Styled.Description>
          Select the data sections to include in the backup:
        </Styled.Description>
        <Styled.RadioGroup className="flex flex-col gap-3 my-4">
          <Checkbox
            checked={selectedSections.includes("User Metrics")}
            onChange={() => handleSectionToggle("User Metrics")}
          >
            User Metrics
          </Checkbox>
          <Checkbox
            checked={selectedSections.includes("Profit Metrics")}
            onChange={() => handleSectionToggle("Profit Metrics")}
          >
            Profit Metrics
          </Checkbox>
          {/* Add more checkboxes for other data sections */}
        </Styled.RadioGroup>
      </Styled.Card>

      <Styled.Card>
        <Row justify="space-between" align="middle" >
          <Title level={4}>Auto Backup</Title>
          <Switch
            checked={autoBackupEnabled}
            onChange={handleAutoBackupToggle}
          />
        </Row>
        <Row align="middle">
          <Styled.Description>Frequency:</Styled.Description>
          <Input
            type="number"
            min={1}
            max={365}
            value={backupFrequency}
            onChange={(e) => handleFrequencyChange(parseInt(e.target.value))}
            className="w-20 px-2 py-1 border rounded-md"
          />
          <Styled.Description>days</Styled.Description>
        </Row>
      </Styled.Card>

      <Styled.Card>
        <Title level={4}>Last Backup</Title>
        <Styled.Description>
          {lastBackupTimestamp
            ? lastBackupTimestamp.toLocaleString()
            : "No backups yet"}
        </Styled.Description>
      </Styled.Card>

      <Styled.Card>
        <Title level={4}>Backup Logs</Title>
        <ul>
          {backupLogs.map(
            (log, index) =>
              log.length > 0 && (
                <li key={index}>
                  <Styled.Description>{log}</Styled.Description>
                </li>
              )
          )}
        </ul>
      </Styled.Card>
    </Styled.StyledContainer>
  );
};

export default DataBackupPage;
