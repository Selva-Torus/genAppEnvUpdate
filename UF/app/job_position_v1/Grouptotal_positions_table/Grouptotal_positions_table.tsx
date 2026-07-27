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
import Tabletotal_positions_table  from './Tabletotal_positions_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptotal_positions_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_jobpositions_v1Props, setdfd_jobpositions_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "position_id",
      "position_code",
      "position_title",
      "grade_name",
      "employment_type",
      "experience_required",
      "job_level",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "ad_doc"
    ],
    "allowedGroups": [
      "canvas",
      "total_position_group",
      "total_positions_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "position_id",
      "position_code",
      "position_title",
      "grade_name",
      "employment_type",
      "experience_required",
      "job_level",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "ad_doc"
    ],
    "allowedGroups": [
      "canvas",
      "total_position_group",
      "total_positions_table"
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
  const {total_position_group79a63, settotal_position_group79a63}= useContext(TotalContext) as TotalContextProps;
  const {total_position_group79a63Props, settotal_position_group79a63Props}= useContext(TotalContext) as TotalContextProps;
  const {total_positions_table22a59, settotal_positions_table22a59}= useContext(TotalContext) as TotalContextProps;
  const {total_positions_table22a59Props, settotal_positions_table22a59Props}= useContext(TotalContext) as TotalContextProps;
  const {position_idd92e4, setposition_idd92e4}= useContext(TotalContext) as TotalContextProps;
  const {position_codebd881, setposition_codebd881}= useContext(TotalContext) as TotalContextProps;
  const {position_titleda9c0, setposition_titleda9c0}= useContext(TotalContext) as TotalContextProps;
  const {grade_name6c5bb, setgrade_name6c5bb}= useContext(TotalContext) as TotalContextProps;
  const {employment_type16321, setemployment_type16321}= useContext(TotalContext) as TotalContextProps;
  const {experience_requiredcde5a, setexperience_requiredcde5a}= useContext(TotalContext) as TotalContextProps;
  const {job_levele1aaa, setjob_levele1aaa}= useContext(TotalContext) as TotalContextProps;
  const {view_btn7004e, setview_btn7004e}= useContext(TotalContext) as TotalContextProps;
  const {edit_btna042d, setedit_btna042d}= useContext(TotalContext) as TotalContextProps;
  const {delete_btnd0e5f, setdelete_btnd0e5f}= useContext(TotalContext) as TotalContextProps;
  const {ad_doca657b, setad_doca657b}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {employeejobpositions_v1, setemployeejobpositions_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobPositions:AFVK:v1',
    [user],
    'GroupTotalPositionsTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "be36788337963d8ca3d8befe9e222a59");
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
    settotal_positions_table22a59Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("position_id")){
        setposition_idd92e4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_idd92e4?.isDisabled==null)
      {
        setposition_idd92e4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("position_code")){
        setposition_codebd881((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_codebd881?.isDisabled==null)
      {
        setposition_codebd881((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("position_title")){
        setposition_titleda9c0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_titleda9c0?.isDisabled==null)
      {
        setposition_titleda9c0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_name")){
        setgrade_name6c5bb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_name6c5bb?.isDisabled==null)
      {
        setgrade_name6c5bb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employment_type")){
        setemployment_type16321((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employment_type16321?.isDisabled==null)
      {
        setemployment_type16321((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("experience_required")){
        setexperience_requiredcde5a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(experience_requiredcde5a?.isDisabled==null)
      {
        setexperience_requiredcde5a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("job_level")){
        setjob_levele1aaa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(job_levele1aaa?.isDisabled==null)
      {
        setjob_levele1aaa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btn7004e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(view_btn7004e?.isDisabled==null)
      {
        setview_btn7004e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btna042d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(edit_btna042d?.isDisabled==null)
      {
        setedit_btna042d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btnd0e5f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_btnd0e5f?.isDisabled==null)
      {
        setdelete_btnd0e5f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ad_doc")){
        setad_doca657b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ad_doca657b?.isDisabled==null)
      {
        setad_doca657b((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['total_position_group'] = total_position_group79a63,
        codeStates['settotal_position_group'] = settotal_position_group79a63,
        codeStates['total_position_group79a63'] = total_position_group79a63Props,
        codeStates['settotal_position_group79a63'] = settotal_position_group79a63Props,
        codeStates['total_positions_table'] = total_positions_table22a59,
        codeStates['settotal_positions_table'] = settotal_positions_table22a59,
        codeStates['total_positions_table22a59'] = total_positions_table22a59Props,
        codeStates['settotal_positions_table22a59'] = settotal_positions_table22a59Props,
        codeStates['position_id'] = position_idd92e4,
        codeStates['setposition_id'] = setposition_idd92e4,
        codeStates['position_code'] = position_codebd881,
        codeStates['setposition_code'] = setposition_codebd881,
        codeStates['position_title'] = position_titleda9c0,
        codeStates['setposition_title'] = setposition_titleda9c0,
        codeStates['grade_name'] = grade_name6c5bb,
        codeStates['setgrade_name'] = setgrade_name6c5bb,
        codeStates['employment_type'] = employment_type16321,
        codeStates['setemployment_type'] = setemployment_type16321,
        codeStates['experience_required'] = experience_requiredcde5a,
        codeStates['setexperience_required'] = setexperience_requiredcde5a,
        codeStates['job_level'] = job_levele1aaa,
        codeStates['setjob_level'] = setjob_levele1aaa,
        codeStates['view_btn'] = view_btn7004e,
        codeStates['setview_btn'] = setview_btn7004e,
        codeStates['edit_btn'] = edit_btna042d,
        codeStates['setedit_btn'] = setedit_btna042d,
        codeStates['delete_btn'] = delete_btnd0e5f,
        codeStates['setdelete_btn'] = setdelete_btnd0e5f,
        codeStates['ad_doc'] = ad_doca657b,
        codeStates['setad_doc'] = setad_doca657b,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const total_positions_table22a59Ref = useRef<any>(null);
  const handleClearSearch = () => {
    total_positions_table22a59Ref.current?.setSearchParams();
    total_positions_table22a59Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(total_positions_table22a59) && Object.keys(total_positions_table22a59)?.length>0)
      {
        settotal_positions_table22a59({})
      }
    }else 
      prevRefreshRef.current= true
  }, [total_positions_table22a59Props?.refresh,token])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '12 / 146',
      
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
          setemployeejobpositions_v1((pre:any)=>({...pre,_selectedGroup_:"total_positions_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletotal_positions_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={total_positions_table22a59Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptotal_positions_table
