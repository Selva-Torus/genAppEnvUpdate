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
import Textadd_inf  from "./Textadd_inf";
import TextAreaadd_dts  from "./TextAreaadd_dts";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupaddt__dts_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "add_inf",
      "add_dts"
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
      "add_inf",
      "add_dts"
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
      "add_inf",
      "add_dts"
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
      "add_inf",
      "add_dts"
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
      "add_inf",
      "add_dts"
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
      "add_inf",
      "add_dts"
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
      "add_inf",
      "add_dts"
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
      "add_inf",
      "add_dts"
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
  const {addt__group6ba4f, setaddt__group6ba4f}= useContext(TotalContext) as TotalContextProps;
  const {addt__group6ba4fProps, setaddt__group6ba4fProps}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group613d2, setaddt__dts_group613d2}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group613d2Props, setaddt__dts_group613d2Props}= useContext(TotalContext) as TotalContextProps;
  const {add_inff39c2, setadd_inff39c2}= useContext(TotalContext) as TotalContextProps;
  const {add_dtsd1841, setadd_dtsd1841}= useContext(TotalContext) as TotalContextProps;
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
    'GroupAddt_dtsGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "30d7e3a64a05413982b262d6e6e613d2");
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
    setaddt__dts_group613d2Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("add_inf")){
        setadd_inff39c2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(add_inff39c2?.isDisabled==null)
      {
        setadd_inff39c2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("add_dts")){
        setadd_dtsd1841((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(add_dtsd1841?.isDisabled==null)
      {
        setadd_dtsd1841((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['addt__group'] = addt__group6ba4f,
        codeStates['setaddt__group'] = setaddt__group6ba4f,
        codeStates['addt__group6ba4f'] = addt__group6ba4fProps,
        codeStates['setaddt__group6ba4f'] = setaddt__group6ba4fProps,
        codeStates['addt__dts_group'] = addt__dts_group613d2,
        codeStates['setaddt__dts_group'] = setaddt__dts_group613d2,
        codeStates['addt__dts_group613d2'] = addt__dts_group613d2Props,
        codeStates['setaddt__dts_group613d2'] = setaddt__dts_group613d2Props,
        codeStates['add_inf'] = add_inff39c2,
        codeStates['setadd_inf'] = setadd_inff39c2,
        codeStates['add_dts'] = add_dtsd1841,
        codeStates['setadd_dts'] = setadd_dtsd1841,
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
        codeStates['addt__group'] = addt__group6ba4f,
        codeStates['setaddt__group'] = setaddt__group6ba4f,
        codeStates['addt__group6ba4f'] = addt__group6ba4fProps,
        codeStates['setaddt__group6ba4f'] = setaddt__group6ba4fProps,
        codeStates['addt__dts_group'] = addt__dts_group613d2,
        codeStates['setaddt__dts_group'] = setaddt__dts_group613d2,
        codeStates['addt__dts_group613d2'] = addt__dts_group613d2Props,
        codeStates['setaddt__dts_group613d2'] = setaddt__dts_group613d2Props,
        codeStates['add_inf'] = add_inff39c2,
        codeStates['setadd_inf'] = setadd_inff39c2,
        codeStates['add_dts'] = add_dtsd1841,
        codeStates['setadd_dts'] = setadd_dtsd1841,
        codeStates['dynamicactions'] = dynamicactionsb315b,
        codeStates['setdynamicactions'] = setdynamicactionsb315b,
        codeStates['dynamicactionsb315b'] = dynamicactionsb315bProps,
        codeStates['setdynamicactionsb315b'] = setdynamicactionsb315bProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const addt__dts_group613d2Ref = useRef<any>(null);
  const handleClearSearch = () => {
    addt__dts_group613d2Ref.current?.setSearchParams();
    addt__dts_group613d2Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(addt__dts_group613d2) && Object.keys(addt__dts_group613d2)?.length>0)
      {
        setaddt__dts_group613d2({})
      }
    }else 
      prevRefreshRef.current= true
  }, [addt__dts_group613d2Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '13 / 25',
        gridRow: '37 / 63',
      
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
          setviewperformancereview_v1((pre:any)=>({...pre,_selectedGroup_:"addt__dts_group"}))
        }}
    >
          {allowedControls.includes("add_inf") ?<Textadd_inf   /* f39c2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("add_dts") ?<TextAreaadd_dts   /* d1841 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupaddt__dts_group
