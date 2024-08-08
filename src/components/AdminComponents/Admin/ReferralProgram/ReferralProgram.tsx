import React, { useEffect, useState } from "react";
import { Button, Select, Table } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import {
  fetchProgramAsync,
  updateProgramAsync,
} from "@/app/actions/programAction";

import { selectPrograms } from "@/app/slices/programSlice";

import * as Styled from "./ReferralProgram.styled";
import { EditableRow, EditableCell } from "./EditableCell";
import { Flex } from "antd/lib";
import {
  ReferralProgramType,
  ReferralSubProgramType,
} from "@/types/ProgramType";

import ReferralReports from "./ReferralManagement";

interface User {
  id: number;
  name: string;
  referredBy?: number;
}

const ReferralProgramComponent: React.FC = () => {
  const [referralProgram, setReferralProgram] = useState<ReferralProgramType[]>(
    () => {
      const dummy: ReferralProgramType[] = [];
      for (let i = 0; i < 5; i++) {
        const subPro: ReferralSubProgramType[] = [];
        for (let j = 0; j < 10; j++) {
          subPro.push({
            level: j.toString(),
            creditPercentage: 0,
            directReferralsRequired: 0,
          });
        }
        dummy.push({
          level: String.fromCharCode(65 + i),
          data: subPro,
        });
      }
      return dummy;
    }
  );
  const [currentLevel, setCurrentLevel] = useState<number>(0);

  const [users, setUsers] = useState<User[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const programsState = useSelector(selectPrograms);

  useEffect(() => {
    setReferralProgram(
      [...programsState].sort(
        (a: ReferralProgramType, b: ReferralProgramType) =>
          a.level.localeCompare(b.level)
      )
    );
  }, [programsState]);

  useEffect(() => {
    dispatch(fetchProgramAsync());
  }, []);

  const defaultColumns = [
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (lvl: number | undefined) =>
        `Level ${referralProgram[currentLevel]?.level}${lvl}`,
      sorter: (a: ReferralSubProgramType, b: ReferralSubProgramType) =>
        parseInt(a.level) - parseInt(b.level),
    },
    {
      title: "Credit Percentage",
      dataIndex: "creditPercentage",
      key: "creditPercentage",
      editable: true,
      sorter: (a: ReferralSubProgramType, b: ReferralSubProgramType) =>
        a.creditPercentage - b.creditPercentage,
    },
    // {
    //   title: "Direct Referrals Required",
    //   dataIndex: "directReferralsRequired",
    //   key: "directReferralsRequired",

    //   editable: true,
    //   sorter: (a: ReferralSubProgramType, b: ReferralSubProgramType) =>
    //     a.directReferralsRequired - b.directReferralsRequired,
    // },
  ];

  const handleCurrentLevelChange = (v: string) => {
    setCurrentLevel(parseInt(v));
  };

  const handleSave = (row: ReferralSubProgramType) => {
    // Create a deep copy of the current referralProgram state
    const newData = referralProgram.map((program) => ({
      ...program,
      data: program.data.map((subProgram) => ({ ...subProgram })),
    }));

    if (currentLevel > -1 && currentLevel < newData.length) {
      const subProgramIndex = parseInt(row.level) - 1;
      newData[currentLevel].data[subProgramIndex] = row;
      setReferralProgram(newData);
    }
  };

  const handleSubmit = () => {
    dispatch(updateProgramAsync(referralProgram));
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: ReferralSubProgramType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <Styled.Layout>
      <Styled.Container>
        <Styled.Header>Referral Settings</Styled.Header>
        <Flex justify="space-between" className="mb-5">
          <Select
            style={{ minWidth: 150 }}
            placeholder={`Select Level`}
            options={referralProgram.map(
              (program: ReferralProgramType, index: number) => ({
                label: `Level ${program.level}`,
                value: index,
              })
            )}
            onChange={handleCurrentLevelChange}
          />
          <Button type="primary" onClick={handleSubmit}>
            Adjust
          </Button>
        </Flex>
        <Table
          rowKey={(record) => `${currentLevel}-${record.level}`}
          columns={columns}
          components={components}
          dataSource={referralProgram[currentLevel]?.data}
          pagination={false}
        />
      </Styled.Container>
    </Styled.Layout>
  );
};

export default ReferralProgramComponent;
