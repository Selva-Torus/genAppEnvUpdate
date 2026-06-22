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
import Textsoftware_license_icon  from "./Textsoftware_license_icon";
import Textsoftware_license_text  from "./Textsoftware_license_text";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupicon_text_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetsoftwarelicenses_v1Props, setdfd_assetsoftwarelicenses_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "software_license_icon",
      "software_license_text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_softwarelicenses_group",
      "icon_text_group",
      "software_licenses_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "software_license_icon",
      "software_license_text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_softwarelicenses_group",
      "icon_text_group",
      "software_licenses_table"
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
  const {overall_softwarelicenses_group04cba, setoverall_softwarelicenses_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_softwarelicenses_group04cbaProps, setoverall_softwarelicenses_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group44cf7, seticon_text_group44cf7}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group44cf7Props, seticon_text_group44cf7Props}= useContext(TotalContext) as TotalContextProps;
  const {software_license_iconfe876, setsoftware_license_iconfe876}= useContext(TotalContext) as TotalContextProps;
  const {software_license_text8a69d, setsoftware_license_text8a69d}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_table75a5d, setsoftware_licenses_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_table75a5dProps, setsoftware_licenses_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assetsoftwarelicenses_v1, setassetsoftwarelicenses_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1',
    [user],
    'GroupIconTextGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "45bd9870dcf645c49d8e218b2f544cf7");
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
    seticon_text_group44cf7Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("software_license_icon")){
        setsoftware_license_iconfe876({...software_license_iconfe876,isDisabled:true});

    }else
    {
      if(software_license_iconfe876?.isDisabled==null)
      {
        setsoftware_license_iconfe876({...software_license_iconfe876,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("software_license_text")){
        setsoftware_license_text8a69d({...software_license_text8a69d,isDisabled:true});

    }else
    {
      if(software_license_text8a69d?.isDisabled==null)
      {
        setsoftware_license_text8a69d({...software_license_text8a69d,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_softwarelicenses_group'] = overall_softwarelicenses_group04cba,
        codeStates['setoverall_softwarelicenses_group'] = setoverall_softwarelicenses_group04cba,
        codeStates['overall_softwarelicenses_group04cba'] = overall_softwarelicenses_group04cbaProps,
        codeStates['setoverall_softwarelicenses_group04cba'] = setoverall_softwarelicenses_group04cbaProps,
        codeStates['icon_text_group'] = icon_text_group44cf7,
        codeStates['seticon_text_group'] = seticon_text_group44cf7,
        codeStates['icon_text_group44cf7'] = icon_text_group44cf7Props,
        codeStates['seticon_text_group44cf7'] = seticon_text_group44cf7Props,
        codeStates['software_license_icon'] = software_license_iconfe876,
        codeStates['setsoftware_license_icon'] = setsoftware_license_iconfe876,
        codeStates['software_license_text'] = software_license_text8a69d,
        codeStates['setsoftware_license_text'] = setsoftware_license_text8a69d,
        codeStates['software_licenses_table'] = software_licenses_table75a5d,
        codeStates['setsoftware_licenses_table'] = setsoftware_licenses_table75a5d,
        codeStates['software_licenses_table75a5d'] = software_licenses_table75a5dProps,
        codeStates['setsoftware_licenses_table75a5d'] = setsoftware_licenses_table75a5dProps,

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
        codeStates['overall_softwarelicenses_group'] = overall_softwarelicenses_group04cba,
        codeStates['setoverall_softwarelicenses_group'] = setoverall_softwarelicenses_group04cba,
        codeStates['overall_softwarelicenses_group04cba'] = overall_softwarelicenses_group04cbaProps,
        codeStates['setoverall_softwarelicenses_group04cba'] = setoverall_softwarelicenses_group04cbaProps,
        codeStates['icon_text_group'] = icon_text_group44cf7,
        codeStates['seticon_text_group'] = seticon_text_group44cf7,
        codeStates['icon_text_group44cf7'] = icon_text_group44cf7Props,
        codeStates['seticon_text_group44cf7'] = seticon_text_group44cf7Props,
        codeStates['software_license_icon'] = software_license_iconfe876,
        codeStates['setsoftware_license_icon'] = setsoftware_license_iconfe876,
        codeStates['software_license_text'] = software_license_text8a69d,
        codeStates['setsoftware_license_text'] = setsoftware_license_text8a69d,
        codeStates['software_licenses_table'] = software_licenses_table75a5d,
        codeStates['setsoftware_licenses_table'] = setsoftware_licenses_table75a5d,
        codeStates['software_licenses_table75a5d'] = software_licenses_table75a5dProps,
        codeStates['setsoftware_licenses_table75a5d'] = setsoftware_licenses_table75a5dProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const icon_text_group44cf7Ref = useRef<any>(null);
  const handleClearSearch = () => {
    icon_text_group44cf7Ref.current?.setSearchParams();
    icon_text_group44cf7Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(icon_text_group44cf7) && Object.keys(icon_text_group44cf7)?.length>0)
      {
        seticon_text_group44cf7({})
      }
    }else 
      prevRefreshRef.current= true
  }, [icon_text_group44cf7Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 6',
        gridRow: '1 / 9',
      
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
       onClick={()=>handleOnClick({}, 0)}
    >
          {allowedControls.includes("software_license_icon") ?<Textsoftware_license_icon   /* fe876 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("software_license_text") ?<Textsoftware_license_text   /* 8a69d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupicon_text_group
