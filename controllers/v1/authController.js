const userModel = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerValidator = require("../../validators/registerValidator");
const banUserModel = require("../../models/banUser");

exports.register = async (req, res) => {
    // console.log("REQ BODY ==>", req.body);
    const validationResult = registerValidator(req.body);
    if (validationResult !== true) {
        return res.status(422).json(validationResult);
    }

    const { username, name, email, password, phone } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });
    if (isUserExists) {
        return res.status(409).json({ message: "username or email is duplicated" })
    }

    const isUserBan = await banUserModel.find({ phone });
    if (isUserBan.length) {
        return res.status(409).json({ message: "This phone number is banned!!" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const countOfUser = await userModel.countDocuments();
    // console.log("User Count ==>", countOfUser);

    const user = await userModel.create({
        email,
        username,
        name,
        phone,
        password: hashedPassword,
        role: countOfUser > 0 ? "USER" : "ADMIN"
    });

    const userObject = user.toObject();
    Reflect.deleteProperty(userObject, 'password')

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30 day",
    });
    return res.status(201).json({ user: userObject, accessToken });
}

exports.login = async (req, res) => {

    const { identifier, password } = req.body;
    console.log(identifier,password);
    const user = await userModel.findOne({
        $or: [{ email: identifier }, { username: identifier }]
    })

    if (!user) {
        return res.status(401).json({ message: "user does not exist" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Password is not valid !!" })
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30 day",
    });
    res.json({ accessToken });

}

exports.getMe = async (req, res) => { }