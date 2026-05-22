import AppError from "../../app/errors/AppError";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import httpStatus from 'http-status';

const addNewStudent = async (payload: TStudent) => {
    const studentExistsByEmail = await Student.findOne({ email: payload.email });
    const studentExistsByPhoneNumber = await Student.findOne({ phoneNumber: payload.phoneNumber });
    if (studentExistsByEmail) {
        throw new AppError(httpStatus.BAD_REQUEST, "Student with this email already exists");
    }
    if (studentExistsByPhoneNumber) {
        throw new AppError(httpStatus.BAD_REQUEST, "Student with this phone number already exists");
    };
    const result = await Student.create(payload);
    return result;
};

const getAllStudents = async () => {
    const result = await Student.find();
    return result;
};

const getSingleStudentById = async (studentId: string) => {
    const result = await Student.findById(studentId);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Student not found");
    };
    return result;
};

const updateStudentById = async (studentId: string, payload: Partial<TStudent>) => {
    const result = await Student.findByIdAndUpdate(studentId, payload, {
        new: true,
        runValidators: true
    });
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Student not found");
    };
    return result;
};

const deleteStudentById = async (studentId: string) => {
    const result = await Student.findByIdAndDelete(studentId);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Student not found");
    };
    return result;
};

export const StudentService = {
    addNewStudent,
    getAllStudents,
    getSingleStudentById,
    updateStudentById,
    deleteStudentById,
};