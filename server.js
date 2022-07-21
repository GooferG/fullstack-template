const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const TestModel = require('./models/schema');

// mongoDB connection
// let db,
//   dbConnectionString = process.env.DB_STRING,
//   dbName = 'sample_mflix',
//   collection;

// MongoClient.connect(dbConnectionString).then((client) => {
//   console.log(`Connected to Database`);
//   db = client.db(dbName);
//   collection = db.collection('movies');
// });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });

    console.log(`Connected to database: ${mongoose.connection.name}`);
  } catch (err) {
    console.log('Connection failed', err);
  }
};

connectDB();

// Middleware comes first

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', async (request, response) => {
  try {
    // Get data from DB - specific collection
    const content = await TestModel.find();
    console.log(content);
    // After data is found, then render ejs AND pass the data so it renders on the page
    response.render('index.ejs', { contentKey: content });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

//PORT = 8000
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${PORT}`);
});
