import React, { useState } from 'react';
import { Layout, Menu, Avatar, Typography, Divider, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    DashboardOutlined,
    TeamOutlined,
    DollarOutlined,
    ProjectOutlined,
    CustomerServiceOutlined,
    BankOutlined,
    UserOutlined,
    SettingOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { Text } = Typography;

const menuItems = [
    { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '/hr', icon: <TeamOutlined />, label: 'Nhân sự' },
    { key: '/finance', icon: <DollarOutlined />, label: 'Tài chính' },
    { key: '/projects', icon: <ProjectOutlined />, label: 'Dự án' },
    { key: '/crm', icon: <CustomerServiceOutlined />, label: 'Khách hàng' },
    { key: '/assets', icon: <BankOutlined />, label: 'Tài sản' }
];

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Sider
            width={250}
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            style={{
                background: '#001529',
                boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)',
            }}
        >
            {/* Logo và Brand */}
            <div style={{
                height: 80,
                padding: '16px',
                background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderBottom: '1px solid #1f2937'
            }}>
                {!collapsed ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Avatar
                            size={32}
                            style={{
                                background: '#fff',
                                color: '#1890ff',
                                fontWeight: 'bold'
                            }}
                        >
                            EXP
                        </Avatar>
                        <Text style={{
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: '600',
                            margin: 0
                        }}>
                            EXP Manager
                        </Text>
                    </div>
                ) : (
                    <Avatar
                        size={28}
                        style={{
                            background: '#fff',
                            color: '#1890ff',
                            fontWeight: 'bold'
                        }}
                    >
                        E
                    </Avatar>
                )}
            </div>

            {/* User Info */}
            {!collapsed && (
                <div style={{
                    padding: '20px 16px',
                    borderBottom: '1px solid #1f2937',
                    textAlign: 'center'
                }}>
                    <Avatar
                        size={48}
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            marginBottom: '8px'
                        }}
                        icon={<UserOutlined />}
                    />
                    <div>
                        <Text style={{
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '500',
                            display: 'block'
                        }}>
                            Admin User
                        </Text>
                        <Text style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: '12px'
                        }}>
                            {user?.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                        </Text>
                        <Button 
                            type="link" 
                            danger 
                            onClick={handleLogout}
                            style={{ padding: 0, height: 'auto', marginTop: '8px' }}
                        >
                            Đăng xuất
                        </Button>
                    </div>
                </div>
            )}

            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                style={{
                    background: 'transparent',
                    border: 'none',
                    paddingTop: '16px'
                }}
                onClick={({ key }) => navigate(key)}
                items={menuItems.map(item => ({
                    ...item,
                    style: {
                        margin: '4px 8px',
                        borderRadius: '8px',
                        height: '44px',
                        lineHeight: '44px'
                    }
                }))}
            />

            {/* Settings ở cuối */}
            {!collapsed && (
                <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    right: '16px'
                }}>
                    <Divider style={{ borderColor: '#1f2937', margin: '16px 0' }} />
                    <Menu
                        theme="dark"
                        mode="inline"
                        style={{
                            background: 'transparent',
                            border: 'none'
                        }}
                        items={[
                            {
                                key: '/settings',
                                icon: <SettingOutlined />,
                                label: 'Cài đặt',
                                style: {
                                    margin: '4px 0',
                                    borderRadius: '8px',
                                    height: '40px',
                                    lineHeight: '40px'
                                }
                            }
                        ]}
                    />
                </div>
            )}
        </Sider>
    );
}

export default Sidebar;
