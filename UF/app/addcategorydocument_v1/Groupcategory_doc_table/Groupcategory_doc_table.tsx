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
import Tablecategory_doc_table  from './Tablecategory_doc_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcategory_doc_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
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
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
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
  const {category_doc_table9b042, setcategory_doc_table9b042}= useContext(TotalContext) as TotalContextProps;
  const {category_doc_table9b042Props, setcategory_doc_table9b042Props}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id9b438, setattachment_id9b438}= useContext(TotalContext) as TotalContextProps;
  const {doc_group344aa, setdoc_group344aa}= useContext(TotalContext) as TotalContextProps;
  const {doc_namef124d, setdoc_namef124d}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date16faa, settrs_created_date16faa}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_byfb6e3, settrs_created_byfb6e3}= useContext(TotalContext) as TotalContextProps;
  const {bt_delete61896, setbt_delete61896}= useContext(TotalContext) as TotalContextProps;
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
    'GroupCategoryDocTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9b20382bc06fd1df012270625059b042");
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
    setcategory_doc_table9b042Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("attachment_id")){
        setattachment_id9b438({...attachment_id9b438,isDisabled:true});

    }else
    {
      if(attachment_id9b438?.isDisabled==null)
      {
        setattachment_id9b438({...attachment_id9b438,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group")){
        setdoc_group344aa({...doc_group344aa,isDisabled:true});

    }else
    {
      if(doc_group344aa?.isDisabled==null)
      {
        setdoc_group344aa({...doc_group344aa,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name")){
        setdoc_namef124d({...doc_namef124d,isDisabled:true});

    }else
    {
      if(doc_namef124d?.isDisabled==null)
      {
        setdoc_namef124d({...doc_namef124d,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_date")){
        settrs_created_date16faa({...trs_created_date16faa,isDisabled:true});

    }else
    {
      if(trs_created_date16faa?.isDisabled==null)
      {
        settrs_created_date16faa({...trs_created_date16faa,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by")){
        settrs_created_byfb6e3({...trs_created_byfb6e3,isDisabled:true});

    }else
    {
      if(trs_created_byfb6e3?.isDisabled==null)
      {
        settrs_created_byfb6e3({...trs_created_byfb6e3,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_delete")){
        setbt_delete61896({...bt_delete61896,isDisabled:true});

    }else
    {
      if(bt_delete61896?.isDisabled==null)
      {
        setbt_delete61896({...bt_delete61896,isDisabled:false});
      }
    }
  //////////////
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
        codeStates['category_doc_table'] = category_doc_table9b042,
        codeStates['setcategory_doc_table'] = setcategory_doc_table9b042,
        codeStates['category_doc_table9b042'] = category_doc_table9b042Props,
        codeStates['setcategory_doc_table9b042'] = setcategory_doc_table9b042Props,
        codeStates['attachment_id'] = attachment_id9b438,
        codeStates['setattachment_id'] = setattachment_id9b438,
        codeStates['doc_group'] = doc_group344aa,
        codeStates['setdoc_group'] = setdoc_group344aa,
        codeStates['doc_name'] = doc_namef124d,
        codeStates['setdoc_name'] = setdoc_namef124d,
        codeStates['trs_created_date'] = trs_created_date16faa,
        codeStates['settrs_created_date'] = settrs_created_date16faa,
        codeStates['trs_created_by'] = trs_created_byfb6e3,
        codeStates['settrs_created_by'] = settrs_created_byfb6e3,
        codeStates['bt_delete'] = bt_delete61896,
        codeStates['setbt_delete'] = setbt_delete61896,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const category_doc_table9b042Ref = useRef<any>(null);
  const handleClearSearch = () => {
    category_doc_table9b042Ref.current?.setSearchParams();
    category_doc_table9b042Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(category_doc_table9b042) && Object.keys(category_doc_table9b042)?.length>0)
      {
        setcategory_doc_table9b042({})
      }
    }else 
      prevRefreshRef.current= true
  }, [category_doc_table9b042Props?.refresh,token])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '15 / 71',
      
        //rowGap: '0px',
        overflow: 'visible',
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
       onClick={()=>handleOnClick({}, 0)}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablecategory_doc_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={category_doc_table9b042Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupcategory_doc_table
