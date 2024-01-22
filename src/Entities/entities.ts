export type eUser = {
    UserID:string,
    UserName:string,
    ERPID:string,
    EMail:string,
    HashPassword:string,
    CustId:string
 
}

export type eRole ={
    RoleID:string
    GroupID:number
    RoleName:string
}

export type eUserRole = {

    UserID:string,
    RoleID:string
}

export type eRoleGroup = {
    GroupID:string,
    GroupName:string,
    SrNo:Number
}


export type loginUser = {
    email:string,
    password:string
}


export type changePassword ={
 email:string,
 password:string,
 newPassword:string,
}

export type dashboardTile = {
    heading:string,
    value:number,
    valueInPerc:number,
    detailLink:string,
    subHeading?:string
    color?:string,
    bgColor?:string
}







