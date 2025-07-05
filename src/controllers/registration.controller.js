const mongoose = require('mongoose');
const registrationModel = require('../models/registration.model');
const Registration = require('../models/registration.model');

exports.createRegistration = async (req, res) => {
    try {
        const registration = await Registration.create(req.body);
        res.status(201).json(registration);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.getRegistration = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID format' });
        }
        const registration = await Registration.findById(id);
        if (!registration) {
            return res.error(404).json({ success: false, message: 'Registration not found' })
        }

        res.status(200).json({ sucess: true, data: registration });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ sucess: false, message: 'Invalid ID format' });
        }
        res.status(500).json({ sucess: false, error: err.message });
    }
}

exports.getAllRegistrations = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            gender,
            name,
            studentId,
            semester,
            mobile,
            program,
            preferredDepartment,
            personalEmail,
            orgEmail,
            // for createdAt filtering
            startDate,
            endDate,
        } = req.query;

        query = {};
        filtersInUse = {};

        // Exact match filters
        if (studentId) {
            query.studentId = studentId;
            filtersInUse.studentId = studentId;
        }
        if (semester) {
            query.semester = semester;
            filtersInUse.semester = semester;
        }
        if (mobile) {
            query.mobile = mobile;
            filtersInUse.mobile = mobile;
        }
        if (program) {
            query.program = program;
            filtersInUse.program = program;
        }
        if (personalEmail) {
            query.personalEmail = personalEmail;
            filtersInUse.personalEmail = personalEmail;
        }
        if (orgEmail) {
            query.orgEmail = orgEmail;
            filtersInUse.orgEmail = orgEmail;
        }

        // Enum (exact match)
        if (gender) {
            query.gender = gender;
            filtersInUse.gender = gender;
        }

        // Partial (case-insensitive) match
        if (name) {
            query.name = { $regex: name, $options: 'i' };
            filtersInUse.name = name;
        };

        // Array contains - preferredDepartments (assuming array of strings)
        if (preferredDepartment) {
            const departments = Array.isArray(preferredDepartment)
                ? preferredDepartment
                : preferredDepartment.split(',').map(s => s.trim());
            query.preferredDepartments = { $in: departments };

            filtersInUse.preferredDepartment = preferredDepartment
        }

        // query for startDate and endDate
        if (startDate || endDate) {
            query.startDate = {};
            if (startDate) {
                query.createdAt.$gte = new Date(startDate);
                filtersInUse.startDate = startDate;
            }
            if (endDate) {
                query.createdAt.$lte = new Date(endDate);
                filtersInUse.endDate = endDate;
            }
        }
        
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 },
        };

        const result = await registrationModel.paginate(query, options)
        
        res.status(200).json({
            sucess: true,
            data: result.docs,
            filters: filtersInUse,
            pagination: {
                total: result.totalDocs,
                limit: result.limit,
                page: result.page,
                totalPages: result.totalPages,
                hasNextPage: result.hasNextPage,
                hasPrevPage: result.hasPrevPage
            },
        });
    } catch (err) {
        res.status(500).json({ sucess: false, error: err.message })
    }
}

exports.updateRegistration = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID format' });
        }

        const updateData = req.body;

        const updated = await Registration.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updated) {
            return res.error(404).json({ success: false, message: 'Registration not found' })
        }

        res.status(200).json({
            sucess: true,
            message: 'Registration updated sucessfully',
            data: updated
        });
    } catch (err) {
        res.status(500).json({ sucess: false, error: err.message });
    }
}

exports.deleteRegistration = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID format' });
        }
        const registration = await Registration.findByIdAndDelete(id);

        if (!registration) {
            return res.error(404).json({ success: false, message: 'Registration not found' })
        }

        res.status(200).json({
            sucess: true,
            message: 'Registration deleted sucessfully',
            data: registration
        });
    } catch (err) {
        res.status(500).json({ sucess: false, error: err.message });
    }
}