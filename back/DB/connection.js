const mongoose = require('mongoose');

//const URI="mongodb+srv://Tutor:Tutor@cluster0.ahoka.mongodb.net/Tutor?retryWrites=true&w=majority";

const URI=  "mongodb+srv://Tutor:Tutor@cluster0.g3n6v.mongodb.net/Tutor?retryWrites=true&w=majority" ;


const connectDb = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('Db connected..!');
};

module.exports = connectDb;  