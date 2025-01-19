const notificationModel = require("../../models/notification")


exports.create = async (req, res) => {
    const { message, admin } = req.body;
    const notification = await notificationModel.create({ message, admin });
    return res.status(201).json(notification)
}

exports.get = async (req, res) => {
    const { _id } = req.user;
    const adminNotifications = await notificationModel.find({ admin: _id });
    return res.json(adminNotifications)

}


exports.seen = async (req, res) => {
    const { id } = req.params;
    //validation
    const notification = await notificationModel.findOneAndUpdate({ _id: id }, { seen: 1 });
    return res.json(notification)
}

exports.getAll = async (req, res) => {
    const notification = await notificationModel.find({});
    return res.json(notification)
}

exports.remove = async (req, res) => { }