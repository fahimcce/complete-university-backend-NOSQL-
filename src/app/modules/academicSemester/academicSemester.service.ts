import { semesterCodeNameMap } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

//Create a semester to db.
const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
  // Check if the code and name match
  if (semesterCodeNameMap[payLoad.code] !== payLoad.name) {
    throw new Error(`Semester name and code do not match: ${payLoad.name} should be paired with code ${payLoad.code}.`);
  }
  const result = await AcademicSemester.create(payLoad);
  return result;
};

//Get all Academic semesters
const getAllSemestersFromDB = async () => {
    const result = await AcademicSemester.find();
    return result;
  };

//Get Single academic semester By ID
const getSingleSemesterFromDB = async (_id: string) => {
  const result = await AcademicSemester.findById(_id);
  return result;
};

// Update a single academic semester by ID
const updateAcademicSemesterInDB = async (
  _id: string, 
  payload: Partial<TAcademicSemester>
) => {
  if (
    payload.name && 
    payload.code && 
    semesterCodeNameMap[payload.code] !== payload.name
  ) {
    throw new Error(`Invalid Semester Code`);
  }
  // Update the document and return the updated document
  const result = await AcademicSemester.findByIdAndUpdate(_id,payload,{ new: true, runValidators: true }
  );
  // Check if the document was found and updated
  if (!result) {
    throw new Error('Academic Semester not found');
  }
  return result;
};



export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllSemestersFromDB,
  getSingleSemesterFromDB,
  updateAcademicSemesterInDB,
};
