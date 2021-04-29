import React from 'react';
import { Col, Card, Typography, Space } from 'antd';
import { dateToShowForm, getAllInfo } from "../functions"; 
import { table } from "../elements/table";
import { WidgetsStats } from "./WidgetsStats";


export const WidgetsBlock = (props) => {
    return <div key="subscriptions">
        {props.widgets.data.data.map(widget => <Card key={`row${widget.id}`}
                                                     title={ < Typography.Title level = {4} >
                                                                         <Space align={'center'}>
                            ID {widget.id}
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
                                    key: 'user_plan',
                                    property: 'Пользовательский план',
                                    value: widget.user_plan
                                },
                                {
                                    key: 'cms',
                                    property: 'CMS',
                                    value: widget.cms
                                },
                                {
                                    key: 'host',
                                    property: 'Host',
                                    value: widget.host
                                },
                                {
                                    key: 'lang',
                                    property: 'Язык',
                                    value: widget.lang
                                },
                                {
                                    key: 'theme',
                                    property: 'Тема',
                                    value: widget.theme
                                },
                                {
                                    key: 'created_at',
                                    property: 'Дата создания',
                                    value: dateToShowForm(widget.created_at)
                                },
                                {
                                    key: 'updated_at',
                                    property: 'Дата обновления',
                                    value: dateToShowForm(widget.updated_at)
                                },
                                {
                                    key: 'all_subs_info',
                                    property: <Typography.Text strong>Все</Typography.Text>,
                                    children: getAllInfo(widget)
                                }
                                ])} 
            <WidgetsStats widgets={[widget]}  />
        </Card>
                )}
    </div>;

};
