export type eUser = {
   UserName:string,
    ERPID:string,
    EMail:string,
    HashPassword:string,
    Token:string,
    RefreshToken:string
}

export type eRole ={
    GroupID:number
    RoleName:string
}

export type eUserRole = {
    UserID:string,
    RoleID:string
}

export type loginUser = {
    email:string,
    password:string
}



