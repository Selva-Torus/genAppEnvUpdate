'use client'
import React,{ useContext,useEffect,useState,useRef } from "react";
import { AxiosService } from '@/app/components/axiosService';
import { te_refreshDto,api_paginationDto } from '@/app/interfaces/interfaces';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from "../globalContext";
import decodeToken from "../components/decodeToken";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode } from "@/types/global";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import clsx from "clsx";
import dynamic from 'next/dynamic';
import { useGlobal } from '@/context/GlobalContext'
import { logout } from "@/app/components/utils";  
import { getPublicEnv } from "@/app/components/public-env";

const Groupoverall_group = dynamic(() => import("./Groupoverall_group/Groupoverall_group"), { ssr: false });

export default function PageAddkillswitchactionV1({ onReady }: { onReady?: () => void } = {}) {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "AI Product Owner": {
    "blockedGroups": []
  },
  "Auditor": {
    "blockedGroups": []
  },
  "Executive": {
    "blockedGroups": []
  },
  "FinOps / Operation": {
    "blockedGroups": []
  },
  "Model RIsk / Compliance": {
    "blockedGroups": []
  },
  "Platform Administrator": {
    "blockedGroups": []
  },
  "Security (CISO Office)": {
    "blockedGroups": []
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "overall_group": {},
  "action_details_group": {
    "kill_action_id": {
      "show": false
    }
  },
  "action_detail_group": {
    "asset_identity_text": {
      "show": false
    },
    "asset_name": {
      "show": false
    },
    "scope": {
      "show": false
    },
    "trigger_type": {
      "show": false
    },
    "trigger_ref": {
      "show": false
    },
    "reason": {
      "show": false
    }
  },
  "risk_conf_group": {
    "lifecycle_text": {
      "show": false
    },
    "action_no": {
      "show": false
    },
    "sla_seconds": {
      "show": false
    },
    "containment_status": {
      "show": false
    }
  },
  "dynamicactions": {
    "cancel_bt": {
      "show": false
    },
    "update_bt": {
      "show": false
    },
    "save_bt": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "kill switch console";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {addkillswitchaction_v1, setaddkillswitchaction_v1} = useContext(TotalContext) as TotalContextProps;
  const {addkillswitchaction_v1Props, setaddkillswitchaction_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkoverall_group,setCheckoverall_group,]=useState<boolean>(false);
  const [checkaction_details_group,setCheckaction_details_group,]=useState<boolean>(false);
  const [checkaction_detail_group,setCheckaction_detail_group,]=useState<boolean>(false);
  const [checkrisk_conf_group,setCheckrisk_conf_group,]=useState<boolean>(false);
  const [checkdynamicactions,setCheckdynamicactions,]=useState<boolean>(false);
  const {overall_groupe35bf, setoverall_groupe35bf} = useContext(TotalContext) as TotalContextProps;
  const {action_details_group2c58f, setaction_details_group2c58f} = useContext(TotalContext) as TotalContextProps;
  const {action_detail_group4f66c, setaction_detail_group4f66c} = useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupd5f40, setrisk_conf_groupd5f40} = useContext(TotalContext) as TotalContextProps;
  const {dynamicactions512d9, setdynamicactions512d9} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetcodenameconcatcombo_v1Props, setdfd_assetcodenameconcatcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_killswitchscopecombo_v1Props, setdfd_killswitchscopecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_killswitchcontainstatuscombo_v1Props, setdfd_killswitchcontainstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_killswitchtriggertypecombo_v1Props, setdfd_killswitchtriggertypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      assetcodenameconcatcombo_v1:false,
      killswitchscopecombo_v1:false,
      killswitchcontainstatuscombo_v1:false,
      killswitchtriggertypecombo_v1:false,
    });
    async function assetcodenameconcatcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assetcodenameconcatcombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetCodeNameConcatCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assetcodenameconcatcombo_v1Body["dpdKey"] = encryptionDpd;
          assetcodenameconcatcombo_v1Body["method"] = encryptionMethod;
        }
        if(addkillswitchaction_v1Props.length > 0){
          for(let i=0;i< addkillswitchaction_v1Props.length;i++){
            if(addkillswitchaction_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetCodeNameConcatCombo:AFVK:v1"){
              // delete addkillswitchaction_v1Props[i].DFDkey;
              let temp=structuredClone(addkillswitchaction_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assetcodenameconcatcombo_v1Body['filterData'] = filterData;
        }
        const assetcodenameconcatcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",assetcodenameconcatcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assetcodenameconcatcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assetcodenameconcatcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_assetcodenameconcatcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assetcodenameconcatcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assetcodenameconcatcombo_v1Data?.data?.dataset) {
           setdfd_assetcodenameconcatcombo_v1Props(
              Array.isArray(assetcodenameconcatcombo_v1Data?.data?.dataset?.data)
                 ? assetcodenameconcatcombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_assetcodenameconcatcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assetcodenameconcatcombo_v1) {
      assetcodenameconcatcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assetcodenameconcatcombo_v1= true
  },[refetch?.assetcodenameconcatcombo_v1])
    async function killswitchscopecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let killswitchscopecombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:killSwitchScopeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          killswitchscopecombo_v1Body["dpdKey"] = encryptionDpd;
          killswitchscopecombo_v1Body["method"] = encryptionMethod;
        }
        if(addkillswitchaction_v1Props.length > 0){
          for(let i=0;i< addkillswitchaction_v1Props.length;i++){
            if(addkillswitchaction_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:killSwitchScopeCombo:AFVK:v1"){
              // delete addkillswitchaction_v1Props[i].DFDkey;
              let temp=structuredClone(addkillswitchaction_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          killswitchscopecombo_v1Body['filterData'] = filterData;
        }
        const killswitchscopecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",killswitchscopecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=killswitchscopecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(killswitchscopecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_killswitchscopecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_killswitchscopecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (killswitchscopecombo_v1Data?.data?.dataset) {
           setdfd_killswitchscopecombo_v1Props(
              Array.isArray(killswitchscopecombo_v1Data?.data?.dataset?.data)
                 ? killswitchscopecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_killswitchscopecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.killswitchscopecombo_v1) {
      killswitchscopecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.killswitchscopecombo_v1= true
  },[refetch?.killswitchscopecombo_v1])
    async function killswitchcontainstatuscombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let killswitchcontainstatuscombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:killSwitchContainStatusCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          killswitchcontainstatuscombo_v1Body["dpdKey"] = encryptionDpd;
          killswitchcontainstatuscombo_v1Body["method"] = encryptionMethod;
        }
        if(addkillswitchaction_v1Props.length > 0){
          for(let i=0;i< addkillswitchaction_v1Props.length;i++){
            if(addkillswitchaction_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:killSwitchContainStatusCombo:AFVK:v1"){
              // delete addkillswitchaction_v1Props[i].DFDkey;
              let temp=structuredClone(addkillswitchaction_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          killswitchcontainstatuscombo_v1Body['filterData'] = filterData;
        }
        const killswitchcontainstatuscombo_v1Data:any=await AxiosService.post("/te/eventEmitter",killswitchcontainstatuscombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=killswitchcontainstatuscombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(killswitchcontainstatuscombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_killswitchcontainstatuscombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_killswitchcontainstatuscombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (killswitchcontainstatuscombo_v1Data?.data?.dataset) {
           setdfd_killswitchcontainstatuscombo_v1Props(
              Array.isArray(killswitchcontainstatuscombo_v1Data?.data?.dataset?.data)
                 ? killswitchcontainstatuscombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_killswitchcontainstatuscombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.killswitchcontainstatuscombo_v1) {
      killswitchcontainstatuscombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.killswitchcontainstatuscombo_v1= true
  },[refetch?.killswitchcontainstatuscombo_v1])
    async function killswitchtriggertypecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let killswitchtriggertypecombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:killSwitchTriggerTypeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          killswitchtriggertypecombo_v1Body["dpdKey"] = encryptionDpd;
          killswitchtriggertypecombo_v1Body["method"] = encryptionMethod;
        }
        if(addkillswitchaction_v1Props.length > 0){
          for(let i=0;i< addkillswitchaction_v1Props.length;i++){
            if(addkillswitchaction_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:killSwitchTriggerTypeCombo:AFVK:v1"){
              // delete addkillswitchaction_v1Props[i].DFDkey;
              let temp=structuredClone(addkillswitchaction_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          killswitchtriggertypecombo_v1Body['filterData'] = filterData;
        }
        const killswitchtriggertypecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",killswitchtriggertypecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=killswitchtriggertypecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(killswitchtriggertypecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_killswitchtriggertypecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_killswitchtriggertypecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (killswitchtriggertypecombo_v1Data?.data?.dataset) {
           setdfd_killswitchtriggertypecombo_v1Props(
              Array.isArray(killswitchtriggertypecombo_v1Data?.data?.dataset?.data)
                 ? killswitchtriggertypecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_killswitchtriggertypecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.killswitchtriggertypecombo_v1) {
      killswitchtriggertypecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.killswitchtriggertypecombo_v1= true
  },[refetch?.killswitchtriggertypecombo_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setaddkillswitchaction_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addKillSwitchAction:AFVK:v1"
        }
      : { key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addKillSwitchAction:AFVK:v1" }
    const encryptionFlagPageData: EncryptionFlagPageData = {
      flag: encryptionFlagPage,
      dpd: encryptionDpd,
      method: encryptionMethod
    }
    // fetchBatchData, introspect and myAccount-for-client don't depend on one
    // another's results — only programmain_v1DFD (below) needs the pagination
    // value that comes out of fetchBatchData. Run all three concurrently
    // instead of one after another. Each call is caught locally so one
    // failure doesn't swallow the other two responses (Promise.all rejects
    // on the first rejection otherwise).
    const [data, myAccountRes]: [any, any] = await Promise.all([
      fetchBatchData(
        'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addKillSwitchAction:AFVK:v1',
        [user],
        'pageAddkillswitchactionV1',
        token,
        encryptionFlagPageData
      ),
      token
        ? AxiosService.get("/UF/myAccount-for-client", {
            headers: { Authorization: `Bearer ${token}` },
            params: introspectParams
          }).catch((err: any) => ({ __error: err }))
        : Promise.resolve(null)
    ])
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
      const basePath = getPublicEnv('NEXT_PUBLIC_BASE_PATH');
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addKillSwitchAction:AFVK:v1`)
      if (!res.ok) {
        logout(token)
        return
      }
      //routes.refresh()

      try {
        if (myAccountRes?.__error) throw myAccountRes.__error;
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await assetcodenameconcatcombo_v1DFD(pagination)
    await killswitchscopecombo_v1DFD(pagination)
    await killswitchcontainstatuscombo_v1DFD(pagination)
    await killswitchtriggertypecombo_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'overall_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckoverall_group(true)
            }
            if(nodes?.groupName == 'action_details_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckaction_details_group(true)
            }
            if(nodes?.groupName == 'action_detail_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckaction_detail_group(true)
            }
            if(nodes?.groupName == 'risk_conf_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrisk_conf_group(true)
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
          codeStates['overall_group'] = overall_groupe35bf;
          codeStates['setoverall_group'] = setoverall_groupe35bf;
          codeStates['action_details_group'] = action_details_group2c58f;
          codeStates['setaction_details_group'] = setaction_details_group2c58f;
          codeStates['action_detail_group'] = action_detail_group4f66c;
          codeStates['setaction_detail_group'] = setaction_detail_group4f66c;
          codeStates['risk_conf_group'] = risk_conf_groupd5f40;
          codeStates['setrisk_conf_group'] = setrisk_conf_groupd5f40;
          codeStates['dynamicactions'] = dynamicactions512d9;
          codeStates['setdynamicactions'] = setdynamicactions512d9;
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
    securityCheck().finally(() => onReady?.());
    handleOnload();
    setaddkillswitchaction_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(addkillswitchaction_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(addkillswitchaction_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setaddkillswitchaction_v1((pre:any)=>({...pre,_selectedGroup_:""}))
      }
    };
      document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>

     <div className={clsx("",
        "w-full",
        isDark ? 'text-white' : 'text-black',
        isProcessing && "pointer-events-none select-none"
      )}

      ref={parentRef}
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
        {checkoverall_group && initialLoad &&<Groupoverall_group
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
    