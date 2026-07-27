'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { getGroupOrchestrationData, getControlOrchestrationData, fetchBatchData } from '@/app/utils/Orchestration';
import { AxiosService } from '@/app/components/axiosService';
import { api_paginationDto, uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleGroupArrayCopyFormData } from '@/app/utils/commonfunctions'; 
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
import Groupaccess_req__group  from "../Groupaccess_req__group/Groupaccess_req__group";
import Groupbusiness_just__group  from "../Groupbusiness_just__group/Groupbusiness_just__group";
import Groupvalid_group  from "../Groupvalid_group/Groupvalid_group";
import Groupapp_inf_group  from "../Groupapp_inf_group/Groupapp_inf_group";
import Groupprovision_group  from "../Groupprovision_group/Groupprovision_group";
import Grouprevocation_group  from "../Grouprevocation_group/Grouprevocation_group";
import Groupaudit_group  from "../Groupaudit_group/Groupaudit_group";
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import evaluateDecisionTable,{ evaluateDecisionForDynamicActions,eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import uoMapperData from '@/context/dfdmapperContolnames.json';
import Textaccess_req_id  from "./Textaccess_req_id";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupnew_access_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const token:string = getCookie('token'); 
  const decodedTokenObj:any = decodeToken(token);
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const copyFormData=useHandleGroupArrayCopyFormData()
  const [groupData, setGroupData] = useState<any>(groupDataProp);
  const [controlData, setControlData] = useState<any>(controlDataProp);
  let code:any = ``;
  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {dfd_accesslevelcombo_v1Props, setdfd_accesslevelcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_addaccessrequestmodify_v1Props, setdfd_addaccessrequestmodify_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_requestprioritycombo_v1Props, setdfd_requestprioritycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_requesttypecombo_v1Props, setdfd_requesttypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_risklevelcombo_v1Props, setdfd_risklevelcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_provisioningstatuscombo_v1Props, setdfd_provisioningstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employeenamecombo_v1Props, setdfd_employeenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagComp: boolean = encryptionFlagPageData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagPageData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagPageData?.method;
  let encryptionFlagCompData :any ={
    "flag":encryptionFlagComp,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  };
  const [showFlag, setShowFlag] = React.useState<string>("");
  const securityData:any={
  "CXO": {
    "allowedControls": [
      "access_req_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "business_just__group",
      "valid_group",
      "app_inf_group",
      "provision_group",
      "prov_group",
      "revocation_group",
      "rev_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "access_req_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "business_just__group",
      "valid_group",
      "app_inf_group",
      "provision_group",
      "prov_group",
      "revocation_group",
      "rev_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "access_req_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "business_just__group",
      "valid_group",
      "app_inf_group",
      "provision_group",
      "prov_group",
      "revocation_group",
      "rev_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "access_req_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "business_just__group",
      "valid_group",
      "app_inf_group",
      "provision_group",
      "prov_group",
      "revocation_group",
      "rev_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "access_req_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "business_just__group",
      "valid_group",
      "app_inf_group",
      "provision_group",
      "prov_group",
      "revocation_group",
      "rev_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "access_req_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "business_just__group",
      "valid_group",
      "app_inf_group",
      "provision_group",
      "prov_group",
      "revocation_group",
      "rev_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "access_req_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "business_just__group",
      "valid_group",
      "app_inf_group",
      "provision_group",
      "prov_group",
      "revocation_group",
      "rev_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "access_req_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "business_just__group",
      "valid_group",
      "app_inf_group",
      "provision_group",
      "prov_group",
      "revocation_group",
      "rev_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const [allowedComponent,setAllowedComponent]=useState<any>("");
  const [allowedControls,setAllowedControls]=useState<any>("");
  const toast=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({});
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
 /////////////
   //another screen
  const {new_access_group99475, setnew_access_group99475}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group99475Props, setnew_access_group99475Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group580cf, setaccess_req__group580cf}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group580cfProps, setaccess_req__group580cfProps}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2c68d, setbusiness_just__group2c68d}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2c68dProps, setbusiness_just__group2c68dProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_group6c83b, setvalid_group6c83b}= useContext(TotalContext) as TotalContextProps;
  const {valid_group6c83bProps, setvalid_group6c83bProps}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group5ad5c, setapp_inf_group5ad5c}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group5ad5cProps, setapp_inf_group5ad5cProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupe166a, setprovision_groupe166a}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupe166aProps, setprovision_groupe166aProps}= useContext(TotalContext) as TotalContextProps;
  const {prov_groupce05f, setprov_groupce05f}= useContext(TotalContext) as TotalContextProps;
  const {prov_groupce05fProps, setprov_groupce05fProps}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupbee08, setrevocation_groupbee08}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupbee08Props, setrevocation_groupbee08Props}= useContext(TotalContext) as TotalContextProps;
  const {rev_group1cf92, setrev_group1cf92}= useContext(TotalContext) as TotalContextProps;
  const {rev_group1cf92Props, setrev_group1cf92Props}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupdea6a, setaudit_groupdea6a}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupdea6aProps, setaudit_groupdea6aProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req_id4b085, setaccess_req_id4b085}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewaccessrequest_v1, setviewaccessrequest_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewAccessRequest:AFVK:v1',
    [user],
    'GroupNewAccessGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1b36b80a4d4a9edf55ee9f7086599475");
  code = orchestrationData?.data?.code;
  setAllCode(code)
  const security:any[] = orchestrationData?.data?.security;
  const allowedGroups:any[] = orchestrationData?.data?.allowedGroups;
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  setAllowedControls(security) 
  setAllowedComponent(allowedGroups) 
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    setRuleData(orchestrationData?.data?.rule?.nodes)
    setnew_access_group99475Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("access_req__group")){
        setaccess_req__group580cf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(access_req__group580cf?.isDisabled==null)
      {
        setaccess_req__group580cf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_just__group")){
        setbusiness_just__group2c68d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(business_just__group2c68d?.isDisabled==null)
      {
        setbusiness_just__group2c68d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("valid_group")){
        setvalid_group6c83b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(valid_group6c83b?.isDisabled==null)
      {
        setvalid_group6c83b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("app_inf_group")){
        setapp_inf_group5ad5c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(app_inf_group5ad5c?.isDisabled==null)
      {
        setapp_inf_group5ad5c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("provision_group")){
        setprovision_groupe166a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(provision_groupe166a?.isDisabled==null)
      {
        setprovision_groupe166a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("revocation_group")){
        setrevocation_groupbee08((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(revocation_groupbee08?.isDisabled==null)
      {
        setrevocation_groupbee08((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("audit_group")){
        setaudit_groupdea6a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(audit_groupdea6a?.isDisabled==null)
      {
        setaudit_groupdea6a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("access_req_id")){
        setaccess_req_id4b085((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(access_req_id4b085?.isDisabled==null)
      {
        setaccess_req_id4b085((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group99475,
        codeStates['setnew_access_group'] = setnew_access_group99475,
        codeStates['new_access_group99475'] = new_access_group99475Props,
        codeStates['setnew_access_group99475'] = setnew_access_group99475Props,
        codeStates['access_req__group'] = access_req__group580cf,
        codeStates['setaccess_req__group'] = setaccess_req__group580cf,
        codeStates['access_req__group580cf'] = access_req__group580cfProps,
        codeStates['setaccess_req__group580cf'] = setaccess_req__group580cfProps,
        codeStates['business_just__group'] = business_just__group2c68d,
        codeStates['setbusiness_just__group'] = setbusiness_just__group2c68d,
        codeStates['business_just__group2c68d'] = business_just__group2c68dProps,
        codeStates['setbusiness_just__group2c68d'] = setbusiness_just__group2c68dProps,
        codeStates['valid_group'] = valid_group6c83b,
        codeStates['setvalid_group'] = setvalid_group6c83b,
        codeStates['valid_group6c83b'] = valid_group6c83bProps,
        codeStates['setvalid_group6c83b'] = setvalid_group6c83bProps,
        codeStates['app_inf_group'] = app_inf_group5ad5c,
        codeStates['setapp_inf_group'] = setapp_inf_group5ad5c,
        codeStates['app_inf_group5ad5c'] = app_inf_group5ad5cProps,
        codeStates['setapp_inf_group5ad5c'] = setapp_inf_group5ad5cProps,
        codeStates['provision_group'] = provision_groupe166a,
        codeStates['setprovision_group'] = setprovision_groupe166a,
        codeStates['provision_groupe166a'] = provision_groupe166aProps,
        codeStates['setprovision_groupe166a'] = setprovision_groupe166aProps,
        codeStates['prov_group'] = prov_groupce05f,
        codeStates['setprov_group'] = setprov_groupce05f,
        codeStates['prov_groupce05f'] = prov_groupce05fProps,
        codeStates['setprov_groupce05f'] = setprov_groupce05fProps,
        codeStates['revocation_group'] = revocation_groupbee08,
        codeStates['setrevocation_group'] = setrevocation_groupbee08,
        codeStates['revocation_groupbee08'] = revocation_groupbee08Props,
        codeStates['setrevocation_groupbee08'] = setrevocation_groupbee08Props,
        codeStates['rev_group'] = rev_group1cf92,
        codeStates['setrev_group'] = setrev_group1cf92,
        codeStates['rev_group1cf92'] = rev_group1cf92Props,
        codeStates['setrev_group1cf92'] = setrev_group1cf92Props,
        codeStates['audit_group'] = audit_groupdea6a,
        codeStates['setaudit_group'] = setaudit_groupdea6a,
        codeStates['audit_groupdea6a'] = audit_groupdea6aProps,
        codeStates['setaudit_groupdea6a'] = setaudit_groupdea6aProps,
        codeStates['access_req_id'] = access_req_id4b085,
        codeStates['setaccess_req_id'] = setaccess_req_id4b085,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group99475,
        codeStates['setnew_access_group'] = setnew_access_group99475,
        codeStates['new_access_group99475'] = new_access_group99475Props,
        codeStates['setnew_access_group99475'] = setnew_access_group99475Props,
        codeStates['access_req__group'] = access_req__group580cf,
        codeStates['setaccess_req__group'] = setaccess_req__group580cf,
        codeStates['access_req__group580cf'] = access_req__group580cfProps,
        codeStates['setaccess_req__group580cf'] = setaccess_req__group580cfProps,
        codeStates['business_just__group'] = business_just__group2c68d,
        codeStates['setbusiness_just__group'] = setbusiness_just__group2c68d,
        codeStates['business_just__group2c68d'] = business_just__group2c68dProps,
        codeStates['setbusiness_just__group2c68d'] = setbusiness_just__group2c68dProps,
        codeStates['valid_group'] = valid_group6c83b,
        codeStates['setvalid_group'] = setvalid_group6c83b,
        codeStates['valid_group6c83b'] = valid_group6c83bProps,
        codeStates['setvalid_group6c83b'] = setvalid_group6c83bProps,
        codeStates['app_inf_group'] = app_inf_group5ad5c,
        codeStates['setapp_inf_group'] = setapp_inf_group5ad5c,
        codeStates['app_inf_group5ad5c'] = app_inf_group5ad5cProps,
        codeStates['setapp_inf_group5ad5c'] = setapp_inf_group5ad5cProps,
        codeStates['provision_group'] = provision_groupe166a,
        codeStates['setprovision_group'] = setprovision_groupe166a,
        codeStates['provision_groupe166a'] = provision_groupe166aProps,
        codeStates['setprovision_groupe166a'] = setprovision_groupe166aProps,
        codeStates['prov_group'] = prov_groupce05f,
        codeStates['setprov_group'] = setprov_groupce05f,
        codeStates['prov_groupce05f'] = prov_groupce05fProps,
        codeStates['setprov_groupce05f'] = setprov_groupce05fProps,
        codeStates['revocation_group'] = revocation_groupbee08,
        codeStates['setrevocation_group'] = setrevocation_groupbee08,
        codeStates['revocation_groupbee08'] = revocation_groupbee08Props,
        codeStates['setrevocation_groupbee08'] = setrevocation_groupbee08Props,
        codeStates['rev_group'] = rev_group1cf92,
        codeStates['setrev_group'] = setrev_group1cf92,
        codeStates['rev_group1cf92'] = rev_group1cf92Props,
        codeStates['setrev_group1cf92'] = setrev_group1cf92Props,
        codeStates['audit_group'] = audit_groupdea6a,
        codeStates['setaudit_group'] = setaudit_groupdea6a,
        codeStates['audit_groupdea6a'] = audit_groupdea6aProps,
        codeStates['setaudit_groupdea6a'] = setaudit_groupdea6aProps,
        codeStates['access_req_id'] = access_req_id4b085,
        codeStates['setaccess_req_id'] = setaccess_req_id4b085,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const new_access_group99475Ref = useRef<any>(null);
  const handleClearSearch = () => {
    new_access_group99475Ref.current?.setSearchParams();
    new_access_group99475Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(new_access_group99475) && Object.keys(new_access_group99475)?.length>0)
      {
        setnew_access_group99475({})
      }
    }else 
      prevRefreshRef.current= true
  }, [new_access_group99475Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 156',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setviewaccessrequest_v1((pre:any)=>({...pre,_selectedGroup_:"new_access_group"}))
        }}
    >
        {allowedComponent.includes("access_req__group")  &&<Groupaccess_req__group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("business_just__group")  &&<Groupbusiness_just__group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("valid_group")  &&<Groupvalid_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("app_inf_group")  &&<Groupapp_inf_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("provision_group")  &&<Groupprovision_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("revocation_group")  &&<Grouprevocation_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("audit_group")  &&<Groupaudit_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
          {allowedControls.includes("access_req_id") ?<Textaccess_req_id   /* 4b085 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupnew_access_group
