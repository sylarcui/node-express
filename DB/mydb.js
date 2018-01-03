/*
    connecting: Emitted when connection.{open,openSet}() is executed on this connection.

    connected: Emitted when this connection successfully connects to the db. May be emitted multiple times in reconnected scenarios.

    open: Emitted after we connected and onOpen is executed on all of this connections models.

    disconnecting: Emitted when connection.close() was executed.

    disconnected: Emitted after getting disconnected from the db.

    close: Emitted after we disconnected and onClose executed on all of this connections models.

    reconnected: Emitted after we connected and subsequently disconnected, followed by successfully another successfull connection.

    error: Emitted when an error occurs on this connection.

    fullsetup: Emitted in a replica-set scenario, when primary and at least one seconaries specified in the connection string are connected.

    all: Emitted in a replica-set scenario, when all nodes specified in the connection string are connected.
*/
let mongoose = require('mongoose')
let DB_URL = 'mongodb://localhost:27017/mongoosesample'

/**
 * 连接
 */
mongoose.connect(DB_URL)

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open to ' + DB_URL)
})

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err)
})

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected')
})

module.exports = mongoose