const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('your-mongodb-url');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username : String,
    psssword : String
    // Schema definition here
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    purchasedCourses:({
        type : mongoose.Schema.Types.ObjectId,
        ref: "Courses"

    })
});

const CourseSchema = new mongoose.Schema({
    tittle: String,
    description: String,
    price: Number,
    imageLink:String
    // Schema definition here
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}