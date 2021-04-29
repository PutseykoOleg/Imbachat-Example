import React from 'react';

export const sectionContent = (sider, data) => {
    return <div>
        {Object.keys(data).filter(property => data[property] !== null).map(key => {
            let content = data[key];

            return <div id={key + "_content"}
                key={key}
                class="content-block"
                style={{ display: getDisplay(sider.key, key) }}>
                {content}
            </div>;
        })}
    </div>;
};

const getDisplay = (siderKey, blockId) => {
    return siderKey == blockId ? "block" : "none"
}
