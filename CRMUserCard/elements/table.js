import React from 'react';
import { Table } from 'antd';


export const table = (data, widthProp) => {
    widthProp = !widthProp ? 50 : widthProp
    let widthValue = 100 - widthProp

    return <Table showHeader={false}
        pagination={false}
        columns={[
            {
                dataIndex: 'property',
                width: widthProp + '%'
            },
            {
                dataIndex: 'value',
                width: widthValue + '%'
            }
        ]}
        dataSource={data}
        style={{
            width: 500
        }} />;
};
