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
import Tablecode_table  from './Tablecode_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcode_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_codetype_v1Props, setdfd_codetype_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "code_type_id",
      "code_type",
      "description",
      "is_system",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "trs_event_process_status"
    ],
    "allowedGroups": [
      "canvas",
      "code_group",
      "code_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "code_type_id",
      "code_type",
      "description",
      "is_system",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "trs_event_process_status"
    ],
    "allowedGroups": [
      "canvas",
      "code_group",
      "code_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "code_type_id",
      "code_type",
      "description",
      "is_system",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "trs_event_process_status"
    ],
    "allowedGroups": [
      "canvas",
      "code_group",
      "code_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "code_type_id",
      "code_type",
      "description",
      "is_system",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "trs_event_process_status"
    ],
    "allowedGroups": [
      "canvas",
      "code_group",
      "code_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "code_type_id",
      "code_type",
      "description",
      "is_system",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "trs_event_process_status"
    ],
    "allowedGroups": [
      "canvas",
      "code_group",
      "code_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "code_type_id",
      "code_type",
      "description",
      "is_system",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "trs_event_process_status"
    ],
    "allowedGroups": [
      "canvas",
      "code_group",
      "code_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "code_type_id",
      "code_type",
      "description",
      "is_system",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "trs_event_process_status"
    ],
    "allowedGroups": [
      "canvas",
      "code_group",
      "code_table"
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
  const {code_groupe769a, setcode_groupe769a}= useContext(TotalContext) as TotalContextProps;
  const {code_groupe769aProps, setcode_groupe769aProps}= useContext(TotalContext) as TotalContextProps;
  const {code_table4f011, setcode_table4f011}= useContext(TotalContext) as TotalContextProps;
  const {code_table4f011Props, setcode_table4f011Props}= useContext(TotalContext) as TotalContextProps;
  const {code_type_id290d4, setcode_type_id290d4}= useContext(TotalContext) as TotalContextProps;
  const {code_typea529e, setcode_typea529e}= useContext(TotalContext) as TotalContextProps;
  const {descriptionc87f7, setdescriptionc87f7}= useContext(TotalContext) as TotalContextProps;
  const {is_system8e69b, setis_system8e69b}= useContext(TotalContext) as TotalContextProps;
  const {is_active6db20, setis_active6db20}= useContext(TotalContext) as TotalContextProps;
  const {view_btnd2f71, setview_btnd2f71}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn90e4f, setedit_btn90e4f}= useContext(TotalContext) as TotalContextProps;
  const {delete_btneea06, setdelete_btneea06}= useContext(TotalContext) as TotalContextProps;
  const {trs_event_process_status54d4f, settrs_event_process_status54d4f}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {codetypes_v1, setcodetypes_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:codeTypes:AFVK:v1',
    [user],
    'GroupCodeTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "86a6076b26344fccbc7674d246c4f011");
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
    setcode_table4f011Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("code_type_id")){
        setcode_type_id290d4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_type_id290d4?.isDisabled==null)
      {
        setcode_type_id290d4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("code_type")){
        setcode_typea529e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_typea529e?.isDisabled==null)
      {
        setcode_typea529e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("description")){
        setdescriptionc87f7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(descriptionc87f7?.isDisabled==null)
      {
        setdescriptionc87f7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_system")){
        setis_system8e69b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_system8e69b?.isDisabled==null)
      {
        setis_system8e69b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active6db20((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active6db20?.isDisabled==null)
      {
        setis_active6db20((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btnd2f71((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(view_btnd2f71?.isDisabled==null)
      {
        setview_btnd2f71((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btn90e4f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btn90e4f?.isDisabled==null)
      {
        setedit_btn90e4f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btneea06((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_btneea06?.isDisabled==null)
      {
        setdelete_btneea06((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_event_process_status")){
        settrs_event_process_status54d4f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trs_event_process_status54d4f?.isDisabled==null)
      {
        settrs_event_process_status54d4f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "86a6076b26344fccbc7674d246c4f011");
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
        codeStates['code_group'] = code_groupe769a,
        codeStates['setcode_group'] = setcode_groupe769a,
        codeStates['code_groupe769a'] = code_groupe769aProps,
        codeStates['setcode_groupe769a'] = setcode_groupe769aProps,
        codeStates['code_table'] = code_table4f011,
        codeStates['setcode_table'] = setcode_table4f011,
        codeStates['code_table4f011'] = code_table4f011Props,
        codeStates['setcode_table4f011'] = setcode_table4f011Props,
        codeStates['code_type_id'] = code_type_id290d4,
        codeStates['setcode_type_id'] = setcode_type_id290d4,
        codeStates['code_type'] = code_typea529e,
        codeStates['setcode_type'] = setcode_typea529e,
        codeStates['description'] = descriptionc87f7,
        codeStates['setdescription'] = setdescriptionc87f7,
        codeStates['is_system'] = is_system8e69b,
        codeStates['setis_system'] = setis_system8e69b,
        codeStates['is_active'] = is_active6db20,
        codeStates['setis_active'] = setis_active6db20,
        codeStates['view_btn'] = view_btnd2f71,
        codeStates['setview_btn'] = setview_btnd2f71,
        codeStates['edit_btn'] = edit_btn90e4f,
        codeStates['setedit_btn'] = setedit_btn90e4f,
        codeStates['delete_btn'] = delete_btneea06,
        codeStates['setdelete_btn'] = setdelete_btneea06,
        codeStates['trs_event_process_status'] = trs_event_process_status54d4f,
        codeStates['settrs_event_process_status'] = settrs_event_process_status54d4f,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const code_table4f011Ref = useRef<any>(null);
  const handleClearSearch = () => {
    code_table4f011Ref.current?.setSearchParams();
    code_table4f011Ref.current?.handleSearch({});
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
        !Array.isArray(code_table4f011) &&
        Object.keys(code_table4f011)?.length > 0
      ) {
        setcode_table4f011({})
      }
    } else prevRefreshRef.current = true
  }, [code_table4f011Props?.refresh])


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
        gridRow: '10 / 146',
      
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
          setcodetypes_v1((pre:any)=>({...pre,_selectedGroup_:"code_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablecode_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={code_table4f011Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupcode_table
