import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from './academicFaculty';
import { IDepartment } from './department';
import { ISemester } from './semester';

export type UserName = {
    firstName: string;
    lastName: string;
    middleName: string;
};

export type Guardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
    address: string;
};

export type LocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
};

export type IStudent = {
    id: string;
    name: UserName;
    gender: 'male' | 'female';
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    guardian: Guardian;
    localGuardian: LocalGuardian;
    academicFaculty: Types.ObjectId | IAcademicFaculty; // reference _id
    department: Types.ObjectId | IDepartment; // // reference _id
    semester: Types.ObjectId | ISemester; // reference _id
    profileImage?: string;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;

export type IStudentFilters = {
    searchTerm?: string;
    id?: string;
    bloodGroup?: string;
    email?: string;
    contactNo?: string;
    emergencyContactNo?: string;
};
