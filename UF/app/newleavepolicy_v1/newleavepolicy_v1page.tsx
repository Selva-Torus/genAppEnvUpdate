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
const Groupnew_access_group = dynamic(() => import("./Groupnew_access_group/Groupnew_access_group"), { ssr: false });


export default function PageNewleavepolicyV1() {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "CXO": {
    "blockedGroups": []
  },
  "HR Manager": {
    "blockedGroups": []
  },
  "Info Security Officer": {
    "blockedGroups": []
  },
  "Employee": {
    "blockedGroups": []
  },
  "IT Manager": {
    "blockedGroups": []
  },
  "Operation Staff": {
    "blockedGroups": []
  },
  "Auditor": {
    "blockedGroups": []
  },
  "Operation Manager": {
    "blockedGroups": []
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "new_access_group": {
    "policy_id": {
      "show": false
    }
  },
  "access_req__group": {
    "basic_inf": {
      "show": false
    },
    "policy_code": {
      "show": false
    },
    "policy_name": {
      "show": false
    },
    "leave_type": {
      "show": false
    }
  },
  "app_inf_group": {
    "accrual_rules_dynamicjsonform": {
      "show": false
    },
    "policy_rules_dynamicjsonform": {
      "show": false
    },
    "add_dts_dynamicjsonform": {
      "show": false
    }
  },
  "approve_group": {
    "adv_conf": {
      "show": false
    }
  },
  "valid_group": {
    "leave_entity": {
      "show": false
    },
    "days_per_year": {
      "show": false
    },
    "carry_forward_days": {
      "show": false
    },
    "carry_forward_expiry": {
      "show": false
    },
    "accrual_frequency": {
      "show": false
    },
    "max_consecutive_days": {
      "show": false
    }
  },
  "business_just__group": {
    "app_rules": {
      "show": false
    },
    "applicable_to": {
      "show": false
    },
    "gender_applicability": {
      "show": false
    },
    "applicable_locations": {
      "show": false
    }
  },
  "provision_group": {
    "approval_required_checkbox": {
      "show": false
    },
    "encashment_allowed_checkbox": {
      "show": false
    }
  },
  "leave_rule_group": {
    "leave_rules": {
      "show": false
    }
  },
  "dynamicactions": {
    "cancel": {
      "show": false
    },
    "button_update": {
      "show": false
    },
    "save": {
      "show": false
    }
  }
}
  const token:string = getCookie('token'); 
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "leave policy";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {newleavepolicy_v1, setnewleavepolicy_v1} = useContext(TotalContext) as TotalContextProps;
  const {newleavepolicy_v1Props, setnewleavepolicy_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checknew_access_group,setChecknew_access_group,]=useState<boolean>(false);
  const [checkaccess_req__group,setCheckaccess_req__group,]=useState<boolean>(false);
  const [checkapp_inf_group,setCheckapp_inf_group,]=useState<boolean>(false);
  const [checkapprove_group,setCheckapprove_group,]=useState<boolean>(false);
  const [checkvalid_group,setCheckvalid_group,]=useState<boolean>(false);
  const [checkbusiness_just__group,setCheckbusiness_just__group,]=useState<boolean>(false);
  const [checkprovision_group,setCheckprovision_group,]=useState<boolean>(false);
  const [checkleave_rule_group,setCheckleave_rule_group,]=useState<boolean>(false);
  const [checkdynamicactions,setCheckdynamicactions,]=useState<boolean>(false);
  const {new_access_group86c35, setnew_access_group86c35} = useContext(TotalContext) as TotalContextProps;
  const {access_req__groupae6e3, setaccess_req__groupae6e3} = useContext(TotalContext) as TotalContextProps;
  const {app_inf_group2196e, setapp_inf_group2196e} = useContext(TotalContext) as TotalContextProps;
  const {approve_group0167c, setapprove_group0167c} = useContext(TotalContext) as TotalContextProps;
  const {valid_group5c57c, setvalid_group5c57c} = useContext(TotalContext) as TotalContextProps;
  const {business_just__groupd6ebd, setbusiness_just__groupd6ebd} = useContext(TotalContext) as TotalContextProps;
  const {provision_groupc3fca, setprovision_groupc3fca} = useContext(TotalContext) as TotalContextProps;
  const {leave_rule_groupf75c0, setleave_rule_groupf75c0} = useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd8c40, setdynamicactionsd8c40} = useContext(TotalContext) as TotalContextProps;
  const {dfd_addleavepolicymodify_v1Props, setdfd_addleavepolicymodify_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_leavetypecombo_v1Props, setdfd_leavetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_accrualfrequencycombo_v1Props, setdfd_accrualfrequencycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_gendercombo_v1Props, setdfd_gendercombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_statecombo_v1Props, setdfd_statecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      addleavepolicymodify_v1:false,
      leavetypecombo_v1:false,
      accrualfrequencycombo_v1:false,
      gendercombo_v1:false,
      statecombo_v1:false,
    });
    async function addleavepolicymodify_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let addleavepolicymodify_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addLeavePolicyModify:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          addleavepolicymodify_v1Body["dpdKey"] = encryptionDpd;
          addleavepolicymodify_v1Body["method"] = encryptionMethod;
        }
        if(newleavepolicy_v1Props.length > 0){
          for(let i=0;i< newleavepolicy_v1Props.length;i++){
            if(newleavepolicy_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addLeavePolicyModify:AFVK:v1"){
              // delete newleavepolicy_v1Props[i].DFDkey;
              let temp=structuredClone(newleavepolicy_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          addleavepolicymodify_v1Body['filterData'] = filterData;
        }
        const addleavepolicymodify_v1Data:any=await AxiosService.post("/te/eventEmitter",addleavepolicymodify_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=addleavepolicymodify_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(addleavepolicymodify_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_addleavepolicymodify_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_addleavepolicymodify_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (addleavepolicymodify_v1Data?.data?.dataset) {
           setdfd_addleavepolicymodify_v1Props(
              Array.isArray(addleavepolicymodify_v1Data?.data?.dataset?.data)
                 ? addleavepolicymodify_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_addleavepolicymodify_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.addleavepolicymodify_v1) {
      addleavepolicymodify_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.addleavepolicymodify_v1= true
  },[refetch?.addleavepolicymodify_v1])
    async function leavetypecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let leavetypecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:leaveTypeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          leavetypecombo_v1Body["dpdKey"] = encryptionDpd;
          leavetypecombo_v1Body["method"] = encryptionMethod;
        }
        if(newleavepolicy_v1Props.length > 0){
          for(let i=0;i< newleavepolicy_v1Props.length;i++){
            if(newleavepolicy_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:leaveTypeCombo:AFVK:v1"){
              // delete newleavepolicy_v1Props[i].DFDkey;
              let temp=structuredClone(newleavepolicy_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          leavetypecombo_v1Body['filterData'] = filterData;
        }
        const leavetypecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",leavetypecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=leavetypecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(leavetypecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_leavetypecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_leavetypecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (leavetypecombo_v1Data?.data?.dataset) {
           setdfd_leavetypecombo_v1Props(
              Array.isArray(leavetypecombo_v1Data?.data?.dataset?.data)
                 ? leavetypecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_leavetypecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.leavetypecombo_v1) {
      leavetypecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.leavetypecombo_v1= true
  },[refetch?.leavetypecombo_v1])
    async function accrualfrequencycombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let accrualfrequencycombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:accrualFrequencyCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          accrualfrequencycombo_v1Body["dpdKey"] = encryptionDpd;
          accrualfrequencycombo_v1Body["method"] = encryptionMethod;
        }
        if(newleavepolicy_v1Props.length > 0){
          for(let i=0;i< newleavepolicy_v1Props.length;i++){
            if(newleavepolicy_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:accrualFrequencyCombo:AFVK:v1"){
              // delete newleavepolicy_v1Props[i].DFDkey;
              let temp=structuredClone(newleavepolicy_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          accrualfrequencycombo_v1Body['filterData'] = filterData;
        }
        const accrualfrequencycombo_v1Data:any=await AxiosService.post("/te/eventEmitter",accrualfrequencycombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=accrualfrequencycombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(accrualfrequencycombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_accrualfrequencycombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_accrualfrequencycombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (accrualfrequencycombo_v1Data?.data?.dataset) {
           setdfd_accrualfrequencycombo_v1Props(
              Array.isArray(accrualfrequencycombo_v1Data?.data?.dataset?.data)
                 ? accrualfrequencycombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_accrualfrequencycombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.accrualfrequencycombo_v1) {
      accrualfrequencycombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.accrualfrequencycombo_v1= true
  },[refetch?.accrualfrequencycombo_v1])
    async function gendercombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let gendercombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:genderCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          gendercombo_v1Body["dpdKey"] = encryptionDpd;
          gendercombo_v1Body["method"] = encryptionMethod;
        }
        if(newleavepolicy_v1Props.length > 0){
          for(let i=0;i< newleavepolicy_v1Props.length;i++){
            if(newleavepolicy_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:genderCombo:AFVK:v1"){
              // delete newleavepolicy_v1Props[i].DFDkey;
              let temp=structuredClone(newleavepolicy_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          gendercombo_v1Body['filterData'] = filterData;
        }
        const gendercombo_v1Data:any=await AxiosService.post("/te/eventEmitter",gendercombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=gendercombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(gendercombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_gendercombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_gendercombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (gendercombo_v1Data?.data?.dataset) {
           setdfd_gendercombo_v1Props(
              Array.isArray(gendercombo_v1Data?.data?.dataset?.data)
                 ? gendercombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_gendercombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.gendercombo_v1) {
      gendercombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.gendercombo_v1= true
  },[refetch?.gendercombo_v1])
    async function statecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let statecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:stateCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          statecombo_v1Body["dpdKey"] = encryptionDpd;
          statecombo_v1Body["method"] = encryptionMethod;
        }
        if(newleavepolicy_v1Props.length > 0){
          for(let i=0;i< newleavepolicy_v1Props.length;i++){
            if(newleavepolicy_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:stateCombo:AFVK:v1"){
              // delete newleavepolicy_v1Props[i].DFDkey;
              let temp=structuredClone(newleavepolicy_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          statecombo_v1Body['filterData'] = filterData;
        }
        const statecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",statecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=statecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(statecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_statecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_statecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (statecombo_v1Data?.data?.dataset) {
           setdfd_statecombo_v1Props(
              Array.isArray(statecombo_v1Data?.data?.dataset?.data)
                 ? statecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_statecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.statecombo_v1) {
      statecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.statecombo_v1= true
  },[refetch?.statecombo_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setnewleavepolicy_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const data: any = await fetchBatchData(
      'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newLeavePolicy:AFVK:v1',
      [user],
      'pageNewleavepolicyV1',
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newLeavePolicy:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newLeavePolicy:AFVK:v1"  
            }
          })          
        }
        if(introspect?.data?.authenticated === false){
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct006/ecp/hrm/v1';
        }
      }catch (err: any) {
        toast("The token is no longer active.", 'danger');
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct006/ecp/hrm/v1';
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newLeavePolicy:AFVK:v1"
            }
        })
        }else{
          await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newLeavePolicy:AFVK:v1"
            }
         })
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await addleavepolicymodify_v1DFD(pagination)
    await leavetypecombo_v1DFD(pagination)
    await accrualfrequencycombo_v1DFD(pagination)
    await gendercombo_v1DFD(pagination)
    await statecombo_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'new_access_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecknew_access_group(true)
            }
            if(nodes?.groupName == 'access_req__group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckaccess_req__group(true)
            }
            if(nodes?.groupName == 'app_inf_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckapp_inf_group(true)
            }
            if(nodes?.groupName == 'approve_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckapprove_group(true)
            }
            if(nodes?.groupName == 'valid_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckvalid_group(true)
            }
            if(nodes?.groupName == 'business_just__group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckbusiness_just__group(true)
            }
            if(nodes?.groupName == 'provision_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckprovision_group(true)
            }
            if(nodes?.groupName == 'leave_rule_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckleave_rule_group(true)
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
          codeStates['new_access_group'] = new_access_group86c35;
          codeStates['setnew_access_group'] = setnew_access_group86c35;
          codeStates['access_req__group'] = access_req__groupae6e3;
          codeStates['setaccess_req__group'] = setaccess_req__groupae6e3;
          codeStates['app_inf_group'] = app_inf_group2196e;
          codeStates['setapp_inf_group'] = setapp_inf_group2196e;
          codeStates['approve_group'] = approve_group0167c;
          codeStates['setapprove_group'] = setapprove_group0167c;
          codeStates['valid_group'] = valid_group5c57c;
          codeStates['setvalid_group'] = setvalid_group5c57c;
          codeStates['business_just__group'] = business_just__groupd6ebd;
          codeStates['setbusiness_just__group'] = setbusiness_just__groupd6ebd;
          codeStates['provision_group'] = provision_groupc3fca;
          codeStates['setprovision_group'] = setprovision_groupc3fca;
          codeStates['leave_rule_group'] = leave_rule_groupf75c0;
          codeStates['setleave_rule_group'] = setleave_rule_groupf75c0;
          codeStates['dynamicactions'] = dynamicactionsd8c40;
          codeStates['setdynamicactions'] = setdynamicactionsd8c40;
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
    setnewleavepolicy_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(newleavepolicy_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(newleavepolicy_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setnewleavepolicy_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checknew_access_group && initialLoad &&<Groupnew_access_group
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
    