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
import Tablecode_sets_table  from './Tablecode_sets_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcode_sets_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "code_value_id",
      "code_type_id",
      "code",
      "display_name",
      "description",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "code_value_id",
      "code_type_id",
      "code",
      "display_name",
      "description",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "code_value_id",
      "code_type_id",
      "code",
      "display_name",
      "description",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "code_value_id",
      "code_type_id",
      "code",
      "display_name",
      "description",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "code_value_id",
      "code_type_id",
      "code",
      "display_name",
      "description",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "code_value_id",
      "code_type_id",
      "code",
      "display_name",
      "description",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "code_value_id",
      "code_type_id",
      "code",
      "display_name",
      "description",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
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
  const {codesets_groupbc8b0, setcodesets_groupbc8b0}= useContext(TotalContext) as TotalContextProps;
  const {codesets_groupbc8b0Props, setcodesets_groupbc8b0Props}= useContext(TotalContext) as TotalContextProps;
  const {code_sets_tablec9811, setcode_sets_tablec9811}= useContext(TotalContext) as TotalContextProps;
  const {code_sets_tablec9811Props, setcode_sets_tablec9811Props}= useContext(TotalContext) as TotalContextProps;
  const {code_value_id599be, setcode_value_id599be}= useContext(TotalContext) as TotalContextProps;
  const {code_type_idcc48b, setcode_type_idcc48b}= useContext(TotalContext) as TotalContextProps;
  const {code597af, setcode597af}= useContext(TotalContext) as TotalContextProps;
  const {display_named01df, setdisplay_named01df}= useContext(TotalContext) as TotalContextProps;
  const {descriptione73c2, setdescriptione73c2}= useContext(TotalContext) as TotalContextProps;
  const {is_active35e58, setis_active35e58}= useContext(TotalContext) as TotalContextProps;
  const {view_btn5b489, setview_btn5b489}= useContext(TotalContext) as TotalContextProps;
  const {edit_btna0277, setedit_btna0277}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn10f06, setdelete_btn10f06}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {codevalue_v1, setcodevalue_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1',
    [user],
    'GroupCodeSetsTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c1f53e1b22158e787919d4f1987c9811");
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
    setcode_sets_tablec9811Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("code_value_id")){
        setcode_value_id599be((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_value_id599be?.isDisabled==null)
      {
        setcode_value_id599be((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("code_type_id")){
        setcode_type_idcc48b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_type_idcc48b?.isDisabled==null)
      {
        setcode_type_idcc48b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("code")){
        setcode597af((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code597af?.isDisabled==null)
      {
        setcode597af((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("display_name")){
        setdisplay_named01df((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(display_named01df?.isDisabled==null)
      {
        setdisplay_named01df((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("description")){
        setdescriptione73c2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(descriptione73c2?.isDisabled==null)
      {
        setdescriptione73c2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active35e58((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active35e58?.isDisabled==null)
      {
        setis_active35e58((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btn5b489((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(view_btn5b489?.isDisabled==null)
      {
        setview_btn5b489((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btna0277((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btna0277?.isDisabled==null)
      {
        setedit_btna0277((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btn10f06((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_btn10f06?.isDisabled==null)
      {
        setdelete_btn10f06((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c1f53e1b22158e787919d4f1987c9811");
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
        codeStates['codesets_group'] = codesets_groupbc8b0,
        codeStates['setcodesets_group'] = setcodesets_groupbc8b0,
        codeStates['codesets_groupbc8b0'] = codesets_groupbc8b0Props,
        codeStates['setcodesets_groupbc8b0'] = setcodesets_groupbc8b0Props,
        codeStates['code_sets_table'] = code_sets_tablec9811,
        codeStates['setcode_sets_table'] = setcode_sets_tablec9811,
        codeStates['code_sets_tablec9811'] = code_sets_tablec9811Props,
        codeStates['setcode_sets_tablec9811'] = setcode_sets_tablec9811Props,
        codeStates['code_value_id'] = code_value_id599be,
        codeStates['setcode_value_id'] = setcode_value_id599be,
        codeStates['code_type_id'] = code_type_idcc48b,
        codeStates['setcode_type_id'] = setcode_type_idcc48b,
        codeStates['code'] = code597af,
        codeStates['setcode'] = setcode597af,
        codeStates['display_name'] = display_named01df,
        codeStates['setdisplay_name'] = setdisplay_named01df,
        codeStates['description'] = descriptione73c2,
        codeStates['setdescription'] = setdescriptione73c2,
        codeStates['is_active'] = is_active35e58,
        codeStates['setis_active'] = setis_active35e58,
        codeStates['view_btn'] = view_btn5b489,
        codeStates['setview_btn'] = setview_btn5b489,
        codeStates['edit_btn'] = edit_btna0277,
        codeStates['setedit_btn'] = setedit_btna0277,
        codeStates['delete_btn'] = delete_btn10f06,
        codeStates['setdelete_btn'] = setdelete_btn10f06,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const code_sets_tablec9811Ref = useRef<any>(null);
  const handleClearSearch = () => {
    code_sets_tablec9811Ref.current?.setSearchParams();
    code_sets_tablec9811Ref.current?.handleSearch({});
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
        !Array.isArray(code_sets_tablec9811) &&
        Object.keys(code_sets_tablec9811)?.length > 0
      ) {
        setcode_sets_tablec9811({})
      }
    } else prevRefreshRef.current = true
  }, [code_sets_tablec9811Props?.refresh])


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
          setcodevalue_v1((pre:any)=>({...pre,_selectedGroup_:"code_sets_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablecode_sets_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={code_sets_tablec9811Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupcode_sets_table
