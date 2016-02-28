var fs = require('fs')
var request = require('request');


// var MERCHANTS = JSON.parse(fs.readFileSync('merchants.json', 'utf8'));

function Clock() {

    var daysInAMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    this.month = 1;
    this.day = 1;
    this.year = 2016;

    this.tick = function() {
        this.day += 1;

        if (this.day > daysInAMonth[this.month - 1]) {
            this.month += 1;
            this.day = 1;
        }

    }

    this.time = function() {
    	var month = this.month < 10 ? "0" + this.month : this.month;
    	var day = this.day < 10 ? "0" + this.day : this.day;
        console.log(`${this.year}-${month}-${day}`)
    }

    this.getTime = function() {
        var month = this.month < 10 ? "0" + this.month : this.month;
    	var day = this.day < 10 ? "0" + this.day : this.day;
        return `${this.year}-${month}-${day}`;
    }

}

var clock = new Clock();

products = [{
    productName: "Milk",
    merchantID: "56c66be6a73e492741507788",
    price: 5.99,
    days: 5,
    alpha: 1,
    daysSinceBought: 0
}, {
    productName: "10 lb Ice",
    merchantID: "56c66be6a73e492741507788",
    price: 3.99,
    days: 50,
    alpha: 5,
    daysSinceBought: 0
}, {
    productName: "Birthday Candles",
    merchantID: "56c66be6a73e492741507788",
    price: 4.99,
    days: 365,
    alpha: 5,
    daysSinceBought: 0
}, {
    productName: "Gallon of Water",
    merchantID: "56c66be6a73e492741507788",
    price: 2.99,
    days: 1,
    alpha: 0,
    daysSinceBought: 0
}, {
    productName: "CVS Maximum Strength Laxative Tablets",
    merchantID: "56c66be6a73e49274150762a",
    price: 29.99,
    days: 175,
    alpha: 10,
    daysSinceBought: 0
}, {
    productName: "Nature Made Ultra Strength Vitamin D3 Liquid Softgels 5000 IU",
    merchantID: "56c66be6a73e49274150762a",
    price: 19.99,
    days: 90,
    alpha: 9,
    daysSinceBought: 0
}, {
    productName: "Blues Buster Full Spectrum Light Bulb Clear",
    merchantID: "56c66be6a73e49274150762a",
    price: 6.49,
    days: 350,
    alpha: 15,
    daysSinceBought: 0
}, {
    productName: "Tide Detergent",
    merchantID: "56d1cb92480cf02f0f888bd9",
    price: 11.34,
    days: 90,
    alpha: 9,
    daysSinceBought: 0
}, {
    productName: "Peanut Butter",
    merchantID: "56d1cb92480cf02f0f888bd9",
    price: 4.18,
    days: 14,
    alpha: 3,
    daysSinceBought: 0
}, {
    productName: "Nacho Cheese Doritos",
    merchantID: "56d1cb92480cf02f0f888bd9",
    price: 3.07,
    days: 7,
    alpha: 2,
    daysSinceBought: 0
}]

var purchases = [];
for (var i = 0; i < 365; i++) {


    clock.tick();
    var time = clock.getTime();
    for (j = 0; j < products.length; j++) {
        var lambda = 1 / (products[j]["days"] * 1.0);
        var range = products[j]["daysSinceBought"];
        if((products[j]["daysSinceBought"]) < (products[j]["days"]-products[j]["alpha"]))
        	range = 0;
        var probability = 1 - (Math.exp((-1) * lambda * range))
        
        console.log(probability);
        if (Math.random() < probability) {
            // console.log(time);


			obj = {
			  "merchant_id": products[j]["merchantID"],
			  "medium": "balance",
			  "purchase_date": time,
			  "amount": products[j]["price"],
			  "status": "pending",
			  "description": products[j]["productName"]
			}
			purchases.push(obj);
            

            // request.post('http://api.reimaginebanking.com/accounts/56c66be6a73e492741507f48/purchases?key=63aa41c26d33b0839a5675ed67f0ea6d').form(obj);
   

            products[j]["daysSinceBought"] = 0

        } else {
            products[j]["daysSinceBought"] += 1
        }

    }

}
fs.writeFileSync('message.txt', JSON.stringify(purchases), 'utf8');
