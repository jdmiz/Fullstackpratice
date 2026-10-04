import {fakeStockAPI} from './fakestockapi.js'
setInterval(function(){
 stockdata = fakeStockAPI;
 renderStock(stockdata);

},3000

)
function renderStock(stockdata){
    let prevdata = 0;
const stockName = document.getElementById('stock-name');
const stockSymbol = document.getElementById('stock-symbol');
const stockPrice = document.getElementById('stock-price');
const stockTime = document.getElementById('stock-time');
const {name, symbol, price, time} = stockdata;
stockName.innerHTML = name;
stockSymbol.innerHTML = symbol;
stockPrice.innerHTML = price;
stockTime.innerHTML = time();
const output = prevdata < price ? './arrow-up-green.png' : prevdata > price ? './arrow-down-red.png' : './arrow-neutral.png';
prevdata = stockdata.price;
stockDisplay.innerHTML += `<img src="${output}" alt="Price Change">`;
}