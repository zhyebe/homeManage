/**
 * Created by IThink on 2016/4/27.
 */
var Sequelize = require('sequelize');
var settings = require('../config');

var sequelize = new Sequelize(settings.mysql.database, settings.mysql.user, settings.mysql.password,
    {host : settings.mysql.host, port : settings.mysql.port, dialect : 'mysql',
        define: {
        // 字段以下划线（_）来分割（默认是驼峰命名风格）
        underscored: true
    }});

module.exports=sequelize;