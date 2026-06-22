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
const Groupassign_asset_group = dynamic(() => import("./Groupassign_asset_group/Groupassign_asset_group"), { ssr: false });


export default function PageAssignassetV1() {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "Maker": {
    "allowedGroups": [
      "canvas",
      "assign_asset_group",
      "assignment_information_group",
      "assignment_details_group",
      "dynamicactions"
    ]
  },
  "Checker": {
    "allowedGroups": [
      "canvas",
      "assign_asset_group",
      "assignment_information_group",
      "assignment_details_group",
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
  "assign_asset_group": {
    "assign_id": {
      "show": false
    }
  },
  "assignment_information_group": {
    "assignment_information_text": {
      "show": false
    },
    "asset_name": {
      "show": false
    },
    "assigned_to": {
      "show": false
    },
    "assigned_by": {
      "show": false
    },
    "assigned_at": {
      "show": false
    },
    "assignment_status": {
      "show": false
    },
    "condition_at_assign": {
      "show": false
    },
    "expected_return_date": {
      "show": false
    }
  },
  "assignment_details_group": {
    "assignment_details_text": {
      "show": false
    },
    "actual_return_date": {
      "show": false
    },
    "returned_at": {
      "show": false
    },
    "condition_at_return": {
      "show": false
    },
    "approved_by": {
      "show": false
    },
    "approval_status": {
      "show": false
    },
    "assignment_notes": {
      "show": false
    },
    "acknowledgement_signed": {
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
    "assign": {
      "show": false
    }
  }
}
  const token:string = getCookie('token'); 
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "assignments";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {assignasset_v1, setassignasset_v1} = useContext(TotalContext) as TotalContextProps;
  const {assignasset_v1Props, setassignasset_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkassign_asset_group,setCheckassign_asset_group,]=useState<boolean>(false);
  const [checkassignment_information_group,setCheckassignment_information_group,]=useState<boolean>(false);
  const [checkassignment_details_group,setCheckassignment_details_group,]=useState<boolean>(false);
  const [checkdynamicactions,setCheckdynamicactions,]=useState<boolean>(false);
  const {assign_asset_groupdb5a7, setassign_asset_groupdb5a7} = useContext(TotalContext) as TotalContextProps;
  const {assignment_information_group5d144, setassignment_information_group5d144} = useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group7f60d, setassignment_details_group7f60d} = useContext(TotalContext) as TotalContextProps;
  const {dynamicactions956ba, setdynamicactions956ba} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetnamecombo_v1Props, setdfd_assetnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetconditioncombo_v1Props, setdfd_assetconditioncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assignmentstatuscombo_v1Props, setdfd_assignmentstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_conditionatreturncombo_v1Props, setdfd_conditionatreturncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_approvalstatuscombo_v1Props, setdfd_approvalstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetassignments_v1Props, setdfd_assetassignments_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      assetconditioncombo_v1:false,
      assignmentstatuscombo_v1:false,
      conditionatreturncombo_v1:false,
      approvalstatuscombo_v1:false,
      assetassignments_v1:false,
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
        if(assignasset_v1Props.length > 0){
          for(let i=0;i< assignasset_v1Props.length;i++){
            if(assignasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetNameCombo:AFVK:v1"){
              // delete assignasset_v1Props[i].DFDkey;
              let temp=structuredClone(assignasset_v1Props[i])
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
    async function assetconditioncombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assetconditioncombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetConditionCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assetconditioncombo_v1Body["dpdKey"] = encryptionDpd;
          assetconditioncombo_v1Body["method"] = encryptionMethod;
        }
        if(assignasset_v1Props.length > 0){
          for(let i=0;i< assignasset_v1Props.length;i++){
            if(assignasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetConditionCombo:AFVK:v1"){
              // delete assignasset_v1Props[i].DFDkey;
              let temp=structuredClone(assignasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assetconditioncombo_v1Body['filterData'] = filterData;
        }
        const assetconditioncombo_v1Data:any=await AxiosService.post("/te/eventEmitter",assetconditioncombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assetconditioncombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assetconditioncombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_assetconditioncombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assetconditioncombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assetconditioncombo_v1Data?.data?.dataset) {
           setdfd_assetconditioncombo_v1Props(
              Array.isArray(assetconditioncombo_v1Data?.data?.dataset?.data)
                 ? assetconditioncombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_assetconditioncombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assetconditioncombo_v1) {
      assetconditioncombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assetconditioncombo_v1= true
  },[refetch?.assetconditioncombo_v1])
    async function assignmentstatuscombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assignmentstatuscombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assignmentStatusCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assignmentstatuscombo_v1Body["dpdKey"] = encryptionDpd;
          assignmentstatuscombo_v1Body["method"] = encryptionMethod;
        }
        if(assignasset_v1Props.length > 0){
          for(let i=0;i< assignasset_v1Props.length;i++){
            if(assignasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assignmentStatusCombo:AFVK:v1"){
              // delete assignasset_v1Props[i].DFDkey;
              let temp=structuredClone(assignasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assignmentstatuscombo_v1Body['filterData'] = filterData;
        }
        const assignmentstatuscombo_v1Data:any=await AxiosService.post("/te/eventEmitter",assignmentstatuscombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assignmentstatuscombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assignmentstatuscombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_assignmentstatuscombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assignmentstatuscombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assignmentstatuscombo_v1Data?.data?.dataset) {
           setdfd_assignmentstatuscombo_v1Props(
              Array.isArray(assignmentstatuscombo_v1Data?.data?.dataset?.data)
                 ? assignmentstatuscombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_assignmentstatuscombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assignmentstatuscombo_v1) {
      assignmentstatuscombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assignmentstatuscombo_v1= true
  },[refetch?.assignmentstatuscombo_v1])
    async function conditionatreturncombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let conditionatreturncombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:conditionAtReturnCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          conditionatreturncombo_v1Body["dpdKey"] = encryptionDpd;
          conditionatreturncombo_v1Body["method"] = encryptionMethod;
        }
        if(assignasset_v1Props.length > 0){
          for(let i=0;i< assignasset_v1Props.length;i++){
            if(assignasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:conditionAtReturnCombo:AFVK:v1"){
              // delete assignasset_v1Props[i].DFDkey;
              let temp=structuredClone(assignasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          conditionatreturncombo_v1Body['filterData'] = filterData;
        }
        const conditionatreturncombo_v1Data:any=await AxiosService.post("/te/eventEmitter",conditionatreturncombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=conditionatreturncombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(conditionatreturncombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_conditionatreturncombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_conditionatreturncombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (conditionatreturncombo_v1Data?.data?.dataset) {
           setdfd_conditionatreturncombo_v1Props(
              Array.isArray(conditionatreturncombo_v1Data?.data?.dataset?.data)
                 ? conditionatreturncombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_conditionatreturncombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.conditionatreturncombo_v1) {
      conditionatreturncombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.conditionatreturncombo_v1= true
  },[refetch?.conditionatreturncombo_v1])
    async function approvalstatuscombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let approvalstatuscombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:approvalStatusCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          approvalstatuscombo_v1Body["dpdKey"] = encryptionDpd;
          approvalstatuscombo_v1Body["method"] = encryptionMethod;
        }
        if(assignasset_v1Props.length > 0){
          for(let i=0;i< assignasset_v1Props.length;i++){
            if(assignasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:approvalStatusCombo:AFVK:v1"){
              // delete assignasset_v1Props[i].DFDkey;
              let temp=structuredClone(assignasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          approvalstatuscombo_v1Body['filterData'] = filterData;
        }
        const approvalstatuscombo_v1Data:any=await AxiosService.post("/te/eventEmitter",approvalstatuscombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=approvalstatuscombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(approvalstatuscombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_approvalstatuscombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_approvalstatuscombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (approvalstatuscombo_v1Data?.data?.dataset) {
           setdfd_approvalstatuscombo_v1Props(
              Array.isArray(approvalstatuscombo_v1Data?.data?.dataset?.data)
                 ? approvalstatuscombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_approvalstatuscombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.approvalstatuscombo_v1) {
      approvalstatuscombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.approvalstatuscombo_v1= true
  },[refetch?.approvalstatuscombo_v1])
    async function assetassignments_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assetassignments_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assetassignments_v1Body["dpdKey"] = encryptionDpd;
          assetassignments_v1Body["method"] = encryptionMethod;
        }
        if(assignasset_v1Props.length > 0){
          for(let i=0;i< assignasset_v1Props.length;i++){
            if(assignasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1"){
              // delete assignasset_v1Props[i].DFDkey;
              let temp=structuredClone(assignasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assetassignments_v1Body['filterData'] = filterData;
        }
        const assetassignments_v1Data:any=await AxiosService.post("/te/eventEmitter",assetassignments_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assetassignments_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assetassignments_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_assetassignments_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assetassignments_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assetassignments_v1Data?.data?.dataset) {
           setdfd_assetassignments_v1Props(
              Array.isArray(assetassignments_v1Data?.data?.dataset?.data)
                 ? assetassignments_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_assetassignments_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assetassignments_v1) {
      assetassignments_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assetassignments_v1= true
  },[refetch?.assetassignments_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setassignasset_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const data: any = await fetchBatchData(
      'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignAsset:AFVK:v1',
      [user],
      'pageAssignassetV1',
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignAsset:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignAsset:AFVK:v1"  
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignAsset:AFVK:v1"
            }
        })
        }else{
          await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignAsset:AFVK:v1"
            }
         })
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await assetnamecombo_v1DFD(pagination)
    await assetconditioncombo_v1DFD(pagination)
    await assignmentstatuscombo_v1DFD(pagination)
    await conditionatreturncombo_v1DFD(pagination)
    await approvalstatuscombo_v1DFD(pagination)
    await assetassignments_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'assign_asset_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckassign_asset_group(true)
            }
            if(nodes?.groupName == 'assignment_information_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckassignment_information_group(true)
            }
            if(nodes?.groupName == 'assignment_details_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckassignment_details_group(true)
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
          codeStates['assign_asset_group'] = assign_asset_groupdb5a7;
          codeStates['setassign_asset_group'] = setassign_asset_groupdb5a7;
          codeStates['assignment_information_group'] = assignment_information_group5d144;
          codeStates['setassignment_information_group'] = setassignment_information_group5d144;
          codeStates['assignment_details_group'] = assignment_details_group7f60d;
          codeStates['setassignment_details_group'] = setassignment_details_group7f60d;
          codeStates['dynamicactions'] = dynamicactions956ba;
          codeStates['setdynamicactions'] = setdynamicactions956ba;
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
    setassignasset_v1(allRuleData)
  }, [])

  useEffect(()=>{
    if(assignasset_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(assignasset_v1?._artfactPFRule_,data,allRuleData)
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
        {checkassign_asset_group && initialLoad &&<Groupassign_asset_group
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
    