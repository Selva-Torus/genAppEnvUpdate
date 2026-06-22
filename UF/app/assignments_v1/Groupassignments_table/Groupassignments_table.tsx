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
import Tableassignments_table  from './Tableassignments_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupassignments_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const token:string = getCookie('token'); 
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
  const {dfd_assetassignments_v1Props, setdfd_assetassignments_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Maker": {
    "allowedControls": [
      "assign_id",
      "asset_name",
      "assigned_to",
      "assigned_by",
      "assigned_at",
      "expected_return_date",
      "condition_at_assign",
      "status",
      "bt_view",
      "bt_edit",
      "bt_delete",
      "bt_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "overall_assignments_group",
      "group",
      "assignments_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "assign_id",
      "asset_name",
      "assigned_to",
      "assigned_by",
      "assigned_at",
      "expected_return_date",
      "condition_at_assign",
      "status",
      "bt_view",
      "bt_edit",
      "bt_delete",
      "bt_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "overall_assignments_group",
      "group",
      "assignments_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
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
  const {overall_assignments_group04cba, setoverall_assignments_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_assignments_group04cbaProps, setoverall_assignments_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {group9ad63, setgroup9ad63}= useContext(TotalContext) as TotalContextProps;
  const {group9ad63Props, setgroup9ad63Props}= useContext(TotalContext) as TotalContextProps;
  const {assignments_table75a5d, setassignments_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {assignments_table75a5dProps, setassignments_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  const {assign_idac541, setassign_idac541}= useContext(TotalContext) as TotalContextProps;
  const {asset_namedaa81, setasset_namedaa81}= useContext(TotalContext) as TotalContextProps;
  const {assigned_toba6cd, setassigned_toba6cd}= useContext(TotalContext) as TotalContextProps;
  const {assigned_byba0b9, setassigned_byba0b9}= useContext(TotalContext) as TotalContextProps;
  const {assigned_atc4b88, setassigned_atc4b88}= useContext(TotalContext) as TotalContextProps;
  const {expected_return_date910b8, setexpected_return_date910b8}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_assigne0685, setcondition_at_assigne0685}= useContext(TotalContext) as TotalContextProps;
  const {status7fb4b, setstatus7fb4b}= useContext(TotalContext) as TotalContextProps;
  const {bt_view6b7cc, setbt_view6b7cc}= useContext(TotalContext) as TotalContextProps;
  const {bt_editad624, setbt_editad624}= useContext(TotalContext) as TotalContextProps;
  const {bt_deletefaec8, setbt_deletefaec8}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_docf5447, setbt_add_docf5447}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assetassignments_v1, setassetassignments_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1',
    [user],
    'GroupAssignmentsTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "356fd7ddf8ed4df7909d896283975a5d");
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
    setassignments_table75a5dProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("assign_id")){
        setassign_idac541({...assign_idac541,isDisabled:true});

    }else
    {
      if(assign_idac541?.isDisabled==null)
      {
        setassign_idac541({...assign_idac541,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_namedaa81({...asset_namedaa81,isDisabled:true});

    }else
    {
      if(asset_namedaa81?.isDisabled==null)
      {
        setasset_namedaa81({...asset_namedaa81,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_to")){
        setassigned_toba6cd({...assigned_toba6cd,isDisabled:true});

    }else
    {
      if(assigned_toba6cd?.isDisabled==null)
      {
        setassigned_toba6cd({...assigned_toba6cd,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_by")){
        setassigned_byba0b9({...assigned_byba0b9,isDisabled:true});

    }else
    {
      if(assigned_byba0b9?.isDisabled==null)
      {
        setassigned_byba0b9({...assigned_byba0b9,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_at")){
        setassigned_atc4b88({...assigned_atc4b88,isDisabled:true});

    }else
    {
      if(assigned_atc4b88?.isDisabled==null)
      {
        setassigned_atc4b88({...assigned_atc4b88,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expected_return_date")){
        setexpected_return_date910b8({...expected_return_date910b8,isDisabled:true});

    }else
    {
      if(expected_return_date910b8?.isDisabled==null)
      {
        setexpected_return_date910b8({...expected_return_date910b8,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("condition_at_assign")){
        setcondition_at_assigne0685({...condition_at_assigne0685,isDisabled:true});

    }else
    {
      if(condition_at_assigne0685?.isDisabled==null)
      {
        setcondition_at_assigne0685({...condition_at_assigne0685,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatus7fb4b({...status7fb4b,isDisabled:true});

    }else
    {
      if(status7fb4b?.isDisabled==null)
      {
        setstatus7fb4b({...status7fb4b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_view")){
        setbt_view6b7cc({...bt_view6b7cc,isDisabled:true});

    }else
    {
      if(bt_view6b7cc?.isDisabled==null)
      {
        setbt_view6b7cc({...bt_view6b7cc,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_edit")){
        setbt_editad624({...bt_editad624,isDisabled:true});

    }else
    {
      if(bt_editad624?.isDisabled==null)
      {
        setbt_editad624({...bt_editad624,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_delete")){
        setbt_deletefaec8({...bt_deletefaec8,isDisabled:true});

    }else
    {
      if(bt_deletefaec8?.isDisabled==null)
      {
        setbt_deletefaec8({...bt_deletefaec8,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_add_doc")){
        setbt_add_docf5447({...bt_add_docf5447,isDisabled:true});

    }else
    {
      if(bt_add_docf5447?.isDisabled==null)
      {
        setbt_add_docf5447({...bt_add_docf5447,isDisabled:false});
      }
    }
  //////////////
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()

  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['overall_assignments_group'] = overall_assignments_group04cba,
        codeStates['setoverall_assignments_group'] = setoverall_assignments_group04cba,
        codeStates['overall_assignments_group04cba'] = overall_assignments_group04cbaProps,
        codeStates['setoverall_assignments_group04cba'] = setoverall_assignments_group04cbaProps,
        codeStates['group'] = group9ad63,
        codeStates['setgroup'] = setgroup9ad63,
        codeStates['group9ad63'] = group9ad63Props,
        codeStates['setgroup9ad63'] = setgroup9ad63Props,
        codeStates['assignments_table'] = assignments_table75a5d,
        codeStates['setassignments_table'] = setassignments_table75a5d,
        codeStates['assignments_table75a5d'] = assignments_table75a5dProps,
        codeStates['setassignments_table75a5d'] = setassignments_table75a5dProps,
        codeStates['assign_id'] = assign_idac541,
        codeStates['setassign_id'] = setassign_idac541,
        codeStates['asset_name'] = asset_namedaa81,
        codeStates['setasset_name'] = setasset_namedaa81,
        codeStates['assigned_to'] = assigned_toba6cd,
        codeStates['setassigned_to'] = setassigned_toba6cd,
        codeStates['assigned_by'] = assigned_byba0b9,
        codeStates['setassigned_by'] = setassigned_byba0b9,
        codeStates['assigned_at'] = assigned_atc4b88,
        codeStates['setassigned_at'] = setassigned_atc4b88,
        codeStates['expected_return_date'] = expected_return_date910b8,
        codeStates['setexpected_return_date'] = setexpected_return_date910b8,
        codeStates['condition_at_assign'] = condition_at_assigne0685,
        codeStates['setcondition_at_assign'] = setcondition_at_assigne0685,
        codeStates['status'] = status7fb4b,
        codeStates['setstatus'] = setstatus7fb4b,
        codeStates['bt_view'] = bt_view6b7cc,
        codeStates['setbt_view'] = setbt_view6b7cc,
        codeStates['bt_edit'] = bt_editad624,
        codeStates['setbt_edit'] = setbt_editad624,
        codeStates['bt_delete'] = bt_deletefaec8,
        codeStates['setbt_delete'] = setbt_deletefaec8,
        codeStates['bt_add_doc'] = bt_add_docf5447,
        codeStates['setbt_add_doc'] = setbt_add_docf5447,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const assignments_table75a5dRef = useRef<any>(null);
  const handleClearSearch = () => {
    assignments_table75a5dRef.current?.setSearchParams();
    assignments_table75a5dRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(assignments_table75a5d) && Object.keys(assignments_table75a5d)?.length>0)
      {
        setassignments_table75a5d({})
      }
    }else 
      prevRefreshRef.current= true
  }, [assignments_table75a5dProps?.refresh,token])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '9 / 118',
      
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
       onClick={()=>handleOnClick({}, 0)}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableassignments_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={assignments_table75a5dRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupassignments_table
