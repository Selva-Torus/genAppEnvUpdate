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
import Groupcategory_doc_table  from "../Groupcategory_doc_table/Groupcategory_doc_table";
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
import Textacat_id_text  from "./Textacat_id_text";
import Textacat_id  from "./Textacat_id";
import Textacat_name_text  from "./Textacat_name_text";
import Textcategory_name  from "./Textcategory_name";
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
  const {dfd_categorydoctable_v1Props, setdfd_categorydoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "acat_id_text",
      "acat_id",
      "acat_name_text",
      "category_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "category_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "acat_id_text",
      "acat_id",
      "acat_name_text",
      "category_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "category_doc_table"
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
  const {doc_attached_groupb9604, setdoc_attached_groupb9604}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupb9604Props, setdoc_attached_groupb9604Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupefcb8, settable_groupefcb8}= useContext(TotalContext) as TotalContextProps;
  const {table_groupefcb8Props, settable_groupefcb8Props}= useContext(TotalContext) as TotalContextProps;
  const {acat_id_text04690, setacat_id_text04690}= useContext(TotalContext) as TotalContextProps;
  const {acat_ida2d51, setacat_ida2d51}= useContext(TotalContext) as TotalContextProps;
  const {acat_name_textc9d3e, setacat_name_textc9d3e}= useContext(TotalContext) as TotalContextProps;
  const {category_name4ccfb, setcategory_name4ccfb}= useContext(TotalContext) as TotalContextProps;
  const {category_doc_table9b042, setcategory_doc_table9b042}= useContext(TotalContext) as TotalContextProps;
  const {category_doc_table9b042Props, setcategory_doc_table9b042Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addcategorydocument_v1, setaddcategorydocument_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:addCategoryDocument:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "0e319fcb4b335a107febad59618efcb8");
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
    settable_groupefcb8Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("acat_id_text")){
        setacat_id_text04690({...acat_id_text04690,isDisabled:true});

    }else
    {
      if(acat_id_text04690?.isDisabled==null)
      {
        setacat_id_text04690({...acat_id_text04690,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("acat_id")){
        setacat_ida2d51({...acat_ida2d51,isDisabled:true});

    }else
    {
      if(acat_ida2d51?.isDisabled==null)
      {
        setacat_ida2d51({...acat_ida2d51,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("acat_name_text")){
        setacat_name_textc9d3e({...acat_name_textc9d3e,isDisabled:true});

    }else
    {
      if(acat_name_textc9d3e?.isDisabled==null)
      {
        setacat_name_textc9d3e({...acat_name_textc9d3e,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_name")){
        setcategory_name4ccfb({...category_name4ccfb,isDisabled:true});

    }else
    {
      if(category_name4ccfb?.isDisabled==null)
      {
        setcategory_name4ccfb({...category_name4ccfb,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_doc_table")){
        setcategory_doc_table9b042({...category_doc_table9b042,isDisabled:true});

    }else
    {
      if(category_doc_table9b042?.isDisabled==null)
      {
        setcategory_doc_table9b042({...category_doc_table9b042,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupb9604,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupb9604,
        codeStates['doc_attached_groupb9604'] = doc_attached_groupb9604Props,
        codeStates['setdoc_attached_groupb9604'] = setdoc_attached_groupb9604Props,
        codeStates['table_group'] = table_groupefcb8,
        codeStates['settable_group'] = settable_groupefcb8,
        codeStates['table_groupefcb8'] = table_groupefcb8Props,
        codeStates['settable_groupefcb8'] = settable_groupefcb8Props,
        codeStates['acat_id_text'] = acat_id_text04690,
        codeStates['setacat_id_text'] = setacat_id_text04690,
        codeStates['acat_id'] = acat_ida2d51,
        codeStates['setacat_id'] = setacat_ida2d51,
        codeStates['acat_name_text'] = acat_name_textc9d3e,
        codeStates['setacat_name_text'] = setacat_name_textc9d3e,
        codeStates['category_name'] = category_name4ccfb,
        codeStates['setcategory_name'] = setcategory_name4ccfb,
        codeStates['category_doc_table'] = category_doc_table9b042,
        codeStates['setcategory_doc_table'] = setcategory_doc_table9b042,
        codeStates['category_doc_table9b042'] = category_doc_table9b042Props,
        codeStates['setcategory_doc_table9b042'] = setcategory_doc_table9b042Props,

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
        codeStates['doc_attached_group'] = doc_attached_groupb9604,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupb9604,
        codeStates['doc_attached_groupb9604'] = doc_attached_groupb9604Props,
        codeStates['setdoc_attached_groupb9604'] = setdoc_attached_groupb9604Props,
        codeStates['table_group'] = table_groupefcb8,
        codeStates['settable_group'] = settable_groupefcb8,
        codeStates['table_groupefcb8'] = table_groupefcb8Props,
        codeStates['settable_groupefcb8'] = settable_groupefcb8Props,
        codeStates['acat_id_text'] = acat_id_text04690,
        codeStates['setacat_id_text'] = setacat_id_text04690,
        codeStates['acat_id'] = acat_ida2d51,
        codeStates['setacat_id'] = setacat_ida2d51,
        codeStates['acat_name_text'] = acat_name_textc9d3e,
        codeStates['setacat_name_text'] = setacat_name_textc9d3e,
        codeStates['category_name'] = category_name4ccfb,
        codeStates['setcategory_name'] = setcategory_name4ccfb,
        codeStates['category_doc_table'] = category_doc_table9b042,
        codeStates['setcategory_doc_table'] = setcategory_doc_table9b042,
        codeStates['category_doc_table9b042'] = category_doc_table9b042Props,
        codeStates['setcategory_doc_table9b042'] = setcategory_doc_table9b042Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const table_groupefcb8Ref = useRef<any>(null);
  const handleClearSearch = () => {
    table_groupefcb8Ref.current?.setSearchParams();
    table_groupefcb8Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(table_groupefcb8) && Object.keys(table_groupefcb8)?.length>0)
      {
        settable_groupefcb8({})
      }
    }else 
      prevRefreshRef.current= true
  }, [table_groupefcb8Props?.refresh,token])


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
        {allowedComponent.includes("category_doc_table")  &&<Groupcategory_doc_table  
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
          {allowedControls.includes("acat_id_text") ?<Textacat_id_text   /* 04690 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("acat_id") ?<Textacat_id   /* a2d51 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("acat_name_text") ?<Textacat_name_text   /* c9d3e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("category_name") ?<Textcategory_name   /* 4ccfb */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptable_group
