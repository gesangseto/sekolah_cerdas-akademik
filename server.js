const dotenv = require('dotenv');
dotenv.config();
var routes = require('./app/routes');
var cors = require('cors')
var express = require('express'),
    app = express(),
    port = process.env.PORT,
    bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// LOAD MIDDLEWARE OAUTH
var oauth = require('./app/middleware/oauth')
app.use(async function (req, res, next) {
    var check = await oauth.check_token(req, res)
    if (check)
        next()
})
// END MIDDLEWARE OAUTH

routes(app);

app.listen(port);
console.log('RESTful API server started on: ' + port);