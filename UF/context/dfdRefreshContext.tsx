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


    const {dfd_transaction_v1Props,setdfd_transaction_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_journey_v1Props,setdfd_journey_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_combocurrencysearch_v1Props,setdfd_combocurrencysearch_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsdashboardsalarytypecombo_v1Props,setdfd_wpsdashboardsalarytypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsdashboardmonthcombo_v1Props,setdfd_wpsdashboardmonthcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsdashboardyearcombo_v1Props,setdfd_wpsdashboardyearcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsdashboardmolnumbercombo_v1Props,setdfd_wpsdashboardmolnumbercombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsdashboardcompanystructurecombo_v1Props,setdfd_wpsdashboardcompanystructurecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsdashboardsuccesstab_v1Props,setdfd_wpsdashboardsuccesstab_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsdashboardsuccesstabnonwps_v1Props,setdfd_wpsdashboardsuccesstabnonwps_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsdashboardfailuretab_v1Props,setdfd_wpsdashboardfailuretab_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsdashboardfailurenonwpstab_v1Props,setdfd_wpsdashboardfailurenonwpstab_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsdashboardmyqueueall_v1Props,setdfd_wpsdashboardmyqueueall_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsdashboardmyqueueactionrequired_v1Props,setdfd_wpsdashboardmyqueueactionrequired_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsdashboardmyqueuesalaryreturnrefund_v1Props,setdfd_wpsdashboardmyqueuesalaryreturnrefund_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsdashboardmyqueueexceptions_v1Props,setdfd_wpsdashboardmyqueueexceptions_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsdashboardemployeesbarchart_v1Props,setdfd_wpsdashboardemployeesbarchart_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsdashboardsalaryprocessbarchart_v1Props,setdfd_wpsdashboardsalaryprocessbarchart_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsnackfailurefilelist_v1Props,setdfd_wpsnackfailurefilelist_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsfilejourney_v1Props,setdfd_wpsfilejourney_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_postingexceptionprocesslist_v1Props,setdfd_postingexceptionprocesslist_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_postingexpectionfilelist_v1Props,setdfd_postingexpectionfilelist_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsnackfailuretransactionlist_v1Props,setdfd_wpsnackfailuretransactionlist_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_sfjourneylistwithcount_v1Props,setdfd_sfjourneylistwithcount_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_tranjourney_v1Props,setdfd_tranjourney_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_sfjourneyviewtransaction_v1Props,setdfd_sfjourneyviewtransaction_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_wpsnackfailuretransactionlist_postingexceptionviewtransaction_v1Props,setdfd_wpsnackfailuretransactionlist_postingexceptionviewtransaction_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_returnfromagentfilelist_v1Props,setdfd_returnfromagentfilelist_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_requestforrefundfilelist_v1Props,setdfd_requestforrefundfilelist_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_returnagentfromtransactionlist_v1Props,setdfd_returnagentfromtransactionlist_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_returnreason_v1Props,setdfd_returnreason_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_requestreason_v1Props,setdfd_requestreason_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_enquiryviewallemployers_v1Props,setdfd_enquiryviewallemployers_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_enquirygetregemployeremployerlist_v1Props,setdfd_enquirygetregemployeremployerlist_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_enquiryemployersalaryrpt_v1Props,setdfd_enquiryemployersalaryrpt_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_enquirygetemployee_v1Props,setdfd_enquirygetemployee_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_updateregemployer_v1Props,setdfd_updateregemployer_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_regemployer_v1Props,setdfd_regemployer_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_dashboardviewallfailure_v1Props,setdfd_dashboardviewallfailure_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_dashboardviewallsuccess_v1Props,setdfd_dashboardviewallsuccess_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_sifsummaryreport_v1Props,setdfd_sifsummaryreport_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_pifsummaryreport_v1Props,setdfd_pifsummaryreport_v1Props} = useContext(TotalContext) as TotalContextProps;
    const toast=useInfoMsg();
    const { token } = useGlobal();

    return (nodename:any,page:any=1,count:any=10,dpdEncryption:any) => {
            if("product_code_view_allb0df6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("channel_name_view_all33724"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_view_allc0a46"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_view_all54da6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_view_all88d6b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_view_alld4b39"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_Amount_view_all19d14"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("remittance_info_view_all82afd"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("view_all_journeyd3ae9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("product_code_failure_queue12297"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("channel_name_failure_queue42953"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_failure_queue03c86"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_failure_queuef9d2d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_failure_queue95d4e"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_failure_queuea7246"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_Amount_failure_queue57c4d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("remittance_info_failure_queue09d7a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("failure_queue_journeyc8638"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("product_code_success_queue7c209"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("channel_name_success_queueeddaf"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_success_queuec805b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_operational_pending10a49"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_success_queueda254"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_success_queue60480"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_Amount_success_queueb80d4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("remittance_info_success_queue2f950"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("success_queue_journey68ac9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("product_code_return_queuee5e11"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("channel_name_return_queuebdabb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_return_queue958c9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_return_queuee94b2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_return_queue2f324"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_return_queue21a57"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_Amount_return_queue13fec"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("remittance_info_return_queuef37f7"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("return_queue_journeycc9d3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("product_code_operational_pending6ecd4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("channel_name_operational_pending2ab87"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_operational_pendinga8ff6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_operational_pending5146b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_operational_pending70e3f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_operational_pendingf9a9c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_Amount_operational_pendingbce21"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("remittance_info_operational_pending282bc"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("operational_pending_journey1a1a5"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("product_code_technical_pending11fe0"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("channel_name_technical_pendinge182f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_technical_pendingbc6bb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_technical_pendingbc856"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_technical_pending5e6cc"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_technical_pending3c4aa"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_Amount_technical_pending1bc34"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("remittance_info_technical_pending78349"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("technical_pending_journey6601c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_date2cea8"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("debtor_account_no963e4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("debtor_namee2d9f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("creditor_account_noca692"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("payment_currency703d2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:comboCurrencySearch:AFVK:v1",setdfd_combocurrencysearch_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("payment_amount042b1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid29c9f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("transaction_date_time14856"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("status88bc7"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("processed_byd2b69"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("debit_account36b40"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("currency9c8a2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("credit_account0d1f4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("amount01416"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("transaction_reference500d6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("xmlviewer9fe8d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("req_jsonviewer8d071"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("res_jsonviewerdd261"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("salary_type_comboboxfe6ab"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSalaryTypeCombo:AFVK:v1",setdfd_wpsdashboardsalarytypecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("month_combobox36b46"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMonthCombo:AFVK:v1",setdfd_wpsdashboardmonthcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("year_comboboxf59eb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardYearCombo:AFVK:v1",setdfd_wpsdashboardyearcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("mol_comboboxe2955"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMolNumberCombo:AFVK:v1",setdfd_wpsdashboardmolnumbercombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("parent_company_text27062"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardCompanyStructureCombo:AFVK:v1",setdfd_wpsdashboardcompanystructurecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("company_text49f48"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardCompanyStructureCombo:AFVK:v1",setdfd_wpsdashboardcompanystructurecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("branch_text2d7af"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardCompanyStructureCombo:AFVK:v1",setdfd_wpsdashboardcompanystructurecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("wps_value_text0da25"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSuccessTab:AFVK:v1",setdfd_wpsdashboardsuccesstab_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("non_wps_value_text11cd8"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSuccessTabNonWps:AFVK:v1",setdfd_wpsdashboardsuccesstabnonwps_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("wps_failure_value_text26223"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardFailureTab:AFVK:v1",setdfd_wpsdashboardfailuretab_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("non_wps_failure_value_textb39fe"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardFailureNonWpsTab:AFVK:v1",setdfd_wpsdashboardfailurenonwpstab_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("process58458"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueAll:AFVK:v1",setdfd_wpsdashboardmyqueueall_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("file_count6d7a3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueAll:AFVK:v1",setdfd_wpsdashboardmyqueueall_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("record_count989b2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueAll:AFVK:v1",setdfd_wpsdashboardmyqueueall_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("process5248d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueActionRequired:AFVK:v1",setdfd_wpsdashboardmyqueueactionrequired_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("file_count12835"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueActionRequired:AFVK:v1",setdfd_wpsdashboardmyqueueactionrequired_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("record_count93af3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueActionRequired:AFVK:v1",setdfd_wpsdashboardmyqueueactionrequired_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("process3627b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueSalaryReturnRefund:AFVK:v1",setdfd_wpsdashboardmyqueuesalaryreturnrefund_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("file_counte79a4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueSalaryReturnRefund:AFVK:v1",setdfd_wpsdashboardmyqueuesalaryreturnrefund_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("record_count06b83"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueSalaryReturnRefund:AFVK:v1",setdfd_wpsdashboardmyqueuesalaryreturnrefund_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("process08e53"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueExceptions:AFVK:v1",setdfd_wpsdashboardmyqueueexceptions_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("file_count6f5f9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueExceptions:AFVK:v1",setdfd_wpsdashboardmyqueueexceptions_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("record_count7fa24"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueExceptions:AFVK:v1",setdfd_wpsdashboardmyqueueexceptions_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("total_emp_barchartc0370"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardEmployeesBarchart:AFVK:v1",setdfd_wpsdashboardemployeesbarchart_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("salary_barcharteedc3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSalaryProcessBarchart:AFVK:v1",setdfd_wpsdashboardsalaryprocessbarchart_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_source_name72b56"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureFileList:AFVK:v1",setdfd_wpsnackfailurefilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_source_uuid1755c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureFileList:AFVK:v1",setdfd_wpsnackfailurefilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_file_typeea095"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureFileList:AFVK:v1",setdfd_wpsnackfailurefilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sal_file5dee0"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsFileJourney:AFVK:v1",setdfd_wpsfilejourney_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_processing_monthb1bbd"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsFileJourney:AFVK:v1",setdfd_wpsfilejourney_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_tot_sal8529c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsFileJourney:AFVK:v1",setdfd_wpsfilejourney_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_processe61a0"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:postingExceptionProcessList:AFVK:v1",setdfd_postingexceptionprocesslist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_po_file_namee2783"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:postingExpectionFileList:AFVK:v1",setdfd_postingexpectionfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_po_tran_count2921e"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:postingExpectionFileList:AFVK:v1",setdfd_postingexpectionfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_po_empr_molc2f22"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:postingExpectionFileList:AFVK:v1",setdfd_postingexpectionfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_po_fix_sal2aefb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:postingExpectionFileList:AFVK:v1",setdfd_postingexpectionfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_var_amnt70cb5"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:postingExpectionFileList:AFVK:v1",setdfd_postingexpectionfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_po_tot_amnt9842a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:postingExpectionFileList:AFVK:v1",setdfd_postingexpectionfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_po_charges3c1af"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:postingExpectionFileList:AFVK:v1",setdfd_postingexpectionfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_process_type35ae5"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:postingExpectionFileList:AFVK:v1",setdfd_postingexpectionfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_file_name06356"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureTransactionList:AFVK:v1",setdfd_wpsnackfailuretransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_tran_iddff78"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureTransactionList:AFVK:v1",setdfd_wpsnackfailuretransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sal_file_namee8195"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureTransactionList:AFVK:v1",setdfd_wpsnackfailuretransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_file_type43a43"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureTransactionList:AFVK:v1",setdfd_wpsnackfailuretransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_created_date8dd2c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureTransactionList:AFVK:v1",setdfd_wpsnackfailuretransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sal_filee0c17"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sfJourneyListWithCount:AFVK:v1",setdfd_sfjourneylistwithcount_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_src_namee72b4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sfJourneyListWithCount:AFVK:v1",setdfd_sfjourneylistwithcount_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_prcs_namee094a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sfJourneyListWithCount:AFVK:v1",setdfd_sfjourneylistwithcount_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_step900de"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sfJourneyListWithCount:AFVK:v1",setdfd_sfjourneylistwithcount_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trn_jrny23739"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:tranJourney:AFVK:v1",setdfd_tranjourney_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sal_file1c7b1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sfJourneyViewTransaction:AFVK:v1",setdfd_sfjourneyviewtransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_source_name34913"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sfJourneyViewTransaction:AFVK:v1",setdfd_sfjourneyviewtransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_process3a817"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sfJourneyViewTransaction:AFVK:v1",setdfd_sfjourneyviewtransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_created_date35d64"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sfJourneyViewTransaction:AFVK:v1",setdfd_sfjourneyviewtransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_stepee23d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sfJourneyViewTransaction:AFVK:v1",setdfd_sfjourneyviewtransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_tran_uuidce7f9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sfJourneyViewTransaction:AFVK:v1",setdfd_sfjourneyviewtransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_status4cffe"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sfJourneyViewTransaction:AFVK:v1",setdfd_sfjourneyviewtransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("file_nameebc26"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:tranJourney:AFVK:v1",setdfd_tranjourney_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("empl_mold6666"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:tranJourney:AFVK:v1",setdfd_tranjourney_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("fixed_amot7ca4c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:tranJourney:AFVK:v1",setdfd_tranjourney_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("var_amontdd609"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:tranJourney:AFVK:v1",setdfd_tranjourney_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("charge_amnt64cb4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:tranJourney:AFVK:v1",setdfd_tranjourney_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("agent_routng_codee5a1e"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:tranJourney:AFVK:v1",setdfd_tranjourney_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("process_system9b66e"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:tranJourney:AFVK:v1",setdfd_tranjourney_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("tran_catey46647"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:tranJourney:AFVK:v1",setdfd_tranjourney_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_vph_ref_iddff78"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureTransactionList_postingExceptionViewTransaction:AFVK:v1",setdfd_wpsnackfailuretransactionlist_postingexceptionviewtransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_cr_ac_no43a43"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureTransactionList_postingExceptionViewTransaction:AFVK:v1",setdfd_wpsnackfailuretransactionlist_postingexceptionviewtransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_var_amnt3cf81"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureTransactionList_postingExceptionViewTransaction:AFVK:v1",setdfd_wpsnackfailuretransactionlist_postingexceptionviewtransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_tot_amnt3dd6f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureTransactionList_postingExceptionViewTransaction:AFVK:v1",setdfd_wpsnackfailuretransactionlist_postingexceptionviewtransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_src_file_name0456e"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureTransactionList_postingExceptionViewTransaction:AFVK:v1",setdfd_wpsnackfailuretransactionlist_postingexceptionviewtransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_src_namee7c6a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnFromAgentFileList:AFVK:v1",setdfd_returnfromagentfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_tran_count3ad7d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnFromAgentFileList:AFVK:v1",setdfd_returnfromagentfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_fixed_amnt007c9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnFromAgentFileList:AFVK:v1",setdfd_returnfromagentfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_var_amntdff09"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnFromAgentFileList:AFVK:v1",setdfd_returnfromagentfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_tot_file_amnt9fdc3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnFromAgentFileList:AFVK:v1",setdfd_returnfromagentfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_created_datef8d57"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnFromAgentFileList:AFVK:v1",setdfd_returnfromagentfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sf_file_name809f4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnFromAgentFileList:AFVK:v1",setdfd_returnfromagentfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_rr_src_nameaf109"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:requestForRefundFileList:AFVK:v1",setdfd_requestforrefundfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_rr_tran_count17c14"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:requestForRefundFileList:AFVK:v1",setdfd_requestforrefundfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_rr_fixed_amnt55eca"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:requestForRefundFileList:AFVK:v1",setdfd_requestforrefundfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_rr_var_amnt9bab1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:requestForRefundFileList:AFVK:v1",setdfd_requestforrefundfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_rr_tot_file_amnt074c8"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:requestForRefundFileList:AFVK:v1",setdfd_requestforrefundfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_rr_created_date9c266"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:requestForRefundFileList:AFVK:v1",setdfd_requestforrefundfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_rr_sf_file_named6334"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:requestForRefundFileList:AFVK:v1",setdfd_requestforrefundfilelist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_emp_mole4029"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_emp_name32c92"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_cr_acc_no42627"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_fixed_amntd6d44"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_var_amnt53ea2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_tot_tran_amnta3392"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_created_dateea4ac"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sf_file_name36fc1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_rsn_codef367b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_uuida83f1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("return_reason_dropdown59fcb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnReason:AFVK:v1",setdfd_returnreason_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_emp_mol35ce2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_emp_name53515"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_cr_acc_no519d3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_fixed_amnt0743c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_var_amnt25d0d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_tot_tran_amnt1acc3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_created_date5679d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sf_file_namebaf46"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_rsn_codeaa610"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_uuid8350f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnAgentfromTransactionList:AFVK:v1",setdfd_returnagentfromtransactionlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("return_reason_dropdown233e0"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:requestReason:AFVK:v1",setdfd_requestreason_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_cor_mold12cb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryViewAllEmployers:AFVK:v1",setdfd_enquiryviewallemployers_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_cor_reg_idf2c18"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryViewAllEmployers:AFVK:v1",setdfd_enquiryviewallemployers_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_cor_eidcba45"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryViewAllEmployers:AFVK:v1",setdfd_enquiryviewallemployers_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_mh_sts9087c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryViewAllEmployers:AFVK:v1",setdfd_enquiryviewallemployers_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_cr_mol2640a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryViewAllEmployers:AFVK:v1",setdfd_enquiryviewallemployers_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_cr_namef6d51"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryViewAllEmployers:AFVK:v1",setdfd_enquiryviewallemployers_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_cr_status1147a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryViewAllEmployers:AFVK:v1",setdfd_enquiryviewallemployers_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_reg_num66de9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryViewAllEmployers:AFVK:v1",setdfd_enquiryviewallemployers_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_owner_emi_id78c37"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryViewAllEmployers:AFVK:v1",setdfd_enquiryviewallemployers_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_moh_stsaec9e"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryViewAllEmployers:AFVK:v1",setdfd_enquiryviewallemployers_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_mol_numrd6584"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryGetRegEmployerEmployerList:AFVK:v1",setdfd_enquirygetregemployeremployerlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_mohre_stse37dc"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryGetRegEmployerEmployerList:AFVK:v1",setdfd_enquirygetregemployeremployerlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_reg_num51c35"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryGetRegEmployerEmployerList:AFVK:v1",setdfd_enquirygetregemployeremployerlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_emirates_idce519"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryGetRegEmployerEmployerList:AFVK:v1",setdfd_enquirygetregemployeremployerlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_created_date1adb1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryGetRegEmployerEmployerList:AFVK:v1",setdfd_enquirygetregemployeremployerlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_emp_eidb6da5"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_emp_mol_list8126c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_er_reg_idec20e"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_emp_mol_numa36ef"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sal_mnth274bd"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_chnl_codefad7d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_ch_code6fd21"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_leavefc2c9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_inside_cntry8bcae"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_sal_typee5fad"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_pass_numbf1c1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_angnt_cdee285a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lblwrk_ibane57ee"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_rmksb105f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_year77e9a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_from_date5c572"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_to_date68efb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_days_paidfaad7"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_fix_in1338c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_in_varb6ce9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_to_sal3b4e8"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_to_bene728c0"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_to_deductionbd7f3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_to_allo2f67a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lbl_toince2e251"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",setdfd_enquiryemployersalaryrpt_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_card_numberbec8c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryGetEmployee:AFVK:v1",setdfd_enquirygetemployee_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_uni_numd76ee"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryGetEmployee:AFVK:v1",setdfd_enquirygetemployee_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_emr_idd3a1f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryGetEmployee:AFVK:v1",setdfd_enquirygetemployee_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sts_dated58fa4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryGetEmployee:AFVK:v1",setdfd_enquirygetemployee_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_is_actived0527"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryGetEmployee:AFVK:v1",setdfd_enquirygetemployee_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_pass_nume4031"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryGetEmployee:AFVK:v1",setdfd_enquirygetemployee_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_tot_sale3e91"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryGetEmployee:AFVK:v1",setdfd_enquirygetemployee_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_emp_namefa4c3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryGetEmployee:AFVK:v1",setdfd_enquirygetemployee_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_emp_name_ar02a3b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryGetEmployee:AFVK:v1",setdfd_enquirygetemployee_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_prsn_code83655"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryGetEmployee:AFVK:v1",setdfd_enquirygetemployee_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cor_mol062f8"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:updateRegEmployer:AFVK:v1",setdfd_updateregemployer_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cor_name7e300"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:updateRegEmployer:AFVK:v1",setdfd_updateregemployer_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("owner_eid61dd1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:updateRegEmployer:AFVK:v1",setdfd_updateregemployer_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cor_moh_sts343b0"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:updateRegEmployer:AFVK:v1",setdfd_updateregemployer_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cor_stsea777"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:updateRegEmployer:AFVK:v1",setdfd_updateregemployer_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cor_molffa7c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:RegEmployer:AFVK:v1",setdfd_regemployer_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cor_name7a1f6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:RegEmployer:AFVK:v1",setdfd_regemployer_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cor_reg_idb804b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:RegEmployer:AFVK:v1",setdfd_regemployer_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cor_eid349aa"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:RegEmployer:AFVK:v1",setdfd_regemployer_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("moh_statusda3d9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:RegEmployer:AFVK:v1",setdfd_regemployer_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("toggle_dropdownfb4d3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnReason:AFVK:v1",setdfd_returnreason_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_com_code8c08a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllFailure:AFVK:v1",setdfd_dashboardviewallfailure_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_emir_id08252"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllFailure:AFVK:v1",setdfd_dashboardviewallfailure_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_reg_no9e196"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllFailure:AFVK:v1",setdfd_dashboardviewallfailure_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_prcs_nameb7721"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllFailure:AFVK:v1",setdfd_dashboardviewallfailure_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sts9c434"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllFailure:AFVK:v1",setdfd_dashboardviewallfailure_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sif_name7de17"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllFailure:AFVK:v1",setdfd_dashboardviewallfailure_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sal_monthaa65c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllFailure:AFVK:v1",setdfd_dashboardviewallfailure_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_created_dated290b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllFailure:AFVK:v1",setdfd_dashboardviewallfailure_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_com_code3b35a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllSuccess:AFVK:v1",setdfd_dashboardviewallsuccess_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_emi_id8bf26"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllSuccess:AFVK:v1",setdfd_dashboardviewallsuccess_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_reg_noe3d8f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllSuccess:AFVK:v1",setdfd_dashboardviewallsuccess_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_prcs_named06a3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllSuccess:AFVK:v1",setdfd_dashboardviewallsuccess_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sts2b329"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllSuccess:AFVK:v1",setdfd_dashboardviewallsuccess_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_created_date2f60b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllSuccess:AFVK:v1",setdfd_dashboardviewallsuccess_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_org_file_namee9218"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1",setdfd_sifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sf_file_name2de87"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1",setdfd_sifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_empr_id3b1f4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1",setdfd_sifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_corp_nameecc38"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1",setdfd_sifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_dr_acca3ca2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1",setdfd_sifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_tot_rcd0a298"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1",setdfd_sifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sf_file_amnt7be09"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1",setdfd_sifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sal_mnthc23c3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1",setdfd_sifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sal_year592c0"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1",setdfd_sifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("file_namefb5d0"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1",setdfd_sifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("sf_file_name06efb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1",setdfd_sifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("estab_idbde42"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1",setdfd_sifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("corp_name2b998"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1",setdfd_sifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_pif_file_namee99d8"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:pifSummaryReport:AFVK:v1",setdfd_pifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_emplr_ida847f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:pifSummaryReport:AFVK:v1",setdfd_pifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_corp_name9e9f0"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:pifSummaryReport:AFVK:v1",setdfd_pifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_dr_acc2afa8"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:pifSummaryReport:AFVK:v1",setdfd_pifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_tot_rcd8b718"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:pifSummaryReport:AFVK:v1",setdfd_pifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_pf_file_amnt5e967"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:pifSummaryReport:AFVK:v1",setdfd_pifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sal_mnthba9cc"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:pifSummaryReport:AFVK:v1",setdfd_pifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("col_sal_yeara098c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:pifSummaryReport:AFVK:v1",setdfd_pifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("corp_name3791a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:pifSummaryReport:AFVK:v1",setdfd_pifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("pf_file_name2c4bc"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:pifSummaryReport:AFVK:v1",setdfd_pifsummaryreport_v1Props,page,count,dpdEncryption,toast,token);
            }
    };
}

 