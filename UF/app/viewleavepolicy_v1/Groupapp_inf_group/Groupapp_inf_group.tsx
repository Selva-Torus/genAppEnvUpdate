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
import Groupapprove_group  from "../Groupapprove_group/Groupapprove_group";
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
import DynamicJsonFormaccrual_rules_dynamicjsonform  from "./DynamicJsonFormaccrual_rules_dynamicjsonform";
import DynamicJsonFormpolicy_rules_dynamicjsonform  from "./DynamicJsonFormpolicy_rules_dynamicjsonform";
import DynamicJsonFormadd_dts_dynamicjsonform  from "./DynamicJsonFormadd_dts_dynamicjsonform";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupapp_inf_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_addleavepolicymodify_v1Props, setdfd_addleavepolicymodify_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_leavetypecombo_v1Props, setdfd_leavetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_accrualfrequencycombo_v1Props, setdfd_accrualfrequencycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_gendercombo_v1Props, setdfd_gendercombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_statecombo_v1Props, setdfd_statecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "accrual_rules_dynamicjsonform",
      "policy_rules_dynamicjsonform",
      "add_dts_dynamicjsonform"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "app_inf_group",
      "approve_group",
      "valid_group",
      "business_just__group",
      "provision_group",
      "leave_rule_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "accrual_rules_dynamicjsonform",
      "policy_rules_dynamicjsonform",
      "add_dts_dynamicjsonform"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "app_inf_group",
      "approve_group",
      "valid_group",
      "business_just__group",
      "provision_group",
      "leave_rule_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "accrual_rules_dynamicjsonform",
      "policy_rules_dynamicjsonform",
      "add_dts_dynamicjsonform"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "app_inf_group",
      "approve_group",
      "valid_group",
      "business_just__group",
      "provision_group",
      "leave_rule_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "accrual_rules_dynamicjsonform",
      "policy_rules_dynamicjsonform",
      "add_dts_dynamicjsonform"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "accrual_rules_dynamicjsonform",
      "policy_rules_dynamicjsonform",
      "add_dts_dynamicjsonform"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "app_inf_group",
      "approve_group",
      "valid_group",
      "business_just__group",
      "provision_group",
      "leave_rule_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "accrual_rules_dynamicjsonform",
      "policy_rules_dynamicjsonform",
      "add_dts_dynamicjsonform"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "app_inf_group",
      "approve_group",
      "valid_group",
      "business_just__group",
      "provision_group",
      "leave_rule_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "accrual_rules_dynamicjsonform",
      "policy_rules_dynamicjsonform",
      "add_dts_dynamicjsonform"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "app_inf_group",
      "approve_group",
      "valid_group",
      "business_just__group",
      "provision_group",
      "leave_rule_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "accrual_rules_dynamicjsonform",
      "policy_rules_dynamicjsonform",
      "add_dts_dynamicjsonform"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "app_inf_group",
      "approve_group",
      "valid_group",
      "business_just__group",
      "provision_group",
      "leave_rule_group"
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
  const {new_access_group193d2, setnew_access_group193d2}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group193d2Props, setnew_access_group193d2Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupc57b7, setaccess_req__groupc57b7}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupc57b7Props, setaccess_req__groupc57b7Props}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group60e94, setapp_inf_group60e94}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group60e94Props, setapp_inf_group60e94Props}= useContext(TotalContext) as TotalContextProps;
  const {approve_group27e47, setapprove_group27e47}= useContext(TotalContext) as TotalContextProps;
  const {approve_group27e47Props, setapprove_group27e47Props}= useContext(TotalContext) as TotalContextProps;
  const {accrual_rules_dynamicjsonformdfeee, setaccrual_rules_dynamicjsonformdfeee}= useContext(TotalContext) as TotalContextProps;
  const {policy_rules_dynamicjsonformac2da, setpolicy_rules_dynamicjsonformac2da}= useContext(TotalContext) as TotalContextProps;
  const {add_dts_dynamicjsonform05d0a, setadd_dts_dynamicjsonform05d0a}= useContext(TotalContext) as TotalContextProps;
  const {valid_group60f4e, setvalid_group60f4e}= useContext(TotalContext) as TotalContextProps;
  const {valid_group60f4eProps, setvalid_group60f4eProps}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group4dcdb, setbusiness_just__group4dcdb}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group4dcdbProps, setbusiness_just__group4dcdbProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_group68072, setprovision_group68072}= useContext(TotalContext) as TotalContextProps;
  const {provision_group68072Props, setprovision_group68072Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_group1e665, setleave_rule_group1e665}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_group1e665Props, setleave_rule_group1e665Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewleavepolicy_v1, setviewleavepolicy_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewLeavePolicy:AFVK:v1',
    [user],
    'GroupAppInfGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "08b04617c842ba0b659b6b0a73f60e94");
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
    setapp_inf_group60e94Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("approve_group")){
        setapprove_group27e47((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(approve_group27e47?.isDisabled==null)
      {
        setapprove_group27e47((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("accrual_rules_dynamicjsonform")){
        setaccrual_rules_dynamicjsonformdfeee((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(accrual_rules_dynamicjsonformdfeee?.isDisabled==null)
      {
        setaccrual_rules_dynamicjsonformdfeee((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_rules_dynamicjsonform")){
        setpolicy_rules_dynamicjsonformac2da((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(policy_rules_dynamicjsonformac2da?.isDisabled==null)
      {
        setpolicy_rules_dynamicjsonformac2da((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("add_dts_dynamicjsonform")){
        setadd_dts_dynamicjsonform05d0a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(add_dts_dynamicjsonform05d0a?.isDisabled==null)
      {
        setadd_dts_dynamicjsonform05d0a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group193d2,
        codeStates['setnew_access_group'] = setnew_access_group193d2,
        codeStates['new_access_group193d2'] = new_access_group193d2Props,
        codeStates['setnew_access_group193d2'] = setnew_access_group193d2Props,
        codeStates['access_req__group'] = access_req__groupc57b7,
        codeStates['setaccess_req__group'] = setaccess_req__groupc57b7,
        codeStates['access_req__groupc57b7'] = access_req__groupc57b7Props,
        codeStates['setaccess_req__groupc57b7'] = setaccess_req__groupc57b7Props,
        codeStates['app_inf_group'] = app_inf_group60e94,
        codeStates['setapp_inf_group'] = setapp_inf_group60e94,
        codeStates['app_inf_group60e94'] = app_inf_group60e94Props,
        codeStates['setapp_inf_group60e94'] = setapp_inf_group60e94Props,
        codeStates['approve_group'] = approve_group27e47,
        codeStates['setapprove_group'] = setapprove_group27e47,
        codeStates['approve_group27e47'] = approve_group27e47Props,
        codeStates['setapprove_group27e47'] = setapprove_group27e47Props,
        codeStates['accrual_rules_dynamicjsonform'] = accrual_rules_dynamicjsonformdfeee,
        codeStates['setaccrual_rules_dynamicjsonform'] = setaccrual_rules_dynamicjsonformdfeee,
        codeStates['policy_rules_dynamicjsonform'] = policy_rules_dynamicjsonformac2da,
        codeStates['setpolicy_rules_dynamicjsonform'] = setpolicy_rules_dynamicjsonformac2da,
        codeStates['add_dts_dynamicjsonform'] = add_dts_dynamicjsonform05d0a,
        codeStates['setadd_dts_dynamicjsonform'] = setadd_dts_dynamicjsonform05d0a,
        codeStates['valid_group'] = valid_group60f4e,
        codeStates['setvalid_group'] = setvalid_group60f4e,
        codeStates['valid_group60f4e'] = valid_group60f4eProps,
        codeStates['setvalid_group60f4e'] = setvalid_group60f4eProps,
        codeStates['business_just__group'] = business_just__group4dcdb,
        codeStates['setbusiness_just__group'] = setbusiness_just__group4dcdb,
        codeStates['business_just__group4dcdb'] = business_just__group4dcdbProps,
        codeStates['setbusiness_just__group4dcdb'] = setbusiness_just__group4dcdbProps,
        codeStates['provision_group'] = provision_group68072,
        codeStates['setprovision_group'] = setprovision_group68072,
        codeStates['provision_group68072'] = provision_group68072Props,
        codeStates['setprovision_group68072'] = setprovision_group68072Props,
        codeStates['leave_rule_group'] = leave_rule_group1e665,
        codeStates['setleave_rule_group'] = setleave_rule_group1e665,
        codeStates['leave_rule_group1e665'] = leave_rule_group1e665Props,
        codeStates['setleave_rule_group1e665'] = setleave_rule_group1e665Props,

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
        codeStates['new_access_group'] = new_access_group193d2,
        codeStates['setnew_access_group'] = setnew_access_group193d2,
        codeStates['new_access_group193d2'] = new_access_group193d2Props,
        codeStates['setnew_access_group193d2'] = setnew_access_group193d2Props,
        codeStates['access_req__group'] = access_req__groupc57b7,
        codeStates['setaccess_req__group'] = setaccess_req__groupc57b7,
        codeStates['access_req__groupc57b7'] = access_req__groupc57b7Props,
        codeStates['setaccess_req__groupc57b7'] = setaccess_req__groupc57b7Props,
        codeStates['app_inf_group'] = app_inf_group60e94,
        codeStates['setapp_inf_group'] = setapp_inf_group60e94,
        codeStates['app_inf_group60e94'] = app_inf_group60e94Props,
        codeStates['setapp_inf_group60e94'] = setapp_inf_group60e94Props,
        codeStates['approve_group'] = approve_group27e47,
        codeStates['setapprove_group'] = setapprove_group27e47,
        codeStates['approve_group27e47'] = approve_group27e47Props,
        codeStates['setapprove_group27e47'] = setapprove_group27e47Props,
        codeStates['accrual_rules_dynamicjsonform'] = accrual_rules_dynamicjsonformdfeee,
        codeStates['setaccrual_rules_dynamicjsonform'] = setaccrual_rules_dynamicjsonformdfeee,
        codeStates['policy_rules_dynamicjsonform'] = policy_rules_dynamicjsonformac2da,
        codeStates['setpolicy_rules_dynamicjsonform'] = setpolicy_rules_dynamicjsonformac2da,
        codeStates['add_dts_dynamicjsonform'] = add_dts_dynamicjsonform05d0a,
        codeStates['setadd_dts_dynamicjsonform'] = setadd_dts_dynamicjsonform05d0a,
        codeStates['valid_group'] = valid_group60f4e,
        codeStates['setvalid_group'] = setvalid_group60f4e,
        codeStates['valid_group60f4e'] = valid_group60f4eProps,
        codeStates['setvalid_group60f4e'] = setvalid_group60f4eProps,
        codeStates['business_just__group'] = business_just__group4dcdb,
        codeStates['setbusiness_just__group'] = setbusiness_just__group4dcdb,
        codeStates['business_just__group4dcdb'] = business_just__group4dcdbProps,
        codeStates['setbusiness_just__group4dcdb'] = setbusiness_just__group4dcdbProps,
        codeStates['provision_group'] = provision_group68072,
        codeStates['setprovision_group'] = setprovision_group68072,
        codeStates['provision_group68072'] = provision_group68072Props,
        codeStates['setprovision_group68072'] = setprovision_group68072Props,
        codeStates['leave_rule_group'] = leave_rule_group1e665,
        codeStates['setleave_rule_group'] = setleave_rule_group1e665,
        codeStates['leave_rule_group1e665'] = leave_rule_group1e665Props,
        codeStates['setleave_rule_group1e665'] = setleave_rule_group1e665Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const app_inf_group60e94Ref = useRef<any>(null);
  const handleClearSearch = () => {
    app_inf_group60e94Ref.current?.setSearchParams();
    app_inf_group60e94Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(app_inf_group60e94) && Object.keys(app_inf_group60e94)?.length>0)
      {
        setapp_inf_group60e94({})
      }
    }else 
      prevRefreshRef.current= true
  }, [app_inf_group60e94Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '13 / 25',
        gridRow: '1 / 136',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#f5f7fb',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setviewleavepolicy_v1((pre:any)=>({...pre,_selectedGroup_:"app_inf_group"}))
        }}
    >
        {allowedComponent.includes("approve_group")  &&<Groupapprove_group  
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
        {allowedControls.includes("accrual_rules_dynamicjsonform") ?<DynamicJsonFormaccrual_rules_dynamicjsonform   /* dfeee */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("policy_rules_dynamicjsonform") ?<DynamicJsonFormpolicy_rules_dynamicjsonform   /* ac2da */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("add_dts_dynamicjsonform") ?<DynamicJsonFormadd_dts_dynamicjsonform   /* 05d0a */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupapp_inf_group
