import React from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import CrudTable from '../../shared/components/organisms/CrudTable';
import useApiData from '../../shared/hooks/useApiData';

const { Option } = Select;

function Finance() {
    const { data, loading, addRecord, updateRecord, deleteRecord } = useApiData('/transactions/');

    const columns = [
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (amount) => `$${amount}` },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Category', dataIndex: 'category', key: 'category' }
    ];

    const formFields = [
        {
            name: 'date',
            label: 'Date',
            rules: [{ required: true }],
            component: <Input type="date" />
        },
        {
            name: 'description',
            label: 'Description',
            rules: [{ required: true }],
            component: <Input />
        },
        {
            name: 'amount',
            label: 'Amount',
            rules: [{ required: true }],
            component: <InputNumber style={{ width: '100%' }} />
        },
        {
            name: 'type',
            label: 'Type',
            rules: [{ required: true }],
            component: (
                <Select>
                    <Option value="income">Income</Option>
                    <Option value="expense">Expense</Option>
                </Select>
            )
        },
        {
            name: 'category',
            label: 'Category',
            rules: [{ required: true }],
            component: <Input />
        }
    ];

    return (
        <CrudTable
            data={data}
            columns={columns}
            onAdd={addRecord}
            onEdit={updateRecord}
            onDelete={deleteRecord}
            modalTitle="Transaction"
            formFields={formFields}
            loading={loading}
        />
    );
}

export default Finance;
