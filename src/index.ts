import express from 'express';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';
import path from 'path';
import connection  from './connection/connection'


import bookRoute from './routes/studentsRoutes';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended :true}))

app.set('view engine','ejs')
app.set('views', path.join(__dirname, '../src/views'));
console.log(__dirname);
app.use(express.static('dist/public'));

connection()

app.use('/', bookRoute);


app.listen(8000, () => {
    console.log(`Server started successfully http://localhost:${8000}`);
});