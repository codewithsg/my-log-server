interface IRegisterUser{
    name:string;
    email:string;
    phone:string;
    password:string
}

interface ILoginUser{
    email:string;
    password:string;
}

export {IRegisterUser,ILoginUser}