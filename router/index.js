/**
 * Created by zhangyong on 2017/03/03.
 */
var express = require('express'),
    router = express.Router();
router.get('/', function(req, res) {
    res.redirect('/admin/');
});
module.exports = router;