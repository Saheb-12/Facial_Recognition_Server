const handleSignIn = (req, resp, db, bcrypt) => {
	const { email, password } = req.body;
	if( !email || !password){
		return resp.status(400).json("Invalid Username or Password");
	}
	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data => {
		console.log(data);
		const isValid = bcrypt.hashSync(password, data[0].hash);
		if(isValid){
			db.select('*').from('users')
			.where('email', '=', email)
			.then(data => resp.json(data[0]))
			.catch(err => resp.status(404).json('No such user found'))
		}
	})
	.catch(err => resp.status(404).json('Invalid Username or Password'))
}


module.exports = {
	handleSignIn : handleSignIn
};