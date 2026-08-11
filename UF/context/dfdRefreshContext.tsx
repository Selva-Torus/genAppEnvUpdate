// old logic
// "use client"
// import { TotalContext, TotalContextProps } from "../globalContext";
// import { useContext } from "react";

// // Pure function that does the logic
// export function handledfdrefresh(nodename:any, setRefetch:any){
//     let data:any = {
//   name973ca: 'userdfd_v1',
//   agee3b87: 'userdfd_v1',
//   user_ida2a2a: 'usedetailsdfd_v1',
//   phonebc3ea: 'usedetailsdfd_v1',
//   id76e97: 'usedetailsdfd_v1',
//   checkpc644a: 'usedetailsdfd_v1',
//   progress3b6ff: 'userdfd_v1'
// }


//     if(nodename in data)
//     {
//         setRefetch((pre:any)=>({...pre,[data[nodename]]:!pre[data[nodename]]}))
//     }

//     return
// }

// // Hook that uses context - call this from your components
// export function useHandleDfdRefresh(){
//     const {setRefetch} = useContext(TotalContext) as TotalContextProps;

//     return (nodename:any) => {
//         handledfdrefresh(nodename, setRefetch);
//     };
// }
//----------------------------------


"use client"
import { TotalContext, TotalContextProps } from "@/app/globalContext";
import { useContext } from "react";
import { api_paginationDto, te_refreshDto } from "@/app/interfaces/interfaces";
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from "./GlobalContext";
let inProgressKeys:any[] = [];

export async function dfdRefreshContext(dfdkey:any,setState:any,page:any,count:any,dpdEncryption:any,toast:any,token:any){
  if (inProgressKeys.includes(dfdkey)) {
    return; 
  }
  inProgressKeys.push(dfdkey)
  
  try{
    let usedetailsdfd_v1Body:te_refreshDto={
          key: dfdkey+":",
          refreshFlag: "Y",
          count:parseInt(count) || 10,
          page:parseInt(page) || 1
    }
    if (dpdEncryption?.encryptionFlagPage) {          
      usedetailsdfd_v1Body["dpdKey"] = dpdEncryption?.encryptionDpd;
      usedetailsdfd_v1Body["method"] = dpdEncryption?.encryptionMethod;
    }
    // if(parentchildindivitualsave_v1Props.length > 0){
    //   let filterData :any[] =[];
    //   for(let i=0;i< parentchildindivitualsave_v1Props.length;i++){
    //     if(parentchildindivitualsave_v1Props[i].DFDkey == dfdkey){
    //       delete parentchildindivitualsave_v1Props[i].DFDkey;
    //       filterData.push(parentchildindivitualsave_v1Props[i])
    //     }           
    //   }
    //   usedetailsdfd_v1Body['filterData'] = filterData;
    // }
    const usedetailsdfd_v1Data:any=await AxiosService.post("/te/eventEmitter",usedetailsdfd_v1Body,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (usedetailsdfd_v1Data?.data?.dataset) {
      setState(usedetailsdfd_v1Data?.data?.dataset?.data || []);
    }else{
      //////////////
    let dstKey:any=usedetailsdfd_v1Body?.key || ""
    dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");

    const api_paginationBody: api_paginationDto = {
      key: dstKey,
      count:parseInt(count) || 10,
      page:parseInt(page) || 1
    }
    // if(encryptionFlagCont) {
    // api_paginationBody["dpdKey"] = encryptionDpd
    // api_paginationBody["method"] = encryptionMethod
    // }
    const api_paginationData:any = await AxiosService.post(
      '/UF/pagination',
      api_paginationBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (api_paginationData?.data?.error == true) {
      toast(api_paginationData?.data?.errorDetails?.message, 'danger')
      return
    }
    setState(api_paginationData?.data?.records || []);
    }
    return
  }catch(err){
    console.log(err)
  }
  finally{
     const index = inProgressKeys.indexOf(dfdkey);
      if (index > -1) {
        inProgressKeys.splice(index, 1);
      }
  }
}



export function useHandleDfdRefresh(){


    const {dfd_cardsdashboard_v1Props,setdfd_cardsdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_amrqueuedashboard_v1Props,setdfd_amrqueuedashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_pendingfilingsdashboard_v1Props,setdfd_pendingfilingsdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_addcase_v1Props,setdfd_addcase_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_doctypenamecombo_v1Props,setdfd_doctypenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_amrchecklistcombo_v1Props,setdfd_amrchecklistcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_doctable_v1Props,setdfd_doctable_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_amrcheckliststatus_v1Props,setdfd_amrcheckliststatus_v1Props} = useContext(TotalContext) as TotalContextProps;
    const toast=useInfoMsg();
    const { token } = useGlobal();

    return (nodename:any,page:any=1,count:any=10,dpdEncryption:any) => {
            if("amr_queue5b620"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:cardsDashboard:AFVK:v1",setdfd_cardsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("pending_file1721b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:cardsDashboard:AFVK:v1",setdfd_cardsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("service_pending918f0"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:cardsDashboard:AFVK:v1",setdfd_cardsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("slas_at_riskf177b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:cardsDashboard:AFVK:v1",setdfd_cardsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("court_rejection2460a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:cardsDashboard:AFVK:v1",setdfd_cardsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("collected_mtdab52b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:cardsDashboard:AFVK:v1",setdfd_cardsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("case_display_id8caab"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1",setdfd_amrqueuedashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("debtor_namedb464"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1",setdfd_amrqueuedashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("creditor_name29781"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1",setdfd_amrqueuedashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("full_nameda699"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1",setdfd_amrqueuedashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("total_balancea27e6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1",setdfd_amrqueuedashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("court_name03aea"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1",setdfd_amrqueuedashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("priority_namec8266"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1",setdfd_amrqueuedashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("status_named2368"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1",setdfd_amrqueuedashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_datec9e9d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1",setdfd_amrqueuedashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("case_display_id32ae4"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:pendingFilingsDashboard:AFVK:v1",setdfd_pendingfilingsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("debtor_namecd77b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:pendingFilingsDashboard:AFVK:v1",setdfd_pendingfilingsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("creditor_nameb14ce"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:pendingFilingsDashboard:AFVK:v1",setdfd_pendingfilingsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("full_name592f3"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:pendingFilingsDashboard:AFVK:v1",setdfd_pendingfilingsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("total_balance98c00"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:pendingFilingsDashboard:AFVK:v1",setdfd_pendingfilingsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("court_name4b97b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:pendingFilingsDashboard:AFVK:v1",setdfd_pendingfilingsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("priority_namec61c4"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:pendingFilingsDashboard:AFVK:v1",setdfd_pendingfilingsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("status_namec590e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:pendingFilingsDashboard:AFVK:v1",setdfd_pendingfilingsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_date4e909"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:pendingFilingsDashboard:AFVK:v1",setdfd_pendingfilingsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearch6059f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1",setdfd_amrqueuedashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("venue_id0c4bb"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("creditor_idf6f71"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("account_id7e64e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("creditor_namef8de4"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("attorney_name073fd"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("priority_namebcbd5"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("status_namecbe6f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("queue_position049be"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("quality_score2c29e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("sla_wait_start_time2fb95"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("debtor_namea5e3f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ssn_masked273fe"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dobdba19"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("addressa3e42"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("charge_off_datef15ef"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("last_payment_date23905"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("total_balanced15a0"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("principalc3ba6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("interest81968"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("fees0f99a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("state752e3"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("countryf4404"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("court_namef21b5"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("judge_name78f03"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("sol_expiry_date8639c"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("filing_fee389dd"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_type_idaf61f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:docTypeNameCombo:AFVK:v1",setdfd_doctypenamecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_type_name949dd"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:docTypeNameCombo:AFVK:v1",setdfd_doctypenamecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("checklist_item_id255b0"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistCombo:AFVK:v1",setdfd_amrchecklistcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("item_nameeed39"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistCombo:AFVK:v1",setdfd_amrchecklistcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("venue_idcb444"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("creditor_idb1867"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("account_id4ecc7"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("creditor_name257be"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("queue_positionceb8d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("quality_scoredfaa9"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("sla_wait_start_time20502"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("debtor_namef7cac"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ssn_masked26c46"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dob0f0bf"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("address22d72"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("charge_off_date13a39"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("last_payment_dateeab2f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("total_balanceca1e1"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("principal6eb2a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("interesta6b7d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("feesb456c"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("state3010e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("country1983b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("court_name41a77"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("judge_name0a819"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("sol_expiry_dated5486"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("filing_fee89c7f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("attachment_id54469"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:DocTable:AFVK:v1",setdfd_doctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_name513db"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:DocTable:AFVK:v1",setdfd_doctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_by736ad"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:DocTable:AFVK:v1",setdfd_doctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_datecfead"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:DocTable:AFVK:v1",setdfd_doctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("checklist_item_id611e6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistStatus:AFVK:v1",setdfd_amrcheckliststatus_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("item_nameafc9a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistStatus:AFVK:v1",setdfd_amrcheckliststatus_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_completed6ef7a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistStatus:AFVK:v1",setdfd_amrcheckliststatus_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("documentviewer64771"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:DocTable:AFVK:v1",setdfd_doctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearch1e502"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:pendingFilingsDashboard:AFVK:v1",setdfd_pendingfilingsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
    };
}

 