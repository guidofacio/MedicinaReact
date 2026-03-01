import Icon from "./Icon";

export default function Card({ title, icon, children }) {
  return (
    <div className="card">
      <div className="cardHeader">
        <div className="cardHeaderLeft">
          <Icon name={icon} />
          <div className="cardTitle">{title}</div>
        </div>
      </div>
      <div className="cardBody">{children}</div>
    </div>
  );
}