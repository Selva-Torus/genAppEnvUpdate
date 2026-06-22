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
import Textassignment_information_text  from "./Textassignment_information_text";
import Dropdownasset_name  from "./Dropdownasset_name";
import TextInputassigned_to  from "./TextInputassigned_to";
import TextInputassigned_by  from "./TextInputassigned_by";
import DatePickerassigned_at  from "./DatePickerassigned_at";
import Dropdownassignment_status  from "./Dropdownassignment_status";
import Dropdowncondition_at_assign  from "./Dropdowncondition_at_assign";
import DatePickerexpected_return_date  from "./DatePickerexpected_return_date";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupassignment_information_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetnamecombo_v1Props, setdfd_assetnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetconditioncombo_v1Props, setdfd_assetconditioncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assignmentstatuscombo_v1Props, setdfd_assignmentstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_conditionatreturncombo_v1Props, setdfd_conditionatreturncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_approvalstatuscombo_v1Props, setdfd_approvalstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "assignment_information_text",
      "asset_name",
      "assigned_to",
      "assigned_by",
      "assigned_at",
      "assignment_status",
      "condition_at_assign",
      "expected_return_date"
    ],
    "allowedGroups": [
      "canvas",
      "assign_asset_group",
      "assignment_information_group",
      "assignment_details_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "assignment_information_text",
      "asset_name",
      "assigned_to",
      "assigned_by",
      "assigned_at",
      "assignment_status",
      "condition_at_assign",
      "expected_return_date"
    ],
    "allowedGroups": [
      "canvas",
      "assign_asset_group",
      "assignment_information_group",
      "assignment_details_group",
      "dynamicactions"
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
  const {assign_asset_groupdb5a7, setassign_asset_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {assign_asset_groupdb5a7Props, setassign_asset_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_group5d144, setassignment_information_group5d144}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_group5d144Props, setassignment_information_group5d144Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_text8af67, setassignment_information_text8af67}= useContext(TotalContext) as TotalContextProps;
  const {asset_name56fec, setasset_name56fec}= useContext(TotalContext) as TotalContextProps;
  const {assigned_tof8f17, setassigned_tof8f17}= useContext(TotalContext) as TotalContextProps;
  const {assigned_byc4563, setassigned_byc4563}= useContext(TotalContext) as TotalContextProps;
  const {assigned_at45db5, setassigned_at45db5}= useContext(TotalContext) as TotalContextProps;
  const {assignment_statusa6f80, setassignment_statusa6f80}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_assign27aff, setcondition_at_assign27aff}= useContext(TotalContext) as TotalContextProps;
  const {expected_return_date15cfe, setexpected_return_date15cfe}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group7f60d, setassignment_details_group7f60d}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group7f60dProps, setassignment_details_group7f60dProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions956ba, setdynamicactions956ba}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions956baProps, setdynamicactions956baProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assignasset_v1, setassignasset_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignAsset:AFVK:v1',
    [user],
    'GroupAssignmentInformationGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "913d50f029c84864b01c8a333a75d144");
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
    setassignment_information_group5d144Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("assignment_information_text")){
        setassignment_information_text8af67({...assignment_information_text8af67,isDisabled:true});

    }else
    {
      if(assignment_information_text8af67?.isDisabled==null)
      {
        setassignment_information_text8af67({...assignment_information_text8af67,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name56fec({...asset_name56fec,isDisabled:true});

    }else
    {
      if(asset_name56fec?.isDisabled==null)
      {
        setasset_name56fec({...asset_name56fec,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_to")){
        setassigned_tof8f17({...assigned_tof8f17,isDisabled:true});

    }else
    {
      if(assigned_tof8f17?.isDisabled==null)
      {
        setassigned_tof8f17({...assigned_tof8f17,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_by")){
        setassigned_byc4563({...assigned_byc4563,isDisabled:true});

    }else
    {
      if(assigned_byc4563?.isDisabled==null)
      {
        setassigned_byc4563({...assigned_byc4563,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_at")){
        setassigned_at45db5({...assigned_at45db5,isDisabled:true});

    }else
    {
      if(assigned_at45db5?.isDisabled==null)
      {
        setassigned_at45db5({...assigned_at45db5,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assignment_status")){
        setassignment_statusa6f80({...assignment_statusa6f80,isDisabled:true});

    }else
    {
      if(assignment_statusa6f80?.isDisabled==null)
      {
        setassignment_statusa6f80({...assignment_statusa6f80,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("condition_at_assign")){
        setcondition_at_assign27aff({...condition_at_assign27aff,isDisabled:true});

    }else
    {
      if(condition_at_assign27aff?.isDisabled==null)
      {
        setcondition_at_assign27aff({...condition_at_assign27aff,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expected_return_date")){
        setexpected_return_date15cfe({...expected_return_date15cfe,isDisabled:true});

    }else
    {
      if(expected_return_date15cfe?.isDisabled==null)
      {
        setexpected_return_date15cfe({...expected_return_date15cfe,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['assign_asset_group'] = assign_asset_groupdb5a7,
        codeStates['setassign_asset_group'] = setassign_asset_groupdb5a7,
        codeStates['assign_asset_groupdb5a7'] = assign_asset_groupdb5a7Props,
        codeStates['setassign_asset_groupdb5a7'] = setassign_asset_groupdb5a7Props,
        codeStates['assignment_information_group'] = assignment_information_group5d144,
        codeStates['setassignment_information_group'] = setassignment_information_group5d144,
        codeStates['assignment_information_group5d144'] = assignment_information_group5d144Props,
        codeStates['setassignment_information_group5d144'] = setassignment_information_group5d144Props,
        codeStates['assignment_information_text'] = assignment_information_text8af67,
        codeStates['setassignment_information_text'] = setassignment_information_text8af67,
        codeStates['asset_name'] = asset_name56fec,
        codeStates['setasset_name'] = setasset_name56fec,
        codeStates['assigned_to'] = assigned_tof8f17,
        codeStates['setassigned_to'] = setassigned_tof8f17,
        codeStates['assigned_by'] = assigned_byc4563,
        codeStates['setassigned_by'] = setassigned_byc4563,
        codeStates['assigned_at'] = assigned_at45db5,
        codeStates['setassigned_at'] = setassigned_at45db5,
        codeStates['assignment_status'] = assignment_statusa6f80,
        codeStates['setassignment_status'] = setassignment_statusa6f80,
        codeStates['condition_at_assign'] = condition_at_assign27aff,
        codeStates['setcondition_at_assign'] = setcondition_at_assign27aff,
        codeStates['expected_return_date'] = expected_return_date15cfe,
        codeStates['setexpected_return_date'] = setexpected_return_date15cfe,
        codeStates['assignment_details_group'] = assignment_details_group7f60d,
        codeStates['setassignment_details_group'] = setassignment_details_group7f60d,
        codeStates['assignment_details_group7f60d'] = assignment_details_group7f60dProps,
        codeStates['setassignment_details_group7f60d'] = setassignment_details_group7f60dProps,
        codeStates['dynamicactions'] = dynamicactions956ba,
        codeStates['setdynamicactions'] = setdynamicactions956ba,
        codeStates['dynamicactions956ba'] = dynamicactions956baProps,
        codeStates['setdynamicactions956ba'] = setdynamicactions956baProps,

    codeExecution(code,codeStates);
    } 
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
        codeStates['assign_asset_group'] = assign_asset_groupdb5a7,
        codeStates['setassign_asset_group'] = setassign_asset_groupdb5a7,
        codeStates['assign_asset_groupdb5a7'] = assign_asset_groupdb5a7Props,
        codeStates['setassign_asset_groupdb5a7'] = setassign_asset_groupdb5a7Props,
        codeStates['assignment_information_group'] = assignment_information_group5d144,
        codeStates['setassignment_information_group'] = setassignment_information_group5d144,
        codeStates['assignment_information_group5d144'] = assignment_information_group5d144Props,
        codeStates['setassignment_information_group5d144'] = setassignment_information_group5d144Props,
        codeStates['assignment_information_text'] = assignment_information_text8af67,
        codeStates['setassignment_information_text'] = setassignment_information_text8af67,
        codeStates['asset_name'] = asset_name56fec,
        codeStates['setasset_name'] = setasset_name56fec,
        codeStates['assigned_to'] = assigned_tof8f17,
        codeStates['setassigned_to'] = setassigned_tof8f17,
        codeStates['assigned_by'] = assigned_byc4563,
        codeStates['setassigned_by'] = setassigned_byc4563,
        codeStates['assigned_at'] = assigned_at45db5,
        codeStates['setassigned_at'] = setassigned_at45db5,
        codeStates['assignment_status'] = assignment_statusa6f80,
        codeStates['setassignment_status'] = setassignment_statusa6f80,
        codeStates['condition_at_assign'] = condition_at_assign27aff,
        codeStates['setcondition_at_assign'] = setcondition_at_assign27aff,
        codeStates['expected_return_date'] = expected_return_date15cfe,
        codeStates['setexpected_return_date'] = setexpected_return_date15cfe,
        codeStates['assignment_details_group'] = assignment_details_group7f60d,
        codeStates['setassignment_details_group'] = setassignment_details_group7f60d,
        codeStates['assignment_details_group7f60d'] = assignment_details_group7f60dProps,
        codeStates['setassignment_details_group7f60d'] = setassignment_details_group7f60dProps,
        codeStates['dynamicactions'] = dynamicactions956ba,
        codeStates['setdynamicactions'] = setdynamicactions956ba,
        codeStates['dynamicactions956ba'] = dynamicactions956baProps,
        codeStates['setdynamicactions956ba'] = setdynamicactions956baProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const assignment_information_group5d144Ref = useRef<any>(null);
  const handleClearSearch = () => {
    assignment_information_group5d144Ref.current?.setSearchParams();
    assignment_information_group5d144Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(assignment_information_group5d144) && Object.keys(assignment_information_group5d144)?.length>0)
      {
        setassignment_information_group5d144({})
      }
    }else 
      prevRefreshRef.current= true
  }, [assignment_information_group5d144Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 58',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '8px',
        backgroundColor:'#f0f2f7',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
          {allowedControls.includes("assignment_information_text") ?<Textassignment_information_text   /* 8af67 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<Dropdownasset_name   /* 56fec */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("assigned_to") ?<TextInputassigned_to   /* f8f17 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("assigned_by") ?<TextInputassigned_by   /* c4563 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("assigned_at") ?<DatePickerassigned_at   /* 45db5 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("assignment_status") ?<Dropdownassignment_status   /* a6f80 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("condition_at_assign") ?<Dropdowncondition_at_assign   /* 27aff */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("expected_return_date") ?<DatePickerexpected_return_date   /* 15cfe */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupassignment_information_group
