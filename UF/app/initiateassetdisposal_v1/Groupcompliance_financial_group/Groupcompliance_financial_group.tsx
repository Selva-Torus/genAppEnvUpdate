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
import Textcompliance_financial  from "./Textcompliance_financial";
import TextInputapproval_reference  from "./TextInputapproval_reference";
import TextInputwitness_name  from "./TextInputwitness_name";
import Dropdowndata_wipe_method  from "./Dropdowndata_wipe_method";
import Switchdata_wiped  from "./Switchdata_wiped";
import TextInputdisposal_value  from "./TextInputdisposal_value";
import TextInputdisposal_cost  from "./TextInputdisposal_cost";
import TextInputresale_amount  from "./TextInputresale_amount";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcompliance_financial_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetnamecombo_v1Props, setdfd_assetnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_vendornamecombo_v1Props, setdfd_vendornamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetdisposal_v1Props, setdfd_assetdisposal_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "compliance_financial",
      "approval_reference",
      "witness_name",
      "data_wipe_method",
      "data_wiped",
      "disposal_value",
      "disposal_cost",
      "resale_amount"
    ],
    "allowedGroups": [
      "canvas",
      "initiate_asset_disposal_group",
      "disposal_details_group",
      "compliance_financial_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "compliance_financial",
      "approval_reference",
      "witness_name",
      "data_wipe_method",
      "data_wiped",
      "disposal_value",
      "disposal_cost",
      "resale_amount"
    ],
    "allowedGroups": [
      "canvas",
      "initiate_asset_disposal_group",
      "disposal_details_group",
      "compliance_financial_group",
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
  const {initiate_asset_disposal_groupdb5a7, setinitiate_asset_disposal_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {initiate_asset_disposal_groupdb5a7Props, setinitiate_asset_disposal_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupe1b0c, setdisposal_details_groupe1b0c}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupe1b0cProps, setdisposal_details_groupe1b0cProps}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_group1f9bc, setcompliance_financial_group1f9bc}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_group1f9bcProps, setcompliance_financial_group1f9bcProps}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial664f8, setcompliance_financial664f8}= useContext(TotalContext) as TotalContextProps;
  const {approval_reference5e1aa, setapproval_reference5e1aa}= useContext(TotalContext) as TotalContextProps;
  const {witness_nameac8f7, setwitness_nameac8f7}= useContext(TotalContext) as TotalContextProps;
  const {data_wipe_methodfe1e6, setdata_wipe_methodfe1e6}= useContext(TotalContext) as TotalContextProps;
  const {data_wipedad12b, setdata_wipedad12b}= useContext(TotalContext) as TotalContextProps;
  const {disposal_valued21f4, setdisposal_valued21f4}= useContext(TotalContext) as TotalContextProps;
  const {disposal_cost031f6, setdisposal_cost031f6}= useContext(TotalContext) as TotalContextProps;
  const {resale_amount2eb0e, setresale_amount2eb0e}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9a7ff, setdynamicactions9a7ff}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9a7ffProps, setdynamicactions9a7ffProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {initiateassetdisposal_v1, setinitiateassetdisposal_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:initiateAssetDisposal:AFVK:v1',
    [user],
    'GroupComplianceFinancialGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "16048a3a05ac4926a046632180f1f9bc");
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
    setcompliance_financial_group1f9bcProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("compliance_financial")){
        setcompliance_financial664f8({...compliance_financial664f8,isDisabled:true});

    }else
    {
      if(compliance_financial664f8?.isDisabled==null)
      {
        setcompliance_financial664f8({...compliance_financial664f8,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approval_reference")){
        setapproval_reference5e1aa({...approval_reference5e1aa,isDisabled:true});

    }else
    {
      if(approval_reference5e1aa?.isDisabled==null)
      {
        setapproval_reference5e1aa({...approval_reference5e1aa,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("witness_name")){
        setwitness_nameac8f7({...witness_nameac8f7,isDisabled:true});

    }else
    {
      if(witness_nameac8f7?.isDisabled==null)
      {
        setwitness_nameac8f7({...witness_nameac8f7,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("data_wipe_method")){
        setdata_wipe_methodfe1e6({...data_wipe_methodfe1e6,isDisabled:true});

    }else
    {
      if(data_wipe_methodfe1e6?.isDisabled==null)
      {
        setdata_wipe_methodfe1e6({...data_wipe_methodfe1e6,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("data_wiped")){
        setdata_wipedad12b({...data_wipedad12b,isDisabled:true});

    }else
    {
      if(data_wipedad12b?.isDisabled==null)
      {
        setdata_wipedad12b({...data_wipedad12b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("disposal_value")){
        setdisposal_valued21f4({...disposal_valued21f4,isDisabled:true});

    }else
    {
      if(disposal_valued21f4?.isDisabled==null)
      {
        setdisposal_valued21f4({...disposal_valued21f4,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("disposal_cost")){
        setdisposal_cost031f6({...disposal_cost031f6,isDisabled:true});

    }else
    {
      if(disposal_cost031f6?.isDisabled==null)
      {
        setdisposal_cost031f6({...disposal_cost031f6,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("resale_amount")){
        setresale_amount2eb0e({...resale_amount2eb0e,isDisabled:true});

    }else
    {
      if(resale_amount2eb0e?.isDisabled==null)
      {
        setresale_amount2eb0e({...resale_amount2eb0e,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['initiate_asset_disposal_group'] = initiate_asset_disposal_groupdb5a7,
        codeStates['setinitiate_asset_disposal_group'] = setinitiate_asset_disposal_groupdb5a7,
        codeStates['initiate_asset_disposal_groupdb5a7'] = initiate_asset_disposal_groupdb5a7Props,
        codeStates['setinitiate_asset_disposal_groupdb5a7'] = setinitiate_asset_disposal_groupdb5a7Props,
        codeStates['disposal_details_group'] = disposal_details_groupe1b0c,
        codeStates['setdisposal_details_group'] = setdisposal_details_groupe1b0c,
        codeStates['disposal_details_groupe1b0c'] = disposal_details_groupe1b0cProps,
        codeStates['setdisposal_details_groupe1b0c'] = setdisposal_details_groupe1b0cProps,
        codeStates['compliance_financial_group'] = compliance_financial_group1f9bc,
        codeStates['setcompliance_financial_group'] = setcompliance_financial_group1f9bc,
        codeStates['compliance_financial_group1f9bc'] = compliance_financial_group1f9bcProps,
        codeStates['setcompliance_financial_group1f9bc'] = setcompliance_financial_group1f9bcProps,
        codeStates['compliance_financial'] = compliance_financial664f8,
        codeStates['setcompliance_financial'] = setcompliance_financial664f8,
        codeStates['approval_reference'] = approval_reference5e1aa,
        codeStates['setapproval_reference'] = setapproval_reference5e1aa,
        codeStates['witness_name'] = witness_nameac8f7,
        codeStates['setwitness_name'] = setwitness_nameac8f7,
        codeStates['data_wipe_method'] = data_wipe_methodfe1e6,
        codeStates['setdata_wipe_method'] = setdata_wipe_methodfe1e6,
        codeStates['data_wiped'] = data_wipedad12b,
        codeStates['setdata_wiped'] = setdata_wipedad12b,
        codeStates['disposal_value'] = disposal_valued21f4,
        codeStates['setdisposal_value'] = setdisposal_valued21f4,
        codeStates['disposal_cost'] = disposal_cost031f6,
        codeStates['setdisposal_cost'] = setdisposal_cost031f6,
        codeStates['resale_amount'] = resale_amount2eb0e,
        codeStates['setresale_amount'] = setresale_amount2eb0e,
        codeStates['dynamicactions'] = dynamicactions9a7ff,
        codeStates['setdynamicactions'] = setdynamicactions9a7ff,
        codeStates['dynamicactions9a7ff'] = dynamicactions9a7ffProps,
        codeStates['setdynamicactions9a7ff'] = setdynamicactions9a7ffProps,

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
        codeStates['initiate_asset_disposal_group'] = initiate_asset_disposal_groupdb5a7,
        codeStates['setinitiate_asset_disposal_group'] = setinitiate_asset_disposal_groupdb5a7,
        codeStates['initiate_asset_disposal_groupdb5a7'] = initiate_asset_disposal_groupdb5a7Props,
        codeStates['setinitiate_asset_disposal_groupdb5a7'] = setinitiate_asset_disposal_groupdb5a7Props,
        codeStates['disposal_details_group'] = disposal_details_groupe1b0c,
        codeStates['setdisposal_details_group'] = setdisposal_details_groupe1b0c,
        codeStates['disposal_details_groupe1b0c'] = disposal_details_groupe1b0cProps,
        codeStates['setdisposal_details_groupe1b0c'] = setdisposal_details_groupe1b0cProps,
        codeStates['compliance_financial_group'] = compliance_financial_group1f9bc,
        codeStates['setcompliance_financial_group'] = setcompliance_financial_group1f9bc,
        codeStates['compliance_financial_group1f9bc'] = compliance_financial_group1f9bcProps,
        codeStates['setcompliance_financial_group1f9bc'] = setcompliance_financial_group1f9bcProps,
        codeStates['compliance_financial'] = compliance_financial664f8,
        codeStates['setcompliance_financial'] = setcompliance_financial664f8,
        codeStates['approval_reference'] = approval_reference5e1aa,
        codeStates['setapproval_reference'] = setapproval_reference5e1aa,
        codeStates['witness_name'] = witness_nameac8f7,
        codeStates['setwitness_name'] = setwitness_nameac8f7,
        codeStates['data_wipe_method'] = data_wipe_methodfe1e6,
        codeStates['setdata_wipe_method'] = setdata_wipe_methodfe1e6,
        codeStates['data_wiped'] = data_wipedad12b,
        codeStates['setdata_wiped'] = setdata_wipedad12b,
        codeStates['disposal_value'] = disposal_valued21f4,
        codeStates['setdisposal_value'] = setdisposal_valued21f4,
        codeStates['disposal_cost'] = disposal_cost031f6,
        codeStates['setdisposal_cost'] = setdisposal_cost031f6,
        codeStates['resale_amount'] = resale_amount2eb0e,
        codeStates['setresale_amount'] = setresale_amount2eb0e,
        codeStates['dynamicactions'] = dynamicactions9a7ff,
        codeStates['setdynamicactions'] = setdynamicactions9a7ff,
        codeStates['dynamicactions9a7ff'] = dynamicactions9a7ffProps,
        codeStates['setdynamicactions9a7ff'] = setdynamicactions9a7ffProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const compliance_financial_group1f9bcRef = useRef<any>(null);
  const handleClearSearch = () => {
    compliance_financial_group1f9bcRef.current?.setSearchParams();
    compliance_financial_group1f9bcRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(compliance_financial_group1f9bc) && Object.keys(compliance_financial_group1f9bc)?.length>0)
      {
        setcompliance_financial_group1f9bc({})
      }
    }else 
      prevRefreshRef.current= true
  }, [compliance_financial_group1f9bcProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '38 / 74',
      
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
          {allowedControls.includes("compliance_financial") ?<Textcompliance_financial   /* 664f8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("approval_reference") ?<TextInputapproval_reference   /* 5e1aa */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("witness_name") ?<TextInputwitness_name   /* ac8f7 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("data_wipe_method") ?<Dropdowndata_wipe_method   /* fe1e6 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("data_wiped")?<Switchdata_wiped  /* ad12b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("disposal_value") ?<TextInputdisposal_value   /* d21f4 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("disposal_cost") ?<TextInputdisposal_cost   /* 031f6 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("resale_amount") ?<TextInputresale_amount   /* 2eb0e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcompliance_financial_group
