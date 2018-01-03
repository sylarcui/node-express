/**
 * 用户信息
 */
var mongoose = require('../mydb')
var Schema = mongoose.Schema

// var UserSchema = new Schema({
//     username : { type: String },                    //用户账号
//     userpwd: {type: String},                        //密码
//     userage: {type: Number},                        //年龄
//     logindate : { type: Date}                       //最近登录时间
// });

/* 索引，默认值
* index ：建索引
* default：默认值
* */
var UserSchema = new Schema({
	account: {type: String , index: true, request: true},
	name: {type: String , index: true},
	email: {type: String},
	phone: {type: String},
	userSex: {type: String},
	type: {type: String, default: 'normal'},
	avatarUrl: {type: String},
	userAge: {type: Number},
	createDte: {type: Date, default:Date.now},
  userPassword: {type: String},
  loginDate: { type: Date, default:Date.now}                       //最近登录时间
})

module.exports = mongoose.model('User', UserSchema)
