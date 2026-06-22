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
import Tablecategory_table  from './Tablecategory_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcategory_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "acat_id",
      "category_code",
      "asset_prefix",
      "category_name",
      "depreciation_method",
      "useful_life_years",
      "bt_edit",
      "bt_delete",
      "view",
      "bt_add_doc"
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
      "acat_id",
      "category_code",
      "asset_prefix",
      "category_name",
      "depreciation_method",
      "useful_life_years",
      "bt_edit",
      "bt_delete",
      "view",
      "bt_add_doc"
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
  const {category_table3e4ac, setcategory_table3e4ac}= useContext(TotalContext) as TotalContextProps;
  const {category_table3e4acProps, setcategory_table3e4acProps}= useContext(TotalContext) as TotalContextProps;
  const {acat_id37980, setacat_id37980}= useContext(TotalContext) as TotalContextProps;
  const {category_code97856, setcategory_code97856}= useContext(TotalContext) as TotalContextProps;
  const {asset_prefix8b10c, setasset_prefix8b10c}= useContext(TotalContext) as TotalContextProps;
  const {category_name11d7f, setcategory_name11d7f}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_method2b046, setdepreciation_method2b046}= useContext(TotalContext) as TotalContextProps;
  const {useful_life_years73932, setuseful_life_years73932}= useContext(TotalContext) as TotalContextProps;
  const {bt_edit226cc, setbt_edit226cc}= useContext(TotalContext) as TotalContextProps;
  const {bt_deleteebf73, setbt_deleteebf73}= useContext(TotalContext) as TotalContextProps;
  const {view0d148, setview0d148}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_doc2ee68, setbt_add_doc2ee68}= useContext(TotalContext) as TotalContextProps;
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
    'GroupCategoryTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3de40d278fed40108fe057ba6413e4ac");
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
    setcategory_table3e4acProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("acat_id")){
        setacat_id37980({...acat_id37980,isDisabled:true});

    }else
    {
      if(acat_id37980?.isDisabled==null)
      {
        setacat_id37980({...acat_id37980,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_code")){
        setcategory_code97856({...category_code97856,isDisabled:true});

    }else
    {
      if(category_code97856?.isDisabled==null)
      {
        setcategory_code97856({...category_code97856,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_prefix")){
        setasset_prefix8b10c({...asset_prefix8b10c,isDisabled:true});

    }else
    {
      if(asset_prefix8b10c?.isDisabled==null)
      {
        setasset_prefix8b10c({...asset_prefix8b10c,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_name")){
        setcategory_name11d7f({...category_name11d7f,isDisabled:true});

    }else
    {
      if(category_name11d7f?.isDisabled==null)
      {
        setcategory_name11d7f({...category_name11d7f,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("depreciation_method")){
        setdepreciation_method2b046({...depreciation_method2b046,isDisabled:true});

    }else
    {
      if(depreciation_method2b046?.isDisabled==null)
      {
        setdepreciation_method2b046({...depreciation_method2b046,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("useful_life_years")){
        setuseful_life_years73932({...useful_life_years73932,isDisabled:true});

    }else
    {
      if(useful_life_years73932?.isDisabled==null)
      {
        setuseful_life_years73932({...useful_life_years73932,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_edit")){
        setbt_edit226cc({...bt_edit226cc,isDisabled:true});

    }else
    {
      if(bt_edit226cc?.isDisabled==null)
      {
        setbt_edit226cc({...bt_edit226cc,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_delete")){
        setbt_deleteebf73({...bt_deleteebf73,isDisabled:true});

    }else
    {
      if(bt_deleteebf73?.isDisabled==null)
      {
        setbt_deleteebf73({...bt_deleteebf73,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view")){
        setview0d148({...view0d148,isDisabled:true});

    }else
    {
      if(view0d148?.isDisabled==null)
      {
        setview0d148({...view0d148,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_add_doc")){
        setbt_add_doc2ee68({...bt_add_doc2ee68,isDisabled:true});

    }else
    {
      if(bt_add_doc2ee68?.isDisabled==null)
      {
        setbt_add_doc2ee68({...bt_add_doc2ee68,isDisabled:false});
      }
    }
  //////////////
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
        codeStates['category_table'] = category_table3e4ac,
        codeStates['setcategory_table'] = setcategory_table3e4ac,
        codeStates['category_table3e4ac'] = category_table3e4acProps,
        codeStates['setcategory_table3e4ac'] = setcategory_table3e4acProps,
        codeStates['acat_id'] = acat_id37980,
        codeStates['setacat_id'] = setacat_id37980,
        codeStates['category_code'] = category_code97856,
        codeStates['setcategory_code'] = setcategory_code97856,
        codeStates['asset_prefix'] = asset_prefix8b10c,
        codeStates['setasset_prefix'] = setasset_prefix8b10c,
        codeStates['category_name'] = category_name11d7f,
        codeStates['setcategory_name'] = setcategory_name11d7f,
        codeStates['depreciation_method'] = depreciation_method2b046,
        codeStates['setdepreciation_method'] = setdepreciation_method2b046,
        codeStates['useful_life_years'] = useful_life_years73932,
        codeStates['setuseful_life_years'] = setuseful_life_years73932,
        codeStates['bt_edit'] = bt_edit226cc,
        codeStates['setbt_edit'] = setbt_edit226cc,
        codeStates['bt_delete'] = bt_deleteebf73,
        codeStates['setbt_delete'] = setbt_deleteebf73,
        codeStates['view'] = view0d148,
        codeStates['setview'] = setview0d148,
        codeStates['bt_add_doc'] = bt_add_doc2ee68,
        codeStates['setbt_add_doc'] = setbt_add_doc2ee68,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const category_table3e4acRef = useRef<any>(null);
  const handleClearSearch = () => {
    category_table3e4acRef.current?.setSearchParams();
    category_table3e4acRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(category_table3e4ac) && Object.keys(category_table3e4ac)?.length>0)
      {
        setcategory_table3e4ac({})
      }
    }else 
      prevRefreshRef.current= true
  }, [category_table3e4acProps?.refresh,token])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '31 / 122',
      
        //rowGap: '0px',
        overflow: 'visible',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablecategory_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={category_table3e4acRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupcategory_table
