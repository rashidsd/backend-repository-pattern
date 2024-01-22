"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbHRDetail = exports.dbHR = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../../db.config"));
function dbHR(unitId, empCategory, dated) {
    return __awaiter(this, void 0, void 0, function* () {
        var hrDashboard = new Set();
        const UID = unitId === "000" ? "" : " AND  UnitID=:UnitID";
        const replacementObject = unitId === "000" ? {} : { UnitID: unitId };
        let attendanceDate = (0, dayjs_1.default)(new Date(dated)).format("YYYY-MM-DD");
        let fromDate = (0, dayjs_1.default)(new Date(dated)).day(-30).format("YYYY-MM-DD");
        let result;
        result = yield db_config_1.default.query("Select ISNULL(Count(*),0)TEmployees from Employee Where ISNULL(Active,0)=1 AND Employee_Category=:empCategory " +
            UID, {
            replacements: Object.assign(Object.assign({}, replacementObject), { empCategory: empCategory }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const TotalEmployees = result[0].TEmployees;
        var activeEmployee = {
            heading: "Active Employee",
            value: TotalEmployees,
            valueInPerc: -1,
            detailLink: `hrdashboardDetail/Active Employees/activeEmployee/${unitId}/${empCategory}/${attendanceDate}`,
            color: '#3e2723',
        };
        hrDashboard.add(activeEmployee);
        //Present Employees
        result = yield db_config_1.default.query("Select Convert(float,ISNULL(Count(*),0))Present from VAttendance Where Employee_Category=:empCategory AND Attendance_Date=:attendanceDate " +
            UID, {
            replacements: Object.assign(Object.assign({}, replacementObject), { empCategory: empCategory, attendanceDate: attendanceDate }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const PEmployee = result[0].Present;
        var PresentEmployee = {
            heading: "Present Employee",
            value: result[0].Present,
            valueInPerc: Math.round((PEmployee / TotalEmployees) * 100),
            detailLink: `hrdashboardDetail/Present Employees/presentEmployee/${unitId}/${empCategory}/${attendanceDate}`,
        };
        hrDashboard.add(PresentEmployee);
        var AbsentEmployee = {
            heading: "Absent Employee",
            value: TotalEmployees - PEmployee,
            valueInPerc: Math.round(((TotalEmployees - PEmployee) / TotalEmployees) * 100),
            detailLink: `hrdashboardDetail/Absent Employees/absentEmployee/${unitId}/${empCategory}/${attendanceDate}`,
            color: '#c51162'
        };
        hrDashboard.add(AbsentEmployee);
        //Late Commers
        result = yield db_config_1.default.query("Select Convert(float,ISNULL(Count(*),0))Late from VAttendance Where Employee_Category=:empCategory "
            + " AND ISNULL(Late_Min,0)>0 AND Attendance_Date=:attendanceDate " + UID, {
            replacements: Object.assign(Object.assign({}, replacementObject), { empCategory: empCategory, attendanceDate: attendanceDate }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const LCommers = result[0].Late;
        var LateCommers = {
            heading: "Late Commers",
            value: LCommers,
            valueInPerc: Math.round((LCommers / TotalEmployees) * 100),
            detailLink: `hrdashboardDetail/Late Commers/lateCommers/${unitId}/${empCategory}/${attendanceDate}`,
            color: '#ffab00'
        };
        hrDashboard.add(LateCommers);
        //Total Advance Active
        result = yield db_config_1.default.query("select Round(ISNULL(SUM(Total_Bal),0),0)TotalAdvance from VTotal_Balance Where Active=1 AND Employee_Category=:empCategory " + UID, {
            replacements: Object.assign(Object.assign({}, replacementObject), { empCategory: empCategory }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const activeAdvance = result[0].TotalAdvance;
        var ActiveAdvance = {
            heading: "Total Advance (Active)",
            value: activeAdvance,
            valueInPerc: -1,
            detailLink: `hrdashboardDetail/Active Advances/activeAdvances/${unitId}/${empCategory}/${attendanceDate}`,
            color: '#808000'
        };
        hrDashboard.add(ActiveAdvance);
        //Total Advance In Active
        result = yield db_config_1.default.query("select Round(ISNULL(SUM(Total_Bal),0),0)TotalAdvance from VTotal_Balance Where ISNULL(Active,0)=0 AND Employee_Category=:empCategory " + UID, {
            replacements: Object.assign(Object.assign({}, replacementObject), { empCategory: empCategory }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const inActiveAdvance = result[0].TotalAdvance;
        var InActiveAdvance = {
            heading: "Total Advance (In-Active)",
            value: inActiveAdvance,
            valueInPerc: -1,
            detailLink: `hrdashboardDetail/In-Active Advances/inActiveAdvances/${unitId}/${empCategory}/${attendanceDate}`,
            color: '#6495ED'
        };
        hrDashboard.add(InActiveAdvance);
        //Last 30 day joining
        result = yield db_config_1.default.query("Select Convert(float,ISNULL(Count(*),0))Last30daysJoinings from Employee Where Employee_Category=:empCategory AND DOJ>=:fromDate AND DOJ<=:toDate " + UID, {
            replacements: Object.assign(Object.assign({}, replacementObject), { empCategory: empCategory, fromDate: fromDate, toDate: attendanceDate }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const last30dayJoings = result[0].Last30daysJoinings;
        var Last30dayJoinings = {
            heading: "Last 30 day joinings",
            value: last30dayJoings,
            valueInPerc: -1,
            detailLink: `hrdashboardDetail/Last 30 day Joinings/last30dayJoinings/${unitId}/${empCategory}/${attendanceDate}`,
            color: '#1b5e20'
        };
        hrDashboard.add(Last30dayJoinings);
        //Last 30 day Terminations
        result = yield db_config_1.default.query(" With cte as (Select Employeeid,Max(Dated)Dated from Employee_Termination Where EmpStatus ='Termination' " + UID + " AND EmployeeID IN (Select EmployeeID from Employee Where Employee_Category=:empCategory AND ISNULL(Active,0)=0) group by EmployeeID) Select Convert(float,ISNULL(Count(*),0))last30daysTerminations from Cte Where Dated>=:fromDate AND Dated<=:toDate", {
            replacements: Object.assign(Object.assign({}, replacementObject), { empCategory: empCategory, fromDate: fromDate, toDate: attendanceDate }),
            type: sequelize_1.QueryTypes.SELECT,
        });
        const last30dayTerminations = result[0].last30daysTerminations;
        var Last30dayTerminations = {
            heading: "Last 30 day Terminations",
            value: last30dayTerminations,
            valueInPerc: -1,
            detailLink: `hrdashboardDetail/Last 30 day Terminations/last30dayTerminations/${unitId}/${empCategory}/${attendanceDate}`,
            color: '#c51162'
        };
        hrDashboard.add(Last30dayTerminations);
        return [...hrDashboard];
    });
}
exports.dbHR = dbHR;
function dbHRDetail(tag, unitId, empCategory, dated) {
    return __awaiter(this, void 0, void 0, function* () {
        const UID = unitId === "000" ? "" : " AND  UnitID=:UnitID";
        const replacementObject = unitId === "000" ? {} : { UnitID: unitId };
        let attendanceDate = (0, dayjs_1.default)(new Date(dated)).format("YYYY-MM-DD");
        let fromDate = (0, dayjs_1.default)(new Date(dated)).day(-30).format("YYYY-MM-DD");
        let result;
        if (tag === 'activeEmployee') {
            result = yield db_config_1.default.query("Select EmployeeID as ID, UnitName as Location,Convert(Date,DOJ)DOJ,Employee_Name,Department_Name,Designation,Mobile_No from VEmployee Where Active=1 AND Employee_Category=:empCategory " + UID, {
                replacements: Object.assign(Object.assign({}, replacementObject), { empCategory: empCategory }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        else if (tag === 'presentEmployee') {
            result = yield db_config_1.default.query("Select VAttendance.EmployeeID as ID, VAttendance.EmployeeID,UnitName as Location,Convert(Date,DOJ)DOJ,Employee_Name,Department_Name,Designation,Format(InTime,'HH:mm')InTime from VAttendance Left join" +
                "( Select EmployeeID,Attendance_Date as Dated,Min(In_Time)InTime,Max(Out_Time)OutTime from Attendance_Detail d left join Attendance_Master m " +
                " on  d.AttendanceID = m.AttendanceID Group by EmployeeID,Attendance_Date )InOut on VAttendance.EmployeeID=InOut.EmployeeID AND " +
                " VAttendance.Attendance_Date=InOut.Dated Where Employee_Category=:empCategory AND VAttendance.Attendance_Date=:attendanceDate  " +
                UID, {
                replacements: Object.assign(Object.assign({}, replacementObject), { empCategory: empCategory, attendanceDate: attendanceDate }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        else if (tag === 'absentEmployee') {
            result = yield db_config_1.default.query("Select EmployeeID as ID,EmployeeID,UnitName as Location,Convert(Date,DOJ)DOJ,Employee_Name,Department_Name,Designation,Mobile_No from VEmployee Where Active=1 AND Employee_Category=:empCategory " +
                " AND EmployeeID NOT IN (Select EmployeeID from Attendance_Master Where Attendance_Date=:attendanceDate )" +
                UID, {
                replacements: Object.assign(Object.assign({}, replacementObject), { empCategory: empCategory, attendanceDate: attendanceDate }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        else if (tag === 'lateCommers') {
            result = yield db_config_1.default.query("Select  VAttendance.EmployeeID as ID,VAttendance.EmployeeID,UnitName as Location,Convert(Date,DOJ)DOJ,Employee_Name,Department_Name,Designation,Format(InTime,'HH:mm')InTime from VAttendance Left join" +
                "( Select EmployeeID,Attendance_Date as Dated,Min(In_Time)InTime,Max(Out_Time)OutTime from Attendance_Detail d left join Attendance_Master m " +
                " on  d.AttendanceID = m.AttendanceID Group by EmployeeID,Attendance_Date )InOut on VAttendance.EmployeeID=InOut.EmployeeID AND " +
                " VAttendance.Attendance_Date=InOut.Dated Where Employee_Category=:empCategory "
                + " AND ISNULL(Late_Min,0)>0 AND Attendance_Date=:attendanceDate " + UID, {
                replacements: Object.assign(Object.assign({}, replacementObject), { empCategory: empCategory, attendanceDate: attendanceDate }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        else if (tag === 'activeAdvances') {
            result = yield db_config_1.default.query("Select EmployeeID as ID,EmployeeID,UnitName as Location,Convert(Date,DOJ)DOJ,Employee_Name,Department_Name,Designation,Mobile_No,Total_Bal as Advance from VTotal_Balance Where ISNULL(Active,0)=1 AND Employee_Category=:empCategory " + UID, {
                replacements: Object.assign(Object.assign({}, replacementObject), { empCategory: empCategory }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        else if (tag === 'inActiveAdvances') {
            result = yield db_config_1.default.query("select EmployeeID as ID,EmployeeID,UnitName as Location,Convert(Date,DOJ)DOJ,Employee_Name,Department_Name,Designation,Mobile_No,Total_Bal as Advance from VTotal_Balance Where ISNULL(Active,0)=0 AND Employee_Category=:empCategory " + UID, {
                replacements: Object.assign(Object.assign({}, replacementObject), { empCategory: empCategory }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        else if (tag === 'last30dayJoinings') {
            result = yield db_config_1.default.query("Select EmployeeID as ID,EmployeeID,UnitName as Location,Convert(Date,DOJ)DOJ,Employee_Name,Department_Name,Designation,Mobile_No from VEmployee Where Employee_Category=:empCategory AND DOJ>=:fromDate AND DOJ<=:toDate " + UID, {
                replacements: Object.assign(Object.assign({}, replacementObject), { empCategory: empCategory, fromDate: fromDate, toDate: attendanceDate }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        else if (tag === 'last30dayTerminations') {
            result = yield db_config_1.default.query(" With cte as (Select Employeeid,Max(Dated)Dated from Employee_Termination Where EmpStatus ='Termination' " + UID + " AND EmployeeID IN (Select EmployeeID from Employee Where Employee_Category=:empCategory AND ISNULL(Active,0)=0) group by EmployeeID) Select cte.EmployeeID as ID,cte.EmployeeID,UnitName as Location,Convert(Date,DOJ)DOJ,Employee_Name,Department_Name,Designation,Mobile_No from Cte left join VEmployee e on cte.EmployeeID=e.EmployeeID Where Dated>=:fromDate AND Dated<=:toDate", {
                replacements: Object.assign(Object.assign({}, replacementObject), { empCategory: empCategory, fromDate: fromDate, toDate: attendanceDate }),
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        return result;
    });
}
exports.dbHRDetail = dbHRDetail;
