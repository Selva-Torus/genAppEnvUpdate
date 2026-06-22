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
import Dividerhw_cat_divider  from "./Dividerhw_cat_divider";
import Textsc_icon  from "./Textsc_icon";
import Texthardware_category_text  from "./Texthardware_category_text";
import Texthardware_category  from "./Texthardware_category";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouphardware_category_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetcategory_v1Props, setdfd_assetcategory_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetcategorycards_v1Props, setdfd_assetcategorycards_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "hw_cat_divider",
      "sc_icon",
      "hardware_category_text",
      "hardware_category"
    ],
    "allowedGroups": [
      "canvas",
      "asset_dashboard_group",
      "total_asset_group",
      "software_category_group",
      "hardware_category_group",
      "req_maint_group",
      "cat_group",
      "category_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "hw_cat_divider",
      "sc_icon",
      "hardware_category_text",
      "hardware_category"
    ],
    "allowedGroups": [
      "canvas",
      "asset_dashboard_group",
      "total_asset_group",
      "software_category_group",
      "hardware_category_group",
      "req_maint_group",
      "cat_group",
      "category_table"
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
  const {asset_dashboard_group485d3, setasset_dashboard_group485d3}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group485d3Props, setasset_dashboard_group485d3Props}= useContext(TotalContext) as TotalContextProps;
  const {total_asset_groupfe2e6, settotal_asset_groupfe2e6}= useContext(TotalContext) as TotalContextProps;
  const {total_asset_groupfe2e6Props, settotal_asset_groupfe2e6Props}= useContext(TotalContext) as TotalContextProps;
  const {software_category_group6e622, setsoftware_category_group6e622}= useContext(TotalContext) as TotalContextProps;
  const {software_category_group6e622Props, setsoftware_category_group6e622Props}= useContext(TotalContext) as TotalContextProps;
  const {hardware_category_groupfcf3f, sethardware_category_groupfcf3f}= useContext(TotalContext) as TotalContextProps;
  const {hardware_category_groupfcf3fProps, sethardware_category_groupfcf3fProps}= useContext(TotalContext) as TotalContextProps;
  const {hw_cat_divider1452f, sethw_cat_divider1452f}= useContext(TotalContext) as TotalContextProps;
  const {sc_iconbaaa3, setsc_iconbaaa3}= useContext(TotalContext) as TotalContextProps;
  const {hardware_category_text66f11, sethardware_category_text66f11}= useContext(TotalContext) as TotalContextProps;
  const {hardware_categoryad98e, sethardware_categoryad98e}= useContext(TotalContext) as TotalContextProps;
  const {req_maint_groupcf317, setreq_maint_groupcf317}= useContext(TotalContext) as TotalContextProps;
  const {req_maint_groupcf317Props, setreq_maint_groupcf317Props}= useContext(TotalContext) as TotalContextProps;
  const {cat_groupe0f50, setcat_groupe0f50}= useContext(TotalContext) as TotalContextProps;
  const {cat_groupe0f50Props, setcat_groupe0f50Props}= useContext(TotalContext) as TotalContextProps;
  const {category_table3e4ac, setcategory_table3e4ac}= useContext(TotalContext) as TotalContextProps;
  const {category_table3e4acProps, setcategory_table3e4acProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assetcategory_v1, setassetcategory_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1',
    [user],
    'GroupHardwareCategoryGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "0c52b0a0fa6b481fa319022b69efcf3f");
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
    sethardware_category_groupfcf3fProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("hw_cat_divider")){
        sethw_cat_divider1452f({...hw_cat_divider1452f,isDisabled:true});

    }else
    {
      if(hw_cat_divider1452f?.isDisabled==null)
      {
        sethw_cat_divider1452f({...hw_cat_divider1452f,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sc_icon")){
        setsc_iconbaaa3({...sc_iconbaaa3,isDisabled:true});

    }else
    {
      if(sc_iconbaaa3?.isDisabled==null)
      {
        setsc_iconbaaa3({...sc_iconbaaa3,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("hardware_category_text")){
        sethardware_category_text66f11({...hardware_category_text66f11,isDisabled:true});

    }else
    {
      if(hardware_category_text66f11?.isDisabled==null)
      {
        sethardware_category_text66f11({...hardware_category_text66f11,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("hardware_category")){
        sethardware_categoryad98e({...hardware_categoryad98e,isDisabled:true});

    }else
    {
      if(hardware_categoryad98e?.isDisabled==null)
      {
        sethardware_categoryad98e({...hardware_categoryad98e,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['asset_dashboard_group'] = asset_dashboard_group485d3,
        codeStates['setasset_dashboard_group'] = setasset_dashboard_group485d3,
        codeStates['asset_dashboard_group485d3'] = asset_dashboard_group485d3Props,
        codeStates['setasset_dashboard_group485d3'] = setasset_dashboard_group485d3Props,
        codeStates['total_asset_group'] = total_asset_groupfe2e6,
        codeStates['settotal_asset_group'] = settotal_asset_groupfe2e6,
        codeStates['total_asset_groupfe2e6'] = total_asset_groupfe2e6Props,
        codeStates['settotal_asset_groupfe2e6'] = settotal_asset_groupfe2e6Props,
        codeStates['software_category_group'] = software_category_group6e622,
        codeStates['setsoftware_category_group'] = setsoftware_category_group6e622,
        codeStates['software_category_group6e622'] = software_category_group6e622Props,
        codeStates['setsoftware_category_group6e622'] = setsoftware_category_group6e622Props,
        codeStates['hardware_category_group'] = hardware_category_groupfcf3f,
        codeStates['sethardware_category_group'] = sethardware_category_groupfcf3f,
        codeStates['hardware_category_groupfcf3f'] = hardware_category_groupfcf3fProps,
        codeStates['sethardware_category_groupfcf3f'] = sethardware_category_groupfcf3fProps,
        codeStates['hw_cat_divider'] = hw_cat_divider1452f,
        codeStates['sethw_cat_divider'] = sethw_cat_divider1452f,
        codeStates['sc_icon'] = sc_iconbaaa3,
        codeStates['setsc_icon'] = setsc_iconbaaa3,
        codeStates['hardware_category_text'] = hardware_category_text66f11,
        codeStates['sethardware_category_text'] = sethardware_category_text66f11,
        codeStates['hardware_category'] = hardware_categoryad98e,
        codeStates['sethardware_category'] = sethardware_categoryad98e,
        codeStates['req_maint_group'] = req_maint_groupcf317,
        codeStates['setreq_maint_group'] = setreq_maint_groupcf317,
        codeStates['req_maint_groupcf317'] = req_maint_groupcf317Props,
        codeStates['setreq_maint_groupcf317'] = setreq_maint_groupcf317Props,
        codeStates['cat_group'] = cat_groupe0f50,
        codeStates['setcat_group'] = setcat_groupe0f50,
        codeStates['cat_groupe0f50'] = cat_groupe0f50Props,
        codeStates['setcat_groupe0f50'] = setcat_groupe0f50Props,
        codeStates['category_table'] = category_table3e4ac,
        codeStates['setcategory_table'] = setcategory_table3e4ac,
        codeStates['category_table3e4ac'] = category_table3e4acProps,
        codeStates['setcategory_table3e4ac'] = setcategory_table3e4acProps,

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
        codeStates['asset_dashboard_group'] = asset_dashboard_group485d3,
        codeStates['setasset_dashboard_group'] = setasset_dashboard_group485d3,
        codeStates['asset_dashboard_group485d3'] = asset_dashboard_group485d3Props,
        codeStates['setasset_dashboard_group485d3'] = setasset_dashboard_group485d3Props,
        codeStates['total_asset_group'] = total_asset_groupfe2e6,
        codeStates['settotal_asset_group'] = settotal_asset_groupfe2e6,
        codeStates['total_asset_groupfe2e6'] = total_asset_groupfe2e6Props,
        codeStates['settotal_asset_groupfe2e6'] = settotal_asset_groupfe2e6Props,
        codeStates['software_category_group'] = software_category_group6e622,
        codeStates['setsoftware_category_group'] = setsoftware_category_group6e622,
        codeStates['software_category_group6e622'] = software_category_group6e622Props,
        codeStates['setsoftware_category_group6e622'] = setsoftware_category_group6e622Props,
        codeStates['hardware_category_group'] = hardware_category_groupfcf3f,
        codeStates['sethardware_category_group'] = sethardware_category_groupfcf3f,
        codeStates['hardware_category_groupfcf3f'] = hardware_category_groupfcf3fProps,
        codeStates['sethardware_category_groupfcf3f'] = sethardware_category_groupfcf3fProps,
        codeStates['hw_cat_divider'] = hw_cat_divider1452f,
        codeStates['sethw_cat_divider'] = sethw_cat_divider1452f,
        codeStates['sc_icon'] = sc_iconbaaa3,
        codeStates['setsc_icon'] = setsc_iconbaaa3,
        codeStates['hardware_category_text'] = hardware_category_text66f11,
        codeStates['sethardware_category_text'] = sethardware_category_text66f11,
        codeStates['hardware_category'] = hardware_categoryad98e,
        codeStates['sethardware_category'] = sethardware_categoryad98e,
        codeStates['req_maint_group'] = req_maint_groupcf317,
        codeStates['setreq_maint_group'] = setreq_maint_groupcf317,
        codeStates['req_maint_groupcf317'] = req_maint_groupcf317Props,
        codeStates['setreq_maint_groupcf317'] = setreq_maint_groupcf317Props,
        codeStates['cat_group'] = cat_groupe0f50,
        codeStates['setcat_group'] = setcat_groupe0f50,
        codeStates['cat_groupe0f50'] = cat_groupe0f50Props,
        codeStates['setcat_groupe0f50'] = setcat_groupe0f50Props,
        codeStates['category_table'] = category_table3e4ac,
        codeStates['setcategory_table'] = setcategory_table3e4ac,
        codeStates['category_table3e4ac'] = category_table3e4acProps,
        codeStates['setcategory_table3e4ac'] = setcategory_table3e4acProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const hardware_category_groupfcf3fRef = useRef<any>(null);
  const handleClearSearch = () => {
    hardware_category_groupfcf3fRef.current?.setSearchParams();
    hardware_category_groupfcf3fRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(hardware_category_groupfcf3f) && Object.keys(hardware_category_groupfcf3f)?.length>0)
      {
        sethardware_category_groupfcf3f({})
      }
    }else 
      prevRefreshRef.current= true
  }, [hardware_category_groupfcf3fProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '13 / 19',
        gridRow: '1 / 20',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 !rounded-lg !pl-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
        {allowedControls.includes("hw_cat_divider") ?<Dividerhw_cat_divider   /* 1452f */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("sc_icon") ?<Textsc_icon   /* baaa3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("hardware_category_text") ?<Texthardware_category_text   /* 66f11 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("hardware_category") ?<Texthardware_category   /* ad98e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouphardware_category_group
