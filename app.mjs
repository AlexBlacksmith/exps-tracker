import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import pagesRouter from './routes/pages-router.mjs';
import categoriesRouter from './routes/category-router.mjs';
import recordsRouter from './routes/records-router.mjs';
import noJsRouter from './routes/no-js-router.mjs';
import totalRouter from './routes/totalspent-router.mjs';

const app = express();

//Setting view engine
app.set('view engine', 'ejs');

app.set('views', './views');

//Setting body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static files
app.use(express.static('public'));

//Routers
app.use(pagesRouter);
app.use(recordsRouter);
app.use(categoriesRouter);
app.use(noJsRouter);
app.use(totalRouter);

//MongoDB Connection
mongoose
	.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.pqimp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
		useNewUrlParser: true
	})
	.then( () => console.log('Mongo has connected.'))
	.catch(err => console.log(err));

app.listen(process.env.PORT, () => {
	console.log(`Server has started on the Port: ${process.env.PORT}`);
});