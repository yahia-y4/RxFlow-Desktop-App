const {Notice} = require('../models/index.js');

const createNotice = async (userId ,title,content) => {

    try {
        const notice = await Notice.create({
            userId,
            title,
            content
        });
        
    } catch (error) {
        console.log(error);
    }
}
const getNotices = async (req, res) => {
    try {
        const userId = req.user.id;
        const notices = await Notice.findAll({
            where: {
                userId
            }
        });
        res.status(200).json(notices);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const delNotice = async (req, res) => {
    try {
        const noticeId = req.params.id;
        const userId = req.user.id;
        const notice = await Notice.findOne({ where: { id: noticeId, userId } });
        if (!notice) {
            return res.status(404).json({ error: "Notice not found" });
        }
        await notice.destroy();
        res.status(200).json({ message: "Notice deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const markRead= async(req,res)=>{
    try{
        const userId = req.user.id;
        const id = req.params.id
        const notice = await Notice.findOne({ where: { id, userId } });
        if (!notice) {
            return res.status(404).json({ error: "Notice not found" });
        }
        notice.IsRead = true;
        await notice.save();
        res.status(200).json({ message: "Notice marked as read" });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}
const markAllRead= async(req,res)=>{
    try{
        const userId = req.user.id;
        const notices = await Notice.findAll({ where: { userId } });
        if (!notices) {
            return res.status(404).json({ error: "Notices not found" });
        }
        notices.forEach(async (notice) => {
            notice.IsRead = true;
            await notice.save();
        });
        res.status(200).json({ message: "All notices marked as read" });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

module.exports={
    createNotice,
    getNotices,
    delNotice,
    markRead,
    markAllRead
}