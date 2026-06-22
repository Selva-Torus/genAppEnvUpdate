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
import Textlicense_information  from "./Textlicense_information";
import TextInputasset_name  from "./TextInputasset_name";
import TextInputproduct_name  from "./TextInputproduct_name";
import TextInputvendor_name  from "./TextInputvendor_name";
import TextInputlicense_type  from "./TextInputlicense_type";
import TextInputlicense_key  from "./TextInputlicense_key";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouplicense_information_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "license_information",
      "asset_name",
      "product_name",
      "vendor_name",
      "license_type",
      "license_key"
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
      "license_information",
      "asset_name",
      "product_name",
      "vendor_name",
      "license_type",
      "license_key"
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
  const {license_information6a10f, setlicense_information6a10f}= useContext(TotalContext) as TotalContextProps;
  const {asset_name1ae9b, setasset_name1ae9b}= useContext(TotalContext) as TotalContextProps;
  const {product_name11c98, setproduct_name11c98}= useContext(TotalContext) as TotalContextProps;
  const {vendor_namef2df8, setvendor_namef2df8}= useContext(TotalContext) as TotalContextProps;
  const {license_typec8c15, setlicense_typec8c15}= useContext(TotalContext) as TotalContextProps;
  const {license_keyab6d1, setlicense_keyab6d1}= useContext(TotalContext) as TotalContextProps;
  const {license_configuration_groupa329d, setlicense_configuration_groupa329d}= useContext(TotalContext) as TotalContextProps;
  const {license_configuration_groupa329dProps, setlicense_configuration_groupa329dProps}= useContext(TotalContext) as TotalContextProps;
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
    'GroupLicenseInformationGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "33d0de4ebc31e801cefbbc9fa134e03c");
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
    setlicense_information_group4e03cProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("license_information")){
        setlicense_information6a10f({...license_information6a10f,isDisabled:true});

    }else
    {
      if(license_information6a10f?.isDisabled==null)
      {
        setlicense_information6a10f({...license_information6a10f,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name1ae9b({...asset_name1ae9b,isDisabled:true});

    }else
    {
      if(asset_name1ae9b?.isDisabled==null)
      {
        setasset_name1ae9b({...asset_name1ae9b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("product_name")){
        setproduct_name11c98({...product_name11c98,isDisabled:true});

    }else
    {
      if(product_name11c98?.isDisabled==null)
      {
        setproduct_name11c98({...product_name11c98,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("vendor_name")){
        setvendor_namef2df8({...vendor_namef2df8,isDisabled:true});

    }else
    {
      if(vendor_namef2df8?.isDisabled==null)
      {
        setvendor_namef2df8({...vendor_namef2df8,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("license_type")){
        setlicense_typec8c15({...license_typec8c15,isDisabled:true});

    }else
    {
      if(license_typec8c15?.isDisabled==null)
      {
        setlicense_typec8c15({...license_typec8c15,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("license_key")){
        setlicense_keyab6d1({...license_keyab6d1,isDisabled:true});

    }else
    {
      if(license_keyab6d1?.isDisabled==null)
      {
        setlicense_keyab6d1({...license_keyab6d1,isDisabled:false});
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
        codeStates['license_information'] = license_information6a10f,
        codeStates['setlicense_information'] = setlicense_information6a10f,
        codeStates['asset_name'] = asset_name1ae9b,
        codeStates['setasset_name'] = setasset_name1ae9b,
        codeStates['product_name'] = product_name11c98,
        codeStates['setproduct_name'] = setproduct_name11c98,
        codeStates['vendor_name'] = vendor_namef2df8,
        codeStates['setvendor_name'] = setvendor_namef2df8,
        codeStates['license_type'] = license_typec8c15,
        codeStates['setlicense_type'] = setlicense_typec8c15,
        codeStates['license_key'] = license_keyab6d1,
        codeStates['setlicense_key'] = setlicense_keyab6d1,
        codeStates['license_configuration_group'] = license_configuration_groupa329d,
        codeStates['setlicense_configuration_group'] = setlicense_configuration_groupa329d,
        codeStates['license_configuration_groupa329d'] = license_configuration_groupa329dProps,
        codeStates['setlicense_configuration_groupa329d'] = setlicense_configuration_groupa329dProps,
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
        codeStates['license_information'] = license_information6a10f,
        codeStates['setlicense_information'] = setlicense_information6a10f,
        codeStates['asset_name'] = asset_name1ae9b,
        codeStates['setasset_name'] = setasset_name1ae9b,
        codeStates['product_name'] = product_name11c98,
        codeStates['setproduct_name'] = setproduct_name11c98,
        codeStates['vendor_name'] = vendor_namef2df8,
        codeStates['setvendor_name'] = setvendor_namef2df8,
        codeStates['license_type'] = license_typec8c15,
        codeStates['setlicense_type'] = setlicense_typec8c15,
        codeStates['license_key'] = license_keyab6d1,
        codeStates['setlicense_key'] = setlicense_keyab6d1,
        codeStates['license_configuration_group'] = license_configuration_groupa329d,
        codeStates['setlicense_configuration_group'] = setlicense_configuration_groupa329d,
        codeStates['license_configuration_groupa329d'] = license_configuration_groupa329dProps,
        codeStates['setlicense_configuration_groupa329d'] = setlicense_configuration_groupa329dProps,
        codeStates['validity_financial_details_group'] = validity_financial_details_groupb8a9f,
        codeStates['setvalidity_financial_details_group'] = setvalidity_financial_details_groupb8a9f,
        codeStates['validity_financial_details_groupb8a9f'] = validity_financial_details_groupb8a9fProps,
        codeStates['setvalidity_financial_details_groupb8a9f'] = setvalidity_financial_details_groupb8a9fProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const license_information_group4e03cRef = useRef<any>(null);
  const handleClearSearch = () => {
    license_information_group4e03cRef.current?.setSearchParams();
    license_information_group4e03cRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(license_information_group4e03c) && Object.keys(license_information_group4e03c)?.length>0)
      {
        setlicense_information_group4e03c({})
      }
    }else 
      prevRefreshRef.current= true
  }, [license_information_group4e03cProps?.refresh,token])


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
          {allowedControls.includes("license_information") ?<Textlicense_information   /* 6a10f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<TextInputasset_name   /* 1ae9b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("product_name") ?<TextInputproduct_name   /* 11c98 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("vendor_name") ?<TextInputvendor_name   /* f2df8 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("license_type") ?<TextInputlicense_type   /* c8c15 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("license_key") ?<TextInputlicense_key   /* ab6d1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouplicense_information_group
