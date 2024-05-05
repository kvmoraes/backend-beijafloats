const express = require('express');
const cors = require('cors');

const healthchecker = require('./api/routes/healthcheck');

const app = express();
const PORT = 3000;

app.use(cors({
	origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', (req, res) => {
	const message = 'hello';
	try {
		res.status(200).send(message);
	} catch (error) {
		message = error;
		res.status(400).send();
	}
});
app.use('/api', healthchecker);

app.listen(PORT, () => {
	console.log(`🚀 Server is up and running on port:${PORT}`);
});
