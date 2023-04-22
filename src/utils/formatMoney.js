const numberWithCommas = (number) => {
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export {numberWithCommas}