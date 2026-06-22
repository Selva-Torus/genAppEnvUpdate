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
import Textdisposal_details  from "./Textdisposal_details";
import TextInputvendor_name  from "./TextInputvendor_name";
import TextInputasset_name  from "./TextInputasset_name";
import TextInputdisposal_method  from "./TextInputdisposal_method";
import TextInputdisposal_date  from "./TextInputdisposal_date";
import TextAreareason  from "./TextAreareason";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdisposal_details_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "disposal_details",
      "vendor_name",
      "asset_name",
      "disposal_method",
      "disposal_date",
      "reason"
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
      "disposal_details",
      "vendor_name",
      "asset_name",
      "disposal_method",
      "disposal_date",
      "reason"
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
  const {disposal_details1d5ee, setdisposal_details1d5ee}= useContext(TotalContext) as TotalContextProps;
  const {vendor_name5f557, setvendor_name5f557}= useContext(TotalContext) as TotalContextProps;
  const {asset_name298df, setasset_name298df}= useContext(TotalContext) as TotalContextProps;
  const {disposal_methoda093b, setdisposal_methoda093b}= useContext(TotalContext) as TotalContextProps;
  const {disposal_date247ef, setdisposal_date247ef}= useContext(TotalContext) as TotalContextProps;
  const {reason8b938, setreason8b938}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_groupe5dd8, setcompliance_financial_groupe5dd8}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_groupe5dd8Props, setcompliance_financial_groupe5dd8Props}= useContext(TotalContext) as TotalContextProps;
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
    'GroupDisposalDetailsGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "b3ad56a3082a709039df9dc7d32aa369");
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
    setdisposal_details_groupaa369Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("disposal_details")){
        setdisposal_details1d5ee({...disposal_details1d5ee,isDisabled:true});

    }else
    {
      if(disposal_details1d5ee?.isDisabled==null)
      {
        setdisposal_details1d5ee({...disposal_details1d5ee,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("vendor_name")){
        setvendor_name5f557({...vendor_name5f557,isDisabled:true});

    }else
    {
      if(vendor_name5f557?.isDisabled==null)
      {
        setvendor_name5f557({...vendor_name5f557,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name298df({...asset_name298df,isDisabled:true});

    }else
    {
      if(asset_name298df?.isDisabled==null)
      {
        setasset_name298df({...asset_name298df,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("disposal_method")){
        setdisposal_methoda093b({...disposal_methoda093b,isDisabled:true});

    }else
    {
      if(disposal_methoda093b?.isDisabled==null)
      {
        setdisposal_methoda093b({...disposal_methoda093b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("disposal_date")){
        setdisposal_date247ef({...disposal_date247ef,isDisabled:true});

    }else
    {
      if(disposal_date247ef?.isDisabled==null)
      {
        setdisposal_date247ef({...disposal_date247ef,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("reason")){
        setreason8b938({...reason8b938,isDisabled:true});

    }else
    {
      if(reason8b938?.isDisabled==null)
      {
        setreason8b938({...reason8b938,isDisabled:false});
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
        codeStates['disposal_details'] = disposal_details1d5ee,
        codeStates['setdisposal_details'] = setdisposal_details1d5ee,
        codeStates['vendor_name'] = vendor_name5f557,
        codeStates['setvendor_name'] = setvendor_name5f557,
        codeStates['asset_name'] = asset_name298df,
        codeStates['setasset_name'] = setasset_name298df,
        codeStates['disposal_method'] = disposal_methoda093b,
        codeStates['setdisposal_method'] = setdisposal_methoda093b,
        codeStates['disposal_date'] = disposal_date247ef,
        codeStates['setdisposal_date'] = setdisposal_date247ef,
        codeStates['reason'] = reason8b938,
        codeStates['setreason'] = setreason8b938,
        codeStates['compliance_financial_group'] = compliance_financial_groupe5dd8,
        codeStates['setcompliance_financial_group'] = setcompliance_financial_groupe5dd8,
        codeStates['compliance_financial_groupe5dd8'] = compliance_financial_groupe5dd8Props,
        codeStates['setcompliance_financial_groupe5dd8'] = setcompliance_financial_groupe5dd8Props,

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
        codeStates['disposal_details'] = disposal_details1d5ee,
        codeStates['setdisposal_details'] = setdisposal_details1d5ee,
        codeStates['vendor_name'] = vendor_name5f557,
        codeStates['setvendor_name'] = setvendor_name5f557,
        codeStates['asset_name'] = asset_name298df,
        codeStates['setasset_name'] = setasset_name298df,
        codeStates['disposal_method'] = disposal_methoda093b,
        codeStates['setdisposal_method'] = setdisposal_methoda093b,
        codeStates['disposal_date'] = disposal_date247ef,
        codeStates['setdisposal_date'] = setdisposal_date247ef,
        codeStates['reason'] = reason8b938,
        codeStates['setreason'] = setreason8b938,
        codeStates['compliance_financial_group'] = compliance_financial_groupe5dd8,
        codeStates['setcompliance_financial_group'] = setcompliance_financial_groupe5dd8,
        codeStates['compliance_financial_groupe5dd8'] = compliance_financial_groupe5dd8Props,
        codeStates['setcompliance_financial_groupe5dd8'] = setcompliance_financial_groupe5dd8Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const disposal_details_groupaa369Ref = useRef<any>(null);
  const handleClearSearch = () => {
    disposal_details_groupaa369Ref.current?.setSearchParams();
    disposal_details_groupaa369Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(disposal_details_groupaa369) && Object.keys(disposal_details_groupaa369)?.length>0)
      {
        setdisposal_details_groupaa369({})
      }
    }else 
      prevRefreshRef.current= true
  }, [disposal_details_groupaa369Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 36',
      
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
          {allowedControls.includes("disposal_details") ?<Textdisposal_details   /* 1d5ee */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("vendor_name") ?<TextInputvendor_name   /* 5f557 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<TextInputasset_name   /* 298df */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("disposal_method") ?<TextInputdisposal_method   /* a093b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("disposal_date") ?<TextInputdisposal_date   /* 247ef */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("reason") ?<TextAreareason   /* 8b938 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupdisposal_details_group
