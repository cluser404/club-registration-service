const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const registrationSchema = new mongoose.Schema({
    // Essentials
    studentId: {
        type: String,
        required: true,
        unique: true ,
    },
    name: {
        type: String,
        required: true
    },
    semester: {
        type: String
    },
    program: {
        type: String,
        enum: [
            'Applied Physics & Electronics',
            'Anthropology',
            'Architecture',
            'BBA',
            'Biotechnology',
            'Computer Science',
            'Computer Science & Engineering',
            'Economics',
            'Electrical & Electronic Engineering',
            'Electronics & Communication Engineering',
            'English',
            'LLB',
            'Mathematics',
            'Microbiology',
            'Pharmacy',
            'Physics',
            'Other',
        ]
    },

    // Contact info
    personalEmail: {
        type: String
    },
    orgEmail: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    },
    address: {
        type: String,
    },

    // Personal details
    bio: {
        type:String
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    
    // Academic
    residentialSemester: {
        type:String
    },
    preferredDepartments: {
        type:[String]
    },

    // Social profiles
    githubProfileLink: {
        type: String
    },
    facebookProfileLink: {
        type: String
    },
    linkedInProfileLink: {
        type: String
    },
    instragramProfileLink: {
        type: String
    },

    // Picture
    picture: {
        type: String
    }
}, {
    timestamps: true,
});

registrationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Registration', registrationSchema);