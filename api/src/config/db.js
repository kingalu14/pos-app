// const MongoClient = require('mongodb').MongoClient;
// const connectDB = async () => {
//     try {
//         await MongoClient.connect(process.env.DATABASE_URL,{
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('Database connection error:', error);
//         process.exit(1);
//     }
// };
// module.exports = connectDB;

const MongoClient = require('mongodb').MongoClient;
const connectDB = async () => {
    try{
        await MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB!");
    }
    catch(error){
        console.error('Database connection error:', error);
        process.exit(1);
    }
 
}
module.exports = connectDB;