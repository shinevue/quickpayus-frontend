import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Space, Modal, Layout, Typography } from "antd";
import {
  addProfile,
  delProfile,
  editProfile,
  getProfile,
} from "../AdminProfileApi";
import { getRole } from "../../UserPermissionAndRoles/AdminUserPermissionAndRolesApi";
import { RoleValues } from "../../UserPermissionAndRoles/components/UserPermissionAndRoles";

import * as Styled from '../../../Style/AdminProfile.styled';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectPermission } from "@/components/AdminComponents/Auth/authSlice";
import { isAccessible } from "@/utils/utils";

const {Title, Text} = Typography;

const { Option } = Select;
let editEnable = false;

const Card = styled.div`
  background-color: var(--color-bg-container);
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
`

export interface Profile {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  password?: string;
  confirmPassword?: string;
  extraField?: string;
}

const ProfileItem: React.FC<{
  roles: RoleValues[];
  profile: Profile;
  onDelete: (profileId: string) => void;
  onEdit: (loading: boolean) => void;
  onCancel: () => void;
}> = ({ roles, profile, onDelete, onEdit, onCancel }) => {
  const [isEditing, setIsEditing] = useState<boolean>(
    profile.username === "" &&
      profile.email === "" &&
      profile.phone === "" &&
      profile.role === ""
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const permissions = useSelector(selectPermission);

  const handleEdit = () => {
    setIsEditing(true);
    onCancel();
    editEnable = true;
    form.setFieldsValue(profile); // Set form fields to the current profile values
  };

  const handleSave = async (values: Profile) => {
    let loading = true;
    if (profile.id == "id") loading = await addProfile(values);
    else loading = await editProfile(profile.id, values);

    setIsEditing(false);
    editEnable = false;
    onEdit(loading);
  };

  const handleCancel = () => {
    setIsEditing(false);
    editEnable = false;
    onCancel();
  };

  const handleDelete = () => {
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    onDelete(profile.id);
    delProfile(profile.id);
    setModalVisible(false);
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
  };

  return (
    <Styled.Layout>
      {!isEditing ? (
        <>
          <Title level={2} className="text-3xl font-semibold mb-4">{profile.username}</Title>
          <Text className="text-lg mb-4">{profile.role}</Text>
          <br/>
          <Space>
            { isAccessible(permissions || [], 'Edit User') && <Button style={{borderRadius: "8px"}} type="primary" onClick={handleEdit}>
              Edit
            </Button>}
            <Button style={{borderRadius: "8px"}} type="primary" danger onClick={handleDelete}>
              Delete
            </Button>
          </Space>
        </>
      ) : (
        <>
          <Styled.Header>Edit Profile</Styled.Header>
          <Form
            form={form}
            initialValues={profile}
            onFinish={handleSave}
            onFinishFailed={(errorInfo) => console.log("Failed:", errorInfo)}
          >
            <Form.Item
              name="username"
              label="Name"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="phoneNumber" label="Phone">
              <Input />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select>
                {roles?.length &&
                  roles.map((role) => (
                    <Option key={role._id} value={role.roleName}>
                      {role.roleName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match")
                    );
                  },
                }),
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </>
      )}
      <Modal
        title="Confirm Deletion"
        visible={modalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure you want to delete this profile?</p>
      </Modal>
    </Styled.Layout>
  );
};

const AdminProfile: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [roles, setRoles] = useState<RoleValues[]>([]);

  useEffect(() => {
    (async () => {
      const tmp = await getProfile();
      if (tmp?.data) setProfiles(tmp.data);
      const temp = await getRole();
      if (temp?.data) setRoles(temp.data);
    })();
  }, []);

  const handleAddProfile = () => {
    const newProfile: Profile = {
      id: "id",
      username: "",
      email: "",
      phone: "",
      role: "",
    };
    setProfiles([...profiles, newProfile]);
    editEnable = true;
  };

  const handleCancel = () => {
    const updatedProfiles: any = profiles.pop();
    setProfiles(updatedProfiles);
    editEnable = false;
  }

  const handleEditProfile = async (loading: boolean) => {
    if (loading) loading = !loading;
    const tmp = await getProfile();
    if (tmp?.data) setProfiles(tmp.data);
  };

  const handleDeleteProfile = (profileId: string) => {
    const updatedProfiles = profiles.filter(
      (profile) => profile.id !== profileId
    );
    setProfiles(updatedProfiles);
  };

  return (
    <Layout style={{ maxHeight: "calc(100vh - 50px)", padding: "25px"}}>
      <div style={{marginBottom: '25px'}}>
        <Styled.MainHeader>Manage Admin Profile</Styled.MainHeader>
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <ProfileItem
              key={profile.id}
              roles={roles}
              onCancel={handleCancel}
              profile={profile}
              onDelete={handleDeleteProfile}
              onEdit={handleEditProfile}
            />
          ))
        ) : (
          <div className="">
            <Card style={{borderRadius: "18px", padding: "25px"}}>
              <Title style={{fontSize: "20px"}}>No Profile available</Title>
              <Text>
                There is no data to display at the moment.
              </Text>
            </Card>
          </div>
        )}
      </div>
      <div style={{textAlign: "right"}}>
        {!editEnable && (
          <Button type="primary" onClick={handleAddProfile}>
            Add Profile
          </Button>
        )}
      </div>
    </Layout>
  );
};

export default AdminProfile;
