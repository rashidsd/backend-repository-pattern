import db from "../../db.config";
import { QueryTypes } from "sequelize";
import { dashboardTile } from "../../Entities/entities";
import dayjs from "dayjs";

async function dbAccount(dated: string): Promise<any[]> {
  const Dated = dayjs(new Date(dated)).format("YYYY-MM-DD");
  var dashboard = new Set<dashboardTile>();

  let result: any;

  const records: any = await db.query(
    "Select StringPeriodShort,FromDate from FinancialYears where FromDate <=:dated and ToDate >=:dated",
    {
      replacements: { dated: Dated },
      type: QueryTypes.SELECT,
    }
  );

  const fyear = records[0].StringPeriodShort;
  const fromDate = dayjs(new Date(records[0].FromDate)).format("YYYY-MM-DD");

  result = await db.query(
    "With cte As (select AccNo, ISNULL(SUM(Debit), 0)-ISNULL(SUM(credit), 0)Bal from VVouchers With(NOLOCK) where VDate between :fromDate AND :toDate AND  Fyear= :Fyear AND AccNo In(select AutoAccNo  from Account_AutoEntry Where VchrTypeAbbreviation = 'CPV') Group by AccNo UNION ALL select AccountNo,ISNULL(SUM(OpDebit), 0) - ISNULL(SUM(Opcredit), 0)Bal from Account_OpeningBalance With(NOLOCK)  where Fyear= :Fyear AND AccountNo In(select AutoAccNo  from Account_AutoEntry  Where VchrTypeAbbreviation = 'CPV') Group by AccountNo ) Select Convert(float,Round(SUM(Bal),0))Bal from cte",
    {
      replacements: { Fyear: fyear, fromDate: fromDate, toDate: Dated },
      type: QueryTypes.SELECT,
    }
  );
  const CashInHand = result[0].Bal;

  var cashInHand: dashboardTile = {
    heading: "Cash In Hand",
    value: CashInHand,
    valueInPerc: -1,
    detailLink: '',
    color:'#004d40'
  };
  dashboard.add(cashInHand);

  //No of Vouches today
  result = await db.query(
    "Select Convert(float,ISNULL(Count(*),0))postedToday from VoucherMaster Where Convert(Date,EntryDt)= :dated",
    {
      replacements: { dated: Dated },
      type: QueryTypes.SELECT,
    }
  );
  const NoOfVouchesToday = result[0].postedToday;

  var noOfVouchersToday: dashboardTile = {
    heading: "Today's posted vouchers",
    value: NoOfVouchesToday,
    valueInPerc: -1,
    detailLink: `accountDashboardDetail/Today Posted Vouchers/todayPostedVouchers/${dated}`,
color:'#827717'
  };
  dashboard.add(noOfVouchersToday);

  //verify today
  result = await db.query(
    "Select Convert(float,ISNULL(Count(*),0))verifiedToday from VoucherMaster Where ISNULL(Checked,0)=1 AND Convert(Date,CheckByDateTime)= :dated",
    {
      replacements: { dated: Dated },
      type: QueryTypes.SELECT,
    }
  );
  const VarifiedToday = result[0].verifiedToday;

  var verifyToday: dashboardTile = {
    heading: "Verified Today",
    value: VarifiedToday,
    valueInPerc: -1,
    detailLink: `accountDashboardDetail/Verified Today/verifiedToday/${dated}`,
    color:'#e65100'
  };
  dashboard.add(verifyToday);

  //Total unverified
  result = await db.query(
    "Select Convert(float,ISNULL(Count(*),0))totalUnVerified from VoucherMaster Where ISNULL(checked,0)=0",
    {
      replacements: { dated: Dated },
      type: QueryTypes.SELECT,
    }
  );
  const TotalUnverified = result[0].totalUnVerified;

  var toaalUnverify: dashboardTile = {
    heading: "Total Unverified",
    value: TotalUnverified,
    valueInPerc: -1,
    detailLink: `accountDashboardDetail/Total Unverified/totalUnverified/${dated}`,
    color:'#bf360c'
  };
  dashboard.add(toaalUnverify);

  //total presented cheques today
  result = await db.query(
    "select ISNULL(Count(*),0)todayPresentChqs from VoucherMaster where VoucherType ='BPV' and VDate= :dated",
    {
      replacements: { dated: Dated },
      type: QueryTypes.SELECT,
    }
  );
  const PresentedChequesToday = result[0].todayPresentChqs;

  var chequesPresentedToday: dashboardTile = {
    heading: "Cheques presented today",
    value: PresentedChequesToday,
    valueInPerc: -1,
    detailLink: `accountDashboardDetail/Cheques Presented Today/chequesPresentedToday/${dated}`,
    color:'#607d8b'
  };
  dashboard.add(chequesPresentedToday);

  //Post Dated Cheques
  result = await db.query(
    "Select Convert(float,ISNULL(Count(*),0))postedChqs from VoucherMaster Where VoucherType='BPV' AND Convert(Date,VDate)> :dated",
    {
      replacements: { dated: Dated },
      type: QueryTypes.SELECT,
    }
  );

  const PostedDatedCheques = result[0].postedChqs;

  var postDatedCheques: dashboardTile = {
    heading: "Post-dated Cheques",
    value: PostedDatedCheques,
    valueInPerc: -1,
    detailLink: `accountDashboardDetail/Post-dated Cheques/postDatedCheques/${dated}`,
    color:'#5d4037'
  };
  dashboard.add(postDatedCheques);

   //unposted Bills
   result = await db.query(
    "Select Convert(float,Count(ClearanceNo))unpostedBills from Stock_PO_Clearance_Master Where ISNULL(IsPosted,0)=0 ",
    {
      replacements: { dated: Dated },
      type: QueryTypes.SELECT,
    }
  );
  const UnPostedBills = result[0].unpostedBills;

  var unPostedBills: dashboardTile = {
    heading: "Post-dated Cheques",
    value: UnPostedBills,
    valueInPerc: -1,
    detailLink: `accountDashboardDetail/Un Posted Bills/unPostedBills/${dated}`,
    color:'#ffd600'
  };
  dashboard.add(unPostedBills);




  return [...dashboard];
}

async function dbAccountDetail(tag: string, dated: string): Promise<any[]> {
  dated = dayjs(new Date(dated)).format("YYYY-MM-DD");
    var result: any[] = [];
  
    if (tag === "todayPostedVouchers") {
    result = await db.query("select DetailIndex as ID,VchrNo,VDate,AccNo,AccTitle,Debit,Credit,Checked as Verified from VVouchersNew where Convert(Date,EntryDt)=:dated Order by VDate ,VchrNo", {
      replacements:{dated:dated},
      type: QueryTypes.SELECT,
    });
  }if (tag === "verifiedToday") {
    result = await db.query("Select DetailIndex as ID,VchrNo,VDate,AccNo,AccTitle,Debit,Credit,Checked as Verified from VVouchersNew Where ISNULL(Checked,0)=1 AND Convert(Date,CheckByDateTime)= :dated", {
      replacements:{dated:dated},
      type: QueryTypes.SELECT,
    });
  }if (tag === "totalUnverified") {
    result = await db.query("Select DetailIndex as ID,VchrNo,VDate,AccNo,AccTitle,Debit,Credit,Checked as Verified from VVouchersNew Where ISNULL(checked,0)=0", {
      replacements:{dated:dated},
      type: QueryTypes.SELECT,
    });
  }if (tag === "chequesPresentedToday") {
    result = await db.query("Select DetailIndex as ID,VchrNo,VDate,AccNo,AccTitle,Debit,Credit,ChqNo from VVouchersNew where VoucherType ='BPV' and VDate= :dated AND ISNULL(Debit,0)>0", {
      replacements:{dated:dated},
      type: QueryTypes.SELECT,
    });
  }if (tag === "postDatedCheques") {
    result = await db.query("Select DetailIndex as ID,VchrNo,VDate,AccNo,AccTitle,Debit,Credit,ChqNo from VVouchersNew Where VoucherType='BPV' AND Convert(Date,VDate)> :dated AND DetailIndex IS NOT NULL AND ISNULL(Debit,0)>0", {
      replacements:{dated:dated},
      type: QueryTypes.SELECT,
    });
  }if (tag === "unPostedBills") {
    result = await db.query("Select m.ClearanceNo as ID,m.ClearanceNo,Dated,m.VendorCode,v.VendorName as Vendor,PONo,BillNo ,BillDate,d.Amount from Stock_PO_Clearance_Master m Left join (Select ClearanceNo,Round(ISNULL(SUM(Total),0),0)Amount from Stock_PO_Clearance_Detail Group by ClearanceNo  )d on m.ClearanceNo = d.ClearanceNo Left join Stock_Vendors v on m.VendorCode = v.VendorCode Where ISNULL(IsPosted,0)=0", {
      replacements:{dated:dated},
      type: QueryTypes.SELECT,
    });
  }
  
  
  return result;
}


export { dbAccount,dbAccountDetail };
