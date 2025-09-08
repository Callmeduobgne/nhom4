import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../../utils/services/api';

const { Option } = Select;

function Assets() {
    const [assets, setAssets] = useState([]);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            const response = await api.get('/assets/');
            setAssets(response);
        } catch (error) {
            console.error('Error fetching assets:', error);
        }
    };

    const handleSubmit = async (values) => {
        try {
            if (editId) {
                await api.put(`/assets/${editId}/`, values);
            } else {
                await api.post('/assets/', values);
            }
            setVisible(false);
            form.resetFields();
            setEditId(null);
            fetchAssets();
        } catch (error) {
            console.error('Error saving asset:', error);
        }
    };

    const handleEdit = (record) => {
        setEditId(record.id);
        form.setFieldsValue(record);
        setVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/assets/${id}/`);
            fetchAssets();
        } catch (error) {
            console.error('Error deleting asset:', error);
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Category', dataIndex: 'category', key: 'category' },
        { title: 'Value', dataIndex: 'value', key: 'value', render: (value) => `$${value}` },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Location', dataIndex: 'location', key: 'location' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
                </Space>
            )
        }
    ];

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setVisible(true)}>
                    Add Asset
                </Button>
            </div>
            <Table columns={columns} dataSource={assets} rowKey="id" />
            <Modal
                title={editId ? 'Edit Asset' : 'Add Asset'}
                open={visible}
                onCancel={() => {
                    setVisible(false);
                    form.resetFields();
                    setEditId(null);
                }}
                footer={null}
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                        <Select>
                            <Option value="equipment">Equipment</Option>
                            <Option value="furniture">Furniture</Option>
                            <Option value="vehicle">Vehicle</Option>
                            <Option value="software">Software</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="value" label="Value" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                        <Select>
                            <Option value="active">Active</Option>
                            <Option value="maintenance">Maintenance</Option>
                            <Option value="retired">Retired</Option>
                            <Option value="disposed">Disposed</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="location" label="Location">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editId ? 'Update' : 'Create'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Assets;
