var fs = require('fs')
var request = require('request');
var _ = require('underscore');

var URL = 'http://api.reimaginebanking.com';
// var MERCHANTS = JSON.parse(fs.readFileSync('merchants.json', 'utf8'));

fs.readFile('message.txt', 'utf8', function(err, data) {
  if (err) throw err;
  var info = JSON.parse(data)
  var i = 0
  var interval = setInterval(function(){
    var obj = JSON.stringify(info[i])
    console.log(obj)
    result =request.post('http://api.reimaginebanking.com/accounts/56c66be6a73e492741507f50/purchases?key=63aa41c26d33b0839a5675ed67f0ea6d').form(obj);
    console.log(result);
    i += 1
    if(i>0) clearInterval(interval);
   }, 100);
    
  // console.log(info)
});



// request.post('http://api.reimaginebanking.com/accounts/56c66be6a73e492741507f48/purchases?key=63aa41c26d33b0839a5675ed67f0ea6d').form(obj);
