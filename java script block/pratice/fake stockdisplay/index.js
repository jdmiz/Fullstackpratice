import {getStockData} from './fakestockapi.js'
setInterval(function(){
 const stockdata = getStockData();
 renderStock(stockdata);

},1000

)
    let prevdata = null;
function renderStock(stockdata){

const stockName = document.getElementById('stock-name');
const stockSymbol = document.getElementById('stock-symbol');
const stockPrice = document.getElementById('stock-price')
const stockDisplay = document.getElementById('stock-change');
const stockTime = document.getElementById('stock-time');
const {name, symbol, price, time} = stockdata;
stockName.innerHTML = name;
stockSymbol.innerHTML = symbol;
stockPrice.innerHTML = price;
stockTime.innerHTML = time;
const currentPrice = price;
const output = prevdata === null ? './arrow-neutral-grey.svg' : prevdata < currentPrice ? './arrow-up-green.svg' : prevdata > currentPrice ? './arrow-down-red.svg' : './arrow-neutral-grey.svg';
prevdata = currentPrice;
stockDisplay.innerHTML = `<img src="${output}" alt="Price Change">`;
}