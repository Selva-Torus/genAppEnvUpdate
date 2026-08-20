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
    const {dfd_documentlistdfd_v1Props,setdfd_documentlistdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_scansaveprocessdfd_v1Props,setdfd_scansaveprocessdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_crbankcodedropdowndfd_v1Props,setdfd_crbankcodedropdowndfd_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_forexcurrencydropdowndfd_v1Props,setdfd_forexcurrencydropdowndfd_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_errorlistdfd_v1Props,setdfd_errorlistdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_commentlistdfd_v1Props,setdfd_commentlistdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_transactionlistdfd_v1Props,setdfd_transactionlistdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_rejectpopupdfd_v1Props,setdfd_rejectpopupdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_returnreasondfd_v1Props,setdfd_returnreasondfd_v1Props} = useContext(TotalContext) as TotalContextProps;
    const toast=useInfoMsg();
    const { token } = useGlobal();

    return (nodename:any,page:any=1,count:any=10,dpdEncryption:any) => {
            if("value_date_view_allb0df6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_view_all33724"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_view_allc0a46"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currency_view_all54da6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_view_all88d6b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_view_alld4b39"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_view_all19d14"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_view_all82afd"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_view_all47e6b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_view_allef1ca"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("view_process_type569cf"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("view_all_journeyd3ae9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("value_date_failure_queue12297"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_failure_queue42953"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_failure_queue03c86"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currency_failure_queuef9d2d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_failure_queue95d4e"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_failure_queuea7246"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_failure_queue57c4d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_failure_queue09d7a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_failure_queue0aef8"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_failure_queueb7b55"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("failure_queue_journeyc8638"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("value_date_success_queue7c209"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_success_queueeddaf"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_success_queuec805b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currency_operational_pending10a49"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_success_queueda254"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_success_queue60480"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_success_queueb80d4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_success_queue2f950"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_success_queue019a2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_success_queued0e34"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("success_queue_journey68ac9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("value_date_return_queuee5e11"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_return_queuebdabb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_return_queue958c9"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currency_return_queuee94b2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_return_queue2f324"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_return_queue21a57"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_return_queue13fec"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_return_queuef37f7"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_return_queue95903"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_return_queue9fa04"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("return_queue_journeycc9d3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("value_date_operational_pending6ecd4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_name_operational_pending2ab87"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_operational_pendinga8ff6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currency_operational_pending5146b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_operational_pending70e3f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_operational_pendingf9a9c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_operational_pendingbce21"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_operational_pending282bc"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_operational_pending0df81"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_operational_pendingeb172"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_status11519"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("operational_pending_journey1a1a5"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("value_date_technical_pending11fe0"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account_technical_pendinge182f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name_technical_pendingbc6bb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currency_technical_pendingbc856"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_amount_technical_pending5e6cc"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account_technical_pending3c4aa"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name_technical_pending1bc34"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_currency_technical_pending78349"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount_technical_pending738a2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid_failure_queue73334"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("technical_pending_journey6601c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_date2cea8"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("debtor_account_no963e4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("debtor_namee2d9f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("creditor_account_noca692"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("payment_currency703d2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("payment_amount042b1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uuid29c9f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("status4bd75"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("documentviewer9df1d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:documentListDfd:AFVK:v1",setdfd_documentlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account27abb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_name84266"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("base_currencyb386d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_cust_ac_sanc_lmtb74f7"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_cust_ac_balance753dd"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("waive_charges929e5"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_accounta818b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_namea4b34"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_bank_code8a2bc"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:crBankCodeDropDownDfd:AFVK:v1",setdfd_crbankcodedropdowndfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_bank_name434eb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:crBankCodeDropDownDfd:AFVK:v1",setdfd_crbankcodedropdowndfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_bank_bic3d26f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:crBankCodeDropDownDfd:AFVK:v1",setdfd_crbankcodedropdowndfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("forex_currency65e0b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:forexCurrencyDropDownDfd:AFVK:v1",setdfd_forexcurrencydropdowndfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("exchange_rate88caf"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("rate_codee56ad"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("forex_amounta58a5"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("base_amount3b226"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("rate_ref_no82399"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("rate_cust_idad42a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("additional_reff63a3"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("fileName7c104"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:documentListDfd:AFVK:v1",setdfd_documentlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vldCode0c0ce"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:errorListDfd:AFVK:v1",setdfd_errorlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vldReason2ef16"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:errorListDfd:AFVK:v1",setdfd_errorlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cmnts11ffa"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:commentListDfd:AFVK:v1",setdfd_commentlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("tran_id5f12f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transactionListDfd:AFVK:v1",setdfd_transactionlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_acnt_no469c1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transactionListDfd:AFVK:v1",setdfd_transactionlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_acnt_nocb409"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transactionListDfd:AFVK:v1",setdfd_transactionlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("amntef7a4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transactionListDfd:AFVK:v1",setdfd_transactionlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_bank_code24beb"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transactionListDfd:AFVK:v1",setdfd_transactionlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("created_bye14cd"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transactionListDfd:AFVK:v1",setdfd_transactionlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("created_date14669"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transactionListDfd:AFVK:v1",setdfd_transactionlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("file_name_rtgs_list06cd7"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:documentListDfd:AFVK:v1",setdfd_documentlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vld_code_rtgs_lsta5e1f"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:errorListDfd:AFVK:v1",setdfd_errorlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vld_reason_rtgs_listdd73b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:errorListDfd:AFVK:v1",setdfd_errorlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cmnts_rtgs_listee03b"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:commentListDfd:AFVK:v1",setdfd_commentlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("reasonDesc20b1a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:rejectPopupDfd:AFVK:v1",setdfd_rejectpopupdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("transaction_date_time14856"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("status88bc7"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("processed_byd2b69"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account36b40"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_currency9c8a2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_account0d1f4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_amount01416"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transaction:AFVK:v1",setdfd_transaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("process_status500d6"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("xmlviewer9fe8d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("req_jsonviewer8d071"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("res_jsonviewerdd261"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:journey:AFVK:v1",setdfd_journey_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_account953ea"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_named06e2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("base_currency57d7d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_accountddb15"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_name517b4"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_bank_code9af27"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:crBankCodeDropDownDfd:AFVK:v1",setdfd_crbankcodedropdowndfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("forex_currency10f51"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:forexCurrencyDropDownDfd:AFVK:v1",setdfd_forexcurrencydropdowndfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("forex_amount2d477"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("base_amount2df6d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1",setdfd_scansaveprocessdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vldCoded6381"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:errorListDfd:AFVK:v1",setdfd_errorlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vldReasonfca81"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:errorListDfd:AFVK:v1",setdfd_errorlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cmntsa418a"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:commentListDfd:AFVK:v1",setdfd_commentlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("tran_id6705e"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transactionListDfd:AFVK:v1",setdfd_transactionlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dr_acnt_no28ad2"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transactionListDfd:AFVK:v1",setdfd_transactionlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_acnt_no58585"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transactionListDfd:AFVK:v1",setdfd_transactionlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("amnt95ed1"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transactionListDfd:AFVK:v1",setdfd_transactionlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cr_bank_code01850"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transactionListDfd:AFVK:v1",setdfd_transactionlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("created_byb7915"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transactionListDfd:AFVK:v1",setdfd_transactionlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("created_date6b8a8"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transactionListDfd:AFVK:v1",setdfd_transactionlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vld_code_rtgs_lst274ca"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:errorListDfd:AFVK:v1",setdfd_errorlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vld_reason_rtgs_listff18d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:errorListDfd:AFVK:v1",setdfd_errorlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cmnts_rtgs_listd0091"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:commentListDfd:AFVK:v1",setdfd_commentlistdfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("return_reason_dropdown6f51c"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:returnReasonDfd:AFVK:v1",setdfd_returnreasondfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("reject_reason_op5ba8d"==nodename){
                dfdRefreshContext("CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:returnReasonDfd:AFVK:v1",setdfd_returnreasondfd_v1Props,page,count,dpdEncryption,toast,token);
            }
    };
}

 