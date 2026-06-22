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
const Groupmaintenance_group = dynamic(() => import("./Groupmaintenance_group/Groupmaintenance_group"), { ssr: false });


export default function PageLogmaintenanceV1() {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "Maker": {
    "allowedGroups": [
      "canvas",
      "maintenance_group",
      "maintenance_information_group",
      "execution_details_group",
      "dynamicactions"
    ]
  },
  "Checker": {
    "allowedGroups": [
      "canvas",
      "maintenance_group",
      "maintenance_information_group",
      "execution_details_group",
      "dynamicactions"
    ]
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "maintenance_group": {
    "maint_id": {
      "show": false
    }
  },
  "maintenance_information_group": {
    "maintenance_information_text": {
      "show": false
    },
    "asset_name": {
      "show": false
    },
    "maint_type": {
      "show": false
    },
    "priority": {
      "show": false
    },
    "scheduled_date": {
      "show": false
    },
    "completed_date": {
      "show": false
    },
    "next_maintenance_date": {
      "show": false
    }
  },
  "execution_details_group": {
    "execution_details_text": {
      "show": false
    },
    "performed_by": {
      "show": false
    },
    "vendor_name": {
      "show": false
    },
    "vendor_reference": {
      "show": false
    },
    "downtime_hours": {
      "show": false
    },
    "cost": {
      "show": false
    },
    "description": {
      "show": false
    },
    "maintenance_checklist": {
      "show": false
    }
  },
  "dynamicactions": {
    "button_cancel": {
      "show": false
    },
    "button_update": {
      "show": false
    },
    "schedule": {
      "show": false
    }
  }
}
  const token:string = getCookie('token'); 
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "maintenance";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {logmaintenance_v1, setlogmaintenance_v1} = useContext(TotalContext) as TotalContextProps;
  const {logmaintenance_v1Props, setlogmaintenance_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkmaintenance_group,setCheckmaintenance_group,]=useState<boolean>(false);
  const [checkmaintenance_information_group,setCheckmaintenance_information_group,]=useState<boolean>(false);
  const [checkexecution_details_group,setCheckexecution_details_group,]=useState<boolean>(false);
  const [checkdynamicactions,setCheckdynamicactions,]=useState<boolean>(false);
  const {maintenance_groupdb5a7, setmaintenance_groupdb5a7} = useContext(TotalContext) as TotalContextProps;
  const {maintenance_information_groupea3ac, setmaintenance_information_groupea3ac} = useContext(TotalContext) as TotalContextProps;
  const {execution_details_group591cd, setexecution_details_group591cd} = useContext(TotalContext) as TotalContextProps;
  const {dynamicactions8672d, setdynamicactions8672d} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetnamecombo_v1Props, setdfd_assetnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_maintenancetypecombo_v1Props, setdfd_maintenancetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_prioritycombo_v1Props, setdfd_prioritycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_vendornamecombo_v1Props, setdfd_vendornamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetmaintenance_v1Props, setdfd_assetmaintenance_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      assetnamecombo_v1:false,
      maintenancetypecombo_v1:false,
      prioritycombo_v1:false,
      vendornamecombo_v1:false,
      assetmaintenance_v1:false,
    });
    async function assetnamecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assetnamecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetNameCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assetnamecombo_v1Body["dpdKey"] = encryptionDpd;
          assetnamecombo_v1Body["method"] = encryptionMethod;
        }
        if(logmaintenance_v1Props.length > 0){
          for(let i=0;i< logmaintenance_v1Props.length;i++){
            if(logmaintenance_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetNameCombo:AFVK:v1"){
              // delete logmaintenance_v1Props[i].DFDkey;
              let temp=structuredClone(logmaintenance_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assetnamecombo_v1Body['filterData'] = filterData;
        }
        const assetnamecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",assetnamecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assetnamecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assetnamecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_assetnamecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assetnamecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assetnamecombo_v1Data?.data?.dataset) {
           setdfd_assetnamecombo_v1Props(
              Array.isArray(assetnamecombo_v1Data?.data?.dataset?.data)
                 ? assetnamecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_assetnamecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assetnamecombo_v1) {
      assetnamecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assetnamecombo_v1= true
  },[refetch?.assetnamecombo_v1])
    async function maintenancetypecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let maintenancetypecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:maintenanceTypeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          maintenancetypecombo_v1Body["dpdKey"] = encryptionDpd;
          maintenancetypecombo_v1Body["method"] = encryptionMethod;
        }
        if(logmaintenance_v1Props.length > 0){
          for(let i=0;i< logmaintenance_v1Props.length;i++){
            if(logmaintenance_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:maintenanceTypeCombo:AFVK:v1"){
              // delete logmaintenance_v1Props[i].DFDkey;
              let temp=structuredClone(logmaintenance_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          maintenancetypecombo_v1Body['filterData'] = filterData;
        }
        const maintenancetypecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",maintenancetypecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=maintenancetypecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(maintenancetypecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_maintenancetypecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_maintenancetypecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (maintenancetypecombo_v1Data?.data?.dataset) {
           setdfd_maintenancetypecombo_v1Props(
              Array.isArray(maintenancetypecombo_v1Data?.data?.dataset?.data)
                 ? maintenancetypecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_maintenancetypecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.maintenancetypecombo_v1) {
      maintenancetypecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.maintenancetypecombo_v1= true
  },[refetch?.maintenancetypecombo_v1])
    async function prioritycombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let prioritycombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:priorityCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          prioritycombo_v1Body["dpdKey"] = encryptionDpd;
          prioritycombo_v1Body["method"] = encryptionMethod;
        }
        if(logmaintenance_v1Props.length > 0){
          for(let i=0;i< logmaintenance_v1Props.length;i++){
            if(logmaintenance_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:priorityCombo:AFVK:v1"){
              // delete logmaintenance_v1Props[i].DFDkey;
              let temp=structuredClone(logmaintenance_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          prioritycombo_v1Body['filterData'] = filterData;
        }
        const prioritycombo_v1Data:any=await AxiosService.post("/te/eventEmitter",prioritycombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=prioritycombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(prioritycombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_prioritycombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_prioritycombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (prioritycombo_v1Data?.data?.dataset) {
           setdfd_prioritycombo_v1Props(
              Array.isArray(prioritycombo_v1Data?.data?.dataset?.data)
                 ? prioritycombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_prioritycombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.prioritycombo_v1) {
      prioritycombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.prioritycombo_v1= true
  },[refetch?.prioritycombo_v1])
    async function vendornamecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let vendornamecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:vendorNameCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          vendornamecombo_v1Body["dpdKey"] = encryptionDpd;
          vendornamecombo_v1Body["method"] = encryptionMethod;
        }
        if(logmaintenance_v1Props.length > 0){
          for(let i=0;i< logmaintenance_v1Props.length;i++){
            if(logmaintenance_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:vendorNameCombo:AFVK:v1"){
              // delete logmaintenance_v1Props[i].DFDkey;
              let temp=structuredClone(logmaintenance_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          vendornamecombo_v1Body['filterData'] = filterData;
        }
        const vendornamecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",vendornamecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=vendornamecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(vendornamecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_vendornamecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_vendornamecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (vendornamecombo_v1Data?.data?.dataset) {
           setdfd_vendornamecombo_v1Props(
              Array.isArray(vendornamecombo_v1Data?.data?.dataset?.data)
                 ? vendornamecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_vendornamecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.vendornamecombo_v1) {
      vendornamecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.vendornamecombo_v1= true
  },[refetch?.vendornamecombo_v1])
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
        if(logmaintenance_v1Props.length > 0){
          for(let i=0;i< logmaintenance_v1Props.length;i++){
            if(logmaintenance_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1"){
              // delete logmaintenance_v1Props[i].DFDkey;
              let temp=structuredClone(logmaintenance_v1Props[i])
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
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setlogmaintenance_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const data: any = await fetchBatchData(
      'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:logMaintenance:AFVK:v1',
      [user],
      'pageLogmaintenanceV1',
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:logMaintenance:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:logMaintenance:AFVK:v1"  
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:logMaintenance:AFVK:v1"
            }
        })
        }else{
          await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:logMaintenance:AFVK:v1"
            }
         })
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await assetnamecombo_v1DFD(pagination)
    await maintenancetypecombo_v1DFD(pagination)
    await prioritycombo_v1DFD(pagination)
    await vendornamecombo_v1DFD(pagination)
    await assetmaintenance_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'maintenance_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckmaintenance_group(true)
            }
            if(nodes?.groupName == 'maintenance_information_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckmaintenance_information_group(true)
            }
            if(nodes?.groupName == 'execution_details_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckexecution_details_group(true)
            }
            if(nodes?.groupName == 'dynamicactions' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdynamicactions(true)
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
          codeStates['maintenance_group'] = maintenance_groupdb5a7;
          codeStates['setmaintenance_group'] = setmaintenance_groupdb5a7;
          codeStates['maintenance_information_group'] = maintenance_information_groupea3ac;
          codeStates['setmaintenance_information_group'] = setmaintenance_information_groupea3ac;
          codeStates['execution_details_group'] = execution_details_group591cd;
          codeStates['setexecution_details_group'] = setexecution_details_group591cd;
          codeStates['dynamicactions'] = dynamicactions8672d;
          codeStates['setdynamicactions'] = setdynamicactions8672d;
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
    setlogmaintenance_v1(allRuleData)
  }, [])

  useEffect(()=>{
    if(logmaintenance_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(logmaintenance_v1?._artfactPFRule_,data,allRuleData)
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
        {checkmaintenance_group && initialLoad &&<Groupmaintenance_group
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
    