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
import Textmaintenance_text_icon  from "./Textmaintenance_text_icon";
import Textmaintenance_text  from "./Textmaintenance_text";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupicon_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetmaintenance_v1Props, setdfd_assetmaintenance_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Maker": {
    "allowedControls": [
      "maintenance_text_icon",
      "maintenance_text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_maintenance_group",
      "icon_group",
      "maintenance_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "maintenance_text_icon",
      "maintenance_text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_maintenance_group",
      "icon_group",
      "maintenance_table"
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
  const {overall_maintenance_group04cba, setoverall_maintenance_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_maintenance_group04cbaProps, setoverall_maintenance_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {icon_groupedce3, seticon_groupedce3}= useContext(TotalContext) as TotalContextProps;
  const {icon_groupedce3Props, seticon_groupedce3Props}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_text_icondf716, setmaintenance_text_icondf716}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_text0649c, setmaintenance_text0649c}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_table75a5d, setmaintenance_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_table75a5dProps, setmaintenance_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assetmaintenance_v1, setassetmaintenance_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1',
    [user],
    'GroupIconGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "31418f6659144f5f8249faa3203edce3");
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
    seticon_groupedce3Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("maintenance_text_icon")){
        setmaintenance_text_icondf716({...maintenance_text_icondf716,isDisabled:true});

    }else
    {
      if(maintenance_text_icondf716?.isDisabled==null)
      {
        setmaintenance_text_icondf716({...maintenance_text_icondf716,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("maintenance_text")){
        setmaintenance_text0649c({...maintenance_text0649c,isDisabled:true});

    }else
    {
      if(maintenance_text0649c?.isDisabled==null)
      {
        setmaintenance_text0649c({...maintenance_text0649c,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_maintenance_group'] = overall_maintenance_group04cba,
        codeStates['setoverall_maintenance_group'] = setoverall_maintenance_group04cba,
        codeStates['overall_maintenance_group04cba'] = overall_maintenance_group04cbaProps,
        codeStates['setoverall_maintenance_group04cba'] = setoverall_maintenance_group04cbaProps,
        codeStates['icon_group'] = icon_groupedce3,
        codeStates['seticon_group'] = seticon_groupedce3,
        codeStates['icon_groupedce3'] = icon_groupedce3Props,
        codeStates['seticon_groupedce3'] = seticon_groupedce3Props,
        codeStates['maintenance_text_icon'] = maintenance_text_icondf716,
        codeStates['setmaintenance_text_icon'] = setmaintenance_text_icondf716,
        codeStates['maintenance_text'] = maintenance_text0649c,
        codeStates['setmaintenance_text'] = setmaintenance_text0649c,
        codeStates['maintenance_table'] = maintenance_table75a5d,
        codeStates['setmaintenance_table'] = setmaintenance_table75a5d,
        codeStates['maintenance_table75a5d'] = maintenance_table75a5dProps,
        codeStates['setmaintenance_table75a5d'] = setmaintenance_table75a5dProps,

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
        codeStates['overall_maintenance_group'] = overall_maintenance_group04cba,
        codeStates['setoverall_maintenance_group'] = setoverall_maintenance_group04cba,
        codeStates['overall_maintenance_group04cba'] = overall_maintenance_group04cbaProps,
        codeStates['setoverall_maintenance_group04cba'] = setoverall_maintenance_group04cbaProps,
        codeStates['icon_group'] = icon_groupedce3,
        codeStates['seticon_group'] = seticon_groupedce3,
        codeStates['icon_groupedce3'] = icon_groupedce3Props,
        codeStates['seticon_groupedce3'] = seticon_groupedce3Props,
        codeStates['maintenance_text_icon'] = maintenance_text_icondf716,
        codeStates['setmaintenance_text_icon'] = setmaintenance_text_icondf716,
        codeStates['maintenance_text'] = maintenance_text0649c,
        codeStates['setmaintenance_text'] = setmaintenance_text0649c,
        codeStates['maintenance_table'] = maintenance_table75a5d,
        codeStates['setmaintenance_table'] = setmaintenance_table75a5d,
        codeStates['maintenance_table75a5d'] = maintenance_table75a5dProps,
        codeStates['setmaintenance_table75a5d'] = setmaintenance_table75a5dProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const icon_groupedce3Ref = useRef<any>(null);
  const handleClearSearch = () => {
    icon_groupedce3Ref.current?.setSearchParams();
    icon_groupedce3Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(icon_groupedce3) && Object.keys(icon_groupedce3)?.length>0)
      {
        seticon_groupedce3({})
      }
    }else 
      prevRefreshRef.current= true
  }, [icon_groupedce3Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 5',
        gridRow: '1 / 9',
      
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
       onClick={()=>handleOnClick({}, 0)}
    >
          {allowedControls.includes("maintenance_text_icon") ?<Textmaintenance_text_icon   /* df716 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("maintenance_text") ?<Textmaintenance_text   /* 0649c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupicon_group
