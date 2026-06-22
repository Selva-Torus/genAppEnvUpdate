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
import Grouptotal_asset_group  from "../Grouptotal_asset_group/Grouptotal_asset_group";
import Groupsoftware_category_group  from "../Groupsoftware_category_group/Groupsoftware_category_group";
import Grouphardware_category_group  from "../Grouphardware_category_group/Grouphardware_category_group";
import Groupreq_maint_group  from "../Groupreq_maint_group/Groupreq_maint_group";
import Groupcat_group  from "../Groupcat_group/Groupcat_group";
import Groupcategory_table  from "../Groupcategory_table/Groupcategory_table";
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
import Buttonsearch  from "./Buttonsearch";
import Buttonbutton_add_category  from "./Buttonbutton_add_category";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupasset_dashboard_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "search",
      "button_add_category"
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
      "search",
      "button_add_category"
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
  const {req_maint_groupcf317, setreq_maint_groupcf317}= useContext(TotalContext) as TotalContextProps;
  const {req_maint_groupcf317Props, setreq_maint_groupcf317Props}= useContext(TotalContext) as TotalContextProps;
  const {cat_groupe0f50, setcat_groupe0f50}= useContext(TotalContext) as TotalContextProps;
  const {cat_groupe0f50Props, setcat_groupe0f50Props}= useContext(TotalContext) as TotalContextProps;
  const {search48da3, setsearch48da3}= useContext(TotalContext) as TotalContextProps;
  const {button_add_category57a00, setbutton_add_category57a00}= useContext(TotalContext) as TotalContextProps;
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
    'GroupAssetDashboardGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "b5cbd87dbe35c27d716ac84d374485d3");
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
    setasset_dashboard_group485d3Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("total_asset_group")){
        settotal_asset_groupfe2e6({...total_asset_groupfe2e6,isDisabled:true});

    }else
    {
      if(total_asset_groupfe2e6?.isDisabled==null)
      {
        settotal_asset_groupfe2e6({...total_asset_groupfe2e6,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("software_category_group")){
        setsoftware_category_group6e622({...software_category_group6e622,isDisabled:true});

    }else
    {
      if(software_category_group6e622?.isDisabled==null)
      {
        setsoftware_category_group6e622({...software_category_group6e622,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("hardware_category_group")){
        sethardware_category_groupfcf3f({...hardware_category_groupfcf3f,isDisabled:true});

    }else
    {
      if(hardware_category_groupfcf3f?.isDisabled==null)
      {
        sethardware_category_groupfcf3f({...hardware_category_groupfcf3f,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("req_maint_group")){
        setreq_maint_groupcf317({...req_maint_groupcf317,isDisabled:true});

    }else
    {
      if(req_maint_groupcf317?.isDisabled==null)
      {
        setreq_maint_groupcf317({...req_maint_groupcf317,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cat_group")){
        setcat_groupe0f50({...cat_groupe0f50,isDisabled:true});

    }else
    {
      if(cat_groupe0f50?.isDisabled==null)
      {
        setcat_groupe0f50({...cat_groupe0f50,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search")){
        setsearch48da3({...search48da3,isDisabled:true});

    }else
    {
      if(search48da3?.isDisabled==null)
      {
        setsearch48da3({...search48da3,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("button_add_category")){
        setbutton_add_category57a00({...button_add_category57a00,isDisabled:true});

    }else
    {
      if(button_add_category57a00?.isDisabled==null)
      {
        setbutton_add_category57a00({...button_add_category57a00,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_table")){
        setcategory_table3e4ac({...category_table3e4ac,isDisabled:true});

    }else
    {
      if(category_table3e4ac?.isDisabled==null)
      {
        setcategory_table3e4ac({...category_table3e4ac,isDisabled:false});
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
        codeStates['req_maint_group'] = req_maint_groupcf317,
        codeStates['setreq_maint_group'] = setreq_maint_groupcf317,
        codeStates['req_maint_groupcf317'] = req_maint_groupcf317Props,
        codeStates['setreq_maint_groupcf317'] = setreq_maint_groupcf317Props,
        codeStates['cat_group'] = cat_groupe0f50,
        codeStates['setcat_group'] = setcat_groupe0f50,
        codeStates['cat_groupe0f50'] = cat_groupe0f50Props,
        codeStates['setcat_groupe0f50'] = setcat_groupe0f50Props,
        codeStates['search'] = search48da3,
        codeStates['setsearch'] = setsearch48da3,
        codeStates['button_add_category'] = button_add_category57a00,
        codeStates['setbutton_add_category'] = setbutton_add_category57a00,
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
        codeStates['req_maint_group'] = req_maint_groupcf317,
        codeStates['setreq_maint_group'] = setreq_maint_groupcf317,
        codeStates['req_maint_groupcf317'] = req_maint_groupcf317Props,
        codeStates['setreq_maint_groupcf317'] = setreq_maint_groupcf317Props,
        codeStates['cat_group'] = cat_groupe0f50,
        codeStates['setcat_group'] = setcat_groupe0f50,
        codeStates['cat_groupe0f50'] = cat_groupe0f50Props,
        codeStates['setcat_groupe0f50'] = setcat_groupe0f50Props,
        codeStates['search'] = search48da3,
        codeStates['setsearch'] = setsearch48da3,
        codeStates['button_add_category'] = button_add_category57a00,
        codeStates['setbutton_add_category'] = setbutton_add_category57a00,
        codeStates['category_table'] = category_table3e4ac,
        codeStates['setcategory_table'] = setcategory_table3e4ac,
        codeStates['category_table3e4ac'] = category_table3e4acProps,
        codeStates['setcategory_table3e4ac'] = setcategory_table3e4acProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const asset_dashboard_group485d3Ref = useRef<any>(null);
  const handleClearSearch = () => {
    asset_dashboard_group485d3Ref.current?.setSearchParams();
    asset_dashboard_group485d3Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(asset_dashboard_group485d3) && Object.keys(asset_dashboard_group485d3)?.length>0)
      {
        setasset_dashboard_group485d3({})
      }
    }else 
      prevRefreshRef.current= true
  }, [asset_dashboard_group485d3Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 127',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '10px',
        backgroundColor:'#f0f2f7',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
        {allowedComponent.includes("total_asset_group")  &&<Grouptotal_asset_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("software_category_group")  &&<Groupsoftware_category_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("hardware_category_group")  &&<Grouphardware_category_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("req_maint_group")  &&<Groupreq_maint_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("cat_group")  &&<Groupcat_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("category_table")  &&<Groupcategory_table  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {        ((ruleData?.length>0 && "search" in ButtonGoRuleData)?ButtonGoRuleData["search"]:true) && 
          allowedControls.includes("search")  ?            <Buttonsearch tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "button_add_category" in ButtonGoRuleData)?ButtonGoRuleData["button_add_category"]:true) && 
          allowedControls.includes("button_add_category")  ?            <Buttonbutton_add_category tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupasset_dashboard_group
