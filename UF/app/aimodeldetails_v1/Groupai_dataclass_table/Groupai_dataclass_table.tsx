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
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "asset_model_id",
      "model_name",
      "model_version",
      "model_family_code",
      "model_provider",
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
      "asset_model_id",
      "model_name",
      "model_version",
      "model_family_code",
      "model_provider",
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
      "asset_model_id",
      "model_name",
      "model_version",
      "model_family_code",
      "model_provider",
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
      "asset_model_id",
      "model_name",
      "model_version",
      "model_family_code",
      "model_provider",
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
      "asset_model_id",
      "model_name",
      "model_version",
      "model_family_code",
      "model_provider",
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
      "asset_model_id",
      "model_name",
      "model_version",
      "model_family_code",
      "model_provider",
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
      "asset_model_id",
      "model_name",
      "model_version",
      "model_family_code",
      "model_provider",
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
  const {overall_ai_data_class16ac0, setoverall_ai_data_class16ac0}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_data_class16ac0Props, setoverall_ai_data_class16ac0Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_group790bb, setai_dataclass_group790bb}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_group790bbProps, setai_dataclass_group790bbProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupd028b, setai_registry_text_groupd028b}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupd028bProps, setai_registry_text_groupd028bProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_tabled37dd, setai_dataclass_tabled37dd}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_tabled37ddProps, setai_dataclass_tabled37ddProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id3f4b8, setai_asset_id3f4b8}= useContext(TotalContext) as TotalContextProps;
  const {asset_name35f88, setasset_name35f88}= useContext(TotalContext) as TotalContextProps;
  const {asset_model_id8c2e4, setasset_model_id8c2e4}= useContext(TotalContext) as TotalContextProps;
  const {model_namecfc6c, setmodel_namecfc6c}= useContext(TotalContext) as TotalContextProps;
  const {model_version97b34, setmodel_version97b34}= useContext(TotalContext) as TotalContextProps;
  const {model_family_code06ae7, setmodel_family_code06ae7}= useContext(TotalContext) as TotalContextProps;
  const {model_providerccc4e, setmodel_providerccc4e}= useContext(TotalContext) as TotalContextProps;
  const {edit_bt11fef, setedit_bt11fef}= useContext(TotalContext) as TotalContextProps;
  const {delete_bt7b348, setdelete_bt7b348}= useContext(TotalContext) as TotalContextProps;
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "fce76b7c8cb3746f1eb713e9fafd37dd");
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
    setai_dataclass_tabled37ddProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ai_asset_id")){
        setai_asset_id3f4b8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_asset_id3f4b8?.isDisabled==null)
      {
        setai_asset_id3f4b8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name35f88((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name35f88?.isDisabled==null)
      {
        setasset_name35f88((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_model_id")){
        setasset_model_id8c2e4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_model_id8c2e4?.isDisabled==null)
      {
        setasset_model_id8c2e4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("model_name")){
        setmodel_namecfc6c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(model_namecfc6c?.isDisabled==null)
      {
        setmodel_namecfc6c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("model_version")){
        setmodel_version97b34((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(model_version97b34?.isDisabled==null)
      {
        setmodel_version97b34((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("model_family_code")){
        setmodel_family_code06ae7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(model_family_code06ae7?.isDisabled==null)
      {
        setmodel_family_code06ae7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("model_provider")){
        setmodel_providerccc4e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(model_providerccc4e?.isDisabled==null)
      {
        setmodel_providerccc4e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_bt")){
        setedit_bt11fef((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_bt11fef?.isDisabled==null)
      {
        setedit_bt11fef((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_bt")){
        setdelete_bt7b348((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_bt7b348?.isDisabled==null)
      {
        setdelete_bt7b348((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "fce76b7c8cb3746f1eb713e9fafd37dd");
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
        codeStates['ai_asset_id'] = ai_asset_id3f4b8,
        codeStates['setai_asset_id'] = setai_asset_id3f4b8,
        codeStates['asset_name'] = asset_name35f88,
        codeStates['setasset_name'] = setasset_name35f88,
        codeStates['asset_model_id'] = asset_model_id8c2e4,
        codeStates['setasset_model_id'] = setasset_model_id8c2e4,
        codeStates['model_name'] = model_namecfc6c,
        codeStates['setmodel_name'] = setmodel_namecfc6c,
        codeStates['model_version'] = model_version97b34,
        codeStates['setmodel_version'] = setmodel_version97b34,
        codeStates['model_family_code'] = model_family_code06ae7,
        codeStates['setmodel_family_code'] = setmodel_family_code06ae7,
        codeStates['model_provider'] = model_providerccc4e,
        codeStates['setmodel_provider'] = setmodel_providerccc4e,
        codeStates['edit_bt'] = edit_bt11fef,
        codeStates['setedit_bt'] = setedit_bt11fef,
        codeStates['delete_bt'] = delete_bt7b348,
        codeStates['setdelete_bt'] = setdelete_bt7b348,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_dataclass_tabled37ddRef = useRef<any>(null);
  const handleClearSearch = () => {
    ai_dataclass_tabled37ddRef.current?.setSearchParams();
    ai_dataclass_tabled37ddRef.current?.handleSearch({});
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
        !Array.isArray(ai_dataclass_tabled37dd) &&
        Object.keys(ai_dataclass_tabled37dd)?.length > 0
      ) {
        setai_dataclass_tabled37dd({})
      }
    } else prevRefreshRef.current = true
  }, [ai_dataclass_tabled37ddProps?.refresh])


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
          setaimodeldetails_v1((pre:any)=>({...pre,_selectedGroup_:"ai_dataclass_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableai_dataclass_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={ai_dataclass_tabled37ddRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupai_dataclass_table
