import React from 'react';
import { Col, Row, Layout } from 'antd';
import DashboardItem from '../../../components/DashboardItem';
import { HeaderBlock } from '../content_blocks/HeaderBlock';

const {Content} = Layout

export const contentBlock = (user, sider, content) => {
    return <Col
        span={24}
        lg={24}
        key={'main'}
        style={{
            marginBottom: '24px'
        }}
    >
        <HeaderBlock info={user?.info?.data} />
        <Row>
            <Layout>
                {sider.code(sider)}
                <Content id="content">
                    <DashboardItem>
                        {content}
                    </DashboardItem>
                </Content>
            </Layout>
        </Row>
    </Col>;
};
