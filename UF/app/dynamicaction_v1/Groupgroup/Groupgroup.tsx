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
import Groupdynamicactions  from "../Groupdynamicactions/Groupdynamicactions";
import Groupdynamicactionsa  from "../Groupdynamicactionsa/Groupdynamicactionsa";
import Grouptable12312  from "../Grouptable12312/Grouptable12312";
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
import TextInputvalue  from "./TextInputvalue";
import Switchswitch  from "./Switchswitch";
import TextInputtextinput123  from "./TextInputtextinput123";
import DateAndTimedateandtime  from "./DateAndTimedateandtime";
import DatePickerdatepicker  from "./DatePickerdatepicker";
import Dropdowndropdown  from "./Dropdowndropdown";
import TextInputtextinput  from "./TextInputtextinput";
import Grouptab_group  from "../Grouptab_group/Grouptab_group";
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
      "value",
      "switch",
      "textinput123",
      "dateandtime",
      "datepicker",
      "dropdown",
      "textinput"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "dynamicactions",
      "dynamicactionsa",
      "table12312",
      "tab_group",
      "tab_header_1",
      "gggg",
      "tab_header_2",
      "xbxvvcv"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "user": {
    "allowedControls": [
      "value",
      "switch",
      "textinput123",
      "dateandtime",
      "datepicker",
      "dropdown",
      "textinput"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "dynamicactions",
      "dynamicactionsa",
      "table12312",
      "tab_group",
      "tab_header_1",
      "gggg",
      "tab_header_2",
      "xbxvvcv"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Template": {
    "allowedControls": [
      "value",
      "switch",
      "textinput123",
      "dateandtime",
      "datepicker",
      "dropdown",
      "textinput"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "dynamicactions",
      "dynamicactionsa",
      "table12312",
      "tab_group",
      "tab_header_1",
      "gggg",
      "tab_header_2",
      "xbxvvcv"
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
  const {grouped023, setgrouped023}= useContext(TotalContext) as TotalContextProps;
  const {grouped023Props, setgrouped023Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc9120, setdynamicactionsc9120}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc9120Props, setdynamicactionsc9120Props}= useContext(TotalContext) as TotalContextProps;
  const {value9087e, setvalue9087e}= useContext(TotalContext) as TotalContextProps;
  const {switch63dd1, setswitch63dd1}= useContext(TotalContext) as TotalContextProps;
  const {textinput123292f1, settextinput123292f1}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa32986, setdynamicactionsa32986}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa32986Props, setdynamicactionsa32986Props}= useContext(TotalContext) as TotalContextProps;
  const {dateandtimef72a6, setdateandtimef72a6}= useContext(TotalContext) as TotalContextProps;
  const {datepickerb9ae2, setdatepickerb9ae2}= useContext(TotalContext) as TotalContextProps;
  const {dropdown16aa0, setdropdown16aa0}= useContext(TotalContext) as TotalContextProps;
  const {textinput1f103, settextinput1f103}= useContext(TotalContext) as TotalContextProps;
  const {table12312058a8, settable12312058a8}= useContext(TotalContext) as TotalContextProps;
  const {table12312058a8Props, settable12312058a8Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_group03bf3, settab_group03bf3}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_119fae, settab_header_119fae}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_119faeProps, settab_header_119faeProps}= useContext(TotalContext) as TotalContextProps;
  const {gggg721e2, setgggg721e2}= useContext(TotalContext) as TotalContextProps;
  const {gggg721e2Props, setgggg721e2Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_2d8952, settab_header_2d8952}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_2d8952Props, settab_header_2d8952Props}= useContext(TotalContext) as TotalContextProps;
  const {xbxvvcv42015, setxbxvvcv42015}= useContext(TotalContext) as TotalContextProps;
  const {xbxvvcv42015Props, setxbxvvcv42015Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {dynamicaction_v1, setdynamicaction_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:dynamicAction:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6be5feda482c40908776c5d938bed023");
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
    setgrouped023Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("dynamicactions")){
        setdynamicactionsc9120({...dynamicactionsc9120,isDisabled:true});

    }else
    {
      if(dynamicactionsc9120?.isDisabled==null)
      {
        setdynamicactionsc9120({...dynamicactionsc9120,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("value")){
        setvalue9087e({...value9087e,isDisabled:true});

    }else
    {
      if(value9087e?.isDisabled==null)
      {
        setvalue9087e({...value9087e,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("switch")){
        setswitch63dd1({...switch63dd1,isDisabled:true});

    }else
    {
      if(switch63dd1?.isDisabled==null)
      {
        setswitch63dd1({...switch63dd1,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("textinput123")){
        settextinput123292f1({...textinput123292f1,isDisabled:true});

    }else
    {
      if(textinput123292f1?.isDisabled==null)
      {
        settextinput123292f1({...textinput123292f1,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dynamicactionsa")){
        setdynamicactionsa32986({...dynamicactionsa32986,isDisabled:true});

    }else
    {
      if(dynamicactionsa32986?.isDisabled==null)
      {
        setdynamicactionsa32986({...dynamicactionsa32986,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dateandtime")){
        setdateandtimef72a6({...dateandtimef72a6,isDisabled:true});

    }else
    {
      if(dateandtimef72a6?.isDisabled==null)
      {
        setdateandtimef72a6({...dateandtimef72a6,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("datepicker")){
        setdatepickerb9ae2({...datepickerb9ae2,isDisabled:true});

    }else
    {
      if(datepickerb9ae2?.isDisabled==null)
      {
        setdatepickerb9ae2({...datepickerb9ae2,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dropdown")){
        setdropdown16aa0({...dropdown16aa0,isDisabled:true});

    }else
    {
      if(dropdown16aa0?.isDisabled==null)
      {
        setdropdown16aa0({...dropdown16aa0,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("textinput")){
        settextinput1f103({...textinput1f103,isDisabled:true});

    }else
    {
      if(textinput1f103?.isDisabled==null)
      {
        settextinput1f103({...textinput1f103,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("table12312")){
        settable12312058a8({...table12312058a8,isDisabled:true});

    }else
    {
      if(table12312058a8?.isDisabled==null)
      {
        settable12312058a8({...table12312058a8,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tab_group")){
        settab_group03bf3({...tab_group03bf3,isDisabled:true});

    }else
    {
      if(tab_group03bf3?.isDisabled==null)
      {
        settab_group03bf3({...tab_group03bf3,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = grouped023,
        codeStates['setgroup'] = setgrouped023,
        codeStates['grouped023'] = grouped023Props,
        codeStates['setgrouped023'] = setgrouped023Props,
        codeStates['dynamicactions'] = dynamicactionsc9120,
        codeStates['setdynamicactions'] = setdynamicactionsc9120,
        codeStates['dynamicactionsc9120'] = dynamicactionsc9120Props,
        codeStates['setdynamicactionsc9120'] = setdynamicactionsc9120Props,
        codeStates['value'] = value9087e,
        codeStates['setvalue'] = setvalue9087e,
        codeStates['switch'] = switch63dd1,
        codeStates['setswitch'] = setswitch63dd1,
        codeStates['textinput123'] = textinput123292f1,
        codeStates['settextinput123'] = settextinput123292f1,
        codeStates['dynamicactionsa'] = dynamicactionsa32986,
        codeStates['setdynamicactionsa'] = setdynamicactionsa32986,
        codeStates['dynamicactionsa32986'] = dynamicactionsa32986Props,
        codeStates['setdynamicactionsa32986'] = setdynamicactionsa32986Props,
        codeStates['dateandtime'] = dateandtimef72a6,
        codeStates['setdateandtime'] = setdateandtimef72a6,
        codeStates['datepicker'] = datepickerb9ae2,
        codeStates['setdatepicker'] = setdatepickerb9ae2,
        codeStates['dropdown'] = dropdown16aa0,
        codeStates['setdropdown'] = setdropdown16aa0,
        codeStates['textinput'] = textinput1f103,
        codeStates['settextinput'] = settextinput1f103,
        codeStates['table12312'] = table12312058a8,
        codeStates['settable12312'] = settable12312058a8,
        codeStates['table12312058a8'] = table12312058a8Props,
        codeStates['settable12312058a8'] = settable12312058a8Props,
        codeStates['tab_group'] = tab_group03bf3,
        codeStates['settab_group'] = settab_group03bf3,
        codeStates['tab_header_1'] = tab_header_119fae,
        codeStates['settab_header_1'] = settab_header_119fae,
        codeStates['tab_header_119fae'] = tab_header_119faeProps,
        codeStates['settab_header_119fae'] = settab_header_119faeProps,
        codeStates['gggg'] = gggg721e2,
        codeStates['setgggg'] = setgggg721e2,
        codeStates['gggg721e2'] = gggg721e2Props,
        codeStates['setgggg721e2'] = setgggg721e2Props,
        codeStates['tab_header_2'] = tab_header_2d8952,
        codeStates['settab_header_2'] = settab_header_2d8952,
        codeStates['tab_header_2d8952'] = tab_header_2d8952Props,
        codeStates['settab_header_2d8952'] = settab_header_2d8952Props,
        codeStates['xbxvvcv'] = xbxvvcv42015,
        codeStates['setxbxvvcv'] = setxbxvvcv42015,
        codeStates['xbxvvcv42015'] = xbxvvcv42015Props,
        codeStates['setxbxvvcv42015'] = setxbxvvcv42015Props,

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
        codeStates['group'] = grouped023,
        codeStates['setgroup'] = setgrouped023,
        codeStates['grouped023'] = grouped023Props,
        codeStates['setgrouped023'] = setgrouped023Props,
        codeStates['dynamicactions'] = dynamicactionsc9120,
        codeStates['setdynamicactions'] = setdynamicactionsc9120,
        codeStates['dynamicactionsc9120'] = dynamicactionsc9120Props,
        codeStates['setdynamicactionsc9120'] = setdynamicactionsc9120Props,
        codeStates['value'] = value9087e,
        codeStates['setvalue'] = setvalue9087e,
        codeStates['switch'] = switch63dd1,
        codeStates['setswitch'] = setswitch63dd1,
        codeStates['textinput123'] = textinput123292f1,
        codeStates['settextinput123'] = settextinput123292f1,
        codeStates['dynamicactionsa'] = dynamicactionsa32986,
        codeStates['setdynamicactionsa'] = setdynamicactionsa32986,
        codeStates['dynamicactionsa32986'] = dynamicactionsa32986Props,
        codeStates['setdynamicactionsa32986'] = setdynamicactionsa32986Props,
        codeStates['dateandtime'] = dateandtimef72a6,
        codeStates['setdateandtime'] = setdateandtimef72a6,
        codeStates['datepicker'] = datepickerb9ae2,
        codeStates['setdatepicker'] = setdatepickerb9ae2,
        codeStates['dropdown'] = dropdown16aa0,
        codeStates['setdropdown'] = setdropdown16aa0,
        codeStates['textinput'] = textinput1f103,
        codeStates['settextinput'] = settextinput1f103,
        codeStates['table12312'] = table12312058a8,
        codeStates['settable12312'] = settable12312058a8,
        codeStates['table12312058a8'] = table12312058a8Props,
        codeStates['settable12312058a8'] = settable12312058a8Props,
        codeStates['tab_group'] = tab_group03bf3,
        codeStates['settab_group'] = settab_group03bf3,
        codeStates['tab_header_1'] = tab_header_119fae,
        codeStates['settab_header_1'] = settab_header_119fae,
        codeStates['tab_header_119fae'] = tab_header_119faeProps,
        codeStates['settab_header_119fae'] = settab_header_119faeProps,
        codeStates['gggg'] = gggg721e2,
        codeStates['setgggg'] = setgggg721e2,
        codeStates['gggg721e2'] = gggg721e2Props,
        codeStates['setgggg721e2'] = setgggg721e2Props,
        codeStates['tab_header_2'] = tab_header_2d8952,
        codeStates['settab_header_2'] = settab_header_2d8952,
        codeStates['tab_header_2d8952'] = tab_header_2d8952Props,
        codeStates['settab_header_2d8952'] = settab_header_2d8952Props,
        codeStates['xbxvvcv'] = xbxvvcv42015,
        codeStates['setxbxvvcv'] = setxbxvvcv42015,
        codeStates['xbxvvcv42015'] = xbxvvcv42015Props,
        codeStates['setxbxvvcv42015'] = setxbxvvcv42015Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const grouped023Ref = useRef<any>(null);
  const handleClearSearch = () => {
    grouped023Ref.current?.setSearchParams();
    grouped023Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(grouped023) && Object.keys(grouped023)?.length>0)
      {
        setgrouped023({})
      }
    }else 
      prevRefreshRef.current= true
  }, [grouped023Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '4 / 283',
      
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
          setdynamicaction_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
        {allowedComponent.includes("dynamicactions")  &&<Groupdynamicactions  
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
        {allowedComponent.includes("dynamicactionsa")  &&<Groupdynamicactionsa  
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
        {allowedComponent.includes("table12312")  &&<Grouptable12312  
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
        {allowedComponent.includes("tab_group")  &&<Grouptab_group  
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
        {allowedControls.includes("value") ?<TextInputvalue   /* 9087e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("switch")?<Switchswitch  /* 63dd1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("textinput123") ?<TextInputtextinput123   /* 292f1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dateandtime") ?<DateAndTimedateandtime   /* f72a6 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("datepicker") ?<DatePickerdatepicker   /* b9ae2 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dropdown") ?<Dropdowndropdown   /* 16aa0 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("textinput") ?<TextInputtextinput   /* 1f103 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup
