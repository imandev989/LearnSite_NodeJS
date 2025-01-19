const courseModel = require("./../../models/course");
const sessionModel = require("../../models/session");
const categoryModel = require("../../models/category");
const commentModel = require("../../models/comment");

const courseUserModel = require("../../models/course-user");
const { default: mongoose } = require("mongoose");
exports.create = async (req, res) => {
    const { name, description, support, href, price, status, discount, categoryId } = req.body;
    console.log("HEYYYY", name, description, support, href, price, status, discount, categoryId);

    const course = await courseModel.create({
        name,
        description,
        support,
        href,
        price,
        status,
        discount,
        categoryId,
        cover: req.file.filename,
        creator: req.user._id
    });
    console.log("COURSE", course);
    const mainCourse = await courseModel.findById(course._id).populate("creator", "-password");

    console.log("MAINCOURSE", mainCourse);

    return res.status(201).json(mainCourse);

}

exports.createSession = async (req, res) => {
    const { title, free, time } = req.body;
    const { id } = req.params;

    console.log("REQ", req.body)

    const session = await sessionModel.create({
        title,
        time,
        free,
        // video: req.file.filename,
        video: "Video.mp4",
        course: id,

    })

    return res.status(201).json(session);
}

exports.getAllSessions = async (req, res) => {
    const sessions = await sessionModel.find({}).populate("course", "name").lean();
    return res.json(sessions);
}

exports.getSessionInfo = async (req, res) => {
    const course = await courseModel.findOne({ href: req.params.href }).lean();
    const session = await sessionModel.findOne({ _id: req.params.sessionID });
    const sessions = await sessionModel.find({ course: course._id });
    return res.json({ session, sessions })
}

exports.removeSession = async (req, res) => {
    const deletedCourse = await sessionModel.findOneAndDelete({ _id: req.params.id });
    if (!deletedCourse) {
        return res.status(404).json({ message: "Course not found !!" })
    }
    return res.json(deletedCourse);
}

exports.register = async (req, res) => {
    console.log("Price", req.body.price);
    const isUserAlreadyRegistered = await courseUserModel.findOne(
        { user: req.user._id, course: req.params.id }).lean();
    if (isUserAlreadyRegistered) {
        return res.status(409).json({ message: "User Already Registred !!" });
    }

    const register = await courseUserModel.create({
        user: req.user._id,
        course: req.params.id,
        price: req.body.price
    })

    return res.status(201).json({ message: "You are registered !!" })
}

exports.getCourseByCategory = async (req, res) => {
    const { href } = req.params;
    const category = await categoryModel.find({ href })

    if (category) {
        const categoryCourses = await courseModel.find({
            categoryId: category._id,
        });
        res.json(categoryCourses)
    } else {
        res.json([])
    }
}


exports.getOne = async (req, res) => {
    const course = await courseModel
      .findOne({ href: req.params.href })
      .populate("creator", "-password")
      .populate("categoryId");
  
    const sessions = await sessionModel.find({ course: course._id }).lean();
    const comments = await commentModel
      .find({ course: course._id, isAccept: 1 })
      .populate("creator", "-password")
      .populate("course")
      .lean();
  
    const courseStudentsCount = await courseUserModel
      .find({
        course: course._id,
      })
      .countDocuments();
  
    const isUserRegisteredToThisCourse = !!(await courseUserModel.findOne({
      user: req.user._id,
      course: course._id,
    }));
  
    let allComments = [];
  
    comments.forEach((comment) => {
      comments.forEach((answerComment) => {
        if (String(comment._id) == String(answerComment.mainCommentID)) {
          allComments.push({
            ...comment,
            course: comment.course.name,
            creator: comment.creator.name,
            answerComment,
          });
        }
      });
    });
  
    res.json({
      course,
      sessions,
      comments: allComments,
      courseStudentsCount,
      isUserRegisteredToThisCourse,
    });
  };

exports.remove = async (req, res) => {
    const isObjectIDValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isObjectIDValid) {
        return res.status(409).json({ message: "Course ID is not valid !!" });
    }
    const deletedCourse = await courseModel.findOneAndDelete({ _id: req.params.id });
    if (!deletedCourse) {
        return res.status(404).json({
            message: "Course not found!!"
        });
    }
    return res.json(deletedCourse)

}


exports.getRelated = async (req, res) => {
    const { href } = req.params;
    const course = await courseModel.find({ href });
    if (!course) {
        return res.status(404).json({ message: "Course not Found !!" })
    }

    let relatedCourses = await courseModel.find({ categoryId: course.categoryId });
    console.log("RELATED",relatedCourses);

    // relatedCourses = relatedCourses.filter((course) => course.href !== href);


    return res.json(relatedCourses);

}

exports.popular = async (req, res) => {
    // Coding ...✌️
  };
  
  exports.presell = async (req, res) => {
    // Coding ...✌️
  };
  