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
import { getCookie } from "@/app/components/cookieMgment";
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


    const {dfd_card_data_v1Props,setdfd_card_data_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_claim_table_data_v1Props,setdfd_claim_table_data_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_claims_v1Props,setdfd_claims_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_code_description_v1Props,setdfd_code_description_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_claims_detail_v1Props,setdfd_claims_detail_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_chart_data_v1Props,setdfd_chart_data_v1Props} = useContext(TotalContext) as TotalContextProps;
    const toast=useInfoMsg();
    const token:string = getCookie('token'); 

    return (nodename:any,page:any=1,count:any=10,dpdEncryption:any) => {
            if("approvedcardc5971"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:card_data:AFVK:v1",setdfd_card_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("rejectedcardefafa"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:card_data:AFVK:v1",setdfd_card_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("pendingcardee3c0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:card_data:AFVK:v1",setdfd_card_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dailyexpenses798bd"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:card_data:AFVK:v1",setdfd_card_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("offsiteexpensescd925"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:card_data:AFVK:v1",setdfd_card_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("c_id1095d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_category16bdb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("amountc124c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("status3fa4d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("date5e32f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_idb67db"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_name1040c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_total_amount54e36"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_status6f7ad"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("formatted_date7ebf5"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_expense_type22d67"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_name5f562"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_date5f45e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_categoryc7c5e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:code_description:AFVK:v1",setdfd_code_description_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_total_amount9782f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("receipt_image6afe2"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("commentsf2394"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_comment_enabled7244d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_namebf755"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("from_date6f9c3"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("to_date6db82"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_categorya4a14"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_total_amounte603b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("receipt_imageafe30"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("comments65b18"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_comment_enabled5ca5f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_detail_id97d69"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims_detail:AFVK:v1",setdfd_claims_detail_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_category182d4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims_detail:AFVK:v1",setdfd_claims_detail_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_descriptiondee64"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims_detail:AFVK:v1",setdfd_claims_detail_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_amountb97f7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims_detail:AFVK:v1",setdfd_claims_detail_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("approvedcard75ed7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:card_data:AFVK:v1",setdfd_card_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("rejectedcard0ceee"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:card_data:AFVK:v1",setdfd_card_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("pendingcard727e3"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:card_data:AFVK:v1",setdfd_card_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dailyexpensese7cda"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:card_data:AFVK:v1",setdfd_card_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("offsiteexpenses62fe1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:card_data:AFVK:v1",setdfd_card_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cl_id570c3"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_byae57b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_category090da"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("total_amountc033a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("status49843"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_date0a4c3"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_id4a599"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_namec8f13"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_total_amountfb61b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_status79b0b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("formatted_date46435"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_name88ccc"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_datee8c94"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_category46dd0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_total_amountcf2e2"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("receipt_image33fd1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("comments9336d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("manager_commentsd309a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_comment_enablede20a4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_name084c7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("from_dated8c1b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("to_date0c15a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_categoryac401"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_total_amountdd7c0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("receipt_image3968d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("commentse0ef7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("manager_comments4bec2"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_comment_enabledf9731"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1",setdfd_claims_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_detail_idcd216"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims_detail:AFVK:v1",setdfd_claims_detail_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_category71ccd"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims_detail:AFVK:v1",setdfd_claims_detail_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_description84301"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims_detail:AFVK:v1",setdfd_claims_detail_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_date2649c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims_detail:AFVK:v1",setdfd_claims_detail_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_amount6b94f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims_detail:AFVK:v1",setdfd_claims_detail_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_iddc381"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_name0195f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_category8e630"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_total_amount2b381"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_date7df86"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_statuscecb6"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_idadd32"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_name0255e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_category8981c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_total_amounta8a33"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("formatted_date0d1c9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_statusf43c9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_id7ec53"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_by1f8f9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_name78eca"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_category8466d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_total_amount22435"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_date20458"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_status9f4b4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_id56078"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_by8053b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_name94440"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_category9ec61"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_total_amount689b8"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("formatted_date1030f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_status759b6"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1",setdfd_claim_table_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("barchart5a930"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:chart_data:AFVK:v1",setdfd_chart_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("piechart95a71"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:chart_data:AFVK:v1",setdfd_chart_data_v1Props,page,count,dpdEncryption,toast,token);
            }
    };
}

 