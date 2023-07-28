const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Student Model
const studentSchema = require("../models/student");

// CREATE Student
router.post("/create-student", async (req, res, next) => {
  try {
    const data = await studentSchema.create(req.body);
    console.log(data);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// READ Students
router.get("/", async (req, res, next) => {
  try {
    const data = await studentSchema.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// UPDATE student
router
  .route("/update-student/:id")
  // Get Single Student
  .get(async (req, res, next) => {
    try {
      const data = await studentSchema.findById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  })

  // Update Student Data
  .put(async (req, res, next) => {
    try {
      const data = await studentSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true } // This option returns the updated document
      );
      res.json(data);
      console.log("Student updated successfully!");
    } catch (error) {
      next(error);
    }
  });

// Delete Student
router.delete("/delete-student/:id", async (req, res, next) => {
  try {
    const data = await studentSchema.findByIdAndRemove(req.params.id);
    res.status(200).json({ msg: data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
