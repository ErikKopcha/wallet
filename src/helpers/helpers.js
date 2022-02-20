/**
 * @returns {string}
 */
const numberWithSpaces = (x) => {
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
};

export { numberWithSpaces };



const bitcoinExchange = (val,currentCoin)=>{
  const bitcoin = Math.abs(val / JSON.parse(localStorage.getItem('currData')).find(el=>el.ccy === 'BTC').buy);
  const UAH = Math.abs(JSON.parse(localStorage.getItem('currData')).find(el=>el.ccy === 'USD').buy * val);
  const EUR = Math.abs(UAH/ JSON.parse(localStorage.getItem('currData')).find(el=>el.ccy === 'EUR').buy);
 
if(currentCoin === 'BTC'){
  
  return bitcoin.toFixed(5)
}
if(currentCoin === 'EUR'){
 
  return EUR.toFixed(1)
}
if(currentCoin === 'UAH'){
  
  return UAH.toFixed(1)
}
return Math.abs(val)
}



export {bitcoinExchange};