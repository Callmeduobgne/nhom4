import React from 'react';
import { Form, Input, Select, Tag } from 'antd';
import CrudTable from '../../shared/components/organisms/CrudTable';
import useApiData from '../../shared/hooks/useApiData';

const { Option } = Select;

function HR() {
    const { data, loading, pagination, addRecord, updateRecord, deleteRecord, fetchPage } = useApiData('/employees/');

    const columns = [
        {
            title: 'Tên nhân viên',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email) => (
                <a href={`mailto:${email}`} style={{ color: '#1890ff' }}>
                    {email}
                </a>
            )
        },
        {
            title: 'Chức vụ',
            dataIndex: 'position',
            key: 'position',
            render: (position) => (
                <Tag color="blue">{position}</Tag>
            )
        },
        {
            title: 'Phòng ban',
            dataIndex: 'department',
            key: 'department',
            render: (department) => {
                const colors = {
                    'IT': 'cyan',
                    'HR': 'green',
                    'Finance': 'gold',
                    'Marketing': 'magenta',
                    'Sales': 'orange'
                };
                return <Tag color={colors[department] || 'default'}>{department}</Tag>;
            }
        }
    ];

    const formFields = [
        {
            name: 'name',
            label: 'Tên nhân viên',
            rules: [{ required: true, message: 'Vui lòng nhập tên nhân viên' }],
            component: <Input placeholder="Nhập tên nhân viên" />
        },
        {
            name: 'email',
            label: 'Email',
            rules: [
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' }
            ],
            component: <Input placeholder="nhansuviên@company.com" />
        },
        {
            name: 'position',
            label: 'Chức vụ',
            rules: [{ required: true, message: 'Vui lòng chọn chức vụ' }],
            component: (
                <Select placeholder="Chọn chức vụ">
                    <Option value="Developer">Developer</Option>
                    <Option value="Senior Developer">Senior Developer</Option>
                    <Option value="Team Lead">Team Lead</Option>
                    <Option value="Manager">Manager</Option>
                    <Option value="Director">Director</Option>
                    <Option value="HR Specialist">HR Specialist</Option>
                    <Option value="Accountant">Accountant</Option>
                    <Option value="Marketing Specialist">Marketing Specialist</Option>
                    <Option value="Sales Representative">Sales Representative</Option>
                </Select>
            )
        },
        {
            name: 'department',
            label: 'Phòng ban',
            rules: [{ required: true, message: 'Vui lòng chọn phòng ban' }],
            component: (
                <Select placeholder="Chọn phòng ban">
                    <Option value="IT">IT</Option>
                    <Option value="HR">HR</Option>
                    <Option value="Finance">Finance</Option>
                    <Option value="Marketing">Marketing</Option>
                    <Option value="Sales">Sales</Option>
                </Select>
            )
        }
    ];

    return (
        <CrudTable
            data={data}
            columns={columns}
            onAdd={addRecord}
            onEdit={updateRecord}
            onDelete={deleteRecord}
            modalTitle="Nhân viên"
            formFields={formFields}
            loading={loading}
            title="Quản lý Nhân sự"
            description="Quản lý thông tin nhân viên, chức vụ và phòng ban trong công ty"
            pagination={pagination}
            onPageChange={fetchPage}
        />
    );
}

export default HR;
