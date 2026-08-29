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


    const {dfd_advance_search_v1Props,setdfd_advance_search_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_combo_dfd_v1Props,setdfd_combo_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_group_array_dsd_v1Props,setdfd_group_array_dsd_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_claims_dfd_v1Props,setdfd_claims_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_set_where_v1Props,setdfd_set_where_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_chart_data_v1Props,setdfd_chart_data_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_set_db_node_v1Props,setdfd_set_db_node_v1Props} = useContext(TotalContext) as TotalContextProps;
    const toast=useInfoMsg();
    const { token } = useGlobal();

    return (nodename:any,page:any=1,count:any=10,dpdEncryption:any) => {
            if("country0de1c"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:advance_search:AFVK:v1",setdfd_advance_search_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("state64484"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:advance_search:AFVK:v1",setdfd_advance_search_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("city6c663"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:advance_search:AFVK:v1",setdfd_advance_search_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearchf4a44"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:advance_search:AFVK:v1",setdfd_advance_search_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("barchartcf891"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:combo_dfd:AFVK:v1",setdfd_combo_dfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("countryf4ab0"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:combo_dfd:AFVK:v1",setdfd_combo_dfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("state015fd"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:combo_dfd:AFVK:v1",setdfd_combo_dfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cityfc3b9"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:combo_dfd:AFVK:v1",setdfd_combo_dfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_namec83ee"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:Group_Array_dsd:AFVK:v1",setdfd_group_array_dsd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("email0c3ca"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:Group_Array_dsd:AFVK:v1",setdfd_group_array_dsd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_datee6e16"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:Group_Array_dsd:AFVK:v1",setdfd_group_array_dsd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_categoryf03f1"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:Group_Array_dsd:AFVK:v1",setdfd_group_array_dsd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_total_amount49375"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:Group_Array_dsd:AFVK:v1",setdfd_group_array_dsd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("receipt_image4f1bf"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:Group_Array_dsd:AFVK:v1",setdfd_group_array_dsd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("comments7171e"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:Group_Array_dsd:AFVK:v1",setdfd_group_array_dsd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_name136a1"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:claims_dfd:AFVK:v1",setdfd_claims_dfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_date7e93b"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:claims_dfd:AFVK:v1",setdfd_claims_dfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("claim_categoryf1c64"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:claims_dfd:AFVK:v1",setdfd_claims_dfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_total_amount395dd"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:claims_dfd:AFVK:v1",setdfd_claims_dfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("receipt_imageb2aec"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:claims_dfd:AFVK:v1",setdfd_claims_dfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("commentse3b5b"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:claims_dfd:AFVK:v1",setdfd_claims_dfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("switch7e8ff"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:claims_dfd:AFVK:v1",setdfd_claims_dfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("checkbox53e8f"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:claims_dfd:AFVK:v1",setdfd_claims_dfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expense_nameeac5c"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:claims_dfd:AFVK:v1",setdfd_claims_dfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cetegorycd65c"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:claims_dfd:AFVK:v1",setdfd_claims_dfd_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("country72935"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:set_where:AFVK:v1",setdfd_set_where_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("statebf0ec"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:set_where:AFVK:v1",setdfd_set_where_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("combobox659b9"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:chart_data:AFVK:v1",setdfd_chart_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("carde8dd8"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:chart_data:AFVK:v1",setdfd_chart_data_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("state62a91"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:set_db_node:AFVK:v1",setdfd_set_db_node_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("state_two24376"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:set_db_node:AFVK:v1",setdfd_set_db_node_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("country625d4"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:set_db_node:AFVK:v1",setdfd_set_db_node_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("textinput86330"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:set_db_node:AFVK:v1",setdfd_set_db_node_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("country2114e"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:set_db_node:AFVK:v1",setdfd_set_db_node_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("statebbeaf"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:set_db_node:AFVK:v1",setdfd_set_db_node_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("city6731c"==nodename){
                dfdRefreshContext("CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:set_db_node:AFVK:v1",setdfd_set_db_node_v1Props,page,count,dpdEncryption,toast,token);
            }
    };
}

 