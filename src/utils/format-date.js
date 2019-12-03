function toIsoDate (date)
{
    return [
        date.getFullYear(),
        String(date.getMonth() + 101).slice(-2),
        String(date.getDate() + 100).slice(-2),
    ].join('-');
}

export {
  toIsoDate,
};
