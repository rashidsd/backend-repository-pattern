import { dashboardTile } from "../../Entities/entities";
import dayjs from 'dayjs'
import { QueryTypes } from "sequelize";
import db from "../../db.config"


async function dbHR(unitId:string,empCategory:string,dated:string): Promise<dashboardTile[]> {

    var hrDashboard = new Set<dashboardTile>();

    const UID = unitId === "000" ? "" : " AND  UnitID=:UnitID";
    const replacementObject = unitId === "000" ? {} : { UnitID: unitId };
    let attendanceDate = dayjs(new Date(dated)).format("YYYY-MM-DD");
    let fromDate = dayjs(new Date(dated)).day(-30).format("YYYY-MM-DD")
 
    let result: any;

    result = await db.query(
      "Select ISNULL(Count(*),0)TEmployees from Employee Where ISNULL(Active,0)=1 AND Employee_Category=:empCategory " +
        UID,
      {
        replacements: { ...replacementObject, empCategory: empCategory },
        type: QueryTypes.SELECT,
      }
    );
    const TotalEmployees = result[0].TEmployees;

    var activeEmployee: dashboardTile = {
     heading: "Active Employee",
     value: TotalEmployees,
     valueInPerc: -1,
     detailLink: `hrdashboardDetail/Active Employees/activeEmployee/${unitId}/${empCategory}/${attendanceDate}`,
     color:'#3e2723',
     
   };
   hrDashboard.add(activeEmployee);


    //Present Employees
    result = await db.query(
      "Select Convert(float,ISNULL(Count(*),0))Present from VAttendance Where Employee_Category=:empCategory AND Attendance_Date=:attendanceDate " +
        UID,
      {
        replacements: {
          ...replacementObject,
          empCategory: empCategory,
          attendanceDate: attendanceDate,
        },
        type: QueryTypes.SELECT,
      }
    );

    const PEmployee = result[0].Present
    var PresentEmployee: dashboardTile = {
      heading: "Present Employee",
      value: result[0].Present,
      valueInPerc: Math.round((PEmployee / TotalEmployees) * 100),
      detailLink: `hrdashboardDetail/Present Employees/presentEmployee/${unitId}/${empCategory}/${attendanceDate}`,
    };
    hrDashboard.add(PresentEmployee);


      var AbsentEmployee: dashboardTile = {
        heading: "Absent Employee",
        value: TotalEmployees - PEmployee ,
        valueInPerc: Math.round(((TotalEmployees - PEmployee) / TotalEmployees) * 100),
        detailLink: `hrdashboardDetail/Absent Employees/absentEmployee/${unitId}/${empCategory}/${attendanceDate}`,
        color:'#c51162'
      };
      hrDashboard.add(AbsentEmployee);

      //Late Commers
     result = await db.query(
       "Select Convert(float,ISNULL(Count(*),0))Late from VAttendance Where Employee_Category=:empCategory "
       + " AND ISNULL(Late_Min,0)>0 AND Attendance_Date=:attendanceDate " + UID,
     {
       replacements: {
         ...replacementObject,
         empCategory: empCategory,
         attendanceDate: attendanceDate,
       },
       type: QueryTypes.SELECT,
     }
   );

   const LCommers = result[0].Late
   var LateCommers: dashboardTile = {
     heading: "Late Commers",
     value: LCommers,
     valueInPerc: Math.round((LCommers / TotalEmployees) * 100),
     detailLink: `hrdashboardDetail/Late Commers/lateCommers/${unitId}/${empCategory}/${attendanceDate}`,
     color:'#ffab00'
   };
   hrDashboard.add(LateCommers);


   //Total Advance Active
   result = await db.query(
     "select Round(ISNULL(SUM(Total_Bal),0),0)TotalAdvance from VTotal_Balance Where Active=1 AND Employee_Category=:empCategory " + UID,
   {
     replacements: {
       ...replacementObject,
       empCategory: empCategory,
      },
     type: QueryTypes.SELECT,
   }
 );

 const activeAdvance = result[0].TotalAdvance
 var ActiveAdvance: dashboardTile = {
   heading: "Total Advance (Active)",
   value: activeAdvance,
   valueInPerc: -1,
   detailLink: `hrdashboardDetail/Active Advances/activeAdvances/${unitId}/${empCategory}/${attendanceDate}`,
   color:'#808000'
 };
 hrDashboard.add(ActiveAdvance);

  //Total Advance In Active
  result = await db.query(
   "select Round(ISNULL(SUM(Total_Bal),0),0)TotalAdvance from VTotal_Balance Where ISNULL(Active,0)=0 AND Employee_Category=:empCategory " + UID,
 {
   replacements: {
     ...replacementObject,
     empCategory: empCategory,
    },
   type: QueryTypes.SELECT,
 }
);

const inActiveAdvance = result[0].TotalAdvance
var InActiveAdvance: dashboardTile = {
 heading: "Total Advance (In-Active)",
 value: inActiveAdvance,
 valueInPerc: -1,
 detailLink: `hrdashboardDetail/In-Active Advances/inActiveAdvances/${unitId}/${empCategory}/${attendanceDate}`,
 color:'#6495ED'
};
hrDashboard.add(InActiveAdvance);

//Last 30 day joining
result = await db.query(
 "Select Convert(float,ISNULL(Count(*),0))Last30daysJoinings from Employee Where Employee_Category=:empCategory AND DOJ>=:fromDate AND DOJ<=:toDate " + UID,
{
 replacements: {
   ...replacementObject,
   empCategory: empCategory,
   fromDate:fromDate,
   toDate:attendanceDate
  },
 type: QueryTypes.SELECT,
}
);

const last30dayJoings = result[0].Last30daysJoinings
var Last30dayJoinings: dashboardTile = {
heading: "Last 30 day joinings",
value: last30dayJoings,
valueInPerc: -1,
detailLink: `hrdashboardDetail/Last 30 day Joinings/last30dayJoinings/${unitId}/${empCategory}/${attendanceDate}`,
color:'#1b5e20'
};
hrDashboard.add(Last30dayJoinings);


//Last 30 day Terminations
result = await db.query(
 " With cte as (Select Employeeid,Max(Dated)Dated from Employee_Termination Where EmpStatus ='Termination' " + UID + " AND EmployeeID IN (Select EmployeeID from Employee Where Employee_Category=:empCategory AND ISNULL(Active,0)=0) group by EmployeeID) Select Convert(float,ISNULL(Count(*),0))last30daysTerminations from Cte Where Dated>=:fromDate AND Dated<=:toDate",
{
 replacements: {
   ...replacementObject,
   empCategory: empCategory,
   fromDate:fromDate,
   toDate:attendanceDate
  },
 type: QueryTypes.SELECT,
}
);

const last30dayTerminations = result[0].last30daysTerminations
var Last30dayTerminations: dashboardTile = {
heading: "Last 30 day Terminations",
value: last30dayTerminations,
valueInPerc: -1,
detailLink: `hrdashboardDetail/Last 30 day Terminations/last30dayTerminations/${unitId}/${empCategory}/${attendanceDate}`,
color:'#c51162'
};
hrDashboard.add(Last30dayTerminations);
    return [...hrDashboard];


}

async function dbHRDetail(tag: string, unitId: string, empCategory: string, dated: string): Promise<any[]> {

    const UID = unitId === "000" ? "" : " AND  UnitID=:UnitID";
     const replacementObject = unitId === "000" ? {} : { UnitID: unitId };
     let attendanceDate = dayjs(new Date(dated)).format("YYYY-MM-DD");
     let fromDate = dayjs(new Date(dated)).day(-30).format("YYYY-MM-DD")
     let result: any;
     
   if (tag==='activeEmployee') {
     result = await db.query(
       "Select EmployeeID as ID, UnitName as Location,Convert(Date,DOJ)DOJ,Employee_Name,Department_Name,Designation,Mobile_No from VEmployee Where Active=1 AND Employee_Category=:empCategory " + UID,
       {
         replacements: { ...replacementObject, empCategory: empCategory },
         type: QueryTypes.SELECT,
        }
         );
   }else if (tag==='presentEmployee') {
     result = await db.query(
     "Select VAttendance.EmployeeID as ID, VAttendance.EmployeeID,UnitName as Location,Convert(Date,DOJ)DOJ,Employee_Name,Department_Name,Designation,Format(InTime,'HH:mm')InTime from VAttendance Left join" +
      "( Select EmployeeID,Attendance_Date as Dated,Min(In_Time)InTime,Max(Out_Time)OutTime from Attendance_Detail d left join Attendance_Master m " + 
      " on  d.AttendanceID = m.AttendanceID Group by EmployeeID,Attendance_Date )InOut on VAttendance.EmployeeID=InOut.EmployeeID AND " +
      " VAttendance.Attendance_Date=InOut.Dated Where Employee_Category=:empCategory AND VAttendance.Attendance_Date=:attendanceDate  " +
      UID,
       {
        replacements: { ...replacementObject, empCategory: empCategory,attendanceDate:attendanceDate },
        type: QueryTypes.SELECT,
      }
    );
  }else if (tag==='absentEmployee') {
    result = await db.query(
      "Select EmployeeID as ID,EmployeeID,UnitName as Location,Convert(Date,DOJ)DOJ,Employee_Name,Department_Name,Designation,Mobile_No from VEmployee Where Active=1 AND Employee_Category=:empCategory " +
      " AND EmployeeID NOT IN (Select EmployeeID from Attendance_Master Where Attendance_Date=:attendanceDate )" +
      UID,
       {
        replacements: { ...replacementObject, empCategory: empCategory,attendanceDate:attendanceDate },
        type: QueryTypes.SELECT,
      }
    );
  }else if (tag==='lateCommers') {
    result = await db.query(
      "Select  VAttendance.EmployeeID as ID,VAttendance.EmployeeID,UnitName as Location,Convert(Date,DOJ)DOJ,Employee_Name,Department_Name,Designation,Format(InTime,'HH:mm')InTime from VAttendance Left join" +
    "( Select EmployeeID,Attendance_Date as Dated,Min(In_Time)InTime,Max(Out_Time)OutTime from Attendance_Detail d left join Attendance_Master m " + 
    " on  d.AttendanceID = m.AttendanceID Group by EmployeeID,Attendance_Date )InOut on VAttendance.EmployeeID=InOut.EmployeeID AND " +
    " VAttendance.Attendance_Date=InOut.Dated Where Employee_Category=:empCategory "
    + " AND ISNULL(Late_Min,0)>0 AND Attendance_Date=:attendanceDate " + UID,
       {
        replacements: { ...replacementObject, empCategory: empCategory,attendanceDate:attendanceDate },
        type: QueryTypes.SELECT,
      }
    );
  }else if (tag==='activeAdvances') {
    result = await db.query(
      "Select EmployeeID as ID,EmployeeID,UnitName as Location,Convert(Date,DOJ)DOJ,Employee_Name,Department_Name,Designation,Mobile_No,Total_Bal as Advance from VTotal_Balance Where ISNULL(Active,0)=1 AND Employee_Category=:empCategory " + UID,
       {
        replacements: { ...replacementObject, empCategory: empCategory },
        type: QueryTypes.SELECT,
      }
    );
  }else if (tag==='inActiveAdvances') {
    result = await db.query(
      "select EmployeeID as ID,EmployeeID,UnitName as Location,Convert(Date,DOJ)DOJ,Employee_Name,Department_Name,Designation,Mobile_No,Total_Bal as Advance from VTotal_Balance Where ISNULL(Active,0)=0 AND Employee_Category=:empCategory " + UID,
       {
        replacements: { ...replacementObject, empCategory: empCategory },
        type: QueryTypes.SELECT,
      }
    );
  }else if (tag==='last30dayJoinings') {
    result = await db.query(
      "Select EmployeeID as ID,EmployeeID,UnitName as Location,Convert(Date,DOJ)DOJ,Employee_Name,Department_Name,Designation,Mobile_No from VEmployee Where Employee_Category=:empCategory AND DOJ>=:fromDate AND DOJ<=:toDate " + UID,
       {
        replacements: { ...replacementObject, empCategory: empCategory,fromDate:fromDate,toDate:attendanceDate },
        type: QueryTypes.SELECT,
      }
    );
  }else if (tag==='last30dayTerminations') {
    result = await db.query(
      " With cte as (Select Employeeid,Max(Dated)Dated from Employee_Termination Where EmpStatus ='Termination' " + UID + " AND EmployeeID IN (Select EmployeeID from Employee Where Employee_Category=:empCategory AND ISNULL(Active,0)=0) group by EmployeeID) Select cte.EmployeeID as ID,cte.EmployeeID,UnitName as Location,Convert(Date,DOJ)DOJ,Employee_Name,Department_Name,Designation,Mobile_No from Cte left join VEmployee e on cte.EmployeeID=e.EmployeeID Where Dated>=:fromDate AND Dated<=:toDate",
       {
        replacements: { ...replacementObject, empCategory: empCategory,fromDate:fromDate,toDate:attendanceDate },
        type: QueryTypes.SELECT,
      }
    );
  }

   return result

}



export {dbHR,dbHRDetail}