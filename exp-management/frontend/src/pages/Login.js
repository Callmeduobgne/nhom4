import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const onFinish = (values) => {
        // Mock login - replace with actual API call
        if (values.username === 'admin' && values.password === 'admin123') {
            login({
                username: values.username,
                role: 'admin',
                name: 'Admin User'
            });
            message.success('Đăng nhập thành công!');
            navigate('/');
        } else if (values.username === 'user' && values.password === 'user123') {
            login({
                username: values.username,
                role: 'user',
                name: 'Normal User'
            });
            message.success('Đăng nhập thành công!');
            navigate('/');
        } else {
            message.error('Tên đăng nhập hoặc mật khẩu không đúng!');
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
                    width: 400,
                    padding: '24px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
                title={
                    <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                        Đăng nhập
                    </div>
                }
            >
                <Form
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
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
