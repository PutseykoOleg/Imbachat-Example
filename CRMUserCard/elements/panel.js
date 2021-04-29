import React from 'react';
import { Typography, Collapse } from 'antd';

const {Panel} = Collapse

export const panel = (title, key, content) => {
    return <Panel header={title
        ? <Typography.Title level={5} strong>
            {title}
        </Typography.Title>
        : null}
        key={key}
    >
        {content}
    </Panel>;
};
