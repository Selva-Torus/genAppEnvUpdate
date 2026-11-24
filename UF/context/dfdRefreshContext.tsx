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
    const {dfd_currencycombo_v1Props,setdfd_currencycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_channelcombosearch_v1Props,setdfd_channelcombosearch_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_processstatuscombosearch_v1Props,setdfd_processstatuscombosearch_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_manualinitiationuimappingquery_v1Props,setdfd_manualinitiationuimappingquery_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_purposecombo_v1Props,setdfd_purposecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_crbankcodecombo_v1Props,setdfd_crbankcodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_chargetypecombo_v1Props,setdfd_chargetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_paymentmethodcombo_v1Props,setdfd_paymentmethodcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_initiationinstructionprioritycombo_v1Props,setdfd_initiationinstructionprioritycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_categorypurposecombo_v1Props,setdfd_categorypurposecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_beneficiarylistquery_v1Props,setdfd_beneficiarylistquery_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_returnreason_v1Props,setdfd_returnreason_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_transactiondetailquery_v1Props,setdfd_transactiondetailquery_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_enquirypaymenttypecombo_v1Props,setdfd_enquirypaymenttypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_enquirymessagetypecombo_v1Props,setdfd_enquirymessagetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_nfviewalltransaction_v1Props,setdfd_nfviewalltransaction_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_nftransaction_v1Props,setdfd_nftransaction_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_nftranmaintransaction_v1Props,setdfd_nftranmaintransaction_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_nfcancelreasoncombo_v1Props,setdfd_nfcancelreasoncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_nfinvestigationtypecombo_v1Props,setdfd_nfinvestigationtypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_nfinvestigationreasoncombo_v1Props,setdfd_nfinvestigationreasoncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_messagetypesimulatorcombo_v1Props,setdfd_messagetypesimulatorcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_statussimulatorcombo_v1Props,setdfd_statussimulatorcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_rejectreasonsimulatorcombo_v1Props,setdfd_rejectreasonsimulatorcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_ipmessagetypestimulatorcombo_v1Props,setdfd_ipmessagetypestimulatorcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_nfreqtype_v1Props,setdfd_nfreqtype_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_nfreqreason_v1Props,setdfd_nfreqreason_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_nfresptype_v1Props,setdfd_nfresptype_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_nfrespreason_v1Props,setdfd_nfrespreason_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_channeldashboard_dashboard_v1Props,setdfd_channeldashboard_dashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_currencydashboard_dashboard_v1Props,setdfd_currencydashboard_dashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_processcategorydashboard_dashboard_v1Props,setdfd_processcategorydashboard_dashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_onlineofflinedashboard_dashboard_v1Props,setdfd_onlineofflinedashboard_dashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_transactioncountvphdashboard_dashboard_v1Props,setdfd_transactioncountvphdashboard_dashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_channelcountvphdashboard_dashboard_v1Props,setdfd_channelcountvphdashboard_dashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_onlineofflinecountvphdashboard_dashboard_v1Props,setdfd_onlineofflinecountvphdashboard_dashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_channelchartdashboard_dashboard_v1Props,setdfd_channelchartdashboard_dashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_transaction_dashboard_v1Props,setdfd_transaction_dashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const toast=useInfoMsg();
    const { token } = useGlobal();

    return (nodename:any,page:any=1,count:any=10,dpdEncryption:any) => {
            if("value_date_view_allb0df6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_view_all33724"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_view_allc0a46"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currency_view_all54da6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_view_alls88d6b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_view_alld4b39"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_view_all19d14"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_view_all82afd"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_view_all47e6b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_view_alldb6f0"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("view_all_journeyd3ae9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("value_date_failure_queue12297"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_failure_queue42953"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_failure_queue03c86"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currency_failure_queuef9d2d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_failure_queue95d4e"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_failure_queuea7246"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_failure_queue57c4d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_failure_queue09d7a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_failure_queue0aef8"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_failure_queuea9c80"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("failure_queue_journeyc8638"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("value_date_success_queue7c209"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_success_queueeddaf"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_success_queuec805b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currency_success_queue10a49"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_success_queueda254"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_success_queue60480"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_success_queueb80d4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_success_queue2f950"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_success_queue019a2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_success_queue87fbe"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("success_queue_journey68ac9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("return_queue_journeycc9d3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("value_date_return_queuee5e11"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_return_queuebdabb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_return_queue958c9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currency_return_queuee94b2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_return_queue2f324"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_return_queue21a57"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_return_queue13fec"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_return_queuef37f7"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_return_queue95903"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_return_queue2f467"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("value_date_operational_pending6ecd4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_operational_pending2ab87"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_operational_pendinga8ff6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currency_operational_pending5146b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_operational_pending70e3f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_operational_pendingf9a9c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_operational_pendingbce21"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_operational_pending282bc"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_operational_pending0df81"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_operational_pendinga5f0a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("operational_pending_journey1a1a5"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("value_date_technical_pending11fe0"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_technical_pendinge182f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_technical_pendingbc6bb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currency_technical_pendingbc856"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_technical_pending5e6cc"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_technical_pending3c4aa"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_technical_pending1bc34"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_technical_pending78349"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_technical_pending738a2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_technical_pendingb820e"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("technical_pending_journey6601c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("value_date_notification_pendinga37ed"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_notification_pendinge066b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_notification_pending23ac6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currency_notification_pendingeabf3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_notification_pendingd808b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_notification_pending7feb9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_notification_pendingfcab8"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_notification_pending587a1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_notification_pendingde11a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_notification_pending2ba49"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("notification_pending_journey32a13"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("value_date_enquiryccb63"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_enquiry51592"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_enquiry1f341"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currency_enquiry529c9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_enquiryf15a6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_enquiry8fc22"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_enquiry89e7c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_enquiryaba9a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_enquiry6d821"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_enquiryc00eb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("enquiry_journey9d5ba"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearch50825"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_date2cea8"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("debtor_account_no963e4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("debtor_namee2d9f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("creditor_account_noca692"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("payment_currency703d2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:currencyCombo:AFVK:v1",setdfd_currencycombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("payment_amount042b1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid29c9f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("channel95601"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:channelComboSearch:AFVK:v1",setdfd_channelcombosearch_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("processstatus28eca"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:processStatusComboSearch:AFVK:v1",setdfd_processstatuscombosearch_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("status4bd75"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("value_date45767"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("service_level75e42"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("purpose75771"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:purposeCombo:AFVK:v1",setdfd_purposecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_accounta8f91"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_Namef1c15"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currency45f51"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:currencyCombo:AFVK:v1",setdfd_currencycombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_balancea2246"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_ibanbaa1f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_street_name149b0"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_building_numberba75a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_pstl_code5ec76"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_town_name19970"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_countrydd685"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_bank_codeffb62"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("amount_input_typecd6ed"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount178b9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("settlement_amount32b14"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account3b649"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_namee0835"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_street_name21bab"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_building_namea6ac7"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_floor44bed"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_post_codef645b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_town_nameed852"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_country38218"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currencyb2ebe"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:currencyCombo:AFVK:v1",setdfd_currencycombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("exchange_rate86282"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amountbd2bf"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_bank_code76d12"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:crBankCodeCombo:AFVK:v1",setdfd_crbankcodecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_clr_code4387d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("charge_type63052"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:chargeTypeCombo:AFVK:v1",setdfd_chargetypecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("charge_amount44ea6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("correspondent_chargeff14a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("bank_chargeb33d7"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("payment_method031c1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:paymentMethodCombo:AFVK:v1",setdfd_paymentmethodcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("instruction_priorityafb4d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:initiationInstructionPriorityCombo:AFVK:v1",setdfd_initiationinstructionprioritycombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_purposead521"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:categoryPurposeCombo:AFVK:v1",setdfd_categorypurposecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("remittance_info6fbdf"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("intermediary_institution45fe6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("sender_receiver_info30c67"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("correspondent_bank2a7ae"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1",setdfd_manualinitiationuimappingquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("search_textinput7144f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:beneficiaryListQuery:AFVK:v1",setdfd_beneficiarylistquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("account_holder_namedb849"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:beneficiaryListQuery:AFVK:v1",setdfd_beneficiarylistquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("account_numberf1543"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:beneficiaryListQuery:AFVK:v1",setdfd_beneficiarylistquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("xmlviewer9fe8d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("req_jsonviewer8d071"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("res_jsonviewerdd261"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("return_reason38055"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:returnReason:AFVK:v1",setdfd_returnreason_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("return_reason_code06fe7"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:returnReason:AFVK:v1",setdfd_returnreason_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("return_currency5d707"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("return_amount7f000"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account4eafa"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currencyf9a11"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount3c1d4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currencya5017"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amountac0e3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("exchange_rate42ef6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("revised_exchange_rate18eff"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transactionDetailQuery:AFVK:v1",setdfd_transactiondetailquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("revised_debit_amount6130b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transactionDetailQuery:AFVK:v1",setdfd_transactiondetailquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("revised_credit_amount67a97"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transactionDetailQuery:AFVK:v1",setdfd_transactiondetailquery_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("return_reasonac630"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:returnReason:AFVK:v1",setdfd_returnreason_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("return_reason_code6797b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:returnReason:AFVK:v1",setdfd_returnreason_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("return_currency378ac"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("return_amount9646b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("payment_type7038c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:enquiryPaymentTypeCombo:AFVK:v1",setdfd_enquirypaymenttypecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("message_code7cd22"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:enquiryMessageTypeCombo:AFVK:v1",setdfd_enquirymessagetypecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("channel_name_view_alle4831"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfViewAllTransaction:AFVK:v1",setdfd_nfviewalltransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_view_all17e51"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfViewAllTransaction:AFVK:v1",setdfd_nfviewalltransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_view_alleb786"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfViewAllTransaction:AFVK:v1",setdfd_nfviewalltransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_view_all418a1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfViewAllTransaction:AFVK:v1",setdfd_nfviewalltransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_view_alle3b47"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfViewAllTransaction:AFVK:v1",setdfd_nfviewalltransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_view_alld92c9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfViewAllTransaction:AFVK:v1",setdfd_nfviewalltransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_view_all459b1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfViewAllTransaction:AFVK:v1",setdfd_nfviewalltransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_view_all511fd"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfViewAllTransaction:AFVK:v1",setdfd_nfviewalltransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("message_code_view_all346ce"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfViewAllTransaction:AFVK:v1",setdfd_nfviewalltransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("tran_date_view_all4223e"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfViewAllTransaction:AFVK:v1",setdfd_nfviewalltransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("view_all_journey12494"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("channel_name_can_req_camt055f27d8"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_can_req_camt0558430a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_can_req_camt055050c7"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_can_req_camt055679dd"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_can_req_camt0555b65e"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_can_req_camt055bcc5f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_can_req_camt0556e4f6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_can_req_camt0550e8b4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("message_code_can_req_camt055532c4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("tran_date_can_req_camt055ea19b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cancel_request_camt055_journeyb00e8"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("channel_name_inves_req_camt110026bb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_inves_req_camt110c3172"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_inves_req_camt110a53ed"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_inves_req_camt1101105a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_inves_req_camt110492e3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_inves_req_camt110dc531"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_inves_req_camt110e2b2d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_inves_req_camt11060ab5"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("message_code_inves_req_camt11064432"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("tran_date_inves_req_camt110772d7"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("inves_req_camt110_journey28ae2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("channel_name_inves_res_camt111d0063"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_inves_res_camt1118b477"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_inves_res_camt11129cf4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_inves_res_camt111514e6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_inves_res_camt1112e6f0"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_inves_res_camt11102682"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_inves_res_camt1114b416"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_inves_res_camt11184bb7"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("message_code_inves_res_camt111005f1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("tran_date_inves_res_camt111a30a9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("inves_res_camt111_journey3d289"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_date28cb9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuida0e9e"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("debtor_account_no1b62b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("debtor_name908b6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("creditor_account_no14a5f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name1ecf4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currencydbebf"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amounta1974"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("message_codefa765"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",setdfd_nftransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("tran_date5d7c0"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTranMainTransaction:AFVK:v1",setdfd_nftranmaintransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("message_code5df7d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTranMainTransaction:AFVK:v1",setdfd_nftranmaintransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cancel_reason1d34e"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfCancelReasonCombo:AFVK:v1",setdfd_nfcancelreasoncombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("reason_description5420a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTranMainTransaction:AFVK:v1",setdfd_nftranmaintransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("tran_date9acc4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTranMainTransaction:AFVK:v1",setdfd_nftranmaintransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("message_code581ad"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTranMainTransaction:AFVK:v1",setdfd_nftranmaintransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("investigation_type576c6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfInvestigationTypeCombo:AFVK:v1",setdfd_nfinvestigationtypecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("investigation_reason74007"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfInvestigationReasonCombo:AFVK:v1",setdfd_nfinvestigationreasoncombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("reason_description6d274"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTranMainTransaction:AFVK:v1",setdfd_nftranmaintransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("tran_date51032"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTranMainTransaction:AFVK:v1",setdfd_nftranmaintransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("message_code3e093"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTranMainTransaction:AFVK:v1",setdfd_nftranmaintransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("response_type65b90"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTranMainTransaction:AFVK:v1",setdfd_nftranmaintransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("response_reason7039a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTranMainTransaction:AFVK:v1",setdfd_nftranmaintransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("reason_descriptiond33de"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTranMainTransaction:AFVK:v1",setdfd_nftranmaintransaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("message_type404e3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:messageTypeSimulatorCombo:AFVK:v1",setdfd_messagetypesimulatorcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("statusa3cf5"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:statusSimulatorCombo:AFVK:v1",setdfd_statussimulatorcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("reject_reasonc1c38"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:rejectReasonSimulatorCombo:AFVK:v1",setdfd_rejectreasonsimulatorcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ip_message_type89b47"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:ipmessageTypeStimulatorCombo:AFVK:v1",setdfd_ipmessagetypestimulatorcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("op_110_request_type2c432"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfReqType:AFVK:v1",setdfd_nfreqtype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("op_110_request_reason6d6fa"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfReqReason:AFVK:v1",setdfd_nfreqreason_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("op_111_response_status46eaf"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfRespType:AFVK:v1",setdfd_nfresptype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("op_111_response_reason39b24"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfRespReason:AFVK:v1",setdfd_nfrespreason_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ip_055_reason_code579a1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfCancelReasonCombo:AFVK:v1",setdfd_nfcancelreasoncombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("channel_combobox95649"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:channelDashboard_dashboard:AFVK:v1",setdfd_channeldashboard_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("currency_comboboxfbbfc"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:currencyDashboard_dashboard:AFVK:v1",setdfd_currencydashboard_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("process_category_comboboxbb731"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:processCategoryDashboard_dashboard:AFVK:v1",setdfd_processcategorydashboard_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("offline_online_combobox88add"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:onlineOfflineDashboard_dashboard:AFVK:v1",setdfd_onlineofflinedashboard_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("transaction_countc3fd5"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transactionCountVphDashboard_dashboard:AFVK:v1",setdfd_transactioncountvphdashboard_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("total_amount94c0b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:channelCountVphDashboard_dashboard:AFVK:v1",setdfd_channelcountvphdashboard_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("online_offline_process41265"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:onlineOfflineCountVPHDashboard_dashboard:AFVK:v1",setdfd_onlineofflinecountvphdashboard_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("linechartdd99a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:channelChartDashboard_dashboard:AFVK:v1",setdfd_channelchartdashboard_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("barchart84262"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:channelChartDashboard_dashboard:AFVK:v1",setdfd_channelchartdashboard_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("piechart9dde7"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:channelChartDashboard_dashboard:AFVK:v1",setdfd_channelchartdashboard_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("value_date26f4c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction_dashboard:AFVK:v1",setdfd_transaction_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_accounte2a30"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction_dashboard:AFVK:v1",setdfd_transaction_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name59632"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction_dashboard:AFVK:v1",setdfd_transaction_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currency39803"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction_dashboard:AFVK:v1",setdfd_transaction_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amountc3a1f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction_dashboard:AFVK:v1",setdfd_transaction_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_accountcf8bb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction_dashboard:AFVK:v1",setdfd_transaction_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name8be31"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction_dashboard:AFVK:v1",setdfd_transaction_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency5fe15"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction_dashboard:AFVK:v1",setdfd_transaction_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amounta66de"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction_dashboard:AFVK:v1",setdfd_transaction_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid9822d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction_dashboard:AFVK:v1",setdfd_transaction_dashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
    };
}

 