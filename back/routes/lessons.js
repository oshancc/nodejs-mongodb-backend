const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();
const Lesson = require('../models/lesson');
const Course = require('../models/course');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

//Get ALL the Lessons
router.get('/', (req, res, next) => {
    Lesson.find()
    .select("name course _id fileType")
    .populate("course", "name")
    .exec()
    .then(docs => {
        console.log(docs);
    
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
           error: err
        });
    });
 });


 //POST a Lesson
router.post("/", upload.single('fileType'), (req, res, next) => {
    Course.findById(req.body.courseId)
    .then(prod => {
        if(!prod){
           return res.status(404).json({
               message: "course not found"
           }); 
        }  
        const lesson = new Lesson({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            course: req.body.courseId,
            fileType: req.file.path
        });
        return lesson
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
              message: "Lesson created successfully",
              createdLesson: {
                  _id: result._id,
                  name: result.name,
                  course: result.course,
                  request: {
                      type: 'GET',
                      url: "http://localhost:3001/lessons/" + result._id
                  }
              }
            });
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "lesson not created",
            error: err
        })
    })
    
    
});


//GET a Lesson
router.get("/:lessonId", (req, res, next) => {
    const id = req.params.lessonId;
    Lesson.findById(id)
    .select("_id name course fileType")
    .populate("course", "name")
    .exec()
    .then(odr=> {
        if(!odr){
            return res.status(404).json({
                message: "lesson not found"
            });
        }
        console.log(odr);
        res.status(200).json(odr);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


//DELETE a Lesson
router.delete("/:lessonId", (req, res, next) => {
    const id = req.params.lessonId;
    Lesson.remove({_id: id}) 
    .exec()
    .then(result => {
        
        res.status(200).json({
            message: "deleted successfully"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});


//UPDATE an lesson
router.put("/:lessonId", (req, res, next) => {
    const id = req.params.lesonId;
 
        Lesson.update({_id: id}, {$set: {course: req.body.course, name: req.body.name}})
    .exec()
    .then(result => {
       
        res.status(200).json({
            message: "updated successfully",
            request:{
                type: 'GET',
                url: 'http://localhost:3001/lessons/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


module.exports = router;