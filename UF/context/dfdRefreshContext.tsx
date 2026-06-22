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


    const {dfd_assetdashboard_v1Props,setdfd_assetdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assets_v1Props,setdfd_assets_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assetmaintenance_v1Props,setdfd_assetmaintenance_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assetsoftwarelicenses_v1Props,setdfd_assetsoftwarelicenses_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assetdisposal_v1Props,setdfd_assetdisposal_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assetcategorycombo_v1Props,setdfd_assetcategorycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assettypecombo_v1Props,setdfd_assettypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assetclassificationcombo_v1Props,setdfd_assetclassificationcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assetdataclassificationcombo_v1Props,setdfd_assetdataclassificationcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_ownershiptypecombo_v1Props,setdfd_ownershiptypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assetconditioncombo_v1Props,setdfd_assetconditioncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_risklevelcombo_v1Props,setdfd_risklevelcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_vendornamecombo_v1Props,setdfd_vendornamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_disposalmethodcombo_v1Props,setdfd_disposalmethodcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assetdoctable_v1Props,setdfd_assetdoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assetassignments_v1Props,setdfd_assetassignments_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assetnamecombo_v1Props,setdfd_assetnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assignmentstatuscombo_v1Props,setdfd_assignmentstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_conditionatreturncombo_v1Props,setdfd_conditionatreturncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_approvalstatuscombo_v1Props,setdfd_approvalstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assigndoctable_v1Props,setdfd_assigndoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assetcategorycards_v1Props,setdfd_assetcategorycards_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_assetcategory_v1Props,setdfd_assetcategory_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_categorydoctable_v1Props,setdfd_categorydoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_licensetypecombo_v1Props,setdfd_licensetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
    const {dfd_softwaredoctable_v1Props,setdfd_softwaredoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
    const toast=useInfoMsg();
    const token:string = getCookie('token'); 

    return (nodename:any,page:any=1,count:any=10,dpdEncryption:any) => {
            if("total_assest9e45d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDashboard:AFVK:v1",setdfd_assetdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("it_assets6051f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDashboard:AFVK:v1",setdfd_assetdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("maintenance_due09ab9"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDashboard:AFVK:v1",setdfd_assetdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("overdue_maintenancef7357"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDashboard:AFVK:v1",setdfd_assetdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("warranty_expiringfa250"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDashboard:AFVK:v1",setdfd_assetdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("warranty_description49c85"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDashboard:AFVK:v1",setdfd_assetdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("software_licenses46b7c"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDashboard:AFVK:v1",setdfd_assetdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("licenses_near_expiry46af3"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDashboard:AFVK:v1",setdfd_assetdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("pending_disposal38551"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDashboard:AFVK:v1",setdfd_assetdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("pending_disposal_descriptionceadc"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDashboard:AFVK:v1",setdfd_assetdashboard_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_idbd7bd"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_tagafbdd"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name1ef31"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category2a9d0"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("serial_no3915b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assigned_toe3252"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("locationee1a6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("warranty_expiryc5b88"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name4d2a5"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("maint_typee7fac"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("descriptionb10c9"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vendor_name73ece"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("scheduled_date67fe7"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cost3b16a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("maint_ida5387"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("product_nameff649"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("license_typee6826"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("seats_total28de1"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("seats_used897a3"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expiry_date7d6c7"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cost6edbe"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("license_idc0471"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name251dd"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_method84ead"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("reason441ae"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("current_value047d6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("data_wiped9be82"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("status00e2a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_id29a99"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_tage74f0"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name13b83"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category2ca3f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("serial_no3f2a9"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assigned_to28cfb"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("location7cca5"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("warranty_expiryd159c"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_id0e8f6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_tagd67f5"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name64bee"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category3fb9d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("serial_no107f3"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assigned_toea420"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("location96640"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("warranty_expiryd732d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearch9e02b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_id3883f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_name3613b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategoryCombo:AFVK:v1",setdfd_assetcategorycombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_type91879"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetTypeCombo:AFVK:v1",setdfd_assettypecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_namea35ee"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_tagcb5cb"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_codeaa68d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("serial_numbera45cf"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("model_number32271"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("manufacturerb8d3f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("classification8722b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetClassificationCombo:AFVK:v1",setdfd_assetclassificationcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("data_classification45708"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDataClassificationCombo:AFVK:v1",setdfd_assetdataclassificationcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ownership_type1a506"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:ownershipTypeCombo:AFVK:v1",setdfd_ownershiptypecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lifecycle_stage1446e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_condition414c5"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetConditionCombo:AFVK:v1",setdfd_assetconditioncombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("risk_levelf1e8c"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:riskLevelCombo:AFVK:v1",setdfd_risklevelcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("is_critical0f006"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("location2ff4b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("description09f58"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vendor_name4190d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:vendorNameCombo:AFVK:v1",setdfd_vendornamecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("purchase_costff91e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("currency823ac"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("purchase_datec1162"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("warranty_expiry1fdec"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("current_value8f6cd"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("depreciation_rate8d4a6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("salvage_valuef1995"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_methodd33dc"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:disposalMethodCombo:AFVK:v1",setdfd_disposalmethodcombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_date920f2"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_ref075d5"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_idb6b5a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_name2dc3c"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_typecdf86"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name4044f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_tag665c1"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_code9d69b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("serial_number67791"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("model_number46a87"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("manufacturer825e8"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("classificationf4888"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("data_classificationb7d47"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("ownership_type783c2"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("lifecycle_stage26be5"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_condition4d358"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("risk_level7f64b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("description70aff"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vendor_name1f183"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("purchase_cost899f9"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("currency0f0b1"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("purchase_date9a646"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("warranty_expirye6615"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("depreciation_ratea6497"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("salvage_value9adb6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("current_value8e31d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_method1fd3c"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_dateb9385"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_ref35f4b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_named7764"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_tag5b0ef"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_nameb3bdb"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_typebe078"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("location0b4e4"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_id4d81b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",setdfd_assets_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_id358d1"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDocTable:AFVK:v1",setdfd_assetdoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name7dfbc"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDocTable:AFVK:v1",setdfd_assetdoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("attachment_id185f0"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDocTable:AFVK:v1",setdfd_assetdoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_group6421d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDocTable:AFVK:v1",setdfd_assetdoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_name41b3b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDocTable:AFVK:v1",setdfd_assetdoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_date2eb99"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDocTable:AFVK:v1",setdfd_assetdoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_byfae15"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDocTable:AFVK:v1",setdfd_assetdoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("documentviewerd3b4b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDocTable:AFVK:v1",setdfd_assetdoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("attachment_id4eeac"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDocTable:AFVK:v1",setdfd_assetdoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_group82055"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDocTable:AFVK:v1",setdfd_assetdoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_name1f607"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDocTable:AFVK:v1",setdfd_assetdoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_byad133"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDocTable:AFVK:v1",setdfd_assetdoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_namedaa81"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assigned_toba6cd"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assigned_byba0b9"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assigned_atc4b88"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expected_return_date910b8"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("condition_at_assigne0685"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("status7fb4b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearch9256e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assign_id31be8"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name56fec"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetNameCombo:AFVK:v1",setdfd_assetnamecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assigned_tof8f17"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assigned_byc4563"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assigned_at45db5"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assignment_statusa6f80"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assignmentStatusCombo:AFVK:v1",setdfd_assignmentstatuscombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("condition_at_assign27aff"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetConditionCombo:AFVK:v1",setdfd_assetconditioncombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expected_return_date15cfe"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("actual_return_date06574"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("returned_atb4ccc"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("condition_at_return40b7c"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:conditionAtReturnCombo:AFVK:v1",setdfd_conditionatreturncombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("approved_by8c220"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("approval_statuseb2b2"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:approvalStatusCombo:AFVK:v1",setdfd_approvalstatuscombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assignment_notese758f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("acknowledgement_signedfdaee"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assign_idb53db"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name39101"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assigned_toad6a1"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assigned_byaa464"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assigned_atca20b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assignment_status1057b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("condition_at_assignf6852"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expected_return_datedf53d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("actual_return_datec1f64"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("returned_atecafb"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("condition_at_return1d3c7"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("approved_by2b89c"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("approval_statusf07b0"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("acknowledgement_signed5ee58"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assignment_notes59be1"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_named51ee"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assigned_to51299"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assigned_bycb5ab"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("condition_at_assignc35c4"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expected_return_date11169"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",setdfd_assetassignments_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assign_id67308"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assignDocTable:AFVK:v1",setdfd_assigndoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_namee1fc6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assignDocTable:AFVK:v1",setdfd_assigndoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assigned_to72696"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assignDocTable:AFVK:v1",setdfd_assigndoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("attachment_id0c7b6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assignDocTable:AFVK:v1",setdfd_assigndoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_group8e81a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assignDocTable:AFVK:v1",setdfd_assigndoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_nameb994a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assignDocTable:AFVK:v1",setdfd_assigndoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_date26a21"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assignDocTable:AFVK:v1",setdfd_assigndoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_by95da2"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assignDocTable:AFVK:v1",setdfd_assigndoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_group796b8"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assignDocTable:AFVK:v1",setdfd_assigndoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_name19bda"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assignDocTable:AFVK:v1",setdfd_assigndoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_by4c93f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assignDocTable:AFVK:v1",setdfd_assigndoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("assign_id67319"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assignDocTable:AFVK:v1",setdfd_assigndoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_nameba6cd"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("maint_typeba0b9"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("descriptionc4b88"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vendor_name910b8"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("scheduled_datee0685"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cost7fb4b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearch64153"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("maint_id9587d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_namec21fd"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("maint_typea5ba4"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("priorityec586"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("scheduled_date83e9d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("completed_dated052f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("next_maintenance_datee871a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("performed_bycb4dc"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vendor_name17b17"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vendor_referencefa982"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("downtime_hours721c7"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cost35190"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("descriptioneaa55"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("maintenance_checklist024ed"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name9f8b1"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("maint_typefc524"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("priority1b975"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("schedule_dateef711"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("performed_byc179b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("maint_id927de"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1",setdfd_assetmaintenance_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_id46e83"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_methodba6cd"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_datee0685"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("witness_nameba0b9"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("data_wipe_methodc4b88"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_cost910b8"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vendor_nameabdbb"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name819e8"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_methoddeb30"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_date12263"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("reasonadb68"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("approval_reference5e1aa"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("witness_nameac8f7"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("data_wipe_methodfe1e6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("data_wipedad12b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_valued21f4"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_cost031f6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("resale_amount2eb0e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vendor_name5f557"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name298df"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_methoda093b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_date247ef"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("reason8b938"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("approval_referenceb0a46"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("witness_name6fddf"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("data_wipe_method8923d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("data_wipeda4257"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_value13578"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_cost23f44"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("resale_amount5336f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("disposal_idee44c"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",setdfd_assetdisposal_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("total_categories55fa9"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategoryCards:AFVK:v1",setdfd_assetcategorycards_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("software_category5cc47"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategoryCards:AFVK:v1",setdfd_assetcategorycards_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("hardware_categoryad98e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategoryCards:AFVK:v1",setdfd_assetcategorycards_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("required_maintenance9ce1e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategoryCards:AFVK:v1",setdfd_assetcategorycards_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("acat_id37980"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_code97856"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_prefix8b10c"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_name11d7f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("depreciation_method2b046"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("useful_life_years73932"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("advancesearchfab99"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("acat_idba9a2"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_code60d4a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_name69309"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("parent_category_namec5eb6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_prefix16715"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("depreciation_methodfa7cb"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("useful_life_years231a3"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_codef16a8"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_namecbc0b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("depreciation_method0e872"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("useful_life_yearsa64db"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("maintenance_required336be"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("acat_id9127b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("acat_id298b7"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_codeeb8f1"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_name2a1ea"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("parent_category_name9a67f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_prefix5007a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("depreciation_method50f2f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("useful_life_years864b4"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1",setdfd_assetcategory_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("acat_idf572e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:categoryDocTable:AFVK:v1",setdfd_categorydoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("acat_ida2d51"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:categoryDocTable:AFVK:v1",setdfd_categorydoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("category_name4ccfb"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:categoryDocTable:AFVK:v1",setdfd_categorydoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("attachment_id9b438"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:categoryDocTable:AFVK:v1",setdfd_categorydoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_group344aa"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:categoryDocTable:AFVK:v1",setdfd_categorydoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_namef124d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:categoryDocTable:AFVK:v1",setdfd_categorydoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_date16faa"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:categoryDocTable:AFVK:v1",setdfd_categorydoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_byfb6e3"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:categoryDocTable:AFVK:v1",setdfd_categorydoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("license_id87b4a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("product_namedaa81"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("license_typeba0b9"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("seats_totalc4b88"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("seats_used910b8"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expiry_date7fb4b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cost0d30b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("license_id07bf2"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_namee8382"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetNameCombo:AFVK:v1",setdfd_assetnamecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("product_namec9548"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vendor_nameb519a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:vendorNameCombo:AFVK:v1",setdfd_vendornamecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("license_typeae36b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:licenseTypeCombo:AFVK:v1",setdfd_licensetypecombo_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("license_keyd5b6f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("seats_total6dbc7"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("seats_useddd434"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("auto_renewalb4694"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("purchase_datebfe70"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expiry_date5c034"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("support_expiry4ec2c"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("costf9899"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("license_id49b2a"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("asset_name1ae9b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("product_name11c98"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("vendor_namef2df8"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("license_typec8c15"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("license_keyab6d1"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("seats_total8b54b"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("seats_used3bba9"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("auto_renewal3bee1"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("purchase_date884a6"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("expiry_date74df0"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("support_expirybfd9e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("cost2568f"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("product_namead2dd"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("license_typecec9e"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("auto_renewal8e280"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("seats_totalf37ee"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("seats_used8c8d5"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("license_id027b5"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",setdfd_assetsoftwarelicenses_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("license_idbc5e1"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:softwareDocTable:AFVK:v1",setdfd_softwaredoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("license_idd34c8"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:softwareDocTable:AFVK:v1",setdfd_softwaredoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("product_name405f8"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:softwareDocTable:AFVK:v1",setdfd_softwaredoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("attachment_id1138d"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:softwareDocTable:AFVK:v1",setdfd_softwaredoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_group3dcd4"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:softwareDocTable:AFVK:v1",setdfd_softwaredoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("doc_name698d2"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:softwareDocTable:AFVK:v1",setdfd_softwaredoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_date0acd9"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:softwareDocTable:AFVK:v1",setdfd_softwaredoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
            if("trs_created_by0c4db"==nodename){
                dfdRefreshContext("CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:softwareDocTable:AFVK:v1",setdfd_softwaredoctable_v1Props,page,count,dpdEncryption,toast,token);
            }
    };
}

 