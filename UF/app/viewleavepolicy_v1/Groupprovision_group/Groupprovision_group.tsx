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
import Groupleave_rule_group  from "../Groupleave_rule_group/Groupleave_rule_group";
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
import Checkboxapproval_required_checkbox  from "./Checkboxapproval_required_checkbox";
import Checkboxencashment_allowed_checkbox  from "./Checkboxencashment_allowed_checkbox";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupprovision_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "approval_required_checkbox",
      "encashment_allowed_checkbox"
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
      "approval_required_checkbox",
      "encashment_allowed_checkbox"
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
      "approval_required_checkbox",
      "encashment_allowed_checkbox"
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
      "approval_required_checkbox",
      "encashment_allowed_checkbox"
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
      "approval_required_checkbox",
      "encashment_allowed_checkbox"
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
      "approval_required_checkbox",
      "encashment_allowed_checkbox"
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
      "approval_required_checkbox",
      "encashment_allowed_checkbox"
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
      "approval_required_checkbox",
      "encashment_allowed_checkbox"
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
  const {valid_group60f4e, setvalid_group60f4e}= useContext(TotalContext) as TotalContextProps;
  const {valid_group60f4eProps, setvalid_group60f4eProps}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group4dcdb, setbusiness_just__group4dcdb}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group4dcdbProps, setbusiness_just__group4dcdbProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_group68072, setprovision_group68072}= useContext(TotalContext) as TotalContextProps;
  const {provision_group68072Props, setprovision_group68072Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_group1e665, setleave_rule_group1e665}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_group1e665Props, setleave_rule_group1e665Props}= useContext(TotalContext) as TotalContextProps;
  const {approval_required_checkbox19a6b, setapproval_required_checkbox19a6b}= useContext(TotalContext) as TotalContextProps;
  const {encashment_allowed_checkboxab660, setencashment_allowed_checkboxab660}= useContext(TotalContext) as TotalContextProps;
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
    'GroupProvisionGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "bfe86a9dffe5625e3ea9b1b300368072");
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
    setprovision_group68072Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("leave_rule_group")){
        setleave_rule_group1e665((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_rule_group1e665?.isDisabled==null)
      {
        setleave_rule_group1e665((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approval_required_checkbox")){
        setapproval_required_checkbox19a6b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(approval_required_checkbox19a6b?.isDisabled==null)
      {
        setapproval_required_checkbox19a6b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("encashment_allowed_checkbox")){
        setencashment_allowed_checkboxab660((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(encashment_allowed_checkboxab660?.isDisabled==null)
      {
        setencashment_allowed_checkboxab660((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['approval_required_checkbox'] = approval_required_checkbox19a6b,
        codeStates['setapproval_required_checkbox'] = setapproval_required_checkbox19a6b,
        codeStates['encashment_allowed_checkbox'] = encashment_allowed_checkboxab660,
        codeStates['setencashment_allowed_checkbox'] = setencashment_allowed_checkboxab660,

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
        codeStates['approval_required_checkbox'] = approval_required_checkbox19a6b,
        codeStates['setapproval_required_checkbox'] = setapproval_required_checkbox19a6b,
        codeStates['encashment_allowed_checkbox'] = encashment_allowed_checkboxab660,
        codeStates['setencashment_allowed_checkbox'] = setencashment_allowed_checkboxab660,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const provision_group68072Ref = useRef<any>(null);
  const handleClearSearch = () => {
    provision_group68072Ref.current?.setSearchParams();
    provision_group68072Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(provision_group68072) && Object.keys(provision_group68072)?.length>0)
      {
        setprovision_group68072({})
      }
    }else 
      prevRefreshRef.current= true
  }, [provision_group68072Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 13',
        gridRow: '111 / 136',
      
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
          setviewleavepolicy_v1((pre:any)=>({...pre,_selectedGroup_:"provision_group"}))
        }}
    >
        {allowedComponent.includes("leave_rule_group")  &&<Groupleave_rule_group  
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
        {allowedControls.includes("approval_required_checkbox") ?<Checkboxapproval_required_checkbox   /* 19a6b */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("encashment_allowed_checkbox") ?<Checkboxencashment_allowed_checkbox   /* ab660 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupprovision_group
