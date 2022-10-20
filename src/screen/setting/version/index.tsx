import { Button, Input, Row, Table, TableProps } from "antd";
import { ColumnsType } from "antd/lib/table";
import { VersionResponse } from "model/version/version.model";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getVersions } from "service/verions/version.service";
import { callApiNative } from "utils/ApiUtils";
import purify from "dompurify";
import "./style.scss";
import VersionStatusCom from "./component/status";
import SupportOsCom from "./component/supportos";
import ContentContainer from "component/container/content.container";
import { PlusOutlined, EditOutlined, DeleteTwoTone, SearchOutlined } from "@ant-design/icons";
import { showWarning } from "utils/ToastUtils";
import CustomPagination from "component/table/CustomPagination";
import { PageResponse } from "model/base/base-metadata.response";
import CustomSelect from "component/custom/select.custom";
import { VersionStatusCon } from "./config";
import { ConvertUtcToLocalDate, DATE_FORMAT } from "utils/DateUtils";
const VersionScreen: FC = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<PageResponse<VersionResponse>>({
    metadata: {
      limit: 30,
      page: 1,
      total: 0,
    },
    items: [],
  });

  const columns: ColumnsType<VersionResponse> = [
    {
      title: "Thao tác",
      align: "center",
      width: 150,
      fixed: "left",
      render: () => {
        return (
          <div className="action">
            <div>
              <EditOutlined
                onClick={() => {
                  showWarning("Tính năng đang phát triển");
                }}
              />
            </div>
            <div>
              <DeleteTwoTone
                className="btn-icon"
                onClick={() => {
                  showWarning("Tính năng đang phát triển");
                }}
                twoToneColor="#eb2f96"
              />
            </div>
          </div>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 160,
      fixed: "left",
      render: (value) => {
        return <VersionStatusCom status={value} />;
      },
    },
    // {
    //   title: "Mã",
    //   dataIndex: "code",
    //   width: 250,
    //   fixed: "left",
    // },
    {
      title: "Tên",
      dataIndex: "name",
      width: 120,
      fixed: "left",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      width: 200,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      className: "description",
      render: (value) => {
        return (
          <>
            <div
              className="description-html"
              dangerouslySetInnerHTML={{
                __html: purify.sanitize(value),
              }}></div>
          </>
        );
      },
    },
    {
      title: "Hệ điều hành",
      dataIndex: "os",
      width: 150,
      render: (value) => {
        return <SupportOsCom value={value} />;
      },
    },
    {
      title: "Ngày phát hành",
      dataIndex: "publish_date",
      width: 150,
      render: (value) => {
        return ConvertUtcToLocalDate(value, DATE_FORMAT.DDMMYYY);
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_date",
      width: 150,
      render: (value) => {
        return ConvertUtcToLocalDate(value, DATE_FORMAT.DDMMYYY);
      },
    },
    {
      title: "Người tạo",
      dataIndex: "created_name",
      width: 120,
    },
  ];

  const onChange: TableProps<VersionResponse>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const getData = useCallback(
    async (page: number, size: number) => {
      const res = await callApiNative({ isShowLoading: false }, dispatch, getVersions);
      if (res) {
        setData(res);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getData(1, 30);
  }, [getData]);

  const onChangePage = (page: number, pageSize?: number) => {};

  return (
    <ContentContainer
      title="Quản lý phiên bản"
      breadcrumb={[
        {
          name: "Cài đặt",
        },
        {
          name: "Ds phiên bản",
        },
      ]}
      extra={
        <Row>
          <Button
            type="primary"
            className="ant-btn-primary"
            size="large"
            onClick={() => {
              showWarning("Tính năng đang phát triển");
            }}
            icon={<PlusOutlined className="ant-btn-primary-icon" />}>
            Thêm phiên bản
          </Button>
        </Row>
      }>
      <div className="version">
        <div className="filter">
          <Input className="input-search" placeholder="Tên / Tiêu đề / Mô tả" />
          <CustomSelect
            className="status"
            showSearch
            allowClear
            showArrow
            placeholder="Chọn trạng thái"
            optionFilterProp="children"
            getPopupContainer={(trigger) => trigger.parentNode}
            maxTagCount="responsive">
            {VersionStatusCon?.map((item) => (
              <CustomSelect.Option key={item.key} value={item.key}>
                {item.value}
              </CustomSelect.Option>
            ))}
          </CustomSelect>
          <Button
            type="primary"
            className="ant-btn-primary filter-button"
            size="small"
            onClick={() => {
              showWarning("Tính năng đang phát triển");
            }}
            icon={<SearchOutlined className="ant-btn-primary-icon" />}>
            Tìm kiếm
          </Button>
        </div>
        <Table
          size="small"
          className="table"
          columns={columns}
          dataSource={data.items}
          onChange={onChange}
          pagination={false}
          scroll={{ x: "max-content" }}
        />
        <CustomPagination
          pagination={{
            showSizeChanger: true,
            pageSize: data.metadata.limit,
            current: data.metadata.page,
            total: data.metadata.total,
            onChange: onChangePage,
            onShowSizeChange: onChangePage,
          }}
        />
      </div>
    </ContentContainer>
  );
};
export default VersionScreen;
