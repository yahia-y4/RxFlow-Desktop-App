const {Classify , Item , ItemManyClassify} = require('../models');
const sequelize = require('../db.js');
const createClassify = async (req,res)=>{
const t = await sequelize.transaction()
try{
    const userId = req.user.id;
    const {name,description,items} = req.body;
    console.log(name,description,items)
    
    const newClass = await Classify.create({name,description,userId},{transaction:t})
    await Promise.all(
        items.map(async (item)=>{
            await ItemManyClassify.create({
                itemId:item.id,
                classifyId:newClass.id
            },{transaction:t})
        })
    )
    await t.commit()
    res.status(200).json({
        message:'classify created successfully'
    
    })
}catch(error){
    await t.rollback()
    res.status(500).json({
        Error:error.message
    })
}
}
const updateClassify = async (req,res)=>{
    try{
        const userId = req.user.id;
        const classifyId = req.params.id;
        const {name,description} = req.body;
const classify = await Classify.findOne({where:{userId,id:classifyId}})
if(!classify){
    return res.status(404).json({
        message:'classify not found'
    })
}
await classify.update({name,description})
await classify.save()
        res.status(200).json({
            message:'classify updated successfully',
            classify
        })
    }catch(error){
        res.status(500).json({
            Error:error.message
        })
    }

}
const addItemsToClassify = async (req,res)=>{
    const t = await sequelize.transaction()
    try{
        const {classifyId,items} = req.body;
        const classify = await Classify.findByPk(classifyId)
        if(!classify){
            return res.status(404).json({
                message:'classify not found'
            })
        }
        await Promise.all(
            items.map(async (item)=>{
                await ItemManyClassify.create({
                    itemId:item.id,
                    classifyId
                },{transaction:t})
            })
        )
        await t.commit()
        res.status(200).json({
            message:'items added to classify successfully'
        })
    }catch(error){
        await t.rollback()
        res.status(500).json({
            Error:error.message
        })
    }
}
const getAllClassify = async (req,res)=>{
    try{
        const userId = req.user.id;
        const classify = await Classify.findAll({
            where:{
                userId
            }
        })
        if(!classify){
            return res.status(404).json({
                message:'classify not found'
            })
        }
        res.status(200).json(
            classify
        )
    }catch(error){
        res.status(500).json({
            Error:error.message
        })
    }
}
const getClassify_Items= async(req,res)=>{
try{
const userId = req.user.id;
const classifyId = req.params.id;
const classify = await Classify.findOne({where:{id:classifyId , userId},include:[
    {
        model:Item,
            attributes:["id","name","company","form","price","profit"],
         
        
    }
]})
if(!classify){
    return res.status(404).json({
        message:'classify not found'
    })
}
res.status(200).json(
    classify
)
}catch(error){

}
}
const deleteClassify = async (req,res)=>{
    const t = await sequelize.transaction()
    try{
const userId = req.user.id;
const classifyId = req.params.id
const classify = await Classify.findOne({where:{id:classifyId,userId},transaction:t})
if(!classify){
    return res.status(404).json({
        message:'classify not found'
    })
}
await ItemManyClassify.destroy({where:{classifyId},transaction:t})
await classify.destroy({transaction:t})
await t.commit()
    res.status(200).json({
        message:'classify deleted successfully'
    })
    }catch(error){
        await t.rollback()
        res.status(500).json({
            Error:error.message
        })
    }
}
const deleteClassify_item = async (req,res)=>{
    const t = await sequelize.transaction()
    try{
        const userId = req.user.id;
        const {itemId,classifyId} = req.body;
        const classify = Classify.findOne({where:{id:classifyId,userId}})
        if(!classify){
            return res.status(404).json({
                message:'classify not found'
            })
        }
      const item = await ItemManyClassify.findOne({where:{itemId,classifyId}})
      if(!item){
        return res.status(404).json({
            message:'item not found'
        })
      }
      await item.destroy({transaction:t})
      await item.save()
        await t.commit()
        res.status(200).json({
            message:'item deleted from classify successfully'
        })
    }catch(error){
        await t.rollback()
        res.status(500).json({
            Error:error.message
        })
    }
}

module.exports ={
    createClassify,
    addItemsToClassify,
    getAllClassify,
    getClassify_Items,
    deleteClassify,
    updateClassify,
    deleteClassify_item

}


