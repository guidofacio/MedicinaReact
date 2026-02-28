import { NavLink } from "react-router-dom";
import Icon from "./Icon";
export default function NavItem({ to, label, icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => "navItem" + (isActive ? " active" : "")}
    >
      <Icon name={icon} />
      <span>{label}</span>
    </NavLink>
  );
}