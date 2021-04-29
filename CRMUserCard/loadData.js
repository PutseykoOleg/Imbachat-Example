export const fetchFromApi = (url, opt = {}) => {
    const headers = new Headers();
    headers.append('Content-type', 'text/json');
    return fetch(url, { ...opt, headers });
};

const getUserOrders = async (id) => {
    const res = await fetchFromApi(`https://develop.imbachat.com.awsweb.imbachat.com/api/v2/orders?user_id=${id}`);
    return await res.json();
};

const getUserSubscriptions = async (id) => {
    const res = await fetchFromApi(`https://develop.imbachat.com.awsweb.imbachat.com/api/v2/subscriptions?user_id=${id}`);
    return res.json();
};

const getUserWidgets = async (id) => {
    const res = await fetchFromApi(`https://develop.imbachat.com.awsweb.imbachat.com/api/v2/widgets?user_id=${id}`);
    return res.json();
};

const getUserInfo = async (id) => {
    const res = await fetchFromApi(`https://develop.imbachat.com.awsweb.imbachat.com/api/v2/user/get?user_id=${id}`);
    return res.json();
};

const getUserNotice = async (id) => {
    const res = await fetchFromApi(`https://develop.imbachat.com.awsweb.imbachat.com/api/v2/notice/get?user_id=${id}`);
    return res.json();
}

export const loadUserAllData = async (userId) => {

    const orders = await getUserOrders(userId);
    const subscriptions = await getUserSubscriptions(userId);
    const widgets = await getUserWidgets(userId);
    const info = await getUserInfo(userId);
    const notice = await getUserNotice(userId);

    return {
        orders,
        subscriptions,
        widgets,
        info,
        notice
    };
};
