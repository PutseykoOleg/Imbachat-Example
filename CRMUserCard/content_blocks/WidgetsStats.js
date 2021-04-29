import React from 'react';
import { Col, Card, Typography, Space } from 'antd';
import { dateToShowForm, getAllInfo } from "../functions";
import ChartRenderer from '../../../components/ChartRenderer';
import DashboardItem from '../../../components/DashboardItem';
import Dashboard from '../../../components/Dashboard';
import {dashboard_wp} from '../../../pages/dashboardPageWP.js';
import { table } from "../elements/table";
import {isOld, isActive, stripeIdRender, jsonPluginsRender, authTokenData, hostRender, utmTermRender, DashboardUtils, timeRender, emailRender, userCRMLinkRender} from '../../../DashboardUtils';


export const WidgetsStats = ({widgets}) => {


    const stats = [
        {
            id: 0,
            lg: 24,
            name: 'Виджеты WP',
            vizState: {
                query: {
                "timezone": "Asia/Vladivostok",
                         "measures":[],
                        "timeDimensions":[{"dimension":"ImWpData.createdAt"}],
                        "dimensions":[
                            "ImWpData.host",
                "ImWpData.devId",
                "ImWpData.liveTime",
                "ImWpData.lastUpdate",
                "ImWpData.createdAt",
                "ImWpData.lang",
                "ImWpData.pluginVersion",
                            "ImWpData.template",
                            "ImWpData.plugins", 
                        ],
                        "order":{"ImWpData.lastUpdate":"asc","ImWpData.createdAt":"desc"},
                        "filters":[{"member": "ImWpData.userId", "operator": "equals", "values": widgets.map(w => w.user_id+"")}]
                    },
                chartType: 'table',
                opts: {
                    dataMap: (data) => {
                        return data
                    },
                    columns: (data) => { 
                        data[0].title = 'Host'
                        data[0].render = hostRender 
                        
                        data[1].title = 'DevId' 
                        data[2].title = 'liveTime'
                        data[2].render = isOld
                        data[3].title = 'Active' // lastUpdate
                        data[3].render = isActive
                         
                        data[4].title = 'createdAt'
                        data[4].render = timeRender
    //                    data[4].render = hostRender 
                         
                        data[5].title = 'Lang' 
                        data[6].title = 'Version'
                        data[7].title = 'template' 
                        data[8].title = 'plugins'
                        data[8].render = jsonPluginsRender 
     
                        
                        return data.filter(row => !["ImWpData.userId"].includes(row.key) ) 
                    },
                    dataSource: (data) => {
                        return data
                    },
                }
            }
        } ,
        {
            lg:12,
            span:12,
            name:'Среднее время ответов на апи запросы',
            vizState: {
            query: {
                "measures": [
                    "ImbachatAnalyticsWidgets.apiTimeCallMax",
                    "ImbachatAnalyticsWidgets.apiTimeCallAvg"
                ],
                "timeDimensions": [
                    {
                        "dimension": "ImbachatAnalyticsWidgets.createdAt",
                        "granularity": "day",
                        "dateRange": "Last 30 days"
                    }
                ],
                "filters": [
                    {"member": "ImbachatAnalyticsWidgets.devId", "operator": "equals", "values": widgets.map(w => w.id+"")},
                    {"member": "ImbachatAnalyticsWidgets.event", "operator": "equals", "values": ["apiCall"]}
                ], "order": {}},
            chartType: 'line',
                       }
    },
    {
        lg:12,
        span:12,
        name:'Количество АПИ запросов к сайту от чата',
        vizState:{
        query: {
            "measures": [
                "ImbachatAnalyticsWidgets.count"
            ],
            "timeDimensions": [
                {
                    "dimension": "ImbachatAnalyticsWidgets.createdAt",
                    "granularity": "day",
                    "dateRange": "Last 30 days"
                }
            ],
            "filters": [
                {"member": "ImbachatAnalyticsWidgets.devId", "operator": "equals", "values": widgets.map(w => w.id+"")},
                {"member": "ImbachatAnalyticsWidgets.event", "operator": "equals", "values": ["apiCall"]}
            ], "order": {}
        },
        chartType: 'line',
                   }}
                   ,
                   {
                    lg: 12,
                    id: 0,
                    name: 'Загрузки виджета пользователями (по месяцам)',
                    vizState: {
                        query: {
                            "measures": [
                                "ImbachatAnalyticsWidgets.count"
                            ],
                            "timeDimensions": [
                                {
                                    "dimension": "ImbachatAnalyticsWidgets.createdAt",
                                    "granularity": "month",
                                    "dateRange": "Last 365 days"
                                }
                            ],
                            "filters": [
                                {"member": "ImbachatAnalyticsWidgets.devId", "operator": "equals", "values": widgets.map(w => w.id+"")},
                                {"member": "ImbachatAnalyticsWidgets.event", "operator": "equals", "values": ["load"]}
                            ], "order": {}
                        },
                        chartType: 'line',
                    },
                },
                 
                {
                    lg: 12,
                    id: 0,
                    name: 'Загрузки виджета пользователями (по дням)',
                    vizState: {
                        query: {
                            "measures": [
                                "ImbachatAnalyticsWidgets.count"
                            ],
                            "timeDimensions": [
                                {
                                    "dimension": "ImbachatAnalyticsWidgets.createdAt",
                                    "granularity": "day",
                                    "dateRange": "Last 30 days"
                                }
                            ],
                            "filters": [
                                {"member": "ImbachatAnalyticsWidgets.devId", "operator": "equals", "values": widgets.map(w => w.id+"")},
                                {"member": "ImbachatAnalyticsWidgets.event", "operator": "equals", "values": ["load"]}
                            ], "order": {}
                        },
                        chartType: 'line',
                    },
                },
                
                
                
                
                
                {
                    lg: 12,
                    id: 0,
                    name: 'Новые пользователи в чате по месяцам',
                    vizState: {
                        query: {
                            "measures": ["ImbachatUsers.count"],
                            "timeDimensions": [
                                {
                                    "dimension": "ImbachatUsers.createdAt",
                                    "granularity": "month",
                                    "dateRange": "Last 365 days"
                                }
                            ],
                            "filters": [
                                {"member": "ImbachatUsers.imbaId", "operator": "equals", "values": widgets.map(w => w.id+"")},
                            ],
                            "order": {}
                        },
                        chartType: 'line',
                    },
                },
                
                 
                {
                    lg: 12,
                    id: 0,
                    name: 'Новые пользователи в чате по дням за последние 30 дней',
                    vizState: {
                        query: {
                            "measures": ["ImbachatUsers.count"],
                            "timeDimensions": [
                                {
                                    "dimension": "ImbachatUsers.createdAt",
                                    "granularity": "day",
                                    "dateRange": "Last 30 days"
                                }
                            ],
                            "filters": [
                                {"member": "ImbachatUsers.imbaId", "operator": "equals", "values": widgets.map(w => w.id+"")},
                            ],
                            "order": {}
                        },
                        chartType: 'line',
                    },
                },
                
                 
                
                
                {
                    lg: 12,
                    id: 0,
                    name: 'Новые диалоги в чате по месяцам',
                    vizState: {
                        query: {
                            "measures": ["ImbachatRoominfo.count"],
                            "timeDimensions": [ 
                                {
                                    "dimension": "ImbachatRoominfo.createdAt",
                                    "granularity": "month",
                                    "dateRange": "Last 365 days"
                                }
                            ],
                            "filters": [
                                {"member": "ImbachatRoominfo.imbaId", "operator": "equals", "values": widgets.map(w => w.id+"")},
                            ],
                            "order": {}
                        },
                        chartType: 'line',
                    },
                },
                
                
                {
                    lg: 12,
                    id: 0,
                    name: 'Новые диалоги в чате по дням за последние 30 дней',
                    vizState: {
                        query: {
                            "measures": ["ImbachatRoominfo.count"],
                            "timeDimensions": [
                                {
                                    "dimension": "ImbachatRoominfo.createdAt",
                                    "granularity": "day",
                                    "dateRange": "Last 30 days"
                                }
                            ],
                            "filters": [
                                {"member": "ImbachatRoominfo.imbaId", "operator": "equals", "values": widgets.map(w => w.id+"")},
                            ],
                            "order": {}
                        },
                        chartType: 'line',
                    },
                },
                
                
                {
                    lg: 12,
                    id: 0,
                    name: 'Сообщения пользователей (месяцы)',
                    vizState: {
                        query: {
                            "measures": ["ImbachatMessages.count"],
                            "timeDimensions": [
                                {
                                    "dimension": "ImbachatMessages.createdAt",
                                    "granularity": "month",
                                    "dateRange": "Last 365 days"
                                }
                            ],
                            "filters": [
                                {"member": "ImbachatMessages.imbaId", "operator": "equals", "values": widgets.map(w => w.id+"")},
            
                            ],
                            "order": {}
                        },
                        chartType: 'line',
                    },
                },
                
                
                
                {
                    lg: 12,
                    id: 0,
                    name: 'Сообщения пользователей (дни)',
                    vizState: {
                        query: {
                            "measures": ["ImbachatMessages.count"],
                            "timeDimensions": [
                                {
                                    "dimension": "ImbachatMessages.createdAt",
                                    "granularity": "day",
                                    "dateRange": "Last 30 days"
                                }
                            ],
                            "filters": [
                                {"member": "ImbachatMessages.imbaId", "operator": "equals", "values": widgets.map(w => w.id+"")},
            
                            ],
                            "order": {}
                        },
                        chartType: 'line',
                    },
                },
]
// debugger

    return  <Dashboard >{stats.map((stat, index) => { return  <Col
            span={stat.span || 24}
            lg={stat.lg || 24}
            key={stat.id || index}
            style={{marginBottom: '24px'}}
            >
        <DashboardItem title={stat.name}>
            <ChartRenderer vizState={stat.vizState} />
        </DashboardItem>
        </Col>})}
        
    </Dashboard>
}
 