import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Radio,
  Checkbox,
  Popconfirm,
  message,
  Layout,
  Typography,
} from "antd";
import {
  addRole,
  delRole,
  editRole,
  getRole,
} from "../AdminUserPermissionAndRolesApi";
const { Title, Text } = Typography;

import * as Styled from "./style.styled";
import { DEF_PERMISSIONS } from "@/constants/index.ts";

export interface RoleValues {
  _id: string;
  roleName: string;
  permissions: string[];
}

const UserPermissionAndRoles: React.FC = () => {
  const [roles, setRoles] = useState<RoleValues[]>([]);
  const [selectedRole, setSelectedRole] = useState<RoleValues>({
    _id: "",
    roleName: "",
    permissions: [],
  });
  const [inputText, setInputText] = useState<string>("");
  const [inputPermissions, setInputPermissions] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const temp = await getRole();
      if (temp.data) setRoles(temp.data);
    })();
  }, []);

  const handleAddRole = async () => {
    if (inputText.trim() !== "" && !roles?.includes(selectedRole)) {
      addRole({
        ...selectedRole,
        roleName: inputText,
        permissions: inputPermissions,
      });

      setRoles([
        {
          ...selectedRole,
          roleName: inputText,
          permissions: inputPermissions,
        },
        ...roles,
      ]);
      setSelectedRole({
        _id: "",
        roleName: "",
        permissions: [],
      });
    } else if (roles.length && roles.includes(selectedRole)) {
      await editRole(selectedRole._id, {
        ...selectedRole,
        roleName: inputText,
        permissions: inputPermissions,
      });
      const temp = await getRole();
      setRoles(temp.data);
    }
  };

  const handleDeleteRole = (role: RoleValues) => {
    const newRoles = roles.filter((r) => r !== role);
    delRole(role._id);
    setRoles(newRoles);
    message.success(`Role "${role.roleName}" deleted successfully.`);
  };

  const handlePermissionToggle = (permission: string) => {
    if (inputPermissions.includes(permission)) {
      setInputPermissions(
        inputPermissions.filter((item) => item !== permission)
      );
    } else {
      setInputPermissions([...inputPermissions, permission]);
    }
  };

  return (
    <Layout style={{ padding: "25px" }} className="max-h-[calc(100vh-50px)]">
      <Styled.Header>Manage User Roles</Styled.Header>
      <Styled.Card>
        <div className="mb-6 w-full flex items-center md:justify-start justify-center">
          <div className="flex flex-col md:flex-row items-center    gap-6">
            <Text style={{ minWidth: "40px" }}>Roles:</Text>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <Input
                placeholder="Enter role name"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full md:w-auto"
              />
              <Button
                type="primary"
                onClick={handleAddRole}
                style={{ borderRadius: "8px" }}
                className="w-full md:w-auto"
              >
                Add Role
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-6 w-full flex items-center md:justify-start justify-center">
          <Radio.Group
            onChange={(e) => {
              setSelectedRole(e.target.value);
              setInputText(e.target.value.roleName);
              setInputPermissions(e.target.value.permissions);
            }}
            value={selectedRole}
            className="flex flex-col flex-wrap gap-4"
          >
            {roles?.length &&
              roles.map((role) => (
                <div key={role._id} className="flex items-center ">
                  <Radio value={role}>{role.roleName}</Radio>
                  <Popconfirm
                    title={`Are you sure you want to delete "${role.roleName}" this role?`}
                    onConfirm={() => handleDeleteRole(role)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="link" danger size="small">
                      Delete
                    </Button>
                  </Popconfirm>
                </div>
              ))}
          </Radio.Group>
        </div>

        <div className="w-full flex md:items-start items-center flex-col">
          <Title level={4}>Permissions granted:</Title>
          <div className="flex flex-wrap gap-4">
            {DEF_PERMISSIONS.length &&
              DEF_PERMISSIONS.map((permission, index) => (
                <Checkbox
                  key={index}
                  checked={inputPermissions.includes(permission)}
                  onChange={() => handlePermissionToggle(permission)}
                >
                  {permission}
                </Checkbox>
              ))}
          </div>
        </div>
      </Styled.Card>
    </Layout>
  );
};

export default UserPermissionAndRoles;
