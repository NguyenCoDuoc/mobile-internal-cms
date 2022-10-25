import { Button, Input, Row, Table, TableProps } from "antd";
import { ColumnsType } from "antd/lib/table";
import { VersionQuery, VersionResponse } from "model/version/version.model";
import { FC, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { delteVersionApi, getVersions } from "service/verions/version.service";
import { callApiNative } from "utils/ApiUtils";
import purify from "dompurify";
import "./style.scss";
import VersionStatusCom from "./component/status";
import SupportOsCom from "./component/supportos";
import ContentContainer from "component/container/content.container";
import { EditOutlined, DeleteTwoTone, SearchOutlined } from "@ant-design/icons";
import CustomPagination from "component/table/CustomPagination";
import { PageResponse } from "model/base/base-metadata.response";
import CustomSelect from "component/custom/select.custom";
import { VersionStatusCon } from "./config";
import { ConvertUtcToLocalDate, DATE_FORMAT } from "utils/DateUtils";
import _ from "lodash";
import ButtonCreate from "component/header/ButtonCreate";
import { SettingUrl } from "config/url.config";
import { Link, useHistory } from "react-router-dom";
import ModalDeleteConfirm from "component/modal/ModalDeleteConfirm";
import { showSuccess } from "utils/ToastUtils";
const VersionScreen: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [query, setQuery] = useState<VersionQuery>({});
  const [search, setSearch] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [id, setId] = useState<number>(0);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [data, setData] = useState<PageResponse<VersionResponse>>({
    metadata: {
      limit: 30,
      page: 1,
      total: 0,
    },
    items: [],
  });

  const handleAction = {
    delete: async () => {
      const res = await callApiNative({ isShowLoading: true }, dispatch, delteVersionApi, id);
      if (res) {
        showSuccess("Xóa phiên bản thành công");
        setConfirmDelete(false);
        getData(queryParam);
      }
    },
    update: (id: number) => {
      history.push(`${SettingUrl.VERSIONS}/${id}/update`);
    },
  };

  const columns: ColumnsType<VersionResponse> = [
    {
      title: "Thao tác",
      align: "center",
      width: 140,
      fixed: "left",
      render: (value, record) => {
        return (
          <div className="action">
            <div>
              <EditOutlined
                onClick={() => {
                  handleAction.update(record.id);
                }}
              />
            </div>
            <div>
              <DeleteTwoTone
                className="btn-icon"
                onClick={() => {
                  setId(record.id);
                  setConfirmDelete(true);
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
      render: (value, record) => {
        return <Link to={`${SettingUrl.VERSIONS}/${record.id}`}>{value}</Link>;
      },
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
      title: "Version",
      dataIndex: "version_number",
      width: 130,
      align: "center",
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

  const queryParam = useMemo(() => {
    let res = _.cloneDeep(query);
    return res;
  }, [query]);

  const getData = async (q: VersionQuery) => {
    const res = await callApiNative({ isShowLoading: true }, dispatch, getVersions, q);
    if (res) {
      setData(res);
    }
  };

  useEffect(() => {
    getData(queryParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParam]);

  const onChangePage = (page: number, pageSize?: number) => {
    let res = { ..._.cloneDeep(query), page: page, limit: pageSize };
    setQuery(res);
  };

  const handleSearch = () => {
    getData({ ...queryParam, search: search, status: status });
  };

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
          <ButtonCreate children="Thêm phiên bản" path={`${SettingUrl.VERSION_CREATE}`} />
        </Row>
      }>
      <div className="version">
        <div className="filter">
          <Input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="input-search"
            placeholder="Tên / Tiêu đề / Mô tả"
          />
          <CustomSelect
            className="status"
            showSearch
            allowClear
            showArrow
            placeholder="Chọn trạng thái"
            optionFilterProp="children"
            getPopupContainer={(trigger) => trigger.parentNode}
            onChange={setStatus}
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
            onClick={handleSearch}
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
      <ModalDeleteConfirm
        onCancel={() => setConfirmDelete(false)}
        onOk={handleAction.delete}
        title="Xác nhận xóa"
        subTitle="Bạn có chắc muốn xóa phiên bản này không?"
        visible={confirmDelete}
      />
    </ContentContainer>
  );
};
export default VersionScreen;
