import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';



const app = express();
const PORT= process.env.PORT || 5000;

if(process.env.NODE_ENV==='production'){
  app.use(express.static('reserveitapp-final/client/build'))
}

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRoutes);



mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);