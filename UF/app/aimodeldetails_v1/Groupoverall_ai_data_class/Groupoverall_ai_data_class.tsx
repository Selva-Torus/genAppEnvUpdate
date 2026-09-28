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
import Groupai_dataclass_group  from "../Groupai_dataclass_group/Groupai_dataclass_group";
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
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupoverall_ai_data_class = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_modeldetails_v1Props, setdfd_modeldetails_v1Props} = useContext(TotalContext) as TotalContextProps;
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
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_dataclass_group",
      "ai_registry_text_group",
      "ai_dataclass_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_dataclass_group",
      "ai_registry_text_group",
      "ai_dataclass_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_dataclass_group",
      "ai_registry_text_group",
      "ai_dataclass_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_dataclass_group",
      "ai_registry_text_group",
      "ai_dataclass_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_dataclass_group",
      "ai_registry_text_group",
      "ai_dataclass_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_dataclass_group",
      "ai_registry_text_group",
      "ai_dataclass_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_dataclass_group",
      "ai_registry_text_group",
      "ai_dataclass_table"
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
  const {overall_ai_data_class16ac0, setoverall_ai_data_class16ac0}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_data_class16ac0Props, setoverall_ai_data_class16ac0Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_group790bb, setai_dataclass_group790bb}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_group790bbProps, setai_dataclass_group790bbProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupd028b, setai_registry_text_groupd028b}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupd028bProps, setai_registry_text_groupd028bProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_tabled37dd, setai_dataclass_tabled37dd}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_tabled37ddProps, setai_dataclass_tabled37ddProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {aimodeldetails_v1, setaimodeldetails_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIModelDetails:AFVK:v1',
    [user],
    'GroupOverallAiDataClass',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8f4026b76d1e03d03b5413acf5716ac0");
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
    setoverall_ai_data_class16ac0Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ai_dataclass_group")){
        setai_dataclass_group790bb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_dataclass_group790bb?.isDisabled==null)
      {
        setai_dataclass_group790bb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_data_class'] = overall_ai_data_class16ac0,
        codeStates['setoverall_ai_data_class'] = setoverall_ai_data_class16ac0,
        codeStates['overall_ai_data_class16ac0'] = overall_ai_data_class16ac0Props,
        codeStates['setoverall_ai_data_class16ac0'] = setoverall_ai_data_class16ac0Props,
        codeStates['ai_dataclass_group'] = ai_dataclass_group790bb,
        codeStates['setai_dataclass_group'] = setai_dataclass_group790bb,
        codeStates['ai_dataclass_group790bb'] = ai_dataclass_group790bbProps,
        codeStates['setai_dataclass_group790bb'] = setai_dataclass_group790bbProps,
        codeStates['ai_registry_text_group'] = ai_registry_text_groupd028b,
        codeStates['setai_registry_text_group'] = setai_registry_text_groupd028b,
        codeStates['ai_registry_text_groupd028b'] = ai_registry_text_groupd028bProps,
        codeStates['setai_registry_text_groupd028b'] = setai_registry_text_groupd028bProps,
        codeStates['ai_dataclass_table'] = ai_dataclass_tabled37dd,
        codeStates['setai_dataclass_table'] = setai_dataclass_tabled37dd,
        codeStates['ai_dataclass_tabled37dd'] = ai_dataclass_tabled37ddProps,
        codeStates['setai_dataclass_tabled37dd'] = setai_dataclass_tabled37ddProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8f4026b76d1e03d03b5413acf5716ac0");
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
        codeStates['overall_ai_data_class'] = overall_ai_data_class16ac0,
        codeStates['setoverall_ai_data_class'] = setoverall_ai_data_class16ac0,
        codeStates['overall_ai_data_class16ac0'] = overall_ai_data_class16ac0Props,
        codeStates['setoverall_ai_data_class16ac0'] = setoverall_ai_data_class16ac0Props,
        codeStates['ai_dataclass_group'] = ai_dataclass_group790bb,
        codeStates['setai_dataclass_group'] = setai_dataclass_group790bb,
        codeStates['ai_dataclass_group790bb'] = ai_dataclass_group790bbProps,
        codeStates['setai_dataclass_group790bb'] = setai_dataclass_group790bbProps,
        codeStates['ai_registry_text_group'] = ai_registry_text_groupd028b,
        codeStates['setai_registry_text_group'] = setai_registry_text_groupd028b,
        codeStates['ai_registry_text_groupd028b'] = ai_registry_text_groupd028bProps,
        codeStates['setai_registry_text_groupd028b'] = setai_registry_text_groupd028bProps,
        codeStates['ai_dataclass_table'] = ai_dataclass_tabled37dd,
        codeStates['setai_dataclass_table'] = setai_dataclass_tabled37dd,
        codeStates['ai_dataclass_tabled37dd'] = ai_dataclass_tabled37ddProps,
        codeStates['setai_dataclass_tabled37dd'] = setai_dataclass_tabled37ddProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const overall_ai_data_class16ac0Ref = useRef<any>(null);
  const handleClearSearch = () => {
    overall_ai_data_class16ac0Ref.current?.setSearchParams();
    overall_ai_data_class16ac0Ref.current?.handleSearch({});
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
        !Array.isArray(overall_ai_data_class16ac0) &&
        Object.keys(overall_ai_data_class16ac0)?.length > 0
      ) {
        setoverall_ai_data_class16ac0({})
      }
    } else prevRefreshRef.current = true
  }, [overall_ai_data_class16ac0Props?.refresh])


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
        gridRow: '1 / 152',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
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
          setaimodeldetails_v1((pre:any)=>({...pre,_selectedGroup_:"overall_ai_data_class"}))
        }}
    >
        {allowedComponent.includes("ai_dataclass_group")  &&<Groupai_dataclass_group  
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
    </div>
 )
}

export default Groupoverall_ai_data_class
