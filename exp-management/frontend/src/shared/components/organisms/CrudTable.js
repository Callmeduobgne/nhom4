import React, { useState } from 'react';
import {
    Table,
    Button,
    Modal,
    Form,
    Space,
    Input,
    Card,
    Typography,
    Tooltip,
    message
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    ReloadOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { Search } = Input;

function CrudTable({
    data,
    columns,
    onAdd,
    onEdit,
    onDelete,
    modalTitle,
    formFields,
    loading,
    title,
    description,
    pagination,
    onPageChange
}) {
    const [visible, setVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const handleAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        setVisible(true);
    };

    const handleEdit = (record) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setVisible(true);
    };

    const handleSearch = (value) => {
        setSearchText(value);
        if (!value) {
            setFilteredData(data);
        } else {
            const filtered = data.filter(item =>
                Object.values(item).some(val =>
                    val && val.toString().toLowerCase().includes(value.toLowerCase())
                )
            );
            setFilteredData(filtered);
        }
    };

    const handleRefresh = () => {
        setSearchText('');
        setFilteredData(data);
        message.success('Dữ liệu đã được làm mới');
    };

    const handleSubmit = async (values) => {
        try {
            if (editingRecord) {
                await onEdit(editingRecord.id, values);
                message.success('Cập nhật thành công!');
            } else {
                await onAdd(values);
                message.success('Thêm mới thành công!');
            }
            setVisible(false);
            form.resetFields();
            setEditingRecord(null);
        } catch (error) {
            if (error.response?.status === 404) {
                message.error('Không tìm thấy dữ liệu!');
            } else if (error.response?.status >= 500) {
                message.error('Lỗi máy chủ. Vui lòng thử lại sau!');
            } else {
                message.error('Có lỗi xảy ra. Vui lòng kiểm tra kết nối!');
            }
            console.error('Error saving record:', error);
        }
    };

    const enhancedColumns = [
        ...columns,
        {
            title: 'Thao tác',
            key: 'actions',
            width: 120,
            fixed: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Sửa">
                        <Button
                            type="primary"
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            type="primary"
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={async () => {
                                try {
                                    await onDelete(record.id);
                                    message.success('Xóa thành công!');
                                } catch (error) {
                                    message.error('Không thể xóa. Vui lòng thử lại!');
                                }
                            }}
                        />
                    </Tooltip>
                </Space>
            )
        }
    ];

    // Cập nhật filteredData khi data thay đổi
    React.useEffect(() => {
        setFilteredData(data);
    }, [data]);

    return (
        <div>
            {/* Header */}
            {title && (
                <div className="page-header">
                    <Title className="page-title">{title}</Title>
                    {description && (
                        <div className="page-subtitle">{description}</div>
                    )}
                </div>
            )}

            <div className="page-content">
                <Card className="fade-in-up">
                    {/* Toolbar */}
                    <div style={{
                        marginBottom: 24,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 16
                    }}>
                        <div style={{ display: 'flex', gap: 12, flex: 1 }}>
                            <Search
                                placeholder="Tìm kiếm..."
                                allowClear
                                enterButton={<SearchOutlined />}
                                size="large"
                                value={searchText}
                                onChange={(e) => handleSearch(e.target.value)}
                                onSearch={handleSearch}
                                style={{ maxWidth: 400 }}
                            />
                            <Tooltip title="Làm mới">
                                <Button
                                    icon={<ReloadOutlined />}
                                    size="large"
                                    onClick={handleRefresh}
                                />
                            </Tooltip>
                        </div>

                        <Button
                            type="primary"
                            size="large"
                            icon={<PlusOutlined />}
                            onClick={handleAdd}
                            style={{
                                background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
                                border: 'none',
                                boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)'
                            }}
                        >
                            Thêm {modalTitle}
                        </Button>
                    </div>

                    {/* Table */}
                    <Table
                        columns={enhancedColumns}
                        dataSource={filteredData}
                        rowKey="id"
                        loading={loading}
                        scroll={{ x: 800 }}
                        pagination={pagination ? {
                            current: Math.ceil((pagination.count - (pagination.next ? 20 : data.length)) / 20) + 1,
                            total: pagination.count,
                            pageSize: 20,
                            showSizeChanger: false,
                            showQuickJumper: true,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} của ${total} mục`,
                            onChange: onPageChange
                        } : {
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} của ${total} mục`,
                        }}
                        size="middle"
                    />
                </Card>

                {/* Modal */}
                <Modal
                    title={
                        <div style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#262626'
                        }}>
                            {editingRecord ? 'Cập nhật' : 'Thêm mới'} {modalTitle}
                        </div>
                    }
                    open={visible}
                    onCancel={() => {
                        setVisible(false);
                        form.resetFields();
                        setEditingRecord(null);
                    }}
                    footer={null}
                    width={600}
                    destroyOnClose
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        style={{ marginTop: 20 }}
                    >
                        {(() => {
                            if (Array.isArray(formFields)) {
                                return formFields.map(field => (
                                    <Form.Item
                                        key={field.name}
                                        name={field.name}
                                        label={field.label}
                                        rules={field.rules}
                                    >
                                        {field.component}
                                    </Form.Item>
                                ));
                            }
                            if (formFields && typeof formFields.map !== 'function') {
                                return formFields;
                            }
                            return null;
                        })()}
                        <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: 12
                            }}>
                                <Button
                                    onClick={() => {
                                        setVisible(false);
                                        form.resetFields();
                                        setEditingRecord(null);
                                    }}
                                    size="large"
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    style={{
                                        background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
                                        border: 'none'
                                    }}
                                >
                                    {editingRecord ? 'Cập nhật' : 'Thêm mới'}
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
}

export default CrudTable;
