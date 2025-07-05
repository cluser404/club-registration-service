const Joi = require('joi');

const createRegistrationSchema = Joi.object({
    // Essentials
    studentId: Joi.string().required(),
    name: Joi.string().required(),
    semester: Joi.string().optional(),
    program: Joi.string().valid(
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
    ).optional(),

    // Contact info
    personalEmail: Joi.string().email().optional(),
    orgEmail: Joi.string().email().required(),
    mobile: Joi.string().optional(),
    address: Joi.string().optional(),

    // Personal details
    bio: Joi.string().optional(),
    dateOfBirth: Joi.date().iso().optional(),
    gender: Joi.string().valid('male', 'female', 'other').optional(),

    // Academic
    residentialSemester: Joi.string().optional(),
    preferredDepartments: Joi.array().items(Joi.string()).optional(),

    // Social profiles
    githubProfileLink: Joi.string().uri().optional(),
    facebookProfileLink: Joi.string().uri().optional(),
    linkedInProfileLink: Joi.string().uri().optional(),
    instragramProfileLink: Joi.string().uri().optional()
});

const updateRegistrationSchema = createRegistrationSchema.fork(
    Object.keys(createRegistrationSchema.describe().keys),
    (field) => field.optional()
);

module.exports = {
    createRegistrationSchema,
    updateRegistrationSchema
}