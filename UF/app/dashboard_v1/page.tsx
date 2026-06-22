'use client'
import React,{ useContext,useEffect,useState,useRef } from "react";
import { AxiosService } from '@/app/components/axiosService';
import { te_refreshDto,api_paginationDto } from '@/app/interfaces/interfaces';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from "../globalContext";
import decodeToken from "../components/decodeToken";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode } from "@/types/global";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import clsx from "clsx";
import dynamic from 'next/dynamic';
const Groupasset_dashboard_group = dynamic(() => import("./Groupasset_dashboard_group/Groupasset_dashboard_group"), { ssr: false });
const Grouptable_group = dynamic(() => import("./Grouptable_group/Grouptable_group"), { ssr: false });


export default function PageDashboardV1() {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "Maker": {
    "allowedGroups": [
      "canvas",
      "asset_dashboard_group",
      "total_asset_group",
      "maintenance_due_group",
      "warranty_expiring_group",
      "software_licenses_group",
      "pending_disposal_group",
      "table_group",
      "subscreen",
      "ct006_af_uf_ufws_ecp_ams_asset_v1",
      "asset_table_group",
      "asset_table",
      "ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1",
      "asset_maintenance_table_group",
      "asset_maintenance_table",
      "ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1",
      "asset_software_licenses_table_group",
      "asset_software_licenses_table",
      "ct006_af_uf_ufws_ecp_ams_assetdisposal_v1",
      "asset_disposal_table_group",
      "asset_disposal_table",
      "ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1",
      "warrenty_expiring_table_group",
      "warrenty_expiring_table"
    ]
  },
  "Checker": {
    "allowedGroups": [
      "canvas",
      "asset_dashboard_group",
      "total_asset_group",
      "maintenance_due_group",
      "warranty_expiring_group",
      "software_licenses_group",
      "pending_disposal_group",
      "table_group",
      "subscreen",
      "ct006_af_uf_ufws_ecp_ams_asset_v1",
      "asset_table_group",
      "asset_table",
      "ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1",
      "asset_maintenance_table_group",
      "asset_maintenance_table",
      "ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1",
      "asset_software_licenses_table_group",
      "asset_software_licenses_table",
      "ct006_af_uf_ufws_ecp_ams_assetdisposal_v1",
      "asset_disposal_table_group",
      "asset_disposal_table",
      "ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1",
      "warrenty_expiring_table_group",
      "warrenty_expiring_table"
    ]
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "asset_dashboard_group": {},
  "total_asset_group": {
    "total_asset_divider": {
      "show": false
    },
    "total_assest_text": {
      "show": false
    },
    "total_assest": {
      "show": false
    },
    "it_assets": {
      "show": false
    }
  },
  "maintenance_due_group": {
    "maintenance_due_divider": {
      "show": false
    },
    "maintenance_due_text": {
      "show": false
    },
    "maintenance_due": {
      "show": false
    },
    "overdue_maintenance": {
      "show": false
    }
  },
  "warranty_expiring_group": {
    "warranty_expiring_divider": {
      "show": false
    },
    "warranty_expiring_text": {
      "show": false
    },
    "warranty_expiring": {
      "show": false
    },
    "warranty_description": {
      "show": false
    }
  },
  "software_licenses_group": {
    "software_licenses_divider": {
      "show": false
    },
    "software_licenses_text": {
      "show": false
    },
    "software_licenses": {
      "show": false
    },
    "licenses_near_expiry": {
      "show": false
    }
  },
  "pending_disposal_group": {
    "pending_disposal_divider": {
      "show": false
    },
    "pending_disposal_text": {
      "show": false
    },
    "pending_disposal": {
      "show": false
    },
    "pending_disposal_description": {
      "show": false
    }
  },
  "table_group": {
    "status": {
      "show": false
    }
  },
  "subscreen": {},
  "ct006_af_uf_ufws_ecp_ams_asset_v1": {},
  "asset_table_group": {},
  "asset_table": {
    "asset_id": {
      "show": false
    },
    "asset_tag": {
      "show": false
    },
    "asset_name": {
      "show": false
    },
    "category": {
      "show": false
    },
    "serial_no": {
      "show": false
    },
    "assigned_to": {
      "show": false
    },
    "location": {
      "show": false
    },
    "warranty_expiry": {
      "show": false
    }
  },
  "ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1": {},
  "asset_maintenance_table_group": {},
  "asset_maintenance_table": {
    "ref": {
      "show": false
    },
    "asset_name": {
      "show": false
    },
    "maint_type": {
      "show": false
    },
    "description": {
      "show": false
    },
    "vendor_name": {
      "show": false
    },
    "scheduled_date": {
      "show": false
    },
    "cost": {
      "show": false
    },
    "status": {
      "show": false
    },
    "maint_id": {
      "show": false
    }
  },
  "ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1": {},
  "asset_software_licenses_table_group": {},
  "asset_software_licenses_table": {
    "product_name": {
      "show": false
    },
    "license_type": {
      "show": false
    },
    "seats_total": {
      "show": false
    },
    "seats_used": {
      "show": false
    },
    "expiry_date": {
      "show": false
    },
    "cost": {
      "show": false
    },
    "license_id": {
      "show": false
    }
  },
  "ct006_af_uf_ufws_ecp_ams_assetdisposal_v1": {},
  "asset_disposal_table_group": {},
  "asset_disposal_table": {
    "asset_name": {
      "show": false
    },
    "disposal_method": {
      "show": false
    },
    "reason": {
      "show": false
    },
    "current_value": {
      "show": false
    },
    "data_wiped": {
      "show": false
    },
    "status": {
      "show": false
    }
  },
  "ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1": {},
  "warrenty_expiring_table_group": {},
  "warrenty_expiring_table": {
    "asset_id": {
      "show": false
    },
    "asset_tag": {
      "show": false
    },
    "asset_name": {
      "show": false
    },
    "category": {
      "show": false
    },
    "serial_no": {
      "show": false
    },
    "assigned_to": {
      "show": false
    },
    "location": {
      "show": false
    },
    "warranty_expiry": {
      "show": false
    }
  }
}
  const token:string = getCookie('token'); 
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "dashboard";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {assetdasboard_v1, setassetdasboard_v1} = useContext(TotalContext) as TotalContextProps;
  const {assetdasboard_v1Props, setassetdasboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkasset_dashboard_group,setCheckasset_dashboard_group,]=useState<boolean>(false);
  const [checktotal_asset_group,setChecktotal_asset_group,]=useState<boolean>(false);
  const [checkmaintenance_due_group,setCheckmaintenance_due_group,]=useState<boolean>(false);
  const [checkwarranty_expiring_group,setCheckwarranty_expiring_group,]=useState<boolean>(false);
  const [checksoftware_licenses_group,setChecksoftware_licenses_group,]=useState<boolean>(false);
  const [checkpending_disposal_group,setCheckpending_disposal_group,]=useState<boolean>(false);
  const [checktable_group,setChecktable_group,]=useState<boolean>(false);
  const [checksubscreen,setChecksubscreen,]=useState<boolean>(false);
  const [checkct006_af_uf_ufws_ecp_ams_asset_v1,setCheckct006_af_uf_ufws_ecp_ams_asset_v1,]=useState<boolean>(false);
  const [checkasset_table_group,setCheckasset_table_group,]=useState<boolean>(false);
  const [checkasset_table,setCheckasset_table,]=useState<boolean>(false);
  const [checkct006_af_uf_ufws_ecp_ams_assetmaintenance_v1,setCheckct006_af_uf_ufws_ecp_ams_assetmaintenance_v1,]=useState<boolean>(false);
  const [checkasset_maintenance_table_group,setCheckasset_maintenance_table_group,]=useState<boolean>(false);
  const [checkasset_maintenance_table,setCheckasset_maintenance_table,]=useState<boolean>(false);
  const [checkct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1,setCheckct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1,]=useState<boolean>(false);
  const [checkasset_software_licenses_table_group,setCheckasset_software_licenses_table_group,]=useState<boolean>(false);
  const [checkasset_software_licenses_table,setCheckasset_software_licenses_table,]=useState<boolean>(false);
  const [checkct006_af_uf_ufws_ecp_ams_assetdisposal_v1,setCheckct006_af_uf_ufws_ecp_ams_assetdisposal_v1,]=useState<boolean>(false);
  const [checkasset_disposal_table_group,setCheckasset_disposal_table_group,]=useState<boolean>(false);
  const [checkasset_disposal_table,setCheckasset_disposal_table,]=useState<boolean>(false);
  const [checkct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1,setCheckct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1,]=useState<boolean>(false);
  const [checkwarrenty_expiring_table_group,setCheckwarrenty_expiring_table_group,]=useState<boolean>(false);
  const [checkwarrenty_expiring_table,setCheckwarrenty_expiring_table,]=useState<boolean>(false);
  const {asset_dashboard_group4d6cb, setasset_dashboard_group4d6cb} = useContext(TotalContext) as TotalContextProps;
  const {total_asset_group69aa9, settotal_asset_group69aa9} = useContext(TotalContext) as TotalContextProps;
  const {maintenance_due_group704ca, setmaintenance_due_group704ca} = useContext(TotalContext) as TotalContextProps;
  const {warranty_expiring_groupb5bd4, setwarranty_expiring_groupb5bd4} = useContext(TotalContext) as TotalContextProps;
  const {software_licenses_group4beb5, setsoftware_licenses_group4beb5} = useContext(TotalContext) as TotalContextProps;
  const {pending_disposal_group2580d, setpending_disposal_group2580d} = useContext(TotalContext) as TotalContextProps;
  const {table_group94010, settable_group94010} = useContext(TotalContext) as TotalContextProps;
  const {subscreen99589, setsubscreen99589} = useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_asset_v104dc1, setct006_af_uf_ufws_ecp_ams_asset_v104dc1} = useContext(TotalContext) as TotalContextProps;
  const {asset_table_group6fffa, setasset_table_group6fffa} = useContext(TotalContext) as TotalContextProps;
  const {asset_table6082a, setasset_table6082a} = useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e, setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e} = useContext(TotalContext) as TotalContextProps;
  const {asset_maintenance_table_groupe042b, setasset_maintenance_table_groupe042b} = useContext(TotalContext) as TotalContextProps;
  const {asset_maintenance_table6cdf1, setasset_maintenance_table6cdf1} = useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426, setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426} = useContext(TotalContext) as TotalContextProps;
  const {asset_software_licenses_table_groupcb553, setasset_software_licenses_table_groupcb553} = useContext(TotalContext) as TotalContextProps;
  const {asset_software_licenses_table13758, setasset_software_licenses_table13758} = useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1, setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1} = useContext(TotalContext) as TotalContextProps;
  const {asset_disposal_table_group329e9, setasset_disposal_table_group329e9} = useContext(TotalContext) as TotalContextProps;
  const {asset_disposal_table440cd, setasset_disposal_table440cd} = useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7, setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7} = useContext(TotalContext) as TotalContextProps;
  const {warrenty_expiring_table_group116d1, setwarrenty_expiring_table_group116d1} = useContext(TotalContext) as TotalContextProps;
  const {warrenty_expiring_tablee3168, setwarrenty_expiring_tablee3168} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetdashboard_v1Props, setdfd_assetdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assets_v1Props, setdfd_assets_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetmaintenance_v1Props, setdfd_assetmaintenance_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetsoftwarelicenses_v1Props, setdfd_assetsoftwarelicenses_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetdisposal_v1Props, setdfd_assetdisposal_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [controlData, setControlData] = useState<any>({});
  const [groupData, setGroupData] = useState<any>({});
  const encryptionFlagPage: boolean = false|| encAppFalg.flag;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encAppFalg.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encAppFalg.method;
  let encryptionFlagPageData : EncryptionFlagPageData ={
    "flag":encryptionFlagPage,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  }
  const [paginationDetails, setpaginationDetails] = useState<Record<string, any>>({});
  const [paginationData,setPaginationData]=useState<PaginationData>({count:10,page:1})
    const prevRefreshRef = useRef<any>({
      assetdashboard_v1:false,
      assets_v1:false,
      assetmaintenance_v1:false,
      assetsoftwarelicenses_v1:false,
      assetdisposal_v1:false,
    });
    async function assetdashboard_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assetdashboard_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDashboard:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assetdashboard_v1Body["dpdKey"] = encryptionDpd;
          assetdashboard_v1Body["method"] = encryptionMethod;
        }
        if(assetdasboard_v1Props.length > 0){
          for(let i=0;i< assetdasboard_v1Props.length;i++){
            if(assetdasboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDashboard:AFVK:v1"){
              // delete assetdasboard_v1Props[i].DFDkey;
              let temp=structuredClone(assetdasboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assetdashboard_v1Body['filterData'] = filterData;
        }
        const assetdashboard_v1Data:any=await AxiosService.post("/te/eventEmitter",assetdashboard_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assetdashboard_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assetdashboard_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
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
        setdfd_assetdashboard_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assetdashboard_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assetdashboard_v1Data?.data?.dataset) {
           setdfd_assetdashboard_v1Props(
              Array.isArray(assetdashboard_v1Data?.data?.dataset?.data)
                 ? assetdashboard_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
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
        setdfd_assetdashboard_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assetdashboard_v1) {
      assetdashboard_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assetdashboard_v1= true
  },[refetch?.assetdashboard_v1])
    async function assets_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assets_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assets_v1Body["dpdKey"] = encryptionDpd;
          assets_v1Body["method"] = encryptionMethod;
        }
        if(assetdasboard_v1Props.length > 0){
          for(let i=0;i< assetdasboard_v1Props.length;i++){
            if(assetdasboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1"){
              // delete assetdasboard_v1Props[i].DFDkey;
              let temp=structuredClone(assetdasboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assets_v1Body['filterData'] = filterData;
        }
        const assets_v1Data:any=await AxiosService.post("/te/eventEmitter",assets_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assets_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assets_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
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
        setdfd_assets_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assets_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assets_v1Data?.data?.dataset) {
           setdfd_assets_v1Props(
              Array.isArray(assets_v1Data?.data?.dataset?.data)
                 ? assets_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
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
        setdfd_assets_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assets_v1) {
      assets_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assets_v1= true
  },[refetch?.assets_v1])
    async function assetmaintenance_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assetmaintenance_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assetmaintenance_v1Body["dpdKey"] = encryptionDpd;
          assetmaintenance_v1Body["method"] = encryptionMethod;
        }
        if(assetdasboard_v1Props.length > 0){
          for(let i=0;i< assetdasboard_v1Props.length;i++){
            if(assetdasboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1"){
              // delete assetdasboard_v1Props[i].DFDkey;
              let temp=structuredClone(assetdasboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assetmaintenance_v1Body['filterData'] = filterData;
        }
        const assetmaintenance_v1Data:any=await AxiosService.post("/te/eventEmitter",assetmaintenance_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assetmaintenance_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assetmaintenance_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
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
        setdfd_assetmaintenance_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assetmaintenance_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assetmaintenance_v1Data?.data?.dataset) {
           setdfd_assetmaintenance_v1Props(
              Array.isArray(assetmaintenance_v1Data?.data?.dataset?.data)
                 ? assetmaintenance_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
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
        setdfd_assetmaintenance_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assetmaintenance_v1) {
      assetmaintenance_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assetmaintenance_v1= true
  },[refetch?.assetmaintenance_v1])
    async function assetsoftwarelicenses_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assetsoftwarelicenses_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assetsoftwarelicenses_v1Body["dpdKey"] = encryptionDpd;
          assetsoftwarelicenses_v1Body["method"] = encryptionMethod;
        }
        if(assetdasboard_v1Props.length > 0){
          for(let i=0;i< assetdasboard_v1Props.length;i++){
            if(assetdasboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1"){
              // delete assetdasboard_v1Props[i].DFDkey;
              let temp=structuredClone(assetdasboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assetsoftwarelicenses_v1Body['filterData'] = filterData;
        }
        const assetsoftwarelicenses_v1Data:any=await AxiosService.post("/te/eventEmitter",assetsoftwarelicenses_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assetsoftwarelicenses_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assetsoftwarelicenses_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
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
        setdfd_assetsoftwarelicenses_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assetsoftwarelicenses_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assetsoftwarelicenses_v1Data?.data?.dataset) {
           setdfd_assetsoftwarelicenses_v1Props(
              Array.isArray(assetsoftwarelicenses_v1Data?.data?.dataset?.data)
                 ? assetsoftwarelicenses_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
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
        setdfd_assetsoftwarelicenses_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assetsoftwarelicenses_v1) {
      assetsoftwarelicenses_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assetsoftwarelicenses_v1= true
  },[refetch?.assetsoftwarelicenses_v1])
    async function assetdisposal_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assetdisposal_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assetdisposal_v1Body["dpdKey"] = encryptionDpd;
          assetdisposal_v1Body["method"] = encryptionMethod;
        }
        if(assetdasboard_v1Props.length > 0){
          for(let i=0;i< assetdasboard_v1Props.length;i++){
            if(assetdasboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1"){
              // delete assetdasboard_v1Props[i].DFDkey;
              let temp=structuredClone(assetdasboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assetdisposal_v1Body['filterData'] = filterData;
        }
        const assetdisposal_v1Data:any=await AxiosService.post("/te/eventEmitter",assetdisposal_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assetdisposal_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assetdisposal_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
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
        setdfd_assetdisposal_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assetdisposal_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assetdisposal_v1Data?.data?.dataset) {
           setdfd_assetdisposal_v1Props(
              Array.isArray(assetdisposal_v1Data?.data?.dataset?.data)
                 ? assetdisposal_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
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
        setdfd_assetdisposal_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assetdisposal_v1) {
      assetdisposal_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assetdisposal_v1= true
  },[refetch?.assetdisposal_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setassetdasboard_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const data: any = await fetchBatchData(
      'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDasboard:AFVK:v1',
      [user],
      'pageDashboardV1',
      token
    )
    const orchestrationData: any = data.pageData
    setGroupData(data.groupData || {});
    setControlData(data.controlData || {});
    const security:string = orchestrationData?.security;
    const allowedGroup: AllowedGroupNode[] = orchestrationData?.allowedGroup||[];
    code = orchestrationData?.code;
    const pagination:any = orchestrationData?.action?.pagination;
    setpaginationDetails({
      page: +orchestrationData?.action?.pagination?.page || 0,
      pageSize: +orchestrationData?.action?.pagination?.count || 0
    })
    if("artfactPFRule" in orchestrationData && orchestrationData?.artfactPFRule?.nodes?.length>0){
      await handleArtfactRule(orchestrationData?.artfactPFRule,{...decodedTokenObj},allRuleData)  
    }
    if (token) {
      try {
        let introspect:any;
        if(encryptionFlagPage){
           introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              dpdKey: encryptionDpd,
              method: encryptionMethod,
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDasboard:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDasboard:AFVK:v1"  
            }
          })          
        }
        if(introspect?.data?.authenticated === false){
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct006/ecp/ams/v1';
        }
      }catch (err: any) {
        toast("The token is no longer active.", 'danger');
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct006/ecp/ams/v1';
      }
      try {
        if(encryptionFlagPage){
          await AxiosService.get("/UF/myAccount-for-client",{
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
              dpdKey: encryptionDpd,
              method: encryptionMethod,
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDasboard:AFVK:v1"
            }
        })
        }else{
          await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDasboard:AFVK:v1"
            }
         })
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await assetdashboard_v1DFD(pagination)
    await assets_v1DFD(pagination)
    await assetmaintenance_v1DFD(pagination)
    await assetsoftwarelicenses_v1DFD(pagination)
    await assetdisposal_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'asset_dashboard_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckasset_dashboard_group(true)
            }
            if(nodes?.groupName == 'total_asset_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktotal_asset_group(true)
            }
            if(nodes?.groupName == 'maintenance_due_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckmaintenance_due_group(true)
            }
            if(nodes?.groupName == 'warranty_expiring_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckwarranty_expiring_group(true)
            }
            if(nodes?.groupName == 'software_licenses_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecksoftware_licenses_group(true)
            }
            if(nodes?.groupName == 'pending_disposal_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckpending_disposal_group(true)
            }
            if(nodes?.groupName == 'table_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktable_group(true)
            }
            if(nodes?.groupName == 'subscreen' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecksubscreen(true)
            }
            if(nodes?.groupName == 'CT006_AF_UF_UFWS_ECP_AMS_asset_v1' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckct006_af_uf_ufws_ecp_ams_asset_v1(true)
            }
            if(nodes?.groupName == 'asset_table_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckasset_table_group(true)
            }
            if(nodes?.groupName == 'asset_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckasset_table(true)
            }
            if(nodes?.groupName == 'CT006_AF_UF_UFWS_ECP_AMS_assetMaintenance_v1' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckct006_af_uf_ufws_ecp_ams_assetmaintenance_v1(true)
            }
            if(nodes?.groupName == 'asset_maintenance_table_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckasset_maintenance_table_group(true)
            }
            if(nodes?.groupName == 'asset_maintenance_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckasset_maintenance_table(true)
            }
            if(nodes?.groupName == 'CT006_AF_UF_UFWS_ECP_AMS_assetSoftwareLicenses_v1' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1(true)
            }
            if(nodes?.groupName == 'asset_software_licenses_table_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckasset_software_licenses_table_group(true)
            }
            if(nodes?.groupName == 'asset_software_licenses_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckasset_software_licenses_table(true)
            }
            if(nodes?.groupName == 'CT006_AF_UF_UFWS_ECP_AMS_assetDisposal_v1' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckct006_af_uf_ufws_ecp_ams_assetdisposal_v1(true)
            }
            if(nodes?.groupName == 'asset_disposal_table_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckasset_disposal_table_group(true)
            }
            if(nodes?.groupName == 'asset_disposal_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckasset_disposal_table(true)
            }
            if(nodes?.groupName == 'CT006_AF_UF_UFWS_ECP_AMS_warrentyExpiring_v1' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1(true)
            }
            if(nodes?.groupName == 'warrenty_expiring_table_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckwarrenty_expiring_table_group(true)
            }
            if(nodes?.groupName == 'warrenty_expiring_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckwarrenty_expiring_table(true)
            }
          })
          }
           }catch(err:any)
          {
            if( typeof err =='string')
              toast(err, 'danger');
            else
              toast(err?.response?.data?.message, 'danger');
          }
        /////////
        //Code Execution
        if (code !="" ) {
          let codeStates: Record<string, any> = {}
          codeStates['asset_dashboard_group'] = asset_dashboard_group4d6cb;
          codeStates['setasset_dashboard_group'] = setasset_dashboard_group4d6cb;
          codeStates['total_asset_group'] = total_asset_group69aa9;
          codeStates['settotal_asset_group'] = settotal_asset_group69aa9;
          codeStates['maintenance_due_group'] = maintenance_due_group704ca;
          codeStates['setmaintenance_due_group'] = setmaintenance_due_group704ca;
          codeStates['warranty_expiring_group'] = warranty_expiring_groupb5bd4;
          codeStates['setwarranty_expiring_group'] = setwarranty_expiring_groupb5bd4;
          codeStates['software_licenses_group'] = software_licenses_group4beb5;
          codeStates['setsoftware_licenses_group'] = setsoftware_licenses_group4beb5;
          codeStates['pending_disposal_group'] = pending_disposal_group2580d;
          codeStates['setpending_disposal_group'] = setpending_disposal_group2580d;
          codeStates['table_group'] = table_group94010;
          codeStates['settable_group'] = settable_group94010;
          codeStates['subscreen'] = subscreen99589;
          codeStates['setsubscreen'] = setsubscreen99589;
          codeStates['ct006_af_uf_ufws_ecp_ams_asset_v1'] = ct006_af_uf_ufws_ecp_ams_asset_v104dc1;
          codeStates['setct006_af_uf_ufws_ecp_ams_asset_v1'] = setct006_af_uf_ufws_ecp_ams_asset_v104dc1;
          codeStates['asset_table_group'] = asset_table_group6fffa;
          codeStates['setasset_table_group'] = setasset_table_group6fffa;
          codeStates['asset_table'] = asset_table6082a;
          codeStates['setasset_table'] = setasset_table6082a;
          codeStates['ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1'] = ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e;
          codeStates['setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1'] = setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e;
          codeStates['asset_maintenance_table_group'] = asset_maintenance_table_groupe042b;
          codeStates['setasset_maintenance_table_group'] = setasset_maintenance_table_groupe042b;
          codeStates['asset_maintenance_table'] = asset_maintenance_table6cdf1;
          codeStates['setasset_maintenance_table'] = setasset_maintenance_table6cdf1;
          codeStates['ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1'] = ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426;
          codeStates['setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1'] = setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426;
          codeStates['asset_software_licenses_table_group'] = asset_software_licenses_table_groupcb553;
          codeStates['setasset_software_licenses_table_group'] = setasset_software_licenses_table_groupcb553;
          codeStates['asset_software_licenses_table'] = asset_software_licenses_table13758;
          codeStates['setasset_software_licenses_table'] = setasset_software_licenses_table13758;
          codeStates['ct006_af_uf_ufws_ecp_ams_assetdisposal_v1'] = ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1;
          codeStates['setct006_af_uf_ufws_ecp_ams_assetdisposal_v1'] = setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1;
          codeStates['asset_disposal_table_group'] = asset_disposal_table_group329e9;
          codeStates['setasset_disposal_table_group'] = setasset_disposal_table_group329e9;
          codeStates['asset_disposal_table'] = asset_disposal_table440cd;
          codeStates['setasset_disposal_table'] = setasset_disposal_table440cd;
          codeStates['ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1'] = ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7;
          codeStates['setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1'] = setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7;
          codeStates['warrenty_expiring_table_group'] = warrenty_expiring_table_group116d1;
          codeStates['setwarrenty_expiring_table_group'] = setwarrenty_expiring_table_group116d1;
          codeStates['warrenty_expiring_table'] = warrenty_expiring_tablee3168;
          codeStates['setwarrenty_expiring_table'] = setwarrenty_expiring_tablee3168;
          const { codeExecution } = await import("../utils/codeExecution");
          codeExecution(code,codeStates);
        }   
        setInitialLoad(true);        
      } catch (err: any) {
        toast(err?.message, 'danger');
      }
    
    }else{
      toast('token not found','danger');
    }    
  }
  const handleClick = (): void => {
    routes.push("/");
  }
  const handleOnload = (): void => {
  }

  useEffect(() => {    
    setMemoryVariables((prev: Record<string, string>) => ({
      ...prev,
      screenName: screenName,    
    }))
    securityCheck();
    handleOnload();
    setassetdasboard_v1(allRuleData)
  }, [])

  useEffect(()=>{
    if(assetdasboard_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(assetdasboard_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])
  return (
    <>

     <div className={clsx("",
        "w-full",
        isDark ? 'text-white' : 'text-black',
        isProcessing && "pointer-events-none select-none"
      )}
     style={{
        gridColumn: '',
        gridRow: '',
        gridAutoRows: '4px',
        columnGap: '0px',
        rowGap: '0px',
        display: "grid",
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: '',
        height: '',
        overflow: '',
        backgroundColor:bgStyle,
        backgroundImage:'',
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: '',
        color: textStyle,
       // minHeight: '100vh',
        ...(isHighContrast && {
          fontWeight: '500',
          borderWidth: '2px'
      })
      }}>
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="flex items-center gap-3 rounded-xl bg-neutral-900/80 px-6 py-4 text-sm text-white shadow-lg backdrop-blur">
            {/* Spinner */}
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

            {/* Text */}
            <span className="font-medium tracking-wide">
              Processing, please wait…
            </span>
          </div>
        </div>
      )}
        {checkasset_dashboard_group && initialLoad &&<Groupasset_dashboard_group
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          tableData={tableData}
          setTableData={setTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          controlData={controlData} 
          groupData={groupData}        />}
        
        {checktable_group && initialLoad &&<Grouptable_group
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          tableData={tableData}
          setTableData={setTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          controlData={controlData} 
          groupData={groupData}        />}
        
      </div> 
    </>
  )
}
    