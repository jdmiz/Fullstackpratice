import {fakeStockAPI} from './fakestockapi.js'
let previousPrice = null;
const stockDisplay = document.getElementById('stock-display');

function updateStock() {
 const stockdata = {
  ...fakeStockAPI,
  price: (Math.random() * 3).toFixed(2),
  time: new Date().toLocaleTimeString(),
 };
 renderStock(stockdata);
}

updateStock();
setInterval(updateStock, 3000);

function renderStock(stockdata){
const stockName = document.getElementById('stock-name');
const stockSymbol = document.getElementById('stock-symbol');
const stockPrice = document.getElementById('stock-price');
const stockTime = document.getElementById('stock-time');
const {name, symbol, price, time} = stockdata;
stockName.textContent = name;
stockSymbol.textContent = symbol;
stockPrice.textContent = price;
stockTime.textContent = time;

const numericPrice = Number(price);
const output = previousPrice === null
    ? './arrow-neutral-grey.svg'
    : numericPrice > previousPrice
        ? './arrow-up-green.svg'
        : numericPrice < previousPrice
            ? './arrow-down-red.svg'
            : './arrow-neutral-grey.svg';
previousPrice = numericPrice;

stockDisplay.querySelector('.price-change')?.remove();
const arrow = document.createElement('img');
arrow.className = 'price-change';
arrow.src = output;
arrow.alt = 'Price change';
stockDisplay.appendChild(arrow);
}