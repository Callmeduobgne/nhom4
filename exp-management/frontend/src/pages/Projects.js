import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, Space, Progress } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../services/api';

const { Option } = Select;

function Projects() {
    const [projects, setProjects] = useState([]);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await api.get('/projects/');
            setProjects(response);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleSubmit = async (values) => {
        try {
            const data = {
                ...values,
                start_date: values.start_date?.format('YYYY-MM-DD'),
                end_date: values.end_date?.format('YYYY-MM-DD')
            };
            if (editId) {
                await api.put(`/projects/${editId}/`, data);
            } else {
                await api.post('/projects/', data);
            }
            setVisible(false);
            form.resetFields();
            setEditId(null);
            fetchProjects();
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    const handleEdit = (record) => {
        setEditId(record.id);
        form.setFieldsValue(record);
        setVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/projects/${id}/`);
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Client', dataIndex: 'client', key: 'client' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Start Date', dataIndex: 'start_date', key: 'start_date' },
        { title: 'End Date', dataIndex: 'end_date', key: 'end_date' },
        {
            title: 'Progress',
            dataIndex: 'progress',
            key: 'progress',
            render: (progress) => <Progress percent={progress} size="small" />
        },
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
                    Add Project
                </Button>
            </div>
            <Table columns={columns} dataSource={projects} rowKey="id" />
            <Modal
                title={editId ? 'Edit Project' : 'Add Project'}
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
                    <Form.Item name="client" label="Client" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                        <Select>
                            <Option value="planning">Planning</Option>
                            <Option value="active">Active</Option>
                            <Option value="completed">Completed</Option>
                            <Option value="cancelled">Cancelled</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="start_date" label="Start Date">
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="end_date" label="End Date">
                        <DatePicker style={{ width: '100%' }} />
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

export default Projects;
