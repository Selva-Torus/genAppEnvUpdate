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
import Textdel_heading_text  from "./Textdel_heading_text";
import Dividerdivider_1  from "./Dividerdivider_1";
import Textdel_template_code  from "./Textdel_template_code";
import Texttemplate_code  from "./Texttemplate_code";
import Textdel_template_name  from "./Textdel_template_name";
import Texttemplate_name  from "./Texttemplate_name";
import Textdel_applies_tier_code  from "./Textdel_applies_tier_code";
import Textapplies_tier_code  from "./Textapplies_tier_code";
import Textdel_applies_use_case  from "./Textdel_applies_use_case";
import Textapplies_use_case  from "./Textapplies_use_case";
import Textapplies_asset_type  from "./Textapplies_asset_type";
import Textdel_applies_asset_type  from "./Textdel_applies_asset_type";
import Textvalidity_months  from "./Textvalidity_months";
import Textdel_validity_months  from "./Textdel_validity_months";
import Texttemplate_version  from "./Texttemplate_version";
import Textdel_template_version  from "./Textdel_template_version";
import Textis_active  from "./Textis_active";
import Textdel_is_active  from "./Textdel_is_active";
import Texttext  from "./Texttext";
import Dividerdivider_2  from "./Dividerdivider_2";
import Buttoncancel_btn  from "./Buttoncancel_btn";
import Buttonok_btn  from "./Buttonok_btn";
import Textcert_template_id  from "./Textcert_template_id";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_certificatetemplate_v1Props, setdfd_certificatetemplate_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "del_heading_text",
      "divider_1",
      "del_template_code",
      "template_code",
      "del_template_name",
      "template_name",
      "del_applies_tier_code",
      "applies_tier_code",
      "del_applies_use_case",
      "applies_use_case",
      "applies_asset_type",
      "del_applies_asset_type",
      "validity_months",
      "del_validity_months",
      "template_version",
      "del_template_version",
      "is_active",
      "del_is_active",
      "text",
      "divider_2",
      "cancel_btn",
      "ok_btn",
      "cert_template_id"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "del_heading_text",
      "divider_1",
      "del_template_code",
      "template_code",
      "del_template_name",
      "template_name",
      "del_applies_tier_code",
      "applies_tier_code",
      "del_applies_use_case",
      "applies_use_case",
      "applies_asset_type",
      "del_applies_asset_type",
      "validity_months",
      "del_validity_months",
      "template_version",
      "del_template_version",
      "is_active",
      "del_is_active",
      "text",
      "divider_2",
      "cancel_btn",
      "ok_btn",
      "cert_template_id"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "del_heading_text",
      "divider_1",
      "del_template_code",
      "template_code",
      "del_template_name",
      "template_name",
      "del_applies_tier_code",
      "applies_tier_code",
      "del_applies_use_case",
      "applies_use_case",
      "applies_asset_type",
      "del_applies_asset_type",
      "validity_months",
      "del_validity_months",
      "template_version",
      "del_template_version",
      "is_active",
      "del_is_active",
      "text",
      "divider_2",
      "cancel_btn",
      "ok_btn",
      "cert_template_id"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "del_heading_text",
      "divider_1",
      "del_template_code",
      "template_code",
      "del_template_name",
      "template_name",
      "del_applies_tier_code",
      "applies_tier_code",
      "del_applies_use_case",
      "applies_use_case",
      "applies_asset_type",
      "del_applies_asset_type",
      "validity_months",
      "del_validity_months",
      "template_version",
      "del_template_version",
      "is_active",
      "del_is_active",
      "text",
      "divider_2",
      "cancel_btn",
      "ok_btn",
      "cert_template_id"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "del_heading_text",
      "divider_1",
      "del_template_code",
      "template_code",
      "del_template_name",
      "template_name",
      "del_applies_tier_code",
      "applies_tier_code",
      "del_applies_use_case",
      "applies_use_case",
      "applies_asset_type",
      "del_applies_asset_type",
      "validity_months",
      "del_validity_months",
      "template_version",
      "del_template_version",
      "is_active",
      "del_is_active",
      "text",
      "divider_2",
      "cancel_btn",
      "ok_btn",
      "cert_template_id"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "del_heading_text",
      "divider_1",
      "del_template_code",
      "template_code",
      "del_template_name",
      "template_name",
      "del_applies_tier_code",
      "applies_tier_code",
      "del_applies_use_case",
      "applies_use_case",
      "applies_asset_type",
      "del_applies_asset_type",
      "validity_months",
      "del_validity_months",
      "template_version",
      "del_template_version",
      "is_active",
      "del_is_active",
      "text",
      "divider_2",
      "cancel_btn",
      "ok_btn",
      "cert_template_id"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "del_heading_text",
      "divider_1",
      "del_template_code",
      "template_code",
      "del_template_name",
      "template_name",
      "del_applies_tier_code",
      "applies_tier_code",
      "del_applies_use_case",
      "applies_use_case",
      "applies_asset_type",
      "del_applies_asset_type",
      "validity_months",
      "del_validity_months",
      "template_version",
      "del_template_version",
      "is_active",
      "del_is_active",
      "text",
      "divider_2",
      "cancel_btn",
      "ok_btn",
      "cert_template_id"
    ],
    "allowedGroups": [
      "canvas",
      "group"
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
  const {group84d30, setgroup84d30}= useContext(TotalContext) as TotalContextProps;
  const {group84d30Props, setgroup84d30Props}= useContext(TotalContext) as TotalContextProps;
  const {del_heading_text10f67, setdel_heading_text10f67}= useContext(TotalContext) as TotalContextProps;
  const {divider_16c710, setdivider_16c710}= useContext(TotalContext) as TotalContextProps;
  const {del_template_code7b871, setdel_template_code7b871}= useContext(TotalContext) as TotalContextProps;
  const {template_codeb7abe, settemplate_codeb7abe}= useContext(TotalContext) as TotalContextProps;
  const {del_template_name73ab9, setdel_template_name73ab9}= useContext(TotalContext) as TotalContextProps;
  const {template_name5bed7, settemplate_name5bed7}= useContext(TotalContext) as TotalContextProps;
  const {del_applies_tier_code247d5, setdel_applies_tier_code247d5}= useContext(TotalContext) as TotalContextProps;
  const {applies_tier_coded4d29, setapplies_tier_coded4d29}= useContext(TotalContext) as TotalContextProps;
  const {del_applies_use_casef094c, setdel_applies_use_casef094c}= useContext(TotalContext) as TotalContextProps;
  const {applies_use_casef037b, setapplies_use_casef037b}= useContext(TotalContext) as TotalContextProps;
  const {applies_asset_typea5e3d, setapplies_asset_typea5e3d}= useContext(TotalContext) as TotalContextProps;
  const {del_applies_asset_typeabda2, setdel_applies_asset_typeabda2}= useContext(TotalContext) as TotalContextProps;
  const {validity_monthsc0c5a, setvalidity_monthsc0c5a}= useContext(TotalContext) as TotalContextProps;
  const {del_validity_monthsf911c, setdel_validity_monthsf911c}= useContext(TotalContext) as TotalContextProps;
  const {template_version21972, settemplate_version21972}= useContext(TotalContext) as TotalContextProps;
  const {del_template_version5c803, setdel_template_version5c803}= useContext(TotalContext) as TotalContextProps;
  const {is_active8dede, setis_active8dede}= useContext(TotalContext) as TotalContextProps;
  const {del_is_active7a7ba, setdel_is_active7a7ba}= useContext(TotalContext) as TotalContextProps;
  const {text58d63, settext58d63}= useContext(TotalContext) as TotalContextProps;
  const {divider_2d3d61, setdivider_2d3d61}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btnc7ae2, setcancel_btnc7ae2}= useContext(TotalContext) as TotalContextProps;
  const {ok_btnce26e, setok_btnce26e}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_idd4429, setcert_template_idd4429}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deletecertificatetemplate_v1, setdeletecertificatetemplate_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deleteCertificateTemplate:AFVK:v1',
    [user],
    'GroupGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "96551d565eaf40d5adc4bbd8ea684d30");
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
    setgroup84d30Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("del_heading_text")){
        setdel_heading_text10f67((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_heading_text10f67?.isDisabled==null)
      {
        setdel_heading_text10f67((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider_1")){
        setdivider_16c710((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider_16c710?.isDisabled==null)
      {
        setdivider_16c710((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_template_code")){
        setdel_template_code7b871((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_template_code7b871?.isDisabled==null)
      {
        setdel_template_code7b871((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("template_code")){
        settemplate_codeb7abe((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_codeb7abe?.isDisabled==null)
      {
        settemplate_codeb7abe((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_template_name")){
        setdel_template_name73ab9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_template_name73ab9?.isDisabled==null)
      {
        setdel_template_name73ab9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("template_name")){
        settemplate_name5bed7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_name5bed7?.isDisabled==null)
      {
        settemplate_name5bed7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_applies_tier_code")){
        setdel_applies_tier_code247d5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_applies_tier_code247d5?.isDisabled==null)
      {
        setdel_applies_tier_code247d5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("applies_tier_code")){
        setapplies_tier_coded4d29((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(applies_tier_coded4d29?.isDisabled==null)
      {
        setapplies_tier_coded4d29((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_applies_use_case")){
        setdel_applies_use_casef094c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_applies_use_casef094c?.isDisabled==null)
      {
        setdel_applies_use_casef094c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("applies_use_case")){
        setapplies_use_casef037b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(applies_use_casef037b?.isDisabled==null)
      {
        setapplies_use_casef037b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("applies_asset_type")){
        setapplies_asset_typea5e3d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(applies_asset_typea5e3d?.isDisabled==null)
      {
        setapplies_asset_typea5e3d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_applies_asset_type")){
        setdel_applies_asset_typeabda2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_applies_asset_typeabda2?.isDisabled==null)
      {
        setdel_applies_asset_typeabda2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("validity_months")){
        setvalidity_monthsc0c5a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(validity_monthsc0c5a?.isDisabled==null)
      {
        setvalidity_monthsc0c5a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_validity_months")){
        setdel_validity_monthsf911c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_validity_monthsf911c?.isDisabled==null)
      {
        setdel_validity_monthsf911c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("template_version")){
        settemplate_version21972((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_version21972?.isDisabled==null)
      {
        settemplate_version21972((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_template_version")){
        setdel_template_version5c803((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_template_version5c803?.isDisabled==null)
      {
        setdel_template_version5c803((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active8dede((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active8dede?.isDisabled==null)
      {
        setis_active8dede((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_is_active")){
        setdel_is_active7a7ba((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_is_active7a7ba?.isDisabled==null)
      {
        setdel_is_active7a7ba((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settext58d63((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text58d63?.isDisabled==null)
      {
        settext58d63((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider_2")){
        setdivider_2d3d61((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider_2d3d61?.isDisabled==null)
      {
        setdivider_2d3d61((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_btn")){
        setcancel_btnc7ae2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cancel_btnc7ae2?.isDisabled==null)
      {
        setcancel_btnc7ae2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_btn")){
        setok_btnce26e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ok_btnce26e?.isDisabled==null)
      {
        setok_btnce26e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_template_id")){
        setcert_template_idd4429((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_template_idd4429?.isDisabled==null)
      {
        setcert_template_idd4429((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group84d30,
        codeStates['setgroup'] = setgroup84d30,
        codeStates['group84d30'] = group84d30Props,
        codeStates['setgroup84d30'] = setgroup84d30Props,
        codeStates['del_heading_text'] = del_heading_text10f67,
        codeStates['setdel_heading_text'] = setdel_heading_text10f67,
        codeStates['divider_1'] = divider_16c710,
        codeStates['setdivider_1'] = setdivider_16c710,
        codeStates['del_template_code'] = del_template_code7b871,
        codeStates['setdel_template_code'] = setdel_template_code7b871,
        codeStates['template_code'] = template_codeb7abe,
        codeStates['settemplate_code'] = settemplate_codeb7abe,
        codeStates['del_template_name'] = del_template_name73ab9,
        codeStates['setdel_template_name'] = setdel_template_name73ab9,
        codeStates['template_name'] = template_name5bed7,
        codeStates['settemplate_name'] = settemplate_name5bed7,
        codeStates['del_applies_tier_code'] = del_applies_tier_code247d5,
        codeStates['setdel_applies_tier_code'] = setdel_applies_tier_code247d5,
        codeStates['applies_tier_code'] = applies_tier_coded4d29,
        codeStates['setapplies_tier_code'] = setapplies_tier_coded4d29,
        codeStates['del_applies_use_case'] = del_applies_use_casef094c,
        codeStates['setdel_applies_use_case'] = setdel_applies_use_casef094c,
        codeStates['applies_use_case'] = applies_use_casef037b,
        codeStates['setapplies_use_case'] = setapplies_use_casef037b,
        codeStates['applies_asset_type'] = applies_asset_typea5e3d,
        codeStates['setapplies_asset_type'] = setapplies_asset_typea5e3d,
        codeStates['del_applies_asset_type'] = del_applies_asset_typeabda2,
        codeStates['setdel_applies_asset_type'] = setdel_applies_asset_typeabda2,
        codeStates['validity_months'] = validity_monthsc0c5a,
        codeStates['setvalidity_months'] = setvalidity_monthsc0c5a,
        codeStates['del_validity_months'] = del_validity_monthsf911c,
        codeStates['setdel_validity_months'] = setdel_validity_monthsf911c,
        codeStates['template_version'] = template_version21972,
        codeStates['settemplate_version'] = settemplate_version21972,
        codeStates['del_template_version'] = del_template_version5c803,
        codeStates['setdel_template_version'] = setdel_template_version5c803,
        codeStates['is_active'] = is_active8dede,
        codeStates['setis_active'] = setis_active8dede,
        codeStates['del_is_active'] = del_is_active7a7ba,
        codeStates['setdel_is_active'] = setdel_is_active7a7ba,
        codeStates['text'] = text58d63,
        codeStates['settext'] = settext58d63,
        codeStates['divider_2'] = divider_2d3d61,
        codeStates['setdivider_2'] = setdivider_2d3d61,
        codeStates['cancel_btn'] = cancel_btnc7ae2,
        codeStates['setcancel_btn'] = setcancel_btnc7ae2,
        codeStates['ok_btn'] = ok_btnce26e,
        codeStates['setok_btn'] = setok_btnce26e,
        codeStates['cert_template_id'] = cert_template_idd4429,
        codeStates['setcert_template_id'] = setcert_template_idd4429,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "96551d565eaf40d5adc4bbd8ea684d30");
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
        codeStates['group'] = group84d30,
        codeStates['setgroup'] = setgroup84d30,
        codeStates['group84d30'] = group84d30Props,
        codeStates['setgroup84d30'] = setgroup84d30Props,
        codeStates['del_heading_text'] = del_heading_text10f67,
        codeStates['setdel_heading_text'] = setdel_heading_text10f67,
        codeStates['divider_1'] = divider_16c710,
        codeStates['setdivider_1'] = setdivider_16c710,
        codeStates['del_template_code'] = del_template_code7b871,
        codeStates['setdel_template_code'] = setdel_template_code7b871,
        codeStates['template_code'] = template_codeb7abe,
        codeStates['settemplate_code'] = settemplate_codeb7abe,
        codeStates['del_template_name'] = del_template_name73ab9,
        codeStates['setdel_template_name'] = setdel_template_name73ab9,
        codeStates['template_name'] = template_name5bed7,
        codeStates['settemplate_name'] = settemplate_name5bed7,
        codeStates['del_applies_tier_code'] = del_applies_tier_code247d5,
        codeStates['setdel_applies_tier_code'] = setdel_applies_tier_code247d5,
        codeStates['applies_tier_code'] = applies_tier_coded4d29,
        codeStates['setapplies_tier_code'] = setapplies_tier_coded4d29,
        codeStates['del_applies_use_case'] = del_applies_use_casef094c,
        codeStates['setdel_applies_use_case'] = setdel_applies_use_casef094c,
        codeStates['applies_use_case'] = applies_use_casef037b,
        codeStates['setapplies_use_case'] = setapplies_use_casef037b,
        codeStates['applies_asset_type'] = applies_asset_typea5e3d,
        codeStates['setapplies_asset_type'] = setapplies_asset_typea5e3d,
        codeStates['del_applies_asset_type'] = del_applies_asset_typeabda2,
        codeStates['setdel_applies_asset_type'] = setdel_applies_asset_typeabda2,
        codeStates['validity_months'] = validity_monthsc0c5a,
        codeStates['setvalidity_months'] = setvalidity_monthsc0c5a,
        codeStates['del_validity_months'] = del_validity_monthsf911c,
        codeStates['setdel_validity_months'] = setdel_validity_monthsf911c,
        codeStates['template_version'] = template_version21972,
        codeStates['settemplate_version'] = settemplate_version21972,
        codeStates['del_template_version'] = del_template_version5c803,
        codeStates['setdel_template_version'] = setdel_template_version5c803,
        codeStates['is_active'] = is_active8dede,
        codeStates['setis_active'] = setis_active8dede,
        codeStates['del_is_active'] = del_is_active7a7ba,
        codeStates['setdel_is_active'] = setdel_is_active7a7ba,
        codeStates['text'] = text58d63,
        codeStates['settext'] = settext58d63,
        codeStates['divider_2'] = divider_2d3d61,
        codeStates['setdivider_2'] = setdivider_2d3d61,
        codeStates['cancel_btn'] = cancel_btnc7ae2,
        codeStates['setcancel_btn'] = setcancel_btnc7ae2,
        codeStates['ok_btn'] = ok_btnce26e,
        codeStates['setok_btn'] = setok_btnce26e,
        codeStates['cert_template_id'] = cert_template_idd4429,
        codeStates['setcert_template_id'] = setcert_template_idd4429,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group84d30Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group84d30Ref.current?.setSearchParams();
    group84d30Ref.current?.handleSearch({});
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
        !Array.isArray(group84d30) &&
        Object.keys(group84d30)?.length > 0
      ) {
        setgroup84d30({})
      }
    } else prevRefreshRef.current = true
  }, [group84d30Props?.refresh])


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
        gridRow: '2 / 83',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-3 !pr-3 !pl-3 !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setdeletecertificatetemplate_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
          {allowedControls.includes("del_heading_text") ?<Textdel_heading_text   /* 10f67 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider_1") ?<Dividerdivider_1   /* 6c710 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_template_code") ?<Textdel_template_code   /* 7b871 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("template_code") ?<Texttemplate_code   /* b7abe */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_template_name") ?<Textdel_template_name   /* 73ab9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("template_name") ?<Texttemplate_name   /* 5bed7 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_applies_tier_code") ?<Textdel_applies_tier_code   /* 247d5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("applies_tier_code") ?<Textapplies_tier_code   /* d4d29 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_applies_use_case") ?<Textdel_applies_use_case   /* f094c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("applies_use_case") ?<Textapplies_use_case   /* f037b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("applies_asset_type") ?<Textapplies_asset_type   /* a5e3d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_applies_asset_type") ?<Textdel_applies_asset_type   /* abda2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("validity_months") ?<Textvalidity_months   /* c0c5a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_validity_months") ?<Textdel_validity_months   /* f911c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("template_version") ?<Texttemplate_version   /* 21972 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_template_version") ?<Textdel_template_version   /* 5c803 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("is_active") ?<Textis_active   /* 8dede */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_is_active") ?<Textdel_is_active   /* 7a7ba */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* 58d63 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider_2") ?<Dividerdivider_2   /* d3d61 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["cancel_btn"]:true) && 
          allowedControls.includes("cancel_btn")  ?            <Buttoncancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_btn" in ButtonGoRuleData)?ButtonGoRuleData["ok_btn"]:true) && 
          allowedControls.includes("ok_btn")  ?            <Buttonok_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
          {allowedControls.includes("cert_template_id") ?<Textcert_template_id   /* d4429 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup
