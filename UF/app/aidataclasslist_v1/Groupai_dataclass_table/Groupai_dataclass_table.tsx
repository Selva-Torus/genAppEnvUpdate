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
import Tableai_dataclass_table  from './Tableai_dataclass_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupai_dataclass_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_dataclasslist_v1Props, setdfd_dataclasslist_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "ai_asset_id",
      "asset_name",
      "asset_data_class_id",
      "data_class_code",
      "is_primary",
      "notes",
      "edit_bt",
      "delete_bt"
    ],
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
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "asset_data_class_id",
      "data_class_code",
      "is_primary",
      "notes",
      "edit_bt",
      "delete_bt"
    ],
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
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "asset_data_class_id",
      "data_class_code",
      "is_primary",
      "notes",
      "edit_bt",
      "delete_bt"
    ],
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
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "asset_data_class_id",
      "data_class_code",
      "is_primary",
      "notes",
      "edit_bt",
      "delete_bt"
    ],
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
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "asset_data_class_id",
      "data_class_code",
      "is_primary",
      "notes",
      "edit_bt",
      "delete_bt"
    ],
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
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "asset_data_class_id",
      "data_class_code",
      "is_primary",
      "notes",
      "edit_bt",
      "delete_bt"
    ],
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
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "asset_data_class_id",
      "data_class_code",
      "is_primary",
      "notes",
      "edit_bt",
      "delete_bt"
    ],
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
  const {overall_ai_data_class7e3b7, setoverall_ai_data_class7e3b7}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_data_class7e3b7Props, setoverall_ai_data_class7e3b7Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_group81854, setai_dataclass_group81854}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_group81854Props, setai_dataclass_group81854Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group57c68, setai_registry_text_group57c68}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group57c68Props, setai_registry_text_group57c68Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_tabledf39c, setai_dataclass_tabledf39c}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_tabledf39cProps, setai_dataclass_tabledf39cProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id1bcd7, setai_asset_id1bcd7}= useContext(TotalContext) as TotalContextProps;
  const {asset_name1380a, setasset_name1380a}= useContext(TotalContext) as TotalContextProps;
  const {asset_data_class_ida0858, setasset_data_class_ida0858}= useContext(TotalContext) as TotalContextProps;
  const {data_class_code213e9, setdata_class_code213e9}= useContext(TotalContext) as TotalContextProps;
  const {is_primaryeda2a, setis_primaryeda2a}= useContext(TotalContext) as TotalContextProps;
  const {notes6537d, setnotes6537d}= useContext(TotalContext) as TotalContextProps;
  const {edit_btc0562, setedit_btc0562}= useContext(TotalContext) as TotalContextProps;
  const {delete_bt1aa61, setdelete_bt1aa61}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {aidataclasslist_v1, setaidataclasslist_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIDataClassList:AFVK:v1',
    [user],
    'GroupAiDataclassTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "750c090ad61dd201ef10624ca73df39c");
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
    setai_dataclass_tabledf39cProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ai_asset_id")){
        setai_asset_id1bcd7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_asset_id1bcd7?.isDisabled==null)
      {
        setai_asset_id1bcd7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name1380a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name1380a?.isDisabled==null)
      {
        setasset_name1380a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_data_class_id")){
        setasset_data_class_ida0858((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_data_class_ida0858?.isDisabled==null)
      {
        setasset_data_class_ida0858((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("data_class_code")){
        setdata_class_code213e9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(data_class_code213e9?.isDisabled==null)
      {
        setdata_class_code213e9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_primary")){
        setis_primaryeda2a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_primaryeda2a?.isDisabled==null)
      {
        setis_primaryeda2a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("notes")){
        setnotes6537d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(notes6537d?.isDisabled==null)
      {
        setnotes6537d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_bt")){
        setedit_btc0562((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btc0562?.isDisabled==null)
      {
        setedit_btc0562((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_bt")){
        setdelete_bt1aa61((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_bt1aa61?.isDisabled==null)
      {
        setdelete_bt1aa61((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "750c090ad61dd201ef10624ca73df39c");
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
        codeStates['overall_ai_data_class'] = overall_ai_data_class7e3b7,
        codeStates['setoverall_ai_data_class'] = setoverall_ai_data_class7e3b7,
        codeStates['overall_ai_data_class7e3b7'] = overall_ai_data_class7e3b7Props,
        codeStates['setoverall_ai_data_class7e3b7'] = setoverall_ai_data_class7e3b7Props,
        codeStates['ai_dataclass_group'] = ai_dataclass_group81854,
        codeStates['setai_dataclass_group'] = setai_dataclass_group81854,
        codeStates['ai_dataclass_group81854'] = ai_dataclass_group81854Props,
        codeStates['setai_dataclass_group81854'] = setai_dataclass_group81854Props,
        codeStates['ai_registry_text_group'] = ai_registry_text_group57c68,
        codeStates['setai_registry_text_group'] = setai_registry_text_group57c68,
        codeStates['ai_registry_text_group57c68'] = ai_registry_text_group57c68Props,
        codeStates['setai_registry_text_group57c68'] = setai_registry_text_group57c68Props,
        codeStates['ai_dataclass_table'] = ai_dataclass_tabledf39c,
        codeStates['setai_dataclass_table'] = setai_dataclass_tabledf39c,
        codeStates['ai_dataclass_tabledf39c'] = ai_dataclass_tabledf39cProps,
        codeStates['setai_dataclass_tabledf39c'] = setai_dataclass_tabledf39cProps,
        codeStates['ai_asset_id'] = ai_asset_id1bcd7,
        codeStates['setai_asset_id'] = setai_asset_id1bcd7,
        codeStates['asset_name'] = asset_name1380a,
        codeStates['setasset_name'] = setasset_name1380a,
        codeStates['asset_data_class_id'] = asset_data_class_ida0858,
        codeStates['setasset_data_class_id'] = setasset_data_class_ida0858,
        codeStates['data_class_code'] = data_class_code213e9,
        codeStates['setdata_class_code'] = setdata_class_code213e9,
        codeStates['is_primary'] = is_primaryeda2a,
        codeStates['setis_primary'] = setis_primaryeda2a,
        codeStates['notes'] = notes6537d,
        codeStates['setnotes'] = setnotes6537d,
        codeStates['edit_bt'] = edit_btc0562,
        codeStates['setedit_bt'] = setedit_btc0562,
        codeStates['delete_bt'] = delete_bt1aa61,
        codeStates['setdelete_bt'] = setdelete_bt1aa61,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_dataclass_tabledf39cRef = useRef<any>(null);
  const handleClearSearch = () => {
    ai_dataclass_tabledf39cRef.current?.setSearchParams();
    ai_dataclass_tabledf39cRef.current?.handleSearch({});
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
        !Array.isArray(ai_dataclass_tabledf39c) &&
        Object.keys(ai_dataclass_tabledf39c)?.length > 0
      ) {
        setai_dataclass_tabledf39c({})
      }
    } else prevRefreshRef.current = true
  }, [ai_dataclass_tabledf39cProps?.refresh])


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
        gridRow: '14 / 146',
      
        //rowGap: '0px',
        overflow: 'visible',
        backgroundColor:'#ffffff',
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
          setaidataclasslist_v1((pre:any)=>({...pre,_selectedGroup_:"ai_dataclass_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableai_dataclass_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={ai_dataclass_tabledf39cRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupai_dataclass_table
