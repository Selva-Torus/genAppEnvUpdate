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
import Groupdaily_expense_table  from "../Groupdaily_expense_table/Groupdaily_expense_table";
import Groupoffsite_expense_table  from "../Groupoffsite_expense_table/Groupoffsite_expense_table";
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
import Cardapprovedcard  from "./Cardapprovedcard";
import Cardrejectedcard  from "./Cardrejectedcard";
import Cardpendingcard  from "./Cardpendingcard";
import Carddailyexpenses  from "./Carddailyexpenses";
import Cardoffsiteexpenses  from "./Cardoffsiteexpenses";
import Buttonadd  from "./Buttonadd";
import Buttonoffsite_add  from "./Buttonoffsite_add";
import Textdaily_exp  from "./Textdaily_exp";
import Textoffsite_exp  from "./Textoffsite_exp";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupuser_grp = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_card_data_v1Props, setdfd_card_data_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_claim_table_data_v1Props, setdfd_claim_table_data_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Employee": {
    "allowedControls": [
      "approvedcard",
      "rejectedcard",
      "pendingcard",
      "dailyexpenses",
      "offsiteexpenses",
      "add",
      "offsite_add",
      "daily_exp",
      "offsite_exp"
    ],
    "allowedGroups": [
      "canvas",
      "user_grp",
      "daily_expense_table",
      "offsite_expense_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "add",
      "offsite_add"
    ],
    "allowedGroups": [],
    "blockedControls": [
      "approvedcard",
      "rejectedcard",
      "pendingcard",
      "dailyexpenses",
      "offsiteexpenses",
      "daily_exp",
      "offsite_exp"
    ],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const handleOnloadCalledRef = useRef(false);
  const securityCheckPromiseRef = useRef<Promise<any> | null>(null);
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
  const {user_grpd6690, setuser_grpd6690}= useContext(TotalContext) as TotalContextProps;
  const {user_grpd6690Props, setuser_grpd6690Props}= useContext(TotalContext) as TotalContextProps;
  const {approvedcardc5971, setapprovedcardc5971}= useContext(TotalContext) as TotalContextProps;
  const {rejectedcardefafa, setrejectedcardefafa}= useContext(TotalContext) as TotalContextProps;
  const {pendingcardee3c0, setpendingcardee3c0}= useContext(TotalContext) as TotalContextProps;
  const {dailyexpenses798bd, setdailyexpenses798bd}= useContext(TotalContext) as TotalContextProps;
  const {offsiteexpensescd925, setoffsiteexpensescd925}= useContext(TotalContext) as TotalContextProps;
  const {addd126f, setaddd126f}= useContext(TotalContext) as TotalContextProps;
  const {offsite_add1ab15, setoffsite_add1ab15}= useContext(TotalContext) as TotalContextProps;
  const {daily_expa1e3b, setdaily_expa1e3b}= useContext(TotalContext) as TotalContextProps;
  const {offsite_exp949f2, setoffsite_exp949f2}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table13758, setdaily_expense_table13758}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table13758Props, setdaily_expense_table13758Props}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table4ffd6, setoffsite_expense_table4ffd6}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table4ffd6Props, setoffsite_expense_table4ffd6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {dashboard_for_user_v1, setdashboard_for_user_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Dashboard_For_User:AFVK:v1',
    [user],
    'GroupUserGrp',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "0dd5e93ebe734a2da4503278cd0d6690");
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
    setuser_grpd6690Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("approvedcard")){
        setapprovedcardc5971((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(approvedcardc5971?.isDisabled==null)
      {
        setapprovedcardc5971((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("rejectedcard")){
        setrejectedcardefafa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(rejectedcardefafa?.isDisabled==null)
      {
        setrejectedcardefafa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("pendingcard")){
        setpendingcardee3c0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(pendingcardee3c0?.isDisabled==null)
      {
        setpendingcardee3c0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dailyexpenses")){
        setdailyexpenses798bd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dailyexpenses798bd?.isDisabled==null)
      {
        setdailyexpenses798bd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("offsiteexpenses")){
        setoffsiteexpensescd925((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(offsiteexpensescd925?.isDisabled==null)
      {
        setoffsiteexpensescd925((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("add")){
        setaddd126f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(addd126f?.isDisabled==null)
      {
        setaddd126f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("offsite_add")){
        setoffsite_add1ab15((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(offsite_add1ab15?.isDisabled==null)
      {
        setoffsite_add1ab15((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("daily_exp")){
        setdaily_expa1e3b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(daily_expa1e3b?.isDisabled==null)
      {
        setdaily_expa1e3b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("offsite_exp")){
        setoffsite_exp949f2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(offsite_exp949f2?.isDisabled==null)
      {
        setoffsite_exp949f2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("daily_expense_table")){
        setdaily_expense_table13758Props((pre:any)=>({...pre,...daily_expense_table13758,isDisabled:true}));

    }else
    {
      if(daily_expense_table13758?.isDisabled==null)
      {
        setdaily_expense_table13758Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("offsite_expense_table")){
        setoffsite_expense_table4ffd6Props((pre:any)=>({...pre,...offsite_expense_table4ffd6,isDisabled:true}));

    }else
    {
      if(offsite_expense_table4ffd6?.isDisabled==null)
      {
        setoffsite_expense_table4ffd6Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['user_grp'] = user_grpd6690,
        codeStates['setuser_grp'] = setuser_grpd6690,
        codeStates['user_grpd6690'] = user_grpd6690Props,
        codeStates['setuser_grpd6690'] = setuser_grpd6690Props,
        codeStates['approvedcard'] = approvedcardc5971,
        codeStates['setapprovedcard'] = setapprovedcardc5971,
        codeStates['rejectedcard'] = rejectedcardefafa,
        codeStates['setrejectedcard'] = setrejectedcardefafa,
        codeStates['pendingcard'] = pendingcardee3c0,
        codeStates['setpendingcard'] = setpendingcardee3c0,
        codeStates['dailyexpenses'] = dailyexpenses798bd,
        codeStates['setdailyexpenses'] = setdailyexpenses798bd,
        codeStates['offsiteexpenses'] = offsiteexpensescd925,
        codeStates['setoffsiteexpenses'] = setoffsiteexpensescd925,
        codeStates['add'] = addd126f,
        codeStates['setadd'] = setaddd126f,
        codeStates['offsite_add'] = offsite_add1ab15,
        codeStates['setoffsite_add'] = setoffsite_add1ab15,
        codeStates['daily_exp'] = daily_expa1e3b,
        codeStates['setdaily_exp'] = setdaily_expa1e3b,
        codeStates['offsite_exp'] = offsite_exp949f2,
        codeStates['setoffsite_exp'] = setoffsite_exp949f2,
        codeStates['daily_expense_table'] = daily_expense_table13758,
        codeStates['setdaily_expense_table'] = setdaily_expense_table13758,
        codeStates['daily_expense_table13758'] = daily_expense_table13758Props,
        codeStates['setdaily_expense_table13758'] = setdaily_expense_table13758Props,
        codeStates['offsite_expense_table'] = offsite_expense_table4ffd6,
        codeStates['setoffsite_expense_table'] = setoffsite_expense_table4ffd6,
        codeStates['offsite_expense_table4ffd6'] = offsite_expense_table4ffd6Props,
        codeStates['setoffsite_expense_table4ffd6'] = setoffsite_expense_table4ffd6Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "0dd5e93ebe734a2da4503278cd0d6690");
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
  const handleOnChange=async ()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['user_grp'] = user_grpd6690,
        codeStates['setuser_grp'] = setuser_grpd6690,
        codeStates['user_grpd6690'] = user_grpd6690Props,
        codeStates['setuser_grpd6690'] = setuser_grpd6690Props,
        codeStates['approvedcard'] = approvedcardc5971,
        codeStates['setapprovedcard'] = setapprovedcardc5971,
        codeStates['rejectedcard'] = rejectedcardefafa,
        codeStates['setrejectedcard'] = setrejectedcardefafa,
        codeStates['pendingcard'] = pendingcardee3c0,
        codeStates['setpendingcard'] = setpendingcardee3c0,
        codeStates['dailyexpenses'] = dailyexpenses798bd,
        codeStates['setdailyexpenses'] = setdailyexpenses798bd,
        codeStates['offsiteexpenses'] = offsiteexpensescd925,
        codeStates['setoffsiteexpenses'] = setoffsiteexpensescd925,
        codeStates['add'] = addd126f,
        codeStates['setadd'] = setaddd126f,
        codeStates['offsite_add'] = offsite_add1ab15,
        codeStates['setoffsite_add'] = setoffsite_add1ab15,
        codeStates['daily_exp'] = daily_expa1e3b,
        codeStates['setdaily_exp'] = setdaily_expa1e3b,
        codeStates['offsite_exp'] = offsite_exp949f2,
        codeStates['setoffsite_exp'] = setoffsite_exp949f2,
        codeStates['daily_expense_table'] = daily_expense_table13758,
        codeStates['setdaily_expense_table'] = setdaily_expense_table13758,
        codeStates['daily_expense_table13758'] = daily_expense_table13758Props,
        codeStates['setdaily_expense_table13758'] = setdaily_expense_table13758Props,
        codeStates['offsite_expense_table'] = offsite_expense_table4ffd6,
        codeStates['setoffsite_expense_table'] = setoffsite_expense_table4ffd6,
        codeStates['offsite_expense_table4ffd6'] = offsite_expense_table4ffd6Props,
        codeStates['setoffsite_expense_table4ffd6'] = setoffsite_expense_table4ffd6Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const user_grpd6690Ref = useRef<any>(null);
  const handleClearSearch = () => {
    user_grpd6690Ref.current?.setSearchParams();
    user_grpd6690Ref.current?.handleSearch({});
  };

  useEffect(() => {
    securityCheckPromiseRef.current = securityCheck()
  }, [token])

  useEffect(() => {
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true;
      (async () => {
        await securityCheckPromiseRef.current
        handleOnload()
      })()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(user_grpd6690) &&
        Object.keys(user_grpd6690)?.length > 0
      ) {
        setuser_grpd6690({})
        setuser_grpd6690Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [user_grpd6690Props?.refresh])


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
        gridRow: '2 / 216',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
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
          setdashboard_for_user_v1((pre:any)=>({...pre,_selectedGroup_:"user_grp"}))
        }}
    >
        {allowedComponent.includes("daily_expense_table")  &&<Groupdaily_expense_table  
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
        {allowedComponent.includes("offsite_expense_table")  &&<Groupoffsite_expense_table  
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
        {allowedControls.includes("approvedcard") ?<Cardapprovedcard  /* c5971 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
        {allowedControls.includes("rejectedcard") ?<Cardrejectedcard  /* efafa */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
        {allowedControls.includes("pendingcard") ?<Cardpendingcard  /* ee3c0 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
        {allowedControls.includes("dailyexpenses") ?<Carddailyexpenses  /* 798bd */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
        {allowedControls.includes("offsiteexpenses") ?<Cardoffsiteexpenses  /* cd925 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
        {        ((ruleData?.length>0 && "add" in ButtonGoRuleData)?ButtonGoRuleData["add"]:true) && 
          allowedControls.includes("add")  ?            <Buttonadd tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "offsite_add" in ButtonGoRuleData)?ButtonGoRuleData["offsite_add"]:true) && 
          allowedControls.includes("offsite_add")  ?            <Buttonoffsite_add tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
          {allowedControls.includes("daily_exp") ?<Textdaily_exp   /* a1e3b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("offsite_exp") ?<Textoffsite_exp   /* 949f2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupuser_grp
