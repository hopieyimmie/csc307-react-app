const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;


const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByName(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name, job) => { 
    return users['users_list'].filter( (user) => user['name'] === name && user['job'] === job); 
}

app.get('/users', (req, res) => {
    
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found');
    else {
        result = {user_list: result};
        res.send(result);
    }
});

function findUserById(id) { 
    return users['users_list'].find((user) => user['id'] === id);
}

function generateId() {
    var lettersAndDigits = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
      id += lettersAndDigits.charAt(Math.floor(Math.random() * lettersAndDigits.length));
    }
    return id;
}

app.post('/users', (req, res) => {
    const userToAdd = {
        id: generateId(),
        name: req.body.name,
        job: req.body.job
    };
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

function addUser(user){
    users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    if (id !== undefined) {
        let result = findUserById(id);
        if (result === undefined || result.length == 0)
            res.status(404).send('Resource not found');
        else {
            deleteUser(id);
            res.status(204).end();
        } 
    }   
    else {
        res.status(400).end()
    }
})

function deleteUser(id) {
    users['users_list'] = users['users_list'].filter((user) => user['id'] !== id);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:8000`);
}); 