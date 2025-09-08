import React from 'react';
import { Form, Input, Button, Card, message, Alert, Space } from 'antd';
import { UserOutlined, LockOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login, loading } = useAuth();

    const onFinish = async (values) => {
        const result = await login(values.username, values.password);
        
        if (result.success) {
            message.success('Đăng nhập thành công!');
            navigate('/');
        } else {
            message.error(result.error || 'Đăng nhập thất bại');
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)'
        }}>
            <Card
                style={{
                    width: 450,
                    padding: '24px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
                title={
                    <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                        🏢 EXP Management
                    </div>
                }
            >
                {/* Demo Account Info */}
                <Alert
                    message="Tài khoản Demo"
                    description={
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                            <div><strong>Admin:</strong> admin / admin123</div>
                            <div><strong>User:</strong> demo / demo123</div>
                        </Space>
                    }
                    type="info"
                    showIcon
                    icon={<InfoCircleOutlined />}
                    style={{ marginBottom: '24px' }}
                />

                <Form
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                    initialValues={{
                        username: 'admin',
                        password: 'admin123'
                    }}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Tên đăng nhập"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{
                                width: '100%',
                                height: '40px',
                                background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
                                border: 'none'
                            }}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
