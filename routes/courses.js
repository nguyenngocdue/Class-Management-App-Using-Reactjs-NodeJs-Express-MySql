const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const db = require('../config/db.js')

/**
* @router Type("post") 
*/
router.post("/create", (req, res) => {
    const {name} = req.body;
    // console.log(name);
    // simple Validation
    if(!name) return res.status(400).json({msg: "Please enter a course name"})

 // sql for user
 let sqlCheck = `SELECT * from courses WHERE slug = ?`;
 let sqlInsert = "INSERT INTO courses SET ?";
 const slug = slugify(name).toLowerCase();

    db.query(sqlCheck, slug, (err, course) => {
    if (course.length > 0){
        console.log(course)
        return res.status(400).json({ msg: "Course Exists" });

    }
    const data = {
        course_name: name.toLowerCase(),
        slug: slugify(name).toLowerCase(),
    };
    db.query(sqlInsert, data, (err, result) => {
        if (err) {
            return res.status(401).json({ msg: "Unable to store data" });
        }
            return res.status(200).json({ data });
        });
    });

});

// read
router.get("/", (req, res) => {
    let getQuery = `SELECT * FROM courses`;
    db.query(getQuery, (err,results) => {
        return res.status(200).json(results);
    });
});

module.exports = router;