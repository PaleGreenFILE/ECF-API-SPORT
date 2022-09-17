export const filterResult = () => {
    const filterResult = searchApiData.filter((item) => item.active === 'desactiver');
    setData(filterResult);
}

