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
import Dropdownasset_name  from "./Dropdownasset_name";
import TextInputproduct_name  from "./TextInputproduct_name";
import Dropdownvendor_name  from "./Dropdownvendor_name";
import Dropdownlicense_type  from "./Dropdownlicense_type";
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
  const {dfd_vendornamecombo_v1Props, setdfd_vendornamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_licensetypecombo_v1Props, setdfd_licensetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetnamecombo_v1Props, setdfd_assetnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "validity_financial_details_group",
      "dynamicactions"
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
      "validity_financial_details_group",
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
  const {add_license_groupdb5a7, setadd_license_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {add_license_groupdb5a7Props, setadd_license_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {license_information_groupfae34, setlicense_information_groupfae34}= useContext(TotalContext) as TotalContextProps;
  const {license_information_groupfae34Props, setlicense_information_groupfae34Props}= useContext(TotalContext) as TotalContextProps;
  const {license_information90d62, setlicense_information90d62}= useContext(TotalContext) as TotalContextProps;
  const {asset_namee8382, setasset_namee8382}= useContext(TotalContext) as TotalContextProps;
  const {product_namec9548, setproduct_namec9548}= useContext(TotalContext) as TotalContextProps;
  const {vendor_nameb519a, setvendor_nameb519a}= useContext(TotalContext) as TotalContextProps;
  const {license_typeae36b, setlicense_typeae36b}= useContext(TotalContext) as TotalContextProps;
  const {license_keyd5b6f, setlicense_keyd5b6f}= useContext(TotalContext) as TotalContextProps;
  const {license_configuration_groupb5d91, setlicense_configuration_groupb5d91}= useContext(TotalContext) as TotalContextProps;
  const {license_configuration_groupb5d91Props, setlicense_configuration_groupb5d91Props}= useContext(TotalContext) as TotalContextProps;
  const {validity_financial_details_grouped4a1, setvalidity_financial_details_grouped4a1}= useContext(TotalContext) as TotalContextProps;
  const {validity_financial_details_grouped4a1Props, setvalidity_financial_details_grouped4a1Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions67d98, setdynamicactions67d98}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions67d98Props, setdynamicactions67d98Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addlicense_v1, setaddlicense_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:addLicense:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "064a0d259dc344468d8f075a560fae34");
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
    setlicense_information_groupfae34Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("license_information")){
        setlicense_information90d62({...license_information90d62,isDisabled:true});

    }else
    {
      if(license_information90d62?.isDisabled==null)
      {
        setlicense_information90d62({...license_information90d62,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_namee8382({...asset_namee8382,isDisabled:true});

    }else
    {
      if(asset_namee8382?.isDisabled==null)
      {
        setasset_namee8382({...asset_namee8382,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("product_name")){
        setproduct_namec9548({...product_namec9548,isDisabled:true});

    }else
    {
      if(product_namec9548?.isDisabled==null)
      {
        setproduct_namec9548({...product_namec9548,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("vendor_name")){
        setvendor_nameb519a({...vendor_nameb519a,isDisabled:true});

    }else
    {
      if(vendor_nameb519a?.isDisabled==null)
      {
        setvendor_nameb519a({...vendor_nameb519a,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("license_type")){
        setlicense_typeae36b({...license_typeae36b,isDisabled:true});

    }else
    {
      if(license_typeae36b?.isDisabled==null)
      {
        setlicense_typeae36b({...license_typeae36b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("license_key")){
        setlicense_keyd5b6f({...license_keyd5b6f,isDisabled:true});

    }else
    {
      if(license_keyd5b6f?.isDisabled==null)
      {
        setlicense_keyd5b6f({...license_keyd5b6f,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_license_group'] = add_license_groupdb5a7,
        codeStates['setadd_license_group'] = setadd_license_groupdb5a7,
        codeStates['add_license_groupdb5a7'] = add_license_groupdb5a7Props,
        codeStates['setadd_license_groupdb5a7'] = setadd_license_groupdb5a7Props,
        codeStates['license_information_group'] = license_information_groupfae34,
        codeStates['setlicense_information_group'] = setlicense_information_groupfae34,
        codeStates['license_information_groupfae34'] = license_information_groupfae34Props,
        codeStates['setlicense_information_groupfae34'] = setlicense_information_groupfae34Props,
        codeStates['license_information'] = license_information90d62,
        codeStates['setlicense_information'] = setlicense_information90d62,
        codeStates['asset_name'] = asset_namee8382,
        codeStates['setasset_name'] = setasset_namee8382,
        codeStates['product_name'] = product_namec9548,
        codeStates['setproduct_name'] = setproduct_namec9548,
        codeStates['vendor_name'] = vendor_nameb519a,
        codeStates['setvendor_name'] = setvendor_nameb519a,
        codeStates['license_type'] = license_typeae36b,
        codeStates['setlicense_type'] = setlicense_typeae36b,
        codeStates['license_key'] = license_keyd5b6f,
        codeStates['setlicense_key'] = setlicense_keyd5b6f,
        codeStates['license_configuration_group'] = license_configuration_groupb5d91,
        codeStates['setlicense_configuration_group'] = setlicense_configuration_groupb5d91,
        codeStates['license_configuration_groupb5d91'] = license_configuration_groupb5d91Props,
        codeStates['setlicense_configuration_groupb5d91'] = setlicense_configuration_groupb5d91Props,
        codeStates['validity_financial_details_group'] = validity_financial_details_grouped4a1,
        codeStates['setvalidity_financial_details_group'] = setvalidity_financial_details_grouped4a1,
        codeStates['validity_financial_details_grouped4a1'] = validity_financial_details_grouped4a1Props,
        codeStates['setvalidity_financial_details_grouped4a1'] = setvalidity_financial_details_grouped4a1Props,
        codeStates['dynamicactions'] = dynamicactions67d98,
        codeStates['setdynamicactions'] = setdynamicactions67d98,
        codeStates['dynamicactions67d98'] = dynamicactions67d98Props,
        codeStates['setdynamicactions67d98'] = setdynamicactions67d98Props,

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
        codeStates['add_license_group'] = add_license_groupdb5a7,
        codeStates['setadd_license_group'] = setadd_license_groupdb5a7,
        codeStates['add_license_groupdb5a7'] = add_license_groupdb5a7Props,
        codeStates['setadd_license_groupdb5a7'] = setadd_license_groupdb5a7Props,
        codeStates['license_information_group'] = license_information_groupfae34,
        codeStates['setlicense_information_group'] = setlicense_information_groupfae34,
        codeStates['license_information_groupfae34'] = license_information_groupfae34Props,
        codeStates['setlicense_information_groupfae34'] = setlicense_information_groupfae34Props,
        codeStates['license_information'] = license_information90d62,
        codeStates['setlicense_information'] = setlicense_information90d62,
        codeStates['asset_name'] = asset_namee8382,
        codeStates['setasset_name'] = setasset_namee8382,
        codeStates['product_name'] = product_namec9548,
        codeStates['setproduct_name'] = setproduct_namec9548,
        codeStates['vendor_name'] = vendor_nameb519a,
        codeStates['setvendor_name'] = setvendor_nameb519a,
        codeStates['license_type'] = license_typeae36b,
        codeStates['setlicense_type'] = setlicense_typeae36b,
        codeStates['license_key'] = license_keyd5b6f,
        codeStates['setlicense_key'] = setlicense_keyd5b6f,
        codeStates['license_configuration_group'] = license_configuration_groupb5d91,
        codeStates['setlicense_configuration_group'] = setlicense_configuration_groupb5d91,
        codeStates['license_configuration_groupb5d91'] = license_configuration_groupb5d91Props,
        codeStates['setlicense_configuration_groupb5d91'] = setlicense_configuration_groupb5d91Props,
        codeStates['validity_financial_details_group'] = validity_financial_details_grouped4a1,
        codeStates['setvalidity_financial_details_group'] = setvalidity_financial_details_grouped4a1,
        codeStates['validity_financial_details_grouped4a1'] = validity_financial_details_grouped4a1Props,
        codeStates['setvalidity_financial_details_grouped4a1'] = setvalidity_financial_details_grouped4a1Props,
        codeStates['dynamicactions'] = dynamicactions67d98,
        codeStates['setdynamicactions'] = setdynamicactions67d98,
        codeStates['dynamicactions67d98'] = dynamicactions67d98Props,
        codeStates['setdynamicactions67d98'] = setdynamicactions67d98Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const license_information_groupfae34Ref = useRef<any>(null);
  const handleClearSearch = () => {
    license_information_groupfae34Ref.current?.setSearchParams();
    license_information_groupfae34Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(license_information_groupfae34) && Object.keys(license_information_groupfae34)?.length>0)
      {
        setlicense_information_groupfae34({})
      }
    }else 
      prevRefreshRef.current= true
  }, [license_information_groupfae34Props?.refresh,token])


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
          {allowedControls.includes("license_information") ?<Textlicense_information   /* 90d62 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<Dropdownasset_name   /* e8382 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("product_name") ?<TextInputproduct_name   /* c9548 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("vendor_name") ?<Dropdownvendor_name   /* b519a */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("license_type") ?<Dropdownlicense_type   /* ae36b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("license_key") ?<TextInputlicense_key   /* d5b6f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouplicense_information_group
