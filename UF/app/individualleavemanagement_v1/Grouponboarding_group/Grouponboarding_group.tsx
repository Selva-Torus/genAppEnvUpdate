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
import Dividerdivider  from "./Dividerdivider";
import Iconrej_icon  from "./Iconrej_icon";
import Textreject_text  from "./Textreject_text";
import Textrejected_requests  from "./Textrejected_requests";
import Textboard_des_text  from "./Textboard_des_text";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouponboarding_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_individualleavereqtable_v1Props, setdfd_individualleavereqtable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_leavepiechart_v1Props, setdfd_leavepiechart_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_individualleavereqcards_v1Props, setdfd_individualleavereqcards_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "CXO": {
    "allowedControls": [
      "divider",
      "rej_icon",
      "reject_text",
      "rejected_requests",
      "board_des_text"
    ],
    "allowedGroups": [
      "canvas",
      "hrm_dashboard_group",
      "total_employees_group",
      "leave_requests_group",
      "onboarding_group",
      "chart_group",
      "leave_group",
      "leave_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "divider",
      "rej_icon",
      "reject_text",
      "rejected_requests",
      "board_des_text"
    ],
    "allowedGroups": [
      "canvas",
      "hrm_dashboard_group",
      "total_employees_group",
      "leave_requests_group",
      "onboarding_group",
      "chart_group",
      "leave_group",
      "leave_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "divider",
      "rej_icon",
      "reject_text",
      "rejected_requests",
      "board_des_text"
    ],
    "allowedGroups": [
      "canvas",
      "hrm_dashboard_group",
      "total_employees_group",
      "leave_requests_group",
      "onboarding_group",
      "chart_group",
      "leave_group",
      "leave_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "divider",
      "rej_icon",
      "reject_text",
      "rejected_requests",
      "board_des_text"
    ],
    "allowedGroups": [
      "canvas",
      "hrm_dashboard_group",
      "total_employees_group",
      "leave_requests_group",
      "onboarding_group",
      "chart_group",
      "leave_group",
      "leave_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "divider",
      "rej_icon",
      "reject_text",
      "rejected_requests",
      "board_des_text"
    ],
    "allowedGroups": [
      "canvas",
      "hrm_dashboard_group",
      "total_employees_group",
      "leave_requests_group",
      "onboarding_group",
      "chart_group",
      "leave_group",
      "leave_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "divider",
      "rej_icon",
      "reject_text",
      "rejected_requests",
      "board_des_text"
    ],
    "allowedGroups": [
      "canvas",
      "hrm_dashboard_group",
      "total_employees_group",
      "leave_requests_group",
      "onboarding_group",
      "chart_group",
      "leave_group",
      "leave_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "divider",
      "rej_icon",
      "reject_text",
      "rejected_requests",
      "board_des_text"
    ],
    "allowedGroups": [
      "canvas",
      "hrm_dashboard_group",
      "total_employees_group",
      "leave_requests_group",
      "onboarding_group",
      "chart_group",
      "leave_group",
      "leave_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "divider",
      "rej_icon",
      "reject_text",
      "rejected_requests",
      "board_des_text"
    ],
    "allowedGroups": [
      "canvas",
      "hrm_dashboard_group",
      "total_employees_group",
      "leave_requests_group",
      "onboarding_group",
      "chart_group",
      "leave_group",
      "leave_req_table"
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
  const {hrm_dashboard_groupc9b72, sethrm_dashboard_groupc9b72}= useContext(TotalContext) as TotalContextProps;
  const {hrm_dashboard_groupc9b72Props, sethrm_dashboard_groupc9b72Props}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69415, settotal_employees_group69415}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69415Props, settotal_employees_group69415Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_groupb9aaf, setleave_requests_groupb9aaf}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_groupb9aafProps, setleave_requests_groupb9aafProps}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group4ab1e, setonboarding_group4ab1e}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group4ab1eProps, setonboarding_group4ab1eProps}= useContext(TotalContext) as TotalContextProps;
  const {dividerd3a93, setdividerd3a93}= useContext(TotalContext) as TotalContextProps;
  const {rej_icon0c7ca, setrej_icon0c7ca}= useContext(TotalContext) as TotalContextProps;
  const {reject_text7fb06, setreject_text7fb06}= useContext(TotalContext) as TotalContextProps;
  const {rejected_requestsf6330, setrejected_requestsf6330}= useContext(TotalContext) as TotalContextProps;
  const {board_des_text1e55c, setboard_des_text1e55c}= useContext(TotalContext) as TotalContextProps;
  const {chart_groupdd9ff, setchart_groupdd9ff}= useContext(TotalContext) as TotalContextProps;
  const {chart_groupdd9ffProps, setchart_groupdd9ffProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_group1d83d, setleave_group1d83d}= useContext(TotalContext) as TotalContextProps;
  const {leave_group1d83dProps, setleave_group1d83dProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_table1dfa0, setleave_req_table1dfa0}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_table1dfa0Props, setleave_req_table1dfa0Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {individualleavemanagement_v1, setindividualleavemanagement_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:IndividualLeaveManagement:AFVK:v1',
    [user],
    'GroupOnboardingGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "b1ac60952791ef3e0ea3f2a0cd94ab1e");
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
    setonboarding_group4ab1eProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("divider")){
        setdividerd3a93((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dividerd3a93?.isDisabled==null)
      {
        setdividerd3a93((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("rej_icon")){
        setrej_icon0c7ca((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(rej_icon0c7ca?.isDisabled==null)
      {
        setrej_icon0c7ca((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("reject_text")){
        setreject_text7fb06((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(reject_text7fb06?.isDisabled==null)
      {
        setreject_text7fb06((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("rejected_requests")){
        setrejected_requestsf6330((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(rejected_requestsf6330?.isDisabled==null)
      {
        setrejected_requestsf6330((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("board_des_text")){
        setboard_des_text1e55c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(board_des_text1e55c?.isDisabled==null)
      {
        setboard_des_text1e55c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['hrm_dashboard_group'] = hrm_dashboard_groupc9b72,
        codeStates['sethrm_dashboard_group'] = sethrm_dashboard_groupc9b72,
        codeStates['hrm_dashboard_groupc9b72'] = hrm_dashboard_groupc9b72Props,
        codeStates['sethrm_dashboard_groupc9b72'] = sethrm_dashboard_groupc9b72Props,
        codeStates['total_employees_group'] = total_employees_group69415,
        codeStates['settotal_employees_group'] = settotal_employees_group69415,
        codeStates['total_employees_group69415'] = total_employees_group69415Props,
        codeStates['settotal_employees_group69415'] = settotal_employees_group69415Props,
        codeStates['leave_requests_group'] = leave_requests_groupb9aaf,
        codeStates['setleave_requests_group'] = setleave_requests_groupb9aaf,
        codeStates['leave_requests_groupb9aaf'] = leave_requests_groupb9aafProps,
        codeStates['setleave_requests_groupb9aaf'] = setleave_requests_groupb9aafProps,
        codeStates['onboarding_group'] = onboarding_group4ab1e,
        codeStates['setonboarding_group'] = setonboarding_group4ab1e,
        codeStates['onboarding_group4ab1e'] = onboarding_group4ab1eProps,
        codeStates['setonboarding_group4ab1e'] = setonboarding_group4ab1eProps,
        codeStates['divider'] = dividerd3a93,
        codeStates['setdivider'] = setdividerd3a93,
        codeStates['rej_icon'] = rej_icon0c7ca,
        codeStates['setrej_icon'] = setrej_icon0c7ca,
        codeStates['reject_text'] = reject_text7fb06,
        codeStates['setreject_text'] = setreject_text7fb06,
        codeStates['rejected_requests'] = rejected_requestsf6330,
        codeStates['setrejected_requests'] = setrejected_requestsf6330,
        codeStates['board_des_text'] = board_des_text1e55c,
        codeStates['setboard_des_text'] = setboard_des_text1e55c,
        codeStates['chart_group'] = chart_groupdd9ff,
        codeStates['setchart_group'] = setchart_groupdd9ff,
        codeStates['chart_groupdd9ff'] = chart_groupdd9ffProps,
        codeStates['setchart_groupdd9ff'] = setchart_groupdd9ffProps,
        codeStates['leave_group'] = leave_group1d83d,
        codeStates['setleave_group'] = setleave_group1d83d,
        codeStates['leave_group1d83d'] = leave_group1d83dProps,
        codeStates['setleave_group1d83d'] = setleave_group1d83dProps,
        codeStates['leave_req_table'] = leave_req_table1dfa0,
        codeStates['setleave_req_table'] = setleave_req_table1dfa0,
        codeStates['leave_req_table1dfa0'] = leave_req_table1dfa0Props,
        codeStates['setleave_req_table1dfa0'] = setleave_req_table1dfa0Props,

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
        codeStates['hrm_dashboard_group'] = hrm_dashboard_groupc9b72,
        codeStates['sethrm_dashboard_group'] = sethrm_dashboard_groupc9b72,
        codeStates['hrm_dashboard_groupc9b72'] = hrm_dashboard_groupc9b72Props,
        codeStates['sethrm_dashboard_groupc9b72'] = sethrm_dashboard_groupc9b72Props,
        codeStates['total_employees_group'] = total_employees_group69415,
        codeStates['settotal_employees_group'] = settotal_employees_group69415,
        codeStates['total_employees_group69415'] = total_employees_group69415Props,
        codeStates['settotal_employees_group69415'] = settotal_employees_group69415Props,
        codeStates['leave_requests_group'] = leave_requests_groupb9aaf,
        codeStates['setleave_requests_group'] = setleave_requests_groupb9aaf,
        codeStates['leave_requests_groupb9aaf'] = leave_requests_groupb9aafProps,
        codeStates['setleave_requests_groupb9aaf'] = setleave_requests_groupb9aafProps,
        codeStates['onboarding_group'] = onboarding_group4ab1e,
        codeStates['setonboarding_group'] = setonboarding_group4ab1e,
        codeStates['onboarding_group4ab1e'] = onboarding_group4ab1eProps,
        codeStates['setonboarding_group4ab1e'] = setonboarding_group4ab1eProps,
        codeStates['divider'] = dividerd3a93,
        codeStates['setdivider'] = setdividerd3a93,
        codeStates['rej_icon'] = rej_icon0c7ca,
        codeStates['setrej_icon'] = setrej_icon0c7ca,
        codeStates['reject_text'] = reject_text7fb06,
        codeStates['setreject_text'] = setreject_text7fb06,
        codeStates['rejected_requests'] = rejected_requestsf6330,
        codeStates['setrejected_requests'] = setrejected_requestsf6330,
        codeStates['board_des_text'] = board_des_text1e55c,
        codeStates['setboard_des_text'] = setboard_des_text1e55c,
        codeStates['chart_group'] = chart_groupdd9ff,
        codeStates['setchart_group'] = setchart_groupdd9ff,
        codeStates['chart_groupdd9ff'] = chart_groupdd9ffProps,
        codeStates['setchart_groupdd9ff'] = setchart_groupdd9ffProps,
        codeStates['leave_group'] = leave_group1d83d,
        codeStates['setleave_group'] = setleave_group1d83d,
        codeStates['leave_group1d83d'] = leave_group1d83dProps,
        codeStates['setleave_group1d83d'] = setleave_group1d83dProps,
        codeStates['leave_req_table'] = leave_req_table1dfa0,
        codeStates['setleave_req_table'] = setleave_req_table1dfa0,
        codeStates['leave_req_table1dfa0'] = leave_req_table1dfa0Props,
        codeStates['setleave_req_table1dfa0'] = setleave_req_table1dfa0Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const onboarding_group4ab1eRef = useRef<any>(null);
  const handleClearSearch = () => {
    onboarding_group4ab1eRef.current?.setSearchParams();
    onboarding_group4ab1eRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(onboarding_group4ab1e) && Object.keys(onboarding_group4ab1e)?.length>0)
      {
        setonboarding_group4ab1e({})
      }
    }else 
      prevRefreshRef.current= true
  }, [onboarding_group4ab1eProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '17 / 25',
        gridRow: '2 / 27',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 !rounded-md ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setindividualleavemanagement_v1((pre:any)=>({...pre,_selectedGroup_:"onboarding_group"}))
        }}
    >
        {allowedControls.includes("divider") ?<Dividerdivider   /* d3a93 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("rej_icon")?<Iconrej_icon /* 0c7ca */ encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
          {allowedControls.includes("reject_text") ?<Textreject_text   /* 7fb06 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("rejected_requests") ?<Textrejected_requests   /* f6330 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("board_des_text") ?<Textboard_des_text   /* 1e55c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouponboarding_group
