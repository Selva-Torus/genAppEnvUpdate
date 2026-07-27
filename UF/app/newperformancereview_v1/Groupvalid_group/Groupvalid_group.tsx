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
  const {dfd_reviewstatuscombo_v1Props, setdfd_reviewstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_reviewtypecombo_v1Props, setdfd_reviewtypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  const {new_access_groupfa034, setnew_access_groupfa034}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupfa034Props, setnew_access_groupfa034Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupdb1de, setaccess_req__groupdb1de}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupdb1deProps, setaccess_req__groupdb1deProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupb4569, setvalid_groupb4569}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupb4569Props, setvalid_groupb4569Props}= useContext(TotalContext) as TotalContextProps;
  const {ratingsd4b55, setratingsd4b55}= useContext(TotalContext) as TotalContextProps;
  const {self_rating6206d, setself_rating6206d}= useContext(TotalContext) as TotalContextProps;
  const {self_rating_progressa5470, setself_rating_progressa5470}= useContext(TotalContext) as TotalContextProps;
  const {manager_rating43456, setmanager_rating43456}= useContext(TotalContext) as TotalContextProps;
  const {manager_rating_progressa49aa, setmanager_rating_progressa49aa}= useContext(TotalContext) as TotalContextProps;
  const {final_ratingf159a, setfinal_ratingf159a}= useContext(TotalContext) as TotalContextProps;
  const {final_rating_progress70ee3, setfinal_rating_progress70ee3}= useContext(TotalContext) as TotalContextProps;
  const {addt__group82d26, setaddt__group82d26}= useContext(TotalContext) as TotalContextProps;
  const {addt__group82d26Props, setaddt__group82d26Props}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group7fd81, setaddt__dts_group7fd81}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group7fd81Props, setaddt__dts_group7fd81Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions31354, setdynamicactions31354}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions31354Props, setdynamicactions31354Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {newperformancereview_v1, setnewperformancereview_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newPerformanceReview:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c530a54cd8b0854580e4ae72117b4569");
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
    setvalid_groupb4569Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ratings")){
        setratingsd4b55((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ratingsd4b55?.isDisabled==null)
      {
        setratingsd4b55((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("self_rating")){
        setself_rating6206d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(self_rating6206d?.isDisabled==null)
      {
        setself_rating6206d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("self_rating_progress")){
        setself_rating_progressa5470((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(self_rating_progressa5470?.isDisabled==null)
      {
        setself_rating_progressa5470((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("manager_rating")){
        setmanager_rating43456((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(manager_rating43456?.isDisabled==null)
      {
        setmanager_rating43456((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("manager_rating_progress")){
        setmanager_rating_progressa49aa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(manager_rating_progressa49aa?.isDisabled==null)
      {
        setmanager_rating_progressa49aa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("final_rating")){
        setfinal_ratingf159a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(final_ratingf159a?.isDisabled==null)
      {
        setfinal_ratingf159a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("final_rating_progress")){
        setfinal_rating_progress70ee3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(final_rating_progress70ee3?.isDisabled==null)
      {
        setfinal_rating_progress70ee3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_groupfa034,
        codeStates['setnew_access_group'] = setnew_access_groupfa034,
        codeStates['new_access_groupfa034'] = new_access_groupfa034Props,
        codeStates['setnew_access_groupfa034'] = setnew_access_groupfa034Props,
        codeStates['access_req__group'] = access_req__groupdb1de,
        codeStates['setaccess_req__group'] = setaccess_req__groupdb1de,
        codeStates['access_req__groupdb1de'] = access_req__groupdb1deProps,
        codeStates['setaccess_req__groupdb1de'] = setaccess_req__groupdb1deProps,
        codeStates['valid_group'] = valid_groupb4569,
        codeStates['setvalid_group'] = setvalid_groupb4569,
        codeStates['valid_groupb4569'] = valid_groupb4569Props,
        codeStates['setvalid_groupb4569'] = setvalid_groupb4569Props,
        codeStates['ratings'] = ratingsd4b55,
        codeStates['setratings'] = setratingsd4b55,
        codeStates['self_rating'] = self_rating6206d,
        codeStates['setself_rating'] = setself_rating6206d,
        codeStates['self_rating_progress'] = self_rating_progressa5470,
        codeStates['setself_rating_progress'] = setself_rating_progressa5470,
        codeStates['manager_rating'] = manager_rating43456,
        codeStates['setmanager_rating'] = setmanager_rating43456,
        codeStates['manager_rating_progress'] = manager_rating_progressa49aa,
        codeStates['setmanager_rating_progress'] = setmanager_rating_progressa49aa,
        codeStates['final_rating'] = final_ratingf159a,
        codeStates['setfinal_rating'] = setfinal_ratingf159a,
        codeStates['final_rating_progress'] = final_rating_progress70ee3,
        codeStates['setfinal_rating_progress'] = setfinal_rating_progress70ee3,
        codeStates['addt__group'] = addt__group82d26,
        codeStates['setaddt__group'] = setaddt__group82d26,
        codeStates['addt__group82d26'] = addt__group82d26Props,
        codeStates['setaddt__group82d26'] = setaddt__group82d26Props,
        codeStates['addt__dts_group'] = addt__dts_group7fd81,
        codeStates['setaddt__dts_group'] = setaddt__dts_group7fd81,
        codeStates['addt__dts_group7fd81'] = addt__dts_group7fd81Props,
        codeStates['setaddt__dts_group7fd81'] = setaddt__dts_group7fd81Props,
        codeStates['dynamicactions'] = dynamicactions31354,
        codeStates['setdynamicactions'] = setdynamicactions31354,
        codeStates['dynamicactions31354'] = dynamicactions31354Props,
        codeStates['setdynamicactions31354'] = setdynamicactions31354Props,

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
        codeStates['new_access_group'] = new_access_groupfa034,
        codeStates['setnew_access_group'] = setnew_access_groupfa034,
        codeStates['new_access_groupfa034'] = new_access_groupfa034Props,
        codeStates['setnew_access_groupfa034'] = setnew_access_groupfa034Props,
        codeStates['access_req__group'] = access_req__groupdb1de,
        codeStates['setaccess_req__group'] = setaccess_req__groupdb1de,
        codeStates['access_req__groupdb1de'] = access_req__groupdb1deProps,
        codeStates['setaccess_req__groupdb1de'] = setaccess_req__groupdb1deProps,
        codeStates['valid_group'] = valid_groupb4569,
        codeStates['setvalid_group'] = setvalid_groupb4569,
        codeStates['valid_groupb4569'] = valid_groupb4569Props,
        codeStates['setvalid_groupb4569'] = setvalid_groupb4569Props,
        codeStates['ratings'] = ratingsd4b55,
        codeStates['setratings'] = setratingsd4b55,
        codeStates['self_rating'] = self_rating6206d,
        codeStates['setself_rating'] = setself_rating6206d,
        codeStates['self_rating_progress'] = self_rating_progressa5470,
        codeStates['setself_rating_progress'] = setself_rating_progressa5470,
        codeStates['manager_rating'] = manager_rating43456,
        codeStates['setmanager_rating'] = setmanager_rating43456,
        codeStates['manager_rating_progress'] = manager_rating_progressa49aa,
        codeStates['setmanager_rating_progress'] = setmanager_rating_progressa49aa,
        codeStates['final_rating'] = final_ratingf159a,
        codeStates['setfinal_rating'] = setfinal_ratingf159a,
        codeStates['final_rating_progress'] = final_rating_progress70ee3,
        codeStates['setfinal_rating_progress'] = setfinal_rating_progress70ee3,
        codeStates['addt__group'] = addt__group82d26,
        codeStates['setaddt__group'] = setaddt__group82d26,
        codeStates['addt__group82d26'] = addt__group82d26Props,
        codeStates['setaddt__group82d26'] = setaddt__group82d26Props,
        codeStates['addt__dts_group'] = addt__dts_group7fd81,
        codeStates['setaddt__dts_group'] = setaddt__dts_group7fd81,
        codeStates['addt__dts_group7fd81'] = addt__dts_group7fd81Props,
        codeStates['setaddt__dts_group7fd81'] = setaddt__dts_group7fd81Props,
        codeStates['dynamicactions'] = dynamicactions31354,
        codeStates['setdynamicactions'] = setdynamicactions31354,
        codeStates['dynamicactions31354'] = dynamicactions31354Props,
        codeStates['setdynamicactions31354'] = setdynamicactions31354Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const valid_groupb4569Ref = useRef<any>(null);
  const handleClearSearch = () => {
    valid_groupb4569Ref.current?.setSearchParams();
    valid_groupb4569Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(valid_groupb4569) && Object.keys(valid_groupb4569)?.length>0)
      {
        setvalid_groupb4569({})
      }
    }else 
      prevRefreshRef.current= true
  }, [valid_groupb4569Props?.refresh,token])


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
          setnewperformancereview_v1((pre:any)=>({...pre,_selectedGroup_:"valid_group"}))
        }}
    >
          {allowedControls.includes("ratings") ?<Textratings   /* d4b55 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("self_rating") ?<Textself_rating   /* 6206d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("self_rating_progress")?<Progressself_rating_progress  /* a5470 */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("manager_rating") ?<Textmanager_rating   /* 43456 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("manager_rating_progress")?<Progressmanager_rating_progress  /* a49aa */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("final_rating") ?<Textfinal_rating   /* f159a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("final_rating_progress")?<Progressfinal_rating_progress  /* 70ee3 */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupvalid_group
