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
import Textbasic_inf  from "./Textbasic_inf";
import Dropdownfull_name  from "./Dropdownfull_name";
import Dropdowncycle_name  from "./Dropdowncycle_name";
import TextInputreview_number  from "./TextInputreview_number";
import Dropdownreview_type  from "./Dropdownreview_type";
import Dropdownreview_status  from "./Dropdownreview_status";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupaccess_req__group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "basic_inf",
      "full_name",
      "cycle_name",
      "review_number",
      "review_type",
      "review_status"
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
      "basic_inf",
      "full_name",
      "cycle_name",
      "review_number",
      "review_type",
      "review_status"
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
      "basic_inf",
      "full_name",
      "cycle_name",
      "review_number",
      "review_type",
      "review_status"
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
      "basic_inf",
      "full_name",
      "cycle_name",
      "review_number",
      "review_type",
      "review_status"
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
      "basic_inf",
      "full_name",
      "cycle_name",
      "review_number",
      "review_type",
      "review_status"
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
      "basic_inf",
      "full_name",
      "cycle_name",
      "review_number",
      "review_type",
      "review_status"
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
      "basic_inf",
      "full_name",
      "cycle_name",
      "review_number",
      "review_type",
      "review_status"
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
      "basic_inf",
      "full_name",
      "cycle_name",
      "review_number",
      "review_type",
      "review_status"
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
  const {basic_inf14612, setbasic_inf14612}= useContext(TotalContext) as TotalContextProps;
  const {full_name13305, setfull_name13305}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name855a5, setcycle_name855a5}= useContext(TotalContext) as TotalContextProps;
  const {review_number19333, setreview_number19333}= useContext(TotalContext) as TotalContextProps;
  const {review_type718e4, setreview_type718e4}= useContext(TotalContext) as TotalContextProps;
  const {review_status4ba57, setreview_status4ba57}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupb4569, setvalid_groupb4569}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupb4569Props, setvalid_groupb4569Props}= useContext(TotalContext) as TotalContextProps;
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
    'GroupAccessReq_group',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7d9852de618fc302835e21622dfdb1de");
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
    setaccess_req__groupdb1deProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("basic_inf")){
        setbasic_inf14612((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(basic_inf14612?.isDisabled==null)
      {
        setbasic_inf14612((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_name13305((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_name13305?.isDisabled==null)
      {
        setfull_name13305((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_name")){
        setcycle_name855a5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_name855a5?.isDisabled==null)
      {
        setcycle_name855a5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_number")){
        setreview_number19333((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_number19333?.isDisabled==null)
      {
        setreview_number19333((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_type")){
        setreview_type718e4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_type718e4?.isDisabled==null)
      {
        setreview_type718e4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_status")){
        setreview_status4ba57((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_status4ba57?.isDisabled==null)
      {
        setreview_status4ba57((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['basic_inf'] = basic_inf14612,
        codeStates['setbasic_inf'] = setbasic_inf14612,
        codeStates['full_name'] = full_name13305,
        codeStates['setfull_name'] = setfull_name13305,
        codeStates['cycle_name'] = cycle_name855a5,
        codeStates['setcycle_name'] = setcycle_name855a5,
        codeStates['review_number'] = review_number19333,
        codeStates['setreview_number'] = setreview_number19333,
        codeStates['review_type'] = review_type718e4,
        codeStates['setreview_type'] = setreview_type718e4,
        codeStates['review_status'] = review_status4ba57,
        codeStates['setreview_status'] = setreview_status4ba57,
        codeStates['valid_group'] = valid_groupb4569,
        codeStates['setvalid_group'] = setvalid_groupb4569,
        codeStates['valid_groupb4569'] = valid_groupb4569Props,
        codeStates['setvalid_groupb4569'] = setvalid_groupb4569Props,
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
        codeStates['basic_inf'] = basic_inf14612,
        codeStates['setbasic_inf'] = setbasic_inf14612,
        codeStates['full_name'] = full_name13305,
        codeStates['setfull_name'] = setfull_name13305,
        codeStates['cycle_name'] = cycle_name855a5,
        codeStates['setcycle_name'] = setcycle_name855a5,
        codeStates['review_number'] = review_number19333,
        codeStates['setreview_number'] = setreview_number19333,
        codeStates['review_type'] = review_type718e4,
        codeStates['setreview_type'] = setreview_type718e4,
        codeStates['review_status'] = review_status4ba57,
        codeStates['setreview_status'] = setreview_status4ba57,
        codeStates['valid_group'] = valid_groupb4569,
        codeStates['setvalid_group'] = setvalid_groupb4569,
        codeStates['valid_groupb4569'] = valid_groupb4569Props,
        codeStates['setvalid_groupb4569'] = setvalid_groupb4569Props,
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


  const access_req__groupdb1deRef = useRef<any>(null);
  const handleClearSearch = () => {
    access_req__groupdb1deRef.current?.setSearchParams();
    access_req__groupdb1deRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(access_req__groupdb1de) && Object.keys(access_req__groupdb1de)?.length>0)
      {
        setaccess_req__groupdb1de({})
      }
    }else 
      prevRefreshRef.current= true
  }, [access_req__groupdb1deProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 16',
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
          setnewperformancereview_v1((pre:any)=>({...pre,_selectedGroup_:"access_req__group"}))
        }}
    >
          {allowedControls.includes("basic_inf") ?<Textbasic_inf   /* 14612 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("full_name") ?<Dropdownfull_name   /* 13305 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("cycle_name") ?<Dropdowncycle_name   /* 855a5 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("review_number") ?<TextInputreview_number   /* 19333 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("review_type") ?<Dropdownreview_type   /* 718e4 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("review_status") ?<Dropdownreview_status   /* 4ba57 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupaccess_req__group
