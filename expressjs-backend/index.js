const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());
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

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

function addUser(user){
    users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    let result = deleteUser(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found');
    else {
        result = {user_list: result};
        res.send(result);
    }
})

function deleteUser(id) {
    users['users_list'] = users['users_list'].filter((user) => user['id'] !== id);
    return users['users_list'];
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:5000`);
}); 