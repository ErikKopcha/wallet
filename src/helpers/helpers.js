/**
 * @returns {string}
 */
const numberWithSpaces = (x) => {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
};

export { numberWithSpaces };

const bitcoinExchange = (val, currentCoin) => {
  let bitcoin = 0, UAH = 0, EUR = 0;

  try {
    bitcoin = Math.abs(val / JSON.parse(localStorage.getItem('currData')).find(el => el.ccy === 'BTC').buy);
  } catch (e) { console.log(`helpers: bitcoinExchange: not found BTC`) }

  try {
    UAH = Math.abs(JSON.parse(localStorage.getItem('currData')).find(el => el.ccy === 'USD').buy * val);
  } catch (e) { console.log(`helpers: bitcoinExchange: not found USD`) }

  try {
    EUR = Math.abs(UAH / JSON.parse(localStorage.getItem('currData')).find(el => el.ccy === 'EUR').buy);
  } catch (e) { console.log(`helpers: bitcoinExchange: not found EUR`) }

  if (currentCoin === 'BTC') {
    return bitcoin.toFixed(5);
  }

  if (currentCoin === 'EUR') {
    return EUR.toFixed(1);
  }

  if (currentCoin === 'UAH') {
    return UAH.toFixed(1);
  }

  return Math.abs(val);
};

export { bitcoinExchange };