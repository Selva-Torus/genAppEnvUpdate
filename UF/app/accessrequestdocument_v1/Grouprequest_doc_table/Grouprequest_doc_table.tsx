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
import Tablerequest_doc_table  from './Tablerequest_doc_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouprequest_doc_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_accessreqdoctable_v1Props, setdfd_accessreqdoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "CXO": {
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
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
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
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
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
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
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
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
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
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
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
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
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
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
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
      "request_doc_table"
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
  const {doc_attached_groupd9ca3, setdoc_attached_groupd9ca3}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupd9ca3Props, setdoc_attached_groupd9ca3Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupbcd33, settable_groupbcd33}= useContext(TotalContext) as TotalContextProps;
  const {table_groupbcd33Props, settable_groupbcd33Props}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tablea9098, setrequest_doc_tablea9098}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tablea9098Props, setrequest_doc_tablea9098Props}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id3a32b, setattachment_id3a32b}= useContext(TotalContext) as TotalContextProps;
  const {doc_groupb39db, setdoc_groupb39db}= useContext(TotalContext) as TotalContextProps;
  const {doc_name972ff, setdoc_name972ff}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date62e44, settrs_created_date62e44}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by13bbc, settrs_created_by13bbc}= useContext(TotalContext) as TotalContextProps;
  const {bt_delete63555, setbt_delete63555}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {accessrequestdocument_v1, setaccessrequestdocument_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:accessRequestDocument:AFVK:v1',
    [user],
    'GroupRequestDocTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d902a9ff8e44f6c60f7ec1f0f80a9098");
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
    setrequest_doc_tablea9098Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("attachment_id")){
        setattachment_id3a32b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(attachment_id3a32b?.isDisabled==null)
      {
        setattachment_id3a32b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group")){
        setdoc_groupb39db((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_groupb39db?.isDisabled==null)
      {
        setdoc_groupb39db((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name")){
        setdoc_name972ff((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_name972ff?.isDisabled==null)
      {
        setdoc_name972ff((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_date")){
        settrs_created_date62e44((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_created_date62e44?.isDisabled==null)
      {
        settrs_created_date62e44((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by")){
        settrs_created_by13bbc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_created_by13bbc?.isDisabled==null)
      {
        settrs_created_by13bbc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_delete")){
        setbt_delete63555((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(bt_delete63555?.isDisabled==null)
      {
        setbt_delete63555((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['doc_attached_group'] = doc_attached_groupd9ca3,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupd9ca3,
        codeStates['doc_attached_groupd9ca3'] = doc_attached_groupd9ca3Props,
        codeStates['setdoc_attached_groupd9ca3'] = setdoc_attached_groupd9ca3Props,
        codeStates['table_group'] = table_groupbcd33,
        codeStates['settable_group'] = settable_groupbcd33,
        codeStates['table_groupbcd33'] = table_groupbcd33Props,
        codeStates['settable_groupbcd33'] = settable_groupbcd33Props,
        codeStates['request_doc_table'] = request_doc_tablea9098,
        codeStates['setrequest_doc_table'] = setrequest_doc_tablea9098,
        codeStates['request_doc_tablea9098'] = request_doc_tablea9098Props,
        codeStates['setrequest_doc_tablea9098'] = setrequest_doc_tablea9098Props,
        codeStates['attachment_id'] = attachment_id3a32b,
        codeStates['setattachment_id'] = setattachment_id3a32b,
        codeStates['doc_group'] = doc_groupb39db,
        codeStates['setdoc_group'] = setdoc_groupb39db,
        codeStates['doc_name'] = doc_name972ff,
        codeStates['setdoc_name'] = setdoc_name972ff,
        codeStates['trs_created_date'] = trs_created_date62e44,
        codeStates['settrs_created_date'] = settrs_created_date62e44,
        codeStates['trs_created_by'] = trs_created_by13bbc,
        codeStates['settrs_created_by'] = settrs_created_by13bbc,
        codeStates['bt_delete'] = bt_delete63555,
        codeStates['setbt_delete'] = setbt_delete63555,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const request_doc_tablea9098Ref = useRef<any>(null);
  const handleClearSearch = () => {
    request_doc_tablea9098Ref.current?.setSearchParams();
    request_doc_tablea9098Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(request_doc_tablea9098) && Object.keys(request_doc_tablea9098)?.length>0)
      {
        setrequest_doc_tablea9098({})
      }
    }else 
      prevRefreshRef.current= true
  }, [request_doc_tablea9098Props?.refresh,token])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '23 / 79',
      
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
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaccessrequestdocument_v1((pre:any)=>({...pre,_selectedGroup_:"request_doc_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablerequest_doc_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={request_doc_tablea9098Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouprequest_doc_table
