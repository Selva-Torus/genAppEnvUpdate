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
import Tableasset_doc_table  from './Tableasset_doc_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupasset_doc_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "asset_doc_table"
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
      "asset_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
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
      "asset_doc_table"
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
  const {asset_doc_table49f40, setasset_doc_table49f40}= useContext(TotalContext) as TotalContextProps;
  const {asset_doc_table49f40Props, setasset_doc_table49f40Props}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id185f0, setattachment_id185f0}= useContext(TotalContext) as TotalContextProps;
  const {doc_group6421d, setdoc_group6421d}= useContext(TotalContext) as TotalContextProps;
  const {doc_name41b3b, setdoc_name41b3b}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date2eb99, settrs_created_date2eb99}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_byfae15, settrs_created_byfae15}= useContext(TotalContext) as TotalContextProps;
  const {bt_delete6174f, setbt_delete6174f}= useContext(TotalContext) as TotalContextProps;
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
    'GroupAssetDocTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "858e60aa8d764228bc44c6400a849f40");
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
    setasset_doc_table49f40Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("attachment_id")){
        setattachment_id185f0({...attachment_id185f0,isDisabled:true});

    }else
    {
      if(attachment_id185f0?.isDisabled==null)
      {
        setattachment_id185f0({...attachment_id185f0,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group")){
        setdoc_group6421d({...doc_group6421d,isDisabled:true});

    }else
    {
      if(doc_group6421d?.isDisabled==null)
      {
        setdoc_group6421d({...doc_group6421d,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name")){
        setdoc_name41b3b({...doc_name41b3b,isDisabled:true});

    }else
    {
      if(doc_name41b3b?.isDisabled==null)
      {
        setdoc_name41b3b({...doc_name41b3b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_date")){
        settrs_created_date2eb99({...trs_created_date2eb99,isDisabled:true});

    }else
    {
      if(trs_created_date2eb99?.isDisabled==null)
      {
        settrs_created_date2eb99({...trs_created_date2eb99,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by")){
        settrs_created_byfae15({...trs_created_byfae15,isDisabled:true});

    }else
    {
      if(trs_created_byfae15?.isDisabled==null)
      {
        settrs_created_byfae15({...trs_created_byfae15,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_delete")){
        setbt_delete6174f({...bt_delete6174f,isDisabled:true});

    }else
    {
      if(bt_delete6174f?.isDisabled==null)
      {
        setbt_delete6174f({...bt_delete6174f,isDisabled:false});
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
        codeStates['doc_attached_group'] = doc_attached_group36b0d,
        codeStates['setdoc_attached_group'] = setdoc_attached_group36b0d,
        codeStates['doc_attached_group36b0d'] = doc_attached_group36b0dProps,
        codeStates['setdoc_attached_group36b0d'] = setdoc_attached_group36b0dProps,
        codeStates['table_group'] = table_groupdaaaa,
        codeStates['settable_group'] = settable_groupdaaaa,
        codeStates['table_groupdaaaa'] = table_groupdaaaaProps,
        codeStates['settable_groupdaaaa'] = settable_groupdaaaaProps,
        codeStates['asset_doc_table'] = asset_doc_table49f40,
        codeStates['setasset_doc_table'] = setasset_doc_table49f40,
        codeStates['asset_doc_table49f40'] = asset_doc_table49f40Props,
        codeStates['setasset_doc_table49f40'] = setasset_doc_table49f40Props,
        codeStates['attachment_id'] = attachment_id185f0,
        codeStates['setattachment_id'] = setattachment_id185f0,
        codeStates['doc_group'] = doc_group6421d,
        codeStates['setdoc_group'] = setdoc_group6421d,
        codeStates['doc_name'] = doc_name41b3b,
        codeStates['setdoc_name'] = setdoc_name41b3b,
        codeStates['trs_created_date'] = trs_created_date2eb99,
        codeStates['settrs_created_date'] = settrs_created_date2eb99,
        codeStates['trs_created_by'] = trs_created_byfae15,
        codeStates['settrs_created_by'] = settrs_created_byfae15,
        codeStates['bt_delete'] = bt_delete6174f,
        codeStates['setbt_delete'] = setbt_delete6174f,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const asset_doc_table49f40Ref = useRef<any>(null);
  const handleClearSearch = () => {
    asset_doc_table49f40Ref.current?.setSearchParams();
    asset_doc_table49f40Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(asset_doc_table49f40) && Object.keys(asset_doc_table49f40)?.length>0)
      {
        setasset_doc_table49f40({})
      }
    }else 
      prevRefreshRef.current= true
  }, [asset_doc_table49f40Props?.refresh,token])


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
       {<Tableasset_doc_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={asset_doc_table49f40Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupasset_doc_table
