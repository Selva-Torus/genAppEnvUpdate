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
import Tableevidence_table  from './Tableevidence_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupevidence_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_view"
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
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_view"
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
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_view"
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
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_view"
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
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_view"
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
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_view"
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
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_view"
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
  const {evidence_table_groupea2c7, setevidence_table_groupea2c7}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_groupea2c7Props, setevidence_table_groupea2c7Props}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table6beb4, setevidence_table6beb4}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table6beb4Props, setevidence_table6beb4Props}= useContext(TotalContext) as TotalContextProps;
  const {attachment_ida26af, setattachment_ida26af}= useContext(TotalContext) as TotalContextProps;
  const {doc_group0ad3b, setdoc_group0ad3b}= useContext(TotalContext) as TotalContextProps;
  const {doc_namec5db2, setdoc_namec5db2}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_datecf4da, settrs_created_datecf4da}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by3041e, settrs_created_by3041e}= useContext(TotalContext) as TotalContextProps;
  const {bt_view82173, setbt_view82173}= useContext(TotalContext) as TotalContextProps;
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
    'GroupEvidenceTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1afedf73edcb9968195414a346f6beb4");
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
    setevidence_table6beb4Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("attachment_id")){
        setattachment_ida26af((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(attachment_ida26af?.isDisabled==null)
      {
        setattachment_ida26af((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group")){
        setdoc_group0ad3b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(doc_group0ad3b?.isDisabled==null)
      {
        setdoc_group0ad3b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name")){
        setdoc_namec5db2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(doc_namec5db2?.isDisabled==null)
      {
        setdoc_namec5db2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_date")){
        settrs_created_datecf4da((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trs_created_datecf4da?.isDisabled==null)
      {
        settrs_created_datecf4da((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by")){
        settrs_created_by3041e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trs_created_by3041e?.isDisabled==null)
      {
        settrs_created_by3041e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_view")){
        setbt_view82173((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(bt_view82173?.isDisabled==null)
      {
        setbt_view82173((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1afedf73edcb9968195414a346f6beb4");
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
        codeStates['evidence_table_group'] = evidence_table_groupea2c7,
        codeStates['setevidence_table_group'] = setevidence_table_groupea2c7,
        codeStates['evidence_table_groupea2c7'] = evidence_table_groupea2c7Props,
        codeStates['setevidence_table_groupea2c7'] = setevidence_table_groupea2c7Props,
        codeStates['evidence_table'] = evidence_table6beb4,
        codeStates['setevidence_table'] = setevidence_table6beb4,
        codeStates['evidence_table6beb4'] = evidence_table6beb4Props,
        codeStates['setevidence_table6beb4'] = setevidence_table6beb4Props,
        codeStates['attachment_id'] = attachment_ida26af,
        codeStates['setattachment_id'] = setattachment_ida26af,
        codeStates['doc_group'] = doc_group0ad3b,
        codeStates['setdoc_group'] = setdoc_group0ad3b,
        codeStates['doc_name'] = doc_namec5db2,
        codeStates['setdoc_name'] = setdoc_namec5db2,
        codeStates['trs_created_date'] = trs_created_datecf4da,
        codeStates['settrs_created_date'] = settrs_created_datecf4da,
        codeStates['trs_created_by'] = trs_created_by3041e,
        codeStates['settrs_created_by'] = settrs_created_by3041e,
        codeStates['bt_view'] = bt_view82173,
        codeStates['setbt_view'] = setbt_view82173,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const evidence_table6beb4Ref = useRef<any>(null);
  const handleClearSearch = () => {
    evidence_table6beb4Ref.current?.setSearchParams();
    evidence_table6beb4Ref.current?.handleSearch({});
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
        !Array.isArray(evidence_table6beb4) &&
        Object.keys(evidence_table6beb4)?.length > 0
      ) {
        setevidence_table6beb4({})
        setevidence_table6beb4Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [evidence_table6beb4Props?.refresh])


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
        gridRow: '1 / 108',
      
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
          setviewattachmentstage_v1((pre:any)=>({...pre,_selectedGroup_:"evidence_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableevidence_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={evidence_table6beb4Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupevidence_table
