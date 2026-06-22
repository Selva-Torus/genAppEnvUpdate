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
import TextInputasset_name  from "./TextInputasset_name";
import TextInputassigned_to  from "./TextInputassigned_to";
import TextInputassigned_by  from "./TextInputassigned_by";
import TextInputassigned_at  from "./TextInputassigned_at";
import TextInputassignment_status  from "./TextInputassignment_status";
import TextInputcondition_at_assign  from "./TextInputcondition_at_assign";
import TextInputexpected_return_date  from "./TextInputexpected_return_date";
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
      "assignment_details_group"
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
  const {assignment_information_textbebbc, setassignment_information_textbebbc}= useContext(TotalContext) as TotalContextProps;
  const {asset_name39101, setasset_name39101}= useContext(TotalContext) as TotalContextProps;
  const {assigned_toad6a1, setassigned_toad6a1}= useContext(TotalContext) as TotalContextProps;
  const {assigned_byaa464, setassigned_byaa464}= useContext(TotalContext) as TotalContextProps;
  const {assigned_atca20b, setassigned_atca20b}= useContext(TotalContext) as TotalContextProps;
  const {assignment_status1057b, setassignment_status1057b}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_assignf6852, setcondition_at_assignf6852}= useContext(TotalContext) as TotalContextProps;
  const {expected_return_datedf53d, setexpected_return_datedf53d}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group136e4, setassignment_details_group136e4}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group136e4Props, setassignment_details_group136e4Props}= useContext(TotalContext) as TotalContextProps;
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8b8be57613e6374a30114f7b757c96e9");
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
    setassignment_information_groupc96e9Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("assignment_information_text")){
        setassignment_information_textbebbc({...assignment_information_textbebbc,isDisabled:true});

    }else
    {
      if(assignment_information_textbebbc?.isDisabled==null)
      {
        setassignment_information_textbebbc({...assignment_information_textbebbc,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name39101({...asset_name39101,isDisabled:true});

    }else
    {
      if(asset_name39101?.isDisabled==null)
      {
        setasset_name39101({...asset_name39101,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_to")){
        setassigned_toad6a1({...assigned_toad6a1,isDisabled:true});

    }else
    {
      if(assigned_toad6a1?.isDisabled==null)
      {
        setassigned_toad6a1({...assigned_toad6a1,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_by")){
        setassigned_byaa464({...assigned_byaa464,isDisabled:true});

    }else
    {
      if(assigned_byaa464?.isDisabled==null)
      {
        setassigned_byaa464({...assigned_byaa464,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_at")){
        setassigned_atca20b({...assigned_atca20b,isDisabled:true});

    }else
    {
      if(assigned_atca20b?.isDisabled==null)
      {
        setassigned_atca20b({...assigned_atca20b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assignment_status")){
        setassignment_status1057b({...assignment_status1057b,isDisabled:true});

    }else
    {
      if(assignment_status1057b?.isDisabled==null)
      {
        setassignment_status1057b({...assignment_status1057b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("condition_at_assign")){
        setcondition_at_assignf6852({...condition_at_assignf6852,isDisabled:true});

    }else
    {
      if(condition_at_assignf6852?.isDisabled==null)
      {
        setcondition_at_assignf6852({...condition_at_assignf6852,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expected_return_date")){
        setexpected_return_datedf53d({...expected_return_datedf53d,isDisabled:true});

    }else
    {
      if(expected_return_datedf53d?.isDisabled==null)
      {
        setexpected_return_datedf53d({...expected_return_datedf53d,isDisabled:false});
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
        codeStates['assignment_information_text'] = assignment_information_textbebbc,
        codeStates['setassignment_information_text'] = setassignment_information_textbebbc,
        codeStates['asset_name'] = asset_name39101,
        codeStates['setasset_name'] = setasset_name39101,
        codeStates['assigned_to'] = assigned_toad6a1,
        codeStates['setassigned_to'] = setassigned_toad6a1,
        codeStates['assigned_by'] = assigned_byaa464,
        codeStates['setassigned_by'] = setassigned_byaa464,
        codeStates['assigned_at'] = assigned_atca20b,
        codeStates['setassigned_at'] = setassigned_atca20b,
        codeStates['assignment_status'] = assignment_status1057b,
        codeStates['setassignment_status'] = setassignment_status1057b,
        codeStates['condition_at_assign'] = condition_at_assignf6852,
        codeStates['setcondition_at_assign'] = setcondition_at_assignf6852,
        codeStates['expected_return_date'] = expected_return_datedf53d,
        codeStates['setexpected_return_date'] = setexpected_return_datedf53d,
        codeStates['assignment_details_group'] = assignment_details_group136e4,
        codeStates['setassignment_details_group'] = setassignment_details_group136e4,
        codeStates['assignment_details_group136e4'] = assignment_details_group136e4Props,
        codeStates['setassignment_details_group136e4'] = setassignment_details_group136e4Props,

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
        codeStates['assignment_information_text'] = assignment_information_textbebbc,
        codeStates['setassignment_information_text'] = setassignment_information_textbebbc,
        codeStates['asset_name'] = asset_name39101,
        codeStates['setasset_name'] = setasset_name39101,
        codeStates['assigned_to'] = assigned_toad6a1,
        codeStates['setassigned_to'] = setassigned_toad6a1,
        codeStates['assigned_by'] = assigned_byaa464,
        codeStates['setassigned_by'] = setassigned_byaa464,
        codeStates['assigned_at'] = assigned_atca20b,
        codeStates['setassigned_at'] = setassigned_atca20b,
        codeStates['assignment_status'] = assignment_status1057b,
        codeStates['setassignment_status'] = setassignment_status1057b,
        codeStates['condition_at_assign'] = condition_at_assignf6852,
        codeStates['setcondition_at_assign'] = setcondition_at_assignf6852,
        codeStates['expected_return_date'] = expected_return_datedf53d,
        codeStates['setexpected_return_date'] = setexpected_return_datedf53d,
        codeStates['assignment_details_group'] = assignment_details_group136e4,
        codeStates['setassignment_details_group'] = setassignment_details_group136e4,
        codeStates['assignment_details_group136e4'] = assignment_details_group136e4Props,
        codeStates['setassignment_details_group136e4'] = setassignment_details_group136e4Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const assignment_information_groupc96e9Ref = useRef<any>(null);
  const handleClearSearch = () => {
    assignment_information_groupc96e9Ref.current?.setSearchParams();
    assignment_information_groupc96e9Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(assignment_information_groupc96e9) && Object.keys(assignment_information_groupc96e9)?.length>0)
      {
        setassignment_information_groupc96e9({})
      }
    }else 
      prevRefreshRef.current= true
  }, [assignment_information_groupc96e9Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 49',
      
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
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
          {allowedControls.includes("assignment_information_text") ?<Textassignment_information_text   /* bebbc */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<TextInputasset_name   /* 39101 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("assigned_to") ?<TextInputassigned_to   /* ad6a1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("assigned_by") ?<TextInputassigned_by   /* aa464 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("assigned_at") ?<TextInputassigned_at   /* ca20b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("assignment_status") ?<TextInputassignment_status   /* 1057b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("condition_at_assign") ?<TextInputcondition_at_assign   /* f6852 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("expected_return_date") ?<TextInputexpected_return_date   /* df53d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupassignment_information_group
