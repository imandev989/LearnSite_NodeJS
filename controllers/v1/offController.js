const { default: mongoose } = require("mongoose");
const offModel = require("../../models/Off");
const coursesModel = require("../../models/course");

exports.create = async (req, res) => {
    const { code, course, percent, max } = req.body;

    const newOff = await offModel.create({ code, course, percent, max, uses: 0, creator: req.user._id });

    return res.status(201).json(newOff);

}

exports.setOnAll = async (req, res) => {
    const { discount } = req.body;
    const coursesDiscounts = await coursesModel.updateMany({ discount });
    return res.json({ message: "Discounts set successfully" })
}

exports.getAll = async (req, res) => {
    const offs = await offModel.find({}, "-__v").populate("course", "name href").populate("creator", "name");
    return res.json(offs);

}

exports.getOne = async (req, res) => {
    const { code } = req.params;
    const { course } = req.body;
    const isValidID = mongoose.Types.ObjectId.isValid(course);
    // Validate

    if (!isValidID) {
        return res.status(409).json({
            message: "Course ID is not valid !!",
        });
    }
    // if (!mongoose.Types.ObjectId.isValid(course)) {
    //     return res.json({ message: "Course Id is not valid" })
    // }
    const off = await offModel.findOne({ code, course });
    if (!off) {
        return res.status(404).json({ message: "code is not valid" })
    } else if (off.max === off.uses) {
        return res.status(409).json({ message: "code already used !!" })
    } else {
        await offModel.findOneAndUpdate({ code, course }, { uses: off.uses + 1 })
        return res.json(off);
    }
    return res.json({ message: "OK" })

}

exports.remove = async (req, res) => {

}