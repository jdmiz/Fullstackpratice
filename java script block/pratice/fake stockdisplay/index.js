import {fakeStockAPI} from './fakestockapi.js'
setInterval(function(){
 stockdata = fakeStockAPI;
 renderStock(stockdata);

},3000

)
function renderStock(stockdata){
    prevdata = 0,
const stockName = document.getElementById('stock-name');
const stockSymbol = document.getElementById('stock-symbol');
const stockPrice = document.getElementById('stock-price');
const stockTime = document.getElementById('stock-time');
stockName.innerHTML = stockdata.name;
stockSymbol.innerHTML = stockdata.symbol;
stockPrice.innerHTML = stockdata.price;
stockTime.innerHTML = stockdata.time();
const output = prevdata < stockdata.price ? './arrow-up-green.png' :prevdata>stockdata.price ?'./arrow-down-red.png' : './arrow-neutral.png';
prevdata = stockdata.price;
stockDisplay.innerHTML += `<img src="${output}" alt="Price Change">`;
}