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
import Tableservice_identity_table  from './Tableservice_identity_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupservice_identity_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_killswitchactionlist_v1Props, setdfd_killswitchactionlist_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_revocationreceiptlist_v1Props, setdfd_revocationreceiptlist_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "kill_action_id",
      "action_no",
      "asset_name",
      "trigger_type",
      "trigger_ref",
      "scope",
      "trs_created_date",
      "edit_btn",
      "delete_btn",
      "containment_status",
      "released_at",
      "revocation_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table",
      "ai_asset_dependency_group_1",
      "group",
      "revocation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "kill_action_id",
      "action_no",
      "asset_name",
      "trigger_type",
      "trigger_ref",
      "scope",
      "trs_created_date",
      "edit_btn",
      "delete_btn",
      "containment_status",
      "released_at",
      "revocation_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table",
      "ai_asset_dependency_group_1",
      "group",
      "revocation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "kill_action_id",
      "action_no",
      "asset_name",
      "trigger_type",
      "trigger_ref",
      "scope",
      "trs_created_date",
      "edit_btn",
      "delete_btn",
      "containment_status",
      "released_at",
      "revocation_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table",
      "ai_asset_dependency_group_1",
      "group",
      "revocation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "kill_action_id",
      "action_no",
      "asset_name",
      "trigger_type",
      "trigger_ref",
      "scope",
      "trs_created_date",
      "edit_btn",
      "delete_btn",
      "containment_status",
      "released_at",
      "revocation_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table",
      "ai_asset_dependency_group_1",
      "group",
      "revocation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "kill_action_id",
      "action_no",
      "asset_name",
      "trigger_type",
      "trigger_ref",
      "scope",
      "trs_created_date",
      "edit_btn",
      "delete_btn",
      "containment_status",
      "released_at",
      "revocation_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table",
      "ai_asset_dependency_group_1",
      "group",
      "revocation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "kill_action_id",
      "action_no",
      "asset_name",
      "trigger_type",
      "trigger_ref",
      "scope",
      "trs_created_date",
      "edit_btn",
      "delete_btn",
      "containment_status",
      "released_at",
      "revocation_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table",
      "ai_asset_dependency_group_1",
      "group",
      "revocation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "kill_action_id",
      "action_no",
      "asset_name",
      "trigger_type",
      "trigger_ref",
      "scope",
      "trs_created_date",
      "edit_btn",
      "delete_btn",
      "containment_status",
      "released_at",
      "revocation_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table",
      "ai_asset_dependency_group_1",
      "group",
      "revocation_table"
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
  const {overall_group8bfb3, setoverall_group8bfb3}= useContext(TotalContext) as TotalContextProps;
  const {overall_group8bfb3Props, setoverall_group8bfb3Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupeee40, setai_asset_dependency_groupeee40}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupeee40Props, setai_asset_dependency_groupeee40Props}= useContext(TotalContext) as TotalContextProps;
  const {service_identity_table953a0, setservice_identity_table953a0}= useContext(TotalContext) as TotalContextProps;
  const {service_identity_table953a0Props, setservice_identity_table953a0Props}= useContext(TotalContext) as TotalContextProps;
  const {kill_action_id39aeb, setkill_action_id39aeb}= useContext(TotalContext) as TotalContextProps;
  const {action_no0df63, setaction_no0df63}= useContext(TotalContext) as TotalContextProps;
  const {asset_namea08a1, setasset_namea08a1}= useContext(TotalContext) as TotalContextProps;
  const {trigger_typebbde7, settrigger_typebbde7}= useContext(TotalContext) as TotalContextProps;
  const {trigger_ref436b3, settrigger_ref436b3}= useContext(TotalContext) as TotalContextProps;
  const {scope53c1d, setscope53c1d}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date9079a, settrs_created_date9079a}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn0e125, setedit_btn0e125}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn2b180, setdelete_btn2b180}= useContext(TotalContext) as TotalContextProps;
  const {containment_status1fd13, setcontainment_status1fd13}= useContext(TotalContext) as TotalContextProps;
  const {released_atc1a1f, setreleased_atc1a1f}= useContext(TotalContext) as TotalContextProps;
  const {revocation_btn170a3, setrevocation_btn170a3}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group_1ed024, setai_asset_dependency_group_1ed024}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group_1ed024Props, setai_asset_dependency_group_1ed024Props}= useContext(TotalContext) as TotalContextProps;
  const {groupb1db8, setgroupb1db8}= useContext(TotalContext) as TotalContextProps;
  const {groupb1db8Props, setgroupb1db8Props}= useContext(TotalContext) as TotalContextProps;
  const {revocation_table5b204, setrevocation_table5b204}= useContext(TotalContext) as TotalContextProps;
  const {revocation_table5b204Props, setrevocation_table5b204Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {killswitchactionlist_v1, setkillswitchactionlist_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:killSwitchActionList:AFVK:v1',
    [user],
    'GroupServiceIdentityTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "595c58db453a9b400de99534275953a0");
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
    setservice_identity_table953a0Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("kill_action_id")){
        setkill_action_id39aeb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(kill_action_id39aeb?.isDisabled==null)
      {
        setkill_action_id39aeb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("action_no")){
        setaction_no0df63((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(action_no0df63?.isDisabled==null)
      {
        setaction_no0df63((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_namea08a1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_namea08a1?.isDisabled==null)
      {
        setasset_namea08a1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trigger_type")){
        settrigger_typebbde7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trigger_typebbde7?.isDisabled==null)
      {
        settrigger_typebbde7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trigger_ref")){
        settrigger_ref436b3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trigger_ref436b3?.isDisabled==null)
      {
        settrigger_ref436b3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("scope")){
        setscope53c1d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(scope53c1d?.isDisabled==null)
      {
        setscope53c1d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_date")){
        settrs_created_date9079a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trs_created_date9079a?.isDisabled==null)
      {
        settrs_created_date9079a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btn0e125((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btn0e125?.isDisabled==null)
      {
        setedit_btn0e125((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btn2b180((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_btn2b180?.isDisabled==null)
      {
        setdelete_btn2b180((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("containment_status")){
        setcontainment_status1fd13((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(containment_status1fd13?.isDisabled==null)
      {
        setcontainment_status1fd13((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("released_at")){
        setreleased_atc1a1f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(released_atc1a1f?.isDisabled==null)
      {
        setreleased_atc1a1f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("revocation_btn")){
        setrevocation_btn170a3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(revocation_btn170a3?.isDisabled==null)
      {
        setrevocation_btn170a3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "595c58db453a9b400de99534275953a0");
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
        codeStates['overall_group'] = overall_group8bfb3,
        codeStates['setoverall_group'] = setoverall_group8bfb3,
        codeStates['overall_group8bfb3'] = overall_group8bfb3Props,
        codeStates['setoverall_group8bfb3'] = setoverall_group8bfb3Props,
        codeStates['ai_asset_dependency_group'] = ai_asset_dependency_groupeee40,
        codeStates['setai_asset_dependency_group'] = setai_asset_dependency_groupeee40,
        codeStates['ai_asset_dependency_groupeee40'] = ai_asset_dependency_groupeee40Props,
        codeStates['setai_asset_dependency_groupeee40'] = setai_asset_dependency_groupeee40Props,
        codeStates['service_identity_table'] = service_identity_table953a0,
        codeStates['setservice_identity_table'] = setservice_identity_table953a0,
        codeStates['service_identity_table953a0'] = service_identity_table953a0Props,
        codeStates['setservice_identity_table953a0'] = setservice_identity_table953a0Props,
        codeStates['kill_action_id'] = kill_action_id39aeb,
        codeStates['setkill_action_id'] = setkill_action_id39aeb,
        codeStates['action_no'] = action_no0df63,
        codeStates['setaction_no'] = setaction_no0df63,
        codeStates['asset_name'] = asset_namea08a1,
        codeStates['setasset_name'] = setasset_namea08a1,
        codeStates['trigger_type'] = trigger_typebbde7,
        codeStates['settrigger_type'] = settrigger_typebbde7,
        codeStates['trigger_ref'] = trigger_ref436b3,
        codeStates['settrigger_ref'] = settrigger_ref436b3,
        codeStates['scope'] = scope53c1d,
        codeStates['setscope'] = setscope53c1d,
        codeStates['trs_created_date'] = trs_created_date9079a,
        codeStates['settrs_created_date'] = settrs_created_date9079a,
        codeStates['edit_btn'] = edit_btn0e125,
        codeStates['setedit_btn'] = setedit_btn0e125,
        codeStates['delete_btn'] = delete_btn2b180,
        codeStates['setdelete_btn'] = setdelete_btn2b180,
        codeStates['containment_status'] = containment_status1fd13,
        codeStates['setcontainment_status'] = setcontainment_status1fd13,
        codeStates['released_at'] = released_atc1a1f,
        codeStates['setreleased_at'] = setreleased_atc1a1f,
        codeStates['revocation_btn'] = revocation_btn170a3,
        codeStates['setrevocation_btn'] = setrevocation_btn170a3,
        codeStates['ai_asset_dependency_group_1'] = ai_asset_dependency_group_1ed024,
        codeStates['setai_asset_dependency_group_1'] = setai_asset_dependency_group_1ed024,
        codeStates['ai_asset_dependency_group_1ed024'] = ai_asset_dependency_group_1ed024Props,
        codeStates['setai_asset_dependency_group_1ed024'] = setai_asset_dependency_group_1ed024Props,
        codeStates['group'] = groupb1db8,
        codeStates['setgroup'] = setgroupb1db8,
        codeStates['groupb1db8'] = groupb1db8Props,
        codeStates['setgroupb1db8'] = setgroupb1db8Props,
        codeStates['revocation_table'] = revocation_table5b204,
        codeStates['setrevocation_table'] = setrevocation_table5b204,
        codeStates['revocation_table5b204'] = revocation_table5b204Props,
        codeStates['setrevocation_table5b204'] = setrevocation_table5b204Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const service_identity_table953a0Ref = useRef<any>(null);
  const handleClearSearch = () => {
    service_identity_table953a0Ref.current?.setSearchParams();
    service_identity_table953a0Ref.current?.handleSearch({});
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
        !Array.isArray(service_identity_table953a0) &&
        Object.keys(service_identity_table953a0)?.length > 0
      ) {
        setservice_identity_table953a0({})
        setservice_identity_table953a0Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [service_identity_table953a0Props?.refresh])


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
        gridRow: '9 / 80',
      
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
          setkillswitchactionlist_v1((pre:any)=>({...pre,_selectedGroup_:"service_identity_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableservice_identity_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={service_identity_table953a0Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupservice_identity_table
