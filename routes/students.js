const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const db = require('../config/db.js');
const {v4: uuidV4} = require('uuid');

/**
* @router Type("post")
* Create a student 
*/

router.post("/create", (req, res)=> {
    const {name, age, courses, className} = req.body;
    //Simple Validation
    if (!name|| !age || !courses || !className){
        return res.status(400).msg({msg : "Please enter student details"});
    }
    //  sql for students
    let sqlCheck = `SELECT * from students WHERE slug = ?`;
    let sqlInsert = "INSERT INTO students SET ?";

    const slug = slugify(name).toLowerCase();

    db.query(sqlCheck, slug, (err, course) => {
        if (course.length > 0)
          return res.status(400).json({ msg: "Student Exists" });
    
        const data = {
          student_name: name.toLowerCase(),
          uid: uuidV4(),
          slug,
          student_age: age.toString(),
          student_course: courses.toString().toLowerCase(),
          student_class: className.toLowerCase(),
        };
        db.query(sqlInsert, data, (err) => {
            if (err) {
              return res.status(401).json({ msg: "Unable to store data" });
            }
      
            return res.status(200).json({ data });
        });
    });

});

/**
* @router Type("get")
* Get all the student 
*/
router.get("/", (req, res) => {
    let getQuery = `SELECT * FROM students`;
    db.query(getQuery, (err,results) => {
        return res.status(200).json(results);
    });
});


/**
* @router Type("update") 
* Update a student
*/
router.put("/", (req, res) => {
    const {name, age, courses, className, slug, uid} = req.body;
    const newSlug = slugify(name).toLowerCase();

    let updatedata = `UPDATE students SET student_course = ?, student_class=?, student_age=?, student_name=?, slug = ? WHERE slug = ?`;

    db.query(updatedata, [
        courses.toString(),
        className.toLowerCase(),
        age,
        name.toLowerCase(),
        newSlug,
        slug,
    ],
    (err) => {
        if (err) {
            return res.status(400).json({msg : "Unable to update the student"});
        }
        res.status(200).json({name, age, courses, className, newSlug, uid, updated: true});
    })
})


router.delete("/:uid", (req, res) => {
    const { uid } = req.params;
    let delQuery = "DELETE FROM students WHERE uid = ?";
    db.query(delQuery, [uid], (err) => {
      if (err) {
        res.send(err).status(400);
      } else {
        res.json({ success: true }).status(200);
      }
    });
  });

module.exports = router;
