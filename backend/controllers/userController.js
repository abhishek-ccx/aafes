const catchAsync = require("../utils/catchAsync")
const User = require("./../model/userModel")
const AppError = require("./../utils/appError")

exports.getUsers = catchAsync(async (req,res,next)=>{
    const users = await User.find()
    res.status(200).json({
        status: "ok",
        length: users.length,
        data:{
            users
        }
    })
})

// {data:{role: selectedRole}})
exports.updateUser = catchAsync(async (req, res, next) => {
  console.log("aaaaa",req.body.data)
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body.data, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "ok",
      data: {
        updatedUser,
      },
    });
  });

exports.getUserRole = catchAsync(async (req,res,next)=>{
    const {email} = req.body
    const user = await User.findOne({email})
    if (!user) {
        return next(new AppError("No user found with this email.", 404));
      }

    // console.log(user)
    res.status(200).json({
        status: "ok",
        role: user.role
    })
})

exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(new AppError("No user found with the ID", 404));
    }
    res.status(204).json({
      status: "ok",
      data: null,
    });
  });
  