import Message from "../models/Message";
import resMsg from "../controllers/ErrorsPage.js";


export function get_msg(req, res) {
    try {
        Message.find()
            .exec()
            .then(item => {
                res.status(200).json(item);
            })
            .catch(err => { res.status(404).json(resMsg.notFound) });

    } catch (error) {
        res.status(500).json(resMsg.errorIntern)
    }
}

export async function send_msg(req,res){
    try {
        const msg=new Message({
            useremail: req.body.useremail,
            description: req.body.description
        })
        await msg.save();
        res.status(201).json(msg)
    } catch (error) {
        res.status(500).json(resMsg.errorIntern)  
    }
}

export async function delete_msg(req,res){
    try {
        const id= req.params.id;
        await Message.deleteOne({_id:id});
        res.status(200).json({"message":"Done"});
    } catch (error) {
        res.status(500).json(resMsg.errorIntern)  
        
    }
}