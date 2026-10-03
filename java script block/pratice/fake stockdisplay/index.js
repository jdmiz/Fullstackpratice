import {fakeStockAPI} from './fakestockapi.js'
setInterval(function(){
 stockdata = fakeStockAPI;
 renderStock(stockdata);

}

),3000
function renderStock(stockdata){
const stockDisplay = document.getElementById('stock-display');
const stockName = document.getElementById('stock-name');
const stockSymbol = document.getElementById('stock-symbol');
const stockPrice = document.getElementById('stock-price');
const stockTime = document.getElementById('stock-time');

}