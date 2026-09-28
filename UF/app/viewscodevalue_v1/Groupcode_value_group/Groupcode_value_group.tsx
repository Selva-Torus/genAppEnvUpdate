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
import Groupcode_group  from "../Groupcode_group/Groupcode_group";
import Groupcode_value_config_group  from "../Groupcode_value_config_group/Groupcode_value_config_group";
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
import Textcode_value_id  from "./Textcode_value_id";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcode_value_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_codevalue_v1Props, setdfd_codevalue_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_codevaluecombo_v1Props, setdfd_codevaluecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "code_value_id"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "code_value_id"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "code_value_id"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "code_value_id"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "code_value_id"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "code_value_id"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "code_value_id"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group"
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
  const {code_value_group30fa3, setcode_value_group30fa3}= useContext(TotalContext) as TotalContextProps;
  const {code_value_group30fa3Props, setcode_value_group30fa3Props}= useContext(TotalContext) as TotalContextProps;
  const {code_group871cc, setcode_group871cc}= useContext(TotalContext) as TotalContextProps;
  const {code_group871ccProps, setcode_group871ccProps}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_groupa4a28, setcode_value_config_groupa4a28}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_groupa4a28Props, setcode_value_config_groupa4a28Props}= useContext(TotalContext) as TotalContextProps;
  const {code_value_idc7b69, setcode_value_idc7b69}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewscodevalue_v1, setviewscodevalue_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewsCodeValue:AFVK:v1',
    [user],
    'GroupCodeValueGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d09ad7171abbcbeee34e48d864d30fa3");
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
    setcode_value_group30fa3Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("code_group")){
        setcode_group871cc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_group871cc?.isDisabled==null)
      {
        setcode_group871cc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("code_value_config_group")){
        setcode_value_config_groupa4a28((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_value_config_groupa4a28?.isDisabled==null)
      {
        setcode_value_config_groupa4a28((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("code_value_id")){
        setcode_value_idc7b69((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_value_idc7b69?.isDisabled==null)
      {
        setcode_value_idc7b69((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['code_value_group'] = code_value_group30fa3,
        codeStates['setcode_value_group'] = setcode_value_group30fa3,
        codeStates['code_value_group30fa3'] = code_value_group30fa3Props,
        codeStates['setcode_value_group30fa3'] = setcode_value_group30fa3Props,
        codeStates['code_group'] = code_group871cc,
        codeStates['setcode_group'] = setcode_group871cc,
        codeStates['code_group871cc'] = code_group871ccProps,
        codeStates['setcode_group871cc'] = setcode_group871ccProps,
        codeStates['code_value_config_group'] = code_value_config_groupa4a28,
        codeStates['setcode_value_config_group'] = setcode_value_config_groupa4a28,
        codeStates['code_value_config_groupa4a28'] = code_value_config_groupa4a28Props,
        codeStates['setcode_value_config_groupa4a28'] = setcode_value_config_groupa4a28Props,
        codeStates['code_value_id'] = code_value_idc7b69,
        codeStates['setcode_value_id'] = setcode_value_idc7b69,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d09ad7171abbcbeee34e48d864d30fa3");
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
        codeStates['code_value_group'] = code_value_group30fa3,
        codeStates['setcode_value_group'] = setcode_value_group30fa3,
        codeStates['code_value_group30fa3'] = code_value_group30fa3Props,
        codeStates['setcode_value_group30fa3'] = setcode_value_group30fa3Props,
        codeStates['code_group'] = code_group871cc,
        codeStates['setcode_group'] = setcode_group871cc,
        codeStates['code_group871cc'] = code_group871ccProps,
        codeStates['setcode_group871cc'] = setcode_group871ccProps,
        codeStates['code_value_config_group'] = code_value_config_groupa4a28,
        codeStates['setcode_value_config_group'] = setcode_value_config_groupa4a28,
        codeStates['code_value_config_groupa4a28'] = code_value_config_groupa4a28Props,
        codeStates['setcode_value_config_groupa4a28'] = setcode_value_config_groupa4a28Props,
        codeStates['code_value_id'] = code_value_idc7b69,
        codeStates['setcode_value_id'] = setcode_value_idc7b69,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const code_value_group30fa3Ref = useRef<any>(null);
  const handleClearSearch = () => {
    code_value_group30fa3Ref.current?.setSearchParams();
    code_value_group30fa3Ref.current?.handleSearch({});
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
        !Array.isArray(code_value_group30fa3) &&
        Object.keys(code_value_group30fa3)?.length > 0
      ) {
        setcode_value_group30fa3({})
      }
    } else prevRefreshRef.current = true
  }, [code_value_group30fa3Props?.refresh])


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
        gridRow: '1 / 75',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '8px',
        backgroundColor:'#f1f2f7',
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
          setviewscodevalue_v1((pre:any)=>({...pre,_selectedGroup_:"code_value_group"}))
        }}
    >
        {allowedComponent.includes("code_group")  &&<Groupcode_group  
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
        {allowedComponent.includes("code_value_config_group")  &&<Groupcode_value_config_group  
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
          {allowedControls.includes("code_value_id") ?<Textcode_value_id   /* c7b69 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcode_value_group
