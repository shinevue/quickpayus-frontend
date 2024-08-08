import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useDevice } from "@/utils/Hooks/useDevice";

interface SiderMenuItemProp {
  icon: any;
  selectedOption: string;
  keyValue: string;
  label: string;
}

const SiderMenuItem: React.FC<SiderMenuItemProp> = ({
  icon,
  selectedOption,
  keyValue,
  label,
}) => {
  const device = useDevice();

  return (
    <Menu.Item
      eventKey={keyValue}
      key={keyValue}
      icon={
        <img
          src={icon}
          style={{
            width: !device?.isBreakpoint("MD") ? "22px" : "16px",
            textAlign: "center",
          }}
        />
      }
      style={{
        backgroundColor:
          selectedOption === keyValue ? "#f4f4f4" : "rgba(0, 0, 0, 0.00)",
        fontWeight: selectedOption === keyValue ? "600" : "400",
        paddingLeft: "14px",
        fontSize: "13px",
        borderRadius: "6px",
      }}
      className={`sider-menu-item ${selectedOption === keyValue && "active"}`}
    >
      <Link to={`/${keyValue}`}>
        <span className="links">{label}</span>
      </Link>
    </Menu.Item>
  );
};

export default SiderMenuItem;
