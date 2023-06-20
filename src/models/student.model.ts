/* eslint-disable comma-dangle */
import { bloodGroup, gender } from 'constants/student';
import { Schema, model } from 'mongoose';
import { IStudent, StudentModel } from 'types/students';

const studentSchema = new Schema<IStudent, StudentModel>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: {
                firstName: {
                    type: String,
                    required: true,
                },
                middleName: {
                    type: String,
                },
                lastName: {
                    type: String,
                    required: true,
                },
            },
            required: true,
            _id: false,
        },
        gender: {
            type: String,
            enum: gender,
        },
        dateOfBirth: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        contactNo: {
            type: String,
            unique: true,
            required: true,
        },
        emergencyContactNo: {
            type: String,
            required: true,
        },
        bloodGroup: {
            type: String,
            enum: bloodGroup,
        },
        presentAddress: {
            type: String,
            required: true,
        },
        permanentAddress: {
            type: String,
            required: true,
        },
        guardian: {
            required: true,
            type: {
                fatherName: {
                    type: String,
                    required: true,
                },
                fatherOccupation: {
                    type: String,
                    required: true,
                },
                fatherContactNo: {
                    type: String,
                    required: true,
                },
                motherName: {
                    type: String,
                    required: true,
                },
                motherOccupation: {
                    type: String,
                    required: true,
                },
                motherContactNo: {
                    type: String,
                    required: true,
                },
                address: {
                    type: String,
                    required: true,
                },
            },
            _id: false,
        },
        localGuardian: {
            required: true,
            type: {
                name: {
                    type: String,
                    required: true,
                },
                occupation: {
                    type: String,
                    required: true,
                },
                contactNo: {
                    type: String,
                    required: true,
                },
                address: {
                    type: String,
                    required: true,
                },
            },
            _id: false,
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicFaculty',
            required: true,
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
        },
        semester: {
            type: Schema.Types.ObjectId,
            ref: 'Semester',
            required: true,
        },
        profileImage: {
            type: String,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

const Student = model<IStudent, StudentModel>('Student', studentSchema);

export default Student;
