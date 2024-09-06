import { model, Schema } from "mongoose";
import { TAcademicSemester, } from "./academicSemester.interface";
import { academicSemesterCode, academicSemesterName, Months } from "./academicSemester.constant";


const academicSemesterSchema = new Schema<TAcademicSemester>({
    name:{
        type:String,
        required:true,
        enum:academicSemesterName
    },
    code:{
        type:String,
        enum:academicSemesterCode,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    startMonth:{
        type:String,
        required:true,
        enum:Months
    },
    endMonth:{
        type:String,
        required:true,
        enum:Months
    },
},
{
    timestamps:true
},
);

// extra middlewares before save
academicSemesterSchema.pre('save',async function(next){
    const isSemesterExists = await AcademicSemester.findOne({
        year:this.year,
        name:this.name,
    });

    if(isSemesterExists){
        throw new Error('Semester is already exists !');
    }
    next();
})

// academic semester model
export const AcademicSemester = model<TAcademicSemester>('AcademicSemester',academicSemesterSchema);