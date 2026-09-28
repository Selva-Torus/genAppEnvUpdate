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
import Groupcertificate_group  from "../Groupcertificate_group/Groupcertificate_group";
import Groupstructed_cert_group  from "../Groupstructed_cert_group/Groupstructed_cert_group";
import Grouplight_weight_group  from "../Grouplight_weight_group/Grouplight_weight_group";
import Groupcert_template_table  from "../Groupcert_template_table/Groupcert_template_table";
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
import Textcert_template_heading  from "./Textcert_template_heading";
import Buttonrefresh_btn  from "./Buttonrefresh_btn";
import Buttonsearch_btn  from "./Buttonsearch_btn";
import Buttonadd_template  from "./Buttonadd_template";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_certificatetemplate_v1Props, setdfd_certificatetemplate_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "AI Product Owner": {
    "allowedControls": [
      "cert_template_heading",
      "refresh_btn",
      "search_btn",
      "add_template"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "cert_template_heading",
      "refresh_btn",
      "search_btn",
      "add_template"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "cert_template_heading",
      "refresh_btn",
      "search_btn",
      "add_template"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "cert_template_heading",
      "refresh_btn",
      "search_btn",
      "add_template"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "cert_template_heading",
      "refresh_btn",
      "search_btn",
      "add_template"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "cert_template_heading",
      "refresh_btn",
      "search_btn",
      "add_template"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "cert_template_heading",
      "refresh_btn",
      "search_btn",
      "add_template"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
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
  const {group12090, setgroup12090}= useContext(TotalContext) as TotalContextProps;
  const {group12090Props, setgroup12090Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_headingab3bd, setcert_template_headingab3bd}= useContext(TotalContext) as TotalContextProps;
  const {refresh_btn8fd10, setrefresh_btn8fd10}= useContext(TotalContext) as TotalContextProps;
  const {search_btn0ba97, setsearch_btn0ba97}= useContext(TotalContext) as TotalContextProps;
  const {add_template995c3, setadd_template995c3}= useContext(TotalContext) as TotalContextProps;
  const {certificate_group22fde, setcertificate_group22fde}= useContext(TotalContext) as TotalContextProps;
  const {certificate_group22fdeProps, setcertificate_group22fdeProps}= useContext(TotalContext) as TotalContextProps;
  const {structed_cert_groupe6058, setstructed_cert_groupe6058}= useContext(TotalContext) as TotalContextProps;
  const {structed_cert_groupe6058Props, setstructed_cert_groupe6058Props}= useContext(TotalContext) as TotalContextProps;
  const {light_weight_group15e17, setlight_weight_group15e17}= useContext(TotalContext) as TotalContextProps;
  const {light_weight_group15e17Props, setlight_weight_group15e17Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_table75349, setcert_template_table75349}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_table75349Props, setcert_template_table75349Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {certificatetemplate_v1, setcertificatetemplate_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "4e68ca067e2d4f93937e0aa1e7f12090");
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
    setgroup12090Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("cert_template_heading")){
        setcert_template_headingab3bd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_template_headingab3bd?.isDisabled==null)
      {
        setcert_template_headingab3bd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("refresh_btn")){
        setrefresh_btn8fd10((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(refresh_btn8fd10?.isDisabled==null)
      {
        setrefresh_btn8fd10((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search_btn")){
        setsearch_btn0ba97((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search_btn0ba97?.isDisabled==null)
      {
        setsearch_btn0ba97((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("add_template")){
        setadd_template995c3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(add_template995c3?.isDisabled==null)
      {
        setadd_template995c3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("certificate_group")){
        setcertificate_group22fde((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(certificate_group22fde?.isDisabled==null)
      {
        setcertificate_group22fde((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("structed_cert_group")){
        setstructed_cert_groupe6058((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(structed_cert_groupe6058?.isDisabled==null)
      {
        setstructed_cert_groupe6058((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("light_weight_group")){
        setlight_weight_group15e17((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(light_weight_group15e17?.isDisabled==null)
      {
        setlight_weight_group15e17((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_template_table")){
        setcert_template_table75349Props((pre:any)=>({...pre,...cert_template_table75349,isDisabled:true}));

    }else
    {
      if(cert_template_table75349?.isDisabled==null)
      {
        setcert_template_table75349Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group12090,
        codeStates['setgroup'] = setgroup12090,
        codeStates['group12090'] = group12090Props,
        codeStates['setgroup12090'] = setgroup12090Props,
        codeStates['cert_template_heading'] = cert_template_headingab3bd,
        codeStates['setcert_template_heading'] = setcert_template_headingab3bd,
        codeStates['refresh_btn'] = refresh_btn8fd10,
        codeStates['setrefresh_btn'] = setrefresh_btn8fd10,
        codeStates['search_btn'] = search_btn0ba97,
        codeStates['setsearch_btn'] = setsearch_btn0ba97,
        codeStates['add_template'] = add_template995c3,
        codeStates['setadd_template'] = setadd_template995c3,
        codeStates['certificate_group'] = certificate_group22fde,
        codeStates['setcertificate_group'] = setcertificate_group22fde,
        codeStates['certificate_group22fde'] = certificate_group22fdeProps,
        codeStates['setcertificate_group22fde'] = setcertificate_group22fdeProps,
        codeStates['structed_cert_group'] = structed_cert_groupe6058,
        codeStates['setstructed_cert_group'] = setstructed_cert_groupe6058,
        codeStates['structed_cert_groupe6058'] = structed_cert_groupe6058Props,
        codeStates['setstructed_cert_groupe6058'] = setstructed_cert_groupe6058Props,
        codeStates['light_weight_group'] = light_weight_group15e17,
        codeStates['setlight_weight_group'] = setlight_weight_group15e17,
        codeStates['light_weight_group15e17'] = light_weight_group15e17Props,
        codeStates['setlight_weight_group15e17'] = setlight_weight_group15e17Props,
        codeStates['cert_template_table'] = cert_template_table75349,
        codeStates['setcert_template_table'] = setcert_template_table75349,
        codeStates['cert_template_table75349'] = cert_template_table75349Props,
        codeStates['setcert_template_table75349'] = setcert_template_table75349Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "4e68ca067e2d4f93937e0aa1e7f12090");
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
        codeStates['group'] = group12090,
        codeStates['setgroup'] = setgroup12090,
        codeStates['group12090'] = group12090Props,
        codeStates['setgroup12090'] = setgroup12090Props,
        codeStates['cert_template_heading'] = cert_template_headingab3bd,
        codeStates['setcert_template_heading'] = setcert_template_headingab3bd,
        codeStates['refresh_btn'] = refresh_btn8fd10,
        codeStates['setrefresh_btn'] = setrefresh_btn8fd10,
        codeStates['search_btn'] = search_btn0ba97,
        codeStates['setsearch_btn'] = setsearch_btn0ba97,
        codeStates['add_template'] = add_template995c3,
        codeStates['setadd_template'] = setadd_template995c3,
        codeStates['certificate_group'] = certificate_group22fde,
        codeStates['setcertificate_group'] = setcertificate_group22fde,
        codeStates['certificate_group22fde'] = certificate_group22fdeProps,
        codeStates['setcertificate_group22fde'] = setcertificate_group22fdeProps,
        codeStates['structed_cert_group'] = structed_cert_groupe6058,
        codeStates['setstructed_cert_group'] = setstructed_cert_groupe6058,
        codeStates['structed_cert_groupe6058'] = structed_cert_groupe6058Props,
        codeStates['setstructed_cert_groupe6058'] = setstructed_cert_groupe6058Props,
        codeStates['light_weight_group'] = light_weight_group15e17,
        codeStates['setlight_weight_group'] = setlight_weight_group15e17,
        codeStates['light_weight_group15e17'] = light_weight_group15e17Props,
        codeStates['setlight_weight_group15e17'] = setlight_weight_group15e17Props,
        codeStates['cert_template_table'] = cert_template_table75349,
        codeStates['setcert_template_table'] = setcert_template_table75349,
        codeStates['cert_template_table75349'] = cert_template_table75349Props,
        codeStates['setcert_template_table75349'] = setcert_template_table75349Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group12090Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group12090Ref.current?.setSearchParams();
    group12090Ref.current?.handleSearch({});
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
        !Array.isArray(group12090) &&
        Object.keys(group12090)?.length > 0
      ) {
        setgroup12090({})
      }
    } else prevRefreshRef.current = true
  }, [group12090Props?.refresh])


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
        gridRow: '1 / 146',
      
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
          setcertificatetemplate_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
        {allowedComponent.includes("certificate_group")  &&<Groupcertificate_group  
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
        {allowedComponent.includes("structed_cert_group")  &&<Groupstructed_cert_group  
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
        {allowedComponent.includes("light_weight_group")  &&<Grouplight_weight_group  
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
        {allowedComponent.includes("cert_template_table")  &&<Groupcert_template_table  
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
          {allowedControls.includes("cert_template_heading") ?<Textcert_template_heading   /* ab3bd */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "refresh_btn" in ButtonGoRuleData)?ButtonGoRuleData["refresh_btn"]:true) && 
          allowedControls.includes("refresh_btn")  ?            <Buttonrefresh_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "search_btn" in ButtonGoRuleData)?ButtonGoRuleData["search_btn"]:true) && 
          allowedControls.includes("search_btn")  ?            <Buttonsearch_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "add_template" in ButtonGoRuleData)?ButtonGoRuleData["add_template"]:true) && 
          allowedControls.includes("add_template")  ?            <Buttonadd_template tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup
