
var http = require('http');
var dateUtiles=require('./service/dateUtils');
var debug = require('debug')('nodejs-demo:server');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var  multipart = require('connect-multiparty');
/*scada module*/
var config = require('./config');
var filter = require('./filter');
var log4js = require('log4js');

var app = express();

global.dept = {};

log4js.configure({
  appenders: [
    { type: 'console' }, //控制台输出
    {
      type: 'dateFile', //文件输出
      filename: 'logs/app',
      "pattern": "-yyyy-MM-dd.log",
      "alwaysIncludePattern": true,
      "pollInterval": 1,
      //maxLogSize: 1024,
      //backups:3,
      //category: 'app'
    }
  ],
  //replaceConsole: true
});
exports.glogger = function(name){
  var logger = log4js.getLogger(name);
  logger.setLevel(log4js.levels.WARN);//trace、debug、info、warn、error、fatal
  return logger;
}

var logger = this.glogger('app');
app.use(log4js.connectLogger(logger,{level:log4js.levels.Info}));

// view engine setup
var moment = require('moment');
var ejs=require('ejs');
app.set('views', path.join(__dirname, 'dist'));//'src_min/main'));//
//app.engine('html', engines.mustache);
ejs.delimiter = '$';
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
//日期格式化
app.locals.dateFormatenl = dateUtiles.dateFormatenl;
app.locals.dateFormatens = dateUtiles.dateFormatens;
app.locals.dateFormatch = dateUtiles.dateFormatch;
app.locals.dateFormatchhh = dateUtiles.dateFormatchhh;
app.use(cookieParser('prjuser'));
app.use(session({ resave: true, saveUninitialized: true,  secret: 'prjuser'}));

app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(express.static(__dirname, 'dist'));
var statics = express.static(path.join(__dirname, 'dist'));
//拦截器
app.use(function(req,res,next){
  filter.filter(req,res,next);
});
//路由配置
//1）静态文件配置
app.use(statics);
//2）请求路径配置
config.ROUTER_URL.forEach(function(router){
    app.use(router.routerKey, require(router.routerValue));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('common/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(err.message);
   /*res.render('error', {
     message: err.message,
     error: {}
   });*/
});

/*scada module*/
var port = normalizePort(process.env.PORT || config.MediaConfig.webPort);
app.set('port', port);
var server = http.createServer(app);


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = app;
