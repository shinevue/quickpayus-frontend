export const PATH = {
  ADMIN: {
    DASHBOARD: { PATH: "/admin/dashboard", REQUIREDROLE: "View Dashboard" },
    MANAGE_USER_ROLE: { PATH: "/admin/user-permission", REQUIREDROLE: "all" },
    USER_PROFILE: { PATH: "/admin/userprofile", REQUIREDROLE: "" },

    TWO_FACTOR_AUTH: {
      PATH: "/admin/two-factor-authentication",
      REQUIREDROLE: "all",
    },
    ADMIN_PROFILE: { PATH: "/admin/profile", REQUIREDROLE: "all" },
    USER_DETAIL: {
      PATH: "/admin/user-details",
      REQUIREDROLE: "Create User|Edit User|Delete User",
    },
    KYC_MANAGE: {
      PATH: "/admin/kyc",
      REQUIREDROLE: "Create User|Edit User|Delete User",
    },
    TRANASCTION: {
      PATH: "/admin/transactions",
      REQUIREDROLE: "Manage Content",
    },
    PROFIT_CONFIG: {
      PATH: "/admin/profit-configuration",
      REQUIREDROLE: "Manage Content",
    },
    REFERRAL_PROGRAM: {
      PATH: "/admin/referral-program",
      REQUIREDROLE: "Manage Content",
    },
    REFERRAL_DETAIL: {
      PATH: "/admin/user-referrals",
      REQUIREDROLE: "Manage Content",
    },
    RANK_SETTING: {
      PATH: "/admin/rank-management",
      REQUIREDROLE: "Manage Content",
    },
    ADDRESS_MANAGE: {
      PATH: "/admin/receiver-address-management",
      REQUIREDROLE: "Manage Content",
    },
    TICKET: { PATH: "/admin/user-problems", REQUIREDROLE: "Manage Content" },
    FEEDBACK: { PATH: "/admin/feedbacks", REQUIREDROLE: "Manage Content" },
    ANNOUCEMENT: {
      PATH: "/admin/announcement",
      REQUIREDROLE: "Manage Content",
    },
    NOTIFICACTION: {
      PATH: "/admin/user-notifications",
      REQUIREDROLE: "Manage Content",
    },
  },
};
