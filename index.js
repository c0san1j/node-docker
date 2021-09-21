const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
const cors = require('cors');
const app = express();

const {
	MONGO_USER,
	MONGO_PASSWORD,
	MONGO_IP,
	MONGO_PORT,
	REDIS_URL,
	REDIS_PORT,
	SESSION_SECRET,
} = require('./config/config');

let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient({
	host: REDIS_URL,
	port: REDIS_PORT,
});

const postRouter = require('./routes/postRoutes');

const userRouter = require('./routes/userRoutes');

mongoose
	.connect(
		`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log('Successfully Connected');
	})
	.catch((err) => {
		console.log(err);
	});

const port = process.env.PORT || 3000;

app.use(cors({}));
app.enable('trust proxy');
app.use(
	session({
		store: new RedisStore({ client: redisClient }),
		secret: SESSION_SECRET,
		cookie: {
			secure: false,
			resave: false,
			saveUninitialized: false,
			httpOnly: true,
			maxAge: 60000,
		},
	})
);

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get('/api/v1', (req, res) => {
	res.send('<h2>Hi There</h2>');
	console.log('Yeah it ran');
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

app.listen(port, () => {
	console.log(`listening on port: ${port}`);
});
