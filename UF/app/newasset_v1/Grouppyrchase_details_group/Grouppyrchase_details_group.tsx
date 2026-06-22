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
import Textpurchase_details_text  from "./Textpurchase_details_text";
import Dropdownvendor_name  from "./Dropdownvendor_name";
import TextInputpurchase_cost  from "./TextInputpurchase_cost";
import Dropdowncurrency  from "./Dropdowncurrency";
import DatePickerpurchase_date  from "./DatePickerpurchase_date";
import DatePickerwarranty_expiry  from "./DatePickerwarranty_expiry";
import TextInputcurrent_value  from "./TextInputcurrent_value";
import TextInputdepreciation_rate  from "./TextInputdepreciation_rate";
import TextInputsalvage_value  from "./TextInputsalvage_value";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouppyrchase_details_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assettypecombo_v1Props, setdfd_assettypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetcategorycombo_v1Props, setdfd_assetcategorycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetclassificationcombo_v1Props, setdfd_assetclassificationcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetdataclassificationcombo_v1Props, setdfd_assetdataclassificationcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_ownershiptypecombo_v1Props, setdfd_ownershiptypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetconditioncombo_v1Props, setdfd_assetconditioncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_disposalmethodcombo_v1Props, setdfd_disposalmethodcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_risklevelcombo_v1Props, setdfd_risklevelcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_vendornamecombo_v1Props, setdfd_vendornamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assets_v1Props, setdfd_assets_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_lifecyclestagecombo_v1Props, setdfd_lifecyclestagecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_currencycombo_v1Props, setdfd_currencycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Network Engineer": {
    "allowedControls": [
      "purchase_details_text",
      "vendor_name",
      "purchase_cost",
      "currency",
      "purchase_date",
      "warranty_expiry",
      "current_value",
      "depreciation_rate",
      "salvage_value"
    ],
    "allowedGroups": [
      "canvas",
      "new_asset_group",
      "asset_info_group",
      "classification_group",
      "additional_details_group",
      "pyrchase_details_group",
      "disposal_details_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "purchase_details_text",
      "vendor_name",
      "purchase_cost",
      "currency",
      "purchase_date",
      "warranty_expiry",
      "current_value",
      "depreciation_rate",
      "salvage_value"
    ],
    "allowedGroups": [
      "canvas",
      "new_asset_group",
      "asset_info_group",
      "classification_group",
      "additional_details_group",
      "pyrchase_details_group",
      "disposal_details_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Maker": {
    "allowedControls": [
      "purchase_details_text",
      "vendor_name",
      "purchase_cost",
      "currency",
      "purchase_date",
      "warranty_expiry",
      "current_value",
      "depreciation_rate",
      "salvage_value"
    ],
    "allowedGroups": [
      "canvas",
      "new_asset_group",
      "asset_info_group",
      "classification_group",
      "additional_details_group",
      "pyrchase_details_group",
      "disposal_details_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Network Admin": {
    "allowedControls": [
      "purchase_details_text",
      "vendor_name",
      "purchase_cost",
      "currency",
      "purchase_date",
      "warranty_expiry",
      "current_value",
      "depreciation_rate",
      "salvage_value"
    ],
    "allowedGroups": [
      "canvas",
      "new_asset_group",
      "asset_info_group",
      "classification_group",
      "additional_details_group",
      "pyrchase_details_group",
      "disposal_details_group",
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
  const {new_asset_groupdb5a7, setnew_asset_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {new_asset_groupdb5a7Props, setnew_asset_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupdeeeb, setasset_info_groupdeeeb}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupdeeebProps, setasset_info_groupdeeebProps}= useContext(TotalContext) as TotalContextProps;
  const {classification_group3c6b3, setclassification_group3c6b3}= useContext(TotalContext) as TotalContextProps;
  const {classification_group3c6b3Props, setclassification_group3c6b3Props}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_group8c616, setadditional_details_group8c616}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_group8c616Props, setadditional_details_group8c616Props}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_group76407, setpyrchase_details_group76407}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_group76407Props, setpyrchase_details_group76407Props}= useContext(TotalContext) as TotalContextProps;
  const {purchase_details_textf2780, setpurchase_details_textf2780}= useContext(TotalContext) as TotalContextProps;
  const {vendor_name4190d, setvendor_name4190d}= useContext(TotalContext) as TotalContextProps;
  const {purchase_costff91e, setpurchase_costff91e}= useContext(TotalContext) as TotalContextProps;
  const {currency823ac, setcurrency823ac}= useContext(TotalContext) as TotalContextProps;
  const {purchase_datec1162, setpurchase_datec1162}= useContext(TotalContext) as TotalContextProps;
  const {warranty_expiry1fdec, setwarranty_expiry1fdec}= useContext(TotalContext) as TotalContextProps;
  const {current_value8f6cd, setcurrent_value8f6cd}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_rate8d4a6, setdepreciation_rate8d4a6}= useContext(TotalContext) as TotalContextProps;
  const {salvage_valuef1995, setsalvage_valuef1995}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaffa1, setdisposal_details_groupaffa1}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaffa1Props, setdisposal_details_groupaffa1Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1077f, setdynamicactions1077f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1077fProps, setdynamicactions1077fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {newasset_v1, setnewasset_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:newAsset:AFVK:v1',
    [user],
    'GroupPyrchaseDetailsGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ee1d91659fbf473bb30f690c00976407");
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
    setpyrchase_details_group76407Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("purchase_details_text")){
        setpurchase_details_textf2780({...purchase_details_textf2780,isDisabled:true});

    }else
    {
      if(purchase_details_textf2780?.isDisabled==null)
      {
        setpurchase_details_textf2780({...purchase_details_textf2780,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("vendor_name")){
        setvendor_name4190d({...vendor_name4190d,isDisabled:true});

    }else
    {
      if(vendor_name4190d?.isDisabled==null)
      {
        setvendor_name4190d({...vendor_name4190d,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("purchase_cost")){
        setpurchase_costff91e({...purchase_costff91e,isDisabled:true});

    }else
    {
      if(purchase_costff91e?.isDisabled==null)
      {
        setpurchase_costff91e({...purchase_costff91e,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("currency")){
        setcurrency823ac({...currency823ac,isDisabled:true});

    }else
    {
      if(currency823ac?.isDisabled==null)
      {
        setcurrency823ac({...currency823ac,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("purchase_date")){
        setpurchase_datec1162({...purchase_datec1162,isDisabled:true});

    }else
    {
      if(purchase_datec1162?.isDisabled==null)
      {
        setpurchase_datec1162({...purchase_datec1162,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("warranty_expiry")){
        setwarranty_expiry1fdec({...warranty_expiry1fdec,isDisabled:true});

    }else
    {
      if(warranty_expiry1fdec?.isDisabled==null)
      {
        setwarranty_expiry1fdec({...warranty_expiry1fdec,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("current_value")){
        setcurrent_value8f6cd({...current_value8f6cd,isDisabled:true});

    }else
    {
      if(current_value8f6cd?.isDisabled==null)
      {
        setcurrent_value8f6cd({...current_value8f6cd,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("depreciation_rate")){
        setdepreciation_rate8d4a6({...depreciation_rate8d4a6,isDisabled:true});

    }else
    {
      if(depreciation_rate8d4a6?.isDisabled==null)
      {
        setdepreciation_rate8d4a6({...depreciation_rate8d4a6,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("salvage_value")){
        setsalvage_valuef1995({...salvage_valuef1995,isDisabled:true});

    }else
    {
      if(salvage_valuef1995?.isDisabled==null)
      {
        setsalvage_valuef1995({...salvage_valuef1995,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_asset_group'] = new_asset_groupdb5a7,
        codeStates['setnew_asset_group'] = setnew_asset_groupdb5a7,
        codeStates['new_asset_groupdb5a7'] = new_asset_groupdb5a7Props,
        codeStates['setnew_asset_groupdb5a7'] = setnew_asset_groupdb5a7Props,
        codeStates['asset_info_group'] = asset_info_groupdeeeb,
        codeStates['setasset_info_group'] = setasset_info_groupdeeeb,
        codeStates['asset_info_groupdeeeb'] = asset_info_groupdeeebProps,
        codeStates['setasset_info_groupdeeeb'] = setasset_info_groupdeeebProps,
        codeStates['classification_group'] = classification_group3c6b3,
        codeStates['setclassification_group'] = setclassification_group3c6b3,
        codeStates['classification_group3c6b3'] = classification_group3c6b3Props,
        codeStates['setclassification_group3c6b3'] = setclassification_group3c6b3Props,
        codeStates['additional_details_group'] = additional_details_group8c616,
        codeStates['setadditional_details_group'] = setadditional_details_group8c616,
        codeStates['additional_details_group8c616'] = additional_details_group8c616Props,
        codeStates['setadditional_details_group8c616'] = setadditional_details_group8c616Props,
        codeStates['pyrchase_details_group'] = pyrchase_details_group76407,
        codeStates['setpyrchase_details_group'] = setpyrchase_details_group76407,
        codeStates['pyrchase_details_group76407'] = pyrchase_details_group76407Props,
        codeStates['setpyrchase_details_group76407'] = setpyrchase_details_group76407Props,
        codeStates['purchase_details_text'] = purchase_details_textf2780,
        codeStates['setpurchase_details_text'] = setpurchase_details_textf2780,
        codeStates['vendor_name'] = vendor_name4190d,
        codeStates['setvendor_name'] = setvendor_name4190d,
        codeStates['purchase_cost'] = purchase_costff91e,
        codeStates['setpurchase_cost'] = setpurchase_costff91e,
        codeStates['currency'] = currency823ac,
        codeStates['setcurrency'] = setcurrency823ac,
        codeStates['purchase_date'] = purchase_datec1162,
        codeStates['setpurchase_date'] = setpurchase_datec1162,
        codeStates['warranty_expiry'] = warranty_expiry1fdec,
        codeStates['setwarranty_expiry'] = setwarranty_expiry1fdec,
        codeStates['current_value'] = current_value8f6cd,
        codeStates['setcurrent_value'] = setcurrent_value8f6cd,
        codeStates['depreciation_rate'] = depreciation_rate8d4a6,
        codeStates['setdepreciation_rate'] = setdepreciation_rate8d4a6,
        codeStates['salvage_value'] = salvage_valuef1995,
        codeStates['setsalvage_value'] = setsalvage_valuef1995,
        codeStates['disposal_details_group'] = disposal_details_groupaffa1,
        codeStates['setdisposal_details_group'] = setdisposal_details_groupaffa1,
        codeStates['disposal_details_groupaffa1'] = disposal_details_groupaffa1Props,
        codeStates['setdisposal_details_groupaffa1'] = setdisposal_details_groupaffa1Props,
        codeStates['dynamicactions'] = dynamicactions1077f,
        codeStates['setdynamicactions'] = setdynamicactions1077f,
        codeStates['dynamicactions1077f'] = dynamicactions1077fProps,
        codeStates['setdynamicactions1077f'] = setdynamicactions1077fProps,

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
        codeStates['new_asset_group'] = new_asset_groupdb5a7,
        codeStates['setnew_asset_group'] = setnew_asset_groupdb5a7,
        codeStates['new_asset_groupdb5a7'] = new_asset_groupdb5a7Props,
        codeStates['setnew_asset_groupdb5a7'] = setnew_asset_groupdb5a7Props,
        codeStates['asset_info_group'] = asset_info_groupdeeeb,
        codeStates['setasset_info_group'] = setasset_info_groupdeeeb,
        codeStates['asset_info_groupdeeeb'] = asset_info_groupdeeebProps,
        codeStates['setasset_info_groupdeeeb'] = setasset_info_groupdeeebProps,
        codeStates['classification_group'] = classification_group3c6b3,
        codeStates['setclassification_group'] = setclassification_group3c6b3,
        codeStates['classification_group3c6b3'] = classification_group3c6b3Props,
        codeStates['setclassification_group3c6b3'] = setclassification_group3c6b3Props,
        codeStates['additional_details_group'] = additional_details_group8c616,
        codeStates['setadditional_details_group'] = setadditional_details_group8c616,
        codeStates['additional_details_group8c616'] = additional_details_group8c616Props,
        codeStates['setadditional_details_group8c616'] = setadditional_details_group8c616Props,
        codeStates['pyrchase_details_group'] = pyrchase_details_group76407,
        codeStates['setpyrchase_details_group'] = setpyrchase_details_group76407,
        codeStates['pyrchase_details_group76407'] = pyrchase_details_group76407Props,
        codeStates['setpyrchase_details_group76407'] = setpyrchase_details_group76407Props,
        codeStates['purchase_details_text'] = purchase_details_textf2780,
        codeStates['setpurchase_details_text'] = setpurchase_details_textf2780,
        codeStates['vendor_name'] = vendor_name4190d,
        codeStates['setvendor_name'] = setvendor_name4190d,
        codeStates['purchase_cost'] = purchase_costff91e,
        codeStates['setpurchase_cost'] = setpurchase_costff91e,
        codeStates['currency'] = currency823ac,
        codeStates['setcurrency'] = setcurrency823ac,
        codeStates['purchase_date'] = purchase_datec1162,
        codeStates['setpurchase_date'] = setpurchase_datec1162,
        codeStates['warranty_expiry'] = warranty_expiry1fdec,
        codeStates['setwarranty_expiry'] = setwarranty_expiry1fdec,
        codeStates['current_value'] = current_value8f6cd,
        codeStates['setcurrent_value'] = setcurrent_value8f6cd,
        codeStates['depreciation_rate'] = depreciation_rate8d4a6,
        codeStates['setdepreciation_rate'] = setdepreciation_rate8d4a6,
        codeStates['salvage_value'] = salvage_valuef1995,
        codeStates['setsalvage_value'] = setsalvage_valuef1995,
        codeStates['disposal_details_group'] = disposal_details_groupaffa1,
        codeStates['setdisposal_details_group'] = setdisposal_details_groupaffa1,
        codeStates['disposal_details_groupaffa1'] = disposal_details_groupaffa1Props,
        codeStates['setdisposal_details_groupaffa1'] = setdisposal_details_groupaffa1Props,
        codeStates['dynamicactions'] = dynamicactions1077f,
        codeStates['setdynamicactions'] = setdynamicactions1077f,
        codeStates['dynamicactions1077f'] = dynamicactions1077fProps,
        codeStates['setdynamicactions1077f'] = setdynamicactions1077fProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const pyrchase_details_group76407Ref = useRef<any>(null);
  const handleClearSearch = () => {
    pyrchase_details_group76407Ref.current?.setSearchParams();
    pyrchase_details_group76407Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(pyrchase_details_group76407) && Object.keys(pyrchase_details_group76407)?.length>0)
      {
        setpyrchase_details_group76407({})
      }
    }else 
      prevRefreshRef.current= true
  }, [pyrchase_details_group76407Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '117 / 165',
      
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
          {allowedControls.includes("purchase_details_text") ?<Textpurchase_details_text   /* f2780 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("vendor_name") ?<Dropdownvendor_name   /* 4190d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("purchase_cost") ?<TextInputpurchase_cost   /* ff91e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("currency") ?<Dropdowncurrency   /* 823ac */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("purchase_date") ?<DatePickerpurchase_date   /* c1162 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("warranty_expiry") ?<DatePickerwarranty_expiry   /* 1fdec */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("current_value") ?<TextInputcurrent_value   /* 8f6cd */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("depreciation_rate") ?<TextInputdepreciation_rate   /* 8d4a6 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("salvage_value") ?<TextInputsalvage_value   /* f1995 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouppyrchase_details_group
