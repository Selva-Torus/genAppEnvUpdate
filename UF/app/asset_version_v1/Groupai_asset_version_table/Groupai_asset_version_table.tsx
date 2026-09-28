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
import Tableai_asset_version_table  from './Tableai_asset_version_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupai_asset_version_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_aiassetversion_v1Props, setdfd_aiassetversion_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_version_id",
      "asset_name",
      "version_no",
      "change_type_code",
      "change_reason",
      "valid_from",
      "valid_to",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "ai_asset_version_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "asset_version_id",
      "asset_name",
      "version_no",
      "change_type_code",
      "change_reason",
      "valid_from",
      "valid_to",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "ai_asset_version_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "asset_version_id",
      "asset_name",
      "version_no",
      "change_type_code",
      "change_reason",
      "valid_from",
      "valid_to",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "ai_asset_version_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "asset_version_id",
      "asset_name",
      "version_no",
      "change_type_code",
      "change_reason",
      "valid_from",
      "valid_to",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "ai_asset_version_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "asset_version_id",
      "asset_name",
      "version_no",
      "change_type_code",
      "change_reason",
      "valid_from",
      "valid_to",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "ai_asset_version_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "asset_version_id",
      "asset_name",
      "version_no",
      "change_type_code",
      "change_reason",
      "valid_from",
      "valid_to",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "ai_asset_version_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "asset_version_id",
      "asset_name",
      "version_no",
      "change_type_code",
      "change_reason",
      "valid_from",
      "valid_to",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "ai_asset_version_table"
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
  const {overall_group75f3d, setoverall_group75f3d}= useContext(TotalContext) as TotalContextProps;
  const {overall_group75f3dProps, setoverall_group75f3dProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group9cca8, setai_asset_version_table_group9cca8}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group9cca8Props, setai_asset_version_table_group9cca8Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table4bc40, setai_asset_version_table4bc40}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table4bc40Props, setai_asset_version_table4bc40Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_version_id3d7e4, setasset_version_id3d7e4}= useContext(TotalContext) as TotalContextProps;
  const {asset_name0a773, setasset_name0a773}= useContext(TotalContext) as TotalContextProps;
  const {version_no635f0, setversion_no635f0}= useContext(TotalContext) as TotalContextProps;
  const {change_type_codecfabb, setchange_type_codecfabb}= useContext(TotalContext) as TotalContextProps;
  const {change_reason9d3b0, setchange_reason9d3b0}= useContext(TotalContext) as TotalContextProps;
  const {valid_fromcd4ab, setvalid_fromcd4ab}= useContext(TotalContext) as TotalContextProps;
  const {valid_tob2b1d, setvalid_tob2b1d}= useContext(TotalContext) as TotalContextProps;
  const {edit_btna1487, setedit_btna1487}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn8d8c9, setdelete_btn8d8c9}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {aiassetversion_v1, setaiassetversion_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AiAssetVersion:AFVK:v1',
    [user],
    'GroupAiAssetVersionTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9f2748f034c4094d3e1dce2fe6f4bc40");
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
    setai_asset_version_table4bc40Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("asset_version_id")){
        setasset_version_id3d7e4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_version_id3d7e4?.isDisabled==null)
      {
        setasset_version_id3d7e4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name0a773((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name0a773?.isDisabled==null)
      {
        setasset_name0a773((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("version_no")){
        setversion_no635f0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(version_no635f0?.isDisabled==null)
      {
        setversion_no635f0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("change_type_code")){
        setchange_type_codecfabb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(change_type_codecfabb?.isDisabled==null)
      {
        setchange_type_codecfabb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("change_reason")){
        setchange_reason9d3b0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(change_reason9d3b0?.isDisabled==null)
      {
        setchange_reason9d3b0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("valid_from")){
        setvalid_fromcd4ab((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(valid_fromcd4ab?.isDisabled==null)
      {
        setvalid_fromcd4ab((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("valid_to")){
        setvalid_tob2b1d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(valid_tob2b1d?.isDisabled==null)
      {
        setvalid_tob2b1d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btna1487((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btna1487?.isDisabled==null)
      {
        setedit_btna1487((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btn8d8c9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_btn8d8c9?.isDisabled==null)
      {
        setdelete_btn8d8c9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9f2748f034c4094d3e1dce2fe6f4bc40");
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
        codeStates['overall_group'] = overall_group75f3d,
        codeStates['setoverall_group'] = setoverall_group75f3d,
        codeStates['overall_group75f3d'] = overall_group75f3dProps,
        codeStates['setoverall_group75f3d'] = setoverall_group75f3dProps,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group9cca8,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group9cca8,
        codeStates['ai_asset_version_table_group9cca8'] = ai_asset_version_table_group9cca8Props,
        codeStates['setai_asset_version_table_group9cca8'] = setai_asset_version_table_group9cca8Props,
        codeStates['ai_asset_version_table'] = ai_asset_version_table4bc40,
        codeStates['setai_asset_version_table'] = setai_asset_version_table4bc40,
        codeStates['ai_asset_version_table4bc40'] = ai_asset_version_table4bc40Props,
        codeStates['setai_asset_version_table4bc40'] = setai_asset_version_table4bc40Props,
        codeStates['asset_version_id'] = asset_version_id3d7e4,
        codeStates['setasset_version_id'] = setasset_version_id3d7e4,
        codeStates['asset_name'] = asset_name0a773,
        codeStates['setasset_name'] = setasset_name0a773,
        codeStates['version_no'] = version_no635f0,
        codeStates['setversion_no'] = setversion_no635f0,
        codeStates['change_type_code'] = change_type_codecfabb,
        codeStates['setchange_type_code'] = setchange_type_codecfabb,
        codeStates['change_reason'] = change_reason9d3b0,
        codeStates['setchange_reason'] = setchange_reason9d3b0,
        codeStates['valid_from'] = valid_fromcd4ab,
        codeStates['setvalid_from'] = setvalid_fromcd4ab,
        codeStates['valid_to'] = valid_tob2b1d,
        codeStates['setvalid_to'] = setvalid_tob2b1d,
        codeStates['edit_btn'] = edit_btna1487,
        codeStates['setedit_btn'] = setedit_btna1487,
        codeStates['delete_btn'] = delete_btn8d8c9,
        codeStates['setdelete_btn'] = setdelete_btn8d8c9,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_asset_version_table4bc40Ref = useRef<any>(null);
  const handleClearSearch = () => {
    ai_asset_version_table4bc40Ref.current?.setSearchParams();
    ai_asset_version_table4bc40Ref.current?.handleSearch({});
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
        !Array.isArray(ai_asset_version_table4bc40) &&
        Object.keys(ai_asset_version_table4bc40)?.length > 0
      ) {
        setai_asset_version_table4bc40({})
      }
    } else prevRefreshRef.current = true
  }, [ai_asset_version_table4bc40Props?.refresh])


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
        gridRow: '9 / 142',
      
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
          setaiassetversion_v1((pre:any)=>({...pre,_selectedGroup_:"ai_asset_version_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableai_asset_version_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={ai_asset_version_table4bc40Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupai_asset_version_table
