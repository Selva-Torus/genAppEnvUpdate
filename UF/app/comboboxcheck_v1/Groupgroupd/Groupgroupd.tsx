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
import Texttext545  from "./Texttext545";
import DatePickerdatepicker123  from "./DatePickerdatepicker123";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroupd = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "text545",
      "datepicker123"
    ],
    "allowedGroups": [
      "canvas",
      "group1234",
      "state",
      "groupaaa",
      "groupb",
      "groupc",
      "groupd"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "user": {
    "allowedControls": [
      "text545",
      "datepicker123"
    ],
    "allowedGroups": [
      "canvas",
      "group1234",
      "state",
      "groupaaa",
      "groupb",
      "groupc",
      "groupd"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Template": {
    "allowedControls": [
      "text545",
      "datepicker123"
    ],
    "allowedGroups": [
      "canvas",
      "group1234",
      "state",
      "groupaaa",
      "groupb",
      "groupc",
      "groupd"
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
  const {groupb8f3d7, setgroupb8f3d7}= useContext(TotalContext) as TotalContextProps;
  const {groupb8f3d7Props, setgroupb8f3d7Props}= useContext(TotalContext) as TotalContextProps;
  const {groupc0c048, setgroupc0c048}= useContext(TotalContext) as TotalContextProps;
  const {groupc0c048Props, setgroupc0c048Props}= useContext(TotalContext) as TotalContextProps;
  const {groupd487a8, setgroupd487a8}= useContext(TotalContext) as TotalContextProps;
  const {groupd487a8Props, setgroupd487a8Props}= useContext(TotalContext) as TotalContextProps;
  const {text54509a93, settext54509a93}= useContext(TotalContext) as TotalContextProps;
  const {datepicker123acd53, setdatepicker123acd53}= useContext(TotalContext) as TotalContextProps;
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
    'GroupGroupd',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a4fcf000188844c184d176620e8487a8");
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
    setgroupd487a8Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("text545")){
        settext54509a93({...text54509a93,isDisabled:true});

    }else
    {
      if(text54509a93?.isDisabled==null)
      {
        settext54509a93({...text54509a93,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("datepicker123")){
        setdatepicker123acd53({...datepicker123acd53,isDisabled:true});

    }else
    {
      if(datepicker123acd53?.isDisabled==null)
      {
        setdatepicker123acd53({...datepicker123acd53,isDisabled:false});
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
        codeStates['groupb'] = groupb8f3d7,
        codeStates['setgroupb'] = setgroupb8f3d7,
        codeStates['groupb8f3d7'] = groupb8f3d7Props,
        codeStates['setgroupb8f3d7'] = setgroupb8f3d7Props,
        codeStates['groupc'] = groupc0c048,
        codeStates['setgroupc'] = setgroupc0c048,
        codeStates['groupc0c048'] = groupc0c048Props,
        codeStates['setgroupc0c048'] = setgroupc0c048Props,
        codeStates['groupd'] = groupd487a8,
        codeStates['setgroupd'] = setgroupd487a8,
        codeStates['groupd487a8'] = groupd487a8Props,
        codeStates['setgroupd487a8'] = setgroupd487a8Props,
        codeStates['text545'] = text54509a93,
        codeStates['settext545'] = settext54509a93,
        codeStates['datepicker123'] = datepicker123acd53,
        codeStates['setdatepicker123'] = setdatepicker123acd53,

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
        codeStates['groupb'] = groupb8f3d7,
        codeStates['setgroupb'] = setgroupb8f3d7,
        codeStates['groupb8f3d7'] = groupb8f3d7Props,
        codeStates['setgroupb8f3d7'] = setgroupb8f3d7Props,
        codeStates['groupc'] = groupc0c048,
        codeStates['setgroupc'] = setgroupc0c048,
        codeStates['groupc0c048'] = groupc0c048Props,
        codeStates['setgroupc0c048'] = setgroupc0c048Props,
        codeStates['groupd'] = groupd487a8,
        codeStates['setgroupd'] = setgroupd487a8,
        codeStates['groupd487a8'] = groupd487a8Props,
        codeStates['setgroupd487a8'] = setgroupd487a8Props,
        codeStates['text545'] = text54509a93,
        codeStates['settext545'] = settext54509a93,
        codeStates['datepicker123'] = datepicker123acd53,
        codeStates['setdatepicker123'] = setdatepicker123acd53,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const groupd487a8Ref = useRef<any>(null);
  const handleClearSearch = () => {
    groupd487a8Ref.current?.setSearchParams();
    groupd487a8Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(groupd487a8) && Object.keys(groupd487a8)?.length>0)
      {
        setgroupd487a8({})
      }
    }else 
      prevRefreshRef.current= true
  }, [groupd487a8Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '18 / 24',
        gridRow: '128 / 182',
      
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
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}  ${comboboxcheck_v1?._selectedGroup_=="groupd" ?'border-2 border-solid !border-[var(--selection-color)]': ''}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setcomboboxcheck_v1((pre:any)=>({...pre,_selectedGroup_:"groupd"}))
        }}
    >
          {allowedControls.includes("text545") ?<Texttext545   /* 09a93 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("datepicker123") ?<DatePickerdatepicker123   /* acd53 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroupd
