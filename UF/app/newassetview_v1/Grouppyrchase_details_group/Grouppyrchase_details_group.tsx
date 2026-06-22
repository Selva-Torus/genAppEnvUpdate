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
import TextInputvendor_name  from "./TextInputvendor_name";
import TextInputpurchase_cost  from "./TextInputpurchase_cost";
import TextInputcurrency  from "./TextInputcurrency";
import TextInputpurchase_date  from "./TextInputpurchase_date";
import TextInputwarranty_expiry  from "./TextInputwarranty_expiry";
import TextInputdepreciation_rate  from "./TextInputdepreciation_rate";
import TextInputsalvage_value  from "./TextInputsalvage_value";
import TextInputcurrent_value  from "./TextInputcurrent_value";
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
  const {dfd_assets_v1Props, setdfd_assets_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetdoctable_v1Props, setdfd_assetdoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "purchase_details_text",
      "vendor_name",
      "purchase_cost",
      "currency",
      "purchase_date",
      "warranty_expiry",
      "depreciation_rate",
      "salvage_value",
      "current_value"
    ],
    "allowedGroups": [
      "canvas",
      "new_asset_group",
      "asset_info_group",
      "classification_group",
      "additional_details_group",
      "pyrchase_details_group",
      "disposal_details_group"
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
      "depreciation_rate",
      "salvage_value",
      "current_value"
    ],
    "allowedGroups": [
      "canvas",
      "new_asset_group",
      "asset_info_group",
      "classification_group",
      "additional_details_group",
      "pyrchase_details_group",
      "disposal_details_group"
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
  const {new_asset_group3261e, setnew_asset_group3261e}= useContext(TotalContext) as TotalContextProps;
  const {new_asset_group3261eProps, setnew_asset_group3261eProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupcc113, setasset_info_groupcc113}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupcc113Props, setasset_info_groupcc113Props}= useContext(TotalContext) as TotalContextProps;
  const {classification_groupd9d65, setclassification_groupd9d65}= useContext(TotalContext) as TotalContextProps;
  const {classification_groupd9d65Props, setclassification_groupd9d65Props}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_groupaff35, setadditional_details_groupaff35}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_groupaff35Props, setadditional_details_groupaff35Props}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_groupc3900, setpyrchase_details_groupc3900}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_groupc3900Props, setpyrchase_details_groupc3900Props}= useContext(TotalContext) as TotalContextProps;
  const {purchase_details_text52695, setpurchase_details_text52695}= useContext(TotalContext) as TotalContextProps;
  const {vendor_name1f183, setvendor_name1f183}= useContext(TotalContext) as TotalContextProps;
  const {purchase_cost899f9, setpurchase_cost899f9}= useContext(TotalContext) as TotalContextProps;
  const {currency0f0b1, setcurrency0f0b1}= useContext(TotalContext) as TotalContextProps;
  const {purchase_date9a646, setpurchase_date9a646}= useContext(TotalContext) as TotalContextProps;
  const {warranty_expirye6615, setwarranty_expirye6615}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_ratea6497, setdepreciation_ratea6497}= useContext(TotalContext) as TotalContextProps;
  const {salvage_value9adb6, setsalvage_value9adb6}= useContext(TotalContext) as TotalContextProps;
  const {current_value8e31d, setcurrent_value8e31d}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_group67f77, setdisposal_details_group67f77}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_group67f77Props, setdisposal_details_group67f77Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {newassetview_v1, setnewassetview_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:newAssetView:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "50a619a1af5a843efc63dd18a4ac3900");
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
    setpyrchase_details_groupc3900Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("purchase_details_text")){
        setpurchase_details_text52695({...purchase_details_text52695,isDisabled:true});

    }else
    {
      if(purchase_details_text52695?.isDisabled==null)
      {
        setpurchase_details_text52695({...purchase_details_text52695,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("vendor_name")){
        setvendor_name1f183({...vendor_name1f183,isDisabled:true});

    }else
    {
      if(vendor_name1f183?.isDisabled==null)
      {
        setvendor_name1f183({...vendor_name1f183,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("purchase_cost")){
        setpurchase_cost899f9({...purchase_cost899f9,isDisabled:true});

    }else
    {
      if(purchase_cost899f9?.isDisabled==null)
      {
        setpurchase_cost899f9({...purchase_cost899f9,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("currency")){
        setcurrency0f0b1({...currency0f0b1,isDisabled:true});

    }else
    {
      if(currency0f0b1?.isDisabled==null)
      {
        setcurrency0f0b1({...currency0f0b1,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("purchase_date")){
        setpurchase_date9a646({...purchase_date9a646,isDisabled:true});

    }else
    {
      if(purchase_date9a646?.isDisabled==null)
      {
        setpurchase_date9a646({...purchase_date9a646,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("warranty_expiry")){
        setwarranty_expirye6615({...warranty_expirye6615,isDisabled:true});

    }else
    {
      if(warranty_expirye6615?.isDisabled==null)
      {
        setwarranty_expirye6615({...warranty_expirye6615,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("depreciation_rate")){
        setdepreciation_ratea6497({...depreciation_ratea6497,isDisabled:true});

    }else
    {
      if(depreciation_ratea6497?.isDisabled==null)
      {
        setdepreciation_ratea6497({...depreciation_ratea6497,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("salvage_value")){
        setsalvage_value9adb6({...salvage_value9adb6,isDisabled:true});

    }else
    {
      if(salvage_value9adb6?.isDisabled==null)
      {
        setsalvage_value9adb6({...salvage_value9adb6,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("current_value")){
        setcurrent_value8e31d({...current_value8e31d,isDisabled:true});

    }else
    {
      if(current_value8e31d?.isDisabled==null)
      {
        setcurrent_value8e31d({...current_value8e31d,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_asset_group'] = new_asset_group3261e,
        codeStates['setnew_asset_group'] = setnew_asset_group3261e,
        codeStates['new_asset_group3261e'] = new_asset_group3261eProps,
        codeStates['setnew_asset_group3261e'] = setnew_asset_group3261eProps,
        codeStates['asset_info_group'] = asset_info_groupcc113,
        codeStates['setasset_info_group'] = setasset_info_groupcc113,
        codeStates['asset_info_groupcc113'] = asset_info_groupcc113Props,
        codeStates['setasset_info_groupcc113'] = setasset_info_groupcc113Props,
        codeStates['classification_group'] = classification_groupd9d65,
        codeStates['setclassification_group'] = setclassification_groupd9d65,
        codeStates['classification_groupd9d65'] = classification_groupd9d65Props,
        codeStates['setclassification_groupd9d65'] = setclassification_groupd9d65Props,
        codeStates['additional_details_group'] = additional_details_groupaff35,
        codeStates['setadditional_details_group'] = setadditional_details_groupaff35,
        codeStates['additional_details_groupaff35'] = additional_details_groupaff35Props,
        codeStates['setadditional_details_groupaff35'] = setadditional_details_groupaff35Props,
        codeStates['pyrchase_details_group'] = pyrchase_details_groupc3900,
        codeStates['setpyrchase_details_group'] = setpyrchase_details_groupc3900,
        codeStates['pyrchase_details_groupc3900'] = pyrchase_details_groupc3900Props,
        codeStates['setpyrchase_details_groupc3900'] = setpyrchase_details_groupc3900Props,
        codeStates['purchase_details_text'] = purchase_details_text52695,
        codeStates['setpurchase_details_text'] = setpurchase_details_text52695,
        codeStates['vendor_name'] = vendor_name1f183,
        codeStates['setvendor_name'] = setvendor_name1f183,
        codeStates['purchase_cost'] = purchase_cost899f9,
        codeStates['setpurchase_cost'] = setpurchase_cost899f9,
        codeStates['currency'] = currency0f0b1,
        codeStates['setcurrency'] = setcurrency0f0b1,
        codeStates['purchase_date'] = purchase_date9a646,
        codeStates['setpurchase_date'] = setpurchase_date9a646,
        codeStates['warranty_expiry'] = warranty_expirye6615,
        codeStates['setwarranty_expiry'] = setwarranty_expirye6615,
        codeStates['depreciation_rate'] = depreciation_ratea6497,
        codeStates['setdepreciation_rate'] = setdepreciation_ratea6497,
        codeStates['salvage_value'] = salvage_value9adb6,
        codeStates['setsalvage_value'] = setsalvage_value9adb6,
        codeStates['current_value'] = current_value8e31d,
        codeStates['setcurrent_value'] = setcurrent_value8e31d,
        codeStates['disposal_details_group'] = disposal_details_group67f77,
        codeStates['setdisposal_details_group'] = setdisposal_details_group67f77,
        codeStates['disposal_details_group67f77'] = disposal_details_group67f77Props,
        codeStates['setdisposal_details_group67f77'] = setdisposal_details_group67f77Props,

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
        codeStates['new_asset_group'] = new_asset_group3261e,
        codeStates['setnew_asset_group'] = setnew_asset_group3261e,
        codeStates['new_asset_group3261e'] = new_asset_group3261eProps,
        codeStates['setnew_asset_group3261e'] = setnew_asset_group3261eProps,
        codeStates['asset_info_group'] = asset_info_groupcc113,
        codeStates['setasset_info_group'] = setasset_info_groupcc113,
        codeStates['asset_info_groupcc113'] = asset_info_groupcc113Props,
        codeStates['setasset_info_groupcc113'] = setasset_info_groupcc113Props,
        codeStates['classification_group'] = classification_groupd9d65,
        codeStates['setclassification_group'] = setclassification_groupd9d65,
        codeStates['classification_groupd9d65'] = classification_groupd9d65Props,
        codeStates['setclassification_groupd9d65'] = setclassification_groupd9d65Props,
        codeStates['additional_details_group'] = additional_details_groupaff35,
        codeStates['setadditional_details_group'] = setadditional_details_groupaff35,
        codeStates['additional_details_groupaff35'] = additional_details_groupaff35Props,
        codeStates['setadditional_details_groupaff35'] = setadditional_details_groupaff35Props,
        codeStates['pyrchase_details_group'] = pyrchase_details_groupc3900,
        codeStates['setpyrchase_details_group'] = setpyrchase_details_groupc3900,
        codeStates['pyrchase_details_groupc3900'] = pyrchase_details_groupc3900Props,
        codeStates['setpyrchase_details_groupc3900'] = setpyrchase_details_groupc3900Props,
        codeStates['purchase_details_text'] = purchase_details_text52695,
        codeStates['setpurchase_details_text'] = setpurchase_details_text52695,
        codeStates['vendor_name'] = vendor_name1f183,
        codeStates['setvendor_name'] = setvendor_name1f183,
        codeStates['purchase_cost'] = purchase_cost899f9,
        codeStates['setpurchase_cost'] = setpurchase_cost899f9,
        codeStates['currency'] = currency0f0b1,
        codeStates['setcurrency'] = setcurrency0f0b1,
        codeStates['purchase_date'] = purchase_date9a646,
        codeStates['setpurchase_date'] = setpurchase_date9a646,
        codeStates['warranty_expiry'] = warranty_expirye6615,
        codeStates['setwarranty_expiry'] = setwarranty_expirye6615,
        codeStates['depreciation_rate'] = depreciation_ratea6497,
        codeStates['setdepreciation_rate'] = setdepreciation_ratea6497,
        codeStates['salvage_value'] = salvage_value9adb6,
        codeStates['setsalvage_value'] = setsalvage_value9adb6,
        codeStates['current_value'] = current_value8e31d,
        codeStates['setcurrent_value'] = setcurrent_value8e31d,
        codeStates['disposal_details_group'] = disposal_details_group67f77,
        codeStates['setdisposal_details_group'] = setdisposal_details_group67f77,
        codeStates['disposal_details_group67f77'] = disposal_details_group67f77Props,
        codeStates['setdisposal_details_group67f77'] = setdisposal_details_group67f77Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const pyrchase_details_groupc3900Ref = useRef<any>(null);
  const handleClearSearch = () => {
    pyrchase_details_groupc3900Ref.current?.setSearchParams();
    pyrchase_details_groupc3900Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(pyrchase_details_groupc3900) && Object.keys(pyrchase_details_groupc3900)?.length>0)
      {
        setpyrchase_details_groupc3900({})
      }
    }else 
      prevRefreshRef.current= true
  }, [pyrchase_details_groupc3900Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '100 / 137',
      
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
          {allowedControls.includes("purchase_details_text") ?<Textpurchase_details_text   /* 52695 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("vendor_name") ?<TextInputvendor_name   /* 1f183 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("purchase_cost") ?<TextInputpurchase_cost   /* 899f9 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("currency") ?<TextInputcurrency   /* 0f0b1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("purchase_date") ?<TextInputpurchase_date   /* 9a646 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("warranty_expiry") ?<TextInputwarranty_expiry   /* e6615 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("depreciation_rate") ?<TextInputdepreciation_rate   /* a6497 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("salvage_value") ?<TextInputsalvage_value   /* 9adb6 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("current_value") ?<TextInputcurrent_value   /* 8e31d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouppyrchase_details_group
