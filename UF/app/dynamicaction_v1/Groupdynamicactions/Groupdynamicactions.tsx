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
import Buttonbuttona  from "./Buttonbuttona";
import Buttonbuttonb  from "./Buttonbuttonb";
import Buttonbuttonc  from "./Buttonbuttonc";
import Buttonbuttond  from "./Buttonbuttond";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdynamicactions = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "buttona",
      "buttonb",
      "buttonc",
      "buttond"
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
      "buttona",
      "buttonb",
      "buttonc",
      "buttond"
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
      "buttona",
      "buttonb",
      "buttonc",
      "buttond"
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
  const {buttona0ee1f, setbuttona0ee1f}= useContext(TotalContext) as TotalContextProps;
  const {buttonbe1b8e, setbuttonbe1b8e}= useContext(TotalContext) as TotalContextProps;
  const {buttonc177ba, setbuttonc177ba}= useContext(TotalContext) as TotalContextProps;
  const {buttond0665e, setbuttond0665e}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa32986, setdynamicactionsa32986}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa32986Props, setdynamicactionsa32986Props}= useContext(TotalContext) as TotalContextProps;
  const {table12312058a8, settable12312058a8}= useContext(TotalContext) as TotalContextProps;
  const {table12312058a8Props, settable12312058a8Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_group03bf3, settab_group03bf3}= useContext(TotalContext) as TotalContextProps;
  const {tab_group03bf3Props, settab_group03bf3Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_119fae, settab_header_119fae}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_119faeProps, settab_header_119faeProps}= useContext(TotalContext) as TotalContextProps;
  const {gggg721e2, setgggg721e2}= useContext(TotalContext) as TotalContextProps;
  const {gggg721e2Props, setgggg721e2Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_2d8952, settab_header_2d8952}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_2d8952Props, settab_header_2d8952Props}= useContext(TotalContext) as TotalContextProps;
  const {xbxvvcv42015, setxbxvvcv42015}= useContext(TotalContext) as TotalContextProps;
  const {xbxvvcv42015Props, setxbxvvcv42015Props}= useContext(TotalContext) as TotalContextProps;
  const {value9087e, setvalue9087e}= useContext(TotalContext) as TotalContextProps;
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
    'GroupDynamicactions',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3ccd0421b9f24787aa9486ab0d6c9120");
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
    setdynamicactionsc9120Props((pre:any)=>({...pre,isHaveRule:true}))
      actionRuleHandle(orchestrationData?.data?.rule.nodes,{...decodedTokenObj,session:decodedTokenObj,
...grouped023,
});
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("buttona")){
        setbuttona0ee1f({...buttona0ee1f,isDisabled:true});

    }else
    {
      if(buttona0ee1f?.isDisabled==null)
      {
        setbuttona0ee1f({...buttona0ee1f,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("buttonb")){
        setbuttonbe1b8e({...buttonbe1b8e,isDisabled:true});

    }else
    {
      if(buttonbe1b8e?.isDisabled==null)
      {
        setbuttonbe1b8e({...buttonbe1b8e,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("buttonc")){
        setbuttonc177ba({...buttonc177ba,isDisabled:true});

    }else
    {
      if(buttonc177ba?.isDisabled==null)
      {
        setbuttonc177ba({...buttonc177ba,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("buttond")){
        setbuttond0665e({...buttond0665e,isDisabled:true});

    }else
    {
      if(buttond0665e?.isDisabled==null)
      {
        setbuttond0665e({...buttond0665e,isDisabled:false});
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
        codeStates['buttona'] = buttona0ee1f,
        codeStates['setbuttona'] = setbuttona0ee1f,
        codeStates['buttonb'] = buttonbe1b8e,
        codeStates['setbuttonb'] = setbuttonbe1b8e,
        codeStates['buttonc'] = buttonc177ba,
        codeStates['setbuttonc'] = setbuttonc177ba,
        codeStates['buttond'] = buttond0665e,
        codeStates['setbuttond'] = setbuttond0665e,
        codeStates['dynamicactionsa'] = dynamicactionsa32986,
        codeStates['setdynamicactionsa'] = setdynamicactionsa32986,
        codeStates['dynamicactionsa32986'] = dynamicactionsa32986Props,
        codeStates['setdynamicactionsa32986'] = setdynamicactionsa32986Props,
        codeStates['table12312'] = table12312058a8,
        codeStates['settable12312'] = settable12312058a8,
        codeStates['table12312058a8'] = table12312058a8Props,
        codeStates['settable12312058a8'] = settable12312058a8Props,
        codeStates['tab_group'] = tab_group03bf3,
        codeStates['settab_group'] = settab_group03bf3,
        codeStates['tab_group03bf3'] = tab_group03bf3Props,
        codeStates['settab_group03bf3'] = settab_group03bf3Props,
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
        codeStates['value'] = value9087e,
        codeStates['setvalue'] = setvalue9087e,

    codeExecution(code,codeStates);
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
        codeStates['group'] = grouped023,
        codeStates['setgroup'] = setgrouped023,
        codeStates['grouped023'] = grouped023Props,
        codeStates['setgrouped023'] = setgrouped023Props,
        codeStates['dynamicactions'] = dynamicactionsc9120,
        codeStates['setdynamicactions'] = setdynamicactionsc9120,
        codeStates['dynamicactionsc9120'] = dynamicactionsc9120Props,
        codeStates['setdynamicactionsc9120'] = setdynamicactionsc9120Props,
        codeStates['buttona'] = buttona0ee1f,
        codeStates['setbuttona'] = setbuttona0ee1f,
        codeStates['buttonb'] = buttonbe1b8e,
        codeStates['setbuttonb'] = setbuttonbe1b8e,
        codeStates['buttonc'] = buttonc177ba,
        codeStates['setbuttonc'] = setbuttonc177ba,
        codeStates['buttond'] = buttond0665e,
        codeStates['setbuttond'] = setbuttond0665e,
        codeStates['dynamicactionsa'] = dynamicactionsa32986,
        codeStates['setdynamicactionsa'] = setdynamicactionsa32986,
        codeStates['dynamicactionsa32986'] = dynamicactionsa32986Props,
        codeStates['setdynamicactionsa32986'] = setdynamicactionsa32986Props,
        codeStates['table12312'] = table12312058a8,
        codeStates['settable12312'] = settable12312058a8,
        codeStates['table12312058a8'] = table12312058a8Props,
        codeStates['settable12312058a8'] = settable12312058a8Props,
        codeStates['tab_group'] = tab_group03bf3,
        codeStates['settab_group'] = settab_group03bf3,
        codeStates['tab_group03bf3'] = tab_group03bf3Props,
        codeStates['settab_group03bf3'] = settab_group03bf3Props,
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
        codeStates['value'] = value9087e,
        codeStates['setvalue'] = setvalue9087e,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const dynamicactionsc9120Ref = useRef<any>(null);
  const handleClearSearch = () => {
    dynamicactionsc9120Ref.current?.setSearchParams();
    dynamicactionsc9120Ref.current?.handleSearch({});
  };

      async function actionRuleHandle(ruleData:any,data:any){
    if(ruleData?.length > 0){
      let result = await evaluateDecisionForDynamicActions(ruleData,data)
      let buttonOrder:any={}
      if(Array.isArray(result)&&result?.length)
      {
        result?.map((item: any) => {
          if ('order' in item) {
            buttonOrder = { ...buttonOrder, [item?.show]: item?.order }
          } else {
            buttonOrder = {
              ...buttonOrder,
              [item?.show]: { start: item?.start, end: item?.end || 4 }
            }
          }
        })
      }
      if(Object.keys(buttonOrder)?.length)
      {
        setButtonGoRuleData(buttonOrder)
        setdynamicactionsc9120Props((pre:any)=>({...pre,dynamicActionRule:buttonOrder||{}}))
      }else{
        setButtonGoRuleData({})
        setdynamicactionsc9120Props((pre:any)=>({...pre,dynamicActionRule:{}}))
      }


    }
  }
  useEffect(() => {    
       actionRuleHandle(ruleData,{...decodedTokenObj,session:decodedTokenObj,...grouped023,});
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(dynamicactionsc9120) && Object.keys(dynamicactionsc9120)?.length>0)
      {
        setdynamicactionsc9120({})
      }
    }else 
      prevRefreshRef.current= true
  }, [dynamicactionsc9120Props?.refresh,token,
grouped023[uoMapperData["13925c880a2d4549b75434b885d9087e"]["source"]]
])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '11 / 25',
        gridRow: '3 / 22',
      
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
          setdynamicaction_v1((pre:any)=>({...pre,_selectedGroup_:"dynamicactions"}))
        }}
    >
        {        ((ruleData?.length>0 && "buttona" in ButtonGoRuleData)?ButtonGoRuleData["buttona"]:true) && 
          allowedControls.includes("buttona")  ?            <Buttonbuttona tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "buttonb" in ButtonGoRuleData)?ButtonGoRuleData["buttonb"]:true) && 
          allowedControls.includes("buttonb")  ?            <Buttonbuttonb tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "buttonc" in ButtonGoRuleData)?ButtonGoRuleData["buttonc"]:true) && 
          allowedControls.includes("buttonc")  ?            <Buttonbuttonc tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "buttond" in ButtonGoRuleData)?ButtonGoRuleData["buttond"]:true) && 
          allowedControls.includes("buttond")  ?            <Buttonbuttond tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdynamicactions
