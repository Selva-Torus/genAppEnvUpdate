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
import Textratings  from "./Textratings";
import Textself_rating  from "./Textself_rating";
import Progressself_rating_progress  from "./Progressself_rating_progress";
import Textmanager_rating  from "./Textmanager_rating";
import Progressmanager_rating_progress  from "./Progressmanager_rating_progress";
import Textfinal_rating  from "./Textfinal_rating";
import Progressfinal_rating_progress  from "./Progressfinal_rating_progress";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupvalid_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_addperformancereviewmodify_v1Props, setdfd_addperformancereviewmodify_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employeenamecombo_v1Props, setdfd_employeenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_cyclenamecombo_v1Props, setdfd_cyclenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_reviewtypecombo_v1Props, setdfd_reviewtypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_reviewstatuscombo_v1Props, setdfd_reviewstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "ratings",
      "self_rating",
      "self_rating_progress",
      "manager_rating",
      "manager_rating_progress",
      "final_rating",
      "final_rating_progress"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "addt__group",
      "addt__dts_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "ratings",
      "self_rating",
      "self_rating_progress",
      "manager_rating",
      "manager_rating_progress",
      "final_rating",
      "final_rating_progress"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "addt__group",
      "addt__dts_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "ratings",
      "self_rating",
      "self_rating_progress",
      "manager_rating",
      "manager_rating_progress",
      "final_rating",
      "final_rating_progress"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "addt__group",
      "addt__dts_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "ratings",
      "self_rating",
      "self_rating_progress",
      "manager_rating",
      "manager_rating_progress",
      "final_rating",
      "final_rating_progress"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "addt__group",
      "addt__dts_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "ratings",
      "self_rating",
      "self_rating_progress",
      "manager_rating",
      "manager_rating_progress",
      "final_rating",
      "final_rating_progress"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "addt__group",
      "addt__dts_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "ratings",
      "self_rating",
      "self_rating_progress",
      "manager_rating",
      "manager_rating_progress",
      "final_rating",
      "final_rating_progress"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "addt__group",
      "addt__dts_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "ratings",
      "self_rating",
      "self_rating_progress",
      "manager_rating",
      "manager_rating_progress",
      "final_rating",
      "final_rating_progress"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "addt__group",
      "addt__dts_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "ratings",
      "self_rating",
      "self_rating_progress",
      "manager_rating",
      "manager_rating_progress",
      "final_rating",
      "final_rating_progress"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "addt__group",
      "addt__dts_group",
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
  const {new_access_groupc5a99, setnew_access_groupc5a99}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc5a99Props, setnew_access_groupc5a99Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group002d0, setaccess_req__group002d0}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group002d0Props, setaccess_req__group002d0Props}= useContext(TotalContext) as TotalContextProps;
  const {valid_group3a8ab, setvalid_group3a8ab}= useContext(TotalContext) as TotalContextProps;
  const {valid_group3a8abProps, setvalid_group3a8abProps}= useContext(TotalContext) as TotalContextProps;
  const {ratingsa108f, setratingsa108f}= useContext(TotalContext) as TotalContextProps;
  const {self_ratingc8c53, setself_ratingc8c53}= useContext(TotalContext) as TotalContextProps;
  const {self_rating_progressd31b7, setself_rating_progressd31b7}= useContext(TotalContext) as TotalContextProps;
  const {manager_rating7a9e7, setmanager_rating7a9e7}= useContext(TotalContext) as TotalContextProps;
  const {manager_rating_progress0b73b, setmanager_rating_progress0b73b}= useContext(TotalContext) as TotalContextProps;
  const {final_ratingc093c, setfinal_ratingc093c}= useContext(TotalContext) as TotalContextProps;
  const {final_rating_progressfca5f, setfinal_rating_progressfca5f}= useContext(TotalContext) as TotalContextProps;
  const {addt__group6ba4f, setaddt__group6ba4f}= useContext(TotalContext) as TotalContextProps;
  const {addt__group6ba4fProps, setaddt__group6ba4fProps}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group613d2, setaddt__dts_group613d2}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group613d2Props, setaddt__dts_group613d2Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsb315b, setdynamicactionsb315b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsb315bProps, setdynamicactionsb315bProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewperformancereview_v1, setviewperformancereview_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewPerformanceReview:AFVK:v1',
    [user],
    'GroupValidGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e81d77a7d98781c111b9d4b0b613a8ab");
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
    setvalid_group3a8abProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ratings")){
        setratingsa108f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ratingsa108f?.isDisabled==null)
      {
        setratingsa108f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("self_rating")){
        setself_ratingc8c53((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(self_ratingc8c53?.isDisabled==null)
      {
        setself_ratingc8c53((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("self_rating_progress")){
        setself_rating_progressd31b7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(self_rating_progressd31b7?.isDisabled==null)
      {
        setself_rating_progressd31b7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("manager_rating")){
        setmanager_rating7a9e7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(manager_rating7a9e7?.isDisabled==null)
      {
        setmanager_rating7a9e7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("manager_rating_progress")){
        setmanager_rating_progress0b73b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(manager_rating_progress0b73b?.isDisabled==null)
      {
        setmanager_rating_progress0b73b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("final_rating")){
        setfinal_ratingc093c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(final_ratingc093c?.isDisabled==null)
      {
        setfinal_ratingc093c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("final_rating_progress")){
        setfinal_rating_progressfca5f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(final_rating_progressfca5f?.isDisabled==null)
      {
        setfinal_rating_progressfca5f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_groupc5a99,
        codeStates['setnew_access_group'] = setnew_access_groupc5a99,
        codeStates['new_access_groupc5a99'] = new_access_groupc5a99Props,
        codeStates['setnew_access_groupc5a99'] = setnew_access_groupc5a99Props,
        codeStates['access_req__group'] = access_req__group002d0,
        codeStates['setaccess_req__group'] = setaccess_req__group002d0,
        codeStates['access_req__group002d0'] = access_req__group002d0Props,
        codeStates['setaccess_req__group002d0'] = setaccess_req__group002d0Props,
        codeStates['valid_group'] = valid_group3a8ab,
        codeStates['setvalid_group'] = setvalid_group3a8ab,
        codeStates['valid_group3a8ab'] = valid_group3a8abProps,
        codeStates['setvalid_group3a8ab'] = setvalid_group3a8abProps,
        codeStates['ratings'] = ratingsa108f,
        codeStates['setratings'] = setratingsa108f,
        codeStates['self_rating'] = self_ratingc8c53,
        codeStates['setself_rating'] = setself_ratingc8c53,
        codeStates['self_rating_progress'] = self_rating_progressd31b7,
        codeStates['setself_rating_progress'] = setself_rating_progressd31b7,
        codeStates['manager_rating'] = manager_rating7a9e7,
        codeStates['setmanager_rating'] = setmanager_rating7a9e7,
        codeStates['manager_rating_progress'] = manager_rating_progress0b73b,
        codeStates['setmanager_rating_progress'] = setmanager_rating_progress0b73b,
        codeStates['final_rating'] = final_ratingc093c,
        codeStates['setfinal_rating'] = setfinal_ratingc093c,
        codeStates['final_rating_progress'] = final_rating_progressfca5f,
        codeStates['setfinal_rating_progress'] = setfinal_rating_progressfca5f,
        codeStates['addt__group'] = addt__group6ba4f,
        codeStates['setaddt__group'] = setaddt__group6ba4f,
        codeStates['addt__group6ba4f'] = addt__group6ba4fProps,
        codeStates['setaddt__group6ba4f'] = setaddt__group6ba4fProps,
        codeStates['addt__dts_group'] = addt__dts_group613d2,
        codeStates['setaddt__dts_group'] = setaddt__dts_group613d2,
        codeStates['addt__dts_group613d2'] = addt__dts_group613d2Props,
        codeStates['setaddt__dts_group613d2'] = setaddt__dts_group613d2Props,
        codeStates['dynamicactions'] = dynamicactionsb315b,
        codeStates['setdynamicactions'] = setdynamicactionsb315b,
        codeStates['dynamicactionsb315b'] = dynamicactionsb315bProps,
        codeStates['setdynamicactionsb315b'] = setdynamicactionsb315bProps,

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
        codeStates['new_access_group'] = new_access_groupc5a99,
        codeStates['setnew_access_group'] = setnew_access_groupc5a99,
        codeStates['new_access_groupc5a99'] = new_access_groupc5a99Props,
        codeStates['setnew_access_groupc5a99'] = setnew_access_groupc5a99Props,
        codeStates['access_req__group'] = access_req__group002d0,
        codeStates['setaccess_req__group'] = setaccess_req__group002d0,
        codeStates['access_req__group002d0'] = access_req__group002d0Props,
        codeStates['setaccess_req__group002d0'] = setaccess_req__group002d0Props,
        codeStates['valid_group'] = valid_group3a8ab,
        codeStates['setvalid_group'] = setvalid_group3a8ab,
        codeStates['valid_group3a8ab'] = valid_group3a8abProps,
        codeStates['setvalid_group3a8ab'] = setvalid_group3a8abProps,
        codeStates['ratings'] = ratingsa108f,
        codeStates['setratings'] = setratingsa108f,
        codeStates['self_rating'] = self_ratingc8c53,
        codeStates['setself_rating'] = setself_ratingc8c53,
        codeStates['self_rating_progress'] = self_rating_progressd31b7,
        codeStates['setself_rating_progress'] = setself_rating_progressd31b7,
        codeStates['manager_rating'] = manager_rating7a9e7,
        codeStates['setmanager_rating'] = setmanager_rating7a9e7,
        codeStates['manager_rating_progress'] = manager_rating_progress0b73b,
        codeStates['setmanager_rating_progress'] = setmanager_rating_progress0b73b,
        codeStates['final_rating'] = final_ratingc093c,
        codeStates['setfinal_rating'] = setfinal_ratingc093c,
        codeStates['final_rating_progress'] = final_rating_progressfca5f,
        codeStates['setfinal_rating_progress'] = setfinal_rating_progressfca5f,
        codeStates['addt__group'] = addt__group6ba4f,
        codeStates['setaddt__group'] = setaddt__group6ba4f,
        codeStates['addt__group6ba4f'] = addt__group6ba4fProps,
        codeStates['setaddt__group6ba4f'] = setaddt__group6ba4fProps,
        codeStates['addt__dts_group'] = addt__dts_group613d2,
        codeStates['setaddt__dts_group'] = setaddt__dts_group613d2,
        codeStates['addt__dts_group613d2'] = addt__dts_group613d2Props,
        codeStates['setaddt__dts_group613d2'] = setaddt__dts_group613d2Props,
        codeStates['dynamicactions'] = dynamicactionsb315b,
        codeStates['setdynamicactions'] = setdynamicactionsb315b,
        codeStates['dynamicactionsb315b'] = dynamicactionsb315bProps,
        codeStates['setdynamicactionsb315b'] = setdynamicactionsb315bProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const valid_group3a8abRef = useRef<any>(null);
  const handleClearSearch = () => {
    valid_group3a8abRef.current?.setSearchParams();
    valid_group3a8abRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(valid_group3a8ab) && Object.keys(valid_group3a8ab)?.length>0)
      {
        setvalid_group3a8ab({})
      }
    }else 
      prevRefreshRef.current= true
  }, [valid_group3a8abProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '16 / 25',
        gridRow: '1 / 35',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#f5f7fb',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setviewperformancereview_v1((pre:any)=>({...pre,_selectedGroup_:"valid_group"}))
        }}
    >
          {allowedControls.includes("ratings") ?<Textratings   /* a108f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("self_rating") ?<Textself_rating   /* c8c53 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("self_rating_progress")?<Progressself_rating_progress  /* d31b7 */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("manager_rating") ?<Textmanager_rating   /* 7a9e7 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("manager_rating_progress")?<Progressmanager_rating_progress  /* 0b73b */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("final_rating") ?<Textfinal_rating   /* c093c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("final_rating_progress")?<Progressfinal_rating_progress  /* fca5f */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupvalid_group
