import { FC, useMemo } from "react";
interface Props {
  value: string;
}

const versionOsCon = [
  { key: "ONLY_ANDROID", text: "Android" },
  { key: "ONLY_IOS", text: "IOS" },
  { key: "ALL", text: "Tất cả" },
];

const SupportOsCom: FC<Props> = (props: Props) => {
  const { value } = props;
  const text = useMemo(() => {
    return versionOsCon.find((e) => e.key === value)?.text;
  }, [value]);

  return (
    <span key={value} color="default">
      {text}
    </span>
  );
};

export default SupportOsCom;
