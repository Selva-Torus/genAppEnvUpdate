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
import Groupstage_details_group  from "../Groupstage_details_group/Groupstage_details_group";
import Groupevidence_configuration_group  from "../Groupevidence_configuration_group/Groupevidence_configuration_group";
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
import Texttemplate_stage_id  from "./Texttemplate_stage_id";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "template_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "stage_details_group",
      "evidence_configuration_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "template_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "stage_details_group",
      "evidence_configuration_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "template_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "stage_details_group",
      "evidence_configuration_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "template_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "stage_details_group",
      "evidence_configuration_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "template_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "stage_details_group",
      "evidence_configuration_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "template_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "stage_details_group",
      "evidence_configuration_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "template_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "stage_details_group",
      "evidence_configuration_group"
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
  const {groupcccf9, setgroupcccf9}= useContext(TotalContext) as TotalContextProps;
  const {groupcccf9Props, setgroupcccf9Props}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_groupbaac3, setstage_details_groupbaac3}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_groupbaac3Props, setstage_details_groupbaac3Props}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group80300, setevidence_configuration_group80300}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group80300Props, setevidence_configuration_group80300Props}= useContext(TotalContext) as TotalContextProps;
  const {template_stage_id367bc, settemplate_stage_id367bc}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewcertificationtemplatestage_v1, setviewcertificationtemplatestage_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewCertificationTemplateStage:AFVK:v1',
    [user],
    'GroupGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9798e02857fb4ceb9f69c4c5da1cccf9");
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
    setgroupcccf9Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("stage_details_group")){
        setstage_details_groupbaac3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_details_groupbaac3?.isDisabled==null)
      {
        setstage_details_groupbaac3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("evidence_configuration_group")){
        setevidence_configuration_group80300((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(evidence_configuration_group80300?.isDisabled==null)
      {
        setevidence_configuration_group80300((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("template_stage_id")){
        settemplate_stage_id367bc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_stage_id367bc?.isDisabled==null)
      {
        settemplate_stage_id367bc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupcccf9,
        codeStates['setgroup'] = setgroupcccf9,
        codeStates['groupcccf9'] = groupcccf9Props,
        codeStates['setgroupcccf9'] = setgroupcccf9Props,
        codeStates['stage_details_group'] = stage_details_groupbaac3,
        codeStates['setstage_details_group'] = setstage_details_groupbaac3,
        codeStates['stage_details_groupbaac3'] = stage_details_groupbaac3Props,
        codeStates['setstage_details_groupbaac3'] = setstage_details_groupbaac3Props,
        codeStates['evidence_configuration_group'] = evidence_configuration_group80300,
        codeStates['setevidence_configuration_group'] = setevidence_configuration_group80300,
        codeStates['evidence_configuration_group80300'] = evidence_configuration_group80300Props,
        codeStates['setevidence_configuration_group80300'] = setevidence_configuration_group80300Props,
        codeStates['template_stage_id'] = template_stage_id367bc,
        codeStates['settemplate_stage_id'] = settemplate_stage_id367bc,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9798e02857fb4ceb9f69c4c5da1cccf9");
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
        codeStates['group'] = groupcccf9,
        codeStates['setgroup'] = setgroupcccf9,
        codeStates['groupcccf9'] = groupcccf9Props,
        codeStates['setgroupcccf9'] = setgroupcccf9Props,
        codeStates['stage_details_group'] = stage_details_groupbaac3,
        codeStates['setstage_details_group'] = setstage_details_groupbaac3,
        codeStates['stage_details_groupbaac3'] = stage_details_groupbaac3Props,
        codeStates['setstage_details_groupbaac3'] = setstage_details_groupbaac3Props,
        codeStates['evidence_configuration_group'] = evidence_configuration_group80300,
        codeStates['setevidence_configuration_group'] = setevidence_configuration_group80300,
        codeStates['evidence_configuration_group80300'] = evidence_configuration_group80300Props,
        codeStates['setevidence_configuration_group80300'] = setevidence_configuration_group80300Props,
        codeStates['template_stage_id'] = template_stage_id367bc,
        codeStates['settemplate_stage_id'] = settemplate_stage_id367bc,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const groupcccf9Ref = useRef<any>(null);
  const handleClearSearch = () => {
    groupcccf9Ref.current?.setSearchParams();
    groupcccf9Ref.current?.handleSearch({});
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
        !Array.isArray(groupcccf9) &&
        Object.keys(groupcccf9)?.length > 0
      ) {
        setgroupcccf9({})
      }
    } else prevRefreshRef.current = true
  }, [groupcccf9Props?.refresh])


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
        gridRow: '1 / 85',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setviewcertificationtemplatestage_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
        {allowedComponent.includes("stage_details_group")  &&<Groupstage_details_group  
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
        {allowedComponent.includes("evidence_configuration_group")  &&<Groupevidence_configuration_group  
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
          {allowedControls.includes("template_stage_id") ?<Texttemplate_stage_id   /* 367bc */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup
