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
import Grouptable_group  from "../Grouptable_group/Grouptable_group";
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
import DocumentUploadPaneldocumentuploadpanel  from "./DocumentUploadPaneldocumentuploadpanel";
import Buttonbutton_add_doc  from "./Buttonbutton_add_doc";
import Textassign_id  from "./Textassign_id";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdoc_attached_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "documentuploadpanel",
      "button_add_doc",
      "assign_id"
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
      "documentuploadpanel",
      "button_add_doc",
      "assign_id"
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
  const {doc_table392d0, setdoc_table392d0}= useContext(TotalContext) as TotalContextProps;
  const {doc_table392d0Props, setdoc_table392d0Props}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanel96f16, setdocumentuploadpanel96f16}= useContext(TotalContext) as TotalContextProps;
  const {button_add_doc8e522, setbutton_add_doc8e522}= useContext(TotalContext) as TotalContextProps;
  const {assign_id67308, setassign_id67308}= useContext(TotalContext) as TotalContextProps;
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
    'GroupDocAttachedGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "b85d8171ed243969ddd5e6b996fbc2cf");
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
    setdoc_attached_groupbc2cfProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("table_group")){
        settable_group75a5e({...table_group75a5e,isDisabled:true});

    }else
    {
      if(table_group75a5e?.isDisabled==null)
      {
        settable_group75a5e({...table_group75a5e,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("documentuploadpanel")){
        setdocumentuploadpanel96f16({...documentuploadpanel96f16,isDisabled:true});

    }else
    {
      if(documentuploadpanel96f16?.isDisabled==null)
      {
        setdocumentuploadpanel96f16({...documentuploadpanel96f16,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("button_add_doc")){
        setbutton_add_doc8e522({...button_add_doc8e522,isDisabled:true});

    }else
    {
      if(button_add_doc8e522?.isDisabled==null)
      {
        setbutton_add_doc8e522({...button_add_doc8e522,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assign_id")){
        setassign_id67308({...assign_id67308,isDisabled:true});

    }else
    {
      if(assign_id67308?.isDisabled==null)
      {
        setassign_id67308({...assign_id67308,isDisabled:false});
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
        codeStates['doc_table'] = doc_table392d0,
        codeStates['setdoc_table'] = setdoc_table392d0,
        codeStates['doc_table392d0'] = doc_table392d0Props,
        codeStates['setdoc_table392d0'] = setdoc_table392d0Props,
        codeStates['documentuploadpanel'] = documentuploadpanel96f16,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanel96f16,
        codeStates['button_add_doc'] = button_add_doc8e522,
        codeStates['setbutton_add_doc'] = setbutton_add_doc8e522,
        codeStates['assign_id'] = assign_id67308,
        codeStates['setassign_id'] = setassign_id67308,

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
        codeStates['doc_table'] = doc_table392d0,
        codeStates['setdoc_table'] = setdoc_table392d0,
        codeStates['doc_table392d0'] = doc_table392d0Props,
        codeStates['setdoc_table392d0'] = setdoc_table392d0Props,
        codeStates['documentuploadpanel'] = documentuploadpanel96f16,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanel96f16,
        codeStates['button_add_doc'] = button_add_doc8e522,
        codeStates['setbutton_add_doc'] = setbutton_add_doc8e522,
        codeStates['assign_id'] = assign_id67308,
        codeStates['setassign_id'] = setassign_id67308,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const doc_attached_groupbc2cfRef = useRef<any>(null);
  const handleClearSearch = () => {
    doc_attached_groupbc2cfRef.current?.setSearchParams();
    doc_attached_groupbc2cfRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(doc_attached_groupbc2cf) && Object.keys(doc_attached_groupbc2cf)?.length>0)
      {
        setdoc_attached_groupbc2cf({})
      }
    }else 
      prevRefreshRef.current= true
  }, [doc_attached_groupbc2cfProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 152',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
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
        {allowedComponent.includes("table_group")  &&<Grouptable_group  
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
        {allowedControls.includes("documentuploadpanel") ?<DocumentUploadPaneldocumentuploadpanel   /* 96f16 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "button_add_doc" in ButtonGoRuleData)?ButtonGoRuleData["button_add_doc"]:true) && 
          allowedControls.includes("button_add_doc")  ?            <Buttonbutton_add_doc tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
          {allowedControls.includes("assign_id") ?<Textassign_id   /* 67308 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupdoc_attached_group
