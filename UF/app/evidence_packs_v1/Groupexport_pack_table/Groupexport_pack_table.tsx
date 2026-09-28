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
import Tableexport_pack_table  from './Tableexport_pack_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupexport_pack_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetcodenameconcatcombo_v1Props, setdfd_assetcodenameconcatcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_recentevidencepacktable_v1Props, setdfd_recentevidencepacktable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "export_id",
      "reference",
      "asset_name",
      "as_at_timestamp",
      "sections",
      "requested_by",
      "status",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "overall_tab_group",
      "ai_registry_tab_header",
      "gen_pack_group",
      "ai_registry_text_group_1",
      "export_pack_group",
      "ai_registry_text_group",
      "export_pack_table",
      "aaaaaaaaaaa",
      "bbb"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "overall_tab_group",
      "aaaaaaaaaaa",
      "bbb"
    ],
    "blockedControls": [
      "export_id",
      "reference",
      "asset_name",
      "as_at_timestamp",
      "sections",
      "requested_by",
      "status",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "overall_tab_group",
      "aaaaaaaaaaa",
      "bbb"
    ],
    "blockedControls": [
      "export_id",
      "reference",
      "asset_name",
      "as_at_timestamp",
      "sections",
      "requested_by",
      "status",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "overall_tab_group",
      "aaaaaaaaaaa",
      "bbb"
    ],
    "blockedControls": [
      "export_id",
      "reference",
      "asset_name",
      "as_at_timestamp",
      "sections",
      "requested_by",
      "status",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "overall_tab_group",
      "aaaaaaaaaaa",
      "bbb"
    ],
    "blockedControls": [
      "export_id",
      "reference",
      "asset_name",
      "as_at_timestamp",
      "sections",
      "requested_by",
      "status",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "overall_tab_group",
      "aaaaaaaaaaa",
      "bbb"
    ],
    "blockedControls": [
      "export_id",
      "reference",
      "asset_name",
      "as_at_timestamp",
      "sections",
      "requested_by",
      "status",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "overall_tab_group",
      "aaaaaaaaaaa",
      "bbb"
    ],
    "blockedControls": [
      "export_id",
      "reference",
      "asset_name",
      "as_at_timestamp",
      "sections",
      "requested_by",
      "status",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
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
  const {overall_ai_asset_registry3c08f, setoverall_ai_asset_registry3c08f}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry3c08fProps, setoverall_ai_asset_registry3c08fProps}= useContext(TotalContext) as TotalContextProps;
  const {overall_tab_group97825, setoverall_tab_group97825}= useContext(TotalContext) as TotalContextProps;
  const {overall_tab_group97825Props, setoverall_tab_group97825Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tab_header5e723, setai_registry_tab_header5e723}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tab_header5e723Props, setai_registry_tab_header5e723Props}= useContext(TotalContext) as TotalContextProps;
  const {gen_pack_groupbebe9, setgen_pack_groupbebe9}= useContext(TotalContext) as TotalContextProps;
  const {gen_pack_groupbebe9Props, setgen_pack_groupbebe9Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group_1b5885, setai_registry_text_group_1b5885}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group_1b5885Props, setai_registry_text_group_1b5885Props}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_group738c0, setexport_pack_group738c0}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_group738c0Props, setexport_pack_group738c0Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group1679d, setai_registry_text_group1679d}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group1679dProps, setai_registry_text_group1679dProps}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_table4a1c2, setexport_pack_table4a1c2}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_table4a1c2Props, setexport_pack_table4a1c2Props}= useContext(TotalContext) as TotalContextProps;
  const {export_id6fa43, setexport_id6fa43}= useContext(TotalContext) as TotalContextProps;
  const {referencec1175, setreferencec1175}= useContext(TotalContext) as TotalContextProps;
  const {asset_name78040, setasset_name78040}= useContext(TotalContext) as TotalContextProps;
  const {as_at_timestampdc220, setas_at_timestampdc220}= useContext(TotalContext) as TotalContextProps;
  const {sectionse5c2f, setsectionse5c2f}= useContext(TotalContext) as TotalContextProps;
  const {requested_by3c4aa, setrequested_by3c4aa}= useContext(TotalContext) as TotalContextProps;
  const {status6a7a5, setstatus6a7a5}= useContext(TotalContext) as TotalContextProps;
  const {view_btnfb2dd, setview_btnfb2dd}= useContext(TotalContext) as TotalContextProps;
  const {edit_btna9e96, setedit_btna9e96}= useContext(TotalContext) as TotalContextProps;
  const {delete_btnde0fb, setdelete_btnde0fb}= useContext(TotalContext) as TotalContextProps;
  const {aaaaaaaaaaaea054, setaaaaaaaaaaaea054}= useContext(TotalContext) as TotalContextProps;
  const {aaaaaaaaaaaea054Props, setaaaaaaaaaaaea054Props}= useContext(TotalContext) as TotalContextProps;
  const {bbb6cbd6, setbbb6cbd6}= useContext(TotalContext) as TotalContextProps;
  const {bbb6cbd6Props, setbbb6cbd6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {auditevidence_v1, setauditevidence_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:auditEvidence:AFVK:v1',
    [user],
    'GroupExportPackTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "831114b8513d93c4764d6add5fc4a1c2");
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
    setexport_pack_table4a1c2Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("export_id")){
        setexport_id6fa43((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(export_id6fa43?.isDisabled==null)
      {
        setexport_id6fa43((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("reference")){
        setreferencec1175((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(referencec1175?.isDisabled==null)
      {
        setreferencec1175((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name78040((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name78040?.isDisabled==null)
      {
        setasset_name78040((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("as_at_timestamp")){
        setas_at_timestampdc220((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(as_at_timestampdc220?.isDisabled==null)
      {
        setas_at_timestampdc220((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sections")){
        setsectionse5c2f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(sectionse5c2f?.isDisabled==null)
      {
        setsectionse5c2f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("requested_by")){
        setrequested_by3c4aa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(requested_by3c4aa?.isDisabled==null)
      {
        setrequested_by3c4aa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatus6a7a5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status6a7a5?.isDisabled==null)
      {
        setstatus6a7a5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btnfb2dd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(view_btnfb2dd?.isDisabled==null)
      {
        setview_btnfb2dd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btna9e96((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btna9e96?.isDisabled==null)
      {
        setedit_btna9e96((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btnde0fb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_btnde0fb?.isDisabled==null)
      {
        setdelete_btnde0fb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "831114b8513d93c4764d6add5fc4a1c2");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry3c08f,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry3c08f,
        codeStates['overall_ai_asset_registry3c08f'] = overall_ai_asset_registry3c08fProps,
        codeStates['setoverall_ai_asset_registry3c08f'] = setoverall_ai_asset_registry3c08fProps,
        codeStates['overall_tab_group'] = overall_tab_group97825,
        codeStates['setoverall_tab_group'] = setoverall_tab_group97825,
        codeStates['overall_tab_group97825'] = overall_tab_group97825Props,
        codeStates['setoverall_tab_group97825'] = setoverall_tab_group97825Props,
        codeStates['ai_registry_tab_header'] = ai_registry_tab_header5e723,
        codeStates['setai_registry_tab_header'] = setai_registry_tab_header5e723,
        codeStates['ai_registry_tab_header5e723'] = ai_registry_tab_header5e723Props,
        codeStates['setai_registry_tab_header5e723'] = setai_registry_tab_header5e723Props,
        codeStates['gen_pack_group'] = gen_pack_groupbebe9,
        codeStates['setgen_pack_group'] = setgen_pack_groupbebe9,
        codeStates['gen_pack_groupbebe9'] = gen_pack_groupbebe9Props,
        codeStates['setgen_pack_groupbebe9'] = setgen_pack_groupbebe9Props,
        codeStates['ai_registry_text_group_1'] = ai_registry_text_group_1b5885,
        codeStates['setai_registry_text_group_1'] = setai_registry_text_group_1b5885,
        codeStates['ai_registry_text_group_1b5885'] = ai_registry_text_group_1b5885Props,
        codeStates['setai_registry_text_group_1b5885'] = setai_registry_text_group_1b5885Props,
        codeStates['export_pack_group'] = export_pack_group738c0,
        codeStates['setexport_pack_group'] = setexport_pack_group738c0,
        codeStates['export_pack_group738c0'] = export_pack_group738c0Props,
        codeStates['setexport_pack_group738c0'] = setexport_pack_group738c0Props,
        codeStates['ai_registry_text_group'] = ai_registry_text_group1679d,
        codeStates['setai_registry_text_group'] = setai_registry_text_group1679d,
        codeStates['ai_registry_text_group1679d'] = ai_registry_text_group1679dProps,
        codeStates['setai_registry_text_group1679d'] = setai_registry_text_group1679dProps,
        codeStates['export_pack_table'] = export_pack_table4a1c2,
        codeStates['setexport_pack_table'] = setexport_pack_table4a1c2,
        codeStates['export_pack_table4a1c2'] = export_pack_table4a1c2Props,
        codeStates['setexport_pack_table4a1c2'] = setexport_pack_table4a1c2Props,
        codeStates['export_id'] = export_id6fa43,
        codeStates['setexport_id'] = setexport_id6fa43,
        codeStates['reference'] = referencec1175,
        codeStates['setreference'] = setreferencec1175,
        codeStates['asset_name'] = asset_name78040,
        codeStates['setasset_name'] = setasset_name78040,
        codeStates['as_at_timestamp'] = as_at_timestampdc220,
        codeStates['setas_at_timestamp'] = setas_at_timestampdc220,
        codeStates['sections'] = sectionse5c2f,
        codeStates['setsections'] = setsectionse5c2f,
        codeStates['requested_by'] = requested_by3c4aa,
        codeStates['setrequested_by'] = setrequested_by3c4aa,
        codeStates['status'] = status6a7a5,
        codeStates['setstatus'] = setstatus6a7a5,
        codeStates['view_btn'] = view_btnfb2dd,
        codeStates['setview_btn'] = setview_btnfb2dd,
        codeStates['edit_btn'] = edit_btna9e96,
        codeStates['setedit_btn'] = setedit_btna9e96,
        codeStates['delete_btn'] = delete_btnde0fb,
        codeStates['setdelete_btn'] = setdelete_btnde0fb,
        codeStates['aaaaaaaaaaa'] = aaaaaaaaaaaea054,
        codeStates['setaaaaaaaaaaa'] = setaaaaaaaaaaaea054,
        codeStates['aaaaaaaaaaaea054'] = aaaaaaaaaaaea054Props,
        codeStates['setaaaaaaaaaaaea054'] = setaaaaaaaaaaaea054Props,
        codeStates['bbb'] = bbb6cbd6,
        codeStates['setbbb'] = setbbb6cbd6,
        codeStates['bbb6cbd6'] = bbb6cbd6Props,
        codeStates['setbbb6cbd6'] = setbbb6cbd6Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const export_pack_table4a1c2Ref = useRef<any>(null);
  const handleClearSearch = () => {
    export_pack_table4a1c2Ref.current?.setSearchParams();
    export_pack_table4a1c2Ref.current?.handleSearch({});
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
        !Array.isArray(export_pack_table4a1c2) &&
        Object.keys(export_pack_table4a1c2)?.length > 0
      ) {
        setexport_pack_table4a1c2({})
      }
    } else prevRefreshRef.current = true
  }, [export_pack_table4a1c2Props?.refresh])


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
        gridRow: '10 / 87',
      
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
          setauditevidence_v1((pre:any)=>({...pre,_selectedGroup_:"export_pack_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableexport_pack_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={export_pack_table4a1c2Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupexport_pack_table
