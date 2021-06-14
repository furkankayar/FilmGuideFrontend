var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use('/dist', serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 80;
var hostname = '127.0.0.1';
app.engine('html', require('ejs').renderFile);
app.get('/', function (req, res) {
    console.log(__dirname);

    res.render(path.join(__dirname + '/dist/index.html'));
});

app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
 });