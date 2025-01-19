const { default: mongoose } = require("mongoose");
const categoryModel = require("../../models/category");
const { isValidObjectId } = require("mongoose");

exports.create = async (req, res) => {

    const { title, href } = req.body;
    console.log("REQ", req.user.role);
    const category = await categoryModel.create({ title, href });
    console.log(category);
    return res.status(201).json(category);


}

exports.getAll = async (req, res) => {

    const categories = await categoryModel.find({});
    return res.json(categories);


}

// exports.remove = async (req, res) => {
//     const { id } = req.params;

//     console.log("ID", id);

//     const isValid = isValidObjectId(req.params.id);

//     console.log("ISVALID", isValid)

//     if (!isValid) {
//         return res.status(409).json({ message: "Category is not Valid" })

//     }
//     const deletedCategory = categoryModel.findOneAndDelete({ _id: id })
//     console.log("DELETED CATEGORY:",deletedCategory) 
//     return res.json(deletedCategory)
// }
exports.remove = async (req, res) => {
    const { id } = req.params;
    console.log("ID", id);
    const isValidID = mongoose.Types.ObjectId.isValid(id);
    console.log("ISVALID", isValidID)
    if (!isValidID) {
        return res.status(409).json({
            message: "Category ID is not valid !!",
        });
    }

    const deletedCategory = await categoryModel.findByIdAndDelete({
        _id: id,
    });
    console.log("DELETED CATEGORY:", deletedCategory)
    return res.json(deletedCategory);
};
exports.update = async (req, res) => {
    const { title, href } = req.body;
    const isValidID = mongoose.Types.ObjectId.isValid(req.params.id);
    // Validate

    if (!isValidID) {
        return res.status(409).json({
            message: "Category ID is not valid !!",
        });
    }

    const updatedCategory = await categoryModel.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        {
            title,
            href,
        }
    );

    if (!updatedCategory) {
        return res.status(404).json({
            message: "Category not found !!",
        });
    }

    return res.json(updatedCategory);
};
