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
import TextInputtextinput  from "./TextInputtextinput";
import TextInputtextinput5  from "./TextInputtextinput5";
import DateAndTimedateandtime  from "./DateAndTimedateandtime";
import DatePickerdatepicker  from "./DatePickerdatepicker";
import TextInputtextinput1  from "./TextInputtextinput1";
import TextInputtextinput2  from "./TextInputtextinput2";
import TextInputtextinput3  from "./TextInputtextinput3";
import TextInputtextinput4  from "./TextInputtextinput4";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "textinput",
      "textinput5",
      "dateandtime",
      "datepicker",
      "textinput1",
      "textinput2",
      "textinput3",
      "textinput4"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "user": {
    "allowedControls": [
      "textinput",
      "textinput5",
      "dateandtime",
      "datepicker",
      "textinput1",
      "textinput2",
      "textinput3",
      "textinput4"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Template": {
    "allowedControls": [
      "textinput",
      "textinput5",
      "dateandtime",
      "datepicker",
      "textinput1",
      "textinput2",
      "textinput3",
      "textinput4"
    ],
    "allowedGroups": [
      "canvas",
      "group"
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
  const {group7f2ed, setgroup7f2ed}= useContext(TotalContext) as TotalContextProps;
  const {group7f2edProps, setgroup7f2edProps}= useContext(TotalContext) as TotalContextProps;
  const {textinputd0435, settextinputd0435}= useContext(TotalContext) as TotalContextProps;
  const {textinput5daae3, settextinput5daae3}= useContext(TotalContext) as TotalContextProps;
  const {dateandtimec481e, setdateandtimec481e}= useContext(TotalContext) as TotalContextProps;
  const {datepicker019ca, setdatepicker019ca}= useContext(TotalContext) as TotalContextProps;
  const {textinput165d1d, settextinput165d1d}= useContext(TotalContext) as TotalContextProps;
  const {textinput204f11, settextinput204f11}= useContext(TotalContext) as TotalContextProps;
  const {textinput38ac83, settextinput38ac83}= useContext(TotalContext) as TotalContextProps;
  const {textinput455cca, settextinput455cca}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {ffff_v1, setffff_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:ffff:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "aaa21094dc8b49d0be2621f7ea87f2ed");
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
    setgroup7f2edProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("textinput")){
        settextinputd0435({...textinputd0435,isDisabled:true});

    }else
    {
      if(textinputd0435?.isDisabled==null)
      {
        settextinputd0435({...textinputd0435,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("textinput5")){
        settextinput5daae3({...textinput5daae3,isDisabled:true});

    }else
    {
      if(textinput5daae3?.isDisabled==null)
      {
        settextinput5daae3({...textinput5daae3,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dateandtime")){
        setdateandtimec481e({...dateandtimec481e,isDisabled:true});

    }else
    {
      if(dateandtimec481e?.isDisabled==null)
      {
        setdateandtimec481e({...dateandtimec481e,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("datepicker")){
        setdatepicker019ca({...datepicker019ca,isDisabled:true});

    }else
    {
      if(datepicker019ca?.isDisabled==null)
      {
        setdatepicker019ca({...datepicker019ca,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("textinput1")){
        settextinput165d1d({...textinput165d1d,isDisabled:true});

    }else
    {
      if(textinput165d1d?.isDisabled==null)
      {
        settextinput165d1d({...textinput165d1d,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("textinput2")){
        settextinput204f11({...textinput204f11,isDisabled:true});

    }else
    {
      if(textinput204f11?.isDisabled==null)
      {
        settextinput204f11({...textinput204f11,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("textinput3")){
        settextinput38ac83({...textinput38ac83,isDisabled:true});

    }else
    {
      if(textinput38ac83?.isDisabled==null)
      {
        settextinput38ac83({...textinput38ac83,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("textinput4")){
        settextinput455cca({...textinput455cca,isDisabled:true});

    }else
    {
      if(textinput455cca?.isDisabled==null)
      {
        settextinput455cca({...textinput455cca,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group7f2ed,
        codeStates['setgroup'] = setgroup7f2ed,
        codeStates['group7f2ed'] = group7f2edProps,
        codeStates['setgroup7f2ed'] = setgroup7f2edProps,
        codeStates['textinput'] = textinputd0435,
        codeStates['settextinput'] = settextinputd0435,
        codeStates['textinput5'] = textinput5daae3,
        codeStates['settextinput5'] = settextinput5daae3,
        codeStates['dateandtime'] = dateandtimec481e,
        codeStates['setdateandtime'] = setdateandtimec481e,
        codeStates['datepicker'] = datepicker019ca,
        codeStates['setdatepicker'] = setdatepicker019ca,
        codeStates['textinput1'] = textinput165d1d,
        codeStates['settextinput1'] = settextinput165d1d,
        codeStates['textinput2'] = textinput204f11,
        codeStates['settextinput2'] = settextinput204f11,
        codeStates['textinput3'] = textinput38ac83,
        codeStates['settextinput3'] = settextinput38ac83,
        codeStates['textinput4'] = textinput455cca,
        codeStates['settextinput4'] = settextinput455cca,

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
        codeStates['group'] = group7f2ed,
        codeStates['setgroup'] = setgroup7f2ed,
        codeStates['group7f2ed'] = group7f2edProps,
        codeStates['setgroup7f2ed'] = setgroup7f2edProps,
        codeStates['textinput'] = textinputd0435,
        codeStates['settextinput'] = settextinputd0435,
        codeStates['textinput5'] = textinput5daae3,
        codeStates['settextinput5'] = settextinput5daae3,
        codeStates['dateandtime'] = dateandtimec481e,
        codeStates['setdateandtime'] = setdateandtimec481e,
        codeStates['datepicker'] = datepicker019ca,
        codeStates['setdatepicker'] = setdatepicker019ca,
        codeStates['textinput1'] = textinput165d1d,
        codeStates['settextinput1'] = settextinput165d1d,
        codeStates['textinput2'] = textinput204f11,
        codeStates['settextinput2'] = settextinput204f11,
        codeStates['textinput3'] = textinput38ac83,
        codeStates['settextinput3'] = settextinput38ac83,
        codeStates['textinput4'] = textinput455cca,
        codeStates['settextinput4'] = settextinput455cca,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group7f2edRef = useRef<any>(null);
  const handleClearSearch = () => {
    group7f2edRef.current?.setSearchParams();
    group7f2edRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group7f2ed) && Object.keys(group7f2ed)?.length>0)
      {
        setgroup7f2ed({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group7f2edProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 133',
      
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
          setffff_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
        {allowedControls.includes("textinput") ?<TextInputtextinput   /* d0435 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("textinput5") ?<TextInputtextinput5   /* daae3 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dateandtime") ?<DateAndTimedateandtime   /* c481e */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("datepicker") ?<DatePickerdatepicker   /* 019ca */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("textinput1") ?<TextInputtextinput1   /* 65d1d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("textinput2") ?<TextInputtextinput2   /* 04f11 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("textinput3") ?<TextInputtextinput3   /* 8ac83 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("textinput4") ?<TextInputtextinput4   /* 55cca */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup
