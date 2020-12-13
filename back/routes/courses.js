const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Course = require('../models/course');


//Get ALL the courses
router.get('/', (req, res, next) => {
  Course.find()
   .select("name _id")
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

//GET a course
router.get("/:courseId", (req, res, next) => {
    const id = req.params.courseId;
    Course.findById(id)
    .select("_id name")
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message: "No valid entry is found"})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//POST a course
router.post("/", (req, res, next) => {
    const course = new Course({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        
    });
    course
    .save()
    .then(result => {
        console.log(result);
        res.status(200).json({
          message: "Created course successfully",
          createdProduct: {
              _id: result._id,
              name: result.name,
             
              request: {
                  type: 'GET',
                  url: "http://localhost:3001/courses/" + result._id
              }
          }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});

//UPDATE a course
router.put("/:coursetId", (req, res, next) => {
    const id = req.params.courseId;
 
        Course.update({_id: id}, {$set: {name: req.body.name}})
    .exec()
    .then(result => {
       
        res.status(200).json({
            message: "updated successfully",
            request:{
                type: 'GET',
                url: 'http://localhost:3001/courses/' + id
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


//DELETE a course
router.delete("/:courseId", (req, res, next) => {
    const id = req.params.courseId;
    Course.deleteMany({_id: id}) 
    .exec()
    .then(result => {
        
        res.status(200).json({
            message: "deleted suuccessfully"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});



module.exports = router;