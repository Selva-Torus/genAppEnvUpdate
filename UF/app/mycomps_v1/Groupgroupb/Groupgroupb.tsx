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
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroupb = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
    "allowedControls": [],
    "allowedGroups": [
      "dddd",
      "group",
      "grouparray",
      "tab_group",
      "tab_header_2",
      "groupb",
      "table",
      "tab_header_3",
      "groupa"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "user": {
    "allowedControls": [],
    "allowedGroups": [
      "dddd",
      "group",
      "grouparray",
      "tab_group",
      "tab_header_2",
      "groupb",
      "table",
      "tab_header_3",
      "groupa"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Template": {
    "allowedControls": [],
    "allowedGroups": [
      "dddd",
      "group",
      "grouparray",
      "tab_group",
      "tab_header_2",
      "groupb",
      "table",
      "tab_header_3",
      "groupa"
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
  const {group5635d, setgroup5635d}= useContext(TotalContext) as TotalContextProps;
  const {group5635dProps, setgroup5635dProps}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a, setgrouparray81c1a}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1aProps, setgrouparray81c1aProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_group4b1a3, settab_group4b1a3}= useContext(TotalContext) as TotalContextProps;
  const {tab_group4b1a3Props, settab_group4b1a3Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_22515d, settab_header_22515d}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_22515dProps, settab_header_22515dProps}= useContext(TotalContext) as TotalContextProps;
  const {groupb5565e, setgroupb5565e}= useContext(TotalContext) as TotalContextProps;
  const {groupb5565eProps, setgroupb5565eProps}= useContext(TotalContext) as TotalContextProps;
  const {table050eb, settable050eb}= useContext(TotalContext) as TotalContextProps;
  const {table050ebProps, settable050ebProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_370ce9, settab_header_370ce9}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_370ce9Props, settab_header_370ce9Props}= useContext(TotalContext) as TotalContextProps;
  const {groupa1825e, setgroupa1825e}= useContext(TotalContext) as TotalContextProps;
  const {groupa1825eProps, setgroupa1825eProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {mycomps_v1, setmycomps_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:mycomps:AFVK:v1',
    [user],
    'GroupGroupb',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "48e0083885634035b598ed181775565e");
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
    setgroupb5565eProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("table")){
        settable050eb({...table050eb,isDisabled:true});

    }else
    {
      if(table050eb?.isDisabled==null)
      {
        settable050eb({...table050eb,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group5635d,
        codeStates['setgroup'] = setgroup5635d,
        codeStates['group5635d'] = group5635dProps,
        codeStates['setgroup5635d'] = setgroup5635dProps,
        codeStates['grouparray'] = grouparray81c1a,
        codeStates['setgrouparray'] = setgrouparray81c1a,
        codeStates['grouparray81c1a'] = grouparray81c1aProps,
        codeStates['setgrouparray81c1a'] = setgrouparray81c1aProps,
        codeStates['tab_group'] = tab_group4b1a3,
        codeStates['settab_group'] = settab_group4b1a3,
        codeStates['tab_group4b1a3'] = tab_group4b1a3Props,
        codeStates['settab_group4b1a3'] = settab_group4b1a3Props,
        codeStates['tab_header_2'] = tab_header_22515d,
        codeStates['settab_header_2'] = settab_header_22515d,
        codeStates['tab_header_22515d'] = tab_header_22515dProps,
        codeStates['settab_header_22515d'] = settab_header_22515dProps,
        codeStates['groupb'] = groupb5565e,
        codeStates['setgroupb'] = setgroupb5565e,
        codeStates['groupb5565e'] = groupb5565eProps,
        codeStates['setgroupb5565e'] = setgroupb5565eProps,
        codeStates['table'] = table050eb,
        codeStates['settable'] = settable050eb,
        codeStates['table050eb'] = table050ebProps,
        codeStates['settable050eb'] = settable050ebProps,
        codeStates['tab_header_3'] = tab_header_370ce9,
        codeStates['settab_header_3'] = settab_header_370ce9,
        codeStates['tab_header_370ce9'] = tab_header_370ce9Props,
        codeStates['settab_header_370ce9'] = settab_header_370ce9Props,
        codeStates['groupa'] = groupa1825e,
        codeStates['setgroupa'] = setgroupa1825e,
        codeStates['groupa1825e'] = groupa1825eProps,
        codeStates['setgroupa1825e'] = setgroupa1825eProps,

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
        codeStates['group'] = group5635d,
        codeStates['setgroup'] = setgroup5635d,
        codeStates['group5635d'] = group5635dProps,
        codeStates['setgroup5635d'] = setgroup5635dProps,
        codeStates['grouparray'] = grouparray81c1a,
        codeStates['setgrouparray'] = setgrouparray81c1a,
        codeStates['grouparray81c1a'] = grouparray81c1aProps,
        codeStates['setgrouparray81c1a'] = setgrouparray81c1aProps,
        codeStates['tab_group'] = tab_group4b1a3,
        codeStates['settab_group'] = settab_group4b1a3,
        codeStates['tab_group4b1a3'] = tab_group4b1a3Props,
        codeStates['settab_group4b1a3'] = settab_group4b1a3Props,
        codeStates['tab_header_2'] = tab_header_22515d,
        codeStates['settab_header_2'] = settab_header_22515d,
        codeStates['tab_header_22515d'] = tab_header_22515dProps,
        codeStates['settab_header_22515d'] = settab_header_22515dProps,
        codeStates['groupb'] = groupb5565e,
        codeStates['setgroupb'] = setgroupb5565e,
        codeStates['groupb5565e'] = groupb5565eProps,
        codeStates['setgroupb5565e'] = setgroupb5565eProps,
        codeStates['table'] = table050eb,
        codeStates['settable'] = settable050eb,
        codeStates['table050eb'] = table050ebProps,
        codeStates['settable050eb'] = settable050ebProps,
        codeStates['tab_header_3'] = tab_header_370ce9,
        codeStates['settab_header_3'] = settab_header_370ce9,
        codeStates['tab_header_370ce9'] = tab_header_370ce9Props,
        codeStates['settab_header_370ce9'] = settab_header_370ce9Props,
        codeStates['groupa'] = groupa1825e,
        codeStates['setgroupa'] = setgroupa1825e,
        codeStates['groupa1825e'] = groupa1825eProps,
        codeStates['setgroupa1825e'] = setgroupa1825eProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const groupb5565eRef = useRef<any>(null);
  const handleClearSearch = () => {
    groupb5565eRef.current?.setSearchParams();
    groupb5565eRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(groupb5565e) && Object.keys(groupb5565e)?.length>0)
      {
        setgroupb5565e({})
      }
    }else 
      prevRefreshRef.current= true
  }, [groupb5565eProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '2 / 58',
      
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
          setmycomps_v1((pre:any)=>({...pre,_selectedGroup_:"groupb"}))
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
    </div>
 )
}

export default Groupgroupb
