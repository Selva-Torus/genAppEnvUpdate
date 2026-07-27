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
import Grouptotal_employees_table  from "../Grouptotal_employees_table/Grouptotal_employees_table";
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
import Textgrade_text  from "./Textgrade_text";
import Buttonbt_search  from "./Buttonbt_search";
import Buttonbutton_add  from "./Buttonbutton_add";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptotal_employees_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_jobgrade_v1Props, setdfd_jobgrade_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "grade_text",
      "bt_search",
      "button_add"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "grade_text",
      "bt_search",
      "button_add"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "grade_text",
      "bt_search",
      "button_add"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "grade_text",
      "bt_search",
      "button_add"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "grade_text",
      "bt_search",
      "button_add"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "grade_text",
      "bt_search",
      "button_add"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "grade_text",
      "bt_search",
      "button_add"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "grade_text",
      "bt_search",
      "button_add"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "total_employees_table"
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
  const {total_employees_groupf0de6, settotal_employees_groupf0de6}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_groupf0de6Props, settotal_employees_groupf0de6Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_text095b2, setgrade_text095b2}= useContext(TotalContext) as TotalContextProps;
  const {bt_search14c76, setbt_search14c76}= useContext(TotalContext) as TotalContextProps;
  const {button_adde5754, setbutton_adde5754}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table9c094, settotal_employees_table9c094}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table9c094Props, settotal_employees_table9c094Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {employeejobgrades_v1, setemployeejobgrades_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobGrades:AFVK:v1',
    [user],
    'GroupTotalEmployeesGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1ab39691f6fb8fa8afe46fc9c1ef0de6");
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
    settotal_employees_groupf0de6Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("grade_text")){
        setgrade_text095b2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_text095b2?.isDisabled==null)
      {
        setgrade_text095b2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_search")){
        setbt_search14c76((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(bt_search14c76?.isDisabled==null)
      {
        setbt_search14c76((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("button_add")){
        setbutton_adde5754((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(button_adde5754?.isDisabled==null)
      {
        setbutton_adde5754((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("total_employees_table")){
        settotal_employees_table9c094((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(total_employees_table9c094?.isDisabled==null)
      {
        settotal_employees_table9c094((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['total_employees_group'] = total_employees_groupf0de6,
        codeStates['settotal_employees_group'] = settotal_employees_groupf0de6,
        codeStates['total_employees_groupf0de6'] = total_employees_groupf0de6Props,
        codeStates['settotal_employees_groupf0de6'] = settotal_employees_groupf0de6Props,
        codeStates['grade_text'] = grade_text095b2,
        codeStates['setgrade_text'] = setgrade_text095b2,
        codeStates['bt_search'] = bt_search14c76,
        codeStates['setbt_search'] = setbt_search14c76,
        codeStates['button_add'] = button_adde5754,
        codeStates['setbutton_add'] = setbutton_adde5754,
        codeStates['total_employees_table'] = total_employees_table9c094,
        codeStates['settotal_employees_table'] = settotal_employees_table9c094,
        codeStates['total_employees_table9c094'] = total_employees_table9c094Props,
        codeStates['settotal_employees_table9c094'] = settotal_employees_table9c094Props,

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
        codeStates['total_employees_group'] = total_employees_groupf0de6,
        codeStates['settotal_employees_group'] = settotal_employees_groupf0de6,
        codeStates['total_employees_groupf0de6'] = total_employees_groupf0de6Props,
        codeStates['settotal_employees_groupf0de6'] = settotal_employees_groupf0de6Props,
        codeStates['grade_text'] = grade_text095b2,
        codeStates['setgrade_text'] = setgrade_text095b2,
        codeStates['bt_search'] = bt_search14c76,
        codeStates['setbt_search'] = setbt_search14c76,
        codeStates['button_add'] = button_adde5754,
        codeStates['setbutton_add'] = setbutton_adde5754,
        codeStates['total_employees_table'] = total_employees_table9c094,
        codeStates['settotal_employees_table'] = settotal_employees_table9c094,
        codeStates['total_employees_table9c094'] = total_employees_table9c094Props,
        codeStates['settotal_employees_table9c094'] = settotal_employees_table9c094Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const total_employees_groupf0de6Ref = useRef<any>(null);
  const handleClearSearch = () => {
    total_employees_groupf0de6Ref.current?.setSearchParams();
    total_employees_groupf0de6Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(total_employees_groupf0de6) && Object.keys(total_employees_groupf0de6)?.length>0)
      {
        settotal_employees_groupf0de6({})
      }
    }else 
      prevRefreshRef.current= true
  }, [total_employees_groupf0de6Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 150',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '12px',
        backgroundColor:'#f8fafc',
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
          setemployeejobgrades_v1((pre:any)=>({...pre,_selectedGroup_:"total_employees_group"}))
        }}
    >
        {allowedComponent.includes("total_employees_table")  &&<Grouptotal_employees_table  
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
          {allowedControls.includes("grade_text") ?<Textgrade_text   /* 095b2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "bt_search" in ButtonGoRuleData)?ButtonGoRuleData["bt_search"]:true) && 
          allowedControls.includes("bt_search")  ?            <Buttonbt_search tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "button_add" in ButtonGoRuleData)?ButtonGoRuleData["button_add"]:true) && 
          allowedControls.includes("button_add")  ?            <Buttonbutton_add tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Grouptotal_employees_group
