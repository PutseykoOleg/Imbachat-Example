import React from 'react';
import { Col, Row, Tag, Alert, Typography, Input, Button } from 'antd';
import { dateToShowForm, getAllInfo } from "../functions";
import { table } from "../elements/table";
import TextArea from 'antd/lib/input/TextArea';
import { fetchFromApi } from '../loadData'
import { WidgetsStats } from "./WidgetsStats";

export const GeneralBlock = (props) => {
    const hasCard = props.info.offline_cashier_stripe_id !== null;
    const inputData = {
        user_id:    props.info.id,
        notice:     props.notice.imbachat_text_note,
        status:     props.notice.imbachat_text_status
    }
    let canBeSave = false

    return <div key="info">
        <Row>
            <Tag color={hasCard ? 'green' : 'red'}
                style={{
                    margin: 10
                }}
            >
                {hasCard ? 'Карта подключена' : 'Карта не подключена'}
            </Tag>
        </Row>
        <Row>
            <Col flex={50}>
                {table([
                    {
                        key: 'email',
                        property: 'Email',
                        value: props.info.email
                    },
                    {
                        key: 'username',
                        property: 'Username',
                        value: props.info.username
                    },
                    {
                        key: 'acc_created_at',
                        property: 'Дата создания',
                        value: dateToShowForm(props.info.created_at)
                    },
                    {
                        key: 'acc_last_login',
                        property: 'Последний вход',
                        value: <Alert
                            message={dateToShowForm(props.info.last_login)}
                            type={Date(props.info.last_login) <= Date() ?
                                Date().parse - Date(props.info.last_login).parse <= 120960000 ? "success" :
                                    Date().parse - Date(props.info.last_login).parse <= 259200000 ? "warning" : "error" : "error"} />
                    },
                    {
                        key: 'all_info',
                        property: <Typography.Text strong>Все</Typography.Text>,
                        children: getAllInfo(props.info)
                    }
                ])}
            </Col>

            <Col flex={50}>
                {table([
                    {
                        key:        'status_input',
                        property:   'Статус',
                        value:      <Input  defaultValue={props.notice.imbachat_text_status}
                                            onChange={(input)=>{
                                                inputData.status = input.currentTarget.value
                                            }}
                                            allowClear
                                    />
                    },
                    {
                        key:        'notice_input',
                        property:   'Заметка',
                        value:      <TextArea   defaultValue={props.notice.imbachat_text_note}
                                                onChange={(input)=>{
                                                    inputData.notice = input.currentTarget.value
                                                }}
                                                allowClear
                                                autoSize={{
                                                    minRows:    2,
                                                    maxRows:    10
                                                }}
                                    />
                    }
                ], 30)}
                <Row>
                    <Col flex={8}/>
                    <Col flex={3}>
                        <Button id="save_button"
                                type="primary"
                                shape="round"
                                size={20}
                                style={{ margin: 20 }}
                                onClick={()=>{
                                    loadUserTextData(inputData)
                                }}
                            >
                                Сохранить
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
        <WidgetsStats widgets={props.widgets.data.data}  />
    </div>;
};

const loadUserTextData = async (data) => {
    const url = 'https://develop.imbachat.com.awsweb.imbachat.com/api/v2/notice/update'
    const method =  'POST'

    try{
        const response = await fetchFromApi(url, {
            method:     method,
            body:       JSON.stringify({
                            user_id:    data.user_id,
                            notice:     data.notice,
                            status:     data.status
                        })
        })
    }
    catch (e){
        console.log(e)
    }
}
