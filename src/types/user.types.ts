


export type IRegisterInput = {
    fullName: string;
    email: string;
    password: string;
};

export type IVerifyInput = {
    email: string;
    otp: string;
};