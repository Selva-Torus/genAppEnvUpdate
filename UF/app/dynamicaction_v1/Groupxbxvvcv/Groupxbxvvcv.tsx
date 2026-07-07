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
import Buttonbuttondsdfsd  from "./Buttonbuttondsdfsd";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupxbxvvcv = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "buttondsdfsd"
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
      "buttondsdfsd"
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
      "buttondsdfsd"
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
  const {buttondsdfsd487f1, setbuttondsdfsd487f1}= useContext(TotalContext) as TotalContextProps;
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
    'GroupXbxvvcv',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "4671cad28b25439e99e6be638b642015");
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
    setxbxvvcv42015Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("buttondsdfsd")){
        setbuttondsdfsd487f1({...buttondsdfsd487f1,isDisabled:true});

    }else
    {
      if(buttondsdfsd487f1?.isDisabled==null)
      {
        setbuttondsdfsd487f1({...buttondsdfsd487f1,isDisabled:false});
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
        codeStates['buttondsdfsd'] = buttondsdfsd487f1,
        codeStates['setbuttondsdfsd'] = setbuttondsdfsd487f1,

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
        codeStates['buttondsdfsd'] = buttondsdfsd487f1,
        codeStates['setbuttondsdfsd'] = setbuttondsdfsd487f1,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const xbxvvcv42015Ref = useRef<any>(null);
  const handleClearSearch = () => {
    xbxvvcv42015Ref.current?.setSearchParams();
    xbxvvcv42015Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(xbxvvcv42015) && Object.keys(xbxvvcv42015)?.length>0)
      {
        setxbxvvcv42015({})
      }
    }else 
      prevRefreshRef.current= true
  }, [xbxvvcv42015Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 20',
        gridRow: '2 / 38',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(8px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '8px',
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
          setdynamicaction_v1((pre:any)=>({...pre,_selectedGroup_:"xbxvvcv"}))
        }}
    >
        {        ((ruleData?.length>0 && "buttondsdfsd" in ButtonGoRuleData)?ButtonGoRuleData["buttondsdfsd"]:true) && 
          allowedControls.includes("buttondsdfsd")  ?            <Buttonbuttondsdfsd tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupxbxvvcv
