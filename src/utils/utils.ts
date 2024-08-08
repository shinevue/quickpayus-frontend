import { jwtDecode } from "jwt-decode";
import { DEF_PERMISSIONS } from "@/constants";

/**
 *
 * @param permissions current user(admin)'s permission such as Create User, View Dashboard and etc
 * @param require  permission that current route requires such as Create User or Create User|View Dashboard
 * @returns accessibility
 * @des Permissions must include at least one of require

 */
export function isAccessible(permissions: string[], require: string): boolean {

  if (!require) return true;
  if (permissions.length === DEF_PERMISSIONS.length) return true;
  if (require === "all" && DEF_PERMISSIONS.length < permissions.length) return false;
  
  const requires = require.split("|");
  return requires.some((req) => permissions.includes(req));
}

/**
 * @des decode the token in localstorage and return the role
 */
export function getRoleFromToken(): string {

  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken: { role: string } = jwtDecode<{ role: string }>(token);
      return decodedToken.role;
    } catch (error) {}
  }
  return "";
}
