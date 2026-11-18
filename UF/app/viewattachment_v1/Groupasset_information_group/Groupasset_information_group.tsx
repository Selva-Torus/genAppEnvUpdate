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
import Groupevidence_table_group  from "../Groupevidence_table_group/Groupevidence_table_group";
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
import Textasset_id_text  from "./Textasset_id_text";
import Textai_asset_id  from "./Textai_asset_id";
import Textasset_code_text  from "./Textasset_code_text";
import Textasset_code  from "./Textasset_code";
import Textasset_name_text  from "./Textasset_name_text";
import Textasset_name  from "./Textasset_name";
import Textasset_type_code_text  from "./Textasset_type_code_text";
import Textasset_type_code  from "./Textasset_type_code";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupasset_information_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_attachevidence_v1Props, setdfd_attachevidence_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_id_text",
      "ai_asset_id",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "asset_type_code_text",
      "asset_type_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_evidences_group",
      "asset_information_group",
      "evidence_table_group",
      "evidence_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "asset_id_text",
      "ai_asset_id",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "asset_type_code_text",
      "asset_type_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_evidences_group",
      "asset_information_group",
      "evidence_table_group",
      "evidence_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "asset_id_text",
      "ai_asset_id",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "asset_type_code_text",
      "asset_type_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_evidences_group",
      "asset_information_group",
      "evidence_table_group",
      "evidence_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "asset_id_text",
      "ai_asset_id",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "asset_type_code_text",
      "asset_type_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_evidences_group",
      "asset_information_group",
      "evidence_table_group",
      "evidence_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "asset_id_text",
      "ai_asset_id",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "asset_type_code_text",
      "asset_type_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_evidences_group",
      "asset_information_group",
      "evidence_table_group",
      "evidence_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "asset_id_text",
      "ai_asset_id",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "asset_type_code_text",
      "asset_type_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_evidences_group",
      "asset_information_group",
      "evidence_table_group",
      "evidence_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "asset_id_text",
      "ai_asset_id",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "asset_type_code_text",
      "asset_type_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_evidences_group",
      "asset_information_group",
      "evidence_table_group",
      "evidence_table"
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
  const {overall_evidences_group59fa9, setoverall_evidences_group59fa9}= useContext(TotalContext) as TotalContextProps;
  const {overall_evidences_group59fa9Props, setoverall_evidences_group59fa9Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_groupa355e, setasset_information_groupa355e}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_groupa355eProps, setasset_information_groupa355eProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_id_textb71c0, setasset_id_textb71c0}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id599fe, setai_asset_id599fe}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_textca27e, setasset_code_textca27e}= useContext(TotalContext) as TotalContextProps;
  const {asset_code74d3d, setasset_code74d3d}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text180c8, setasset_name_text180c8}= useContext(TotalContext) as TotalContextProps;
  const {asset_name37ece, setasset_name37ece}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text3154f, setasset_type_code_text3154f}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code0912c, setasset_type_code0912c}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_group8375d, setevidence_table_group8375d}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_group8375dProps, setevidence_table_group8375dProps}= useContext(TotalContext) as TotalContextProps;
  const {evidence_tablef958a, setevidence_tablef958a}= useContext(TotalContext) as TotalContextProps;
  const {evidence_tablef958aProps, setevidence_tablef958aProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewattachment_v1, setviewattachment_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ViewAttachment:AFVK:v1',
    [user],
    'GroupAssetInformationGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "0f29ab89ffff3ff86bfd89e640ca355e");
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
    setasset_information_groupa355eProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("asset_id_text")){
        setasset_id_textb71c0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_id_textb71c0?.isDisabled==null)
      {
        setasset_id_textb71c0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ai_asset_id")){
        setai_asset_id599fe((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_asset_id599fe?.isDisabled==null)
      {
        setai_asset_id599fe((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code_text")){
        setasset_code_textca27e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code_textca27e?.isDisabled==null)
      {
        setasset_code_textca27e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_code74d3d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code74d3d?.isDisabled==null)
      {
        setasset_code74d3d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_text180c8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name_text180c8?.isDisabled==null)
      {
        setasset_name_text180c8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name37ece((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name37ece?.isDisabled==null)
      {
        setasset_name37ece((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code_text")){
        setasset_type_code_text3154f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_code_text3154f?.isDisabled==null)
      {
        setasset_type_code_text3154f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code")){
        setasset_type_code0912c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_code0912c?.isDisabled==null)
      {
        setasset_type_code0912c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("evidence_table_group")){
        setevidence_table_group8375d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(evidence_table_group8375d?.isDisabled==null)
      {
        setevidence_table_group8375d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_evidences_group'] = overall_evidences_group59fa9,
        codeStates['setoverall_evidences_group'] = setoverall_evidences_group59fa9,
        codeStates['overall_evidences_group59fa9'] = overall_evidences_group59fa9Props,
        codeStates['setoverall_evidences_group59fa9'] = setoverall_evidences_group59fa9Props,
        codeStates['asset_information_group'] = asset_information_groupa355e,
        codeStates['setasset_information_group'] = setasset_information_groupa355e,
        codeStates['asset_information_groupa355e'] = asset_information_groupa355eProps,
        codeStates['setasset_information_groupa355e'] = setasset_information_groupa355eProps,
        codeStates['asset_id_text'] = asset_id_textb71c0,
        codeStates['setasset_id_text'] = setasset_id_textb71c0,
        codeStates['ai_asset_id'] = ai_asset_id599fe,
        codeStates['setai_asset_id'] = setai_asset_id599fe,
        codeStates['asset_code_text'] = asset_code_textca27e,
        codeStates['setasset_code_text'] = setasset_code_textca27e,
        codeStates['asset_code'] = asset_code74d3d,
        codeStates['setasset_code'] = setasset_code74d3d,
        codeStates['asset_name_text'] = asset_name_text180c8,
        codeStates['setasset_name_text'] = setasset_name_text180c8,
        codeStates['asset_name'] = asset_name37ece,
        codeStates['setasset_name'] = setasset_name37ece,
        codeStates['asset_type_code_text'] = asset_type_code_text3154f,
        codeStates['setasset_type_code_text'] = setasset_type_code_text3154f,
        codeStates['asset_type_code'] = asset_type_code0912c,
        codeStates['setasset_type_code'] = setasset_type_code0912c,
        codeStates['evidence_table_group'] = evidence_table_group8375d,
        codeStates['setevidence_table_group'] = setevidence_table_group8375d,
        codeStates['evidence_table_group8375d'] = evidence_table_group8375dProps,
        codeStates['setevidence_table_group8375d'] = setevidence_table_group8375dProps,
        codeStates['evidence_table'] = evidence_tablef958a,
        codeStates['setevidence_table'] = setevidence_tablef958a,
        codeStates['evidence_tablef958a'] = evidence_tablef958aProps,
        codeStates['setevidence_tablef958a'] = setevidence_tablef958aProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "0f29ab89ffff3ff86bfd89e640ca355e");
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
        codeStates['overall_evidences_group'] = overall_evidences_group59fa9,
        codeStates['setoverall_evidences_group'] = setoverall_evidences_group59fa9,
        codeStates['overall_evidences_group59fa9'] = overall_evidences_group59fa9Props,
        codeStates['setoverall_evidences_group59fa9'] = setoverall_evidences_group59fa9Props,
        codeStates['asset_information_group'] = asset_information_groupa355e,
        codeStates['setasset_information_group'] = setasset_information_groupa355e,
        codeStates['asset_information_groupa355e'] = asset_information_groupa355eProps,
        codeStates['setasset_information_groupa355e'] = setasset_information_groupa355eProps,
        codeStates['asset_id_text'] = asset_id_textb71c0,
        codeStates['setasset_id_text'] = setasset_id_textb71c0,
        codeStates['ai_asset_id'] = ai_asset_id599fe,
        codeStates['setai_asset_id'] = setai_asset_id599fe,
        codeStates['asset_code_text'] = asset_code_textca27e,
        codeStates['setasset_code_text'] = setasset_code_textca27e,
        codeStates['asset_code'] = asset_code74d3d,
        codeStates['setasset_code'] = setasset_code74d3d,
        codeStates['asset_name_text'] = asset_name_text180c8,
        codeStates['setasset_name_text'] = setasset_name_text180c8,
        codeStates['asset_name'] = asset_name37ece,
        codeStates['setasset_name'] = setasset_name37ece,
        codeStates['asset_type_code_text'] = asset_type_code_text3154f,
        codeStates['setasset_type_code_text'] = setasset_type_code_text3154f,
        codeStates['asset_type_code'] = asset_type_code0912c,
        codeStates['setasset_type_code'] = setasset_type_code0912c,
        codeStates['evidence_table_group'] = evidence_table_group8375d,
        codeStates['setevidence_table_group'] = setevidence_table_group8375d,
        codeStates['evidence_table_group8375d'] = evidence_table_group8375dProps,
        codeStates['setevidence_table_group8375d'] = setevidence_table_group8375dProps,
        codeStates['evidence_table'] = evidence_tablef958a,
        codeStates['setevidence_table'] = setevidence_tablef958a,
        codeStates['evidence_tablef958a'] = evidence_tablef958aProps,
        codeStates['setevidence_tablef958a'] = setevidence_tablef958aProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const asset_information_groupa355eRef = useRef<any>(null);
  const handleClearSearch = () => {
    asset_information_groupa355eRef.current?.setSearchParams();
    asset_information_groupa355eRef.current?.handleSearch({});
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
        !Array.isArray(asset_information_groupa355e) &&
        Object.keys(asset_information_groupa355e)?.length > 0
      ) {
        setasset_information_groupa355e({})
        setasset_information_groupa355eProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [asset_information_groupa355eProps?.refresh])


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
        gridRow: '1 / 128',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '3px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setviewattachment_v1((pre:any)=>({...pre,_selectedGroup_:"asset_information_group"}))
        }}
    >
        {allowedComponent.includes("evidence_table_group")  &&<Groupevidence_table_group  
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
          {allowedControls.includes("asset_id_text") ?<Textasset_id_text   /* b71c0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("ai_asset_id") ?<Textai_asset_id   /* 599fe */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_code_text") ?<Textasset_code_text   /* ca27e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_code") ?<Textasset_code   /* 74d3d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* 180c8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name") ?<Textasset_name   /* 37ece */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_type_code_text") ?<Textasset_type_code_text   /* 3154f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_type_code") ?<Textasset_type_code   /* 0912c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupasset_information_group
