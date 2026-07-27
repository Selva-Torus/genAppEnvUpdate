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


export default function PageViewaccessrequestV1() {
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
    "access_req_id": {
      "show": false
    }
  },
  "access_req__group": {
    "acc_req_details": {
      "show": false
    },
    "full_name": {
      "show": false
    },
    "request_type": {
      "show": false
    },
    "system_name": {
      "show": false
    },
    "access_role": {
      "show": false
    },
    "access_level": {
      "show": false
    },
    "request_priority": {
      "show": false
    },
    "risk_level": {
      "show": false
    },
    "request_number": {
      "show": false
    }
  },
  "business_just__group": {
    "business_justify": {
      "show": false
    },
    "business_justification": {
      "show": false
    },
    "additional_details": {
      "show": false
    }
  },
  "valid_group": {
    "validity_details": {
      "show": false
    },
    "valid_from": {
      "show": false
    },
    "valid_to": {
      "show": false
    },
    "access_review_req_switch": {
      "show": false
    },
    "access_expiry_date": {
      "show": false
    }
  },
  "app_inf_group": {
    "app_inf": {
      "show": false
    },
    "approval_comments": {
      "show": false
    },
    "reject_reason": {
      "show": false
    }
  },
  "provision_group": {
    "provisioning_status": {
      "show": false
    },
    "prov_at": {
      "show": false
    },
    "provisioning_reference": {
      "show": false
    },
    "ticket_reference": {
      "show": false
    }
  },
  "prov_group": {
    "prov_inf": {
      "show": false
    },
    "prov_inf_des": {
      "show": false
    }
  },
  "revocation_group": {
    "revoked_by": {
      "show": false
    },
    "revok_at": {
      "show": false
    },
    "revoked_reason": {
      "show": false
    }
  },
  "rev_group": {
    "access_revok": {
      "show": false
    },
    "prov_inf_des": {
      "show": false
    }
  },
  "audit_group": {
    "audit_info": {
      "show": false
    },
    "audit_inf_textarea": {
      "show": false
    }
  }
}
  const token:string = getCookie('token'); 
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "access request";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {viewaccessrequest_v1, setviewaccessrequest_v1} = useContext(TotalContext) as TotalContextProps;
  const {viewaccessrequest_v1Props, setviewaccessrequest_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checknew_access_group,setChecknew_access_group,]=useState<boolean>(false);
  const [checkaccess_req__group,setCheckaccess_req__group,]=useState<boolean>(false);
  const [checkbusiness_just__group,setCheckbusiness_just__group,]=useState<boolean>(false);
  const [checkvalid_group,setCheckvalid_group,]=useState<boolean>(false);
  const [checkapp_inf_group,setCheckapp_inf_group,]=useState<boolean>(false);
  const [checkprovision_group,setCheckprovision_group,]=useState<boolean>(false);
  const [checkprov_group,setCheckprov_group,]=useState<boolean>(false);
  const [checkrevocation_group,setCheckrevocation_group,]=useState<boolean>(false);
  const [checkrev_group,setCheckrev_group,]=useState<boolean>(false);
  const [checkaudit_group,setCheckaudit_group,]=useState<boolean>(false);
  const {new_access_group99475, setnew_access_group99475} = useContext(TotalContext) as TotalContextProps;
  const {access_req__group580cf, setaccess_req__group580cf} = useContext(TotalContext) as TotalContextProps;
  const {business_just__group2c68d, setbusiness_just__group2c68d} = useContext(TotalContext) as TotalContextProps;
  const {valid_group6c83b, setvalid_group6c83b} = useContext(TotalContext) as TotalContextProps;
  const {app_inf_group5ad5c, setapp_inf_group5ad5c} = useContext(TotalContext) as TotalContextProps;
  const {provision_groupe166a, setprovision_groupe166a} = useContext(TotalContext) as TotalContextProps;
  const {prov_groupce05f, setprov_groupce05f} = useContext(TotalContext) as TotalContextProps;
  const {revocation_groupbee08, setrevocation_groupbee08} = useContext(TotalContext) as TotalContextProps;
  const {rev_group1cf92, setrev_group1cf92} = useContext(TotalContext) as TotalContextProps;
  const {audit_groupdea6a, setaudit_groupdea6a} = useContext(TotalContext) as TotalContextProps;
  const {dfd_accesslevelcombo_v1Props, setdfd_accesslevelcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_addaccessrequestmodify_v1Props, setdfd_addaccessrequestmodify_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_requestprioritycombo_v1Props, setdfd_requestprioritycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_requesttypecombo_v1Props, setdfd_requesttypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_risklevelcombo_v1Props, setdfd_risklevelcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_provisioningstatuscombo_v1Props, setdfd_provisioningstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employeenamecombo_v1Props, setdfd_employeenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      accesslevelcombo_v1:false,
      addaccessrequestmodify_v1:false,
      requestprioritycombo_v1:false,
      requesttypecombo_v1:false,
      risklevelcombo_v1:false,
      provisioningstatuscombo_v1:false,
      employeenamecombo_v1:false,
    });
    async function accesslevelcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let accesslevelcombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:accessLevelCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          accesslevelcombo_v1Body["dpdKey"] = encryptionDpd;
          accesslevelcombo_v1Body["method"] = encryptionMethod;
        }
        if(viewaccessrequest_v1Props.length > 0){
          for(let i=0;i< viewaccessrequest_v1Props.length;i++){
            if(viewaccessrequest_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:accessLevelCombo:AFVK:v1"){
              // delete viewaccessrequest_v1Props[i].DFDkey;
              let temp=structuredClone(viewaccessrequest_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          accesslevelcombo_v1Body['filterData'] = filterData;
        }
        const accesslevelcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",accesslevelcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=accesslevelcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(accesslevelcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_accesslevelcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_accesslevelcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (accesslevelcombo_v1Data?.data?.dataset) {
           setdfd_accesslevelcombo_v1Props(
              Array.isArray(accesslevelcombo_v1Data?.data?.dataset?.data)
                 ? accesslevelcombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_accesslevelcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.accesslevelcombo_v1) {
      accesslevelcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.accesslevelcombo_v1= true
  },[refetch?.accesslevelcombo_v1])
    async function addaccessrequestmodify_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let addaccessrequestmodify_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addAccessRequestModify:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          addaccessrequestmodify_v1Body["dpdKey"] = encryptionDpd;
          addaccessrequestmodify_v1Body["method"] = encryptionMethod;
        }
        if(viewaccessrequest_v1Props.length > 0){
          for(let i=0;i< viewaccessrequest_v1Props.length;i++){
            if(viewaccessrequest_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addAccessRequestModify:AFVK:v1"){
              // delete viewaccessrequest_v1Props[i].DFDkey;
              let temp=structuredClone(viewaccessrequest_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          addaccessrequestmodify_v1Body['filterData'] = filterData;
        }
        const addaccessrequestmodify_v1Data:any=await AxiosService.post("/te/eventEmitter",addaccessrequestmodify_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=addaccessrequestmodify_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(addaccessrequestmodify_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_addaccessrequestmodify_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_addaccessrequestmodify_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (addaccessrequestmodify_v1Data?.data?.dataset) {
           setdfd_addaccessrequestmodify_v1Props(
              Array.isArray(addaccessrequestmodify_v1Data?.data?.dataset?.data)
                 ? addaccessrequestmodify_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_addaccessrequestmodify_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.addaccessrequestmodify_v1) {
      addaccessrequestmodify_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.addaccessrequestmodify_v1= true
  },[refetch?.addaccessrequestmodify_v1])
    async function requestprioritycombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let requestprioritycombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:requestPriorityCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          requestprioritycombo_v1Body["dpdKey"] = encryptionDpd;
          requestprioritycombo_v1Body["method"] = encryptionMethod;
        }
        if(viewaccessrequest_v1Props.length > 0){
          for(let i=0;i< viewaccessrequest_v1Props.length;i++){
            if(viewaccessrequest_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:requestPriorityCombo:AFVK:v1"){
              // delete viewaccessrequest_v1Props[i].DFDkey;
              let temp=structuredClone(viewaccessrequest_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          requestprioritycombo_v1Body['filterData'] = filterData;
        }
        const requestprioritycombo_v1Data:any=await AxiosService.post("/te/eventEmitter",requestprioritycombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=requestprioritycombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(requestprioritycombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_requestprioritycombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_requestprioritycombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (requestprioritycombo_v1Data?.data?.dataset) {
           setdfd_requestprioritycombo_v1Props(
              Array.isArray(requestprioritycombo_v1Data?.data?.dataset?.data)
                 ? requestprioritycombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_requestprioritycombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.requestprioritycombo_v1) {
      requestprioritycombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.requestprioritycombo_v1= true
  },[refetch?.requestprioritycombo_v1])
    async function requesttypecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let requesttypecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:requestTypeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          requesttypecombo_v1Body["dpdKey"] = encryptionDpd;
          requesttypecombo_v1Body["method"] = encryptionMethod;
        }
        if(viewaccessrequest_v1Props.length > 0){
          for(let i=0;i< viewaccessrequest_v1Props.length;i++){
            if(viewaccessrequest_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:requestTypeCombo:AFVK:v1"){
              // delete viewaccessrequest_v1Props[i].DFDkey;
              let temp=structuredClone(viewaccessrequest_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          requesttypecombo_v1Body['filterData'] = filterData;
        }
        const requesttypecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",requesttypecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=requesttypecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(requesttypecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_requesttypecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_requesttypecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (requesttypecombo_v1Data?.data?.dataset) {
           setdfd_requesttypecombo_v1Props(
              Array.isArray(requesttypecombo_v1Data?.data?.dataset?.data)
                 ? requesttypecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_requesttypecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.requesttypecombo_v1) {
      requesttypecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.requesttypecombo_v1= true
  },[refetch?.requesttypecombo_v1])
    async function risklevelcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let risklevelcombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:riskLevelCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          risklevelcombo_v1Body["dpdKey"] = encryptionDpd;
          risklevelcombo_v1Body["method"] = encryptionMethod;
        }
        if(viewaccessrequest_v1Props.length > 0){
          for(let i=0;i< viewaccessrequest_v1Props.length;i++){
            if(viewaccessrequest_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:riskLevelCombo:AFVK:v1"){
              // delete viewaccessrequest_v1Props[i].DFDkey;
              let temp=structuredClone(viewaccessrequest_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          risklevelcombo_v1Body['filterData'] = filterData;
        }
        const risklevelcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",risklevelcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=risklevelcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(risklevelcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_risklevelcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_risklevelcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (risklevelcombo_v1Data?.data?.dataset) {
           setdfd_risklevelcombo_v1Props(
              Array.isArray(risklevelcombo_v1Data?.data?.dataset?.data)
                 ? risklevelcombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_risklevelcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.risklevelcombo_v1) {
      risklevelcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.risklevelcombo_v1= true
  },[refetch?.risklevelcombo_v1])
    async function provisioningstatuscombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let provisioningstatuscombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:provisioningStatusCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          provisioningstatuscombo_v1Body["dpdKey"] = encryptionDpd;
          provisioningstatuscombo_v1Body["method"] = encryptionMethod;
        }
        if(viewaccessrequest_v1Props.length > 0){
          for(let i=0;i< viewaccessrequest_v1Props.length;i++){
            if(viewaccessrequest_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:provisioningStatusCombo:AFVK:v1"){
              // delete viewaccessrequest_v1Props[i].DFDkey;
              let temp=structuredClone(viewaccessrequest_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          provisioningstatuscombo_v1Body['filterData'] = filterData;
        }
        const provisioningstatuscombo_v1Data:any=await AxiosService.post("/te/eventEmitter",provisioningstatuscombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=provisioningstatuscombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(provisioningstatuscombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_provisioningstatuscombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_provisioningstatuscombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (provisioningstatuscombo_v1Data?.data?.dataset) {
           setdfd_provisioningstatuscombo_v1Props(
              Array.isArray(provisioningstatuscombo_v1Data?.data?.dataset?.data)
                 ? provisioningstatuscombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_provisioningstatuscombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.provisioningstatuscombo_v1) {
      provisioningstatuscombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.provisioningstatuscombo_v1= true
  },[refetch?.provisioningstatuscombo_v1])
    async function employeenamecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let employeenamecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employeeNameCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          employeenamecombo_v1Body["dpdKey"] = encryptionDpd;
          employeenamecombo_v1Body["method"] = encryptionMethod;
        }
        if(viewaccessrequest_v1Props.length > 0){
          for(let i=0;i< viewaccessrequest_v1Props.length;i++){
            if(viewaccessrequest_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employeeNameCombo:AFVK:v1"){
              // delete viewaccessrequest_v1Props[i].DFDkey;
              let temp=structuredClone(viewaccessrequest_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          employeenamecombo_v1Body['filterData'] = filterData;
        }
        const employeenamecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",employeenamecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=employeenamecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(employeenamecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_employeenamecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_employeenamecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (employeenamecombo_v1Data?.data?.dataset) {
           setdfd_employeenamecombo_v1Props(
              Array.isArray(employeenamecombo_v1Data?.data?.dataset?.data)
                 ? employeenamecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_employeenamecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.employeenamecombo_v1) {
      employeenamecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.employeenamecombo_v1= true
  },[refetch?.employeenamecombo_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setviewaccessrequest_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const data: any = await fetchBatchData(
      'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewAccessRequest:AFVK:v1',
      [user],
      'pageViewaccessrequestV1',
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewAccessRequest:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewAccessRequest:AFVK:v1"  
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewAccessRequest:AFVK:v1"
            }
        })
        }else{
          await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewAccessRequest:AFVK:v1"
            }
         })
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await accesslevelcombo_v1DFD(pagination)
    await addaccessrequestmodify_v1DFD(pagination)
    await requestprioritycombo_v1DFD(pagination)
    await requesttypecombo_v1DFD(pagination)
    await risklevelcombo_v1DFD(pagination)
    await provisioningstatuscombo_v1DFD(pagination)
    await employeenamecombo_v1DFD(pagination)
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
            if(nodes?.groupName == 'business_just__group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckbusiness_just__group(true)
            }
            if(nodes?.groupName == 'valid_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckvalid_group(true)
            }
            if(nodes?.groupName == 'app_inf_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckapp_inf_group(true)
            }
            if(nodes?.groupName == 'provision_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckprovision_group(true)
            }
            if(nodes?.groupName == 'prov_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckprov_group(true)
            }
            if(nodes?.groupName == 'revocation_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrevocation_group(true)
            }
            if(nodes?.groupName == 'rev_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrev_group(true)
            }
            if(nodes?.groupName == 'audit_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckaudit_group(true)
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
          codeStates['new_access_group'] = new_access_group99475;
          codeStates['setnew_access_group'] = setnew_access_group99475;
          codeStates['access_req__group'] = access_req__group580cf;
          codeStates['setaccess_req__group'] = setaccess_req__group580cf;
          codeStates['business_just__group'] = business_just__group2c68d;
          codeStates['setbusiness_just__group'] = setbusiness_just__group2c68d;
          codeStates['valid_group'] = valid_group6c83b;
          codeStates['setvalid_group'] = setvalid_group6c83b;
          codeStates['app_inf_group'] = app_inf_group5ad5c;
          codeStates['setapp_inf_group'] = setapp_inf_group5ad5c;
          codeStates['provision_group'] = provision_groupe166a;
          codeStates['setprovision_group'] = setprovision_groupe166a;
          codeStates['prov_group'] = prov_groupce05f;
          codeStates['setprov_group'] = setprov_groupce05f;
          codeStates['revocation_group'] = revocation_groupbee08;
          codeStates['setrevocation_group'] = setrevocation_groupbee08;
          codeStates['rev_group'] = rev_group1cf92;
          codeStates['setrev_group'] = setrev_group1cf92;
          codeStates['audit_group'] = audit_groupdea6a;
          codeStates['setaudit_group'] = setaudit_groupdea6a;
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
    setviewaccessrequest_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(viewaccessrequest_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(viewaccessrequest_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setviewaccessrequest_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
    