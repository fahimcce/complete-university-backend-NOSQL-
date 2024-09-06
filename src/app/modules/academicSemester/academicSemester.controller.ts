
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Academic Semester is created succesfully',
    data:result,
  })
})

//Get All semesters
const getAllSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllSemestersFromDB();
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'All Semesters are retrieved succesfully',
    data:result,
  })
});


//Get Single Semester
const getSingleSemester = catchAsync(async (req, res,) => {
  const { _id } = req.params;
  const result = await AcademicSemesterServices.getSingleSemesterFromDB(_id);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Single Semester is retrieved succesfully',
    data:result,
  })
});

// Update a single academic semester by ID
const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params; // Extracting semesterId from URL parameters
  const result = await AcademicSemesterServices.updateAcademicSemesterInDB(semesterId, req.body);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester updated successfully',
    data: result, // Ensure result is not null
  });
});


export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllSemesters,
    getSingleSemester,
    updateAcademicSemester,
  }