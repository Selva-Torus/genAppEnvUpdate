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
import Groupstate  from "../Groupstate/Groupstate";
import Groupgroupaaa  from "../Groupgroupaaa/Groupgroupaaa";
import Groupgroupc  from "../Groupgroupc/Groupgroupc";
import Groupgroupd  from "../Groupgroupd/Groupgroupd";
import Groupgroupb  from "../Groupgroupb/Groupgroupb";
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
import ComboBoxcomboboxa  from "./ComboBoxcomboboxa";
import DateAndTimedateandtime  from "./DateAndTimedateandtime";
import Buttonbutton  from "./Buttonbutton";
import TextInputtextinput  from "./TextInputtextinput";
import ComboBoxcomboboxb  from "./ComboBoxcomboboxb";
import ComboBoxcomboboxc  from "./ComboBoxcomboboxc";
import TextInputtextinput123  from "./TextInputtextinput123";
import DatePickerdatepicker  from "./DatePickerdatepicker";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup1234 = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_country_code_dfd_v1Props, setdfd_country_code_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "emplyoee": {
    "allowedControls": [
      "comboboxa",
      "dateandtime",
      "button",
      "textinput",
      "comboboxb",
      "comboboxc",
      "textinput123",
      "datepicker"
    ],
    "allowedGroups": [
      "canvas",
      "group1234",
      "state",
      "groupaaa",
      "groupc",
      "groupd",
      "groupb"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "user": {
    "allowedControls": [
      "comboboxa",
      "dateandtime",
      "button",
      "textinput",
      "comboboxb",
      "comboboxc",
      "textinput123",
      "datepicker"
    ],
    "allowedGroups": [
      "canvas",
      "group1234",
      "state",
      "groupaaa",
      "groupc",
      "groupd",
      "groupb"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Template": {
    "allowedControls": [
      "comboboxa",
      "dateandtime",
      "button",
      "textinput",
      "comboboxb",
      "comboboxc",
      "textinput123",
      "datepicker"
    ],
    "allowedGroups": [
      "canvas",
      "group1234",
      "state",
      "groupaaa",
      "groupc",
      "groupd",
      "groupb"
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
  const {group123488888, setgroup123488888}= useContext(TotalContext) as TotalContextProps;
  const {group123488888Props, setgroup123488888Props}= useContext(TotalContext) as TotalContextProps;
  const {stateaa824, setstateaa824}= useContext(TotalContext) as TotalContextProps;
  const {stateaa824Props, setstateaa824Props}= useContext(TotalContext) as TotalContextProps;
  const {groupaaa97733, setgroupaaa97733}= useContext(TotalContext) as TotalContextProps;
  const {groupaaa97733Props, setgroupaaa97733Props}= useContext(TotalContext) as TotalContextProps;
  const {groupc0c048, setgroupc0c048}= useContext(TotalContext) as TotalContextProps;
  const {groupc0c048Props, setgroupc0c048Props}= useContext(TotalContext) as TotalContextProps;
  const {groupd487a8, setgroupd487a8}= useContext(TotalContext) as TotalContextProps;
  const {groupd487a8Props, setgroupd487a8Props}= useContext(TotalContext) as TotalContextProps;
  const {groupb8f3d7, setgroupb8f3d7}= useContext(TotalContext) as TotalContextProps;
  const {groupb8f3d7Props, setgroupb8f3d7Props}= useContext(TotalContext) as TotalContextProps;
  const {comboboxa2ee09, setcomboboxa2ee09}= useContext(TotalContext) as TotalContextProps;
  const {dateandtime26c68, setdateandtime26c68}= useContext(TotalContext) as TotalContextProps;
  const {buttonba9c0, setbuttonba9c0}= useContext(TotalContext) as TotalContextProps;
  const {textinputaee10, settextinputaee10}= useContext(TotalContext) as TotalContextProps;
  const {comboboxb9056e, setcomboboxb9056e}= useContext(TotalContext) as TotalContextProps;
  const {comboboxccfb84, setcomboboxccfb84}= useContext(TotalContext) as TotalContextProps;
  const {textinput12354a98, settextinput12354a98}= useContext(TotalContext) as TotalContextProps;
  const {datepicker0e91e, setdatepicker0e91e}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {comboboxcheck_v1, setcomboboxcheck_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:comboboxcheck:AFVK:v1',
    [user],
    'GroupGroup1234',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9e2f1b4dbc074258894705e51b588888");
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
    setgroup123488888Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("state")){
        setstateaa824({...stateaa824,isDisabled:true});

    }else
    {
      if(stateaa824?.isDisabled==null)
      {
        setstateaa824({...stateaa824,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("groupaaa")){
        setgroupaaa97733({...groupaaa97733,isDisabled:true});

    }else
    {
      if(groupaaa97733?.isDisabled==null)
      {
        setgroupaaa97733({...groupaaa97733,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("groupc")){
        setgroupc0c048({...groupc0c048,isDisabled:true});

    }else
    {
      if(groupc0c048?.isDisabled==null)
      {
        setgroupc0c048({...groupc0c048,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("groupd")){
        setgroupd487a8({...groupd487a8,isDisabled:true});

    }else
    {
      if(groupd487a8?.isDisabled==null)
      {
        setgroupd487a8({...groupd487a8,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("groupb")){
        setgroupb8f3d7({...groupb8f3d7,isDisabled:true});

    }else
    {
      if(groupb8f3d7?.isDisabled==null)
      {
        setgroupb8f3d7({...groupb8f3d7,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("comboboxa")){
        setcomboboxa2ee09({...comboboxa2ee09,isDisabled:true});

    }else
    {
      if(comboboxa2ee09?.isDisabled==null)
      {
        setcomboboxa2ee09({...comboboxa2ee09,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dateandtime")){
        setdateandtime26c68({...dateandtime26c68,isDisabled:true});

    }else
    {
      if(dateandtime26c68?.isDisabled==null)
      {
        setdateandtime26c68({...dateandtime26c68,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("button")){
        setbuttonba9c0({...buttonba9c0,isDisabled:true});

    }else
    {
      if(buttonba9c0?.isDisabled==null)
      {
        setbuttonba9c0({...buttonba9c0,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("textinput")){
        settextinputaee10({...textinputaee10,isDisabled:true});

    }else
    {
      if(textinputaee10?.isDisabled==null)
      {
        settextinputaee10({...textinputaee10,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("comboboxb")){
        setcomboboxb9056e({...comboboxb9056e,isDisabled:true});

    }else
    {
      if(comboboxb9056e?.isDisabled==null)
      {
        setcomboboxb9056e({...comboboxb9056e,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("comboboxc")){
        setcomboboxccfb84({...comboboxccfb84,isDisabled:true});

    }else
    {
      if(comboboxccfb84?.isDisabled==null)
      {
        setcomboboxccfb84({...comboboxccfb84,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("textinput123")){
        settextinput12354a98({...textinput12354a98,isDisabled:true});

    }else
    {
      if(textinput12354a98?.isDisabled==null)
      {
        settextinput12354a98({...textinput12354a98,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("datepicker")){
        setdatepicker0e91e({...datepicker0e91e,isDisabled:true});

    }else
    {
      if(datepicker0e91e?.isDisabled==null)
      {
        setdatepicker0e91e({...datepicker0e91e,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group1234'] = group123488888,
        codeStates['setgroup1234'] = setgroup123488888,
        codeStates['group123488888'] = group123488888Props,
        codeStates['setgroup123488888'] = setgroup123488888Props,
        codeStates['state'] = stateaa824,
        codeStates['setstate'] = setstateaa824,
        codeStates['stateaa824'] = stateaa824Props,
        codeStates['setstateaa824'] = setstateaa824Props,
        codeStates['groupaaa'] = groupaaa97733,
        codeStates['setgroupaaa'] = setgroupaaa97733,
        codeStates['groupaaa97733'] = groupaaa97733Props,
        codeStates['setgroupaaa97733'] = setgroupaaa97733Props,
        codeStates['groupc'] = groupc0c048,
        codeStates['setgroupc'] = setgroupc0c048,
        codeStates['groupc0c048'] = groupc0c048Props,
        codeStates['setgroupc0c048'] = setgroupc0c048Props,
        codeStates['groupd'] = groupd487a8,
        codeStates['setgroupd'] = setgroupd487a8,
        codeStates['groupd487a8'] = groupd487a8Props,
        codeStates['setgroupd487a8'] = setgroupd487a8Props,
        codeStates['groupb'] = groupb8f3d7,
        codeStates['setgroupb'] = setgroupb8f3d7,
        codeStates['groupb8f3d7'] = groupb8f3d7Props,
        codeStates['setgroupb8f3d7'] = setgroupb8f3d7Props,
        codeStates['comboboxa'] = comboboxa2ee09,
        codeStates['setcomboboxa'] = setcomboboxa2ee09,
        codeStates['dateandtime'] = dateandtime26c68,
        codeStates['setdateandtime'] = setdateandtime26c68,
        codeStates['button'] = buttonba9c0,
        codeStates['setbutton'] = setbuttonba9c0,
        codeStates['textinput'] = textinputaee10,
        codeStates['settextinput'] = settextinputaee10,
        codeStates['comboboxb'] = comboboxb9056e,
        codeStates['setcomboboxb'] = setcomboboxb9056e,
        codeStates['comboboxc'] = comboboxccfb84,
        codeStates['setcomboboxc'] = setcomboboxccfb84,
        codeStates['textinput123'] = textinput12354a98,
        codeStates['settextinput123'] = settextinput12354a98,
        codeStates['datepicker'] = datepicker0e91e,
        codeStates['setdatepicker'] = setdatepicker0e91e,

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
        codeStates['group1234'] = group123488888,
        codeStates['setgroup1234'] = setgroup123488888,
        codeStates['group123488888'] = group123488888Props,
        codeStates['setgroup123488888'] = setgroup123488888Props,
        codeStates['state'] = stateaa824,
        codeStates['setstate'] = setstateaa824,
        codeStates['stateaa824'] = stateaa824Props,
        codeStates['setstateaa824'] = setstateaa824Props,
        codeStates['groupaaa'] = groupaaa97733,
        codeStates['setgroupaaa'] = setgroupaaa97733,
        codeStates['groupaaa97733'] = groupaaa97733Props,
        codeStates['setgroupaaa97733'] = setgroupaaa97733Props,
        codeStates['groupc'] = groupc0c048,
        codeStates['setgroupc'] = setgroupc0c048,
        codeStates['groupc0c048'] = groupc0c048Props,
        codeStates['setgroupc0c048'] = setgroupc0c048Props,
        codeStates['groupd'] = groupd487a8,
        codeStates['setgroupd'] = setgroupd487a8,
        codeStates['groupd487a8'] = groupd487a8Props,
        codeStates['setgroupd487a8'] = setgroupd487a8Props,
        codeStates['groupb'] = groupb8f3d7,
        codeStates['setgroupb'] = setgroupb8f3d7,
        codeStates['groupb8f3d7'] = groupb8f3d7Props,
        codeStates['setgroupb8f3d7'] = setgroupb8f3d7Props,
        codeStates['comboboxa'] = comboboxa2ee09,
        codeStates['setcomboboxa'] = setcomboboxa2ee09,
        codeStates['dateandtime'] = dateandtime26c68,
        codeStates['setdateandtime'] = setdateandtime26c68,
        codeStates['button'] = buttonba9c0,
        codeStates['setbutton'] = setbuttonba9c0,
        codeStates['textinput'] = textinputaee10,
        codeStates['settextinput'] = settextinputaee10,
        codeStates['comboboxb'] = comboboxb9056e,
        codeStates['setcomboboxb'] = setcomboboxb9056e,
        codeStates['comboboxc'] = comboboxccfb84,
        codeStates['setcomboboxc'] = setcomboboxccfb84,
        codeStates['textinput123'] = textinput12354a98,
        codeStates['settextinput123'] = settextinput12354a98,
        codeStates['datepicker'] = datepicker0e91e,
        codeStates['setdatepicker'] = setdatepicker0e91e,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group123488888Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group123488888Ref.current?.setSearchParams();
    group123488888Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group123488888) && Object.keys(group123488888)?.length>0)
      {
        setgroup123488888({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group123488888Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 238',
      
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
          setcomboboxcheck_v1((pre:any)=>({...pre,_selectedGroup_:"group1234"}))
        }}
    >
        {allowedComponent.includes("state")  &&<Groupstate  
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
        {allowedComponent.includes("groupaaa")  &&<Groupgroupaaa  
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
        {allowedComponent.includes("groupc")  &&<Groupgroupc  
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
        {allowedComponent.includes("groupd")  &&<Groupgroupd  
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
        {allowedComponent.includes("groupb")  &&<Groupgroupb  
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
        {allowedControls.includes("comboboxa") ?<ComboBoxcomboboxa /* 2ee09 */ encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dateandtime") ?<DateAndTimedateandtime   /* 26c68 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "button" in ButtonGoRuleData)?ButtonGoRuleData["button"]:true) && 
          allowedControls.includes("button")  ?            <Buttonbutton tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {allowedControls.includes("textinput") ?<TextInputtextinput   /* aee10 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("comboboxb") ?<ComboBoxcomboboxb /* 9056e */ encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("comboboxc") ?<ComboBoxcomboboxc /* cfb84 */ encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("textinput123") ?<TextInputtextinput123   /* 54a98 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("datepicker") ?<DatePickerdatepicker   /* 0e91e */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup1234
