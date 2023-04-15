const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
}

const parseDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate
}

export { formatDate, parseDate }