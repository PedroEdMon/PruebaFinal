const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const User = require('./src/MClientUser')

const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Si funciona el server.js del backend, proyecto final")
});

//Este GET deberia de traer la informacion del usuario con el id
app.post('/api/v1/user/create',(request,response) => {
    const {nombre,apellido,email,fechanacimiento} = request.body
    let nuevoUser = User({
        nombre,
        apellido,
        email,
        fechanacimiento
    });
    nuevoUser.save((error,user)=>{
        if (error) throw error;
        response.status(201).send(user)
    });
});

app.put('/api/v1/user/:uid',(request, response) => {
    let {uid} = request.params
    let UPDUser = request.body
    User.findByIdAndUpdate(uid,{ $set: UPDUser},{new:true}).exec().then(user => {
        response.send(user) 
    }).catch(error => {
        response.status(404).send('No se encontro el Id favor de validar')
    })
});

app.delete('/api/v1/user/:uid',(request,response) => {
    let {uid} = request.params
    User.findByIdAndRemove(uid).exec().then(() => {
        response.send('Se elimino correctamente')
    }).catch(() => {
        response.status(404).send(error)
    })
});

app.get('/api/v1/user/:uid',(request,response) => {
    let {uid} = request.params
    User.findById(uid).exec().then(user => {
        response.send(user) 
    }).catch(error => {
        response.status(404).send(error)
    })
});

app.get('/api/v1/user',(request,response) => {
    User.find().exec().then(users => {
        response.send(users)
    }).catch(error => {
        response.status(400).send(error)
    })
});

app.listen(PORT,()=>{
    console.log(`Server on ${PORT}`)
});