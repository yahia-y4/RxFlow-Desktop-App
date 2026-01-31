const express = require('express');
const doctorPrescriptionRouter = express.Router();
const authMiddleware = require("../middlewares/auth.js");
const { createDoctorPrescription , getDoctorPrescription,getDoctorPrescription_items,deleteDoctorPrescription } = require('../controllers/doctorPrescriptionController.js');

doctorPrescriptionRouter.post('/create',authMiddleware,createDoctorPrescription);
doctorPrescriptionRouter.get('/get',authMiddleware,getDoctorPrescription);
doctorPrescriptionRouter.get('/getItems/:id',authMiddleware,getDoctorPrescription_items);
doctorPrescriptionRouter.delete('/delete/:id',authMiddleware,deleteDoctorPrescription);

module.exports = doctorPrescriptionRouter;


