var http = require('http');
var url = require('url');
var fs = require('fs');

var app = http.createServer(function(req, res){
    var URL = req.url;
    var path = url.parse(URL, true).pathname;
    var query = url.parse(URL, true).query;
 
    res.writeHead(200);
    if(path=="/index"){
        res.write(fs.readFileSync("/index.html"));
    }
    if(path=="/checkout"){
        res.write(fs.readFileSync("/checkout.html"));
    }
    if(path=="/admin"){
        res.write(fs.readFileSync("/admin.html"));
    }  
    if(path=="/contact"){
        res.write(fs.readFileSync("/contact.html"));
    }
})
app.listen(80);
console.log("서버 작동");