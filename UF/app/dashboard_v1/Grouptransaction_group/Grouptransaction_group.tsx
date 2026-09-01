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
import Iconproduct_icon  from "./Iconproduct_icon";
import Labeltransactions_label  from "./Labeltransactions_label";
import Texttransaction_count  from "./Texttransaction_count";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptransaction_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_productdashboard_v1Props, setdfd_productdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_channeldashboard_v1Props, setdfd_channeldashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_currencydashboard_v1Props, setdfd_currencydashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_transaction_v1Props, setdfd_transaction_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_onlineofflinedashboard_v1Props, setdfd_onlineofflinedashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_processcategorydashboard_v1Props, setdfd_processcategorydashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_transactioncountvphdashboard_v1Props, setdfd_transactioncountvphdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_channelcountvphdashboard_v1Props, setdfd_channelcountvphdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_channelchartdashboard_v1Props, setdfd_channelchartdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_productchartdashboard_v1Props, setdfd_productchartdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_onlineofflinecountvphdashboard_v1Props, setdfd_onlineofflinecountvphdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "product_icon",
      "transactions_label",
      "transaction_count"
    ],
    "allowedGroups": [
      "canvas",
      "gdb_group",
      "tab_group",
      "tab_header",
      "tab_grp",
      "transaction_group",
      "total_value_group",
      "online_offline_processing_group",
      "bar_chart_group",
      "pie_chart_group",
      "transaction_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Team": {
    "allowedControls": [
      "product_icon",
      "transactions_label",
      "transaction_count"
    ],
    "allowedGroups": [
      "canvas",
      "gdb_group",
      "tab_group",
      "tab_header",
      "tab_grp",
      "transaction_group",
      "total_value_group",
      "online_offline_processing_group",
      "bar_chart_group",
      "pie_chart_group",
      "transaction_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Team": {
    "allowedControls": [
      "product_icon",
      "transactions_label",
      "transaction_count"
    ],
    "allowedGroups": [
      "canvas",
      "gdb_group",
      "tab_group",
      "tab_header",
      "tab_grp",
      "transaction_group",
      "total_value_group",
      "online_offline_processing_group",
      "bar_chart_group",
      "pie_chart_group",
      "transaction_table"
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
  const {gdb_group5384d, setgdb_group5384d}= useContext(TotalContext) as TotalContextProps;
  const {gdb_group5384dProps, setgdb_group5384dProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_group65b41, settab_group65b41}= useContext(TotalContext) as TotalContextProps;
  const {tab_group65b41Props, settab_group65b41Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header04820, settab_header04820}= useContext(TotalContext) as TotalContextProps;
  const {tab_header04820Props, settab_header04820Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_grpe63f4, settab_grpe63f4}= useContext(TotalContext) as TotalContextProps;
  const {tab_grpe63f4Props, settab_grpe63f4Props}= useContext(TotalContext) as TotalContextProps;
  const {transaction_group6c6f2, settransaction_group6c6f2}= useContext(TotalContext) as TotalContextProps;
  const {transaction_group6c6f2Props, settransaction_group6c6f2Props}= useContext(TotalContext) as TotalContextProps;
  const {product_icon07465, setproduct_icon07465}= useContext(TotalContext) as TotalContextProps;
  const {transactions_labelf64b1, settransactions_labelf64b1}= useContext(TotalContext) as TotalContextProps;
  const {transaction_countc3fd5, settransaction_countc3fd5}= useContext(TotalContext) as TotalContextProps;
  const {total_value_group9d783, settotal_value_group9d783}= useContext(TotalContext) as TotalContextProps;
  const {total_value_group9d783Props, settotal_value_group9d783Props}= useContext(TotalContext) as TotalContextProps;
  const {online_offline_processing_group7ad24, setonline_offline_processing_group7ad24}= useContext(TotalContext) as TotalContextProps;
  const {online_offline_processing_group7ad24Props, setonline_offline_processing_group7ad24Props}= useContext(TotalContext) as TotalContextProps;
  const {bar_chart_group737a3, setbar_chart_group737a3}= useContext(TotalContext) as TotalContextProps;
  const {bar_chart_group737a3Props, setbar_chart_group737a3Props}= useContext(TotalContext) as TotalContextProps;
  const {pie_chart_group15067, setpie_chart_group15067}= useContext(TotalContext) as TotalContextProps;
  const {pie_chart_group15067Props, setpie_chart_group15067Props}= useContext(TotalContext) as TotalContextProps;
  const {transaction_tablef4f34, settransaction_tablef4f34}= useContext(TotalContext) as TotalContextProps;
  const {transaction_tablef4f34Props, settransaction_tablef4f34Props}= useContext(TotalContext) as TotalContextProps;
  const {piechart9dde7, setpiechart9dde7}= useContext(TotalContext) as TotalContextProps;
  const {barchart84262, setbarchart84262}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {globaldashboard_v1, setglobaldashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:VGPH:AFK:globalDashboard:AFVK:v1',
    [user],
    'GroupTransactionGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "793a6b161bb2485c995842c573d6c6f2");
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
    settransaction_group6c6f2Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("product_icon")){
        setproduct_icon07465((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(product_icon07465?.isDisabled==null)
      {
        setproduct_icon07465((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("transactions_label")){
        settransactions_labelf64b1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(transactions_labelf64b1?.isDisabled==null)
      {
        settransactions_labelf64b1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("transaction_count")){
        settransaction_countc3fd5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(transaction_countc3fd5?.isDisabled==null)
      {
        settransaction_countc3fd5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['gdb_group'] = gdb_group5384d,
        codeStates['setgdb_group'] = setgdb_group5384d,
        codeStates['gdb_group5384d'] = gdb_group5384dProps,
        codeStates['setgdb_group5384d'] = setgdb_group5384dProps,
        codeStates['tab_group'] = tab_group65b41,
        codeStates['settab_group'] = settab_group65b41,
        codeStates['tab_group65b41'] = tab_group65b41Props,
        codeStates['settab_group65b41'] = settab_group65b41Props,
        codeStates['tab_header'] = tab_header04820,
        codeStates['settab_header'] = settab_header04820,
        codeStates['tab_header04820'] = tab_header04820Props,
        codeStates['settab_header04820'] = settab_header04820Props,
        codeStates['tab_grp'] = tab_grpe63f4,
        codeStates['settab_grp'] = settab_grpe63f4,
        codeStates['tab_grpe63f4'] = tab_grpe63f4Props,
        codeStates['settab_grpe63f4'] = settab_grpe63f4Props,
        codeStates['transaction_group'] = transaction_group6c6f2,
        codeStates['settransaction_group'] = settransaction_group6c6f2,
        codeStates['transaction_group6c6f2'] = transaction_group6c6f2Props,
        codeStates['settransaction_group6c6f2'] = settransaction_group6c6f2Props,
        codeStates['product_icon'] = product_icon07465,
        codeStates['setproduct_icon'] = setproduct_icon07465,
        codeStates['transactions_label'] = transactions_labelf64b1,
        codeStates['settransactions_label'] = settransactions_labelf64b1,
        codeStates['transaction_count'] = transaction_countc3fd5,
        codeStates['settransaction_count'] = settransaction_countc3fd5,
        codeStates['total_value_group'] = total_value_group9d783,
        codeStates['settotal_value_group'] = settotal_value_group9d783,
        codeStates['total_value_group9d783'] = total_value_group9d783Props,
        codeStates['settotal_value_group9d783'] = settotal_value_group9d783Props,
        codeStates['online_offline_processing_group'] = online_offline_processing_group7ad24,
        codeStates['setonline_offline_processing_group'] = setonline_offline_processing_group7ad24,
        codeStates['online_offline_processing_group7ad24'] = online_offline_processing_group7ad24Props,
        codeStates['setonline_offline_processing_group7ad24'] = setonline_offline_processing_group7ad24Props,
        codeStates['bar_chart_group'] = bar_chart_group737a3,
        codeStates['setbar_chart_group'] = setbar_chart_group737a3,
        codeStates['bar_chart_group737a3'] = bar_chart_group737a3Props,
        codeStates['setbar_chart_group737a3'] = setbar_chart_group737a3Props,
        codeStates['pie_chart_group'] = pie_chart_group15067,
        codeStates['setpie_chart_group'] = setpie_chart_group15067,
        codeStates['pie_chart_group15067'] = pie_chart_group15067Props,
        codeStates['setpie_chart_group15067'] = setpie_chart_group15067Props,
        codeStates['transaction_table'] = transaction_tablef4f34,
        codeStates['settransaction_table'] = settransaction_tablef4f34,
        codeStates['transaction_tablef4f34'] = transaction_tablef4f34Props,
        codeStates['settransaction_tablef4f34'] = settransaction_tablef4f34Props,
        codeStates['piechart'] = piechart9dde7,
        codeStates['setpiechart'] = setpiechart9dde7,
        codeStates['barchart'] = barchart84262,
        codeStates['setbarchart'] = setbarchart84262,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "793a6b161bb2485c995842c573d6c6f2");
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

  function handleConfirmOnLoad(){
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
        codeStates['gdb_group'] = gdb_group5384d,
        codeStates['setgdb_group'] = setgdb_group5384d,
        codeStates['gdb_group5384d'] = gdb_group5384dProps,
        codeStates['setgdb_group5384d'] = setgdb_group5384dProps,
        codeStates['tab_group'] = tab_group65b41,
        codeStates['settab_group'] = settab_group65b41,
        codeStates['tab_group65b41'] = tab_group65b41Props,
        codeStates['settab_group65b41'] = settab_group65b41Props,
        codeStates['tab_header'] = tab_header04820,
        codeStates['settab_header'] = settab_header04820,
        codeStates['tab_header04820'] = tab_header04820Props,
        codeStates['settab_header04820'] = settab_header04820Props,
        codeStates['tab_grp'] = tab_grpe63f4,
        codeStates['settab_grp'] = settab_grpe63f4,
        codeStates['tab_grpe63f4'] = tab_grpe63f4Props,
        codeStates['settab_grpe63f4'] = settab_grpe63f4Props,
        codeStates['transaction_group'] = transaction_group6c6f2,
        codeStates['settransaction_group'] = settransaction_group6c6f2,
        codeStates['transaction_group6c6f2'] = transaction_group6c6f2Props,
        codeStates['settransaction_group6c6f2'] = settransaction_group6c6f2Props,
        codeStates['product_icon'] = product_icon07465,
        codeStates['setproduct_icon'] = setproduct_icon07465,
        codeStates['transactions_label'] = transactions_labelf64b1,
        codeStates['settransactions_label'] = settransactions_labelf64b1,
        codeStates['transaction_count'] = transaction_countc3fd5,
        codeStates['settransaction_count'] = settransaction_countc3fd5,
        codeStates['total_value_group'] = total_value_group9d783,
        codeStates['settotal_value_group'] = settotal_value_group9d783,
        codeStates['total_value_group9d783'] = total_value_group9d783Props,
        codeStates['settotal_value_group9d783'] = settotal_value_group9d783Props,
        codeStates['online_offline_processing_group'] = online_offline_processing_group7ad24,
        codeStates['setonline_offline_processing_group'] = setonline_offline_processing_group7ad24,
        codeStates['online_offline_processing_group7ad24'] = online_offline_processing_group7ad24Props,
        codeStates['setonline_offline_processing_group7ad24'] = setonline_offline_processing_group7ad24Props,
        codeStates['bar_chart_group'] = bar_chart_group737a3,
        codeStates['setbar_chart_group'] = setbar_chart_group737a3,
        codeStates['bar_chart_group737a3'] = bar_chart_group737a3Props,
        codeStates['setbar_chart_group737a3'] = setbar_chart_group737a3Props,
        codeStates['pie_chart_group'] = pie_chart_group15067,
        codeStates['setpie_chart_group'] = setpie_chart_group15067,
        codeStates['pie_chart_group15067'] = pie_chart_group15067Props,
        codeStates['setpie_chart_group15067'] = setpie_chart_group15067Props,
        codeStates['transaction_table'] = transaction_tablef4f34,
        codeStates['settransaction_table'] = settransaction_tablef4f34,
        codeStates['transaction_tablef4f34'] = transaction_tablef4f34Props,
        codeStates['settransaction_tablef4f34'] = settransaction_tablef4f34Props,
        codeStates['piechart'] = piechart9dde7,
        codeStates['setpiechart'] = setpiechart9dde7,
        codeStates['barchart'] = barchart84262,
        codeStates['setbarchart'] = setbarchart84262,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const transaction_group6c6f2Ref = useRef<any>(null);
  const handleClearSearch = () => {
    transaction_group6c6f2Ref.current?.setSearchParams();
    transaction_group6c6f2Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true
      handleOnload()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(transaction_group6c6f2) &&
        Object.keys(transaction_group6c6f2)?.length > 0
      ) {
        settransaction_group6c6f2({})
      }
    } else prevRefreshRef.current = true
  }, [transaction_group6c6f2Props?.refresh])

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
        gridColumn: '1 / 7',
        gridRow: '40 / 63',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundColor:'',
        backgroundImage:"url('https://tfstests3.toruslowcode.com/torus/9.1/CT005/resources/images/global+payment+hub+background.png')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !rounded-xl ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setglobaldashboard_v1((pre:any)=>({...pre,_selectedGroup_:"transaction_group"}))
        }}
    >
        {allowedControls.includes("product_icon")?<Iconproduct_icon /* 07465 */ encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
        {allowedControls.includes("transactions_label")?<Labeltransactions_label   /* f64b1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("transaction_count") ?<Texttransaction_count   /* c3fd5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptransaction_group
