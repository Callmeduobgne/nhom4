import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../../utils/services/api';

const { Option } = Select;

function CRM() {
    const [customers, setCustomers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await api.get('/customers/');
            setCustomers(response);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleSubmit = async (values) => {
        try {
            if (editId) {
                await api.put(`/customers/${editId}/`, values);
            } else {
                await api.post('/customers/', values);
            }
            setVisible(false);
            form.resetFields();
            setEditId(null);
            fetchCustomers();
        } catch (error) {
            console.error('Error saving customer:', error);
        }
    };

    const handleEdit = (record) => {
        setEditId(record.id);
        form.setFieldsValue(record);
        setVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/customers/${id}/`);
            fetchCustomers();
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Company', dataIndex: 'company', key: 'company' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
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
                    Add Customer
                </Button>
            </div>
            <Table columns={columns} dataSource={customers} rowKey="id" />
            <Modal
                title={editId ? 'Edit Customer' : 'Add Customer'}
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
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone">
                        <Input />
                    </Form.Item>
                    <Form.Item name="company" label="Company">
                        <Input />
                    </Form.Item>
                    <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                        <Select>
                            <Option value="lead">Lead</Option>
                            <Option value="prospect">Prospect</Option>
                            <Option value="customer">Customer</Option>
                            <Option value="inactive">Inactive</Option>
                        </Select>
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

export default CRM;
