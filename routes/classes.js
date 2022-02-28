const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const db = require('../config/db.js');
const {v4: uuidV4} = require('uuid');

/**
* @router Type("post")
* Create a class 
*/
router.post("/create", (req, res)=> {
    const {name} = req.body;

    // Simple Validation
    if (!name) {
        return res.status(400).msg({msg: "Please enter a class name"});
    }
    // sql for class
    let sqlCheck = `SELECT * from classes WHERE slug = ?`;
    let sqlInsert = "INSERT INTO classes SET ?";
    const slug = slugify(name).toLowerCase();

    db.query(sqlCheck, slug, (err, classes) => {
    if (classes.length > 0){
        console.log(classes)
        return res.status(400).json({ msg: "Class Exists" });

    }
    const data = {
        class_name: name.toLowerCase(),
        slug: slugify(name).toLowerCase(),
        uid : uuidV4()
    };
    db.query(sqlInsert, data, (err, result) => {
        if (err) {
            return res.status(401).json({ msg: "Unable to insert class" });
        }
            return res.status(200).json({ data });
        });
    });

});

/**
* @router Type("get")
* Get all the class 
*/
router.get("/", (req, res) => {
    let getQuery = `SELECT * FROM classes`;
    db.query(getQuery, (err,results) => {
        return res.status(200).json(results);
    });
});


/**
* @router Type("update") 
* Update a class
*/
router.put("/", (req, res) => {
    const {class_name, slug} = req.body;
    const newSlug = slugify(class_name).toLowerCase();

    let updatedata = `UPDATE classes SET class_name = ?, slug = ? WHERE slug = ?`

    db.query(updatedata, [
        class_name.toLowerCase(),
        newSlug,
        slug,
    ], (err) => {
        if (err) {
            return res.status(400).json({msg : "Unable to update the class"});
        }
        res.status(200).json({msg : "Updated"});
    })
})

/**
* @router Type("Delete") 
* Delete a class
*/
router.delete("/", (req, res) => {
    const {class_id} = req.body;
    let delQuery = `DELETE FROM classes WHERE class_id = ?`;
    
    db.query(delQuery, [class_id], (err, _) => {
        if (err) return res.status(400).json({msg : "Unable to delete"});
        res.status(200).json({success: "true"});
    });
});


module.exports = router;