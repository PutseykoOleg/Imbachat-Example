import React from 'react';
import { Card, Typography, Space, Tooltip } from 'antd';
import { CheckCircleFilled, WarningFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { dateToShowForm, getAllInfo } from "../functions";
import { table } from "../elements/table";

export const SubscriptionsBlock = (props) => {
    return <div key="subscriptions">
        {props.subscriptions.data.data.map(subs => <Card key={`row${subs.id}`}
            title={<Typography.Title level={4}>
                <Space align={'center'}>
                    ID {subs.id}
                    <Tooltip placement="right"
                        title={subs.is_active == 1
                            ? subs.is_expiring == 0
                                ? "Активен"
                                : "Истекает"
                            : "Истек"}
                    >
                        {subs.is_active == 1
                            ? subs.is_expiring == 0
                                ? <CheckCircleFilled style={{ color: '#52c41a' }} />
                                : <ExclamationCircleFilled style={{ color: '#1890ff' }} />
                            : <WarningFilled style={{ color: '#faad14' }} />}
                    </Tooltip>
                </Space>
            </Typography.Title>}
            style={{
                padding: '10px',
                border: '1px solid #ccc',
                margin: '10px'
            }}
        >
            {table([
                {
                    key: 'cluster_slug',
                    property: 'Cluster slug',
                    value: subs.cluster_slug
                },
                {
                    key: 'plan_id',
                    property: 'ID плана',
                    value: subs.plan_id
                },
                {
                    key: 'created_at',
                    property: 'Дата создания',
                    value: dateToShowForm(subs.created_at)
                },
                {
                    key: 'updated_at',
                    property: 'Дата обновления',
                    value: dateToShowForm(subs.updated_at)
                },
                {
                    key: 'starts_at',
                    property: 'Дата начала',
                    value: dateToShowForm(subs.starts_at)
                },
                {
                    key: 'all_subs_info',
                    property: <Typography.Text strong>Все</Typography.Text>,
                    children: getAllInfo(subs)
                }
            ])}
        </Card>
        )}
    </div>;

};
