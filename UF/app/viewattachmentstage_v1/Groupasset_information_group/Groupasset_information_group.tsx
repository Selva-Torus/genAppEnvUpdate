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
  const {overall_evidences_groupd988a, setoverall_evidences_groupd988a}= useContext(TotalContext) as TotalContextProps;
  const {overall_evidences_groupd988aProps, setoverall_evidences_groupd988aProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_group1f808, setasset_information_group1f808}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_group1f808Props, setasset_information_group1f808Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_id_text60af3, setasset_id_text60af3}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id932d9, setai_asset_id932d9}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_textc00bb, setasset_code_textc00bb}= useContext(TotalContext) as TotalContextProps;
  const {asset_code63f57, setasset_code63f57}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textcbb5f, setasset_name_textcbb5f}= useContext(TotalContext) as TotalContextProps;
  const {asset_named26c1, setasset_named26c1}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text3374b, setasset_type_code_text3374b}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_coded1640, setasset_type_coded1640}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_groupea2c7, setevidence_table_groupea2c7}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_groupea2c7Props, setevidence_table_groupea2c7Props}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table6beb4, setevidence_table6beb4}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table6beb4Props, setevidence_table6beb4Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewattachmentstage_v1, setviewattachmentstage_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ViewAttachmentStage:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "13846a8460d3dea57ca79d3ca431f808");
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
    setasset_information_group1f808Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("asset_id_text")){
        setasset_id_text60af3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_id_text60af3?.isDisabled==null)
      {
        setasset_id_text60af3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ai_asset_id")){
        setai_asset_id932d9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_asset_id932d9?.isDisabled==null)
      {
        setai_asset_id932d9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code_text")){
        setasset_code_textc00bb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code_textc00bb?.isDisabled==null)
      {
        setasset_code_textc00bb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_code63f57((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code63f57?.isDisabled==null)
      {
        setasset_code63f57((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_textcbb5f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name_textcbb5f?.isDisabled==null)
      {
        setasset_name_textcbb5f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_named26c1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_named26c1?.isDisabled==null)
      {
        setasset_named26c1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code_text")){
        setasset_type_code_text3374b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_code_text3374b?.isDisabled==null)
      {
        setasset_type_code_text3374b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code")){
        setasset_type_coded1640((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_coded1640?.isDisabled==null)
      {
        setasset_type_coded1640((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("evidence_table_group")){
        setevidence_table_groupea2c7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(evidence_table_groupea2c7?.isDisabled==null)
      {
        setevidence_table_groupea2c7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_evidences_group'] = overall_evidences_groupd988a,
        codeStates['setoverall_evidences_group'] = setoverall_evidences_groupd988a,
        codeStates['overall_evidences_groupd988a'] = overall_evidences_groupd988aProps,
        codeStates['setoverall_evidences_groupd988a'] = setoverall_evidences_groupd988aProps,
        codeStates['asset_information_group'] = asset_information_group1f808,
        codeStates['setasset_information_group'] = setasset_information_group1f808,
        codeStates['asset_information_group1f808'] = asset_information_group1f808Props,
        codeStates['setasset_information_group1f808'] = setasset_information_group1f808Props,
        codeStates['asset_id_text'] = asset_id_text60af3,
        codeStates['setasset_id_text'] = setasset_id_text60af3,
        codeStates['ai_asset_id'] = ai_asset_id932d9,
        codeStates['setai_asset_id'] = setai_asset_id932d9,
        codeStates['asset_code_text'] = asset_code_textc00bb,
        codeStates['setasset_code_text'] = setasset_code_textc00bb,
        codeStates['asset_code'] = asset_code63f57,
        codeStates['setasset_code'] = setasset_code63f57,
        codeStates['asset_name_text'] = asset_name_textcbb5f,
        codeStates['setasset_name_text'] = setasset_name_textcbb5f,
        codeStates['asset_name'] = asset_named26c1,
        codeStates['setasset_name'] = setasset_named26c1,
        codeStates['asset_type_code_text'] = asset_type_code_text3374b,
        codeStates['setasset_type_code_text'] = setasset_type_code_text3374b,
        codeStates['asset_type_code'] = asset_type_coded1640,
        codeStates['setasset_type_code'] = setasset_type_coded1640,
        codeStates['evidence_table_group'] = evidence_table_groupea2c7,
        codeStates['setevidence_table_group'] = setevidence_table_groupea2c7,
        codeStates['evidence_table_groupea2c7'] = evidence_table_groupea2c7Props,
        codeStates['setevidence_table_groupea2c7'] = setevidence_table_groupea2c7Props,
        codeStates['evidence_table'] = evidence_table6beb4,
        codeStates['setevidence_table'] = setevidence_table6beb4,
        codeStates['evidence_table6beb4'] = evidence_table6beb4Props,
        codeStates['setevidence_table6beb4'] = setevidence_table6beb4Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "13846a8460d3dea57ca79d3ca431f808");
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
        codeStates['overall_evidences_group'] = overall_evidences_groupd988a,
        codeStates['setoverall_evidences_group'] = setoverall_evidences_groupd988a,
        codeStates['overall_evidences_groupd988a'] = overall_evidences_groupd988aProps,
        codeStates['setoverall_evidences_groupd988a'] = setoverall_evidences_groupd988aProps,
        codeStates['asset_information_group'] = asset_information_group1f808,
        codeStates['setasset_information_group'] = setasset_information_group1f808,
        codeStates['asset_information_group1f808'] = asset_information_group1f808Props,
        codeStates['setasset_information_group1f808'] = setasset_information_group1f808Props,
        codeStates['asset_id_text'] = asset_id_text60af3,
        codeStates['setasset_id_text'] = setasset_id_text60af3,
        codeStates['ai_asset_id'] = ai_asset_id932d9,
        codeStates['setai_asset_id'] = setai_asset_id932d9,
        codeStates['asset_code_text'] = asset_code_textc00bb,
        codeStates['setasset_code_text'] = setasset_code_textc00bb,
        codeStates['asset_code'] = asset_code63f57,
        codeStates['setasset_code'] = setasset_code63f57,
        codeStates['asset_name_text'] = asset_name_textcbb5f,
        codeStates['setasset_name_text'] = setasset_name_textcbb5f,
        codeStates['asset_name'] = asset_named26c1,
        codeStates['setasset_name'] = setasset_named26c1,
        codeStates['asset_type_code_text'] = asset_type_code_text3374b,
        codeStates['setasset_type_code_text'] = setasset_type_code_text3374b,
        codeStates['asset_type_code'] = asset_type_coded1640,
        codeStates['setasset_type_code'] = setasset_type_coded1640,
        codeStates['evidence_table_group'] = evidence_table_groupea2c7,
        codeStates['setevidence_table_group'] = setevidence_table_groupea2c7,
        codeStates['evidence_table_groupea2c7'] = evidence_table_groupea2c7Props,
        codeStates['setevidence_table_groupea2c7'] = setevidence_table_groupea2c7Props,
        codeStates['evidence_table'] = evidence_table6beb4,
        codeStates['setevidence_table'] = setevidence_table6beb4,
        codeStates['evidence_table6beb4'] = evidence_table6beb4Props,
        codeStates['setevidence_table6beb4'] = setevidence_table6beb4Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const asset_information_group1f808Ref = useRef<any>(null);
  const handleClearSearch = () => {
    asset_information_group1f808Ref.current?.setSearchParams();
    asset_information_group1f808Ref.current?.handleSearch({});
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
        !Array.isArray(asset_information_group1f808) &&
        Object.keys(asset_information_group1f808)?.length > 0
      ) {
        setasset_information_group1f808({})
        setasset_information_group1f808Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [asset_information_group1f808Props?.refresh])


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
          setviewattachmentstage_v1((pre:any)=>({...pre,_selectedGroup_:"asset_information_group"}))
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
          {allowedControls.includes("asset_id_text") ?<Textasset_id_text   /* 60af3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("ai_asset_id") ?<Textai_asset_id   /* 932d9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_code_text") ?<Textasset_code_text   /* c00bb */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_code") ?<Textasset_code   /* 63f57 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* cbb5f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name") ?<Textasset_name   /* d26c1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_type_code_text") ?<Textasset_type_code_text   /* 3374b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_type_code") ?<Textasset_type_code   /* d1640 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupasset_information_group
