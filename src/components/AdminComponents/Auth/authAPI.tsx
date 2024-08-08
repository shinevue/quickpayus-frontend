import { API } from "@/utils/api";
interface UserData {
  username?: string;
  email?: string;
  password?: string;
}

interface LoginInfo {
  email: string;
  password: string;
}

interface UpdateData {
  username?: string;
  email?: string;
  password?: string;
}

export function createUser(userData: UserData): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/v1/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        resolve(data);
      } else {
        const err = await response.json();
        reject({ err });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export function checkDataExist(userData: UserData): Promise<{ data: any }> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/v1/auth/checkdata", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.json();
        reject({ err });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export function login(loginInfo: LoginInfo): Promise<{ data: any }> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/api/v1/auth/signin`, {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.json();
        reject({ err });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export function CheckAuth(): Promise<{ data: any }> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await API.get(`/auth/check`);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject();
    }
  });
}

export function signOut(): Promise<{ data: any }> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/api/v1/auth/signout`, {
        method: "DELETE",
        body: JSON.stringify({}),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.json();
        reject({ err });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export function UpdateAuth(update: UpdateData): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch("/api/v1/auth/user/", {
        method: "PUT",
        body: JSON.stringify(update),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      console.log(error);
    }
  });
}

export function GetPermission(): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    try {
      const response = await API.get("/admin/roles/permission");
      if (response.data.success) {
        const data = response.data;
        resolve({ data });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
