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
import Grouptable  from "../Grouptable/Grouptable";
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
import Textsetmemoryvalues  from "./Textsetmemoryvalues";
import Dropdownstate  from "./Dropdownstate";
import Dropdownstate_two  from "./Dropdownstate_two";
import TextInputcountry  from "./TextInputcountry";
import TextInputtextinput  from "./TextInputtextinput";
import Buttonbutton  from "./Buttonbutton";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_set_db_node_v1Props, setdfd_set_db_node_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "checker": {
    "allowedControls": [
      "setmemoryvalues",
      "state",
      "state_two",
      "country",
      "textinput",
      "button"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "setmemoryvalues",
      "state",
      "state_two",
      "country",
      "textinput",
      "button"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "maker": {
    "allowedControls": [
      "setmemoryvalues",
      "state",
      "state_two",
      "country",
      "textinput",
      "button"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "setmemoryvalues",
      "state",
      "state_two",
      "country",
      "textinput",
      "button"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "table"
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
  const {groupdf36a, setgroupdf36a}= useContext(TotalContext) as TotalContextProps;
  const {groupdf36aProps, setgroupdf36aProps}= useContext(TotalContext) as TotalContextProps;
  const {setmemoryvaluese2c19, setsetmemoryvaluese2c19}= useContext(TotalContext) as TotalContextProps;
  const {state62a91, setstate62a91}= useContext(TotalContext) as TotalContextProps;
  const {state_two24376, setstate_two24376}= useContext(TotalContext) as TotalContextProps;
  const {country625d4, setcountry625d4}= useContext(TotalContext) as TotalContextProps;
  const {textinput86330, settextinput86330}= useContext(TotalContext) as TotalContextProps;
  const {button3a885, setbutton3a885}= useContext(TotalContext) as TotalContextProps;
  const {tabled5efd, settabled5efd}= useContext(TotalContext) as TotalContextProps;
  const {tabled5efdProps, settabled5efdProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {setmemoryvaluesevent_v1, setsetmemoryvaluesevent_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:setMemoryValuesevent:AFVK:v1',
    [user],
    'GroupGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "60be8cd69d4042008332e39ed7bdf36a");
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
    setgroupdf36aProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("setmemoryvalues")){
        setsetmemoryvaluese2c19((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(setmemoryvaluese2c19?.isDisabled==null)
      {
        setsetmemoryvaluese2c19((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("state")){
        setstate62a91((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(state62a91?.isDisabled==null)
      {
        setstate62a91((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("state_two")){
        setstate_two24376((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(state_two24376?.isDisabled==null)
      {
        setstate_two24376((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("country")){
        setcountry625d4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(country625d4?.isDisabled==null)
      {
        setcountry625d4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("textinput")){
        settextinput86330((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(textinput86330?.isDisabled==null)
      {
        settextinput86330((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("button")){
        setbutton3a885((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(button3a885?.isDisabled==null)
      {
        setbutton3a885((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("table")){
        settabled5efdProps((pre:any)=>({...pre,...tabled5efd,isDisabled:true}));

    }else
    {
      if(tabled5efd?.isDisabled==null)
      {
        settabled5efdProps((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupdf36a,
        codeStates['setgroup'] = setgroupdf36a,
        codeStates['groupdf36a'] = groupdf36aProps,
        codeStates['setgroupdf36a'] = setgroupdf36aProps,
        codeStates['setmemoryvalues'] = setmemoryvaluese2c19,
        codeStates['setsetmemoryvalues'] = setsetmemoryvaluese2c19,
        codeStates['state'] = state62a91,
        codeStates['setstate'] = setstate62a91,
        codeStates['state_two'] = state_two24376,
        codeStates['setstate_two'] = setstate_two24376,
        codeStates['country'] = country625d4,
        codeStates['setcountry'] = setcountry625d4,
        codeStates['textinput'] = textinput86330,
        codeStates['settextinput'] = settextinput86330,
        codeStates['button'] = button3a885,
        codeStates['setbutton'] = setbutton3a885,
        codeStates['table'] = tabled5efd,
        codeStates['settable'] = settabled5efd,
        codeStates['tabled5efd'] = tabled5efdProps,
        codeStates['settabled5efd'] = settabled5efdProps,

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
        codeStates['group'] = groupdf36a,
        codeStates['setgroup'] = setgroupdf36a,
        codeStates['groupdf36a'] = groupdf36aProps,
        codeStates['setgroupdf36a'] = setgroupdf36aProps,
        codeStates['setmemoryvalues'] = setmemoryvaluese2c19,
        codeStates['setsetmemoryvalues'] = setsetmemoryvaluese2c19,
        codeStates['state'] = state62a91,
        codeStates['setstate'] = setstate62a91,
        codeStates['state_two'] = state_two24376,
        codeStates['setstate_two'] = setstate_two24376,
        codeStates['country'] = country625d4,
        codeStates['setcountry'] = setcountry625d4,
        codeStates['textinput'] = textinput86330,
        codeStates['settextinput'] = settextinput86330,
        codeStates['button'] = button3a885,
        codeStates['setbutton'] = setbutton3a885,
        codeStates['table'] = tabled5efd,
        codeStates['settable'] = settabled5efd,
        codeStates['tabled5efd'] = tabled5efdProps,
        codeStates['settabled5efd'] = settabled5efdProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const groupdf36aRef = useRef<any>(null);
  const handleClearSearch = () => {
    groupdf36aRef.current?.setSearchParams();
    groupdf36aRef.current?.handleSearch({});
  };

  useEffect(() => {    
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true
      handleOnload()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(groupdf36a) &&
        Object.keys(groupdf36a)?.length > 0
      ) {
        setgroupdf36a({})
      }
    } else prevRefreshRef.current = true
  }, [groupdf36aProps?.refresh])

  useEffect(() => {
    securityCheck()
  }, [token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 210',
      
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
          setsetmemoryvaluesevent_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
        {allowedComponent.includes("table")  &&<Grouptable  
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
          {allowedControls.includes("setmemoryvalues") ?<Textsetmemoryvalues   /* e2c19 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("state") ?<Dropdownstate   /* 62a91 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("state_two") ?<Dropdownstate_two   /* 24376 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("country") ?<TextInputcountry   /* 625d4 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("textinput") ?<TextInputtextinput   /* 86330 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "button" in ButtonGoRuleData)?ButtonGoRuleData["button"]:true) && 
          allowedControls.includes("button")  ?            <Buttonbutton tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup
