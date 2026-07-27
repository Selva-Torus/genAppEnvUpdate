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
import Tableposition_doc_table  from './Tableposition_doc_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupposition_doc_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_positiondoctable_v1Props, setdfd_positiondoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "position_doc_table"
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
      "position_doc_table"
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
      "position_doc_table"
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
      "position_doc_table"
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
      "position_doc_table"
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
      "position_doc_table"
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
      "position_doc_table"
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
      "position_doc_table"
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
  const {doc_attached_groupedd83, setdoc_attached_groupedd83}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupedd83Props, setdoc_attached_groupedd83Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group5e697, settable_group5e697}= useContext(TotalContext) as TotalContextProps;
  const {table_group5e697Props, settable_group5e697Props}= useContext(TotalContext) as TotalContextProps;
  const {position_doc_tableb28d5, setposition_doc_tableb28d5}= useContext(TotalContext) as TotalContextProps;
  const {position_doc_tableb28d5Props, setposition_doc_tableb28d5Props}= useContext(TotalContext) as TotalContextProps;
  const {attachment_idaeefc, setattachment_idaeefc}= useContext(TotalContext) as TotalContextProps;
  const {doc_groupd879a, setdoc_groupd879a}= useContext(TotalContext) as TotalContextProps;
  const {doc_name9c9f6, setdoc_name9c9f6}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_datedf4d7, settrs_created_datedf4d7}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_byb152b, settrs_created_byb152b}= useContext(TotalContext) as TotalContextProps;
  const {bt_deleted1bbc, setbt_deleted1bbc}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addpositiondocument_v1, setaddpositiondocument_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:addPositionDocument:AFVK:v1',
    [user],
    'GroupPositionDocTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e61e4a1d7af13e88748e6a70ea3b28d5");
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
    setposition_doc_tableb28d5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("attachment_id")){
        setattachment_idaeefc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(attachment_idaeefc?.isDisabled==null)
      {
        setattachment_idaeefc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group")){
        setdoc_groupd879a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_groupd879a?.isDisabled==null)
      {
        setdoc_groupd879a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name")){
        setdoc_name9c9f6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_name9c9f6?.isDisabled==null)
      {
        setdoc_name9c9f6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_date")){
        settrs_created_datedf4d7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_created_datedf4d7?.isDisabled==null)
      {
        settrs_created_datedf4d7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by")){
        settrs_created_byb152b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_created_byb152b?.isDisabled==null)
      {
        settrs_created_byb152b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_delete")){
        setbt_deleted1bbc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(bt_deleted1bbc?.isDisabled==null)
      {
        setbt_deleted1bbc((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['doc_attached_group'] = doc_attached_groupedd83,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupedd83,
        codeStates['doc_attached_groupedd83'] = doc_attached_groupedd83Props,
        codeStates['setdoc_attached_groupedd83'] = setdoc_attached_groupedd83Props,
        codeStates['table_group'] = table_group5e697,
        codeStates['settable_group'] = settable_group5e697,
        codeStates['table_group5e697'] = table_group5e697Props,
        codeStates['settable_group5e697'] = settable_group5e697Props,
        codeStates['position_doc_table'] = position_doc_tableb28d5,
        codeStates['setposition_doc_table'] = setposition_doc_tableb28d5,
        codeStates['position_doc_tableb28d5'] = position_doc_tableb28d5Props,
        codeStates['setposition_doc_tableb28d5'] = setposition_doc_tableb28d5Props,
        codeStates['attachment_id'] = attachment_idaeefc,
        codeStates['setattachment_id'] = setattachment_idaeefc,
        codeStates['doc_group'] = doc_groupd879a,
        codeStates['setdoc_group'] = setdoc_groupd879a,
        codeStates['doc_name'] = doc_name9c9f6,
        codeStates['setdoc_name'] = setdoc_name9c9f6,
        codeStates['trs_created_date'] = trs_created_datedf4d7,
        codeStates['settrs_created_date'] = settrs_created_datedf4d7,
        codeStates['trs_created_by'] = trs_created_byb152b,
        codeStates['settrs_created_by'] = settrs_created_byb152b,
        codeStates['bt_delete'] = bt_deleted1bbc,
        codeStates['setbt_delete'] = setbt_deleted1bbc,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const position_doc_tableb28d5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    position_doc_tableb28d5Ref.current?.setSearchParams();
    position_doc_tableb28d5Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(position_doc_tableb28d5) && Object.keys(position_doc_tableb28d5)?.length>0)
      {
        setposition_doc_tableb28d5({})
      }
    }else 
      prevRefreshRef.current= true
  }, [position_doc_tableb28d5Props?.refresh,token])


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
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaddpositiondocument_v1((pre:any)=>({...pre,_selectedGroup_:"position_doc_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableposition_doc_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={position_doc_tableb28d5Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupposition_doc_table
