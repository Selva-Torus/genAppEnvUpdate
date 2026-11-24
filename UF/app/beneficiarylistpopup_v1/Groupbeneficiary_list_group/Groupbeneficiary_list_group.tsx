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
import Groupben_list_group  from "../Groupben_list_group/Groupben_list_group";
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
import Textbenificiary_text  from "./Textbenificiary_text";
import TextInputsearch_textinput  from "./TextInputsearch_textinput";
import Buttonsearch_btn  from "./Buttonsearch_btn";
import Dividerben_divider  from "./Dividerben_divider";
import Dividerconfirm_divider  from "./Dividerconfirm_divider";
import Buttonclear_button  from "./Buttonclear_button";
import Buttonconfirm_button  from "./Buttonconfirm_button";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupbeneficiary_list_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_beneficiarylistquery_v1Props, setdfd_beneficiarylistquery_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "benificiary_text",
      "search_textinput",
      "search_btn",
      "ben_divider",
      "confirm_divider",
      "clear_button",
      "confirm_button"
    ],
    "allowedGroups": [
      "canvas",
      "beneficiary_list_group",
      "ben_list_group",
      "benc_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "benificiary_text",
      "search_textinput",
      "search_btn",
      "ben_divider",
      "confirm_divider",
      "clear_button",
      "confirm_button"
    ],
    "allowedGroups": [
      "canvas",
      "beneficiary_list_group",
      "ben_list_group",
      "benc_group"
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
  const {beneficiary_list_group9d9c4, setbeneficiary_list_group9d9c4}= useContext(TotalContext) as TotalContextProps;
  const {beneficiary_list_group9d9c4Props, setbeneficiary_list_group9d9c4Props}= useContext(TotalContext) as TotalContextProps;
  const {benificiary_textb53b9, setbenificiary_textb53b9}= useContext(TotalContext) as TotalContextProps;
  const {search_textinput7144f, setsearch_textinput7144f}= useContext(TotalContext) as TotalContextProps;
  const {search_btne5c0a, setsearch_btne5c0a}= useContext(TotalContext) as TotalContextProps;
  const {ben_divideraec54, setben_divideraec54}= useContext(TotalContext) as TotalContextProps;
  const {ben_list_groupb24ac, setben_list_groupb24ac}= useContext(TotalContext) as TotalContextProps;
  const {ben_list_groupb24acProps, setben_list_groupb24acProps}= useContext(TotalContext) as TotalContextProps;
  const {benc_groupa95a7, setbenc_groupa95a7}= useContext(TotalContext) as TotalContextProps;
  const {benc_groupa95a7Props, setbenc_groupa95a7Props}= useContext(TotalContext) as TotalContextProps;
  const {confirm_dividere3b17, setconfirm_dividere3b17}= useContext(TotalContext) as TotalContextProps;
  const {clear_button188cc, setclear_button188cc}= useContext(TotalContext) as TotalContextProps;
  const {confirm_button246d5, setconfirm_button246d5}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {beneficiarylistpopup_v1, setbeneficiarylistpopup_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:beneficiaryListPopUp:AFVK:v1',
    [user],
    'GroupBeneficiaryListGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "69edc499930542abb27a31f6f629d9c4");
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
    setbeneficiary_list_group9d9c4Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("benificiary_text")){
        setbenificiary_textb53b9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(benificiary_textb53b9?.isDisabled==null)
      {
        setbenificiary_textb53b9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search_textinput")){
        setsearch_textinput7144f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search_textinput7144f?.isDisabled==null)
      {
        setsearch_textinput7144f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search_btn")){
        setsearch_btne5c0a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search_btne5c0a?.isDisabled==null)
      {
        setsearch_btne5c0a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ben_divider")){
        setben_divideraec54((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ben_divideraec54?.isDisabled==null)
      {
        setben_divideraec54((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ben_list_group")){
        setben_list_groupb24ac((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ben_list_groupb24ac?.isDisabled==null)
      {
        setben_list_groupb24ac((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confirm_divider")){
        setconfirm_dividere3b17((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(confirm_dividere3b17?.isDisabled==null)
      {
        setconfirm_dividere3b17((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("clear_button")){
        setclear_button188cc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(clear_button188cc?.isDisabled==null)
      {
        setclear_button188cc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confirm_button")){
        setconfirm_button246d5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(confirm_button246d5?.isDisabled==null)
      {
        setconfirm_button246d5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['beneficiary_list_group'] = beneficiary_list_group9d9c4,
        codeStates['setbeneficiary_list_group'] = setbeneficiary_list_group9d9c4,
        codeStates['beneficiary_list_group9d9c4'] = beneficiary_list_group9d9c4Props,
        codeStates['setbeneficiary_list_group9d9c4'] = setbeneficiary_list_group9d9c4Props,
        codeStates['benificiary_text'] = benificiary_textb53b9,
        codeStates['setbenificiary_text'] = setbenificiary_textb53b9,
        codeStates['search_textinput'] = search_textinput7144f,
        codeStates['setsearch_textinput'] = setsearch_textinput7144f,
        codeStates['search_btn'] = search_btne5c0a,
        codeStates['setsearch_btn'] = setsearch_btne5c0a,
        codeStates['ben_divider'] = ben_divideraec54,
        codeStates['setben_divider'] = setben_divideraec54,
        codeStates['ben_list_group'] = ben_list_groupb24ac,
        codeStates['setben_list_group'] = setben_list_groupb24ac,
        codeStates['ben_list_groupb24ac'] = ben_list_groupb24acProps,
        codeStates['setben_list_groupb24ac'] = setben_list_groupb24acProps,
        codeStates['benc_group'] = benc_groupa95a7,
        codeStates['setbenc_group'] = setbenc_groupa95a7,
        codeStates['benc_groupa95a7'] = benc_groupa95a7Props,
        codeStates['setbenc_groupa95a7'] = setbenc_groupa95a7Props,
        codeStates['confirm_divider'] = confirm_dividere3b17,
        codeStates['setconfirm_divider'] = setconfirm_dividere3b17,
        codeStates['clear_button'] = clear_button188cc,
        codeStates['setclear_button'] = setclear_button188cc,
        codeStates['confirm_button'] = confirm_button246d5,
        codeStates['setconfirm_button'] = setconfirm_button246d5,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "69edc499930542abb27a31f6f629d9c4");
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
        codeStates['beneficiary_list_group'] = beneficiary_list_group9d9c4,
        codeStates['setbeneficiary_list_group'] = setbeneficiary_list_group9d9c4,
        codeStates['beneficiary_list_group9d9c4'] = beneficiary_list_group9d9c4Props,
        codeStates['setbeneficiary_list_group9d9c4'] = setbeneficiary_list_group9d9c4Props,
        codeStates['benificiary_text'] = benificiary_textb53b9,
        codeStates['setbenificiary_text'] = setbenificiary_textb53b9,
        codeStates['search_textinput'] = search_textinput7144f,
        codeStates['setsearch_textinput'] = setsearch_textinput7144f,
        codeStates['search_btn'] = search_btne5c0a,
        codeStates['setsearch_btn'] = setsearch_btne5c0a,
        codeStates['ben_divider'] = ben_divideraec54,
        codeStates['setben_divider'] = setben_divideraec54,
        codeStates['ben_list_group'] = ben_list_groupb24ac,
        codeStates['setben_list_group'] = setben_list_groupb24ac,
        codeStates['ben_list_groupb24ac'] = ben_list_groupb24acProps,
        codeStates['setben_list_groupb24ac'] = setben_list_groupb24acProps,
        codeStates['benc_group'] = benc_groupa95a7,
        codeStates['setbenc_group'] = setbenc_groupa95a7,
        codeStates['benc_groupa95a7'] = benc_groupa95a7Props,
        codeStates['setbenc_groupa95a7'] = setbenc_groupa95a7Props,
        codeStates['confirm_divider'] = confirm_dividere3b17,
        codeStates['setconfirm_divider'] = setconfirm_dividere3b17,
        codeStates['clear_button'] = clear_button188cc,
        codeStates['setclear_button'] = setclear_button188cc,
        codeStates['confirm_button'] = confirm_button246d5,
        codeStates['setconfirm_button'] = setconfirm_button246d5,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const beneficiary_list_group9d9c4Ref = useRef<any>(null);
  const handleClearSearch = () => {
    beneficiary_list_group9d9c4Ref.current?.setSearchParams();
    beneficiary_list_group9d9c4Ref.current?.handleSearch({});
  };

  useEffect(() => {
    securityCheckPromiseRef.current = securityCheck()
  }, [token])

  useEffect(() => {
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true;
      (async () => {
        await securityCheckPromiseRef.current
        handleOnload()
      })()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(beneficiary_list_group9d9c4) &&
        Object.keys(beneficiary_list_group9d9c4)?.length > 0
      ) {
        setbeneficiary_list_group9d9c4({})
        setbeneficiary_list_group9d9c4Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [beneficiary_list_group9d9c4Props?.refresh])


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
        gridRow: '4 / 89',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !bg-white p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setbeneficiarylistpopup_v1((pre:any)=>({...pre,_selectedGroup_:"beneficiary_list_group"}))
        }}
    >
        {allowedComponent.includes("ben_list_group")  &&<Groupben_list_group  
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
          {allowedControls.includes("benificiary_text") ?<Textbenificiary_text   /* b53b9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("search_textinput") ?<TextInputsearch_textinput   /* 7144f */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "search_btn" in ButtonGoRuleData)?ButtonGoRuleData["search_btn"]:true) && 
          allowedControls.includes("search_btn")  ?            <Buttonsearch_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {allowedControls.includes("ben_divider") ?<Dividerben_divider   /* aec54 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("confirm_divider") ?<Dividerconfirm_divider   /* e3b17 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "clear_button" in ButtonGoRuleData)?ButtonGoRuleData["clear_button"]:true) && 
          allowedControls.includes("clear_button")  ?            <Buttonclear_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "confirm_button" in ButtonGoRuleData)?ButtonGoRuleData["confirm_button"]:true) && 
          allowedControls.includes("confirm_button")  ?            <Buttonconfirm_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupbeneficiary_list_group
