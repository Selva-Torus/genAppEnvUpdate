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
const Groupinitiate_asset_disposal_group = dynamic(() => import("./Groupinitiate_asset_disposal_group/Groupinitiate_asset_disposal_group"), { ssr: false });


export default function PageInitiateassetdisposalV1() {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "Maker": {
    "allowedGroups": [
      "canvas",
      "initiate_asset_disposal_group",
      "disposal_details_group",
      "compliance_financial_group",
      "dynamicactions"
    ]
  },
  "Checker": {
    "allowedGroups": [
      "canvas",
      "initiate_asset_disposal_group",
      "disposal_details_group",
      "compliance_financial_group",
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
  "initiate_asset_disposal_group": {},
  "disposal_details_group": {
    "disposal_details": {
      "show": false
    },
    "vendor_name": {
      "show": false
    },
    "asset_name": {
      "show": false
    },
    "disposal_method": {
      "show": false
    },
    "disposal_date": {
      "show": false
    },
    "reason": {
      "show": false
    }
  },
  "compliance_financial_group": {
    "compliance_financial": {
      "show": false
    },
    "approval_reference": {
      "show": false
    },
    "witness_name": {
      "show": false
    },
    "data_wipe_method": {
      "show": false
    },
    "data_wiped": {
      "show": false
    },
    "disposal_value": {
      "show": false
    },
    "disposal_cost": {
      "show": false
    },
    "resale_amount": {
      "show": false
    }
  },
  "dynamicactions": {
    "cancel": {
      "show": false
    },
    "update": {
      "show": false
    },
    "initiate_disposal": {
      "show": false
    }
  }
}
  const token:string = getCookie('token'); 
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "disposal";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {initiateassetdisposal_v1, setinitiateassetdisposal_v1} = useContext(TotalContext) as TotalContextProps;
  const {initiateassetdisposal_v1Props, setinitiateassetdisposal_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkinitiate_asset_disposal_group,setCheckinitiate_asset_disposal_group,]=useState<boolean>(false);
  const [checkdisposal_details_group,setCheckdisposal_details_group,]=useState<boolean>(false);
  const [checkcompliance_financial_group,setCheckcompliance_financial_group,]=useState<boolean>(false);
  const [checkdynamicactions,setCheckdynamicactions,]=useState<boolean>(false);
  const {initiate_asset_disposal_groupdb5a7, setinitiate_asset_disposal_groupdb5a7} = useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupe1b0c, setdisposal_details_groupe1b0c} = useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_group1f9bc, setcompliance_financial_group1f9bc} = useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9a7ff, setdynamicactions9a7ff} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetnamecombo_v1Props, setdfd_assetnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_vendornamecombo_v1Props, setdfd_vendornamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      assetnamecombo_v1:false,
      vendornamecombo_v1:false,
      assetdisposal_v1:false,
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
        if(initiateassetdisposal_v1Props.length > 0){
          for(let i=0;i< initiateassetdisposal_v1Props.length;i++){
            if(initiateassetdisposal_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetNameCombo:AFVK:v1"){
              // delete initiateassetdisposal_v1Props[i].DFDkey;
              let temp=structuredClone(initiateassetdisposal_v1Props[i])
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
        if(initiateassetdisposal_v1Props.length > 0){
          for(let i=0;i< initiateassetdisposal_v1Props.length;i++){
            if(initiateassetdisposal_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:vendorNameCombo:AFVK:v1"){
              // delete initiateassetdisposal_v1Props[i].DFDkey;
              let temp=structuredClone(initiateassetdisposal_v1Props[i])
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
        if(initiateassetdisposal_v1Props.length > 0){
          for(let i=0;i< initiateassetdisposal_v1Props.length;i++){
            if(initiateassetdisposal_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1"){
              // delete initiateassetdisposal_v1Props[i].DFDkey;
              let temp=structuredClone(initiateassetdisposal_v1Props[i])
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
    setinitiateassetdisposal_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const data: any = await fetchBatchData(
      'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:initiateAssetDisposal:AFVK:v1',
      [user],
      'pageInitiateassetdisposalV1',
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:initiateAssetDisposal:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:initiateAssetDisposal:AFVK:v1"  
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:initiateAssetDisposal:AFVK:v1"
            }
        })
        }else{
          await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:initiateAssetDisposal:AFVK:v1"
            }
         })
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await assetnamecombo_v1DFD(pagination)
    await vendornamecombo_v1DFD(pagination)
    await assetdisposal_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'initiate_asset_disposal_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckinitiate_asset_disposal_group(true)
            }
            if(nodes?.groupName == 'disposal_details_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdisposal_details_group(true)
            }
            if(nodes?.groupName == 'compliance_financial_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcompliance_financial_group(true)
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
          codeStates['initiate_asset_disposal_group'] = initiate_asset_disposal_groupdb5a7;
          codeStates['setinitiate_asset_disposal_group'] = setinitiate_asset_disposal_groupdb5a7;
          codeStates['disposal_details_group'] = disposal_details_groupe1b0c;
          codeStates['setdisposal_details_group'] = setdisposal_details_groupe1b0c;
          codeStates['compliance_financial_group'] = compliance_financial_group1f9bc;
          codeStates['setcompliance_financial_group'] = setcompliance_financial_group1f9bc;
          codeStates['dynamicactions'] = dynamicactions9a7ff;
          codeStates['setdynamicactions'] = setdynamicactions9a7ff;
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
    setinitiateassetdisposal_v1(allRuleData)
  }, [])

  useEffect(()=>{
    if(initiateassetdisposal_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(initiateassetdisposal_v1?._artfactPFRule_,data,allRuleData)
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
        {checkinitiate_asset_disposal_group && initialLoad &&<Groupinitiate_asset_disposal_group
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
    