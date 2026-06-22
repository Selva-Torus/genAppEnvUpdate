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
import Textassignment_details_text  from "./Textassignment_details_text";
import TextInputactual_return_date  from "./TextInputactual_return_date";
import TextInputreturned_at  from "./TextInputreturned_at";
import TextInputcondition_at_return  from "./TextInputcondition_at_return";
import TextInputapproved_by  from "./TextInputapproved_by";
import TextInputapproval_status  from "./TextInputapproval_status";
import TextInputacknowledgement_signed  from "./TextInputacknowledgement_signed";
import TextAreaassignment_notes  from "./TextAreaassignment_notes";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupassignment_details_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "assignment_details_text",
      "actual_return_date",
      "returned_at",
      "condition_at_return",
      "approved_by",
      "approval_status",
      "acknowledgement_signed",
      "assignment_notes"
    ],
    "allowedGroups": [
      "canvas",
      "assign_asset_group",
      "assignment_information_group",
      "assignment_details_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "assignment_details_text",
      "actual_return_date",
      "returned_at",
      "condition_at_return",
      "approved_by",
      "approval_status",
      "acknowledgement_signed",
      "assignment_notes"
    ],
    "allowedGroups": [
      "canvas",
      "assign_asset_group",
      "assignment_information_group",
      "assignment_details_group"
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
  const {assign_asset_groupb4f2d, setassign_asset_groupb4f2d}= useContext(TotalContext) as TotalContextProps;
  const {assign_asset_groupb4f2dProps, setassign_asset_groupb4f2dProps}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_groupc96e9, setassignment_information_groupc96e9}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_groupc96e9Props, setassignment_information_groupc96e9Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group136e4, setassignment_details_group136e4}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group136e4Props, setassignment_details_group136e4Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_text97d83, setassignment_details_text97d83}= useContext(TotalContext) as TotalContextProps;
  const {actual_return_datec1f64, setactual_return_datec1f64}= useContext(TotalContext) as TotalContextProps;
  const {returned_atecafb, setreturned_atecafb}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_return1d3c7, setcondition_at_return1d3c7}= useContext(TotalContext) as TotalContextProps;
  const {approved_by2b89c, setapproved_by2b89c}= useContext(TotalContext) as TotalContextProps;
  const {approval_statusf07b0, setapproval_statusf07b0}= useContext(TotalContext) as TotalContextProps;
  const {acknowledgement_signed5ee58, setacknowledgement_signed5ee58}= useContext(TotalContext) as TotalContextProps;
  const {assignment_notes59be1, setassignment_notes59be1}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assignassetview_v1, setassignassetview_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignAssetView:AFVK:v1',
    [user],
    'GroupAssignmentDetailsGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "472c369f56f3afb6e920bdd86cc136e4");
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
    setassignment_details_group136e4Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("assignment_details_text")){
        setassignment_details_text97d83({...assignment_details_text97d83,isDisabled:true});

    }else
    {
      if(assignment_details_text97d83?.isDisabled==null)
      {
        setassignment_details_text97d83({...assignment_details_text97d83,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("actual_return_date")){
        setactual_return_datec1f64({...actual_return_datec1f64,isDisabled:true});

    }else
    {
      if(actual_return_datec1f64?.isDisabled==null)
      {
        setactual_return_datec1f64({...actual_return_datec1f64,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("returned_at")){
        setreturned_atecafb({...returned_atecafb,isDisabled:true});

    }else
    {
      if(returned_atecafb?.isDisabled==null)
      {
        setreturned_atecafb({...returned_atecafb,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("condition_at_return")){
        setcondition_at_return1d3c7({...condition_at_return1d3c7,isDisabled:true});

    }else
    {
      if(condition_at_return1d3c7?.isDisabled==null)
      {
        setcondition_at_return1d3c7({...condition_at_return1d3c7,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approved_by")){
        setapproved_by2b89c({...approved_by2b89c,isDisabled:true});

    }else
    {
      if(approved_by2b89c?.isDisabled==null)
      {
        setapproved_by2b89c({...approved_by2b89c,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approval_status")){
        setapproval_statusf07b0({...approval_statusf07b0,isDisabled:true});

    }else
    {
      if(approval_statusf07b0?.isDisabled==null)
      {
        setapproval_statusf07b0({...approval_statusf07b0,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("acknowledgement_signed")){
        setacknowledgement_signed5ee58({...acknowledgement_signed5ee58,isDisabled:true});

    }else
    {
      if(acknowledgement_signed5ee58?.isDisabled==null)
      {
        setacknowledgement_signed5ee58({...acknowledgement_signed5ee58,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assignment_notes")){
        setassignment_notes59be1({...assignment_notes59be1,isDisabled:true});

    }else
    {
      if(assignment_notes59be1?.isDisabled==null)
      {
        setassignment_notes59be1({...assignment_notes59be1,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['assign_asset_group'] = assign_asset_groupb4f2d,
        codeStates['setassign_asset_group'] = setassign_asset_groupb4f2d,
        codeStates['assign_asset_groupb4f2d'] = assign_asset_groupb4f2dProps,
        codeStates['setassign_asset_groupb4f2d'] = setassign_asset_groupb4f2dProps,
        codeStates['assignment_information_group'] = assignment_information_groupc96e9,
        codeStates['setassignment_information_group'] = setassignment_information_groupc96e9,
        codeStates['assignment_information_groupc96e9'] = assignment_information_groupc96e9Props,
        codeStates['setassignment_information_groupc96e9'] = setassignment_information_groupc96e9Props,
        codeStates['assignment_details_group'] = assignment_details_group136e4,
        codeStates['setassignment_details_group'] = setassignment_details_group136e4,
        codeStates['assignment_details_group136e4'] = assignment_details_group136e4Props,
        codeStates['setassignment_details_group136e4'] = setassignment_details_group136e4Props,
        codeStates['assignment_details_text'] = assignment_details_text97d83,
        codeStates['setassignment_details_text'] = setassignment_details_text97d83,
        codeStates['actual_return_date'] = actual_return_datec1f64,
        codeStates['setactual_return_date'] = setactual_return_datec1f64,
        codeStates['returned_at'] = returned_atecafb,
        codeStates['setreturned_at'] = setreturned_atecafb,
        codeStates['condition_at_return'] = condition_at_return1d3c7,
        codeStates['setcondition_at_return'] = setcondition_at_return1d3c7,
        codeStates['approved_by'] = approved_by2b89c,
        codeStates['setapproved_by'] = setapproved_by2b89c,
        codeStates['approval_status'] = approval_statusf07b0,
        codeStates['setapproval_status'] = setapproval_statusf07b0,
        codeStates['acknowledgement_signed'] = acknowledgement_signed5ee58,
        codeStates['setacknowledgement_signed'] = setacknowledgement_signed5ee58,
        codeStates['assignment_notes'] = assignment_notes59be1,
        codeStates['setassignment_notes'] = setassignment_notes59be1,

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
        codeStates['assign_asset_group'] = assign_asset_groupb4f2d,
        codeStates['setassign_asset_group'] = setassign_asset_groupb4f2d,
        codeStates['assign_asset_groupb4f2d'] = assign_asset_groupb4f2dProps,
        codeStates['setassign_asset_groupb4f2d'] = setassign_asset_groupb4f2dProps,
        codeStates['assignment_information_group'] = assignment_information_groupc96e9,
        codeStates['setassignment_information_group'] = setassignment_information_groupc96e9,
        codeStates['assignment_information_groupc96e9'] = assignment_information_groupc96e9Props,
        codeStates['setassignment_information_groupc96e9'] = setassignment_information_groupc96e9Props,
        codeStates['assignment_details_group'] = assignment_details_group136e4,
        codeStates['setassignment_details_group'] = setassignment_details_group136e4,
        codeStates['assignment_details_group136e4'] = assignment_details_group136e4Props,
        codeStates['setassignment_details_group136e4'] = setassignment_details_group136e4Props,
        codeStates['assignment_details_text'] = assignment_details_text97d83,
        codeStates['setassignment_details_text'] = setassignment_details_text97d83,
        codeStates['actual_return_date'] = actual_return_datec1f64,
        codeStates['setactual_return_date'] = setactual_return_datec1f64,
        codeStates['returned_at'] = returned_atecafb,
        codeStates['setreturned_at'] = setreturned_atecafb,
        codeStates['condition_at_return'] = condition_at_return1d3c7,
        codeStates['setcondition_at_return'] = setcondition_at_return1d3c7,
        codeStates['approved_by'] = approved_by2b89c,
        codeStates['setapproved_by'] = setapproved_by2b89c,
        codeStates['approval_status'] = approval_statusf07b0,
        codeStates['setapproval_status'] = setapproval_statusf07b0,
        codeStates['acknowledgement_signed'] = acknowledgement_signed5ee58,
        codeStates['setacknowledgement_signed'] = setacknowledgement_signed5ee58,
        codeStates['assignment_notes'] = assignment_notes59be1,
        codeStates['setassignment_notes'] = setassignment_notes59be1,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const assignment_details_group136e4Ref = useRef<any>(null);
  const handleClearSearch = () => {
    assignment_details_group136e4Ref.current?.setSearchParams();
    assignment_details_group136e4Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(assignment_details_group136e4) && Object.keys(assignment_details_group136e4)?.length>0)
      {
        setassignment_details_group136e4({})
      }
    }else 
      prevRefreshRef.current= true
  }, [assignment_details_group136e4Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '50 / 100',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#f0f2f7',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
          {allowedControls.includes("assignment_details_text") ?<Textassignment_details_text   /* 97d83 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("actual_return_date") ?<TextInputactual_return_date   /* c1f64 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("returned_at") ?<TextInputreturned_at   /* ecafb */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("condition_at_return") ?<TextInputcondition_at_return   /* 1d3c7 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("approved_by") ?<TextInputapproved_by   /* 2b89c */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("approval_status") ?<TextInputapproval_status   /* f07b0 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("acknowledgement_signed") ?<TextInputacknowledgement_signed   /* 5ee58 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("assignment_notes") ?<TextAreaassignment_notes   /* 59be1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupassignment_details_group
