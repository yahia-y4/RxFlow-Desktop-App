const { DoctorPrescription, Item, ItemManyDoctorPrescription } = require('../models/index.js')
const sequelize = require('../db.js')

const createDoctorPrescription = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const { doctor_name, patient_name, patient_age, items } = req.body;
    const doctorPrescription = await DoctorPrescription.create({
      doctor_name,
      patient_name,
      patient_age,
      userId,
    }, {
      transaction: t,
    })
    await Promise.all(items.map(async (item) => {
      const { itemId, quantity, price } = item;
      await ItemManyDoctorPrescription.create({
        doctorPrescriptionId: doctorPrescription.id,
        itemId,
        quantity,
        price,
      }, {
        transaction: t,
      })
    }))
    await t.commit();
    res.status(200).json({
      message: "doctor prescription created successfully",
      doctorPrescription,
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({

      error: error.message
    });
  }
}
const getDoctorPrescription = async (req, res) => {
  try {
    const userId = req.user.id;
    const doctorPrescription = await DoctorPrescription.findAll({
      where: {
        userId,
      }
    })
    res.status(200).json(

      doctorPrescription,
    )
  } catch (error) {
    res.status(500).json({

      error: error.message
    })
  }
}
const getDoctorPrescription_items = async (req, res) => {
  try {
    const userId = req.user.id
    const id = req.params.id
    const doctorPrescription = await DoctorPrescription.findAll({
      where: { id, userId }, include: [{
        model: Item,
        attributes: ["id", "name", "company", "form"],
        through: {
          attributes: ['quantity', 'price']
        }

      }]
    })
    res.status(200).json(
      doctorPrescription
    )
  } catch (error) {

  }
}

const deleteDoctorPrescription = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id
    const id = req.params.id
    const doctorPrescription = await DoctorPrescription.findOne({where:{id,userId},transaction:t})
    if(!doctorPrescription){
      return res.status(404).json({
        message:'doctor prescription not found'
      })
    }
    await ItemManyDoctorPrescription.destroy({where:{doctorPrescriptionId:id},transaction:t})
    await doctorPrescription.destroy({transaction:t})
    res.status(200).json(
      {
        message:'doctor prescription deleted successfully'
      }
    )
    await t.commit();
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      error: error.message
    })
  }
}
module.exports = {
  createDoctorPrescription,
  getDoctorPrescription,
  getDoctorPrescription_items,
  deleteDoctorPrescription
}
