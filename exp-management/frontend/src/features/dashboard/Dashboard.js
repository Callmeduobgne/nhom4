import React from 'react';
import { Row, Col, Card, Statistic, Typography, Progress, Avatar, List, Badge } from 'antd';
import {
    LineChart, Line, XAxis, YAxis, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import {
    TeamOutlined,
    DollarCircleOutlined,
    ProjectOutlined,
    UserOutlined,
    RiseOutlined,
    FallOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import {
    ScrollAnimateWrapper,
    StaggeredAnimation,
    AnimatedCounter,
    AnimatedProgressBar
} from '../../shared/components';

const { Title, Text } = Typography;

const revenueData = [
    { name: 'T1', value: 4000, growth: 12 },
    { name: 'T2', value: 3000, growth: -5 },
    { name: 'T3', value: 5000, growth: 18 },
    { name: 'T4', value: 2800, growth: -12 },
    { name: 'T5', value: 3900, growth: 8 },
    { name: 'T6', value: 4200, growth: 15 }
];

const projectStatusData = [
    { name: 'Hoàn thành', value: 35, color: '#52c41a' },
    { name: 'Đang thực hiện', value: 45, color: '#1890ff' },
    { name: 'Tạm dừng', value: 15, color: '#faad14' },
    { name: 'Hủy bỏ', value: 5, color: '#ff4d4f' }
];

const recentActivities = [
    { id: 1, action: 'Tạo dự án mới', user: 'Nguyễn Văn A', time: '2 phút trước', type: 'project' },
    { id: 2, action: 'Cập nhật thông tin khách hàng', user: 'Trần Thị B', time: '5 phút trước', type: 'customer' },
    { id: 3, action: 'Phê duyệt báo cáo tài chính', user: 'Lê Văn C', time: '10 phút trước', type: 'finance' },
    { id: 4, action: 'Thêm nhân viên mới', user: 'Phạm Thị D', time: '15 phút trước', type: 'hr' }
];

const topPerformers = [
    { id: 1, name: 'Nguyễn Văn A', department: 'IT', score: 98, projects: 12 },
    { id: 2, name: 'Trần Thị B', department: 'Marketing', score: 95, projects: 8 },
    { id: 3, name: 'Lê Văn C', department: 'Sales', score: 92, projects: 15 },
    { id: 4, name: 'Phạm Thị D', department: 'HR', score: 89, projects: 6 }
];

function Dashboard() {
    return (
        <div>
            {/* Header với fade-down animation */}
            <ScrollAnimateWrapper animation="fade-down" delay={0}>
                <div className="page-header">
                    <Title className="page-title">🏢 Dashboard</Title>
                    <Text className="page-subtitle">
                        Tổng quan hệ thống quản lý doanh nghiệp
                    </Text>
                </div>
            </ScrollAnimateWrapper>

            <div className="page-content">
                {/* Statistics Cards với staggered animation */}
                <StaggeredAnimation staggerDelay={150} animation="fade-up">
                    <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
                        <Col xs={24} sm={12} lg={6}>
                            <Card className="hover-lift">
                                <Statistic
                                    title="Tổng nhân viên"
                                    value={<AnimatedCounter end={112} duration={2000} />}
                                    prefix={<TeamOutlined style={{ color: '#1890ff' }} />}
                                    valueStyle={{ color: '#1890ff', fontSize: '24px', fontWeight: 'bold' }}
                                />
                                <div style={{ fontSize: '12px', color: '#52c41a', marginTop: '8px' }}>
                                    <RiseOutlined /> +8.2% so với tháng trước
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card className="hover-lift">
                                <Statistic
                                    title="Doanh thu tháng"
                                    value={<AnimatedCounter end={2.8} duration={2200} formatter={(value) => value.toFixed(1)} />}
                                    suffix=" tỷ VNĐ"
                                    prefix={<DollarCircleOutlined style={{ color: '#52c41a' }} />}
                                    valueStyle={{ color: '#52c41a', fontSize: '24px', fontWeight: 'bold' }}
                                />
                                <div style={{ fontSize: '12px', color: '#52c41a', marginTop: '8px' }}>
                                    <RiseOutlined /> +15.3% so với tháng trước
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card className="hover-lift">
                                <Statistic
                                    title="Dự án đang thực hiện"
                                    value={<AnimatedCounter end={28} duration={1800} />}
                                    prefix={<ProjectOutlined style={{ color: '#faad14' }} />}
                                    valueStyle={{ color: '#faad14', fontSize: '24px', fontWeight: 'bold' }}
                                />
                                <AnimatedProgressBar
                                    progress={75}
                                    height={6}
                                    color="#faad14"
                                    style={{ marginTop: '8px' }}
                                />
                                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                                    75% hoàn thành
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card className="hover-lift">
                                <Statistic
                                    title="Khách hàng mới"
                                    value={<AnimatedCounter end={156} duration={2400} />}
                                    prefix={<UserOutlined style={{ color: '#722ed1' }} />}
                                    valueStyle={{ color: '#722ed1', fontSize: '24px', fontWeight: 'bold' }}
                                />
                                <div style={{ fontSize: '12px', color: '#52c41a', marginTop: '8px' }}>
                                    <RiseOutlined /> +12.5% so với tháng trước
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </StaggeredAnimation>

                {/* Charts Row */}
                <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
                    <Col xs={24} lg={16}>
                        <ScrollAnimateWrapper animation="fade-left">
                            <Card
                                title="Biểu đồ doanh thu 6 tháng gần nhất"
                                className="hover-glow"
                            >
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={revenueData}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#1890ff"
                                            strokeWidth={3}
                                            dot={{ fill: '#1890ff', strokeWidth: 2, r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card>
                        </ScrollAnimateWrapper>
                    </Col>
                    <Col xs={24} lg={8}>
                        <ScrollAnimateWrapper animation="fade-right">
                            <Card
                                title="Trạng thái dự án"
                                className="hover-glow"
                            >
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={projectStatusData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {projectStatusData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </Card>
                        </ScrollAnimateWrapper>
                    </Col>
                </Row >

                {/* Bottom Row */}
                < Row gutter={[24, 24]} >
                    <Col xs={24} lg={12}>
                        <ScrollAnimateWrapper animation="fade-up" delay={200}>
                            <Card
                                title="Hoạt động gần đây"
                                className="hover-lift"
                                extra={<Badge count={recentActivities.length} />}
                            >
                                <StaggeredAnimation animation="fade-left" staggerDelay={100}>
                                    <List
                                        dataSource={recentActivities}
                                        renderItem={item => (
                                            <List.Item className="hover-scale">
                                                <List.Item.Meta
                                                    avatar={
                                                        <Avatar
                                                            style={{
                                                                background: item.type === 'project' ? '#1890ff' :
                                                                    item.type === 'customer' ? '#52c41a' :
                                                                        item.type === 'finance' ? '#faad14' : '#722ed1'
                                                            }}
                                                            icon={
                                                                item.type === 'project' ? <ProjectOutlined /> :
                                                                    item.type === 'customer' ? <UserOutlined /> :
                                                                        item.type === 'finance' ? <DollarCircleOutlined /> :
                                                                            <TeamOutlined />
                                                            }
                                                        />
                                                    }
                                                    title={item.action}
                                                    description={
                                                        <div>
                                                            <Text type="secondary">{item.user}</Text>
                                                            <Text type="secondary" style={{ marginLeft: '8px' }}>
                                                                <ClockCircleOutlined /> {item.time}
                                                            </Text>
                                                        </div>
                                                    }
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </StaggeredAnimation>
                            </Card>
                        </ScrollAnimateWrapper>
                    </Col>
                    <Col xs={24} lg={12}>
                        <ScrollAnimateWrapper animation="fade-up" delay={400}>
                            <Card
                                title="Top nhân viên xuất sắc"
                                className="hover-lift"
                                extra={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                            >
                                <StaggeredAnimation animation="fade-right" staggerDelay={100}>
                                    <List
                                        dataSource={topPerformers}
                                        renderItem={(item, index) => (
                                            <List.Item className="hover-scale">
                                                <List.Item.Meta
                                                    avatar={
                                                        <Avatar
                                                            style={{
                                                                background: index === 0 ? '#faad14' :
                                                                    index === 1 ? '#1890ff' :
                                                                        index === 2 ? '#52c41a' : '#722ed1'
                                                            }}
                                                        >
                                                            {item.name.charAt(0)}
                                                        </Avatar>
                                                    }
                                                    title={
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span>{item.name}</span>
                                                            <span style={{ color: '#52c41a', fontWeight: 'bold' }}>
                                                                <AnimatedCounter end={item.score} formatter={(value) => `${Math.floor(value)}%`} />
                                                            </span>
                                                        </div>
                                                    }
                                                    description={
                                                        <div>
                                                            <Text type="secondary">{item.department}</Text>
                                                            <Text type="secondary" style={{ marginLeft: '16px' }}>
                                                                <AnimatedCounter end={item.projects} /> dự án
                                                            </Text>
                                                            <AnimatedProgressBar
                                                                progress={item.score}
                                                                height={4}
                                                                style={{ marginTop: '4px' }}
                                                                color={
                                                                    item.score >= 95 ? '#52c41a' :
                                                                        item.score >= 90 ? '#1890ff' : '#faad14'
                                                                }
                                                            />
                                                        </div>
                                                    }
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </StaggeredAnimation>
                            </Card>
                        </ScrollAnimateWrapper>
                    </Col>
                </Row >
            </div >
        </div >
    );
}

export default Dashboard;
