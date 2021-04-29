export const getAllInfo = (data) => {
    return Object.keys(data).map(prop => {
        return {
            key: prop,
            property: prop,
            value: data[prop]
        };
    }
    );
};

export const upFirstChar = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const numToCurrency = (num, currency) => {
    return (currency === 'usd' ? '$' : '') + (num / 100) + '.' + (num.toString().slice((num.toString()).length - 2)) + (currency === 'rub' ? '₽' : '');
};

export const dateToShowForm = (date) => {
    return new Date(date).toDateString().slice(4) + ' (' + new Date(date).toTimeString().slice(0, 8) + ')';
};
