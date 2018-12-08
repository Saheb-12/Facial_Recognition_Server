const handleRegister = (req, resp, db, bcrypt) => {
	const { name, password, email } = req.body;
	if( !email || !name || !password){
		return resp.status(400).json("Please Enter all the details");
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			email : email,
			hash : hash
		}).into('login')
		.returning('email')
		.then(loginEmail => {
			return db('users')
			.returning('*')
			.insert({
				name : name,
				email : loginEmail[0],
				joined : new Date()
			})
			.then(data => {
				resp.json(data[0]);
			})
			.catch(err => {
				resp.status(400).json("Unable to register user");
			})
		})
		.then(trx.commit)
		.catch(trx.rollback);
	})
}


module.exports = {
	handleRegister : handleRegister
};