const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course', 
        required: true
    },

    name: {
        type: String,
        required: true
    }, 

    fileType: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('lesson', lessonSchema);