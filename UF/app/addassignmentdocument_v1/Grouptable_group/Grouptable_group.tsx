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
import Groupdoc_table  from "../Groupdoc_table/Groupdoc_table";
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
import Textasset_name_text  from "./Textasset_name_text";
import Textasset_name  from "./Textasset_name";
import Textassigned_to_text  from "./Textassigned_to_text";
import Textassigned_to  from "./Textassigned_to";
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
  const {dfd_assigndoctable_v1Props, setdfd_assigndoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_name_text",
      "asset_name",
      "assigned_to_text",
      "assigned_to"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "asset_name_text",
      "asset_name",
      "assigned_to_text",
      "assigned_to"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "doc_table"
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
  const {doc_attached_groupbc2cf, setdoc_attached_groupbc2cf}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupbc2cfProps, setdoc_attached_groupbc2cfProps}= useContext(TotalContext) as TotalContextProps;
  const {table_group75a5e, settable_group75a5e}= useContext(TotalContext) as TotalContextProps;
  const {table_group75a5eProps, settable_group75a5eProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textbdd29, setasset_name_textbdd29}= useContext(TotalContext) as TotalContextProps;
  const {asset_namee1fc6, setasset_namee1fc6}= useContext(TotalContext) as TotalContextProps;
  const {assigned_to_text824e7, setassigned_to_text824e7}= useContext(TotalContext) as TotalContextProps;
  const {assigned_to72696, setassigned_to72696}= useContext(TotalContext) as TotalContextProps;
  const {doc_table392d0, setdoc_table392d0}= useContext(TotalContext) as TotalContextProps;
  const {doc_table392d0Props, setdoc_table392d0Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addassignmentdocument_v1, setaddassignmentdocument_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:addAssignmentDocument:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "92f4a248c47af9bad731b0beff775a5e");
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
    settable_group75a5eProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_textbdd29({...asset_name_textbdd29,isDisabled:true});

    }else
    {
      if(asset_name_textbdd29?.isDisabled==null)
      {
        setasset_name_textbdd29({...asset_name_textbdd29,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_namee1fc6({...asset_namee1fc6,isDisabled:true});

    }else
    {
      if(asset_namee1fc6?.isDisabled==null)
      {
        setasset_namee1fc6({...asset_namee1fc6,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_to_text")){
        setassigned_to_text824e7({...assigned_to_text824e7,isDisabled:true});

    }else
    {
      if(assigned_to_text824e7?.isDisabled==null)
      {
        setassigned_to_text824e7({...assigned_to_text824e7,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_to")){
        setassigned_to72696({...assigned_to72696,isDisabled:true});

    }else
    {
      if(assigned_to72696?.isDisabled==null)
      {
        setassigned_to72696({...assigned_to72696,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_table")){
        setdoc_table392d0({...doc_table392d0,isDisabled:true});

    }else
    {
      if(doc_table392d0?.isDisabled==null)
      {
        setdoc_table392d0({...doc_table392d0,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupbc2cf,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupbc2cf,
        codeStates['doc_attached_groupbc2cf'] = doc_attached_groupbc2cfProps,
        codeStates['setdoc_attached_groupbc2cf'] = setdoc_attached_groupbc2cfProps,
        codeStates['table_group'] = table_group75a5e,
        codeStates['settable_group'] = settable_group75a5e,
        codeStates['table_group75a5e'] = table_group75a5eProps,
        codeStates['settable_group75a5e'] = settable_group75a5eProps,
        codeStates['asset_name_text'] = asset_name_textbdd29,
        codeStates['setasset_name_text'] = setasset_name_textbdd29,
        codeStates['asset_name'] = asset_namee1fc6,
        codeStates['setasset_name'] = setasset_namee1fc6,
        codeStates['assigned_to_text'] = assigned_to_text824e7,
        codeStates['setassigned_to_text'] = setassigned_to_text824e7,
        codeStates['assigned_to'] = assigned_to72696,
        codeStates['setassigned_to'] = setassigned_to72696,
        codeStates['doc_table'] = doc_table392d0,
        codeStates['setdoc_table'] = setdoc_table392d0,
        codeStates['doc_table392d0'] = doc_table392d0Props,
        codeStates['setdoc_table392d0'] = setdoc_table392d0Props,

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
        codeStates['doc_attached_group'] = doc_attached_groupbc2cf,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupbc2cf,
        codeStates['doc_attached_groupbc2cf'] = doc_attached_groupbc2cfProps,
        codeStates['setdoc_attached_groupbc2cf'] = setdoc_attached_groupbc2cfProps,
        codeStates['table_group'] = table_group75a5e,
        codeStates['settable_group'] = settable_group75a5e,
        codeStates['table_group75a5e'] = table_group75a5eProps,
        codeStates['settable_group75a5e'] = settable_group75a5eProps,
        codeStates['asset_name_text'] = asset_name_textbdd29,
        codeStates['setasset_name_text'] = setasset_name_textbdd29,
        codeStates['asset_name'] = asset_namee1fc6,
        codeStates['setasset_name'] = setasset_namee1fc6,
        codeStates['assigned_to_text'] = assigned_to_text824e7,
        codeStates['setassigned_to_text'] = setassigned_to_text824e7,
        codeStates['assigned_to'] = assigned_to72696,
        codeStates['setassigned_to'] = setassigned_to72696,
        codeStates['doc_table'] = doc_table392d0,
        codeStates['setdoc_table'] = setdoc_table392d0,
        codeStates['doc_table392d0'] = doc_table392d0Props,
        codeStates['setdoc_table392d0'] = setdoc_table392d0Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const table_group75a5eRef = useRef<any>(null);
  const handleClearSearch = () => {
    table_group75a5eRef.current?.setSearchParams();
    table_group75a5eRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(table_group75a5e) && Object.keys(table_group75a5e)?.length>0)
      {
        settable_group75a5e({})
      }
    }else 
      prevRefreshRef.current= true
  }, [table_group75a5eProps?.refresh,token])


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
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
        {allowedComponent.includes("doc_table")  &&<Groupdoc_table  
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
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* bdd29 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name") ?<Textasset_name   /* e1fc6 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("assigned_to_text") ?<Textassigned_to_text   /* 824e7 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("assigned_to") ?<Textassigned_to   /* 72696 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptable_group
