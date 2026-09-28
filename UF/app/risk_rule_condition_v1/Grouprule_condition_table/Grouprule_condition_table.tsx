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
import Tablerule_condition_table  from './Tablerule_condition_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouprule_condition_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const { token } = useGlobal();
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
  const {dfd_riskrulecondition_v1Props, setdfd_riskrulecondition_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "AI Product Owner": {
    "allowedControls": [
      "rule_condition_id",
      "risk_rule_id",
      "attribute_name",
      "operator_code",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "rule_condition_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "rule_condition_id",
      "risk_rule_id",
      "attribute_name",
      "operator_code",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "rule_condition_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "rule_condition_id",
      "risk_rule_id",
      "attribute_name",
      "operator_code",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "rule_condition_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "rule_condition_id",
      "risk_rule_id",
      "attribute_name",
      "operator_code",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "rule_condition_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "rule_condition_id",
      "risk_rule_id",
      "attribute_name",
      "operator_code",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "rule_condition_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "rule_condition_id",
      "risk_rule_id",
      "attribute_name",
      "operator_code",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "rule_condition_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "rule_condition_id",
      "risk_rule_id",
      "attribute_name",
      "operator_code",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "rule_condition_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const handleOnloadCalledRef = useRef(false);
  const securityCheckPromiseRef = useRef<Promise<any> | null>(null);
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
  const {codesets_group1c519, setcodesets_group1c519}= useContext(TotalContext) as TotalContextProps;
  const {codesets_group1c519Props, setcodesets_group1c519Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_condition_table7b41f, setrule_condition_table7b41f}= useContext(TotalContext) as TotalContextProps;
  const {rule_condition_table7b41fProps, setrule_condition_table7b41fProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_condition_id14d5f, setrule_condition_id14d5f}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_id1c126, setrisk_rule_id1c126}= useContext(TotalContext) as TotalContextProps;
  const {attribute_name32305, setattribute_name32305}= useContext(TotalContext) as TotalContextProps;
  const {operator_code14f9a, setoperator_code14f9a}= useContext(TotalContext) as TotalContextProps;
  const {is_active01a05, setis_active01a05}= useContext(TotalContext) as TotalContextProps;
  const {view_btn1c5a8, setview_btn1c5a8}= useContext(TotalContext) as TotalContextProps;
  const {edit_btnd6c8c, setedit_btnd6c8c}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn4c4a1, setdelete_btn4c4a1}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {rulecondition_v1, setrulecondition_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ruleCondition:AFVK:v1',
    [user],
    'GroupRuleConditionTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "676bd9b073bec5cd5dc14ac6f257b41f");
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
    setrule_condition_table7b41fProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("rule_condition_id")){
        setrule_condition_id14d5f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(rule_condition_id14d5f?.isDisabled==null)
      {
        setrule_condition_id14d5f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_rule_id")){
        setrisk_rule_id1c126((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_rule_id1c126?.isDisabled==null)
      {
        setrisk_rule_id1c126((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attribute_name")){
        setattribute_name32305((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(attribute_name32305?.isDisabled==null)
      {
        setattribute_name32305((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("operator_code")){
        setoperator_code14f9a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(operator_code14f9a?.isDisabled==null)
      {
        setoperator_code14f9a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active01a05((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active01a05?.isDisabled==null)
      {
        setis_active01a05((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btn1c5a8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(view_btn1c5a8?.isDisabled==null)
      {
        setview_btn1c5a8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btnd6c8c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btnd6c8c?.isDisabled==null)
      {
        setedit_btnd6c8c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btn4c4a1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_btn4c4a1?.isDisabled==null)
      {
        setdelete_btn4c4a1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "676bd9b073bec5cd5dc14ac6f257b41f");
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
  }


    const handleOnload=()=>{
  }
  const handleOnChange=async ()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['codesets_group'] = codesets_group1c519,
        codeStates['setcodesets_group'] = setcodesets_group1c519,
        codeStates['codesets_group1c519'] = codesets_group1c519Props,
        codeStates['setcodesets_group1c519'] = setcodesets_group1c519Props,
        codeStates['rule_condition_table'] = rule_condition_table7b41f,
        codeStates['setrule_condition_table'] = setrule_condition_table7b41f,
        codeStates['rule_condition_table7b41f'] = rule_condition_table7b41fProps,
        codeStates['setrule_condition_table7b41f'] = setrule_condition_table7b41fProps,
        codeStates['rule_condition_id'] = rule_condition_id14d5f,
        codeStates['setrule_condition_id'] = setrule_condition_id14d5f,
        codeStates['risk_rule_id'] = risk_rule_id1c126,
        codeStates['setrisk_rule_id'] = setrisk_rule_id1c126,
        codeStates['attribute_name'] = attribute_name32305,
        codeStates['setattribute_name'] = setattribute_name32305,
        codeStates['operator_code'] = operator_code14f9a,
        codeStates['setoperator_code'] = setoperator_code14f9a,
        codeStates['is_active'] = is_active01a05,
        codeStates['setis_active'] = setis_active01a05,
        codeStates['view_btn'] = view_btn1c5a8,
        codeStates['setview_btn'] = setview_btn1c5a8,
        codeStates['edit_btn'] = edit_btnd6c8c,
        codeStates['setedit_btn'] = setedit_btnd6c8c,
        codeStates['delete_btn'] = delete_btn4c4a1,
        codeStates['setdelete_btn'] = setdelete_btn4c4a1,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const rule_condition_table7b41fRef = useRef<any>(null);
  const handleClearSearch = () => {
    rule_condition_table7b41fRef.current?.setSearchParams();
    rule_condition_table7b41fRef.current?.handleSearch({});
  };

  useEffect(() => {
    securityCheckPromiseRef.current = securityCheck()
  }, [token])

  useEffect(() => {
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true;
      (async () => {
        await securityCheckPromiseRef.current
        handleOnload()
      })()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(rule_condition_table7b41f) &&
        Object.keys(rule_condition_table7b41f)?.length > 0
      ) {
        setrule_condition_table7b41f({})
      }
    } else prevRefreshRef.current = true
  }, [rule_condition_table7b41fProps?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '9 / 141',
      
        //rowGap: '0px',
        overflow: 'visible',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setrulecondition_v1((pre:any)=>({...pre,_selectedGroup_:"rule_condition_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablerule_condition_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={rule_condition_table7b41fRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouprule_condition_table
