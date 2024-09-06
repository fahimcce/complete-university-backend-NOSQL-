export type TUser ={
    id:string;
    password:string;
    needsPasswordChange:boolean;
    role:'admin' |'student' |'faculty';
    isActive:'active' |'blocked';
    isDeleted : boolean;
}