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
import Buttoninvesreqcamt110_close  from "./Buttoninvesreqcamt110_close";
import Buttoninvesreqcamt110_reject  from "./Buttoninvesreqcamt110_reject";
import Buttoninvesreqcamt110_approve  from "./Buttoninvesreqcamt110_approve";
import Buttoninvesreqcamt110_save  from "./Buttoninvesreqcamt110_save";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupinvestigationrequestcamt110dynamicactions = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const { token } = useGlobal();
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
  const {dfd_nfinvestigationtypecombo_v1Props, setdfd_nfinvestigationtypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfinvestigationreasoncombo_v1Props, setdfd_nfinvestigationreasoncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nftranmaintransaction_v1Props, setdfd_nftranmaintransaction_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Operational Manager": {
    "allowedControls": [
      "invesreqcamt110_close",
      "invesreqcamt110_reject",
      "invesreqcamt110_approve",
      "invesreqcamt110_save"
    ],
    "allowedGroups": [
      "canvas",
      "investigationrequestcamt110maingroup",
      "investigationrequestcamt110subgroup",
      "investigationrequestcamt110dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "invesreqcamt110_close",
      "invesreqcamt110_reject",
      "invesreqcamt110_approve",
      "invesreqcamt110_save"
    ],
    "allowedGroups": [
      "canvas",
      "investigationrequestcamt110maingroup",
      "investigationrequestcamt110subgroup",
      "investigationrequestcamt110dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const handleOnloadCalledRef = useRef(false);
  const securityCheckPromiseRef = useRef<Promise<any> | null>(null);
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
  const {investigationrequestcamt110maingroup7a2f5, setinvestigationrequestcamt110maingroup7a2f5}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110maingroup7a2f5Props, setinvestigationrequestcamt110maingroup7a2f5Props}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110subgroup276a5, setinvestigationrequestcamt110subgroup276a5}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110subgroup276a5Props, setinvestigationrequestcamt110subgroup276a5Props}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110dynamicactionsbfdc2, setinvestigationrequestcamt110dynamicactionsbfdc2}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110dynamicactionsbfdc2Props, setinvestigationrequestcamt110dynamicactionsbfdc2Props}= useContext(TotalContext) as TotalContextProps;
  const {invesreqcamt110_closee3b00, setinvesreqcamt110_closee3b00}= useContext(TotalContext) as TotalContextProps;
  const {invesreqcamt110_reject5b353, setinvesreqcamt110_reject5b353}= useContext(TotalContext) as TotalContextProps;
  const {invesreqcamt110_approve727ff, setinvesreqcamt110_approve727ff}= useContext(TotalContext) as TotalContextProps;
  const {invesreqcamt110_save86b45, setinvesreqcamt110_save86b45}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {nfinvestigationrequestcamt110_v1, setnfinvestigationrequestcamt110_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfInvestigationRequestCamt110:AFVK:v1',
    [user],
    'GroupInvestigationrequestcamt110dynamicactions',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2df7c310dfd4aa84b5a533c02cdbfdc2");
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
    setinvestigationrequestcamt110dynamicactionsbfdc2Props((pre:any)=>({...pre,isHaveRule:true}))
      actionRuleHandle(orchestrationData?.data?.rule.nodes,{...decodedTokenObj,session:decodedTokenObj,
});
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("invesreqcamt110_close")){
        setinvesreqcamt110_closee3b00((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(invesreqcamt110_closee3b00?.isDisabled==null)
      {
        setinvesreqcamt110_closee3b00((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("invesreqcamt110_reject")){
        setinvesreqcamt110_reject5b353((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(invesreqcamt110_reject5b353?.isDisabled==null)
      {
        setinvesreqcamt110_reject5b353((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("invesreqcamt110_approve")){
        setinvesreqcamt110_approve727ff((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(invesreqcamt110_approve727ff?.isDisabled==null)
      {
        setinvesreqcamt110_approve727ff((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("invesreqcamt110_save")){
        setinvesreqcamt110_save86b45((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(invesreqcamt110_save86b45?.isDisabled==null)
      {
        setinvesreqcamt110_save86b45((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['investigationrequestcamt110maingroup'] = investigationrequestcamt110maingroup7a2f5,
        codeStates['setinvestigationrequestcamt110maingroup'] = setinvestigationrequestcamt110maingroup7a2f5,
        codeStates['investigationrequestcamt110maingroup7a2f5'] = investigationrequestcamt110maingroup7a2f5Props,
        codeStates['setinvestigationrequestcamt110maingroup7a2f5'] = setinvestigationrequestcamt110maingroup7a2f5Props,
        codeStates['investigationrequestcamt110subgroup'] = investigationrequestcamt110subgroup276a5,
        codeStates['setinvestigationrequestcamt110subgroup'] = setinvestigationrequestcamt110subgroup276a5,
        codeStates['investigationrequestcamt110subgroup276a5'] = investigationrequestcamt110subgroup276a5Props,
        codeStates['setinvestigationrequestcamt110subgroup276a5'] = setinvestigationrequestcamt110subgroup276a5Props,
        codeStates['investigationrequestcamt110dynamicactions'] = investigationrequestcamt110dynamicactionsbfdc2,
        codeStates['setinvestigationrequestcamt110dynamicactions'] = setinvestigationrequestcamt110dynamicactionsbfdc2,
        codeStates['investigationrequestcamt110dynamicactionsbfdc2'] = investigationrequestcamt110dynamicactionsbfdc2Props,
        codeStates['setinvestigationrequestcamt110dynamicactionsbfdc2'] = setinvestigationrequestcamt110dynamicactionsbfdc2Props,
        codeStates['invesreqcamt110_close'] = invesreqcamt110_closee3b00,
        codeStates['setinvesreqcamt110_close'] = setinvesreqcamt110_closee3b00,
        codeStates['invesreqcamt110_reject'] = invesreqcamt110_reject5b353,
        codeStates['setinvesreqcamt110_reject'] = setinvesreqcamt110_reject5b353,
        codeStates['invesreqcamt110_approve'] = invesreqcamt110_approve727ff,
        codeStates['setinvesreqcamt110_approve'] = setinvesreqcamt110_approve727ff,
        codeStates['invesreqcamt110_save'] = invesreqcamt110_save86b45,
        codeStates['setinvesreqcamt110_save'] = setinvesreqcamt110_save86b45,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2df7c310dfd4aa84b5a533c02cdbfdc2");
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
  }


    const handleOnload=()=>{
  }
  const handleOnChange=async ()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['investigationrequestcamt110maingroup'] = investigationrequestcamt110maingroup7a2f5,
        codeStates['setinvestigationrequestcamt110maingroup'] = setinvestigationrequestcamt110maingroup7a2f5,
        codeStates['investigationrequestcamt110maingroup7a2f5'] = investigationrequestcamt110maingroup7a2f5Props,
        codeStates['setinvestigationrequestcamt110maingroup7a2f5'] = setinvestigationrequestcamt110maingroup7a2f5Props,
        codeStates['investigationrequestcamt110subgroup'] = investigationrequestcamt110subgroup276a5,
        codeStates['setinvestigationrequestcamt110subgroup'] = setinvestigationrequestcamt110subgroup276a5,
        codeStates['investigationrequestcamt110subgroup276a5'] = investigationrequestcamt110subgroup276a5Props,
        codeStates['setinvestigationrequestcamt110subgroup276a5'] = setinvestigationrequestcamt110subgroup276a5Props,
        codeStates['investigationrequestcamt110dynamicactions'] = investigationrequestcamt110dynamicactionsbfdc2,
        codeStates['setinvestigationrequestcamt110dynamicactions'] = setinvestigationrequestcamt110dynamicactionsbfdc2,
        codeStates['investigationrequestcamt110dynamicactionsbfdc2'] = investigationrequestcamt110dynamicactionsbfdc2Props,
        codeStates['setinvestigationrequestcamt110dynamicactionsbfdc2'] = setinvestigationrequestcamt110dynamicactionsbfdc2Props,
        codeStates['invesreqcamt110_close'] = invesreqcamt110_closee3b00,
        codeStates['setinvesreqcamt110_close'] = setinvesreqcamt110_closee3b00,
        codeStates['invesreqcamt110_reject'] = invesreqcamt110_reject5b353,
        codeStates['setinvesreqcamt110_reject'] = setinvesreqcamt110_reject5b353,
        codeStates['invesreqcamt110_approve'] = invesreqcamt110_approve727ff,
        codeStates['setinvesreqcamt110_approve'] = setinvesreqcamt110_approve727ff,
        codeStates['invesreqcamt110_save'] = invesreqcamt110_save86b45,
        codeStates['setinvesreqcamt110_save'] = setinvesreqcamt110_save86b45,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const investigationrequestcamt110dynamicactionsbfdc2Ref = useRef<any>(null);
  const handleClearSearch = () => {
    investigationrequestcamt110dynamicactionsbfdc2Ref.current?.setSearchParams();
    investigationrequestcamt110dynamicactionsbfdc2Ref.current?.handleSearch({});
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
        setinvestigationrequestcamt110dynamicactionsbfdc2Props((pre:any)=>({...pre,dynamicActionRule:buttonOrder||{}}))
      }else{
        setButtonGoRuleData({})
        setinvestigationrequestcamt110dynamicactionsbfdc2Props((pre:any)=>({...pre,dynamicActionRule:{}}))
      }


    }
  }
  useEffect(() => {
    securityCheckPromiseRef.current = securityCheck()
  }, [token])

  useEffect(() => {
       actionRuleHandle(ruleData,{...decodedTokenObj,session:decodedTokenObj,});
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true;
      (async () => {
        await securityCheckPromiseRef.current
        handleOnload()
      })()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(investigationrequestcamt110dynamicactionsbfdc2) &&
        Object.keys(investigationrequestcamt110dynamicactionsbfdc2)?.length > 0
      ) {
        setinvestigationrequestcamt110dynamicactionsbfdc2({})
        setinvestigationrequestcamt110dynamicactionsbfdc2Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [investigationrequestcamt110dynamicactionsbfdc2Props?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '108 / 120',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
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
          setnfinvestigationrequestcamt110_v1((pre:any)=>({...pre,_selectedGroup_:"investigationrequestcamt110dynamicactions"}))
        }}
    >
        {        ((ruleData?.length>0 && "invesreqcamt110_close" in ButtonGoRuleData)?ButtonGoRuleData["invesreqcamt110_close"]:true) && 
          allowedControls.includes("invesreqcamt110_close")  ?            <Buttoninvesreqcamt110_close tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "invesreqcamt110_reject" in ButtonGoRuleData)?ButtonGoRuleData["invesreqcamt110_reject"]:true) && 
          allowedControls.includes("invesreqcamt110_reject")  ?            <Buttoninvesreqcamt110_reject tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "invesreqcamt110_approve" in ButtonGoRuleData)?ButtonGoRuleData["invesreqcamt110_approve"]:true) && 
          allowedControls.includes("invesreqcamt110_approve")  ?            <Buttoninvesreqcamt110_approve tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "invesreqcamt110_save" in ButtonGoRuleData)?ButtonGoRuleData["invesreqcamt110_save"]:true) && 
          allowedControls.includes("invesreqcamt110_save")  ?            <Buttoninvesreqcamt110_save tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupinvestigationrequestcamt110dynamicactions
