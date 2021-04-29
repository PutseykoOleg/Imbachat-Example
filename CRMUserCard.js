import React from 'react';
import { Skeleton, Layout, Menu, Alert, Collapse } from 'antd';
import { useParams } from "react-router-dom";
import { loadUserAllData } from './CRMUserCard/loadData';
import { GeneralBlock } from './CRMUserCard/content_blocks/GeneralBlock';
import { OrdersBlock } from './CRMUserCard/content_blocks/OrdersBlock';
import { SubscriptionsBlock } from './CRMUserCard/content_blocks/SubscriptionsBlock';
import { WidgetsBlock } from './CRMUserCard/content_blocks/WidgetsBlock';
import { contentBlock } from './CRMUserCard/elements/contentBlock';
import { sectionContent } from './CRMUserCard/elements/sectionContent';

// imbachat_admin:ser32poH

/**
 *
 GET запросы
 https://imbachat.com/api/v2/users
 https://imbachat.com/api/v2/orders?user_id=230
 https://imbachat.com/api/v2/widgets?user_id=230
 https://imbachat.com/api/v2/subscriptions?user_id=230
 POST запросы
 https://imbachat.com/api/v2/user/update (нужно поле user_id и поля, которые хочется изменить, название полей совпадает с именами колонок в бд)
 https://imbachat.com/api/v2/user/update_notice(нужно поле user_id и поле notice)
 https://imbachat.com/api/v2/user/update_status(нужно поле user_id и поле status)
 в гет запросах для работы пагинации нужно укзаать page параметр
 https://imbachat.com/api/v2/users?page=3
 https://imbachat.com/api/v2/user/get?user_id=230

 * @param {type} id
 * @returns {unresolved}
 */

const {Sider} = Layout

const CRMUserCard = () => {
    const {userId} = useParams();

    const [user, setResponse] = React.useState(null);
    React.useEffect(() => {
        const fetchData = async () => {
            const res = await loadUserAllData(userId)
            setResponse(res);
        };
        fetchData();
    }, []);

    let sider = {
        key:    'general',
        content_loaded: false,
        code:   sider =>    <Sider width={200} style={{background: '#f0f0f0'}}>
                                <Menu   id="sider-menu"
                                        mode="inline"
                                        defaultSelectedKeys={[sider.key]}
                                        style={{height: '100%'}}
                                        onClick={(menu) => {
                                            sider.key = menu.key
                                            showContent(sider)
                                        }}>
                                    <Menu.Item key={'general'} disabled={!sider.content_loaded}>Основная информация</Menu.Item>
                                    <Menu.Item key={'orders'} disabled={!sider.content_loaded}>Заказы</Menu.Item>
                                    <Menu.Item key={'subscriptions'} disabled={!sider.content_loaded}>Подписки</Menu.Item>
                                    <Menu.Item key={'widgets'} disabled={!sider.content_loaded}>Виджеты</Menu.Item>
                                </Menu>
                            </Sider>
    }

    if (!user) {
        return  contentBlock(user, sider,
                    <div style={{width: '70%'}}>
                        <Skeleton paragraph={{rows: 1}} active/>
                    </div>
                );
    }

    if(user.info.data.id) {
        sider.content_loaded = true

        return  contentBlock(user, sider,
                    sectionContent(sider, {
                        general:        <GeneralBlock info={user.info.data} widgets={user.widgets} notice={user.notice.data}/>,
                        orders:         <OrdersBlock orders={user.orders}/>,
                        subscriptions:  <SubscriptionsBlock subscriptions={user.subscriptions}/>,
                        widgets:        <WidgetsBlock widgets={user.widgets}/>
                    })
                );
    }

    return  contentBlock(user, sider,
                <Alert  type="error"
                        showIcon
                        message="Ошибка входных данных"
                        description={
                            <div>
                                <br/>
                                В файле 'CRMUserCard.js':
                                <br/><br/>
                                Выражение 'loadUserData(userId)', вызванное в 'CRMUserCard()' вернула неинициализированный объект 'user'
                            </div>
                        }
                        style={{
                            width: 500
                        }}
                />
            );
}

const showContent = (sider) => {
    if(sider.content_loaded){
        let contentBlocks = document.getElementById('content').getElementsByClassName('content-block')
        for(let i = 0; i < contentBlocks.length; i++) {
            if(contentBlocks[i].id == sider.key + "_content"){
                document.getElementById(contentBlocks[i].id).style.display = "block"
            } else {
                document.getElementById(contentBlocks[i].id).style.display = "none"
            }
        }
    }
}
export default CRMUserCard;
