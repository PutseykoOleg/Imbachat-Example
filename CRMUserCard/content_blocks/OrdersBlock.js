import React from 'react';
import { Tabs } from 'antd';
import { CRMUserOrdersCard } from "../elements/CRMUserOrdersCard";

const {TabPane} = Tabs

export const OrdersBlock = (props) => {
    let countOrders = {
        'all': 0,
        'succeeded': 0,
        'error': 0,
        'error_data': 0
    };

    props.orders.data.data.map(row => {
        countOrders['all']++;

        if (row.transaction_data) {
            if (JSON.parse(row.transaction_data).status == 'succeeded') {
                countOrders['succeeded']++;
            } else {
                countOrders['error']++;
            }
        } else {
            countOrders['error_data']++;
        }
    });

    return <Tabs defaultActiveKey='all' centered>
        <TabPane tab={'Все (' + countOrders['all'] + ')'} key={'all'}>
            <CRMUserOrdersCard orders={props.orders} orderType={'all'} />
        </TabPane>
        <TabPane tab={'Успешные (' + countOrders['succeeded'] + ')'} key={'succeeded'}>
            <CRMUserOrdersCard orders={props.orders} orderType={'succeeded'} />
        </TabPane>
        <TabPane tab={'Неуспешные (' + countOrders['error'] + ')'} key={'error'}>
            <CRMUserOrdersCard orders={props.orders} orderType={'error'} />
        </TabPane>
        <TabPane tab={'С ошибками (' + countOrders['error_data'] + ')'} key={'error_data'}>
            <CRMUserOrdersCard orders={props.orders} orderType={'error_data'} />
        </TabPane>
    </Tabs>;
};
