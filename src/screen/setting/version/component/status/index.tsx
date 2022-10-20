import { Tag } from "antd";
import { FC, useMemo } from "react";
interface Props {
  status: string;
}

const versionStatusCon = {
  PUBLISH: "Đã phát hành",
  READY: "Chờ phát hành",
};

const VersionStatusCom: FC<Props> = (props: Props) => {
  const { status } = props;
  const arrVersionStatus = Object.keys(versionStatusCon);
  const statusMemo = useMemo(() => {
    let color = "processing";
    let text = versionStatusCon.READY;
    if (status === arrVersionStatus[0]) {
      text = versionStatusCon.PUBLISH;
      color = "success";
    }
    return { color, text };
  }, [arrVersionStatus, status]);
  return <Tag key={status} color={statusMemo.color}>{statusMemo.text}</Tag>;
};

export default VersionStatusCom;
