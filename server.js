var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var getRandomSampleData = function(nodeNumber)
{
    var data = [];

    for(var i = 0; i < nodeNumber; i++)
    {
        data.push({
            id: Math.random()*10000,
            x: Math.random(),
            y: Math.random()
        });
    }

    return data;
};

var data = [];
// data

app.get('/data', function(req, res) {
    data = getRandomSampleData(100);
    res.send(data);
});

app.listen(6060);
