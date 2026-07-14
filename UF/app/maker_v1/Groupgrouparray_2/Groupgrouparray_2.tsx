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
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgrouparray = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_userdfd_v1Props, setdfd_userdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "textinput"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "grouparray"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "user": {
    "allowedControls": [
      "textinput"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "grouparray"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Template": {
    "allowedControls": [
      "textinput"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "grouparray"
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
  const {grouparray55d38_0, setgrouparray55d38_0}= useContext(TotalContext) as TotalContextProps;
  const {grouparray55d38_0Props, setgrouparray55d38_0Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray55d38_1, setgrouparray55d38_1}= useContext(TotalContext) as TotalContextProps;
  const {grouparray55d38_1Props, setgrouparray55d38_1Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray55d38_2, setgrouparray55d38_2}= useContext(TotalContext) as TotalContextProps;
  const {grouparray55d38_2Props, setgrouparray55d38_2Props}= useContext(TotalContext) as TotalContextProps;
  const {groupe0568, setgroupe0568}= useContext(TotalContext) as TotalContextProps;
  const {groupe0568Props, setgroupe0568Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray55d38, setgrouparray55d38}= useContext(TotalContext) as TotalContextProps;
  const {grouparray55d38Props, setgrouparray55d38Props}= useContext(TotalContext) as TotalContextProps;
  const {textinputa3fbc, settextinputa3fbc}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {maker_v1, setmaker_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:maker:AFVK:v1',
    [user],
    'GroupGrouparray',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "b28ef7b95acb433bb7a8d7db65b55d38");
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
    setgrouparray55d38Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("textinput")){
        settextinputa3fbc({...textinputa3fbc,isDisabled:true});

    }else
    {
      if(textinputa3fbc?.isDisabled==null)
      {
        settextinputa3fbc({...textinputa3fbc,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['grouparray55'] = grouparray55d38_0,
        codeStates['setgrouparray55'] = setgrouparray55d38_0,
        codeStates['grouparray55d38_0'] = grouparray55d38_0Props,
        codeStates['setgrouparray55d38_0'] = setgrouparray55d38_0Props,
        codeStates['grouparray55'] = grouparray55d38_1,
        codeStates['setgrouparray55'] = setgrouparray55d38_1,
        codeStates['grouparray55d38_1'] = grouparray55d38_1Props,
        codeStates['setgrouparray55d38_1'] = setgrouparray55d38_1Props,
        codeStates['grouparray55'] = grouparray55d38_2,
        codeStates['setgrouparray55'] = setgrouparray55d38_2,
        codeStates['grouparray55d38_2'] = grouparray55d38_2Props,
        codeStates['setgrouparray55d38_2'] = setgrouparray55d38_2Props,
        codeStates['group'] = groupe0568,
        codeStates['setgroup'] = setgroupe0568,
        codeStates['groupe0568'] = groupe0568Props,
        codeStates['setgroupe0568'] = setgroupe0568Props,
        codeStates['grouparray'] = grouparray55d38,
        codeStates['setgrouparray'] = setgrouparray55d38,
        codeStates['grouparray55d38'] = grouparray55d38Props,
        codeStates['setgrouparray55d38'] = setgrouparray55d38Props,
        codeStates['textinput'] = textinputa3fbc,
        codeStates['settextinput'] = settextinputa3fbc,

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
        codeStates['grouparray55'] = grouparray55d38_0,
        codeStates['setgrouparray55'] = setgrouparray55d38_0,
        codeStates['grouparray55d38_0'] = grouparray55d38_0Props,
        codeStates['setgrouparray55d38_0'] = setgrouparray55d38_0Props,
        codeStates['grouparray55'] = grouparray55d38_1,
        codeStates['setgrouparray55'] = setgrouparray55d38_1,
        codeStates['grouparray55d38_1'] = grouparray55d38_1Props,
        codeStates['setgrouparray55d38_1'] = setgrouparray55d38_1Props,
        codeStates['grouparray55'] = grouparray55d38_2,
        codeStates['setgrouparray55'] = setgrouparray55d38_2,
        codeStates['grouparray55d38_2'] = grouparray55d38_2Props,
        codeStates['setgrouparray55d38_2'] = setgrouparray55d38_2Props,
        codeStates['group'] = groupe0568,
        codeStates['setgroup'] = setgroupe0568,
        codeStates['groupe0568'] = groupe0568Props,
        codeStates['setgroupe0568'] = setgroupe0568Props,
        codeStates['grouparray'] = grouparray55d38,
        codeStates['setgrouparray'] = setgrouparray55d38,
        codeStates['grouparray55d38'] = grouparray55d38Props,
        codeStates['setgrouparray55d38'] = setgrouparray55d38Props,
        codeStates['textinput'] = textinputa3fbc,
        codeStates['settextinput'] = settextinputa3fbc,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const grouparray55d38_2Ref = useRef<any>(null);
  const handleClearSearch = () => {
    grouparray55d38_2Ref.current?.setSearchParams();
    grouparray55d38_2Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(grouparray55d38_2) && Object.keys(grouparray55d38_2)?.length>0)
      {
        setgrouparray55d38_2({})
      }
    }else 
      prevRefreshRef.current= true
  }, [grouparray55d38_2Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridRow: 'span 70', 
        gridColumn: 'span 22',  
      
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
          setmaker_v1((pre:any)=>({...pre,_selectedGroup_:"grouparray"}))
        }}
    >
        {allowedControls.includes("textinput") ?<TextInputtextinput   /* a3fbc */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgrouparray
