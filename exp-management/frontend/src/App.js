import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const HR = lazy(() => import('./pages/HR'));
const Finance = lazy(() => import('./pages/Finance'));
const Projects = lazy(() => import('./pages/Projects'));
const CRM = lazy(() => import('./pages/CRM'));
const Assets = lazy(() => import('./pages/Assets'));
import 'antd/dist/reset.css';
import './App.css';

const { Content } = Layout;

function App() {
    const themeConfig = {
        token: {
            colorPrimary: '#1890ff',
            colorSuccess: '#52c41a',
            colorWarning: '#faad14',
            colorError: '#ff4d4f',
            colorInfo: '#1890ff',
            borderRadius: 8,
            fontSize: 14,
            fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", Arial, sans-serif',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            boxShadowSecondary: '0 4px 12px rgba(0, 0, 0, 0.08)',
        },
        components: {
            Layout: {
                headerBg: '#fff',
                siderBg: '#001529',
                bodyBg: '#f5f5f5',
            },
            Menu: {
                darkItemBg: '#001529',
                darkItemSelectedBg: '#1890ff',
                darkItemHoverBg: '#1f2937',
            },
            Card: {
                headerBg: '#fafafa',
                actionsBg: '#fafafa',
            },
        },
    };

    return (
        <ConfigProvider theme={themeConfig}>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/*" element={
                            <PrivateRoute>
                                <Layout style={{ minHeight: '100vh' }}>
                                    <Sidebar />
                                    <Layout>
                                        <Content style={{
                                            padding: '24px 32px',
                                            background: '#f5f5f5',
                                            minHeight: '100vh'
                                        }}>
                                            <div className="content-wrapper">
                                                <Suspense fallback={<div>Loading...</div>}>
                                                    <Routes>
                                                        <Route path="/" element={<Dashboard />} />
                                                        <Route path="/hr" element={
                                                            <PrivateRoute requiredRole="admin">
                                                                <HR />
                                                            </PrivateRoute>
                                                        } />
                                                        <Route path="/finance" element={
                                                            <PrivateRoute requiredRole="admin">
                                                                <Finance />
                                                            </PrivateRoute>
                                                        } />
                                                        <Route path="/projects" element={<Projects />} />
                                                        <Route path="/crm" element={<CRM />} />
                                                        <Route path="/assets" element={<Assets />} />
                                                    </Routes>
                                                </Suspense>
                                            </div>
                                        </Content>
                                    </Layout>
                                </Layout>
                            </PrivateRoute>
                        } />
                    </Routes>
                </Router>
            </AuthProvider>
        </ConfigProvider>
    );
}

export default App;
