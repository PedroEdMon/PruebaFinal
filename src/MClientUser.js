const mongoose = require('mongoose')
mongoose.connect('mongodb://PedroEdMon:nintendoDS0D@ds255930.mlab.com:55930/hmodevfbatch0')

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

const UserSchema = new Schema({
    user:ObjectId,
    nombre:String,
    apellido:String,
    email:String,
    fechanacimiento:String,
});

var User = mongoose.model('Alumno',UserSchema)

module.exports = User