const express = require("express");
const EmployeeModel = require('../models/EmployeeModel');
const routes = express.Router();
const authenticateToken = require('../authMiddleware');

//get all employee list
routes.get("/api/emp/employees", authenticateToken, async (req, res) => {
    try {
        const employees = await EmployeeModel.find({});
        res.json(employees);
    } catch (err) {
        res.status(500).json({
            message: "Error occurred retrieving employees.",
        });
    }
});

//create new employee
routes.post("/api/emp/employees", authenticateToken, async (req, res) => {
    try {
        const newEmployee = new EmployeeModel({
            ...req.body,
        });
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(500).json({
            message: "Some error occurred while creating the Employee.",
        });
    }
});

//get employee details by employee id
routes.get("/api/emp/employees/:eid", authenticateToken, async (req, res) => {
    const eid = req.params.eid;
    if (!eid) {
        return res.status(400).json({
            message: "Employee ID cannot be empty",
        });
    }

    try {
        const employee = await EmployeeModel.findById(eid);
        if (!employee) {
            return res.status(404).json({
                message: "Employee does not exist with ID " + eid,
            });
        }
        res.json(employee);
    } catch (err) {
        res.status(500).json({
            message: "Error occurred retrieving the employee.",
        });
    }
});

//update employee details
routes.put("/api/emp/employees/:eid", authenticateToken, async (req, res) => {
    const eid = req.params.eid;

    if (!eid) {
        return res.status(400).json({
            message: "Employee ID cannot be empty",
        });
    }

    try {
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
            eid,
            req.body,
            { new: true }
        );
        if (!updatedEmployee) {
            return res.status(404).json({
                message: "Employee not found with ID " + eid,
            });
        }
        res.json(updatedEmployee);
    } catch (err) {
        res.status(500).json({
            message: "Error updating employee with ID " + eid,
        });
    }
});

//delete employee by employee id
routes.delete("/api/emp/employees", authenticateToken, async (req, res) => {
    const eid = req.query.eid;

    if (!eid) {
        return res.status(400).json({
            message: "Employee ID cannot be empty",
        });
    }

    try {
        const employee = await EmployeeModel.findByIdAndRemove(eid);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found with ID " + eid,
            });
        }

        res.json({
            message: "Employee deleted successfully!",
        });
    } catch (err) {
        if (err.name === 'CastError' || err.name === 'DocumentNotFoundError') {
            return res.status(404).json({
                message: "Employee not found with ID " + eid,
            });
        } else {
            return res.status(500).json({
                message: "Could not delete employee with ID " + eid,
            });
        }
    }
});

module.exports = routes;
