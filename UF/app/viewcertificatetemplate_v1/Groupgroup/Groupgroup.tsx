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
import Grouptemplate_detail_group  from "../Grouptemplate_detail_group/Grouptemplate_detail_group";
import Groupadditional_info_group  from "../Groupadditional_info_group/Groupadditional_info_group";
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
import Textcert_template_id_text  from "./Textcert_template_id_text";
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
      "cert_template_id_text"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "cert_template_id_text"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "cert_template_id_text"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "cert_template_id_text"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "cert_template_id_text"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "cert_template_id_text"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "cert_template_id_text"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group"
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
  const {groupac196, setgroupac196}= useContext(TotalContext) as TotalContextProps;
  const {groupac196Props, setgroupac196Props}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group268e9, settemplate_detail_group268e9}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group268e9Props, settemplate_detail_group268e9Props}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group4d159, setadditional_info_group4d159}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group4d159Props, setadditional_info_group4d159Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_id_textf72bf, setcert_template_id_textf72bf}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewcertificatetemplate_v1, setviewcertificatetemplate_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewCertificateTemplate:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3f0084213c88497eb7c1d239530ac196");
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
    setgroupac196Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("template_detail_group")){
        settemplate_detail_group268e9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_detail_group268e9?.isDisabled==null)
      {
        settemplate_detail_group268e9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("additional_info_group")){
        setadditional_info_group4d159((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(additional_info_group4d159?.isDisabled==null)
      {
        setadditional_info_group4d159((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_template_id_text")){
        setcert_template_id_textf72bf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_template_id_textf72bf?.isDisabled==null)
      {
        setcert_template_id_textf72bf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupac196,
        codeStates['setgroup'] = setgroupac196,
        codeStates['groupac196'] = groupac196Props,
        codeStates['setgroupac196'] = setgroupac196Props,
        codeStates['template_detail_group'] = template_detail_group268e9,
        codeStates['settemplate_detail_group'] = settemplate_detail_group268e9,
        codeStates['template_detail_group268e9'] = template_detail_group268e9Props,
        codeStates['settemplate_detail_group268e9'] = settemplate_detail_group268e9Props,
        codeStates['additional_info_group'] = additional_info_group4d159,
        codeStates['setadditional_info_group'] = setadditional_info_group4d159,
        codeStates['additional_info_group4d159'] = additional_info_group4d159Props,
        codeStates['setadditional_info_group4d159'] = setadditional_info_group4d159Props,
        codeStates['cert_template_id_text'] = cert_template_id_textf72bf,
        codeStates['setcert_template_id_text'] = setcert_template_id_textf72bf,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3f0084213c88497eb7c1d239530ac196");
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
        codeStates['group'] = groupac196,
        codeStates['setgroup'] = setgroupac196,
        codeStates['groupac196'] = groupac196Props,
        codeStates['setgroupac196'] = setgroupac196Props,
        codeStates['template_detail_group'] = template_detail_group268e9,
        codeStates['settemplate_detail_group'] = settemplate_detail_group268e9,
        codeStates['template_detail_group268e9'] = template_detail_group268e9Props,
        codeStates['settemplate_detail_group268e9'] = settemplate_detail_group268e9Props,
        codeStates['additional_info_group'] = additional_info_group4d159,
        codeStates['setadditional_info_group'] = setadditional_info_group4d159,
        codeStates['additional_info_group4d159'] = additional_info_group4d159Props,
        codeStates['setadditional_info_group4d159'] = setadditional_info_group4d159Props,
        codeStates['cert_template_id_text'] = cert_template_id_textf72bf,
        codeStates['setcert_template_id_text'] = setcert_template_id_textf72bf,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const groupac196Ref = useRef<any>(null);
  const handleClearSearch = () => {
    groupac196Ref.current?.setSearchParams();
    groupac196Ref.current?.handleSearch({});
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
        !Array.isArray(groupac196) &&
        Object.keys(groupac196)?.length > 0
      ) {
        setgroupac196({})
      }
    } else prevRefreshRef.current = true
  }, [groupac196Props?.refresh])


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
        gridRow: '1 / 56',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'#f1f2f7',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setviewcertificatetemplate_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
        {allowedComponent.includes("template_detail_group")  &&<Grouptemplate_detail_group  
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
        {allowedComponent.includes("additional_info_group")  &&<Groupadditional_info_group  
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
          {allowedControls.includes("cert_template_id_text") ?<Textcert_template_id_text   /* f72bf */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup
