const handleProfile = (req, resp, db) => {
	const { id } = req.params;
	db.select('*').from('users').where({
		id : id
	})
	.then(user => {
		(user.length)
		?resp.json(user[0])
		:resp.status(404).json("no such user found");
	})
	.catch(err => {
		resp.status(404).json("Error in finding the user");
	})
}


module.exports = {
	handleProfile : handleProfile
};