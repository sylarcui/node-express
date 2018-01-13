import User from './userSchema'
import crypto from "crypto";
module.exports = {
/**
	 }
 * 插入  Model#save([fn])
 */
insert: (data, callback) => {
  data.userPassword = crypto.createHmac('sha256', data.userPassword).digest('hex')
  let user = new User(data)
	user.save(function (err, res) {
    if (err) {
      console.log('Error:' + err)
    }
    else {
      console.log('Res:' + res)
    }
	  callback(err, res)
  })
},

// insert()
/**
 *更新  Model.update(conditions, update, [options], [callback])
 * */
update: (data, callback) => {
  let wherestr = {'username' : 'Tracy McGrady'}
  let updatestr = {'userpwd': 'zzzz'}

  User.update(wherestr, updatestr, function(err, res){
    if (err) {
      console.log('Error:' + err)
    }
    else {
      console.log('Res:' + res)
    }
	  callback(err, res)
  })
},

// update()

/**
 * findByIdAndUpdate
 * Model.findByIdAndUpdate(id, [update], [options], [callback])
 * 这种比较有指定性，就是根据_id
 * */
findByIdAndUpdate: (data, callback) => {
  // let id = '5a46616117f4e9d0bfc73078'
  // let updatestr = {'userpwd': 'abcd'}

  User.findByIdAndUpdate(data.id, data.updatestr, function(err, res){
    if (err) {
      console.log('Error:' + err)
    }
    else {
      console.log('Res:' + res)
    }
	  callback(err, res)
  })
},

// findByIdAndUpdate()
/**找到一条记录并更新
* Model.findOneAndUpdate([conditions], [update], [options], [callback])
* */


/**
 * 删除
 * 1、 Model.remove(conditions, [callback])
 * 2、Model.findByIdAndRemove(id, [options], [callback] )
 * 3、Model.findOneAndRemove(conditions, [options], [callback])
 * */

del: () => {
  let wherestr = {'username' : 'Tracy McGrady'}

  User.remove(wherestr, function(err, res){
    if (err) {
      console.log('Error:', err)
    }
    else {
      console.log('Res:', res)
    }
  })
},

// del()
/**
 * 条件查询
 * 已先插入一些测试数据 。。
 * Model.find(conditions, [fields], [options], [callback])
 * */

getByConditions: (wherestr, callback) => {
  // let wherestr = {'username' : 'Tracy McGrady'}

  User.find(wherestr, function(err, res){
    if (err) {
      console.log('Error:' + err)
    }
    else {
      console.log('Res:', res)
    }
	  callback(err, res)
  })
},

/**
 * 输出只会有username字段，设置方法如上，1表示查询输出该字段，0表示不输出
 * */
// getByConditions: () => {
//   let wherestr = {'username' : 'Tracy McGrady'}
//   let opt = {'username': 1 ,'_id': 0}
//
//   User.find(wherestr, opt, function(err, res){
//     if (err) {
//       console.log('Error:' + err)
//     }
//     else {
//       console.log('Res:' + res)
//     }
//   })
// },


// getByConditions()

/**
 * User.find({userage: {$gte: 21, $lte: 65}}, callback)    //这表示查询年龄大于等21而且小于等于65岁
 * $or-或关系
 * $nor- 或关系取反
 * $gt-大于
 * $gte-大于等于
 * $lt- 小于
 * $lte-小于等于
 * $ne-不等于
 * $in-在多个值范围内
 * $nin-不在多个值范围内
 * $all-匹配数组中多个值
 * $regex-正则，用于模糊查询
 * $size-匹配数组大小
 * $maxDistance-范围查询，距离（基于LBS）
 * $mod-取模运算
 * $near-邻域查询，查询附近的位置（基于LBS）
 * $exists-字段是否存在
 * $elemMatch-匹配内数组内的元素
 * $within-范围查询（基于LBS）
 * $box-范围查询，矩形范围（基于LBS）
 * $center-范围醒询，圆形范围（基于LBS）
 * $centerSphere-范围查询，球形范围（基于LBS）
 * $slice-查询字段集合中的元素（比如从第几个之后，第N到第M个元素）
 * */

/**
 * 数量查询
 * Model.count(conditions, [callback])
* */
getCountByConditions: () => {
  let wherestr = {}

  User.count(wherestr, function(err, res){
    if (err) {
      console.log('Error:' + err)
    }
    else {
      console.log('Res:' + res)
    }
  })
},
// getCountByConditions()

/**
 * 根据_id查询
 * Model.findById(id, [fields], [options], [callback])
 * */

getById: (id, callback) => {
  // let id = '5a4667d5347a2ed1df75f87d'
  User.findById(id, function(err, res){
    if (err) {
      console.log('Error:' + err)
    } else {
      console.log('Res:', res)
    }
	  callback(err, res)
  })
},

// getById()

/**
 * 模糊查询
 * 查询出所有用户名中有'm'的名字，且不区分大小写，模糊查询比较常用，正则形式匹配，正则方式就是javascript正则，用到的比较多！
 * */
getByRegex: () => {
  let whereStr = {'username':{$regex:/m/i}}

  User.find(whereStr, function(err, res){
    if (err) {
      console.log('Error:' + err)
    }
    else {
      console.log('Res:' + res)
    }
  })
},

// getByRegex()

/**
 * 分页查询
 * */
getByPager: (data, callback) => {

  let pageSize = 10                  //一页多少条
  let currentPage = 1                //当前第几页
  let sort = {'logindate':-1}        //排序（按登录时间倒序）
  let condition = {}                 //条件
  let skipnum = (currentPage - 1) * pageSize   //跳过数

  User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
    if (err) {
      console.log('Error:' + err)
    }
    else {
      console.log('Res:' + res)
    }
	  callback(err, res)
  })
}

// getByPager()

/**
 * LBS地址位置
 * lbs : { type: Array, index: '2d', sparse: true }   //地理位置
 * Model.distinct(field, [conditions], [callback])---//去重
 * Model.findOne(conditions, [fields], [options], [callback])--- //查找一条记录
 * Model.findOneAndRemove(conditions, [options], [callback])-- //查找一条记录并删除
 * Model.findOneAndUpdate([conditions], [update], [options], [callback])- //查找一条记录并更新
 * */
}
