import { TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academicSemester.interface";

export const Months: TMonths[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  export const academicSemesterName: TAcademicSemesterName[] = ["Autumn", "Summer", "Fall"];
  export const academicSemesterCode: TAcademicSemesterCode[] = ["01", "02", "03"];

  // Map to validate matching semester names and codes
  export const semesterCodeNameMap: Record<string, string> = {
    "01": "Autumn",
    "02": "Summer",
    "03": "Fall"
  };
  