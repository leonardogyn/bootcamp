const express = require('express');

const server = express();

server.use(express.json());

//localhost:3000/home
// server.get('/home',(req,res) => {
//    return res.send('Hello World');
// });

//Query Params = /users?nome=Leonardo
// server.get('/users',(req,res) => {
//     const nome = req.query.nome;
//     return res.json({ message: `O nome do Usuário é: ${nome}` } );
// });

//Route Params = /users/id=3
//  server.get('/users/:id',(req,res) => {
//      //const id = req.params.id;
//      //ou
//      const { id } = req.params;
//      return res.json({ message: `Buscando o Usuário : ${id}` } );
//  });

//Route Params - Index = /users/3
// const users = ['João','Maria','Sergio'];
// server.get('/users/:index',(req,res) => {
//     const { index } = req.params;
//     return res.json(users[index]);
// });

//Crud - Create, Read, Update e Delete
const users = ['João','Maria','Sergio'];

//Middleware Global - Sempre passará por ele
server.use((req,res, next) => {
   console.time();
   console.log(`Método: ${req.method} URL: ${req.url}`);

   //Acessar a rota que foi requisitada na url
   next();
   console.timeEnd();
});

//Middleware Local - Será utilizado apenas naquele método em que ele for adicionado
function checkUserExists(req,res,next) {
    if(!req.body.name) {
        return res.status(400).json({ error: 'User is required' });
    }

    return next();
}

//Middleware Local - Será utilizado apenas naquele método em que ele for adicionado
function checkUserInArray(req,res,next) {
    // if(!users[req.params.index]) {
    //     return res.status(400).json( { error: 'User does not exists' } );
    // }
    //ou
    const user = users[req.params.index];
    if(!user) {
        return res.status(400).json( { error: 'User does not exists' } );
    }

    req.user = user;

    return next();
}

server.get('/users', (req,res) => {
   return res.json(users);
});

server.get('/users/:index',checkUserInArray,(req,res) => {
    //const { index } = req.params;
    //return res.json(users[index]);
    //ou utilizando o middleware
    return res.json(req.user);
});

//Request Body { "name": "Leonardo", "email": "leonardo@iconteck.com" }

//Criar um usuário - POST
server.post('/users',checkUserExists,(req,res) => {
    const { name } = req.body;
    users.push(name);

    return res.json(users);
});

//Alterar um usuário - PUT
server.put('/users/:index',checkUserExists,checkUserInArray,(req,res) => {
    const { index } = req.params;
    const { name } = req.body;
    users[index] = name;
    return res.json(users);
});

//Deletar um usuário - DELETE
server.delete('/users/:index',checkUserInArray, (req,res) => {
    const { index } = req.params;
    users.splice(index, 1);

    return res.send();
});

server.listen(3000);