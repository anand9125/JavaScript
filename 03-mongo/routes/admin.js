const{Admin , User,Course} = require("../db")
const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {
    const username = req.body.username;
    const password =req.body.password;
      await Admin.create({
        username,
        password
    })
    res.json({
        mesg: "Admin is Created"
    })
 // Implement admin signup logic
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const tittle = req.body.tittle;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
  const newCourse=  await Course.create({
        tittle,
        description,
        price,
        imageLink
    })
    // why we aew using new course (await) beacuse new Courses created a id and we want that id so wait for to creted that id whrn it is created 
    // then use newCourses ._id
      res.json({
        mesg :"Course is Created Sussesfully", CourseId: newCourse._id

})

});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({
        // if do inside  specific price then it will give only those prices courses
    })
    res.json({
        Course: response
        // similary why we agin use reponse ?
        //  because this response will give all course and we and to print in json formet
    })


});

module.exports = router;