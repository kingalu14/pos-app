const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
 const connectDB = async () => {
     try {
         const client = MongoClient.connect(process.env.DATABASE_URL,{
         
             useUnifiedTopology: true,
         });
         console.log('Connected to MongoDB');
         return client;
     } catch (error) {
         console.error('Database connection error:', error);
         process.exit(1);
     }
 };
 module.exports = connectDB;


//const uri = "mongodb+srv://kingkessy14:uipVndgWnFWyXe4n@ac-83syadh-shard-00-01.4gwuy9s.mongodb.net:27017,ac-83syadh-shard-00-02.4gwuy9s.mongodb.net:27017,ac-83syadh-shard-00-00.4gwuy9s.mongodb.net:27017/pos?authSource=admin&replicaSet=atlas-14l5lx-shard-0&ssl=true";
//const connectDB = () => {
//    return MongoClient.connect(uri, { useUnifiedTopology: true })
//      .then(client => {
//        console.log("Connected to MongoDB");
//        // Your database operations here
//        return client; // Return the client for further use
//      })
//      .catch(err => {
//        console.error(err);
//        throw err; // Re-throw the error for proper error handling
//      });
//  };
  

// const MongoClient = require('mongodb').MongoClient;

// const uri = "mongodb+srv://kingkessy14:uipVndgWnFWyXe4n@ac-83syadh-shard-00-01.4gwuy9s.mongodb.net:27017,ac-83syadh-shard-00-02.4gwuy9s.mongodb.net:27017,ac-83syadh-shard-00-00.4gwuy9s.mongodb.net:27017/pos?authSource=admin&replicaSet=atlas-14l5lx-shard-0&ssl=true";
// const client = new MongoClient(uri, { useUnifiedTopology: true });

// client.connect(err => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("Connected to MongoDB");
//     // Your database operations here
//   }
// });


// const MongoClient = require('mongodb').MongoClient;
// const connectDB = async () => {
//     try{
//         await MongoClient.connect(process.env.LOCAL_DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log("Connected to MongoDB!");
//     }
//     catch(error){
//         console.error('Database connection error:', error);
//         process.exit(1);
//     }
 
// }
module.exports = connectDB;