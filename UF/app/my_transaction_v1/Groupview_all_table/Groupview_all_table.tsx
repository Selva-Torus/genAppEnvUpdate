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
import Tableview_all_table  from './Tableview_all_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupview_all_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const { token } = useGlobal();
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
  const {dfd_transaction_v1Props, setdfd_transaction_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Business Team": {
    "allowedControls": [
      "product_code_view_all",
      "channel_name_view_all",
      "uuid_view_all",
      "dr_account_view_all",
      "dr_amount_view_all",
      "cr_account_view_all",
      "cr_amount_view_all",
      "remittance_info_view_all",
      "status_view_all",
      "log_btn"
    ],
    "allowedGroups": [
      "canvas",
      "tran_main_group",
      "tran_tab_group",
      "view_all_tab",
      "view_all_table",
      "failure_queue_tab",
      "failure_queue_table",
      "success_queue_tab",
      "success_queue_table",
      "return_queue_tab",
      "return_queue_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Team": {
    "allowedControls": [
      "product_code_view_all",
      "channel_name_view_all",
      "uuid_view_all",
      "dr_account_view_all",
      "dr_amount_view_all",
      "cr_account_view_all",
      "cr_amount_view_all",
      "remittance_info_view_all",
      "status_view_all",
      "log_btn"
    ],
    "allowedGroups": [
      "canvas",
      "tran_main_group",
      "tran_tab_group",
      "view_all_tab",
      "view_all_table",
      "failure_queue_tab",
      "failure_queue_table",
      "success_queue_tab",
      "success_queue_table",
      "return_queue_tab",
      "return_queue_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Team": {
    "allowedControls": [
      "product_code_view_all",
      "channel_name_view_all",
      "uuid_view_all",
      "dr_account_view_all",
      "dr_amount_view_all",
      "cr_account_view_all",
      "cr_amount_view_all",
      "remittance_info_view_all",
      "status_view_all",
      "log_btn"
    ],
    "allowedGroups": [
      "canvas",
      "tran_main_group",
      "tran_tab_group",
      "view_all_tab",
      "view_all_table",
      "failure_queue_tab",
      "failure_queue_table",
      "success_queue_tab",
      "success_queue_table",
      "return_queue_tab",
      "return_queue_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const handleOnloadCalledRef = useRef(false);
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
  const {tran_main_group1dc7f, settran_main_group1dc7f}= useContext(TotalContext) as TotalContextProps;
  const {tran_main_group1dc7fProps, settran_main_group1dc7fProps}= useContext(TotalContext) as TotalContextProps;
  const {tran_tab_group08b64, settran_tab_group08b64}= useContext(TotalContext) as TotalContextProps;
  const {tran_tab_group08b64Props, settran_tab_group08b64Props}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tab4a963, setview_all_tab4a963}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tab4a963Props, setview_all_tab4a963Props}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tablec9e87, setview_all_tablec9e87}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tablec9e87Props, setview_all_tablec9e87Props}= useContext(TotalContext) as TotalContextProps;
  const {product_code_view_allb0df6, setproduct_code_view_allb0df6}= useContext(TotalContext) as TotalContextProps;
  const {channel_name_view_all33724, setchannel_name_view_all33724}= useContext(TotalContext) as TotalContextProps;
  const {uuid_view_allc0a46, setuuid_view_allc0a46}= useContext(TotalContext) as TotalContextProps;
  const {dr_account_view_all54da6, setdr_account_view_all54da6}= useContext(TotalContext) as TotalContextProps;
  const {dr_amount_view_all88d6b, setdr_amount_view_all88d6b}= useContext(TotalContext) as TotalContextProps;
  const {cr_account_view_alld4b39, setcr_account_view_alld4b39}= useContext(TotalContext) as TotalContextProps;
  const {cr_amount_view_all19d14, setcr_amount_view_all19d14}= useContext(TotalContext) as TotalContextProps;
  const {remittance_info_view_all82afd, setremittance_info_view_all82afd}= useContext(TotalContext) as TotalContextProps;
  const {status_view_all47e6b, setstatus_view_all47e6b}= useContext(TotalContext) as TotalContextProps;
  const {log_btnfe134, setlog_btnfe134}= useContext(TotalContext) as TotalContextProps;
  const {failure_queue_tab69f01, setfailure_queue_tab69f01}= useContext(TotalContext) as TotalContextProps;
  const {failure_queue_tab69f01Props, setfailure_queue_tab69f01Props}= useContext(TotalContext) as TotalContextProps;
  const {failure_queue_tablea476f, setfailure_queue_tablea476f}= useContext(TotalContext) as TotalContextProps;
  const {failure_queue_tablea476fProps, setfailure_queue_tablea476fProps}= useContext(TotalContext) as TotalContextProps;
  const {success_queue_tabef582, setsuccess_queue_tabef582}= useContext(TotalContext) as TotalContextProps;
  const {success_queue_tabef582Props, setsuccess_queue_tabef582Props}= useContext(TotalContext) as TotalContextProps;
  const {success_queue_table63aae, setsuccess_queue_table63aae}= useContext(TotalContext) as TotalContextProps;
  const {success_queue_table63aaeProps, setsuccess_queue_table63aaeProps}= useContext(TotalContext) as TotalContextProps;
  const {return_queue_tab5611e, setreturn_queue_tab5611e}= useContext(TotalContext) as TotalContextProps;
  const {return_queue_tab5611eProps, setreturn_queue_tab5611eProps}= useContext(TotalContext) as TotalContextProps;
  const {return_queue_table267f0, setreturn_queue_table267f0}= useContext(TotalContext) as TotalContextProps;
  const {return_queue_table267f0Props, setreturn_queue_table267f0Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {transaction_v1, settransaction_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:VGPH:AFK:transaction:AFVK:v1',
    [user],
    'GroupViewAllTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "07c6ad4e30df44ddb49e3e9542ac9e87");
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
    setview_all_tablec9e87Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("product_code_view_all")){
        setproduct_code_view_allb0df6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(product_code_view_allb0df6?.isDisabled==null)
      {
        setproduct_code_view_allb0df6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("channel_name_view_all")){
        setchannel_name_view_all33724((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(channel_name_view_all33724?.isDisabled==null)
      {
        setchannel_name_view_all33724((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("uuid_view_all")){
        setuuid_view_allc0a46((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(uuid_view_allc0a46?.isDisabled==null)
      {
        setuuid_view_allc0a46((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_account_view_all")){
        setdr_account_view_all54da6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_account_view_all54da6?.isDisabled==null)
      {
        setdr_account_view_all54da6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_amount_view_all")){
        setdr_amount_view_all88d6b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_amount_view_all88d6b?.isDisabled==null)
      {
        setdr_amount_view_all88d6b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_account_view_all")){
        setcr_account_view_alld4b39((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_account_view_alld4b39?.isDisabled==null)
      {
        setcr_account_view_alld4b39((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_amount_view_all")){
        setcr_amount_view_all19d14((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_amount_view_all19d14?.isDisabled==null)
      {
        setcr_amount_view_all19d14((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("remittance_info_view_all")){
        setremittance_info_view_all82afd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(remittance_info_view_all82afd?.isDisabled==null)
      {
        setremittance_info_view_all82afd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status_view_all")){
        setstatus_view_all47e6b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status_view_all47e6b?.isDisabled==null)
      {
        setstatus_view_all47e6b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("log_btn")){
        setlog_btnfe134((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(log_btnfe134?.isDisabled==null)
      {
        setlog_btnfe134((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "07c6ad4e30df44ddb49e3e9542ac9e87");
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
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
        codeStates['tran_main_group'] = tran_main_group1dc7f,
        codeStates['settran_main_group'] = settran_main_group1dc7f,
        codeStates['tran_main_group1dc7f'] = tran_main_group1dc7fProps,
        codeStates['settran_main_group1dc7f'] = settran_main_group1dc7fProps,
        codeStates['tran_tab_group'] = tran_tab_group08b64,
        codeStates['settran_tab_group'] = settran_tab_group08b64,
        codeStates['tran_tab_group08b64'] = tran_tab_group08b64Props,
        codeStates['settran_tab_group08b64'] = settran_tab_group08b64Props,
        codeStates['view_all_tab'] = view_all_tab4a963,
        codeStates['setview_all_tab'] = setview_all_tab4a963,
        codeStates['view_all_tab4a963'] = view_all_tab4a963Props,
        codeStates['setview_all_tab4a963'] = setview_all_tab4a963Props,
        codeStates['view_all_table'] = view_all_tablec9e87,
        codeStates['setview_all_table'] = setview_all_tablec9e87,
        codeStates['view_all_tablec9e87'] = view_all_tablec9e87Props,
        codeStates['setview_all_tablec9e87'] = setview_all_tablec9e87Props,
        codeStates['product_code_view_all'] = product_code_view_allb0df6,
        codeStates['setproduct_code_view_all'] = setproduct_code_view_allb0df6,
        codeStates['channel_name_view_all'] = channel_name_view_all33724,
        codeStates['setchannel_name_view_all'] = setchannel_name_view_all33724,
        codeStates['uuid_view_all'] = uuid_view_allc0a46,
        codeStates['setuuid_view_all'] = setuuid_view_allc0a46,
        codeStates['dr_account_view_all'] = dr_account_view_all54da6,
        codeStates['setdr_account_view_all'] = setdr_account_view_all54da6,
        codeStates['dr_amount_view_all'] = dr_amount_view_all88d6b,
        codeStates['setdr_amount_view_all'] = setdr_amount_view_all88d6b,
        codeStates['cr_account_view_all'] = cr_account_view_alld4b39,
        codeStates['setcr_account_view_all'] = setcr_account_view_alld4b39,
        codeStates['cr_amount_view_all'] = cr_amount_view_all19d14,
        codeStates['setcr_amount_view_all'] = setcr_amount_view_all19d14,
        codeStates['remittance_info_view_all'] = remittance_info_view_all82afd,
        codeStates['setremittance_info_view_all'] = setremittance_info_view_all82afd,
        codeStates['status_view_all'] = status_view_all47e6b,
        codeStates['setstatus_view_all'] = setstatus_view_all47e6b,
        codeStates['log_btn'] = log_btnfe134,
        codeStates['setlog_btn'] = setlog_btnfe134,
        codeStates['failure_queue_tab'] = failure_queue_tab69f01,
        codeStates['setfailure_queue_tab'] = setfailure_queue_tab69f01,
        codeStates['failure_queue_tab69f01'] = failure_queue_tab69f01Props,
        codeStates['setfailure_queue_tab69f01'] = setfailure_queue_tab69f01Props,
        codeStates['failure_queue_table'] = failure_queue_tablea476f,
        codeStates['setfailure_queue_table'] = setfailure_queue_tablea476f,
        codeStates['failure_queue_tablea476f'] = failure_queue_tablea476fProps,
        codeStates['setfailure_queue_tablea476f'] = setfailure_queue_tablea476fProps,
        codeStates['success_queue_tab'] = success_queue_tabef582,
        codeStates['setsuccess_queue_tab'] = setsuccess_queue_tabef582,
        codeStates['success_queue_tabef582'] = success_queue_tabef582Props,
        codeStates['setsuccess_queue_tabef582'] = setsuccess_queue_tabef582Props,
        codeStates['success_queue_table'] = success_queue_table63aae,
        codeStates['setsuccess_queue_table'] = setsuccess_queue_table63aae,
        codeStates['success_queue_table63aae'] = success_queue_table63aaeProps,
        codeStates['setsuccess_queue_table63aae'] = setsuccess_queue_table63aaeProps,
        codeStates['return_queue_tab'] = return_queue_tab5611e,
        codeStates['setreturn_queue_tab'] = setreturn_queue_tab5611e,
        codeStates['return_queue_tab5611e'] = return_queue_tab5611eProps,
        codeStates['setreturn_queue_tab5611e'] = setreturn_queue_tab5611eProps,
        codeStates['return_queue_table'] = return_queue_table267f0,
        codeStates['setreturn_queue_table'] = setreturn_queue_table267f0,
        codeStates['return_queue_table267f0'] = return_queue_table267f0Props,
        codeStates['setreturn_queue_table267f0'] = setreturn_queue_table267f0Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const view_all_tablec9e87Ref = useRef<any>(null);
  const handleClearSearch = () => {
    view_all_tablec9e87Ref.current?.setSearchParams();
    view_all_tablec9e87Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true
      handleOnload()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(view_all_tablec9e87) &&
        Object.keys(view_all_tablec9e87)?.length > 0
      ) {
        setview_all_tablec9e87({})
      }
    } else prevRefreshRef.current = true
  }, [view_all_tablec9e87Props?.refresh])

  useEffect(() => {
    securityCheck()
  }, [token])

  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 131',
      
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
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          settransaction_v1((pre:any)=>({...pre,_selectedGroup_:"view_all_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableview_all_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={view_all_tablec9e87Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupview_all_table
