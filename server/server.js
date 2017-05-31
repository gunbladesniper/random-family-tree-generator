var express = require('express');
var path = require('path');
var treeGenerator = require('./treeGenerator');


var app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use('/generate', treeGenerator );


app.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname, '../client/index.html'));
})

app.listen(3000, function(){
	console.log('listening on port 3000' );
})