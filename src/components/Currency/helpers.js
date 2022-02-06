const currencyHelpers = () => {
  const diffMs = 3_600_000; // 1h

  /**
   * @param { Array } item
   */
  const setLocalStorageCurrData = (item) => {
    window.localStorage.setItem('currData', JSON.stringify(item));
  };

  const setDateToLocalStorage = () => {
    window.localStorage.setItem('currDate', JSON.stringify(new Date()));
  };

  /**
   * get currency data from localStorage
   * @returns {string}
   */
  const getCurrFromStorage = () => {
    return window.localStorage.getItem('currData');
  };

  /**
   * get currency date (last get data)
   * @returns {string}
   */
  const getStorageCurrDate = () => {
    return window.localStorage.getItem('currDate');
  };

  /**
   * return diff (get curr data from api)
   * @returns {boolean}
   */
  const isGetData = () => {
    const date = getStorageCurrDate() || JSON.stringify(new Date(1980, 1, 1));
    const dateLocal = new Date(JSON.parse(date));

    if (!dateLocal) return true;

    const dateNow = new Date();

    if (dateNow < dateLocal) {
      dateNow.setDate(dateNow.getDate() + 1);
    }

    const diff = (dateNow.getTime() - dateLocal.getTime());

    return diff > diffMs;
  };

  return {
    setLocalStorageCurrData,
    setDateToLocalStorage,
    getCurrFromStorage,
    getStorageCurrDate,
    isGetData,
    diffMs
  };
}

export default currencyHelpers;
