import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { StudentService } from "./student.service";

const addNewStudent = catchAsync(async (req, res) => {
    const result = await StudentService.addNewStudent(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Student's data saved successfully",
        data: result
    });
});

const getAllStudents = catchAsync(async (req, res) => {
    const result = await StudentService.getAllStudents();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Student's data retrieved successfully",
        data: result
    });
});

const getSingleStudentById = catchAsync(async (req, res) => {
    const studentId = req.params.studentId;
    const result = await StudentService.getSingleStudentById(studentId as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Student's data retrieved successfully",
        data: result
    });
});

const updateStudentById = catchAsync(async (req, res) => {
    const studentId = req.params.studentId;
    const result = await StudentService.updateStudentById(studentId as string, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: `${result.name}'s data updated successfully`,
        data: result
    });
});

const deleteStudentById = catchAsync(async (req, res) => {
    const studentId = req.params.studentId;
    const result = await StudentService.deleteStudentById(studentId as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: `${result.name}'s data deleted successfully`,
        data: result
    });
});

export const StudentController = {
    addNewStudent,
    getAllStudents,
    getSingleStudentById,
    updateStudentById,
    deleteStudentById,
};