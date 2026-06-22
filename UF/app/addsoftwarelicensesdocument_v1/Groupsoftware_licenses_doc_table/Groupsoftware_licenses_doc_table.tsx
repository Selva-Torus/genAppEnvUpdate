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
import Tablesoftware_licenses_doc_table  from './Tablesoftware_licenses_doc_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupsoftware_licenses_doc_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_softwaredoctable_v1Props, setdfd_softwaredoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "software_licenses_doc_table"
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
      "software_licenses_doc_table"
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
  const {doc_attached_groupc3d26, setdoc_attached_groupc3d26}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupc3d26Props, setdoc_attached_groupc3d26Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group7bc52, settable_group7bc52}= useContext(TotalContext) as TotalContextProps;
  const {table_group7bc52Props, settable_group7bc52Props}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_doc_table265b6, setsoftware_licenses_doc_table265b6}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_doc_table265b6Props, setsoftware_licenses_doc_table265b6Props}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id1138d, setattachment_id1138d}= useContext(TotalContext) as TotalContextProps;
  const {doc_group3dcd4, setdoc_group3dcd4}= useContext(TotalContext) as TotalContextProps;
  const {doc_name698d2, setdoc_name698d2}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date0acd9, settrs_created_date0acd9}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by0c4db, settrs_created_by0c4db}= useContext(TotalContext) as TotalContextProps;
  const {bt_delete17f42, setbt_delete17f42}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addsoftwarelicensesdocument_v1, setaddsoftwarelicensesdocument_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:addSoftwareLicensesDocument:AFVK:v1',
    [user],
    'GroupSoftwareLicensesDocTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a5e9d57592215705ddce865ad37265b6");
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
    setsoftware_licenses_doc_table265b6Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("attachment_id")){
        setattachment_id1138d({...attachment_id1138d,isDisabled:true});

    }else
    {
      if(attachment_id1138d?.isDisabled==null)
      {
        setattachment_id1138d({...attachment_id1138d,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group")){
        setdoc_group3dcd4({...doc_group3dcd4,isDisabled:true});

    }else
    {
      if(doc_group3dcd4?.isDisabled==null)
      {
        setdoc_group3dcd4({...doc_group3dcd4,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name")){
        setdoc_name698d2({...doc_name698d2,isDisabled:true});

    }else
    {
      if(doc_name698d2?.isDisabled==null)
      {
        setdoc_name698d2({...doc_name698d2,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_date")){
        settrs_created_date0acd9({...trs_created_date0acd9,isDisabled:true});

    }else
    {
      if(trs_created_date0acd9?.isDisabled==null)
      {
        settrs_created_date0acd9({...trs_created_date0acd9,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by")){
        settrs_created_by0c4db({...trs_created_by0c4db,isDisabled:true});

    }else
    {
      if(trs_created_by0c4db?.isDisabled==null)
      {
        settrs_created_by0c4db({...trs_created_by0c4db,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_delete")){
        setbt_delete17f42({...bt_delete17f42,isDisabled:true});

    }else
    {
      if(bt_delete17f42?.isDisabled==null)
      {
        setbt_delete17f42({...bt_delete17f42,isDisabled:false});
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
        codeStates['doc_attached_group'] = doc_attached_groupc3d26,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupc3d26,
        codeStates['doc_attached_groupc3d26'] = doc_attached_groupc3d26Props,
        codeStates['setdoc_attached_groupc3d26'] = setdoc_attached_groupc3d26Props,
        codeStates['table_group'] = table_group7bc52,
        codeStates['settable_group'] = settable_group7bc52,
        codeStates['table_group7bc52'] = table_group7bc52Props,
        codeStates['settable_group7bc52'] = settable_group7bc52Props,
        codeStates['software_licenses_doc_table'] = software_licenses_doc_table265b6,
        codeStates['setsoftware_licenses_doc_table'] = setsoftware_licenses_doc_table265b6,
        codeStates['software_licenses_doc_table265b6'] = software_licenses_doc_table265b6Props,
        codeStates['setsoftware_licenses_doc_table265b6'] = setsoftware_licenses_doc_table265b6Props,
        codeStates['attachment_id'] = attachment_id1138d,
        codeStates['setattachment_id'] = setattachment_id1138d,
        codeStates['doc_group'] = doc_group3dcd4,
        codeStates['setdoc_group'] = setdoc_group3dcd4,
        codeStates['doc_name'] = doc_name698d2,
        codeStates['setdoc_name'] = setdoc_name698d2,
        codeStates['trs_created_date'] = trs_created_date0acd9,
        codeStates['settrs_created_date'] = settrs_created_date0acd9,
        codeStates['trs_created_by'] = trs_created_by0c4db,
        codeStates['settrs_created_by'] = settrs_created_by0c4db,
        codeStates['bt_delete'] = bt_delete17f42,
        codeStates['setbt_delete'] = setbt_delete17f42,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const software_licenses_doc_table265b6Ref = useRef<any>(null);
  const handleClearSearch = () => {
    software_licenses_doc_table265b6Ref.current?.setSearchParams();
    software_licenses_doc_table265b6Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(software_licenses_doc_table265b6) && Object.keys(software_licenses_doc_table265b6)?.length>0)
      {
        setsoftware_licenses_doc_table265b6({})
      }
    }else 
      prevRefreshRef.current= true
  }, [software_licenses_doc_table265b6Props?.refresh,token])


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
       {<Tablesoftware_licenses_doc_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={software_licenses_doc_table265b6Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupsoftware_licenses_doc_table
