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
import Groupadd_rule_condition_header  from "../Groupadd_rule_condition_header/Groupadd_rule_condition_header";
import Groupgroup  from "../Groupgroup/Groupgroup";
import Groupschedule_group  from "../Groupschedule_group/Groupschedule_group";
import Groupstatus_group  from "../Groupstatus_group/Groupstatus_group";
import Groupadd_rule_condition  from "../Groupadd_rule_condition/Groupadd_rule_condition";
import Groupdynamicactions  from "../Groupdynamicactions/Groupdynamicactions";
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
import Textcert_stage_id  from "./Textcert_stage_id";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupadd_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_ruleconditioncombo_v1Props, setdfd_ruleconditioncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_riskrulecondition_v1Props, setdfd_riskrulecondition_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_riskoperatorcodecombo_v1Props, setdfd_riskoperatorcodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "cert_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition_header",
      "group",
      "schedule_group",
      "status_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "cert_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition_header",
      "group",
      "schedule_group",
      "status_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "cert_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition_header",
      "group",
      "schedule_group",
      "status_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "cert_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition_header",
      "group",
      "schedule_group",
      "status_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "cert_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition_header",
      "group",
      "schedule_group",
      "status_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "cert_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition_header",
      "group",
      "schedule_group",
      "status_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "cert_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition_header",
      "group",
      "schedule_group",
      "status_group",
      "add_rule_condition",
      "dynamicactions"
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
  const {add_groupac52e, setadd_groupac52e}= useContext(TotalContext) as TotalContextProps;
  const {add_groupac52eProps, setadd_groupac52eProps}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition_headerf18e6, setadd_rule_condition_headerf18e6}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition_headerf18e6Props, setadd_rule_condition_headerf18e6Props}= useContext(TotalContext) as TotalContextProps;
  const {group73b09, setgroup73b09}= useContext(TotalContext) as TotalContextProps;
  const {group73b09Props, setgroup73b09Props}= useContext(TotalContext) as TotalContextProps;
  const {schedule_groupc0bee, setschedule_groupc0bee}= useContext(TotalContext) as TotalContextProps;
  const {schedule_groupc0beeProps, setschedule_groupc0beeProps}= useContext(TotalContext) as TotalContextProps;
  const {status_groupc59b9, setstatus_groupc59b9}= useContext(TotalContext) as TotalContextProps;
  const {status_groupc59b9Props, setstatus_groupc59b9Props}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition96c45, setadd_rule_condition96c45}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition96c45Props, setadd_rule_condition96c45Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_stage_id5ee11, setcert_stage_id5ee11}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions62ac1, setdynamicactions62ac1}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions62ac1Props, setdynamicactions62ac1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addreviewscreen_v1, setaddreviewscreen_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addReviewScreen:AFVK:v1',
    [user],
    'GroupAddGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "78f474301700964efed3e6ba0d0ac52e");
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
    setadd_groupac52eProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("add_rule_condition_header")){
        setadd_rule_condition_headerf18e6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(add_rule_condition_headerf18e6?.isDisabled==null)
      {
        setadd_rule_condition_headerf18e6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("group")){
        setgroup73b09((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(group73b09?.isDisabled==null)
      {
        setgroup73b09((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("schedule_group")){
        setschedule_groupc0bee((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(schedule_groupc0bee?.isDisabled==null)
      {
        setschedule_groupc0bee((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status_group")){
        setstatus_groupc59b9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status_groupc59b9?.isDisabled==null)
      {
        setstatus_groupc59b9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("add_rule_condition")){
        setadd_rule_condition96c45((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(add_rule_condition96c45?.isDisabled==null)
      {
        setadd_rule_condition96c45((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_stage_id")){
        setcert_stage_id5ee11((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_stage_id5ee11?.isDisabled==null)
      {
        setcert_stage_id5ee11((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dynamicactions")){
        setdynamicactions62ac1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dynamicactions62ac1?.isDisabled==null)
      {
        setdynamicactions62ac1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_group'] = add_groupac52e,
        codeStates['setadd_group'] = setadd_groupac52e,
        codeStates['add_groupac52e'] = add_groupac52eProps,
        codeStates['setadd_groupac52e'] = setadd_groupac52eProps,
        codeStates['add_rule_condition_header'] = add_rule_condition_headerf18e6,
        codeStates['setadd_rule_condition_header'] = setadd_rule_condition_headerf18e6,
        codeStates['add_rule_condition_headerf18e6'] = add_rule_condition_headerf18e6Props,
        codeStates['setadd_rule_condition_headerf18e6'] = setadd_rule_condition_headerf18e6Props,
        codeStates['group'] = group73b09,
        codeStates['setgroup'] = setgroup73b09,
        codeStates['group73b09'] = group73b09Props,
        codeStates['setgroup73b09'] = setgroup73b09Props,
        codeStates['schedule_group'] = schedule_groupc0bee,
        codeStates['setschedule_group'] = setschedule_groupc0bee,
        codeStates['schedule_groupc0bee'] = schedule_groupc0beeProps,
        codeStates['setschedule_groupc0bee'] = setschedule_groupc0beeProps,
        codeStates['status_group'] = status_groupc59b9,
        codeStates['setstatus_group'] = setstatus_groupc59b9,
        codeStates['status_groupc59b9'] = status_groupc59b9Props,
        codeStates['setstatus_groupc59b9'] = setstatus_groupc59b9Props,
        codeStates['add_rule_condition'] = add_rule_condition96c45,
        codeStates['setadd_rule_condition'] = setadd_rule_condition96c45,
        codeStates['add_rule_condition96c45'] = add_rule_condition96c45Props,
        codeStates['setadd_rule_condition96c45'] = setadd_rule_condition96c45Props,
        codeStates['cert_stage_id'] = cert_stage_id5ee11,
        codeStates['setcert_stage_id'] = setcert_stage_id5ee11,
        codeStates['dynamicactions'] = dynamicactions62ac1,
        codeStates['setdynamicactions'] = setdynamicactions62ac1,
        codeStates['dynamicactions62ac1'] = dynamicactions62ac1Props,
        codeStates['setdynamicactions62ac1'] = setdynamicactions62ac1Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "78f474301700964efed3e6ba0d0ac52e");
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
        codeStates['add_group'] = add_groupac52e,
        codeStates['setadd_group'] = setadd_groupac52e,
        codeStates['add_groupac52e'] = add_groupac52eProps,
        codeStates['setadd_groupac52e'] = setadd_groupac52eProps,
        codeStates['add_rule_condition_header'] = add_rule_condition_headerf18e6,
        codeStates['setadd_rule_condition_header'] = setadd_rule_condition_headerf18e6,
        codeStates['add_rule_condition_headerf18e6'] = add_rule_condition_headerf18e6Props,
        codeStates['setadd_rule_condition_headerf18e6'] = setadd_rule_condition_headerf18e6Props,
        codeStates['group'] = group73b09,
        codeStates['setgroup'] = setgroup73b09,
        codeStates['group73b09'] = group73b09Props,
        codeStates['setgroup73b09'] = setgroup73b09Props,
        codeStates['schedule_group'] = schedule_groupc0bee,
        codeStates['setschedule_group'] = setschedule_groupc0bee,
        codeStates['schedule_groupc0bee'] = schedule_groupc0beeProps,
        codeStates['setschedule_groupc0bee'] = setschedule_groupc0beeProps,
        codeStates['status_group'] = status_groupc59b9,
        codeStates['setstatus_group'] = setstatus_groupc59b9,
        codeStates['status_groupc59b9'] = status_groupc59b9Props,
        codeStates['setstatus_groupc59b9'] = setstatus_groupc59b9Props,
        codeStates['add_rule_condition'] = add_rule_condition96c45,
        codeStates['setadd_rule_condition'] = setadd_rule_condition96c45,
        codeStates['add_rule_condition96c45'] = add_rule_condition96c45Props,
        codeStates['setadd_rule_condition96c45'] = setadd_rule_condition96c45Props,
        codeStates['cert_stage_id'] = cert_stage_id5ee11,
        codeStates['setcert_stage_id'] = setcert_stage_id5ee11,
        codeStates['dynamicactions'] = dynamicactions62ac1,
        codeStates['setdynamicactions'] = setdynamicactions62ac1,
        codeStates['dynamicactions62ac1'] = dynamicactions62ac1Props,
        codeStates['setdynamicactions62ac1'] = setdynamicactions62ac1Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const add_groupac52eRef = useRef<any>(null);
  const handleClearSearch = () => {
    add_groupac52eRef.current?.setSearchParams();
    add_groupac52eRef.current?.handleSearch({});
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
        !Array.isArray(add_groupac52e) &&
        Object.keys(add_groupac52e)?.length > 0
      ) {
        setadd_groupac52e({})
        setadd_groupac52eProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [add_groupac52eProps?.refresh])


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
        gridRow: '1 / 111',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '4px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaddreviewscreen_v1((pre:any)=>({...pre,_selectedGroup_:"add_group"}))
        }}
    >
        {allowedComponent.includes("add_rule_condition_header")  &&<Groupadd_rule_condition_header  
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
        {allowedComponent.includes("group")  &&<Groupgroup  
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
        {allowedComponent.includes("schedule_group")  &&<Groupschedule_group  
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
        {allowedComponent.includes("status_group")  &&<Groupstatus_group  
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
        {allowedComponent.includes("add_rule_condition")  &&<Groupadd_rule_condition  
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
        {allowedComponent.includes("dynamicactions")  &&<Groupdynamicactions  
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
          {allowedControls.includes("cert_stage_id") ?<Textcert_stage_id   /* 5ee11 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupadd_group
