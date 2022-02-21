const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const db = require('../config/db.js')
const {v4: uuidV4} = require('uuid')

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
        uid : uuidV4()
    };
    db.query(sqlInsert, data, (err, result) => {
        if (err) {
            return res.status(401).json({ msg: "Unable to store data" });
        }
            return res.status(200).json({ data });
        });
    });

});

/**
* @router Type("get") 
* Get all the course
*/
router.get("/", (req, res) => {
    let getQuery = `SELECT * FROM courses`;
    db.query(getQuery, (err,results) => {
        return res.status(200).json(results);
    });
});

/**
* @router Type("update") 
* Update a course
*/

router.put("/", (req, res) => {
    const {course_name, students, slug} = req.body;
    const newSlug = slugify(course_name).toLowerCase();

    let updatedata = `UPDATE courses SET course_name = ?, course_students = ?, slug = ? WHERE slug = ?`

    db.query(updatedata, [
        course_name.toLowerCase(),
        students.toString().toLowerCase(),
        newSlug,
        slug,
    ], (err) => {
        if (err) {
            return res.status(400).json({msg : "Unable to update the course"});
        }
        res.status(200).json({msg : "Updated"});
    })
})

/**
* @router Type("Delete") 
* Delete a course
*/
router.delete("/", (req, res) => {
    const {course_id} = req.body;
    let delQuery = `DELETE FROM courses WHERE course_id = ?`;
    
    db.query(delQuery, [course_id], (err, _) => {
        if (err) return res.status(400).json({msg : "Unable to delete"});
        res.status(200).json({success: "true"});
    });
});



module.exports = router;