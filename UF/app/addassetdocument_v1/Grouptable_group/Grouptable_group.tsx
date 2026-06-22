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
import Groupasset_doc_table  from "../Groupasset_doc_table/Groupasset_doc_table";
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
import Textasset_id  from "./Textasset_id";
import Textasset_name_text  from "./Textasset_name_text";
import Textasset_name  from "./Textasset_name";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptable_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetdoctable_v1Props, setdfd_assetdoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "IT Engineer": {
    "allowedControls": [
      "asset_id_text",
      "asset_id",
      "asset_name_text",
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "asset_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "asset_id_text",
      "asset_id",
      "asset_name_text",
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "asset_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Maker": {
    "allowedControls": [
      "asset_id_text",
      "asset_id",
      "asset_name_text",
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "asset_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "asset_id_text",
      "asset_id",
      "asset_name_text",
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "asset_doc_table"
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
  const {doc_attached_group36b0d, setdoc_attached_group36b0d}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_group36b0dProps, setdoc_attached_group36b0dProps}= useContext(TotalContext) as TotalContextProps;
  const {table_groupdaaaa, settable_groupdaaaa}= useContext(TotalContext) as TotalContextProps;
  const {table_groupdaaaaProps, settable_groupdaaaaProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_id_text67e51, setasset_id_text67e51}= useContext(TotalContext) as TotalContextProps;
  const {asset_idfc689, setasset_idfc689}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text06c7c, setasset_name_text06c7c}= useContext(TotalContext) as TotalContextProps;
  const {asset_name7dfbc, setasset_name7dfbc}= useContext(TotalContext) as TotalContextProps;
  const {asset_doc_table49f40, setasset_doc_table49f40}= useContext(TotalContext) as TotalContextProps;
  const {asset_doc_table49f40Props, setasset_doc_table49f40Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addassetdocument_v1, setaddassetdocument_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:addAssetDocument:AFVK:v1',
    [user],
    'GroupTableGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "63e6fc05b8ed45ae8cd2aa641ebdaaaa");
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
    settable_groupdaaaaProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("asset_id_text")){
        setasset_id_text67e51({...asset_id_text67e51,isDisabled:true});

    }else
    {
      if(asset_id_text67e51?.isDisabled==null)
      {
        setasset_id_text67e51({...asset_id_text67e51,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_id")){
        setasset_idfc689({...asset_idfc689,isDisabled:true});

    }else
    {
      if(asset_idfc689?.isDisabled==null)
      {
        setasset_idfc689({...asset_idfc689,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_text06c7c({...asset_name_text06c7c,isDisabled:true});

    }else
    {
      if(asset_name_text06c7c?.isDisabled==null)
      {
        setasset_name_text06c7c({...asset_name_text06c7c,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name7dfbc({...asset_name7dfbc,isDisabled:true});

    }else
    {
      if(asset_name7dfbc?.isDisabled==null)
      {
        setasset_name7dfbc({...asset_name7dfbc,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_doc_table")){
        setasset_doc_table49f40({...asset_doc_table49f40,isDisabled:true});

    }else
    {
      if(asset_doc_table49f40?.isDisabled==null)
      {
        setasset_doc_table49f40({...asset_doc_table49f40,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_group36b0d,
        codeStates['setdoc_attached_group'] = setdoc_attached_group36b0d,
        codeStates['doc_attached_group36b0d'] = doc_attached_group36b0dProps,
        codeStates['setdoc_attached_group36b0d'] = setdoc_attached_group36b0dProps,
        codeStates['table_group'] = table_groupdaaaa,
        codeStates['settable_group'] = settable_groupdaaaa,
        codeStates['table_groupdaaaa'] = table_groupdaaaaProps,
        codeStates['settable_groupdaaaa'] = settable_groupdaaaaProps,
        codeStates['asset_id_text'] = asset_id_text67e51,
        codeStates['setasset_id_text'] = setasset_id_text67e51,
        codeStates['asset_id'] = asset_idfc689,
        codeStates['setasset_id'] = setasset_idfc689,
        codeStates['asset_name_text'] = asset_name_text06c7c,
        codeStates['setasset_name_text'] = setasset_name_text06c7c,
        codeStates['asset_name'] = asset_name7dfbc,
        codeStates['setasset_name'] = setasset_name7dfbc,
        codeStates['asset_doc_table'] = asset_doc_table49f40,
        codeStates['setasset_doc_table'] = setasset_doc_table49f40,
        codeStates['asset_doc_table49f40'] = asset_doc_table49f40Props,
        codeStates['setasset_doc_table49f40'] = setasset_doc_table49f40Props,

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
        codeStates['doc_attached_group'] = doc_attached_group36b0d,
        codeStates['setdoc_attached_group'] = setdoc_attached_group36b0d,
        codeStates['doc_attached_group36b0d'] = doc_attached_group36b0dProps,
        codeStates['setdoc_attached_group36b0d'] = setdoc_attached_group36b0dProps,
        codeStates['table_group'] = table_groupdaaaa,
        codeStates['settable_group'] = settable_groupdaaaa,
        codeStates['table_groupdaaaa'] = table_groupdaaaaProps,
        codeStates['settable_groupdaaaa'] = settable_groupdaaaaProps,
        codeStates['asset_id_text'] = asset_id_text67e51,
        codeStates['setasset_id_text'] = setasset_id_text67e51,
        codeStates['asset_id'] = asset_idfc689,
        codeStates['setasset_id'] = setasset_idfc689,
        codeStates['asset_name_text'] = asset_name_text06c7c,
        codeStates['setasset_name_text'] = setasset_name_text06c7c,
        codeStates['asset_name'] = asset_name7dfbc,
        codeStates['setasset_name'] = setasset_name7dfbc,
        codeStates['asset_doc_table'] = asset_doc_table49f40,
        codeStates['setasset_doc_table'] = setasset_doc_table49f40,
        codeStates['asset_doc_table49f40'] = asset_doc_table49f40Props,
        codeStates['setasset_doc_table49f40'] = setasset_doc_table49f40Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const table_groupdaaaaRef = useRef<any>(null);
  const handleClearSearch = () => {
    table_groupdaaaaRef.current?.setSearchParams();
    table_groupdaaaaRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(table_groupdaaaa) && Object.keys(table_groupdaaaa)?.length>0)
      {
        settable_groupdaaaa({})
      }
    }else 
      prevRefreshRef.current= true
  }, [table_groupdaaaaProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 74',
      
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
       onClick={()=>handleOnClick({}, 0)}
    >
        {allowedComponent.includes("asset_doc_table")  &&<Groupasset_doc_table  
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
          {allowedControls.includes("asset_id_text") ?<Textasset_id_text   /* 67e51 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_id") ?<Textasset_id   /* fc689 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* 06c7c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name") ?<Textasset_name   /* 7dfbc */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptable_group
