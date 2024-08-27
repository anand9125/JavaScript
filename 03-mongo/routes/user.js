const{Admin , User,Course} = require("../db")
const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
   await User.create({
        username,password
    })
    res.send({
        mesg: "User is Created Successfully"
    })
    

});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({
// now if write the logic like isPublished = true inside the courses creation and hear also add isPublished = true then only course will senn which is published
    })
    res.json({
        COurses:response
    })

});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    // the course id will come form parameter
    const username = req.headers.username;
    await User.updateOne({
        username : username
    },{
       "$push" :{
         purchasedCourse :  courseId
       }
    }
)
res.json({
    mesg: "Courses is purchased"
})
    


});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic
    // we want ki user ne course purchased kar liye hai then  wo show karo mtlb jo jo usne kharide hai 
    //The $in operator checks if the value of _id is in the provided array.
    //_id: { "$in": user.purchasedCourse }: This is the query condition. 
    //It specifies that the query should find all documents in the Course collection
    // where the _id field matches any of the IDs in the user.purchasedCourse array.
    // The $in operator checks if the value of _id is in the provided arra
    const user = await User.findOne({
        username: req.body.username
    })
    const courses = await Course.find({
        _id:{
            "$in" : user.purchasedCourse 
        }
    });
    res.json({
        Course:courses
    })
    

});

module.exports = router