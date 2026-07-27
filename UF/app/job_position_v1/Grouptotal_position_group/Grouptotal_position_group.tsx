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
import Grouptotal_positions_table  from "../Grouptotal_positions_table/Grouptotal_positions_table";
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
import Textpositions_text  from "./Textpositions_text";
import Buttonbt_search  from "./Buttonbt_search";
import Buttonbutton_add  from "./Buttonbutton_add";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptotal_position_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_jobpositions_v1Props, setdfd_jobpositions_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "positions_text",
      "bt_search",
      "button_add"
    ],
    "allowedGroups": [
      "canvas",
      "total_position_group",
      "total_positions_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "positions_text",
      "bt_search",
      "button_add"
    ],
    "allowedGroups": [
      "canvas",
      "total_position_group",
      "total_positions_table"
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
  const {total_position_group79a63, settotal_position_group79a63}= useContext(TotalContext) as TotalContextProps;
  const {total_position_group79a63Props, settotal_position_group79a63Props}= useContext(TotalContext) as TotalContextProps;
  const {positions_textf724d, setpositions_textf724d}= useContext(TotalContext) as TotalContextProps;
  const {bt_search94b25, setbt_search94b25}= useContext(TotalContext) as TotalContextProps;
  const {button_add06375, setbutton_add06375}= useContext(TotalContext) as TotalContextProps;
  const {total_positions_table22a59, settotal_positions_table22a59}= useContext(TotalContext) as TotalContextProps;
  const {total_positions_table22a59Props, settotal_positions_table22a59Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {employeejobpositions_v1, setemployeejobpositions_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobPositions:AFVK:v1',
    [user],
    'GroupTotalPositionGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d37b8acfcf921594351ff7dd02479a63");
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
    settotal_position_group79a63Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("positions_text")){
        setpositions_textf724d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(positions_textf724d?.isDisabled==null)
      {
        setpositions_textf724d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_search")){
        setbt_search94b25((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(bt_search94b25?.isDisabled==null)
      {
        setbt_search94b25((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("button_add")){
        setbutton_add06375((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(button_add06375?.isDisabled==null)
      {
        setbutton_add06375((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("total_positions_table")){
        settotal_positions_table22a59((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(total_positions_table22a59?.isDisabled==null)
      {
        settotal_positions_table22a59((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['total_position_group'] = total_position_group79a63,
        codeStates['settotal_position_group'] = settotal_position_group79a63,
        codeStates['total_position_group79a63'] = total_position_group79a63Props,
        codeStates['settotal_position_group79a63'] = settotal_position_group79a63Props,
        codeStates['positions_text'] = positions_textf724d,
        codeStates['setpositions_text'] = setpositions_textf724d,
        codeStates['bt_search'] = bt_search94b25,
        codeStates['setbt_search'] = setbt_search94b25,
        codeStates['button_add'] = button_add06375,
        codeStates['setbutton_add'] = setbutton_add06375,
        codeStates['total_positions_table'] = total_positions_table22a59,
        codeStates['settotal_positions_table'] = settotal_positions_table22a59,
        codeStates['total_positions_table22a59'] = total_positions_table22a59Props,
        codeStates['settotal_positions_table22a59'] = settotal_positions_table22a59Props,

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
        codeStates['total_position_group'] = total_position_group79a63,
        codeStates['settotal_position_group'] = settotal_position_group79a63,
        codeStates['total_position_group79a63'] = total_position_group79a63Props,
        codeStates['settotal_position_group79a63'] = settotal_position_group79a63Props,
        codeStates['positions_text'] = positions_textf724d,
        codeStates['setpositions_text'] = setpositions_textf724d,
        codeStates['bt_search'] = bt_search94b25,
        codeStates['setbt_search'] = setbt_search94b25,
        codeStates['button_add'] = button_add06375,
        codeStates['setbutton_add'] = setbutton_add06375,
        codeStates['total_positions_table'] = total_positions_table22a59,
        codeStates['settotal_positions_table'] = settotal_positions_table22a59,
        codeStates['total_positions_table22a59'] = total_positions_table22a59Props,
        codeStates['settotal_positions_table22a59'] = settotal_positions_table22a59Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const total_position_group79a63Ref = useRef<any>(null);
  const handleClearSearch = () => {
    total_position_group79a63Ref.current?.setSearchParams();
    total_position_group79a63Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(total_position_group79a63) && Object.keys(total_position_group79a63)?.length>0)
      {
        settotal_position_group79a63({})
      }
    }else 
      prevRefreshRef.current= true
  }, [total_position_group79a63Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 149',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '12px',
        backgroundColor:'#f8fafc',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !p-1 !bg-slate-50 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setemployeejobpositions_v1((pre:any)=>({...pre,_selectedGroup_:"total_position_group"}))
        }}
    >
        {allowedComponent.includes("total_positions_table")  &&<Grouptotal_positions_table  
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
          {allowedControls.includes("positions_text") ?<Textpositions_text   /* f724d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "bt_search" in ButtonGoRuleData)?ButtonGoRuleData["bt_search"]:true) && 
          allowedControls.includes("bt_search")  ?            <Buttonbt_search tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "button_add" in ButtonGoRuleData)?ButtonGoRuleData["button_add"]:true) && 
          allowedControls.includes("button_add")  ?            <Buttonbutton_add tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Grouptotal_position_group
