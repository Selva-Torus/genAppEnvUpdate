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
import TextInputusername  from "./TextInputusername";
import Buttonapprove  from "./Buttonapprove";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_userdfd_v1Props, setdfd_userdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "emplyoee": {
    "allowedControls": [
      "username",
      "approve"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "user": {
    "allowedControls": [
      "username",
      "approve"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Template": {
    "allowedControls": [
      "username",
      "approve"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "table"
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
  const {group7fd3f, setgroup7fd3f}= useContext(TotalContext) as TotalContextProps;
  const {group7fd3fProps, setgroup7fd3fProps}= useContext(TotalContext) as TotalContextProps;
  const {username0985a, setusername0985a}= useContext(TotalContext) as TotalContextProps;
  const {approvec8dd3, setapprovec8dd3}= useContext(TotalContext) as TotalContextProps;
  const {tablecb5d6, settablecb5d6}= useContext(TotalContext) as TotalContextProps;
  const {tablecb5d6Props, settablecb5d6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {checker_v1, setchecker_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:checker:AFVK:v1',
    [user],
    'GroupGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "483ca5367a434fa98cc801f66507fd3f");
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
    setgroup7fd3fProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("username")){
        setusername0985a({...username0985a,isDisabled:true});

    }else
    {
      if(username0985a?.isDisabled==null)
      {
        setusername0985a({...username0985a,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approve")){
        setapprovec8dd3({...approvec8dd3,isDisabled:true});

    }else
    {
      if(approvec8dd3?.isDisabled==null)
      {
        setapprovec8dd3({...approvec8dd3,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group7fd3f,
        codeStates['setgroup'] = setgroup7fd3f,
        codeStates['group7fd3f'] = group7fd3fProps,
        codeStates['setgroup7fd3f'] = setgroup7fd3fProps,
        codeStates['username'] = username0985a,
        codeStates['setusername'] = setusername0985a,
        codeStates['approve'] = approvec8dd3,
        codeStates['setapprove'] = setapprovec8dd3,
        codeStates['table'] = tablecb5d6,
        codeStates['settable'] = settablecb5d6,
        codeStates['tablecb5d6'] = tablecb5d6Props,
        codeStates['settablecb5d6'] = settablecb5d6Props,

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
        codeStates['group'] = group7fd3f,
        codeStates['setgroup'] = setgroup7fd3f,
        codeStates['group7fd3f'] = group7fd3fProps,
        codeStates['setgroup7fd3f'] = setgroup7fd3fProps,
        codeStates['username'] = username0985a,
        codeStates['setusername'] = setusername0985a,
        codeStates['approve'] = approvec8dd3,
        codeStates['setapprove'] = setapprovec8dd3,
        codeStates['table'] = tablecb5d6,
        codeStates['settable'] = settablecb5d6,
        codeStates['tablecb5d6'] = tablecb5d6Props,
        codeStates['settablecb5d6'] = settablecb5d6Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group7fd3fRef = useRef<any>(null);
  const handleClearSearch = () => {
    group7fd3fRef.current?.setSearchParams();
    group7fd3fRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group7fd3f) && Object.keys(group7fd3f)?.length>0)
      {
        setgroup7fd3f({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group7fd3fProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '2 / 117',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
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
          setchecker_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
        {allowedControls.includes("username") ?<TextInputusername   /* 0985a */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "approve" in ButtonGoRuleData)?ButtonGoRuleData["approve"]:true) && 
          allowedControls.includes("approve")  ?            <Buttonapprove tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup
