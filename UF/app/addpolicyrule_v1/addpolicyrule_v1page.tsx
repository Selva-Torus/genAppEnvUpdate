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

const Groupinfo_group = dynamic(() => import("./Groupinfo_group/Groupinfo_group"), { ssr: false });

export default function PageAddpolicyruleV1({ onReady }: { onReady?: () => void } = {}) {
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
  "info_group": {
    "policy_rule_id": {
      "show": false
    }
  },
  "group": {
    "info_rule": {
      "show": false
    },
    "policy_code": {
      "show": false
    },
    "policy_name": {
      "show": false
    },
    "policy_type": {
      "show": false
    },
    "version_label": {
      "show": false
    }
  },
  "rule_config_group": {
    "info_rule": {
      "show": false
    },
    "rule_language": {
      "show": false
    },
    "rule_body": {
      "show": false
    }
  },
  "rule_config_groupa": {
    "info_rule": {
      "show": false
    },
    "default_effect": {
      "show": false
    },
    "applies_to_tiers": {
      "show": false
    },
    "fail_mode": {
      "show": false
    },
    "status": {
      "show": false
    },
    "test_status": {
      "show": false
    },
    "effective_from": {
      "show": false
    }
  },
  "dynamicactions": {
    "cancel_btn": {
      "show": false
    },
    "update_btn": {
      "show": false
    },
    "save_btn": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "policy rule";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {addpolicyrule_v1, setaddpolicyrule_v1} = useContext(TotalContext) as TotalContextProps;
  const {addpolicyrule_v1Props, setaddpolicyrule_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkinfo_group,setCheckinfo_group,]=useState<boolean>(false);
  const [checkgroup,setCheckgroup,]=useState<boolean>(false);
  const [checkrule_config_group,setCheckrule_config_group,]=useState<boolean>(false);
  const [checkrule_config_groupa,setCheckrule_config_groupa,]=useState<boolean>(false);
  const [checkdynamicactions,setCheckdynamicactions,]=useState<boolean>(false);
  const {info_group321cd, setinfo_group321cd} = useContext(TotalContext) as TotalContextProps;
  const {group51f33, setgroup51f33} = useContext(TotalContext) as TotalContextProps;
  const {rule_config_group8a62a, setrule_config_group8a62a} = useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupab2fc0, setrule_config_groupab2fc0} = useContext(TotalContext) as TotalContextProps;
  const {dynamicactions57d44, setdynamicactions57d44} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policyfailmodecombo_v1Props, setdfd_policyfailmodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policyrulelanguagecombo_v1Props, setdfd_policyrulelanguagecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policystatuscombo_v1Props, setdfd_policystatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policyteststatuscombo_v1Props, setdfd_policyteststatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policytypecombo_v1Props, setdfd_policytypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_defaulteffectcombo_v1Props, setdfd_defaulteffectcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_risktiercodecombo_v1Props, setdfd_risktiercodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      policyfailmodecombo_v1:false,
      policyrulelanguagecombo_v1:false,
      policystatuscombo_v1:false,
      policyteststatuscombo_v1:false,
      policytypecombo_v1:false,
      defaulteffectcombo_v1:false,
      risktiercodecombo_v1:false,
    });
    async function policyfailmodecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let policyfailmodecombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:policyFailModeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          policyfailmodecombo_v1Body["dpdKey"] = encryptionDpd;
          policyfailmodecombo_v1Body["method"] = encryptionMethod;
        }
        if(addpolicyrule_v1Props.length > 0){
          for(let i=0;i< addpolicyrule_v1Props.length;i++){
            if(addpolicyrule_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:policyFailModeCombo:AFVK:v1"){
              // delete addpolicyrule_v1Props[i].DFDkey;
              let temp=structuredClone(addpolicyrule_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          policyfailmodecombo_v1Body['filterData'] = filterData;
        }
        const policyfailmodecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",policyfailmodecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=policyfailmodecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(policyfailmodecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_policyfailmodecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_policyfailmodecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (policyfailmodecombo_v1Data?.data?.dataset) {
           setdfd_policyfailmodecombo_v1Props(
              Array.isArray(policyfailmodecombo_v1Data?.data?.dataset?.data)
                 ? policyfailmodecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_policyfailmodecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.policyfailmodecombo_v1) {
      policyfailmodecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.policyfailmodecombo_v1= true
  },[refetch?.policyfailmodecombo_v1])
    async function policyrulelanguagecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let policyrulelanguagecombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:policyRuleLanguageCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          policyrulelanguagecombo_v1Body["dpdKey"] = encryptionDpd;
          policyrulelanguagecombo_v1Body["method"] = encryptionMethod;
        }
        if(addpolicyrule_v1Props.length > 0){
          for(let i=0;i< addpolicyrule_v1Props.length;i++){
            if(addpolicyrule_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:policyRuleLanguageCombo:AFVK:v1"){
              // delete addpolicyrule_v1Props[i].DFDkey;
              let temp=structuredClone(addpolicyrule_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          policyrulelanguagecombo_v1Body['filterData'] = filterData;
        }
        const policyrulelanguagecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",policyrulelanguagecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=policyrulelanguagecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(policyrulelanguagecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_policyrulelanguagecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_policyrulelanguagecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (policyrulelanguagecombo_v1Data?.data?.dataset) {
           setdfd_policyrulelanguagecombo_v1Props(
              Array.isArray(policyrulelanguagecombo_v1Data?.data?.dataset?.data)
                 ? policyrulelanguagecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_policyrulelanguagecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.policyrulelanguagecombo_v1) {
      policyrulelanguagecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.policyrulelanguagecombo_v1= true
  },[refetch?.policyrulelanguagecombo_v1])
    async function policystatuscombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let policystatuscombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:policyStatusCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          policystatuscombo_v1Body["dpdKey"] = encryptionDpd;
          policystatuscombo_v1Body["method"] = encryptionMethod;
        }
        if(addpolicyrule_v1Props.length > 0){
          for(let i=0;i< addpolicyrule_v1Props.length;i++){
            if(addpolicyrule_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:policyStatusCombo:AFVK:v1"){
              // delete addpolicyrule_v1Props[i].DFDkey;
              let temp=structuredClone(addpolicyrule_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          policystatuscombo_v1Body['filterData'] = filterData;
        }
        const policystatuscombo_v1Data:any=await AxiosService.post("/te/eventEmitter",policystatuscombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=policystatuscombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(policystatuscombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_policystatuscombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_policystatuscombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (policystatuscombo_v1Data?.data?.dataset) {
           setdfd_policystatuscombo_v1Props(
              Array.isArray(policystatuscombo_v1Data?.data?.dataset?.data)
                 ? policystatuscombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_policystatuscombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.policystatuscombo_v1) {
      policystatuscombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.policystatuscombo_v1= true
  },[refetch?.policystatuscombo_v1])
    async function policyteststatuscombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let policyteststatuscombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:policyTestStatusCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          policyteststatuscombo_v1Body["dpdKey"] = encryptionDpd;
          policyteststatuscombo_v1Body["method"] = encryptionMethod;
        }
        if(addpolicyrule_v1Props.length > 0){
          for(let i=0;i< addpolicyrule_v1Props.length;i++){
            if(addpolicyrule_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:policyTestStatusCombo:AFVK:v1"){
              // delete addpolicyrule_v1Props[i].DFDkey;
              let temp=structuredClone(addpolicyrule_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          policyteststatuscombo_v1Body['filterData'] = filterData;
        }
        const policyteststatuscombo_v1Data:any=await AxiosService.post("/te/eventEmitter",policyteststatuscombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=policyteststatuscombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(policyteststatuscombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_policyteststatuscombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_policyteststatuscombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (policyteststatuscombo_v1Data?.data?.dataset) {
           setdfd_policyteststatuscombo_v1Props(
              Array.isArray(policyteststatuscombo_v1Data?.data?.dataset?.data)
                 ? policyteststatuscombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_policyteststatuscombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.policyteststatuscombo_v1) {
      policyteststatuscombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.policyteststatuscombo_v1= true
  },[refetch?.policyteststatuscombo_v1])
    async function policytypecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let policytypecombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:policyTypeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          policytypecombo_v1Body["dpdKey"] = encryptionDpd;
          policytypecombo_v1Body["method"] = encryptionMethod;
        }
        if(addpolicyrule_v1Props.length > 0){
          for(let i=0;i< addpolicyrule_v1Props.length;i++){
            if(addpolicyrule_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:policyTypeCombo:AFVK:v1"){
              // delete addpolicyrule_v1Props[i].DFDkey;
              let temp=structuredClone(addpolicyrule_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          policytypecombo_v1Body['filterData'] = filterData;
        }
        const policytypecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",policytypecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=policytypecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(policytypecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_policytypecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_policytypecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (policytypecombo_v1Data?.data?.dataset) {
           setdfd_policytypecombo_v1Props(
              Array.isArray(policytypecombo_v1Data?.data?.dataset?.data)
                 ? policytypecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_policytypecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.policytypecombo_v1) {
      policytypecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.policytypecombo_v1= true
  },[refetch?.policytypecombo_v1])
    async function defaulteffectcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let defaulteffectcombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:defaultEffectCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          defaulteffectcombo_v1Body["dpdKey"] = encryptionDpd;
          defaulteffectcombo_v1Body["method"] = encryptionMethod;
        }
        if(addpolicyrule_v1Props.length > 0){
          for(let i=0;i< addpolicyrule_v1Props.length;i++){
            if(addpolicyrule_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:defaultEffectCombo:AFVK:v1"){
              // delete addpolicyrule_v1Props[i].DFDkey;
              let temp=structuredClone(addpolicyrule_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          defaulteffectcombo_v1Body['filterData'] = filterData;
        }
        const defaulteffectcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",defaulteffectcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=defaulteffectcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(defaulteffectcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_defaulteffectcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_defaulteffectcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (defaulteffectcombo_v1Data?.data?.dataset) {
           setdfd_defaulteffectcombo_v1Props(
              Array.isArray(defaulteffectcombo_v1Data?.data?.dataset?.data)
                 ? defaulteffectcombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_defaulteffectcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.defaulteffectcombo_v1) {
      defaulteffectcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.defaulteffectcombo_v1= true
  },[refetch?.defaulteffectcombo_v1])
    async function risktiercodecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let risktiercodecombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskTierCodeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          risktiercodecombo_v1Body["dpdKey"] = encryptionDpd;
          risktiercodecombo_v1Body["method"] = encryptionMethod;
        }
        if(addpolicyrule_v1Props.length > 0){
          for(let i=0;i< addpolicyrule_v1Props.length;i++){
            if(addpolicyrule_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskTierCodeCombo:AFVK:v1"){
              // delete addpolicyrule_v1Props[i].DFDkey;
              let temp=structuredClone(addpolicyrule_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          risktiercodecombo_v1Body['filterData'] = filterData;
        }
        const risktiercodecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",risktiercodecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=risktiercodecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(risktiercodecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_risktiercodecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_risktiercodecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (risktiercodecombo_v1Data?.data?.dataset) {
           setdfd_risktiercodecombo_v1Props(
              Array.isArray(risktiercodecombo_v1Data?.data?.dataset?.data)
                 ? risktiercodecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_risktiercodecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.risktiercodecombo_v1) {
      risktiercodecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.risktiercodecombo_v1= true
  },[refetch?.risktiercodecombo_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setaddpolicyrule_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addPolicyRule:AFVK:v1"
        }
      : { key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addPolicyRule:AFVK:v1" }
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
        'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addPolicyRule:AFVK:v1',
        [user],
        'pageAddpolicyruleV1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addPolicyRule:AFVK:v1`)
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
    await policyfailmodecombo_v1DFD(pagination)
    await policyrulelanguagecombo_v1DFD(pagination)
    await policystatuscombo_v1DFD(pagination)
    await policyteststatuscombo_v1DFD(pagination)
    await policytypecombo_v1DFD(pagination)
    await defaulteffectcombo_v1DFD(pagination)
    await risktiercodecombo_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'info_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckinfo_group(true)
            }
            if(nodes?.groupName == 'group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgroup(true)
            }
            if(nodes?.groupName == 'rule_config_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrule_config_group(true)
            }
            if(nodes?.groupName == 'rule_config_groupa' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrule_config_groupa(true)
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
          codeStates['info_group'] = info_group321cd;
          codeStates['setinfo_group'] = setinfo_group321cd;
          codeStates['group'] = group51f33;
          codeStates['setgroup'] = setgroup51f33;
          codeStates['rule_config_group'] = rule_config_group8a62a;
          codeStates['setrule_config_group'] = setrule_config_group8a62a;
          codeStates['rule_config_groupa'] = rule_config_groupab2fc0;
          codeStates['setrule_config_groupa'] = setrule_config_groupab2fc0;
          codeStates['dynamicactions'] = dynamicactions57d44;
          codeStates['setdynamicactions'] = setdynamicactions57d44;
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
    setaddpolicyrule_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(addpolicyrule_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(addpolicyrule_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setaddpolicyrule_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkinfo_group && initialLoad &&<Groupinfo_group
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
    