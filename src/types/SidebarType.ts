export interface SidebarItem {
  title: string;
  path: string;
  require?: string;
}

export interface SidebarSection {
  id: string;
  title: string;
  require?: string;
  items: SidebarItem[];
}

export interface PathItem {
  PATH: string;
  REQUIREDROLE: string;
}

// Define the structure of PATH.ADMIN
export interface PathType {
  [key: string]: PathItem;
}

export interface Path {
  [key: string]: PathType;
}
