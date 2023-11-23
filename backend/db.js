const mongoose = require('mongoose');
// const mongoURI = "mongodb+srv://joymridha2004:HBbkXgnniihVI0ha@cluster0.uq8pfou.mongodb.net/foody?retryWrites=true&w=majority"
const mongoURI = "mongodb://joymridha2004:HBbkXgnniihVI0ha@ac-odcxiw5-shard-00-00.uq8pfou.mongodb.net:27017,ac-odcxiw5-shard-00-01.uq8pfou.mongodb.net:27017,ac-odcxiw5-shard-00-02.uq8pfou.mongodb.net:27017/foody?ssl=true&replicaSet=atlas-a5j1up-shard-0&authSource=admin&retryWrites=true&w=majority"

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    const fetchedData = await mongoose.connection.db.collection('food_items').find().toArray();
    global.food_items = fetchedData;
    const fetchedData2 = await mongoose.connection.db.collection('foodCategory').find().toArray();
    global.foodCategory = fetchedData2;

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = mongoDB;
