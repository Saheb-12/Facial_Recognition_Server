const  Clarifai = require('clarifai');

// Clarify API
const app = new Clarifai.App({
 apiKey: '0eeff62927394e65af1c6b2d96038bbc'
});

const handleImageUrl = (req, resp) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		resp.json(data);
	}).catch(err => {
		console.log('error in API response');
	})
}

const handleImage = (req, resp, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id).increment('entries', 1).returning('entries')
	.then(entry => {
		(entry.length)
		?resp.json(entry[0])
		:resp.status(404).json("no entries found");
	})
	.catch(err => resp.status(400).json("Error in  entries"));
}


module.exports = {
	handleImage : handleImage,
	handleImageUrl : handleImageUrl
};