import React from 'react';
import { Row, Skeleton, Card } from 'antd';

export const HeaderBlock = (props) => {
    let HeaderContent = () => {
        return <div style={{ marginLeft: 12, width: 200 }}>
            <Skeleton paragraph={{ rows: 0, width: 50 }} size={'small'} active />
        </div>;
    };

    if (props?.info) {
        if (props.info.id) {
            HeaderContent = () => {
                return <div style={{ marginLeft: 12, width: 200 }}>
                    <h2 style={{ marginBottom: 0 }}>{props.info.name} {props.info.surname}</h2>
                    <h5>ID {props.info.id}</h5>
                </div>;
            };
        } else {
            HeaderContent = () => {
                return <div style={{ marginLeft: 12 }}>
                    <h2 style={{ marginBottom: 0 }}>Пользователь не найден</h2>
                    <h5>Неверный ID</h5>
                </div>;
            };
        }
    }

    return <Row>
        <Card size="small" style={{ width: '100%' }}>
            <HeaderContent />
        </Card>
    </Row>;
};
