import "./style.scss";

type RowDetailProps = {
  title: string;
  value: string | null;
};

const RowDetail: React.FC<RowDetailProps> = (props: RowDetailProps) => {
  return (
    <div className="row-detail">
      <div className="row-detail-left title">{`${props.title}:`}</div>
      <div className="dot data"></div>
      <div className="row-detail-right data">{props.value}</div>
    </div>
  );
};

export default RowDetail;
