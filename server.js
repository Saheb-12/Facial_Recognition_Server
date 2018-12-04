const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const server = express();  // Creating Server

const database = {
	users: [
		{
			id : '1',
			name : 'Supratim',
			email : 'supratim@gmail.com',
			password : 'saha',
			entries: 0,
			joined : new Date()
		},
		{
			id : '2',
			name : 'Mitul',
			email : 'mrinalini@gmail.com',
			password : 'paul',
			entries: 0,
			joined : new Date()
		},
		{
			id : '3',
			name : 'Amarjeet',
			email : 'amarjeet@gmail.com',
			password : 'das',
			entries: 0,
			joined : new Date()
		},
		{
			id : '4',
			name : 'Sachin',
			email : 'sachin@gmail.com',
			password : 'rakshit',
			entries: 0,
			joined : new Date()
		}
	]
}                        // Alternate of Database for now

server.use(cors()); 
server.use(bodyParser.json());  // Middle Ware to convert all 
								// incoming body parts from request, to json
								// so that we can use the file as json object
								// in our code

server.get('/', (req, resp) => {
	resp.json(database.users);
})

// /signIn --> POST

server.post('/signIn', (req, resp) => {
	const { email, password } = req.body;
	let found = false;
	database.users.forEach(user => {
		if(user.email === email &&
			user.password === password){
			found = true;
			resp.json(user);
		}
	})
	if(!found){
		resp.status(404).json('Invalid Username or Password');
	}
})

// /register --> POST

server.post('/register',(req, resp) => {
	const { name, password, email } = req.body;
	console.log(req.body);
	database.users.push({
		id : '5',
		name : name,
		email : email,
		password : password,
		entries: 0,
		joined : new Date()
	});
	resp.json(database.users[database.users.length -1]);
})

// /profile/:id --> GET

server.get('/profile/:id', (req, resp) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if( user.id === id ){
			found = true;
			return resp.json(user);
		} 
	});
	if(!found){
		resp.status(404).json("no such user found");
	}
})

// /image --> PUT

server.put('/image', (req, resp) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if( user.id === id ){
			user.entries ++;
			return resp.json(user.entries);
		} 
	});
	if(!found){
		resp.status(404).json("no such user found");
	}
})

server.listen(3003, () => {
	console.log('Server running on port 3003');
});