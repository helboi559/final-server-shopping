import express from "express";
import dotenv from "dotenv"
import userRouter from "./routes/userRouter.js"
import mongoose from "mongoose"
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";

dotenv.config()

const port = process.env.PORT || 4000;

const app = express();

//middleware to allow access for multiple links
app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  next();
});

//limit on data
app.use(express.json({ limit: '10mb' }))

app.use('/user',userRouter)
app.use('/products',productsRouter)
app.use('/carts',cartsRouter)
app.get('/', (req, res) => res.json({ message: 'Welcome to our API' }));
app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Not Found' })
);

//connect to mongoDB
const startServer = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server is listening on port: ${port}`))
    
  } catch (error) {
    console.log(error);
  }
};

startServer();