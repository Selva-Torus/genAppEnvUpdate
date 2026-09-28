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
import Groupai_registry_text_group_1  from "../Groupai_registry_text_group_1/Groupai_registry_text_group_1";
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
import Buttongenerate_btn  from "./Buttongenerate_btn";
import ComboBoxasset_display_name  from "./ComboBoxasset_display_name";
import DatePickeras_at_timestamp  from "./DatePickeras_at_timestamp";
import Dropdownsections_included  from "./Dropdownsections_included";
import Dropdownexport_format_code  from "./Dropdownexport_format_code";
import TextInputpurpose_note  from "./TextInputpurpose_note";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgen_pack_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "generate_btn",
      "asset_display_name",
      "as_at_timestamp",
      "sections_included",
      "export_format_code",
      "purpose_note"
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
      "generate_btn",
      "asset_display_name",
      "as_at_timestamp",
      "sections_included",
      "export_format_code",
      "purpose_note"
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
      "generate_btn",
      "asset_display_name",
      "as_at_timestamp",
      "sections_included",
      "export_format_code",
      "purpose_note"
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
      "generate_btn",
      "asset_display_name",
      "as_at_timestamp",
      "sections_included",
      "export_format_code",
      "purpose_note"
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
      "generate_btn",
      "asset_display_name",
      "as_at_timestamp",
      "sections_included",
      "export_format_code",
      "purpose_note"
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
      "generate_btn",
      "asset_display_name",
      "as_at_timestamp",
      "sections_included",
      "export_format_code",
      "purpose_note"
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
      "generate_btn",
      "asset_display_name",
      "as_at_timestamp",
      "sections_included",
      "export_format_code",
      "purpose_note"
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
  const {generate_btn339c9, setgenerate_btn339c9}= useContext(TotalContext) as TotalContextProps;
  const {asset_display_name70bbb, setasset_display_name70bbb}= useContext(TotalContext) as TotalContextProps;
  const {as_at_timestamp8327b, setas_at_timestamp8327b}= useContext(TotalContext) as TotalContextProps;
  const {sections_included9f322, setsections_included9f322}= useContext(TotalContext) as TotalContextProps;
  const {export_format_code07560, setexport_format_code07560}= useContext(TotalContext) as TotalContextProps;
  const {purpose_note26a17, setpurpose_note26a17}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_group738c0, setexport_pack_group738c0}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_group738c0Props, setexport_pack_group738c0Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group1679d, setai_registry_text_group1679d}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group1679dProps, setai_registry_text_group1679dProps}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_table4a1c2, setexport_pack_table4a1c2}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_table4a1c2Props, setexport_pack_table4a1c2Props}= useContext(TotalContext) as TotalContextProps;
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
    'GroupGenPackGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "cbe1b3cc10294412827114df80dbebe9");
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
    setgen_pack_groupbebe9Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ai_registry_text_group_1")){
        setai_registry_text_group_1b5885((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_registry_text_group_1b5885?.isDisabled==null)
      {
        setai_registry_text_group_1b5885((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("generate_btn")){
        setgenerate_btn339c9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(generate_btn339c9?.isDisabled==null)
      {
        setgenerate_btn339c9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_display_name")){
        setasset_display_name70bbb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_display_name70bbb?.isDisabled==null)
      {
        setasset_display_name70bbb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("as_at_timestamp")){
        setas_at_timestamp8327b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(as_at_timestamp8327b?.isDisabled==null)
      {
        setas_at_timestamp8327b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sections_included")){
        setsections_included9f322((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(sections_included9f322?.isDisabled==null)
      {
        setsections_included9f322((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("export_format_code")){
        setexport_format_code07560((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(export_format_code07560?.isDisabled==null)
      {
        setexport_format_code07560((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("purpose_note")){
        setpurpose_note26a17((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(purpose_note26a17?.isDisabled==null)
      {
        setpurpose_note26a17((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
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
        codeStates['generate_btn'] = generate_btn339c9,
        codeStates['setgenerate_btn'] = setgenerate_btn339c9,
        codeStates['asset_display_name'] = asset_display_name70bbb,
        codeStates['setasset_display_name'] = setasset_display_name70bbb,
        codeStates['as_at_timestamp'] = as_at_timestamp8327b,
        codeStates['setas_at_timestamp'] = setas_at_timestamp8327b,
        codeStates['sections_included'] = sections_included9f322,
        codeStates['setsections_included'] = setsections_included9f322,
        codeStates['export_format_code'] = export_format_code07560,
        codeStates['setexport_format_code'] = setexport_format_code07560,
        codeStates['purpose_note'] = purpose_note26a17,
        codeStates['setpurpose_note'] = setpurpose_note26a17,
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
        codeStates['aaaaaaaaaaa'] = aaaaaaaaaaaea054,
        codeStates['setaaaaaaaaaaa'] = setaaaaaaaaaaaea054,
        codeStates['aaaaaaaaaaaea054'] = aaaaaaaaaaaea054Props,
        codeStates['setaaaaaaaaaaaea054'] = setaaaaaaaaaaaea054Props,
        codeStates['bbb'] = bbb6cbd6,
        codeStates['setbbb'] = setbbb6cbd6,
        codeStates['bbb6cbd6'] = bbb6cbd6Props,
        codeStates['setbbb6cbd6'] = setbbb6cbd6Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "cbe1b3cc10294412827114df80dbebe9");
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
        codeStates['generate_btn'] = generate_btn339c9,
        codeStates['setgenerate_btn'] = setgenerate_btn339c9,
        codeStates['asset_display_name'] = asset_display_name70bbb,
        codeStates['setasset_display_name'] = setasset_display_name70bbb,
        codeStates['as_at_timestamp'] = as_at_timestamp8327b,
        codeStates['setas_at_timestamp'] = setas_at_timestamp8327b,
        codeStates['sections_included'] = sections_included9f322,
        codeStates['setsections_included'] = setsections_included9f322,
        codeStates['export_format_code'] = export_format_code07560,
        codeStates['setexport_format_code'] = setexport_format_code07560,
        codeStates['purpose_note'] = purpose_note26a17,
        codeStates['setpurpose_note'] = setpurpose_note26a17,
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


  const gen_pack_groupbebe9Ref = useRef<any>(null);
  const handleClearSearch = () => {
    gen_pack_groupbebe9Ref.current?.setSearchParams();
    gen_pack_groupbebe9Ref.current?.handleSearch({});
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
        !Array.isArray(gen_pack_groupbebe9) &&
        Object.keys(gen_pack_groupbebe9)?.length > 0
      ) {
        setgen_pack_groupbebe9({})
      }
    } else prevRefreshRef.current = true
  }, [gen_pack_groupbebe9Props?.refresh])


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
        gridRow: '1 / 32',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '12px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setauditevidence_v1((pre:any)=>({...pre,_selectedGroup_:"gen_pack_group"}))
        }}
    >
        {allowedComponent.includes("ai_registry_text_group_1")  &&<Groupai_registry_text_group_1  
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
        {        ((ruleData?.length>0 && "generate_btn" in ButtonGoRuleData)?ButtonGoRuleData["generate_btn"]:true) && 
          allowedControls.includes("generate_btn")  ?            <Buttongenerate_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {allowedControls.includes("asset_display_name") ?<ComboBoxasset_display_name /* 70bbb */ lockedData={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("as_at_timestamp") ?<DatePickeras_at_timestamp   /* 8327b */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("sections_included") ?<Dropdownsections_included   /* 9f322 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("export_format_code") ?<Dropdownexport_format_code   /* 07560 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("purpose_note") ?<TextInputpurpose_note   /* 26a17 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgen_pack_group
