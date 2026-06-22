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
import DatePickeractual_return_date  from "./DatePickeractual_return_date";
import DatePickerreturned_at  from "./DatePickerreturned_at";
import Dropdowncondition_at_return  from "./Dropdowncondition_at_return";
import TextInputapproved_by  from "./TextInputapproved_by";
import Dropdownapproval_status  from "./Dropdownapproval_status";
import TextAreaassignment_notes  from "./TextAreaassignment_notes";
import Checkboxacknowledgement_signed  from "./Checkboxacknowledgement_signed";
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
      "assignment_details_text",
      "actual_return_date",
      "returned_at",
      "condition_at_return",
      "approved_by",
      "approval_status",
      "assignment_notes",
      "acknowledgement_signed"
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
      "assignment_details_text",
      "actual_return_date",
      "returned_at",
      "condition_at_return",
      "approved_by",
      "approval_status",
      "assignment_notes",
      "acknowledgement_signed"
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
  const {assignment_details_group7f60d, setassignment_details_group7f60d}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group7f60dProps, setassignment_details_group7f60dProps}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_textb98b6, setassignment_details_textb98b6}= useContext(TotalContext) as TotalContextProps;
  const {actual_return_date06574, setactual_return_date06574}= useContext(TotalContext) as TotalContextProps;
  const {returned_atb4ccc, setreturned_atb4ccc}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_return40b7c, setcondition_at_return40b7c}= useContext(TotalContext) as TotalContextProps;
  const {approved_by8c220, setapproved_by8c220}= useContext(TotalContext) as TotalContextProps;
  const {approval_statuseb2b2, setapproval_statuseb2b2}= useContext(TotalContext) as TotalContextProps;
  const {assignment_notese758f, setassignment_notese758f}= useContext(TotalContext) as TotalContextProps;
  const {acknowledgement_signedfdaee, setacknowledgement_signedfdaee}= useContext(TotalContext) as TotalContextProps;
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "71dc0557a5ad48bd8bc18a025737f60d");
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
    setassignment_details_group7f60dProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("assignment_details_text")){
        setassignment_details_textb98b6({...assignment_details_textb98b6,isDisabled:true});

    }else
    {
      if(assignment_details_textb98b6?.isDisabled==null)
      {
        setassignment_details_textb98b6({...assignment_details_textb98b6,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("actual_return_date")){
        setactual_return_date06574({...actual_return_date06574,isDisabled:true});

    }else
    {
      if(actual_return_date06574?.isDisabled==null)
      {
        setactual_return_date06574({...actual_return_date06574,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("returned_at")){
        setreturned_atb4ccc({...returned_atb4ccc,isDisabled:true});

    }else
    {
      if(returned_atb4ccc?.isDisabled==null)
      {
        setreturned_atb4ccc({...returned_atb4ccc,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("condition_at_return")){
        setcondition_at_return40b7c({...condition_at_return40b7c,isDisabled:true});

    }else
    {
      if(condition_at_return40b7c?.isDisabled==null)
      {
        setcondition_at_return40b7c({...condition_at_return40b7c,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approved_by")){
        setapproved_by8c220({...approved_by8c220,isDisabled:true});

    }else
    {
      if(approved_by8c220?.isDisabled==null)
      {
        setapproved_by8c220({...approved_by8c220,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approval_status")){
        setapproval_statuseb2b2({...approval_statuseb2b2,isDisabled:true});

    }else
    {
      if(approval_statuseb2b2?.isDisabled==null)
      {
        setapproval_statuseb2b2({...approval_statuseb2b2,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assignment_notes")){
        setassignment_notese758f({...assignment_notese758f,isDisabled:true});

    }else
    {
      if(assignment_notese758f?.isDisabled==null)
      {
        setassignment_notese758f({...assignment_notese758f,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("acknowledgement_signed")){
        setacknowledgement_signedfdaee({...acknowledgement_signedfdaee,isDisabled:true});

    }else
    {
      if(acknowledgement_signedfdaee?.isDisabled==null)
      {
        setacknowledgement_signedfdaee({...acknowledgement_signedfdaee,isDisabled:false});
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
        codeStates['assignment_details_group'] = assignment_details_group7f60d,
        codeStates['setassignment_details_group'] = setassignment_details_group7f60d,
        codeStates['assignment_details_group7f60d'] = assignment_details_group7f60dProps,
        codeStates['setassignment_details_group7f60d'] = setassignment_details_group7f60dProps,
        codeStates['assignment_details_text'] = assignment_details_textb98b6,
        codeStates['setassignment_details_text'] = setassignment_details_textb98b6,
        codeStates['actual_return_date'] = actual_return_date06574,
        codeStates['setactual_return_date'] = setactual_return_date06574,
        codeStates['returned_at'] = returned_atb4ccc,
        codeStates['setreturned_at'] = setreturned_atb4ccc,
        codeStates['condition_at_return'] = condition_at_return40b7c,
        codeStates['setcondition_at_return'] = setcondition_at_return40b7c,
        codeStates['approved_by'] = approved_by8c220,
        codeStates['setapproved_by'] = setapproved_by8c220,
        codeStates['approval_status'] = approval_statuseb2b2,
        codeStates['setapproval_status'] = setapproval_statuseb2b2,
        codeStates['assignment_notes'] = assignment_notese758f,
        codeStates['setassignment_notes'] = setassignment_notese758f,
        codeStates['acknowledgement_signed'] = acknowledgement_signedfdaee,
        codeStates['setacknowledgement_signed'] = setacknowledgement_signedfdaee,
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
        codeStates['assignment_details_group'] = assignment_details_group7f60d,
        codeStates['setassignment_details_group'] = setassignment_details_group7f60d,
        codeStates['assignment_details_group7f60d'] = assignment_details_group7f60dProps,
        codeStates['setassignment_details_group7f60d'] = setassignment_details_group7f60dProps,
        codeStates['assignment_details_text'] = assignment_details_textb98b6,
        codeStates['setassignment_details_text'] = setassignment_details_textb98b6,
        codeStates['actual_return_date'] = actual_return_date06574,
        codeStates['setactual_return_date'] = setactual_return_date06574,
        codeStates['returned_at'] = returned_atb4ccc,
        codeStates['setreturned_at'] = setreturned_atb4ccc,
        codeStates['condition_at_return'] = condition_at_return40b7c,
        codeStates['setcondition_at_return'] = setcondition_at_return40b7c,
        codeStates['approved_by'] = approved_by8c220,
        codeStates['setapproved_by'] = setapproved_by8c220,
        codeStates['approval_status'] = approval_statuseb2b2,
        codeStates['setapproval_status'] = setapproval_statuseb2b2,
        codeStates['assignment_notes'] = assignment_notese758f,
        codeStates['setassignment_notes'] = setassignment_notese758f,
        codeStates['acknowledgement_signed'] = acknowledgement_signedfdaee,
        codeStates['setacknowledgement_signed'] = setacknowledgement_signedfdaee,
        codeStates['dynamicactions'] = dynamicactions956ba,
        codeStates['setdynamicactions'] = setdynamicactions956ba,
        codeStates['dynamicactions956ba'] = dynamicactions956baProps,
        codeStates['setdynamicactions956ba'] = setdynamicactions956baProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const assignment_details_group7f60dRef = useRef<any>(null);
  const handleClearSearch = () => {
    assignment_details_group7f60dRef.current?.setSearchParams();
    assignment_details_group7f60dRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(assignment_details_group7f60d) && Object.keys(assignment_details_group7f60d)?.length>0)
      {
        setassignment_details_group7f60d({})
      }
    }else 
      prevRefreshRef.current= true
  }, [assignment_details_group7f60dProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '59 / 109',
      
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
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
          {allowedControls.includes("assignment_details_text") ?<Textassignment_details_text   /* b98b6 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("actual_return_date") ?<DatePickeractual_return_date   /* 06574 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("returned_at") ?<DatePickerreturned_at   /* b4ccc */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("condition_at_return") ?<Dropdowncondition_at_return   /* 40b7c */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("approved_by") ?<TextInputapproved_by   /* 8c220 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("approval_status") ?<Dropdownapproval_status   /* eb2b2 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("assignment_notes") ?<TextAreaassignment_notes   /* e758f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("acknowledgement_signed") ?<Checkboxacknowledgement_signed   /* fdaee */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupassignment_details_group
