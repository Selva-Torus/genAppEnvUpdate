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


    const {dfd_cardmetricsdashboard_v1Props,setdfd_cardmetricsdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_piechartdashboard_v1Props,setdfd_piechartdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_dashboardtable_v1Props,setdfd_dashboardtable_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_airegistry_v1Props,setdfd_airegistry_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_businessunitcombo_v1Props,setdfd_businessunitcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_businessownercombo_v1Props,setdfd_businessownercombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_dataclasslist_v1Props,setdfd_dataclasslist_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assetnamecombo_v1Props,setdfd_assetnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_modeldetails_v1Props,setdfd_modeldetails_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_aiagentcontrol_v1Props,setdfd_aiagentcontrol_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_discoveryqueuecards_v1Props,setdfd_discoveryqueuecards_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_discoveryqueue_v1Props,setdfd_discoveryqueue_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assetcodenameconcatcombo_v1Props,setdfd_assetcodenameconcatcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_recentevidencepacktable_v1Props,setdfd_recentevidencepacktable_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_codetype_v1Props,setdfd_codetype_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_codevalue_v1Props,setdfd_codevalue_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_codevaluecombo_v1Props,setdfd_codevaluecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_integrationsource_v1Props,setdfd_integrationsource_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_sourcecategorycombo_v1Props,setdfd_sourcecategorycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_integrationrun_v1Props,setdfd_integrationrun_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_integrationfieldmap_v1Props,setdfd_integrationfieldmap_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_fieldmapcombo_v1Props,setdfd_fieldmapcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_riskrule_v1Props,setdfd_riskrule_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_risktiercodecombo_v1Props,setdfd_risktiercodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_riskrulecondition_v1Props,setdfd_riskrulecondition_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_certificatetemplate_v1Props,setdfd_certificatetemplate_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_certificationstage_v1Props,setdfd_certificationstage_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_aiagentaction_v1Props,setdfd_aiagentaction_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_aiassetversion_v1Props,setdfd_aiassetversion_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_aiassetdependency_v1Props,setdfd_aiassetdependency_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_aiassetdependtypecombo_v1Props,setdfd_aiassetdependtypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const toast=useInfoMsg();
    const { token } = useGlobal();

    return (nodename:any,page:any=1,count:any=10,dpdEncryption:any) => {
            if("register_ai_valuee0da9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:cardMetricsDashboard:AFVK:v1",setdfd_cardmetricsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("tier_critical_value458e1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:piechartDashboard:AFVK:v1",setdfd_piechartdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_colna2f91"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dashboardTable:AFVK:v1",setdfd_dashboardtable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("tier_colnf93fe"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dashboardTable:AFVK:v1",setdfd_dashboardtable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_colnb75ad"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dashboardTable:AFVK:v1",setdfd_dashboardtable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("datea4326"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dashboardTable:AFVK:v1",setdfd_dashboardtable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("status1b6f6"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dashboardTable:AFVK:v1",setdfd_dashboardtable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("piechartbd633"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:piechartDashboard:AFVK:v1",setdfd_piechartdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ai_asset_id9e2a6"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_named5e53"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_code9a242"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_type_code743b5"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("risk_tier_coded1d3a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_unit_name28b82"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_owner_name6f253"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_expiry_date63ebc"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("discovery_source_code5e1a8"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lifecycle_status_code06a86"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearch00f9d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_code6af5c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_namedba4c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_type_code8343f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("short_description11f5e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_unit_namedc698"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:businessUnitCombo:AFVK:v1",setdfd_businessunitcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_owner_namedae55"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:businessOwnerCombo:AFVK:v1",setdfd_businessownercombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vendor_name42147"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("hosting_location7dc0e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("external_reference17a2c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_third_partye6f0c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("current_certification_idd992e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_expiry_datecaf83"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("discovery_source_code695b4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("integration_source_idc3c56"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_purpose508f9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("use_case_codebf820"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("risk_tier_code783c4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("risk_tier_source70b9c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("criticality_code90a59"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lifecycle_status_code3c48c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_customer_facing9359f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_automated_decisionc6aa9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active73ddb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("first_discovered_ond8251"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("last_seen_onab95c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("go_live_date142af"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("retirement_date23d2c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("current_version_number341f8"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name64b8e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_codeabd34"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_type_code2fd2c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("risk_tier_codea1cf5"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lifecycle_status_code21964"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ai_asset_id005d2"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ai_asset_id1bcd7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dataClassList:AFVK:v1",setdfd_dataclasslist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name1380a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dataClassList:AFVK:v1",setdfd_dataclasslist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_data_class_ida0858"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dataClassList:AFVK:v1",setdfd_dataclasslist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("data_class_code213e9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dataClassList:AFVK:v1",setdfd_dataclasslist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_primaryeda2a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dataClassList:AFVK:v1",setdfd_dataclasslist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("notes6537d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dataClassList:AFVK:v1",setdfd_dataclasslist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name44531"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetNameCombo:AFVK:v1",setdfd_assetnamecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("data_class_codeaacea"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dataClassList:AFVK:v1",setdfd_dataclasslist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_primary29d9f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dataClassList:AFVK:v1",setdfd_dataclasslist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("notes7f668"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dataClassList:AFVK:v1",setdfd_dataclasslist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_nameae58e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dataClassList:AFVK:v1",setdfd_dataclasslist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("data_class_codee6763"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dataClassList:AFVK:v1",setdfd_dataclasslist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ai_asset_id3f4b8"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name35f88"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_model_id8c2e4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("model_namecfc6c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("model_version97b34"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("model_family_code06ae7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("model_providerccc4e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_model_id180c1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name5b38b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("model_named4b34"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("model_versionf4cbd"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("model_family_code0e9ff"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("model_provider47378"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("training_sourced0a22"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("grounding_sourceccba4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vector_store_named3360"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("uses_rag1ab9a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("last_validated_on7080a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("next_validation_due17bcf"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active7bbd4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name58385"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("model_namec6433"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("model_version6f6be"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_model_id844e1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ai_asset_idb7f77"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name06439"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("agent_control_id0dd2d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("agent_identity_refc4c89"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("identity_provider4076a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("authority_level_codea4eeb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("kill_switch_state_code78d44"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name91b54"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetNameCombo:AFVK:v1",setdfd_assetnamecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("agent_identity_ref508a1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("identity_provider1e79b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("authority_level_codebd1b1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("approval_threshold_amtcde1f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("approval_threshold_ccya2418"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("max_actions_per_day25e1a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("requires_human_approval800ad"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("kill_switch_state_code3ed20"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("kill_switch_updated_by7a179"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("kill_switch_updated_on0aadf"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_activee26e9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("segregation_notesd7da7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_namee9a75"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("agent_identity_ref64e77"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("identity_providerd954f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("agent_control_idbe6d2"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("review_status_code8db7b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:discoveryQueueCards:AFVK:v1",setdfd_discoveryqueuecards_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("match_status_code834fe"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:discoveryQueueCards:AFVK:v1",setdfd_discoveryqueuecards_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("proposed_name287c5"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1",setdfd_discoveryqueue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("external_reference00717"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1",setdfd_discoveryqueue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("source_code20b9d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1",setdfd_discoveryqueue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("proposed_type_code5f02c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1",setdfd_discoveryqueue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("match_status_code1d8ad"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1",setdfd_discoveryqueue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_display_name70bbb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetCodeNameConcatCombo:AFVK:v1",setdfd_assetcodenameconcatcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("export_id6fa43"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:recentEvidencePackTable:AFVK:v1",setdfd_recentevidencepacktable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("referencec1175"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:recentEvidencePackTable:AFVK:v1",setdfd_recentevidencepacktable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name78040"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:recentEvidencePackTable:AFVK:v1",setdfd_recentevidencepacktable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("as_at_timestampdc220"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:recentEvidencePackTable:AFVK:v1",setdfd_recentevidencepacktable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("sectionse5c2f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:recentEvidencePackTable:AFVK:v1",setdfd_recentevidencepacktable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("status6a7a5"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:recentEvidencePackTable:AFVK:v1",setdfd_recentevidencepacktable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("code_type_id290d4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("code_typea529e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("descriptionc87f7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_system8e69b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active6db20"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_event_process_status54d4f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advance_search3371e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("code_typeb31bb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("descriptione6525"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_system869d1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active28565"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("code_type_id8fe6f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("code_typedf5a3"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("description32634"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_systemc0200"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active6bc58"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("code_value_id599be"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("code_type_idcc48b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("code597af"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("display_named01df"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("descriptione73c2"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active35e58"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advance_searchc0f0a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("code_typeae530"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValueCombo:AFVK:v1",setdfd_codevaluecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("codebc63b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("display_namea6bb5"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("sort_order18beb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("description2d6ea"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("colour_hint75054"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("numeric_weight9b07a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active033da"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("code_type66261"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValueCombo:AFVK:v1",setdfd_codevaluecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("code_text147d3"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("display_name84e42"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("set_orderef6e6"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("description7448f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("colour_hint87c80"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("numeric_weight53c97"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_actived07bc"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("integration_source_id1c758"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("source_codedb33c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("source_name66c25"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("source_category_code45f6b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("connector_type_code2f1c8"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("auth_method_codeea17b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("last_run_at01576"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("last_run_statusb04da"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advance_search81529"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("source_code94d5a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("source_nameec826"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("source_category_codefd590"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:sourceCategoryCombo:AFVK:v1",setdfd_sourcecategorycombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("connector_type_code9620d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("base_url40ed4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("auth_method_codebde42"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("credential_ref168b0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("schedule_crond5a64"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("timeout_secondsd4997"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("retry_limite0549"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("owner_user_ide5fa5"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active71e88"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_enabled8e021"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("last_run_onb3b55"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("last_run_status420cc"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("source_category_code4081b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:sourceCategoryCombo:AFVK:v1",setdfd_sourcecategorycombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("integration_source_idf4d20"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("integration_source_code3e7e2"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("integration_source_name2b239"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("integration_connector_type29cd0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_activef0183"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",setdfd_integrationsource_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("integration_ide9a61"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("run_trigger_code5637f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("started_onb93fa"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ended_onc29ee"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("run_status_code1137e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("records_readb1c9b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("records_rejectedfb2e8"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearchcd841"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("integration_run_id58a1b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("run_trigger_coded077c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("triggered_by95bfc"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("started_ond88e8"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ended_on9cf0a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("run_status_codef6fc6"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("records_read0c225"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("records_new7cbd3"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("records_updatedc20b9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("records_rejected068f2"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("error_summarya3746"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("integration_run_id13501"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("run_trigger_codeb5d3d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stared_ona8f54"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("run_status_code37f79"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1",setdfd_integrationrun_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("field_map_id6f47d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1",setdfd_integrationfieldmap_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("source_field_path634e8"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1",setdfd_integrationfieldmap_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("target_entity002be"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1",setdfd_integrationfieldmap_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("target_attribute8c6c9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1",setdfd_integrationfieldmap_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("transform_rule318b0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1",setdfd_integrationfieldmap_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active297f0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1",setdfd_integrationfieldmap_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advance_search776d0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1",setdfd_integrationfieldmap_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("source_name4a9d8"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:fieldMapCombo:AFVK:v1",setdfd_fieldmapcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("integration_source_id29da1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:fieldMapCombo:AFVK:v1",setdfd_fieldmapcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("rule_code0aa8a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1",setdfd_riskrule_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("rule_name9f319"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1",setdfd_riskrule_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("result_tier_codeca7bb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1",setdfd_riskrule_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("priority_orderd6801"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1",setdfd_riskrule_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active21ce9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1",setdfd_riskrule_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearch6abe7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1",setdfd_riskrule_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("result_tier_drop86b67"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskTierCodeCombo:AFVK:v1",setdfd_risktiercodecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("result_tier_dropa260b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskTierCodeCombo:AFVK:v1",setdfd_risktiercodecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("rule_condition_id14d5f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1",setdfd_riskrulecondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("risk_rule_id1c126"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1",setdfd_riskrulecondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("attribute_name32305"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1",setdfd_riskrulecondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("operator_code14f9a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1",setdfd_riskrulecondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active01a05"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1",setdfd_riskrulecondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearcha3da9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1",setdfd_riskrulecondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_codee3093"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_name9efc0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("applies_tier_code868b4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("applies_use_case027eb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("applies_asset_typedf4bf"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("validity_months2ae89"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_versionfb750"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active62f0c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearch8a2ec"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_name53616"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_code83f6f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_versionc2087"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("applies_tier_code4010b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("applies_use_casee4c68"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("applies_asset_typeb380f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("validity_months29fbf"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("effective_from9832b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("effective_to1ba20"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active8acbf"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_codeb7abe"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_name5bed7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("applies_tier_coded4d29"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("applies_use_casef037b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("applies_asset_typea5e3d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("validity_monthsc0c5a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_version21972"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active8dede"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_template_idd4429"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_stage_idddf46"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_template_id6353c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_sequence526fa"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_type_code40ed7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_namee4558"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("approver_role_id8ceef"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_mandatory27a2c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("evidence_required40499"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("sla_daysec694"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active13499"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_sequencefde55"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_type_codefe371"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_namef712f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("approver_role_id278bd"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("sla_days5202a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("min_evidence_count3252a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_mandatory05efb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("evidence_required78dc8"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("guidance_texte8af0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active49c13"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_stage_id33d37"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_template_id54cca"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_name6920f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_type_code0d58a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("sla_days7b386"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active312fd"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("agent_action_id2fa37"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1",setdfd_aiagentaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("action_name3c469"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1",setdfd_aiagentaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("target_systemdb907"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1",setdfd_aiagentaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("tool_or_api349b3"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1",setdfd_aiagentaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_permitted23d6f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1",setdfd_aiagentaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_high_risk9c751"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1",setdfd_aiagentaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("approval_required9ccc6"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1",setdfd_aiagentaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_actived82af"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1",setdfd_aiagentaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearch84ddd"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1",setdfd_aiagentaction_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_version_id3d7e4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetVersion:AFVK:v1",setdfd_aiassetversion_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name0a773"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetVersion:AFVK:v1",setdfd_aiassetversion_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("version_no635f0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetVersion:AFVK:v1",setdfd_aiassetversion_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("change_type_codecfabb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetVersion:AFVK:v1",setdfd_aiassetversion_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("change_reason9d3b0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetVersion:AFVK:v1",setdfd_aiassetversion_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("valid_fromcd4ab"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetVersion:AFVK:v1",setdfd_aiassetversion_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("valid_tob2b1d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetVersion:AFVK:v1",setdfd_aiassetversion_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearchfc4a9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetVersion:AFVK:v1",setdfd_aiassetversion_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name3bf18"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetCodeNameConcatCombo:AFVK:v1",setdfd_assetcodenameconcatcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dependency_idb7ed1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetDependency:AFVK:v1",setdfd_aiassetdependency_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_namef9271"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetDependency:AFVK:v1",setdfd_aiassetdependency_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dependency_named9050"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetDependency:AFVK:v1",setdfd_aiassetdependency_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dependency_type_code8b20c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetDependency:AFVK:v1",setdfd_aiassetdependency_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("directionffe79"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetDependency:AFVK:v1",setdfd_aiassetdependency_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_criticala4198"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetDependency:AFVK:v1",setdfd_aiassetdependency_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_activea8dd7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetDependency:AFVK:v1",setdfd_aiassetdependency_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name043c3"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetCodeNameConcatCombo:AFVK:v1",setdfd_assetcodenameconcatcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dependency_type_code239a4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetDependTypeCombo:AFVK:v1",setdfd_aiassetdependtypecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
    };
}

 