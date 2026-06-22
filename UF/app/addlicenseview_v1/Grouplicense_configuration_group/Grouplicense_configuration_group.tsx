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
import Textlicense_configuration  from "./Textlicense_configuration";
import TextInputseats_total  from "./TextInputseats_total";
import TextInputseats_used  from "./TextInputseats_used";
import TextInputauto_renewal  from "./TextInputauto_renewal";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouplicense_configuration_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "license_configuration",
      "seats_total",
      "seats_used",
      "auto_renewal"
    ],
    "allowedGroups": [
      "canvas",
      "add_license_group",
      "license_information_group",
      "license_configuration_group",
      "validity_financial_details_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "license_configuration",
      "seats_total",
      "seats_used",
      "auto_renewal"
    ],
    "allowedGroups": [
      "canvas",
      "add_license_group",
      "license_information_group",
      "license_configuration_group",
      "validity_financial_details_group"
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
  const {add_license_group1bee6, setadd_license_group1bee6}= useContext(TotalContext) as TotalContextProps;
  const {add_license_group1bee6Props, setadd_license_group1bee6Props}= useContext(TotalContext) as TotalContextProps;
  const {license_information_group4e03c, setlicense_information_group4e03c}= useContext(TotalContext) as TotalContextProps;
  const {license_information_group4e03cProps, setlicense_information_group4e03cProps}= useContext(TotalContext) as TotalContextProps;
  const {license_configuration_groupa329d, setlicense_configuration_groupa329d}= useContext(TotalContext) as TotalContextProps;
  const {license_configuration_groupa329dProps, setlicense_configuration_groupa329dProps}= useContext(TotalContext) as TotalContextProps;
  const {license_configurationf7ede, setlicense_configurationf7ede}= useContext(TotalContext) as TotalContextProps;
  const {seats_total8b54b, setseats_total8b54b}= useContext(TotalContext) as TotalContextProps;
  const {seats_used3bba9, setseats_used3bba9}= useContext(TotalContext) as TotalContextProps;
  const {auto_renewal3bee1, setauto_renewal3bee1}= useContext(TotalContext) as TotalContextProps;
  const {validity_financial_details_groupb8a9f, setvalidity_financial_details_groupb8a9f}= useContext(TotalContext) as TotalContextProps;
  const {validity_financial_details_groupb8a9fProps, setvalidity_financial_details_groupb8a9fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addlicenseview_v1, setaddlicenseview_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:addLicenseView:AFVK:v1',
    [user],
    'GroupLicenseConfigurationGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8705ff89e003dcf5ffb5c6c5dc7a329d");
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
    setlicense_configuration_groupa329dProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("license_configuration")){
        setlicense_configurationf7ede({...license_configurationf7ede,isDisabled:true});

    }else
    {
      if(license_configurationf7ede?.isDisabled==null)
      {
        setlicense_configurationf7ede({...license_configurationf7ede,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("seats_total")){
        setseats_total8b54b({...seats_total8b54b,isDisabled:true});

    }else
    {
      if(seats_total8b54b?.isDisabled==null)
      {
        setseats_total8b54b({...seats_total8b54b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("seats_used")){
        setseats_used3bba9({...seats_used3bba9,isDisabled:true});

    }else
    {
      if(seats_used3bba9?.isDisabled==null)
      {
        setseats_used3bba9({...seats_used3bba9,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("auto_renewal")){
        setauto_renewal3bee1({...auto_renewal3bee1,isDisabled:true});

    }else
    {
      if(auto_renewal3bee1?.isDisabled==null)
      {
        setauto_renewal3bee1({...auto_renewal3bee1,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_license_group'] = add_license_group1bee6,
        codeStates['setadd_license_group'] = setadd_license_group1bee6,
        codeStates['add_license_group1bee6'] = add_license_group1bee6Props,
        codeStates['setadd_license_group1bee6'] = setadd_license_group1bee6Props,
        codeStates['license_information_group'] = license_information_group4e03c,
        codeStates['setlicense_information_group'] = setlicense_information_group4e03c,
        codeStates['license_information_group4e03c'] = license_information_group4e03cProps,
        codeStates['setlicense_information_group4e03c'] = setlicense_information_group4e03cProps,
        codeStates['license_configuration_group'] = license_configuration_groupa329d,
        codeStates['setlicense_configuration_group'] = setlicense_configuration_groupa329d,
        codeStates['license_configuration_groupa329d'] = license_configuration_groupa329dProps,
        codeStates['setlicense_configuration_groupa329d'] = setlicense_configuration_groupa329dProps,
        codeStates['license_configuration'] = license_configurationf7ede,
        codeStates['setlicense_configuration'] = setlicense_configurationf7ede,
        codeStates['seats_total'] = seats_total8b54b,
        codeStates['setseats_total'] = setseats_total8b54b,
        codeStates['seats_used'] = seats_used3bba9,
        codeStates['setseats_used'] = setseats_used3bba9,
        codeStates['auto_renewal'] = auto_renewal3bee1,
        codeStates['setauto_renewal'] = setauto_renewal3bee1,
        codeStates['validity_financial_details_group'] = validity_financial_details_groupb8a9f,
        codeStates['setvalidity_financial_details_group'] = setvalidity_financial_details_groupb8a9f,
        codeStates['validity_financial_details_groupb8a9f'] = validity_financial_details_groupb8a9fProps,
        codeStates['setvalidity_financial_details_groupb8a9f'] = setvalidity_financial_details_groupb8a9fProps,

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
        codeStates['add_license_group'] = add_license_group1bee6,
        codeStates['setadd_license_group'] = setadd_license_group1bee6,
        codeStates['add_license_group1bee6'] = add_license_group1bee6Props,
        codeStates['setadd_license_group1bee6'] = setadd_license_group1bee6Props,
        codeStates['license_information_group'] = license_information_group4e03c,
        codeStates['setlicense_information_group'] = setlicense_information_group4e03c,
        codeStates['license_information_group4e03c'] = license_information_group4e03cProps,
        codeStates['setlicense_information_group4e03c'] = setlicense_information_group4e03cProps,
        codeStates['license_configuration_group'] = license_configuration_groupa329d,
        codeStates['setlicense_configuration_group'] = setlicense_configuration_groupa329d,
        codeStates['license_configuration_groupa329d'] = license_configuration_groupa329dProps,
        codeStates['setlicense_configuration_groupa329d'] = setlicense_configuration_groupa329dProps,
        codeStates['license_configuration'] = license_configurationf7ede,
        codeStates['setlicense_configuration'] = setlicense_configurationf7ede,
        codeStates['seats_total'] = seats_total8b54b,
        codeStates['setseats_total'] = setseats_total8b54b,
        codeStates['seats_used'] = seats_used3bba9,
        codeStates['setseats_used'] = setseats_used3bba9,
        codeStates['auto_renewal'] = auto_renewal3bee1,
        codeStates['setauto_renewal'] = setauto_renewal3bee1,
        codeStates['validity_financial_details_group'] = validity_financial_details_groupb8a9f,
        codeStates['setvalidity_financial_details_group'] = setvalidity_financial_details_groupb8a9f,
        codeStates['validity_financial_details_groupb8a9f'] = validity_financial_details_groupb8a9fProps,
        codeStates['setvalidity_financial_details_groupb8a9f'] = setvalidity_financial_details_groupb8a9fProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const license_configuration_groupa329dRef = useRef<any>(null);
  const handleClearSearch = () => {
    license_configuration_groupa329dRef.current?.setSearchParams();
    license_configuration_groupa329dRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(license_configuration_groupa329d) && Object.keys(license_configuration_groupa329d)?.length>0)
      {
        setlicense_configuration_groupa329d({})
      }
    }else 
      prevRefreshRef.current= true
  }, [license_configuration_groupa329dProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '37 / 59',
      
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
      className={`flex flex-col overflow-auto rounded-md p-1 !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
          {allowedControls.includes("license_configuration") ?<Textlicense_configuration   /* f7ede */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("seats_total") ?<TextInputseats_total   /* 8b54b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("seats_used") ?<TextInputseats_used   /* 3bba9 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("auto_renewal") ?<TextInputauto_renewal   /* 3bee1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouplicense_configuration_group
