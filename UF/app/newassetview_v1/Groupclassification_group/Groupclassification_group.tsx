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
import Textclassification_text  from "./Textclassification_text";
import TextInputclassification  from "./TextInputclassification";
import TextInputdata_classification  from "./TextInputdata_classification";
import TextInputownership_type  from "./TextInputownership_type";
import TextInputlifecycle_stage  from "./TextInputlifecycle_stage";
import TextInputasset_condition  from "./TextInputasset_condition";
import TextInputrisk_level  from "./TextInputrisk_level";
import TextInputlocation  from "./TextInputlocation";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupclassification_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "classification_text",
      "classification",
      "data_classification",
      "ownership_type",
      "lifecycle_stage",
      "asset_condition",
      "risk_level",
      "location"
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
      "classification_text",
      "classification",
      "data_classification",
      "ownership_type",
      "lifecycle_stage",
      "asset_condition",
      "risk_level",
      "location"
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
  const {classification_text91ff0, setclassification_text91ff0}= useContext(TotalContext) as TotalContextProps;
  const {classificationf4888, setclassificationf4888}= useContext(TotalContext) as TotalContextProps;
  const {data_classificationb7d47, setdata_classificationb7d47}= useContext(TotalContext) as TotalContextProps;
  const {ownership_type783c2, setownership_type783c2}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_stage26be5, setlifecycle_stage26be5}= useContext(TotalContext) as TotalContextProps;
  const {asset_condition4d358, setasset_condition4d358}= useContext(TotalContext) as TotalContextProps;
  const {risk_level7f64b, setrisk_level7f64b}= useContext(TotalContext) as TotalContextProps;
  const {location323da, setlocation323da}= useContext(TotalContext) as TotalContextProps;
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
    'GroupClassificationGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f0135763467c6ee90f680c9cf68d9d65");
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
    setclassification_groupd9d65Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("classification_text")){
        setclassification_text91ff0({...classification_text91ff0,isDisabled:true});

    }else
    {
      if(classification_text91ff0?.isDisabled==null)
      {
        setclassification_text91ff0({...classification_text91ff0,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("classification")){
        setclassificationf4888({...classificationf4888,isDisabled:true});

    }else
    {
      if(classificationf4888?.isDisabled==null)
      {
        setclassificationf4888({...classificationf4888,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("data_classification")){
        setdata_classificationb7d47({...data_classificationb7d47,isDisabled:true});

    }else
    {
      if(data_classificationb7d47?.isDisabled==null)
      {
        setdata_classificationb7d47({...data_classificationb7d47,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ownership_type")){
        setownership_type783c2({...ownership_type783c2,isDisabled:true});

    }else
    {
      if(ownership_type783c2?.isDisabled==null)
      {
        setownership_type783c2({...ownership_type783c2,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lifecycle_stage")){
        setlifecycle_stage26be5({...lifecycle_stage26be5,isDisabled:true});

    }else
    {
      if(lifecycle_stage26be5?.isDisabled==null)
      {
        setlifecycle_stage26be5({...lifecycle_stage26be5,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_condition")){
        setasset_condition4d358({...asset_condition4d358,isDisabled:true});

    }else
    {
      if(asset_condition4d358?.isDisabled==null)
      {
        setasset_condition4d358({...asset_condition4d358,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_level")){
        setrisk_level7f64b({...risk_level7f64b,isDisabled:true});

    }else
    {
      if(risk_level7f64b?.isDisabled==null)
      {
        setrisk_level7f64b({...risk_level7f64b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("location")){
        setlocation323da({...location323da,isDisabled:true});

    }else
    {
      if(location323da?.isDisabled==null)
      {
        setlocation323da({...location323da,isDisabled:false});
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
        codeStates['classification_text'] = classification_text91ff0,
        codeStates['setclassification_text'] = setclassification_text91ff0,
        codeStates['classification'] = classificationf4888,
        codeStates['setclassification'] = setclassificationf4888,
        codeStates['data_classification'] = data_classificationb7d47,
        codeStates['setdata_classification'] = setdata_classificationb7d47,
        codeStates['ownership_type'] = ownership_type783c2,
        codeStates['setownership_type'] = setownership_type783c2,
        codeStates['lifecycle_stage'] = lifecycle_stage26be5,
        codeStates['setlifecycle_stage'] = setlifecycle_stage26be5,
        codeStates['asset_condition'] = asset_condition4d358,
        codeStates['setasset_condition'] = setasset_condition4d358,
        codeStates['risk_level'] = risk_level7f64b,
        codeStates['setrisk_level'] = setrisk_level7f64b,
        codeStates['location'] = location323da,
        codeStates['setlocation'] = setlocation323da,
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
        codeStates['classification_group'] = classification_groupd9d65,
        codeStates['setclassification_group'] = setclassification_groupd9d65,
        codeStates['classification_groupd9d65'] = classification_groupd9d65Props,
        codeStates['setclassification_groupd9d65'] = setclassification_groupd9d65Props,
        codeStates['classification_text'] = classification_text91ff0,
        codeStates['setclassification_text'] = setclassification_text91ff0,
        codeStates['classification'] = classificationf4888,
        codeStates['setclassification'] = setclassificationf4888,
        codeStates['data_classification'] = data_classificationb7d47,
        codeStates['setdata_classification'] = setdata_classificationb7d47,
        codeStates['ownership_type'] = ownership_type783c2,
        codeStates['setownership_type'] = setownership_type783c2,
        codeStates['lifecycle_stage'] = lifecycle_stage26be5,
        codeStates['setlifecycle_stage'] = setlifecycle_stage26be5,
        codeStates['asset_condition'] = asset_condition4d358,
        codeStates['setasset_condition'] = setasset_condition4d358,
        codeStates['risk_level'] = risk_level7f64b,
        codeStates['setrisk_level'] = setrisk_level7f64b,
        codeStates['location'] = location323da,
        codeStates['setlocation'] = setlocation323da,
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


  const classification_groupd9d65Ref = useRef<any>(null);
  const handleClearSearch = () => {
    classification_groupd9d65Ref.current?.setSearchParams();
    classification_groupd9d65Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(classification_groupd9d65) && Object.keys(classification_groupd9d65)?.length>0)
      {
        setclassification_groupd9d65({})
      }
    }else 
      prevRefreshRef.current= true
  }, [classification_groupd9d65Props?.refresh,token])


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
          {allowedControls.includes("classification_text") ?<Textclassification_text   /* 91ff0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("classification") ?<TextInputclassification   /* f4888 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("data_classification") ?<TextInputdata_classification   /* b7d47 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("ownership_type") ?<TextInputownership_type   /* 783c2 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("lifecycle_stage") ?<TextInputlifecycle_stage   /* 26be5 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_condition") ?<TextInputasset_condition   /* 4d358 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("risk_level") ?<TextInputrisk_level   /* 7f64b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("location") ?<TextInputlocation   /* 323da */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupclassification_group
