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
import Textdaily_exp  from "./Textdaily_exp";
import Textoffstie_exp  from "./Textoffstie_exp";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupmanager_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
    "allowedControls": [],
    "allowedGroups": [],
    "blockedControls": [
      "approvedcard",
      "rejectedcard",
      "pendingcard",
      "dailyexpenses",
      "offsiteexpenses",
      "daily_exp",
      "offstie_exp"
    ],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "approvedcard",
      "rejectedcard",
      "pendingcard",
      "dailyexpenses",
      "offsiteexpenses",
      "daily_exp",
      "offstie_exp"
    ],
    "allowedGroups": [
      "canvas",
      "manager_group",
      "daily_expense_table",
      "offsite_expense_table"
    ],
    "blockedControls": [],
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
  const {manager_group41477, setmanager_group41477}= useContext(TotalContext) as TotalContextProps;
  const {manager_group41477Props, setmanager_group41477Props}= useContext(TotalContext) as TotalContextProps;
  const {approvedcard75ed7, setapprovedcard75ed7}= useContext(TotalContext) as TotalContextProps;
  const {rejectedcard0ceee, setrejectedcard0ceee}= useContext(TotalContext) as TotalContextProps;
  const {pendingcard727e3, setpendingcard727e3}= useContext(TotalContext) as TotalContextProps;
  const {dailyexpensese7cda, setdailyexpensese7cda}= useContext(TotalContext) as TotalContextProps;
  const {offsiteexpenses62fe1, setoffsiteexpenses62fe1}= useContext(TotalContext) as TotalContextProps;
  const {daily_expa8b25, setdaily_expa8b25}= useContext(TotalContext) as TotalContextProps;
  const {offstie_exp400c9, setoffstie_exp400c9}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table91568, setdaily_expense_table91568}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table91568Props, setdaily_expense_table91568Props}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table1e924, setoffsite_expense_table1e924}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table1e924Props, setoffsite_expense_table1e924Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {dashboard_for_manager_v1, setdashboard_for_manager_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Dashboard_For_Manager:AFVK:v1',
    [user],
    'GroupManagerGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e0abb5b5f6d949fa8b9e38f3f4741477");
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
    setmanager_group41477Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("approvedcard")){
        setapprovedcard75ed7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(approvedcard75ed7?.isDisabled==null)
      {
        setapprovedcard75ed7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("rejectedcard")){
        setrejectedcard0ceee((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(rejectedcard0ceee?.isDisabled==null)
      {
        setrejectedcard0ceee((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("pendingcard")){
        setpendingcard727e3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(pendingcard727e3?.isDisabled==null)
      {
        setpendingcard727e3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dailyexpenses")){
        setdailyexpensese7cda((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dailyexpensese7cda?.isDisabled==null)
      {
        setdailyexpensese7cda((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("offsiteexpenses")){
        setoffsiteexpenses62fe1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(offsiteexpenses62fe1?.isDisabled==null)
      {
        setoffsiteexpenses62fe1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("daily_exp")){
        setdaily_expa8b25((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(daily_expa8b25?.isDisabled==null)
      {
        setdaily_expa8b25((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("offstie_exp")){
        setoffstie_exp400c9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(offstie_exp400c9?.isDisabled==null)
      {
        setoffstie_exp400c9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("daily_expense_table")){
        setdaily_expense_table91568Props((pre:any)=>({...pre,...daily_expense_table91568,isDisabled:true}));

    }else
    {
      if(daily_expense_table91568?.isDisabled==null)
      {
        setdaily_expense_table91568Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("offsite_expense_table")){
        setoffsite_expense_table1e924Props((pre:any)=>({...pre,...offsite_expense_table1e924,isDisabled:true}));

    }else
    {
      if(offsite_expense_table1e924?.isDisabled==null)
      {
        setoffsite_expense_table1e924Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['manager_group'] = manager_group41477,
        codeStates['setmanager_group'] = setmanager_group41477,
        codeStates['manager_group41477'] = manager_group41477Props,
        codeStates['setmanager_group41477'] = setmanager_group41477Props,
        codeStates['approvedcard'] = approvedcard75ed7,
        codeStates['setapprovedcard'] = setapprovedcard75ed7,
        codeStates['rejectedcard'] = rejectedcard0ceee,
        codeStates['setrejectedcard'] = setrejectedcard0ceee,
        codeStates['pendingcard'] = pendingcard727e3,
        codeStates['setpendingcard'] = setpendingcard727e3,
        codeStates['dailyexpenses'] = dailyexpensese7cda,
        codeStates['setdailyexpenses'] = setdailyexpensese7cda,
        codeStates['offsiteexpenses'] = offsiteexpenses62fe1,
        codeStates['setoffsiteexpenses'] = setoffsiteexpenses62fe1,
        codeStates['daily_exp'] = daily_expa8b25,
        codeStates['setdaily_exp'] = setdaily_expa8b25,
        codeStates['offstie_exp'] = offstie_exp400c9,
        codeStates['setoffstie_exp'] = setoffstie_exp400c9,
        codeStates['daily_expense_table'] = daily_expense_table91568,
        codeStates['setdaily_expense_table'] = setdaily_expense_table91568,
        codeStates['daily_expense_table91568'] = daily_expense_table91568Props,
        codeStates['setdaily_expense_table91568'] = setdaily_expense_table91568Props,
        codeStates['offsite_expense_table'] = offsite_expense_table1e924,
        codeStates['setoffsite_expense_table'] = setoffsite_expense_table1e924,
        codeStates['offsite_expense_table1e924'] = offsite_expense_table1e924Props,
        codeStates['setoffsite_expense_table1e924'] = setoffsite_expense_table1e924Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e0abb5b5f6d949fa8b9e38f3f4741477");
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
        codeStates['manager_group'] = manager_group41477,
        codeStates['setmanager_group'] = setmanager_group41477,
        codeStates['manager_group41477'] = manager_group41477Props,
        codeStates['setmanager_group41477'] = setmanager_group41477Props,
        codeStates['approvedcard'] = approvedcard75ed7,
        codeStates['setapprovedcard'] = setapprovedcard75ed7,
        codeStates['rejectedcard'] = rejectedcard0ceee,
        codeStates['setrejectedcard'] = setrejectedcard0ceee,
        codeStates['pendingcard'] = pendingcard727e3,
        codeStates['setpendingcard'] = setpendingcard727e3,
        codeStates['dailyexpenses'] = dailyexpensese7cda,
        codeStates['setdailyexpenses'] = setdailyexpensese7cda,
        codeStates['offsiteexpenses'] = offsiteexpenses62fe1,
        codeStates['setoffsiteexpenses'] = setoffsiteexpenses62fe1,
        codeStates['daily_exp'] = daily_expa8b25,
        codeStates['setdaily_exp'] = setdaily_expa8b25,
        codeStates['offstie_exp'] = offstie_exp400c9,
        codeStates['setoffstie_exp'] = setoffstie_exp400c9,
        codeStates['daily_expense_table'] = daily_expense_table91568,
        codeStates['setdaily_expense_table'] = setdaily_expense_table91568,
        codeStates['daily_expense_table91568'] = daily_expense_table91568Props,
        codeStates['setdaily_expense_table91568'] = setdaily_expense_table91568Props,
        codeStates['offsite_expense_table'] = offsite_expense_table1e924,
        codeStates['setoffsite_expense_table'] = setoffsite_expense_table1e924,
        codeStates['offsite_expense_table1e924'] = offsite_expense_table1e924Props,
        codeStates['setoffsite_expense_table1e924'] = setoffsite_expense_table1e924Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const manager_group41477Ref = useRef<any>(null);
  const handleClearSearch = () => {
    manager_group41477Ref.current?.setSearchParams();
    manager_group41477Ref.current?.handleSearch({});
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
        !Array.isArray(manager_group41477) &&
        Object.keys(manager_group41477)?.length > 0
      ) {
        setmanager_group41477({})
        setmanager_group41477Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [manager_group41477Props?.refresh])


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
        gridRow: '1 / 223',
      
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
          setdashboard_for_manager_v1((pre:any)=>({...pre,_selectedGroup_:"manager_group"}))
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
        {allowedControls.includes("approvedcard") ?<Cardapprovedcard  /* 75ed7 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
        {allowedControls.includes("rejectedcard") ?<Cardrejectedcard  /* 0ceee */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
        {allowedControls.includes("pendingcard") ?<Cardpendingcard  /* 727e3 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
        {allowedControls.includes("dailyexpenses") ?<Carddailyexpenses  /* e7cda */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
        {allowedControls.includes("offsiteexpenses") ?<Cardoffsiteexpenses  /* 62fe1 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
          {allowedControls.includes("daily_exp") ?<Textdaily_exp   /* a8b25 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("offstie_exp") ?<Textoffstie_exp   /* 400c9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupmanager_group
