import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';

dotenv.config();


const app = express();


app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRoutes);
//const uri =  'mongodb+srv://admin:Reserveit5*@tables.i4uiv.mongodb.net/tables?retryWrites=true&w=majority'


mongoose.connect(process.env.CONNENCTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT || 5000, () => console.log(`Server Running`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);