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
    const {dfd_barchartdashboard_v1Props,setdfd_barchartdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_airegistry_v1Props,setdfd_airegistry_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assettypecodecombo_v1Props,setdfd_assettypecodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_businessunitcombo_v1Props,setdfd_businessunitcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_businessownercombo_v1Props,setdfd_businessownercombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_hostingregioncombo_v1Props,setdfd_hostingregioncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_regulatorycodevaluecombo_v1Props,setdfd_regulatorycodevaluecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_dataclasslist_v1Props,setdfd_dataclasslist_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_modeldetails_v1Props,setdfd_modeldetails_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_aiagentcontrol_v1Props,setdfd_aiagentcontrol_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_authoritylevelcombo_v1Props,setdfd_authoritylevelcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_aiagentaction_v1Props,setdfd_aiagentaction_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_aiassetversion_v1Props,setdfd_aiassetversion_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_aiassetdependency_v1Props,setdfd_aiassetdependency_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_aiassetdependtypecombo_v1Props,setdfd_aiassetdependtypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_aipassport_v1Props,setdfd_aipassport_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_aimodeltable_v1Props,setdfd_aimodeltable_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_aiagentactiontable_v1Props,setdfd_aiagentactiontable_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_aicertificationtable_v1Props,setdfd_aicertificationtable_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_attachevidence_v1Props,setdfd_attachevidence_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_aichangehistorytable_v1Props,setdfd_aichangehistorytable_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_aiaudittable_v1Props,setdfd_aiaudittable_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_awaitingreview_v1Props,setdfd_awaitingreview_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_possibleduplicatescard_v1Props,setdfd_possibleduplicatescard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_discoveryqueue_v1Props,setdfd_discoveryqueue_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_tierassessment_v1Props,setdfd_tierassessment_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assetlist_v1Props,setdfd_assetlist_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_agentcertificatetable_v1Props,setdfd_agentcertificatetable_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_applycertificatetempname_v1Props,setdfd_applycertificatetempname_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_applycertificatestagecombo_v1Props,setdfd_applycertificatestagecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_applycertstatuscombo_v1Props,setdfd_applycertstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_certificationstagestable_v1Props,setdfd_certificationstagestable_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_myapprovalrisk_v1Props,setdfd_myapprovalrisk_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_myapprovaltable_v1Props,setdfd_myapprovaltable_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_listallshowstages_v1Props,setdfd_listallshowstages_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_certificationcondition_v1Props,setdfd_certificationcondition_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_statuscodecombo_v1Props,setdfd_statuscodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_report_v1Props,setdfd_report_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_riskrule_v1Props,setdfd_riskrule_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_risktiercodecombo_v1Props,setdfd_risktiercodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_riskrulecondition_v1Props,setdfd_riskrulecondition_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_ruleconditioncombo_v1Props,setdfd_ruleconditioncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_riskoperatorcodecombo_v1Props,setdfd_riskoperatorcodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_certificatetemplate_v1Props,setdfd_certificatetemplate_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assettypecertcompo_v1Props,setdfd_assettypecertcompo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_usecasecombo_v1Props,setdfd_usecasecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_certificationstage_v1Props,setdfd_certificationstage_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_certificationtemplatecombo_v1Props,setdfd_certificationtemplatecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_certificationstagetypecodecombo_v1Props,setdfd_certificationstagetypecodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_codetype_v1Props,setdfd_codetype_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_codevalue_v1Props,setdfd_codevalue_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_codevaluecombo_v1Props,setdfd_codevaluecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const toast=useInfoMsg();
    const { token } = useGlobal();

    return (nodename:any,page:any=1,count:any=10,dpdEncryption:any) => {
            if("register_ai_valuee0da9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:cardMetricsDashboard:AFVK:v1",setdfd_cardmetricsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("tier_critical_value458e1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:piechartDashboard:AFVK:v1",setdfd_piechartdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_expired_value07966"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:cardMetricsDashboard:AFVK:v1",setdfd_cardmetricsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("named_owner_valueb01fd"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:cardMetricsDashboard:AFVK:v1",setdfd_cardmetricsdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_date_valuef9bff"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:cardMetricsDashboard:AFVK:v1",setdfd_cardmetricsdashboard_v1Props,page,count,dpdEncryption,toast,token);
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
            if("consumer_lending_progress2fc54"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:barChartDashboard:AFVK:v1",setdfd_barchartdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("operations_progress41d7e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:barChartDashboard:AFVK:v1",setdfd_barchartdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("financial_crime_progresse6070"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:barChartDashboard:AFVK:v1",setdfd_barchartdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cards_payments_progressc4402"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:barChartDashboard:AFVK:v1",setdfd_barchartdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("technology_progressc4269"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:barChartDashboard:AFVK:v1",setdfd_barchartdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ai_asset_id9e2a6"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_code9a242"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_named5e53"==nodename){
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
            if("technical_owner_nameeb5f4"==nodename){
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
            if("asset_code6af5c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_namedba4c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_type_code8343f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetTypeCodeCombo:AFVK:v1",setdfd_assettypecodecombo_v1Props,page,count,dpdEncryption,toast,token);
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
            if("business_owner_job_title3ca37"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:businessOwnerCombo:AFVK:v1",setdfd_businessownercombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("technical_owner_name14230"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:businessOwnerCombo:AFVK:v1",setdfd_businessownercombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("technical_owner_job_title5bb64"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:businessOwnerCombo:AFVK:v1",setdfd_businessownercombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vendor_name42147"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("hosting_location7dc0e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:hostingRegionCombo:AFVK:v1",setdfd_hostingregioncombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("external_reference17a2c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_third_partye6f0c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("discovery_source_code695b4"==nodename){
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
            if("regulatoryeff87"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:regulatoryCodeValueCombo:AFVK:v1",setdfd_regulatorycodevaluecombo_v1Props,page,count,dpdEncryption,toast,token);
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
            if("is_customer_facing9359f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_automated_decisionc6aa9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active73ddb"==nodename){
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
            if("advancesearch5cdc0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dataClassList:AFVK:v1",setdfd_dataclasslist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_data_class_id8fe3d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dataClassList:AFVK:v1",setdfd_dataclasslist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name68667"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dataClassList:AFVK:v1",setdfd_dataclasslist_v1Props,page,count,dpdEncryption,toast,token);
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
            if("advancesearch6e558"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_model_id5d345"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:modelDetails:AFVK:v1",setdfd_modeldetails_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name36f32"==nodename){
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
            if("advancesearchebceb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("agent_control_id67ff7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name8fc48"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("agent_identity_ref508a1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("identity_provider81bc5"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",setdfd_aiagentcontrol_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("authority_level_code4dedb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:authorityLevelCombo:AFVK:v1",setdfd_authoritylevelcombo_v1Props,page,count,dpdEncryption,toast,token);
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
            if("dependency_idb7ed1"==nodename){
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
            if("dependency_type_code239a4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetDependTypeCombo:AFVK:v1",setdfd_aiassetdependtypecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ai_asset_iddb52f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1",setdfd_aipassport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_nameed2ce"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1",setdfd_aipassport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_codee08cb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1",setdfd_aipassport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_type_code33d1e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1",setdfd_aipassport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("risk_tier_code24a57"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1",setdfd_aipassport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_unit_name61107"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1",setdfd_aipassport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_owner_name6b6fb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1",setdfd_aipassport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("discovery_source_code76eba"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1",setdfd_aipassport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lifecycle_status_code6a8aa"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1",setdfd_aipassport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("use_case_codea04e1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1",setdfd_aipassport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("model_name30433"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIModelTable:AFVK:v1",setdfd_aimodeltable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("model_family_code81780"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIModelTable:AFVK:v1",setdfd_aimodeltable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("model_version30de2"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIModelTable:AFVK:v1",setdfd_aimodeltable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("training_sourceb40dd"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIModelTable:AFVK:v1",setdfd_aimodeltable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("target_system76680"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentActionTable:AFVK:v1",setdfd_aiagentactiontable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_permitted64136"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentActionTable:AFVK:v1",setdfd_aiagentactiontable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_name3a33a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AICertificationTable:AFVK:v1",setdfd_aicertificationtable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("decision_code86879"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AICertificationTable:AFVK:v1",setdfd_aicertificationtable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("decided_onbf348"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AICertificationTable:AFVK:v1",setdfd_aicertificationtable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("attachment_idc56a6"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_groupffa87"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_name685d0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_datec63c8"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_byeaa42"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dependency_namef5d64"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1",setdfd_aipassport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dependency_type_code977b6"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1",setdfd_aipassport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_code1d09d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1",setdfd_aipassport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dependency_named29a1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1",setdfd_aipassport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("dependency_type_code0c6ea"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1",setdfd_aipassport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_code618c2"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1",setdfd_aipassport_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("valid_fromaaed6"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIChangeHistoryTable:AFVK:v1",setdfd_aichangehistorytable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("version_nofa135"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIChangeHistoryTable:AFVK:v1",setdfd_aichangehistorytable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("change_reasonf39f1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIChangeHistoryTable:AFVK:v1",setdfd_aichangehistorytable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("changed_byb49ab"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIChangeHistoryTable:AFVK:v1",setdfd_aichangehistorytable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("event_timestamp6fb78"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAUditTable:AFVK:v1",setdfd_aiaudittable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("event_type_code351f9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAUditTable:AFVK:v1",setdfd_aiaudittable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("actor_login38c30"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAUditTable:AFVK:v1",setdfd_aiaudittable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("action_summary788fd"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAUditTable:AFVK:v1",setdfd_aiaudittable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("review_status_code8db7b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AwaitingReview:AFVK:v1",setdfd_awaitingreview_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("match_status_code834fe"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:PossibleDuplicatesCard:AFVK:v1",setdfd_possibleduplicatescard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("staging_idf5899"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1",setdfd_discoveryqueue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("proposed_name287c5"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1",setdfd_discoveryqueue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("external_reference00717"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1",setdfd_discoveryqueue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("proposed_type_code5f02c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1",setdfd_discoveryqueue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("match_status_code1d8ad"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1",setdfd_discoveryqueue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ai_asset_ided67d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_code9ccc1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_nameed2a9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_type_code9aa4b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("risk_tier_codedeff4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_unit_name7efed"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_owner_namee2591"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("technical_owner_name08dcb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("discovery_source_code8c829"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lifecycle_status_codea5742"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_code2ce4b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:tierAssessment:AFVK:v1",setdfd_tierassessment_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name32f12"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:tierAssessment:AFVK:v1",setdfd_tierassessment_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("risk_tier_code611f1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:tierAssessment:AFVK:v1",setdfd_tierassessment_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_unit_namec3c51"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:tierAssessment:AFVK:v1",setdfd_tierassessment_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_owner_namef2a73"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:tierAssessment:AFVK:v1",setdfd_tierassessment_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("tier_assessment_id76935"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:tierAssessment:AFVK:v1",setdfd_tierassessment_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ai_asset_id97328"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:tierAssessment:AFVK:v1",setdfd_tierassessment_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("previous_tier_codeb04e7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:tierAssessment:AFVK:v1",setdfd_tierassessment_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("rule_code8774e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:tierAssessment:AFVK:v1",setdfd_tierassessment_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("rule_name68434"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:tierAssessment:AFVK:v1",setdfd_tierassessment_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assessed_tier_codec45d4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:tierAssessment:AFVK:v1",setdfd_tierassessment_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assessed_tier_code8866c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:tierAssessment:AFVK:v1",setdfd_tierassessment_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("justificationc41ce"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:tierAssessment:AFVK:v1",setdfd_tierassessment_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assigned_login_name8a256"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:businessOwnerCombo:AFVK:v1",setdfd_businessownercombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_version_id74d58"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1",setdfd_assetlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_code42c4f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1",setdfd_assetlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name527a0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1",setdfd_assetlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_type_code42ada"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1",setdfd_assetlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("risk_tier_code78b3a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1",setdfd_assetlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_unit_name76651"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1",setdfd_assetlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_owner_name7cdf2"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1",setdfd_assetlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("discovery_source_coded16a4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1",setdfd_assetlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lifecycle_status_codeddfc4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1",setdfd_assetlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearch1eb42"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1",setdfd_assetlist_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("certification_idc1df1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:agentCertificateTable:AFVK:v1",setdfd_agentcertificatetable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_code8a33d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:agentCertificateTable:AFVK:v1",setdfd_agentcertificatetable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("risk_tier_codeba0b3"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:agentCertificateTable:AFVK:v1",setdfd_agentcertificatetable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_nameb0455"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:agentCertificateTable:AFVK:v1",setdfd_agentcertificatetable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("initiated_onc5bb1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:agentCertificateTable:AFVK:v1",setdfd_agentcertificatetable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_unit_nameb5a7a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:agentCertificateTable:AFVK:v1",setdfd_agentcertificatetable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_namee23cf"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:applyCertificateTempName:AFVK:v1",setdfd_applycertificatetempname_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_type_code3cbb6"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:applyCertificateStageCombo:AFVK:v1",setdfd_applycertificatestagecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_status_code047b5"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:applyCertStatusCombo:AFVK:v1",setdfd_applycertstatuscombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_stage_idcd4f0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStagesTable:AFVK:v1",setdfd_certificationstagestable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_sequence4c57e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStagesTable:AFVK:v1",setdfd_certificationstagestable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_type_code75f70"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStagesTable:AFVK:v1",setdfd_certificationstagestable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_name51f6d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStagesTable:AFVK:v1",setdfd_certificationstagestable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assigned_login_namedfe29"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStagesTable:AFVK:v1",setdfd_certificationstagestable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("decided_onf4112"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStagesTable:AFVK:v1",setdfd_certificationstagestable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_status_codead22a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStagesTable:AFVK:v1",setdfd_certificationstagestable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_name5834f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:applyCertificateTempName:AFVK:v1",setdfd_applycertificatetempname_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_status_code2f5be"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:applyCertStatusCombo:AFVK:v1",setdfd_applycertstatuscombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("tier_assessment_id04b97"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalRisk:AFVK:v1",setdfd_myapprovalrisk_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ai_asset_idcc640"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalRisk:AFVK:v1",setdfd_myapprovalrisk_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_code7c217"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalRisk:AFVK:v1",setdfd_myapprovalrisk_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name4926c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalRisk:AFVK:v1",setdfd_myapprovalrisk_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("previous_tier_code9e9a1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalRisk:AFVK:v1",setdfd_myapprovalrisk_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assessed_tier_coded5fd2"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalRisk:AFVK:v1",setdfd_myapprovalrisk_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assessment_type67085"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalRisk:AFVK:v1",setdfd_myapprovalrisk_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assessed_byc6b93"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalRisk:AFVK:v1",setdfd_myapprovalrisk_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assessed_on8f41f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalRisk:AFVK:v1",setdfd_myapprovalrisk_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_code7015f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalRisk:AFVK:v1",setdfd_myapprovalrisk_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_namee27e8"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalRisk:AFVK:v1",setdfd_myapprovalrisk_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("risk_tier_code89845"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalRisk:AFVK:v1",setdfd_myapprovalrisk_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assessed_tier_code6f8d5"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalRisk:AFVK:v1",setdfd_myapprovalrisk_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("justificationcf400"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalRisk:AFVK:v1",setdfd_myapprovalrisk_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ai_asset_idb993c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalTable:AFVK:v1",setdfd_myapprovaltable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_code2b472"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalTable:AFVK:v1",setdfd_myapprovaltable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_namec5c0e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalTable:AFVK:v1",setdfd_myapprovaltable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_type_code838c5"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalTable:AFVK:v1",setdfd_myapprovaltable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("risk_tier_code9cbc7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalTable:AFVK:v1",setdfd_myapprovaltable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("certification_idc2134"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:agentCertificateTable:AFVK:v1",setdfd_agentcertificatetable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_code3089c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:agentCertificateTable:AFVK:v1",setdfd_agentcertificatetable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("risk_tier_codeee516"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:agentCertificateTable:AFVK:v1",setdfd_agentcertificatetable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_name84746"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:agentCertificateTable:AFVK:v1",setdfd_agentcertificatetable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("initiated_one0200"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:agentCertificateTable:AFVK:v1",setdfd_agentcertificatetable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_unit_name3c111"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:agentCertificateTable:AFVK:v1",setdfd_agentcertificatetable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_stage_idf4e4a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:listallShowStages:AFVK:v1",setdfd_listallshowstages_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_sequence77cb4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:listallShowStages:AFVK:v1",setdfd_listallshowstages_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_type_codeaba16"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:listallShowStages:AFVK:v1",setdfd_listallshowstages_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_name6f01e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:listallShowStages:AFVK:v1",setdfd_listallshowstages_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_status_code53e7b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:listallShowStages:AFVK:v1",setdfd_listallshowstages_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("initiated_by_user_id9e7cb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:listallShowStages:AFVK:v1",setdfd_listallshowstages_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_condition_id207b7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationCondition:AFVK:v1",setdfd_certificationcondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("condition_textc845e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationCondition:AFVK:v1",setdfd_certificationcondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("due_datebc916"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationCondition:AFVK:v1",setdfd_certificationcondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("closed_on6f4e5"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationCondition:AFVK:v1",setdfd_certificationcondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("status_codee5fc9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationCondition:AFVK:v1",setdfd_certificationcondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("status_codeb8e30"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:statusCodeCombo:AFVK:v1",setdfd_statuscodecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_name53e8f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationCondition:AFVK:v1",setdfd_certificationcondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("condition_txt9eed1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationCondition:AFVK:v1",setdfd_certificationcondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("status_code3655c"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationCondition:AFVK:v1",setdfd_certificationcondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("due_dated27ee"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationCondition:AFVK:v1",setdfd_certificationcondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_condition_idb65fc"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationCondition:AFVK:v1",setdfd_certificationcondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("attachment_ida26af"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_group0ad3b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_namec5db2"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_datecf4da"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_by3041e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("documentviewere38cc"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("attachment_idc45ce"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_group0aa38"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_name64f14"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_date55870"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_by130b7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_stage_id712bd"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:listallShowStages:AFVK:v1",setdfd_listallshowstages_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_sequenceb0ce1"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:listallShowStages:AFVK:v1",setdfd_listallshowstages_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_type_coded75aa"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:listallShowStages:AFVK:v1",setdfd_listallshowstages_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_name001bf"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:listallShowStages:AFVK:v1",setdfd_listallshowstages_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_status_codeaf4f6"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:listallShowStages:AFVK:v1",setdfd_listallshowstages_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("initiated_by_user_idc2f1a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:listallShowStages:AFVK:v1",setdfd_listallshowstages_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ai_asset_ide00ee"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_code39458"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name771b3"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_type_code58819"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("risk_tier_code739f7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_unit_name48eca"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("business_owner_named28ed"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lifecycle_status_code01a88"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_expiry_date2be5d"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("discovery_source_code541c3"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1",setdfd_airegistry_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("attachment_id62843"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_groupc143b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_name3547e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_date279cb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_bycf6c6"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",setdfd_attachevidence_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("editor4dba0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:report:AFVK:v1",setdfd_report_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("risk_rule_id26c66"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1",setdfd_riskrule_v1Props,page,count,dpdEncryption,toast,token);
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
            if("advancesearch6abe7"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1",setdfd_riskrule_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("result_tier_code86b67"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskTierCodeCombo:AFVK:v1",setdfd_risktiercodecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("result_tier_codea260b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskTierCodeCombo:AFVK:v1",setdfd_risktiercodecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("rule_condition_id14d5f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1",setdfd_riskrulecondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("rule_code1c126"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1",setdfd_riskrulecondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("attribute_name32305"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1",setdfd_riskrulecondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("operator_code14f9a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1",setdfd_riskrulecondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearcha3da9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1",setdfd_riskrulecondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("rule_name67700"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:ruleConditionCombo:AFVK:v1",setdfd_ruleconditioncombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("sequence_no29818"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1",setdfd_riskrulecondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("operator_code042cd"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskOperatorCodeCombo:AFVK:v1",setdfd_riskoperatorcodecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("attribute_name05959"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1",setdfd_riskrulecondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("compare_value0b503"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1",setdfd_riskrulecondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_activecad18"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1",setdfd_riskrulecondition_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("rule_nameb202a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:ruleConditionCombo:AFVK:v1",setdfd_ruleconditioncombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_template_ide73a9"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
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
            if("advancesearch8a2ec"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cert_template_ide9458"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_code83f6f"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_name53616"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_versionc2087"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1",setdfd_certificatetemplate_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("applies_tier_code43474"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetTypeCertCompo:AFVK:v1",setdfd_assettypecertcompo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("applies_use_caseeb4a2"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:useCaseCombo:AFVK:v1",setdfd_usecasecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("applies_asset_typee00f2"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetTypeCertCompo:AFVK:v1",setdfd_assettypecertcompo_v1Props,page,count,dpdEncryption,toast,token);
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
            if("template_name6353c"==nodename){
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
            if("sla_daysec694"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearchb5a26"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_name79179"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationTemplateCombo:AFVK:v1",setdfd_certificationtemplatecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_sequencefde55"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_type_code9ccdc"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStageTypeCodeCombo:AFVK:v1",setdfd_certificationstagetypecodecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("stage_name3c785"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("sla_days5202a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_mandatory05efb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("evidence_required78dc8"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_active49c13"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("min_evidence_count3252a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("guidance_texte8af0"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1",setdfd_certificationstage_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("template_stage33d37"==nodename){
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
            if("code_type_id290d4"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("code_typea529e"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1",setdfd_codetype_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("descriptionc87f7"==nodename){
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
            if("code_typecc48b"==nodename){
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
            if("advance_searchc0f0a"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("code_typeae530"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValueCombo:AFVK:v1",setdfd_codevaluecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("codebc63b"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("sort_order18beb"==nodename){
                dfdRefreshContext("CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1",setdfd_codevalue_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("display_namea6bb5"==nodename){
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
    };
}

 