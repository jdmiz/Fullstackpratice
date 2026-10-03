export const fakeStockAPI = {
    name : "Fake Stock API",
    symbol: "FSA",
    price: (Math.random()*3).toFixed(2),
    time : new Date().toLocaleTimeString,
}