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
import Groupgrouparray  from "../Groupgrouparray/Groupgrouparray";
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
import TextInputcountry  from "./TextInputcountry";
import TextInputmy_id  from "./TextInputmy_id";
import Buttonsave  from "./Buttonsave";
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
      "country",
      "my_id",
      "save"
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
      "country",
      "my_id",
      "save"
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
      "country",
      "my_id",
      "save"
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
  const {groupe0568, setgroupe0568}= useContext(TotalContext) as TotalContextProps;
  const {groupe0568Props, setgroupe0568Props}= useContext(TotalContext) as TotalContextProps;
  const {country3b817, setcountry3b817}= useContext(TotalContext) as TotalContextProps;
  const {my_id84e54, setmy_id84e54}= useContext(TotalContext) as TotalContextProps;
  const {save12f95, setsave12f95}= useContext(TotalContext) as TotalContextProps;
  const {grouparray55d38, setgrouparray55d38}= useContext(TotalContext) as TotalContextProps;
  const {grouparray55d38Props, setgrouparray55d38Props}= useContext(TotalContext) as TotalContextProps;
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ee225dc1c769462ab5bf20109e7e0568");
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
    setgroupe0568Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("country")){
        setcountry3b817({...country3b817,isDisabled:true});

    }else
    {
      if(country3b817?.isDisabled==null)
      {
        setcountry3b817({...country3b817,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("my_id")){
        setmy_id84e54({...my_id84e54,isDisabled:true});

    }else
    {
      if(my_id84e54?.isDisabled==null)
      {
        setmy_id84e54({...my_id84e54,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("save")){
        setsave12f95({...save12f95,isDisabled:true});

    }else
    {
      if(save12f95?.isDisabled==null)
      {
        setsave12f95({...save12f95,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grouparray")){
        setgrouparray55d38({...grouparray55d38,isDisabled:true});

    }else
    {
      if(grouparray55d38?.isDisabled==null)
      {
        setgrouparray55d38({...grouparray55d38,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupe0568,
        codeStates['setgroup'] = setgroupe0568,
        codeStates['groupe0568'] = groupe0568Props,
        codeStates['setgroupe0568'] = setgroupe0568Props,
        codeStates['country'] = country3b817,
        codeStates['setcountry'] = setcountry3b817,
        codeStates['my_id'] = my_id84e54,
        codeStates['setmy_id'] = setmy_id84e54,
        codeStates['save'] = save12f95,
        codeStates['setsave'] = setsave12f95,
        codeStates['grouparray'] = grouparray55d38,
        codeStates['setgrouparray'] = setgrouparray55d38,
        codeStates['grouparray55d38'] = grouparray55d38Props,
        codeStates['setgrouparray55d38'] = setgrouparray55d38Props,

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
        codeStates['group'] = groupe0568,
        codeStates['setgroup'] = setgroupe0568,
        codeStates['groupe0568'] = groupe0568Props,
        codeStates['setgroupe0568'] = setgroupe0568Props,
        codeStates['country'] = country3b817,
        codeStates['setcountry'] = setcountry3b817,
        codeStates['my_id'] = my_id84e54,
        codeStates['setmy_id'] = setmy_id84e54,
        codeStates['save'] = save12f95,
        codeStates['setsave'] = setsave12f95,
        codeStates['grouparray'] = grouparray55d38,
        codeStates['setgrouparray'] = setgrouparray55d38,
        codeStates['grouparray55d38'] = grouparray55d38Props,
        codeStates['setgrouparray55d38'] = setgrouparray55d38Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const groupe0568Ref = useRef<any>(null);
  const handleClearSearch = () => {
    groupe0568Ref.current?.setSearchParams();
    groupe0568Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(groupe0568) && Object.keys(groupe0568)?.length>0)
      {
        setgroupe0568({})
      }
    }else 
      prevRefreshRef.current= true
  }, [groupe0568Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 145',
      
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
          setmaker_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
        {allowedComponent.includes("grouparray")  &&<Groupgrouparray  
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
        {allowedControls.includes("country") ?<TextInputcountry   /* 3b817 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("my_id") ?<TextInputmy_id   /* 84e54 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "save" in ButtonGoRuleData)?ButtonGoRuleData["save"]:true) && 
          allowedControls.includes("save")  ?            <Buttonsave tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup
