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
import Textvalidity_financial_details  from "./Textvalidity_financial_details";
import TextInputpurchase_date  from "./TextInputpurchase_date";
import TextInputexpiry_date  from "./TextInputexpiry_date";
import TextInputsupport_expiry  from "./TextInputsupport_expiry";
import TextInputcost  from "./TextInputcost";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupvalidity_financial_details_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "validity_financial_details",
      "purchase_date",
      "expiry_date",
      "support_expiry",
      "cost"
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
      "validity_financial_details",
      "purchase_date",
      "expiry_date",
      "support_expiry",
      "cost"
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
  const {validity_financial_details_groupb8a9f, setvalidity_financial_details_groupb8a9f}= useContext(TotalContext) as TotalContextProps;
  const {validity_financial_details_groupb8a9fProps, setvalidity_financial_details_groupb8a9fProps}= useContext(TotalContext) as TotalContextProps;
  const {validity_financial_details9259f, setvalidity_financial_details9259f}= useContext(TotalContext) as TotalContextProps;
  const {purchase_date884a6, setpurchase_date884a6}= useContext(TotalContext) as TotalContextProps;
  const {expiry_date74df0, setexpiry_date74df0}= useContext(TotalContext) as TotalContextProps;
  const {support_expirybfd9e, setsupport_expirybfd9e}= useContext(TotalContext) as TotalContextProps;
  const {cost2568f, setcost2568f}= useContext(TotalContext) as TotalContextProps;
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
    'GroupValidityFinancialDetailsGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7bc0f89fb2071723321071b41d9b8a9f");
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
    setvalidity_financial_details_groupb8a9fProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("validity_financial_details")){
        setvalidity_financial_details9259f({...validity_financial_details9259f,isDisabled:true});

    }else
    {
      if(validity_financial_details9259f?.isDisabled==null)
      {
        setvalidity_financial_details9259f({...validity_financial_details9259f,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("purchase_date")){
        setpurchase_date884a6({...purchase_date884a6,isDisabled:true});

    }else
    {
      if(purchase_date884a6?.isDisabled==null)
      {
        setpurchase_date884a6({...purchase_date884a6,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expiry_date")){
        setexpiry_date74df0({...expiry_date74df0,isDisabled:true});

    }else
    {
      if(expiry_date74df0?.isDisabled==null)
      {
        setexpiry_date74df0({...expiry_date74df0,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("support_expiry")){
        setsupport_expirybfd9e({...support_expirybfd9e,isDisabled:true});

    }else
    {
      if(support_expirybfd9e?.isDisabled==null)
      {
        setsupport_expirybfd9e({...support_expirybfd9e,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cost")){
        setcost2568f({...cost2568f,isDisabled:true});

    }else
    {
      if(cost2568f?.isDisabled==null)
      {
        setcost2568f({...cost2568f,isDisabled:false});
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
        codeStates['validity_financial_details_group'] = validity_financial_details_groupb8a9f,
        codeStates['setvalidity_financial_details_group'] = setvalidity_financial_details_groupb8a9f,
        codeStates['validity_financial_details_groupb8a9f'] = validity_financial_details_groupb8a9fProps,
        codeStates['setvalidity_financial_details_groupb8a9f'] = setvalidity_financial_details_groupb8a9fProps,
        codeStates['validity_financial_details'] = validity_financial_details9259f,
        codeStates['setvalidity_financial_details'] = setvalidity_financial_details9259f,
        codeStates['purchase_date'] = purchase_date884a6,
        codeStates['setpurchase_date'] = setpurchase_date884a6,
        codeStates['expiry_date'] = expiry_date74df0,
        codeStates['setexpiry_date'] = setexpiry_date74df0,
        codeStates['support_expiry'] = support_expirybfd9e,
        codeStates['setsupport_expiry'] = setsupport_expirybfd9e,
        codeStates['cost'] = cost2568f,
        codeStates['setcost'] = setcost2568f,

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
        codeStates['validity_financial_details_group'] = validity_financial_details_groupb8a9f,
        codeStates['setvalidity_financial_details_group'] = setvalidity_financial_details_groupb8a9f,
        codeStates['validity_financial_details_groupb8a9f'] = validity_financial_details_groupb8a9fProps,
        codeStates['setvalidity_financial_details_groupb8a9f'] = setvalidity_financial_details_groupb8a9fProps,
        codeStates['validity_financial_details'] = validity_financial_details9259f,
        codeStates['setvalidity_financial_details'] = setvalidity_financial_details9259f,
        codeStates['purchase_date'] = purchase_date884a6,
        codeStates['setpurchase_date'] = setpurchase_date884a6,
        codeStates['expiry_date'] = expiry_date74df0,
        codeStates['setexpiry_date'] = setexpiry_date74df0,
        codeStates['support_expiry'] = support_expirybfd9e,
        codeStates['setsupport_expiry'] = setsupport_expirybfd9e,
        codeStates['cost'] = cost2568f,
        codeStates['setcost'] = setcost2568f,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const validity_financial_details_groupb8a9fRef = useRef<any>(null);
  const handleClearSearch = () => {
    validity_financial_details_groupb8a9fRef.current?.setSearchParams();
    validity_financial_details_groupb8a9fRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(validity_financial_details_groupb8a9f) && Object.keys(validity_financial_details_groupb8a9f)?.length>0)
      {
        setvalidity_financial_details_groupb8a9f({})
      }
    }else 
      prevRefreshRef.current= true
  }, [validity_financial_details_groupb8a9fProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '60 / 95',
      
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
          {allowedControls.includes("validity_financial_details") ?<Textvalidity_financial_details   /* 9259f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("purchase_date") ?<TextInputpurchase_date   /* 884a6 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("expiry_date") ?<TextInputexpiry_date   /* 74df0 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("support_expiry") ?<TextInputsupport_expiry   /* bfd9e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cost") ?<TextInputcost   /* 2568f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupvalidity_financial_details_group
