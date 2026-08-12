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
    const {dfd_addcase_v1Props,setdfd_addcase_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_amrqueuedashboard_v1Props,setdfd_amrqueuedashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_doctypenamecombo_v1Props,setdfd_doctypenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_amrchecklistcombo_v1Props,setdfd_amrchecklistcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_doctable_v1Props,setdfd_doctable_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_amrcheckliststatus_v1Props,setdfd_amrcheckliststatus_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_venuespecialrules_v1Props,setdfd_venuespecialrules_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_specialrulessurerealdb_v1Props,setdfd_specialrulessurerealdb_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_reportcase_v1Props,setdfd_reportcase_v1Props} = useContext(TotalContext) as TotalContextProps;
    const toast=useInfoMsg();
    const { token } = useGlobal();

    return (nodename:any,page:any=1,count:any=10,dpdEncryption:any) => {
            if("amr_queue0e5a7"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:cardsDashboard:AFVK:v1",setdfd_cardsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("pending_filea7d91"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:cardsDashboard:AFVK:v1",setdfd_cardsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("service_pending0898e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:cardsDashboard:AFVK:v1",setdfd_cardsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("slas_at_riska3022"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:cardsDashboard:AFVK:v1",setdfd_cardsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("court_rejectionff779"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:cardsDashboard:AFVK:v1",setdfd_cardsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("collected_mtd65ae0"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:cardsDashboard:AFVK:v1",setdfd_cardsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("account_id9a546"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("case_id734ed"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("debtor_nameb1ea9"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("creditor_namee48d1"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("full_name7a369"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("total_balance6a331"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("court_name5ae4f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("priority_name6740a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("status_name86d6c"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_date92fe2"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("venue_idb51d8"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
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
            if("account_idc92b6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("venue_id063aa"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("attachment_id394f7"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:DocTable:AFVK:v1",setdfd_doctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_namef31ac"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:DocTable:AFVK:v1",setdfd_doctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("debtor_name83b58"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("case_display_idb53b9"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ssn_masked24ce0"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dobea900"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("address4e81d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("creditor_name62479"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("charge_off_dated3231"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("last_payment_date500eb"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("sol_expiry_date69782"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("principald89b4"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("interest42832"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("fees9a14f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("total_balancee5904"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("state8a16f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("country40b75"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("court_name27e21"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("judge_name5abc6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("filing_fee7fab8"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("service_method80ec2"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("efiling_system9b6bc"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("checklist_item_ida8a87"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistStatus:AFVK:v1",setdfd_amrcheckliststatus_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("item_name8baf4"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistStatus:AFVK:v1",setdfd_amrcheckliststatus_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_completed2fafb"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistStatus:AFVK:v1",setdfd_amrcheckliststatus_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("rules_text55ce9"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:venueSpecialRules:AFVK:v1",setdfd_venuespecialrules_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("documentviewer64771"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:DocTable:AFVK:v1",setdfd_doctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("account_idcc45c"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("attachment_idcc3f4"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:DocTable:AFVK:v1",setdfd_doctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_name909a3"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:DocTable:AFVK:v1",setdfd_doctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("debtor_name2af58"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("case_display_idd1272"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ssn_maskedc4424"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dob29785"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("address70906"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("creditor_namea9b98"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("charge_off_date763d0"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("last_payment_date43bdb"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("sol_expiry_date4dfe3"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("principal65ef3"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("interest783c4"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("feesab1fe"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("total_balancee7e5f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("statea7e09"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("countrydb772"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("court_name7a5a6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("judge_name71e3e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("filing_fee144cd"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("service_method48ac6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("efiling_system964db"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("checklist_item_id5bd1d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistStatus:AFVK:v1",setdfd_amrcheckliststatus_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("item_name24046"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistStatus:AFVK:v1",setdfd_amrcheckliststatus_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_completed1fd36"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistStatus:AFVK:v1",setdfd_amrcheckliststatus_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("rule_textdb2d4"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:specialRulesSurerealDB:AFVK:v1",setdfd_specialrulessurerealdb_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("account_id8944a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("attachment_id08b6e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:DocTable:AFVK:v1",setdfd_doctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_nameedf63"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:DocTable:AFVK:v1",setdfd_doctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("debtor_namea603a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("case_display_id3ba0a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ssn_masked36fce"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dob19a93"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("address0e39e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("creditor_name04ffa"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("charge_off_datef5bba"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("last_payment_date37076"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("sol_expiry_date3775f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("principalae986"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("interestf94e4"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("feesd3a22"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("total_balance92fd1"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("state10d95"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("countryc8824"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("court_name70da0"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("judge_name833b7"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("filing_fee9d0c4"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("service_method926d2"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("efiling_system056da"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",setdfd_addcase_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("checklist_item_id27c72"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistStatus:AFVK:v1",setdfd_amrcheckliststatus_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("item_name14346"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistStatus:AFVK:v1",setdfd_amrcheckliststatus_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_completeda9a9a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistStatus:AFVK:v1",setdfd_amrcheckliststatus_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("rule_texta87d5"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:venueSpecialRules:AFVK:v1",setdfd_venuespecialrules_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("report_editor1140e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:reportCase:AFVK:v1",setdfd_reportcase_v1Props,page,count,dpdEncryption,toast,token);
            }
    };
}

 