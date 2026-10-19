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
import Groupevidence_table  from "../Groupevidence_table/Groupevidence_table";
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


const Groupevidence_table_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_attachevidence_v1Props, setdfd_attachevidence_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "overall_evidences_group",
      "asset_information_group",
      "evidence_table_group",
      "evidence_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_evidences_group",
      "asset_information_group",
      "evidence_table_group",
      "evidence_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_evidences_group",
      "asset_information_group",
      "evidence_table_group",
      "evidence_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_evidences_group",
      "asset_information_group",
      "evidence_table_group",
      "evidence_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_evidences_group",
      "asset_information_group",
      "evidence_table_group",
      "evidence_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_evidences_group",
      "asset_information_group",
      "evidence_table_group",
      "evidence_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_evidences_group",
      "asset_information_group",
      "evidence_table_group",
      "evidence_table"
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
  const {overall_evidences_groupc014d, setoverall_evidences_groupc014d}= useContext(TotalContext) as TotalContextProps;
  const {overall_evidences_groupc014dProps, setoverall_evidences_groupc014dProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_group300d2, setasset_information_group300d2}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_group300d2Props, setasset_information_group300d2Props}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_groupfe37c, setevidence_table_groupfe37c}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_groupfe37cProps, setevidence_table_groupfe37cProps}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table88d5c, setevidence_table88d5c}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table88d5cProps, setevidence_table88d5cProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {attachevidence_v1, setattachevidence_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:attachEvidence:AFVK:v1',
    [user],
    'GroupEvidenceTableGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f9ae9ca7774f470eaa74fa1472cfe37c");
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
    setevidence_table_groupfe37cProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("evidence_table")){
        setevidence_table88d5cProps((pre:any)=>({...pre,...evidence_table88d5c,isDisabled:true}));

    }else
    {
      if(evidence_table88d5c?.isDisabled==null)
      {
        setevidence_table88d5cProps((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_evidences_group'] = overall_evidences_groupc014d,
        codeStates['setoverall_evidences_group'] = setoverall_evidences_groupc014d,
        codeStates['overall_evidences_groupc014d'] = overall_evidences_groupc014dProps,
        codeStates['setoverall_evidences_groupc014d'] = setoverall_evidences_groupc014dProps,
        codeStates['asset_information_group'] = asset_information_group300d2,
        codeStates['setasset_information_group'] = setasset_information_group300d2,
        codeStates['asset_information_group300d2'] = asset_information_group300d2Props,
        codeStates['setasset_information_group300d2'] = setasset_information_group300d2Props,
        codeStates['evidence_table_group'] = evidence_table_groupfe37c,
        codeStates['setevidence_table_group'] = setevidence_table_groupfe37c,
        codeStates['evidence_table_groupfe37c'] = evidence_table_groupfe37cProps,
        codeStates['setevidence_table_groupfe37c'] = setevidence_table_groupfe37cProps,
        codeStates['evidence_table'] = evidence_table88d5c,
        codeStates['setevidence_table'] = setevidence_table88d5c,
        codeStates['evidence_table88d5c'] = evidence_table88d5cProps,
        codeStates['setevidence_table88d5c'] = setevidence_table88d5cProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f9ae9ca7774f470eaa74fa1472cfe37c");
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
        codeStates['overall_evidences_group'] = overall_evidences_groupc014d,
        codeStates['setoverall_evidences_group'] = setoverall_evidences_groupc014d,
        codeStates['overall_evidences_groupc014d'] = overall_evidences_groupc014dProps,
        codeStates['setoverall_evidences_groupc014d'] = setoverall_evidences_groupc014dProps,
        codeStates['asset_information_group'] = asset_information_group300d2,
        codeStates['setasset_information_group'] = setasset_information_group300d2,
        codeStates['asset_information_group300d2'] = asset_information_group300d2Props,
        codeStates['setasset_information_group300d2'] = setasset_information_group300d2Props,
        codeStates['evidence_table_group'] = evidence_table_groupfe37c,
        codeStates['setevidence_table_group'] = setevidence_table_groupfe37c,
        codeStates['evidence_table_groupfe37c'] = evidence_table_groupfe37cProps,
        codeStates['setevidence_table_groupfe37c'] = setevidence_table_groupfe37cProps,
        codeStates['evidence_table'] = evidence_table88d5c,
        codeStates['setevidence_table'] = setevidence_table88d5c,
        codeStates['evidence_table88d5c'] = evidence_table88d5cProps,
        codeStates['setevidence_table88d5c'] = setevidence_table88d5cProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const evidence_table_groupfe37cRef = useRef<any>(null);
  const handleClearSearch = () => {
    evidence_table_groupfe37cRef.current?.setSearchParams();
    evidence_table_groupfe37cRef.current?.handleSearch({});
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
        !Array.isArray(evidence_table_groupfe37c) &&
        Object.keys(evidence_table_groupfe37c)?.length > 0
      ) {
        setevidence_table_groupfe37c({})
        setevidence_table_groupfe37cProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [evidence_table_groupfe37cProps?.refresh])


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
        gridRow: '13 / 67',
      
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
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setattachevidence_v1((pre:any)=>({...pre,_selectedGroup_:"evidence_table_group"}))
        }}
    >
        {allowedComponent.includes("evidence_table")  &&<Groupevidence_table  
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

export default Groupevidence_table_group
