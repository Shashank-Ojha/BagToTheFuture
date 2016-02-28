var request = require('request');
var fs = require('fs')

// request('http://api.reimaginebanking.com/accounts/?key=63aa41c26d33b0839a5675ed67f0ea6d', function (err, res, body) {
// 	if(err)
// 		return console.log(err)
// 	if(res.statusCode == 200)
// 	{
// 		//console.log(body);
// 		var obj = JSON.parse(body);
// 		// console.log(obj);
// 		for(var i = 0; i < obj.length; i++)
// 		{
// 			var id = obj[i]["_id"];
// 			console.log(id);
// 			request('http://api.reimaginebanking.com/accounts/' + id + '/purchases?key=63aa41c26d33b0839a5675ed67f0ea6d', function (err, res, body) {
// 				if(err)
// 					return console.log(err)
// 				if(res.statusCode == 200)
// 				{
// 					var obj = JSON.parse(body);
// 					console.log(obj) //will print all purchases of a specific customer
// 				}
// 			})
// 		}
// 	}
// })

fs.readFile('message.txt', 'utf8', function(err, data) {
  if (err) throw err;
  var info = JSON.parse(data)
//   info.sort(function(a, b) {
//   	return getDiffernce(a['purchase_date'], b['purchase_date']) 
// });
  // info.sort(dynamicSort("purchase_date"));
  // console.log(info)
  var patterns = buildPattern(info)
  
  console.log(patterns);
  // console.log(obj)    
  // console.log(info)
});



//must go thro the purchases, and find the average time distance between purchases for each product. Reminders will then be set.

function buildPattern(purchases) {
	var patterns = {};
	var frequency = {};
	var lastPurchased = {};
	var size = 0;
	for( var i = 0; i < purchases.length; i++)
	{
		var nameProduct = purchases[i]['description'];
		var date = purchases[i]['purchase_date'];
		if(!(purchases[i]['description'] in lastPurchased))
		{
			lastPurchased[nameProduct] = date;
			patterns[nameProduct] = 1; //check in a minute
			frequency[nameProduct] = 1;
			size += 1;
		}
		else
		{
			console.log(nameProduct)
			var dt = getDiffernce(date, lastPurchased[nameProduct]) // date - lastPurchased[nameProduct]; // this probs won't work
			// console.log(dt)
			patterns[nameProduct] += Math.abs(dt);
			frequency[nameProduct] += 1; 
			lastPurchased[nameProduct] = date
		}
	}
	// console.log(patterns)
	// console.log(frequency)
	var keys = Object.keys(patterns);
	for (var i = 0; i < keys.length; i++) {
		patterns[keys[i]] /= frequency[keys[i]]
		patterns[keys[i]] = Math.round(patterns[keys[i]],1)
	}

	return patterns;


	//loop thro each purchase and add time distances of each product in patterns
	//add the frequency of each product by 1 increment in frequency 
	//increment size for each new product
}

function getDiffernce(day1, day2) {
	var one = day1.split("-");
	var two = day2.split("-");
	console.log(day1);
	console.log(day2);
	var date1 = new Date(one[1]+'/' + one[2] + '/' + one[0]);
	var date2 = new Date(two[1]+'/' + two[2] + '/' + two[0]);
	var diffDays = date2.getTime() - date1.getTime(); 
	var one_day=1000*60*60*24
	var diff =  Math.ceil((diffDays)/(one_day))
	console.log(diff)
	return diff
}


