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
import TextInputdata_wipe_method  from "./TextInputdata_wipe_method";
import TextInputdata_wiped  from "./TextInputdata_wiped";
import TextInputdisposal_value  from "./TextInputdisposal_value";
import TextInputdisposal_cost  from "./TextInputdisposal_cost";
import TextInputresale_amount  from "./TextInputresale_amount";
import Textdisposal_id  from "./Textdisposal_id";
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
      "resale_amount",
      "disposal_id"
    ],
    "allowedGroups": [
      "canvas",
      "initiate_asset_disposal_group",
      "disposal_details_group",
      "compliance_financial_group"
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
      "resale_amount",
      "disposal_id"
    ],
    "allowedGroups": [
      "canvas",
      "initiate_asset_disposal_group",
      "disposal_details_group",
      "compliance_financial_group"
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
  const {initiate_asset_disposal_group0196a, setinitiate_asset_disposal_group0196a}= useContext(TotalContext) as TotalContextProps;
  const {initiate_asset_disposal_group0196aProps, setinitiate_asset_disposal_group0196aProps}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaa369, setdisposal_details_groupaa369}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaa369Props, setdisposal_details_groupaa369Props}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_groupe5dd8, setcompliance_financial_groupe5dd8}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_groupe5dd8Props, setcompliance_financial_groupe5dd8Props}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financialc9043, setcompliance_financialc9043}= useContext(TotalContext) as TotalContextProps;
  const {approval_referenceb0a46, setapproval_referenceb0a46}= useContext(TotalContext) as TotalContextProps;
  const {witness_name6fddf, setwitness_name6fddf}= useContext(TotalContext) as TotalContextProps;
  const {data_wipe_method8923d, setdata_wipe_method8923d}= useContext(TotalContext) as TotalContextProps;
  const {data_wipeda4257, setdata_wipeda4257}= useContext(TotalContext) as TotalContextProps;
  const {disposal_value13578, setdisposal_value13578}= useContext(TotalContext) as TotalContextProps;
  const {disposal_cost23f44, setdisposal_cost23f44}= useContext(TotalContext) as TotalContextProps;
  const {resale_amount5336f, setresale_amount5336f}= useContext(TotalContext) as TotalContextProps;
  const {disposal_idee44c, setdisposal_idee44c}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assetdisposalview_v1, setassetdisposalview_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDisposalView:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2f1878a0c47c273ea728efb4f07e5dd8");
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
    setcompliance_financial_groupe5dd8Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("compliance_financial")){
        setcompliance_financialc9043({...compliance_financialc9043,isDisabled:true});

    }else
    {
      if(compliance_financialc9043?.isDisabled==null)
      {
        setcompliance_financialc9043({...compliance_financialc9043,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approval_reference")){
        setapproval_referenceb0a46({...approval_referenceb0a46,isDisabled:true});

    }else
    {
      if(approval_referenceb0a46?.isDisabled==null)
      {
        setapproval_referenceb0a46({...approval_referenceb0a46,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("witness_name")){
        setwitness_name6fddf({...witness_name6fddf,isDisabled:true});

    }else
    {
      if(witness_name6fddf?.isDisabled==null)
      {
        setwitness_name6fddf({...witness_name6fddf,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("data_wipe_method")){
        setdata_wipe_method8923d({...data_wipe_method8923d,isDisabled:true});

    }else
    {
      if(data_wipe_method8923d?.isDisabled==null)
      {
        setdata_wipe_method8923d({...data_wipe_method8923d,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("data_wiped")){
        setdata_wipeda4257({...data_wipeda4257,isDisabled:true});

    }else
    {
      if(data_wipeda4257?.isDisabled==null)
      {
        setdata_wipeda4257({...data_wipeda4257,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("disposal_value")){
        setdisposal_value13578({...disposal_value13578,isDisabled:true});

    }else
    {
      if(disposal_value13578?.isDisabled==null)
      {
        setdisposal_value13578({...disposal_value13578,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("disposal_cost")){
        setdisposal_cost23f44({...disposal_cost23f44,isDisabled:true});

    }else
    {
      if(disposal_cost23f44?.isDisabled==null)
      {
        setdisposal_cost23f44({...disposal_cost23f44,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("resale_amount")){
        setresale_amount5336f({...resale_amount5336f,isDisabled:true});

    }else
    {
      if(resale_amount5336f?.isDisabled==null)
      {
        setresale_amount5336f({...resale_amount5336f,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("disposal_id")){
        setdisposal_idee44c({...disposal_idee44c,isDisabled:true});

    }else
    {
      if(disposal_idee44c?.isDisabled==null)
      {
        setdisposal_idee44c({...disposal_idee44c,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['initiate_asset_disposal_group'] = initiate_asset_disposal_group0196a,
        codeStates['setinitiate_asset_disposal_group'] = setinitiate_asset_disposal_group0196a,
        codeStates['initiate_asset_disposal_group0196a'] = initiate_asset_disposal_group0196aProps,
        codeStates['setinitiate_asset_disposal_group0196a'] = setinitiate_asset_disposal_group0196aProps,
        codeStates['disposal_details_group'] = disposal_details_groupaa369,
        codeStates['setdisposal_details_group'] = setdisposal_details_groupaa369,
        codeStates['disposal_details_groupaa369'] = disposal_details_groupaa369Props,
        codeStates['setdisposal_details_groupaa369'] = setdisposal_details_groupaa369Props,
        codeStates['compliance_financial_group'] = compliance_financial_groupe5dd8,
        codeStates['setcompliance_financial_group'] = setcompliance_financial_groupe5dd8,
        codeStates['compliance_financial_groupe5dd8'] = compliance_financial_groupe5dd8Props,
        codeStates['setcompliance_financial_groupe5dd8'] = setcompliance_financial_groupe5dd8Props,
        codeStates['compliance_financial'] = compliance_financialc9043,
        codeStates['setcompliance_financial'] = setcompliance_financialc9043,
        codeStates['approval_reference'] = approval_referenceb0a46,
        codeStates['setapproval_reference'] = setapproval_referenceb0a46,
        codeStates['witness_name'] = witness_name6fddf,
        codeStates['setwitness_name'] = setwitness_name6fddf,
        codeStates['data_wipe_method'] = data_wipe_method8923d,
        codeStates['setdata_wipe_method'] = setdata_wipe_method8923d,
        codeStates['data_wiped'] = data_wipeda4257,
        codeStates['setdata_wiped'] = setdata_wipeda4257,
        codeStates['disposal_value'] = disposal_value13578,
        codeStates['setdisposal_value'] = setdisposal_value13578,
        codeStates['disposal_cost'] = disposal_cost23f44,
        codeStates['setdisposal_cost'] = setdisposal_cost23f44,
        codeStates['resale_amount'] = resale_amount5336f,
        codeStates['setresale_amount'] = setresale_amount5336f,
        codeStates['disposal_id'] = disposal_idee44c,
        codeStates['setdisposal_id'] = setdisposal_idee44c,

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
        codeStates['initiate_asset_disposal_group'] = initiate_asset_disposal_group0196a,
        codeStates['setinitiate_asset_disposal_group'] = setinitiate_asset_disposal_group0196a,
        codeStates['initiate_asset_disposal_group0196a'] = initiate_asset_disposal_group0196aProps,
        codeStates['setinitiate_asset_disposal_group0196a'] = setinitiate_asset_disposal_group0196aProps,
        codeStates['disposal_details_group'] = disposal_details_groupaa369,
        codeStates['setdisposal_details_group'] = setdisposal_details_groupaa369,
        codeStates['disposal_details_groupaa369'] = disposal_details_groupaa369Props,
        codeStates['setdisposal_details_groupaa369'] = setdisposal_details_groupaa369Props,
        codeStates['compliance_financial_group'] = compliance_financial_groupe5dd8,
        codeStates['setcompliance_financial_group'] = setcompliance_financial_groupe5dd8,
        codeStates['compliance_financial_groupe5dd8'] = compliance_financial_groupe5dd8Props,
        codeStates['setcompliance_financial_groupe5dd8'] = setcompliance_financial_groupe5dd8Props,
        codeStates['compliance_financial'] = compliance_financialc9043,
        codeStates['setcompliance_financial'] = setcompliance_financialc9043,
        codeStates['approval_reference'] = approval_referenceb0a46,
        codeStates['setapproval_reference'] = setapproval_referenceb0a46,
        codeStates['witness_name'] = witness_name6fddf,
        codeStates['setwitness_name'] = setwitness_name6fddf,
        codeStates['data_wipe_method'] = data_wipe_method8923d,
        codeStates['setdata_wipe_method'] = setdata_wipe_method8923d,
        codeStates['data_wiped'] = data_wipeda4257,
        codeStates['setdata_wiped'] = setdata_wipeda4257,
        codeStates['disposal_value'] = disposal_value13578,
        codeStates['setdisposal_value'] = setdisposal_value13578,
        codeStates['disposal_cost'] = disposal_cost23f44,
        codeStates['setdisposal_cost'] = setdisposal_cost23f44,
        codeStates['resale_amount'] = resale_amount5336f,
        codeStates['setresale_amount'] = setresale_amount5336f,
        codeStates['disposal_id'] = disposal_idee44c,
        codeStates['setdisposal_id'] = setdisposal_idee44c,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const compliance_financial_groupe5dd8Ref = useRef<any>(null);
  const handleClearSearch = () => {
    compliance_financial_groupe5dd8Ref.current?.setSearchParams();
    compliance_financial_groupe5dd8Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(compliance_financial_groupe5dd8) && Object.keys(compliance_financial_groupe5dd8)?.length>0)
      {
        setcompliance_financial_groupe5dd8({})
      }
    }else 
      prevRefreshRef.current= true
  }, [compliance_financial_groupe5dd8Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '37 / 72',
      
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
          {allowedControls.includes("compliance_financial") ?<Textcompliance_financial   /* c9043 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("approval_reference") ?<TextInputapproval_reference   /* b0a46 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("witness_name") ?<TextInputwitness_name   /* 6fddf */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("data_wipe_method") ?<TextInputdata_wipe_method   /* 8923d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("data_wiped") ?<TextInputdata_wiped   /* a4257 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("disposal_value") ?<TextInputdisposal_value   /* 13578 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("disposal_cost") ?<TextInputdisposal_cost   /* 23f44 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("resale_amount") ?<TextInputresale_amount   /* 5336f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("disposal_id") ?<Textdisposal_id   /* ee44c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcompliance_financial_group
