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
exports.dbAccountDetail = exports.dbAccount = void 0;
const db_config_1 = __importDefault(require("../../db.config"));
const sequelize_1 = require("sequelize");
const dayjs_1 = __importDefault(require("dayjs"));
function dbAccount(dated) {
    return __awaiter(this, void 0, void 0, function* () {
        const Dated = (0, dayjs_1.default)(new Date(dated)).format("YYYY-MM-DD");
        var dashboard = new Set();
        let result;
        const records = yield db_config_1.default.query("Select StringPeriodShort,FromDate from FinancialYears where FromDate <=:dated and ToDate >=:dated", {
            replacements: { dated: Dated },
            type: sequelize_1.QueryTypes.SELECT,
        });
        const fyear = records[0].StringPeriodShort;
        const fromDate = (0, dayjs_1.default)(new Date(records[0].FromDate)).format("YYYY-MM-DD");
        result = yield db_config_1.default.query("With cte As (select AccNo, ISNULL(SUM(Debit), 0)-ISNULL(SUM(credit), 0)Bal from VVouchers With(NOLOCK) where VDate between :fromDate AND :toDate AND  Fyear= :Fyear AND AccNo In(select AutoAccNo  from Account_AutoEntry Where VchrTypeAbbreviation = 'CPV') Group by AccNo UNION ALL select AccountNo,ISNULL(SUM(OpDebit), 0) - ISNULL(SUM(Opcredit), 0)Bal from Account_OpeningBalance With(NOLOCK)  where Fyear= :Fyear AND AccountNo In(select AutoAccNo  from Account_AutoEntry  Where VchrTypeAbbreviation = 'CPV') Group by AccountNo ) Select Convert(float,Round(SUM(Bal),0))Bal from cte", {
            replacements: { Fyear: fyear, fromDate: fromDate, toDate: Dated },
            type: sequelize_1.QueryTypes.SELECT,
        });
        const CashInHand = result[0].Bal;
        var cashInHand = {
            heading: "Cash In Hand",
            value: CashInHand,
            valueInPerc: -1,
            detailLink: '',
            color: '#004d40'
        };
        dashboard.add(cashInHand);
        //No of Vouches today
        result = yield db_config_1.default.query("Select Convert(float,ISNULL(Count(*),0))postedToday from VoucherMaster Where Convert(Date,EntryDt)= :dated", {
            replacements: { dated: Dated },
            type: sequelize_1.QueryTypes.SELECT,
        });
        const NoOfVouchesToday = result[0].postedToday;
        var noOfVouchersToday = {
            heading: "Today's posted vouchers",
            value: NoOfVouchesToday,
            valueInPerc: -1,
            detailLink: `accountDashboardDetail/Today Posted Vouchers/todayPostedVouchers/${dated}`,
            color: '#827717'
        };
        dashboard.add(noOfVouchersToday);
        //verify today
        result = yield db_config_1.default.query("Select Convert(float,ISNULL(Count(*),0))verifiedToday from VoucherMaster Where ISNULL(Checked,0)=1 AND Convert(Date,CheckByDateTime)= :dated", {
            replacements: { dated: Dated },
            type: sequelize_1.QueryTypes.SELECT,
        });
        const VarifiedToday = result[0].verifiedToday;
        var verifyToday = {
            heading: "Verified Today",
            value: VarifiedToday,
            valueInPerc: -1,
            detailLink: `accountDashboardDetail/Verified Today/verifiedToday/${dated}`,
            color: '#e65100'
        };
        dashboard.add(verifyToday);
        //Total unverified
        result = yield db_config_1.default.query("Select Convert(float,ISNULL(Count(*),0))totalUnVerified from VoucherMaster Where ISNULL(checked,0)=0", {
            replacements: { dated: Dated },
            type: sequelize_1.QueryTypes.SELECT,
        });
        const TotalUnverified = result[0].totalUnVerified;
        var toaalUnverify = {
            heading: "Total Unverified",
            value: TotalUnverified,
            valueInPerc: -1,
            detailLink: `accountDashboardDetail/Total Unverified/totalUnverified/${dated}`,
            color: '#bf360c'
        };
        dashboard.add(toaalUnverify);
        //total presented cheques today
        result = yield db_config_1.default.query("select ISNULL(Count(*),0)todayPresentChqs from VoucherMaster where VoucherType ='BPV' and VDate= :dated", {
            replacements: { dated: Dated },
            type: sequelize_1.QueryTypes.SELECT,
        });
        const PresentedChequesToday = result[0].todayPresentChqs;
        var chequesPresentedToday = {
            heading: "Cheques presented today",
            value: PresentedChequesToday,
            valueInPerc: -1,
            detailLink: `accountDashboardDetail/Cheques Presented Today/chequesPresentedToday/${dated}`,
            color: '#607d8b'
        };
        dashboard.add(chequesPresentedToday);
        //Post Dated Cheques
        result = yield db_config_1.default.query("Select Convert(float,ISNULL(Count(*),0))postedChqs from VoucherMaster Where VoucherType='BPV' AND Convert(Date,VDate)> :dated", {
            replacements: { dated: Dated },
            type: sequelize_1.QueryTypes.SELECT,
        });
        const PostedDatedCheques = result[0].postedChqs;
        var postDatedCheques = {
            heading: "Post-dated Cheques",
            value: PostedDatedCheques,
            valueInPerc: -1,
            detailLink: `accountDashboardDetail/Post-dated Cheques/postDatedCheques/${dated}`,
            color: '#5d4037'
        };
        dashboard.add(postDatedCheques);
        //unposted Bills
        result = yield db_config_1.default.query("Select Convert(float,Count(ClearanceNo))unpostedBills from Stock_PO_Clearance_Master Where ISNULL(IsPosted,0)=0 ", {
            replacements: { dated: Dated },
            type: sequelize_1.QueryTypes.SELECT,
        });
        const UnPostedBills = result[0].unpostedBills;
        var unPostedBills = {
            heading: "Post-dated Cheques",
            value: UnPostedBills,
            valueInPerc: -1,
            detailLink: `accountDashboardDetail/Un Posted Bills/unPostedBills/${dated}`,
            color: '#ffd600'
        };
        dashboard.add(unPostedBills);
        return [...dashboard];
    });
}
exports.dbAccount = dbAccount;
function dbAccountDetail(tag, dated) {
    return __awaiter(this, void 0, void 0, function* () {
        dated = (0, dayjs_1.default)(new Date(dated)).format("YYYY-MM-DD");
        var result = [];
        if (tag === "todayPostedVouchers") {
            result = yield db_config_1.default.query("select DetailIndex as ID,VchrNo,VDate,AccNo,AccTitle,Debit,Credit,Checked as Verified from VVouchersNew where Convert(Date,EntryDt)=:dated Order by VDate ,VchrNo", {
                replacements: { dated: dated },
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "verifiedToday") {
            result = yield db_config_1.default.query("Select DetailIndex as ID,VchrNo,VDate,AccNo,AccTitle,Debit,Credit,Checked as Verified from VVouchersNew Where ISNULL(Checked,0)=1 AND Convert(Date,CheckByDateTime)= :dated", {
                replacements: { dated: dated },
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "totalUnverified") {
            result = yield db_config_1.default.query("Select DetailIndex as ID,VchrNo,VDate,AccNo,AccTitle,Debit,Credit,Checked as Verified from VVouchersNew Where ISNULL(checked,0)=0", {
                replacements: { dated: dated },
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "chequesPresentedToday") {
            result = yield db_config_1.default.query("Select DetailIndex as ID,VchrNo,VDate,AccNo,AccTitle,Debit,Credit,ChqNo from VVouchersNew where VoucherType ='BPV' and VDate= :dated AND ISNULL(Debit,0)>0", {
                replacements: { dated: dated },
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "postDatedCheques") {
            result = yield db_config_1.default.query("Select DetailIndex as ID,VchrNo,VDate,AccNo,AccTitle,Debit,Credit,ChqNo from VVouchersNew Where VoucherType='BPV' AND Convert(Date,VDate)> :dated AND DetailIndex IS NOT NULL AND ISNULL(Debit,0)>0", {
                replacements: { dated: dated },
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        if (tag === "unPostedBills") {
            result = yield db_config_1.default.query("Select m.ClearanceNo as ID,m.ClearanceNo,Dated,m.VendorCode,v.VendorName as Vendor,PONo,BillNo ,BillDate,d.Amount from Stock_PO_Clearance_Master m Left join (Select ClearanceNo,Round(ISNULL(SUM(Total),0),0)Amount from Stock_PO_Clearance_Detail Group by ClearanceNo  )d on m.ClearanceNo = d.ClearanceNo Left join Stock_Vendors v on m.VendorCode = v.VendorCode Where ISNULL(IsPosted,0)=0", {
                replacements: { dated: dated },
                type: sequelize_1.QueryTypes.SELECT,
            });
        }
        return result;
    });
}
exports.dbAccountDetail = dbAccountDetail;
