const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controllers/SignInHandler');
const register = require('./controllers/RegisterHandler');
const profile = require('./controllers/ProfileHandler');
const image = require('./controllers/ImageHandler');

// Creating Server
const server = express();  

// to overcome cross origin resource sharing
server.use(cors()); 


// Middle Ware to convert all incoming body parts from request, to json
// so that we can use the file as json object in our code
server.use(bodyParser.json());  



//Connecting to database 'brain'
const db = knex({
	client : 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'postgres',
		password : 'root',
		database : 'brain'
	}
});

// '/' --> root path
server.get('/', (req, resp) => resp.send(`It is working !`);
})

// '/signIn' --> POST
server.post('/signIn', (req, resp) => { signin.handleSignIn(req, resp, db, bcrypt) })

// '/register' --> POST
server.post('/register', (req, resp) => { register.handleRegister(req, resp, db, bcrypt) })

// '/profile/:id' --> GET
server.get('/profile/:id', (req, resp) => { profile.handleProfile(req, resp, db)})

// '/image' --> PUT
server.put('/image', (req, resp) => { image.handleImage(req, resp, db)});

// '/imageUrl' --> POST
server.post('/imageUrl', (req, resp) => { image.handleImageUrl(req, resp) });

//Server running on port 3003
const PORT = process.env.PORT;
server.listen(PORT || 3003, () => {
	console.log(`Server running on port ${PORT}`);
});