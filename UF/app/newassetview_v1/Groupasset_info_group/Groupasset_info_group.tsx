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
import Textbasic_infot_asset_text  from "./Textbasic_infot_asset_text";
import TextInputcategory_name  from "./TextInputcategory_name";
import TextInputasset_type  from "./TextInputasset_type";
import TextInputasset_name  from "./TextInputasset_name";
import TextInputasset_tag  from "./TextInputasset_tag";
import TextInputasset_code  from "./TextInputasset_code";
import TextInputserial_number  from "./TextInputserial_number";
import TextInputmodel_number  from "./TextInputmodel_number";
import TextInputmanufacturer  from "./TextInputmanufacturer";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupasset_info_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "basic_infot_asset_text",
      "category_name",
      "asset_type",
      "asset_name",
      "asset_tag",
      "asset_code",
      "serial_number",
      "model_number",
      "manufacturer"
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
      "basic_infot_asset_text",
      "category_name",
      "asset_type",
      "asset_name",
      "asset_tag",
      "asset_code",
      "serial_number",
      "model_number",
      "manufacturer"
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
  const {basic_infot_asset_text673ff, setbasic_infot_asset_text673ff}= useContext(TotalContext) as TotalContextProps;
  const {category_name2dc3c, setcategory_name2dc3c}= useContext(TotalContext) as TotalContextProps;
  const {asset_typecdf86, setasset_typecdf86}= useContext(TotalContext) as TotalContextProps;
  const {asset_name4044f, setasset_name4044f}= useContext(TotalContext) as TotalContextProps;
  const {asset_tag665c1, setasset_tag665c1}= useContext(TotalContext) as TotalContextProps;
  const {asset_code9d69b, setasset_code9d69b}= useContext(TotalContext) as TotalContextProps;
  const {serial_number67791, setserial_number67791}= useContext(TotalContext) as TotalContextProps;
  const {model_number46a87, setmodel_number46a87}= useContext(TotalContext) as TotalContextProps;
  const {manufacturer825e8, setmanufacturer825e8}= useContext(TotalContext) as TotalContextProps;
  const {classification_groupd9d65, setclassification_groupd9d65}= useContext(TotalContext) as TotalContextProps;
  const {classification_groupd9d65Props, setclassification_groupd9d65Props}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_groupaff35, setadditional_details_groupaff35}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_groupaff35Props, setadditional_details_groupaff35Props}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_groupc3900, setpyrchase_details_groupc3900}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_groupc3900Props, setpyrchase_details_groupc3900Props}= useContext(TotalContext) as TotalContextProps;
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
    'GroupAssetInfoGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "13d6f9aca9f08ad0e2052fe4913cc113");
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
    setasset_info_groupcc113Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("basic_infot_asset_text")){
        setbasic_infot_asset_text673ff({...basic_infot_asset_text673ff,isDisabled:true});

    }else
    {
      if(basic_infot_asset_text673ff?.isDisabled==null)
      {
        setbasic_infot_asset_text673ff({...basic_infot_asset_text673ff,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_name")){
        setcategory_name2dc3c({...category_name2dc3c,isDisabled:true});

    }else
    {
      if(category_name2dc3c?.isDisabled==null)
      {
        setcategory_name2dc3c({...category_name2dc3c,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type")){
        setasset_typecdf86({...asset_typecdf86,isDisabled:true});

    }else
    {
      if(asset_typecdf86?.isDisabled==null)
      {
        setasset_typecdf86({...asset_typecdf86,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name4044f({...asset_name4044f,isDisabled:true});

    }else
    {
      if(asset_name4044f?.isDisabled==null)
      {
        setasset_name4044f({...asset_name4044f,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_tag")){
        setasset_tag665c1({...asset_tag665c1,isDisabled:true});

    }else
    {
      if(asset_tag665c1?.isDisabled==null)
      {
        setasset_tag665c1({...asset_tag665c1,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_code9d69b({...asset_code9d69b,isDisabled:true});

    }else
    {
      if(asset_code9d69b?.isDisabled==null)
      {
        setasset_code9d69b({...asset_code9d69b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("serial_number")){
        setserial_number67791({...serial_number67791,isDisabled:true});

    }else
    {
      if(serial_number67791?.isDisabled==null)
      {
        setserial_number67791({...serial_number67791,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("model_number")){
        setmodel_number46a87({...model_number46a87,isDisabled:true});

    }else
    {
      if(model_number46a87?.isDisabled==null)
      {
        setmodel_number46a87({...model_number46a87,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("manufacturer")){
        setmanufacturer825e8({...manufacturer825e8,isDisabled:true});

    }else
    {
      if(manufacturer825e8?.isDisabled==null)
      {
        setmanufacturer825e8({...manufacturer825e8,isDisabled:false});
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
        codeStates['basic_infot_asset_text'] = basic_infot_asset_text673ff,
        codeStates['setbasic_infot_asset_text'] = setbasic_infot_asset_text673ff,
        codeStates['category_name'] = category_name2dc3c,
        codeStates['setcategory_name'] = setcategory_name2dc3c,
        codeStates['asset_type'] = asset_typecdf86,
        codeStates['setasset_type'] = setasset_typecdf86,
        codeStates['asset_name'] = asset_name4044f,
        codeStates['setasset_name'] = setasset_name4044f,
        codeStates['asset_tag'] = asset_tag665c1,
        codeStates['setasset_tag'] = setasset_tag665c1,
        codeStates['asset_code'] = asset_code9d69b,
        codeStates['setasset_code'] = setasset_code9d69b,
        codeStates['serial_number'] = serial_number67791,
        codeStates['setserial_number'] = setserial_number67791,
        codeStates['model_number'] = model_number46a87,
        codeStates['setmodel_number'] = setmodel_number46a87,
        codeStates['manufacturer'] = manufacturer825e8,
        codeStates['setmanufacturer'] = setmanufacturer825e8,
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
        codeStates['basic_infot_asset_text'] = basic_infot_asset_text673ff,
        codeStates['setbasic_infot_asset_text'] = setbasic_infot_asset_text673ff,
        codeStates['category_name'] = category_name2dc3c,
        codeStates['setcategory_name'] = setcategory_name2dc3c,
        codeStates['asset_type'] = asset_typecdf86,
        codeStates['setasset_type'] = setasset_typecdf86,
        codeStates['asset_name'] = asset_name4044f,
        codeStates['setasset_name'] = setasset_name4044f,
        codeStates['asset_tag'] = asset_tag665c1,
        codeStates['setasset_tag'] = setasset_tag665c1,
        codeStates['asset_code'] = asset_code9d69b,
        codeStates['setasset_code'] = setasset_code9d69b,
        codeStates['serial_number'] = serial_number67791,
        codeStates['setserial_number'] = setserial_number67791,
        codeStates['model_number'] = model_number46a87,
        codeStates['setmodel_number'] = setmodel_number46a87,
        codeStates['manufacturer'] = manufacturer825e8,
        codeStates['setmanufacturer'] = setmanufacturer825e8,
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
        codeStates['disposal_details_group'] = disposal_details_group67f77,
        codeStates['setdisposal_details_group'] = setdisposal_details_group67f77,
        codeStates['disposal_details_group67f77'] = disposal_details_group67f77Props,
        codeStates['setdisposal_details_group67f77'] = setdisposal_details_group67f77Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const asset_info_groupcc113Ref = useRef<any>(null);
  const handleClearSearch = () => {
    asset_info_groupcc113Ref.current?.setSearchParams();
    asset_info_groupcc113Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(asset_info_groupcc113) && Object.keys(asset_info_groupcc113)?.length>0)
      {
        setasset_info_groupcc113({})
      }
    }else 
      prevRefreshRef.current= true
  }, [asset_info_groupcc113Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 37',
      
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
          {allowedControls.includes("basic_infot_asset_text") ?<Textbasic_infot_asset_text   /* 673ff */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("category_name") ?<TextInputcategory_name   /* 2dc3c */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_type") ?<TextInputasset_type   /* cdf86 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<TextInputasset_name   /* 4044f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_tag") ?<TextInputasset_tag   /* 665c1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_code") ?<TextInputasset_code   /* 9d69b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("serial_number") ?<TextInputserial_number   /* 67791 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("model_number") ?<TextInputmodel_number   /* 46a87 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("manufacturer") ?<TextInputmanufacturer   /* 825e8 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupasset_info_group
