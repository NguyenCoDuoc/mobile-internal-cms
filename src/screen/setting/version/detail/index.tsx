import { Button, Card, Col, Row } from "antd";
import ContentContainer from "component/container/content.container";
import RowDetail from "component/custom/RowDetail";
import { SettingUrl } from "config/url.config";
import { VersionResponse } from "model/version/version.model";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getVersionDetailApi } from "service/verions/version.service";
import { callApiNative } from "utils/ApiUtils";
import "./style.scss";
import { useHistory, useParams } from "react-router";
import VersionStatusCom from "../component/status";
import SupportOsCom from "../component/supportos";
import { ConvertUtcToLocalDate, DATE_FORMAT } from "utils/DateUtils";
import BottomBarContainer from "component/container/bottom-bar.container";
import { EditOutlined } from "@ant-design/icons";

export interface VersionParams {
  id: string;
}

const VersionDetailScreen: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<VersionParams>();
  const [data, setData] = useState<VersionResponse>();
  const getDataDetail = async (id: number) => {
    const res = await callApiNative({ isShowLoading: true }, dispatch, getVersionDetailApi, id);
    if (res) {
      setData(res);
    }
  };

  useEffect(() => {
    getDataDetail(parseInt(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <ContentContainer
      title="Quản lý phiên bản"
      breadcrumb={[
        {
          name: "Cài đặt",
        },
        {
          name: "Phiên bản",
          path: SettingUrl.VERSIONS,
        },
        {
          name: "Chi tiết phiên bản",
        },
      ]}>
      <div className="version-detail">
        {data ? (
          <Row gutter={25}>
            <Col span={16}>
              <Card
                title="Thông tin chi tiết"
                extra={
                  <span>
                    <VersionStatusCom status={data.status} />
                  </span>
                }>
                <Row>
                  <Col span={14}>
                    <RowDetail title="Tên" value={data.name} />
                  </Col>
                  <Col span={10}>
                    <div className="row-detail">
                      <div className="row-detail-left title">Yêu cầu cập nhật:</div>
                      <div className="dot data"></div>
                      <div className="row-detail-right data">
                        {data.require_update ? "Có" : "Không"}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={14}>
                    <RowDetail title="Tiêu đề" value={data.title} />
                  </Col>
                  <Col span={10}>
                    <div className="row-detail">
                      <div className="row-detail-left title">Hệ điều hành:</div>
                      <div className="dot data"></div>
                      <div className="row-detail-right data">
                        {<SupportOsCom value={data.os} />}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="title">Mô tả</div>
                  </Col>
                </Row>
                <Row>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.description,
                    }}
                    className="data-content"
                  />
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Thông tin phiên bản">
                <RowDetail
                  title="Ngày phát hành"
                  value={ConvertUtcToLocalDate(data.publish_date, DATE_FORMAT.DDMMYY_HHmm)}
                />
                <RowDetail title="Người phát hành" value={data.updated_name ?? "---"} />
                <RowDetail
                  title="Ngày dự kiến phát hành"
                  value={ConvertUtcToLocalDate(data.expected_publish_date, DATE_FORMAT.DDMMYY_HHmm)}
                />
                <RowDetail
                  title="Ngày tạo"
                  value={ConvertUtcToLocalDate(data.created_date, DATE_FORMAT.DDMMYY_HHmm)}
                />
                <RowDetail title="Người tạo" value={data.created_name ?? "---"} />
              </Card>
            </Col>
          </Row>
        ) : (
          "Không có dữ liệu hiển thị."
        )}
      </div>
      <BottomBarContainer
        back="Quay lại"
        rightComponent={
          <div>
            <Button
              onClick={() => history.push(`${SettingUrl.VERSIONS}/${id}/update`)}
              icon={<EditOutlined />}>
              Chỉnh sửa
            </Button>
          </div>
        }
      />
    </ContentContainer>
  );
};

export default VersionDetailScreen;
