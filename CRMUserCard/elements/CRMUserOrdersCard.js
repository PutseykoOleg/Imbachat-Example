import React from 'react';
import { Col, Row, Card, Alert, Typography, Collapse, Space, Tooltip, Button } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, WarningFilled, FileDoneOutlined, FileSearchOutlined, RightOutlined } from '@ant-design/icons';
import { table } from './table';
import { panel } from './panel';
import { upFirstChar, dateToShowForm, numToCurrency, getAllInfo } from "../functions";


export const CRMUserOrdersCard = (props) => {
    return <div key="orders">
        {props.orders.data.data.map(row => {
            if ((row.transaction_data && (JSON.parse(row.transaction_data).status == props.orderType && props.orderType == 'succeeded' ^ props.orderType == 'error')) ||
                (!row.transaction_data && props.orderType == 'error_data') ||
                (props.orderType == 'all'))
                return <Card title={<Row>
                    <Col flex={99}>
                        <Typography.Title level={4}>
                            <Space align={'center'}>
                                {upFirstChar(row.type)}
                                <Tooltip placement="right"
                                    title={row.transaction_data
                                        ? JSON.parse(row.transaction_data).status == "succeeded"
                                            ? "Заказ прошел успешно"
                                            : "Ошибка проведения заказа"
                                        : <div>
                                            Ошибка входных данных
                                                                                            <br /><br />
                                                                                            В файле 'CRMUserCard.js':
                                                                                            <br />
                                                                                            Выражение 'loadUserData(userId)', вызванное в 'CRMUserCard()' вернула объект 'user' с неинициализированным свойством 'user.orders.data.data.transaction_data'
                                                                                        </div>}
                                >
                                    {row.transaction_data
                                        ? JSON.parse(row.transaction_data).status == "succeeded"
                                            ? <CheckCircleFilled style={{ color: '#52c41a' }} />
                                            : <CloseCircleFilled style={{ color: 'rgb(255, 96, 59)' }} />
                                        : <WarningFilled style={{ color: '#faad14' }} />}
                                </Tooltip>
                            </Space>
                        </Typography.Title>
                    </Col>
                    <Col flex={1}>
                        {row.transaction_data
                            ? <Space size={20}>
                                <Tooltip placement="left"
                                    title="Перейти к заказу"
                                >
                                    <a href={"https://imbachat.com/backend/initbiz/cumulussubscriptions/orders/update/" + row.id}
                                        target="_blank"
                                    >
                                        <FileSearchOutlined style={{ fontSize: 20 }} />
                                    </a>
                                </Tooltip>
                                <Tooltip placement="bottom"
                                    title="Посмотреть чек"
                                >
                                    <a href={JSON.parse(row.transaction_data).receipt_url}
                                        target="_blank"
                                    >
                                        <FileDoneOutlined style={{ fontSize: 20 }} />
                                    </a>
                                </Tooltip>
                            </Space>
                            : null}
                    </Col>
                </Row>}
                    key={`row${row.id}`}
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        margin: '10px'
                    }}
                >
                    <Collapse defaultActiveKey={['transaction_data']}
                        expandIconPosition={'left'}
                        ghost
                    >
                        {panel(
                            "Данные заказа",
                            "order_data",
                            table([
                                {
                                    key: 'order_id',
                                    property: 'ID',
                                    value: row.id
                                },
                                {
                                    key: 'create_at',
                                    property: 'Дата создания',
                                    value: dateToShowForm(row.created_at)
                                }
                            ])
                        )}
                        {panel(
                            "Данные плана",
                            "plan_data",
                            <div>
                                {table([
                                    {
                                        key: 'plan_name',
                                        property: 'Название',
                                        value: getPlanInfo(row.plan_id)?.name
                                    },
                                    {
                                        key: 'plan_id',
                                        property: 'ID',
                                        value: row.plan_id
                                    },
                                    {
                                        key: 'registration_allowed',
                                        property: 'Разрешение на регистрацию',
                                        value: getPlanInfo(row.plan_id)?.registration_allowed
                                    },
                                    {
                                        key: 'trial',
                                        property: 'Пробная версия',
                                        value: getPlanInfo(row.plan_id)?.trial
                                    },
                                    {
                                        key: 'expires_in',
                                        property: 'Срок действия',
                                        value: getPlanInfo(row.plan_id)?.expires_in
                                    },
                                    {
                                        key: 'plan_after_expiry',
                                        property: 'План после истечения срока',
                                        value: <div>
                                            {getPlanInfo(row.plan_id)?.plan_after_expiry}
                                            <Button type="primary"
                                                shape="circle"
                                                size={10}
                                                style={{ marginLeft: 20 }}
                                                icon={<RightOutlined />}
                                                href={"https://imbachat.com/backend/initbiz/cumuluscore/plans/update/" + getPlanInfo(row.plan_id)?.plan_after_expiry_id}
                                                target="_blank" />
                                        </div>
                                    },
                                    {
                                        key: 'price',
                                        property: 'Стоимость',
                                        value: numToCurrency(row.amount, 'usd')
                                    }
                                ])}
                                <Button type="primary"
                                    shape="round"
                                    size={20}
                                    style={{ margin: 20 }}
                                    href={"https://imbachat.com/backend/initbiz/cumuluscore/plans/update/" + row.plan_id}
                                    target="_blank"
                                >
                                    Перейти к плану
                                </Button>
                            </div>
                        )}
                        {panel(
                            "Данные транзакции",
                            "transaction_data",
                            row.transaction_data
                                ? table([
                                    {
                                        key: 'status',
                                        property: 'Статус',
                                        value: JSON.parse(row.transaction_data).status == "succeeded" ? "Успешно" : "Ошибка",
                                        children: JSON.parse(row.transaction_data).outcome.network_status == "approved_by_network"
                                            ? [
                                                {
                                                    key: 'network_status',
                                                    property: 'Состояние сети',
                                                    value: JSON.parse(row.transaction_data).outcome.network_status == "approved_by_network" ? "Одобрено" : "Не одобрено"
                                                },
                                                {
                                                    key: 'risk_level',
                                                    property: 'Уровень риска',
                                                    value: JSON.parse(row.transaction_data).outcome.risk_level
                                                }
                                            ]
                                            : [
                                                {
                                                    key: 'network_status',
                                                    property: 'Состояние сети',
                                                    value: JSON.parse(row.transaction_data).outcome.network_status == "approved_by_network" ? "Одобрено" : "Не одобрено"
                                                },
                                                {
                                                    key: 'reason',
                                                    property: 'Причина',
                                                    value: JSON.parse(row.transaction_data).outcome.reason
                                                },
                                                {
                                                    key: 'risk_level',
                                                    property: 'Уровень риска',
                                                    value: JSON.parse(row.transaction_data).outcome.risk_level
                                                }
                                            ]
                                    },
                                    {
                                        key: 'amount',
                                        property: 'К оплате',
                                        value: numToCurrency(JSON.parse(row.transaction_data).amount, JSON.parse(row.transaction_data).currency)
                                    },
                                    {
                                        key: 'amount_captured',
                                        property: 'Оплачено',
                                        value: numToCurrency(JSON.parse(row.transaction_data).amount_captured, JSON.parse(row.transaction_data).currency),
                                        children: [
                                            {
                                                key: 'payment_method',
                                                property: 'Способ оплаты',
                                                value: JSON.parse(row.transaction_data).payment_method_details.type == "card"
                                                    ? "Карта " + upFirstChar(JSON.parse(row.transaction_data).payment_method_details.card.brand)
                                                    : JSON.parse(row.transaction_data).payment_method_details.type
                                            },
                                            {
                                                key: 'paid_at',
                                                property: 'Дата',
                                                value: dateToShowForm(row.paid_at)
                                            }
                                        ]
                                    },
                                    {
                                        key: 'amount_refunded',
                                        property: 'Возвращено',
                                        value: numToCurrency(JSON.parse(row.transaction_data).amount_refunded, JSON.parse(row.transaction_data).currency)
                                    }
                                ])
                                : <Alert type="error"
                                    showIcon
                                    message="Ошибка входных данных"
                                    description={<div>
                                        <br />
                                                                    В файле 'CRMUserCard.js':
                                                                    <br /><br />
                                                                    Выражение 'loadUserData(userId)', вызванное в 'CRMUserCard()' вернула объект 'user' с неинициализированным свойством 'user.orders.data.data.transaction_data'
                                                                </div>}
                                    style={{
                                        width: 500
                                    }} />
                        )}
                        {panel(
                            "Все",
                            "all_order_info",
                            table(getAllInfo(row))
                        )}
                    </Collapse>
                </Card>;

            else
                return null;
        })}
    </div>;
};

const getPlanInfo = (planId) => {
    let name, registration_allowed, trial, expires_in, plan_after_expiry, plan_after_expiry_id, price 

    switch (planId) {
        case 3:
            name =                  'Trial'
            registration_allowed =  'Да'
            trial =                 'Да'
            expires_in =            '7 дней'
            plan_after_expiry =     'Basic'
            plan_after_expiry_id =  4        
            price =                 numToCurrency(0)
            break;

        case 4:
            name =                  'Basic'
            registration_allowed =  'Да'
            trial =                 'Нет'
            expires_in =            ''
            plan_after_expiry =     ''
            plan_after_expiry_id =  4
            price =                 numToCurrency(0)
            break;

        case 5:
            name =                  'Advanced'
            registration_allowed =  'Да'
            trial =                 'Нет'
            expires_in =            '1 месяц'
            plan_after_expiry =     'Basic'
            plan_after_expiry_id =  4
            price =                 numToCurrency(100)
            break;

        case 6:
            name =                  'Premium'
            registration_allowed =  'Да'
            trial =                 'Нет'
            expires_in =            '1 месяц'
            plan_after_expiry =     'Basic'
            plan_after_expiry_id =  4
            price =                 numToCurrency(1900)
            break;

        case 7:
            name =                  'Пробный'
            registration_allowed =  'Да'
            trial =                 'Да'
            expires_in =            '7 дней'
            plan_after_expiry =     'Базовый'
            plan_after_expiry_id =  9
            price =                 numToCurrency(0)
            break;

        case 8:
            name =                  'Продвинутый'
            registration_allowed =  'Да'
            trial =                 'Нет'
            expires_in =            '1 месяц'
            plan_after_expiry =     'Базовый'
            plan_after_expiry_id =  9
            price =                 numToCurrency(100)
            break;

        case 9:
            name =                  'Базовый'
            registration_allowed =  'Да'
            trial =                 'Да'
            expires_in =            ''
            plan_after_expiry =     ''
            plan_after_expiry_id =  9
            price =                 numToCurrency(0)
            break;

        case 10:
            name =                  'Премиум'
            registration_allowed =  'Да'
            trial =                 'Нет'
            expires_in =            '1 месяц'
            plan_after_expiry =     'Базовый'
            plan_after_expiry_id =  9
            price =                 numToCurrency(1900)
            break;

        case 11:
            name =                  'Basic Pro'
            registration_allowed =  'Да'
            trial =                 'Да'
            expires_in =            '1 месяц'
            plan_after_expiry =     'Basic'
            plan_after_expiry_id =  4
            price =                 numToCurrency(3900)
            break;

        case 12:
            name =                  'Basic Pro Inactive'
            registration_allowed =  'Нет'
            trial =                 'Нет'
            expires_in =            ''
            plan_after_expiry =     ''
            plan_after_expiry_id =  12
            price =                 numToCurrency(0)
            break;

        case 13:
            name =                  'Advanced 3 months'
            registration_allowed =  'Да'
            trial =                 'Нет'
            expires_in =            '3 месяца'
            plan_after_expiry =     'Basic'
            plan_after_expiry_id =  4
            price =                 numToCurrency(1100)
            break;

        case 14:
            name =                  'Advanced 12 months'
            registration_allowed =  'Да'
            trial =                 'Нет'
            expires_in =            '1 год'
            plan_after_expiry =     'Basic'
            plan_after_expiry_id =  4
            price =                 numToCurrency(3500)
            break;

        case 15:
            name =                  'Premium 3 months'
            registration_allowed =  'Да'
            trial =                 'Нет'
            expires_in =            '3 месяца'
            plan_after_expiry =     'Basic'
            plan_after_expiry_id =  4
            price =                 numToCurrency(4500)
            break;

        case 16:
            name =                  'Premium 12 months'
            registration_allowed =  'Да'
            trial =                 'Нет'
            expires_in =            '1 год'
            plan_after_expiry =     'Basic'
            plan_after_expiry_id =  4
            price =                 numToCurrency(15000)
            break;

        case 17:
            name =                  'Advanced 1 month'
            registration_allowed =  'Да'
            trial =                 'Нет'
            expires_in =            '1 месяц'
            plan_after_expiry =     'Basic'
            plan_after_expiry_id =  4
            price =                 numToCurrency(499)
            break;

        case 18:
            name =                  'Purchase Pro'
            registration_allowed =  'Да'
            trial =                 'Да'
            expires_in =            ''
            plan_after_expiry =     ''
            plan_after_expiry_id =  18
            price =                 numToCurrency(59900)
            break;

        case 19:
            name =                  'Company support'
            registration_allowed =  'Нет'
            trial =                 'Нет'
            expires_in =            '1 месяц'
            plan_after_expiry =     'Basic'
            plan_after_expiry_id =  4
            price =                 numToCurrency(12000)
            break;

        case 20:
            name =                  'Business Support'
            registration_allowed =  'Нет'
            trial =                 'Нет'
            expires_in =            '1 месяц'
            plan_after_expiry =     'Basic'
            plan_after_expiry_id =  4
            price =                 numToCurrency(70000)
            break;

        case 21:
            name =                  'Demo'
            registration_allowed =  'Да'
            trial =                 'Да'
            expires_in =            '7 дней'
            plan_after_expiry =     'Premium'
            plan_after_expiry_id =  6
            price =                 numToCurrency(0)
            break;
    
        default:
            break;
    }

    return {
        name, 
        registration_allowed, 
        trial, 
        expires_in, 
        plan_after_expiry, 
        plan_after_expiry_id, 
        price
    }
}
