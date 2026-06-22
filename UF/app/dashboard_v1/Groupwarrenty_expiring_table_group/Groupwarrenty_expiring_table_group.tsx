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
import Groupwarrenty_expiring_table  from "../Groupwarrenty_expiring_table/Groupwarrenty_expiring_table";
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
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupwarrenty_expiring_table_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetdashboard_v1Props, setdfd_assetdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assets_v1Props, setdfd_assets_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetmaintenance_v1Props, setdfd_assetmaintenance_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetsoftwarelicenses_v1Props, setdfd_assetsoftwarelicenses_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetdisposal_v1Props, setdfd_assetdisposal_v1Props} = useContext(TotalContext) as TotalContextProps;
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
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "asset_dashboard_group",
      "total_asset_group",
      "maintenance_due_group",
      "warranty_expiring_group",
      "software_licenses_group",
      "pending_disposal_group",
      "table_group",
      "subscreen",
      "ct006_af_uf_ufws_ecp_ams_asset_v1",
      "asset_table_group",
      "asset_table",
      "ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1",
      "asset_maintenance_table_group",
      "asset_maintenance_table",
      "ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1",
      "asset_software_licenses_table_group",
      "asset_software_licenses_table",
      "ct006_af_uf_ufws_ecp_ams_assetdisposal_v1",
      "asset_disposal_table_group",
      "asset_disposal_table",
      "ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1",
      "warrenty_expiring_table_group",
      "warrenty_expiring_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "asset_dashboard_group",
      "total_asset_group",
      "maintenance_due_group",
      "warranty_expiring_group",
      "software_licenses_group",
      "pending_disposal_group",
      "table_group",
      "subscreen",
      "ct006_af_uf_ufws_ecp_ams_asset_v1",
      "asset_table_group",
      "asset_table",
      "ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1",
      "asset_maintenance_table_group",
      "asset_maintenance_table",
      "ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1",
      "asset_software_licenses_table_group",
      "asset_software_licenses_table",
      "ct006_af_uf_ufws_ecp_ams_assetdisposal_v1",
      "asset_disposal_table_group",
      "asset_disposal_table",
      "ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1",
      "warrenty_expiring_table_group",
      "warrenty_expiring_table"
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
  const {asset_dashboard_group4d6cb, setasset_dashboard_group4d6cb}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group4d6cbProps, setasset_dashboard_group4d6cbProps}= useContext(TotalContext) as TotalContextProps;
  const {total_asset_group69aa9, settotal_asset_group69aa9}= useContext(TotalContext) as TotalContextProps;
  const {total_asset_group69aa9Props, settotal_asset_group69aa9Props}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_due_group704ca, setmaintenance_due_group704ca}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_due_group704caProps, setmaintenance_due_group704caProps}= useContext(TotalContext) as TotalContextProps;
  const {warranty_expiring_groupb5bd4, setwarranty_expiring_groupb5bd4}= useContext(TotalContext) as TotalContextProps;
  const {warranty_expiring_groupb5bd4Props, setwarranty_expiring_groupb5bd4Props}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_group4beb5, setsoftware_licenses_group4beb5}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_group4beb5Props, setsoftware_licenses_group4beb5Props}= useContext(TotalContext) as TotalContextProps;
  const {pending_disposal_group2580d, setpending_disposal_group2580d}= useContext(TotalContext) as TotalContextProps;
  const {pending_disposal_group2580dProps, setpending_disposal_group2580dProps}= useContext(TotalContext) as TotalContextProps;
  const {table_group94010, settable_group94010}= useContext(TotalContext) as TotalContextProps;
  const {table_group94010Props, settable_group94010Props}= useContext(TotalContext) as TotalContextProps;
  const {subscreen99589, setsubscreen99589}= useContext(TotalContext) as TotalContextProps;
  const {subscreen99589Props, setsubscreen99589Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_asset_v104dc1, setct006_af_uf_ufws_ecp_ams_asset_v104dc1}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_asset_v104dc1Props, setct006_af_uf_ufws_ecp_ams_asset_v104dc1Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_table_group6fffa, setasset_table_group6fffa}= useContext(TotalContext) as TotalContextProps;
  const {asset_table_group6fffaProps, setasset_table_group6fffaProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_table6082a, setasset_table6082a}= useContext(TotalContext) as TotalContextProps;
  const {asset_table6082aProps, setasset_table6082aProps}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e, setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps, setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_maintenance_table_groupe042b, setasset_maintenance_table_groupe042b}= useContext(TotalContext) as TotalContextProps;
  const {asset_maintenance_table_groupe042bProps, setasset_maintenance_table_groupe042bProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_maintenance_table6cdf1, setasset_maintenance_table6cdf1}= useContext(TotalContext) as TotalContextProps;
  const {asset_maintenance_table6cdf1Props, setasset_maintenance_table6cdf1Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426, setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props, setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_software_licenses_table_groupcb553, setasset_software_licenses_table_groupcb553}= useContext(TotalContext) as TotalContextProps;
  const {asset_software_licenses_table_groupcb553Props, setasset_software_licenses_table_groupcb553Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_software_licenses_table13758, setasset_software_licenses_table13758}= useContext(TotalContext) as TotalContextProps;
  const {asset_software_licenses_table13758Props, setasset_software_licenses_table13758Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1, setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props, setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_disposal_table_group329e9, setasset_disposal_table_group329e9}= useContext(TotalContext) as TotalContextProps;
  const {asset_disposal_table_group329e9Props, setasset_disposal_table_group329e9Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_disposal_table440cd, setasset_disposal_table440cd}= useContext(TotalContext) as TotalContextProps;
  const {asset_disposal_table440cdProps, setasset_disposal_table440cdProps}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7, setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props, setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props}= useContext(TotalContext) as TotalContextProps;
  const {warrenty_expiring_table_group116d1, setwarrenty_expiring_table_group116d1}= useContext(TotalContext) as TotalContextProps;
  const {warrenty_expiring_table_group116d1Props, setwarrenty_expiring_table_group116d1Props}= useContext(TotalContext) as TotalContextProps;
  const {warrenty_expiring_tablee3168, setwarrenty_expiring_tablee3168}= useContext(TotalContext) as TotalContextProps;
  const {warrenty_expiring_tablee3168Props, setwarrenty_expiring_tablee3168Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assetdasboard_v1, setassetdasboard_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDasboard:AFVK:v1',
    [user],
    'GroupWarrentyExpiringTableGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "005b52e2c1254e218eb9d164fc2116d1");
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
    setwarrenty_expiring_table_group116d1Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("warrenty_expiring_table")){
        setwarrenty_expiring_tablee3168({...warrenty_expiring_tablee3168,isDisabled:true});

    }else
    {
      if(warrenty_expiring_tablee3168?.isDisabled==null)
      {
        setwarrenty_expiring_tablee3168({...warrenty_expiring_tablee3168,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['asset_dashboard_group'] = asset_dashboard_group4d6cb,
        codeStates['setasset_dashboard_group'] = setasset_dashboard_group4d6cb,
        codeStates['asset_dashboard_group4d6cb'] = asset_dashboard_group4d6cbProps,
        codeStates['setasset_dashboard_group4d6cb'] = setasset_dashboard_group4d6cbProps,
        codeStates['total_asset_group'] = total_asset_group69aa9,
        codeStates['settotal_asset_group'] = settotal_asset_group69aa9,
        codeStates['total_asset_group69aa9'] = total_asset_group69aa9Props,
        codeStates['settotal_asset_group69aa9'] = settotal_asset_group69aa9Props,
        codeStates['maintenance_due_group'] = maintenance_due_group704ca,
        codeStates['setmaintenance_due_group'] = setmaintenance_due_group704ca,
        codeStates['maintenance_due_group704ca'] = maintenance_due_group704caProps,
        codeStates['setmaintenance_due_group704ca'] = setmaintenance_due_group704caProps,
        codeStates['warranty_expiring_group'] = warranty_expiring_groupb5bd4,
        codeStates['setwarranty_expiring_group'] = setwarranty_expiring_groupb5bd4,
        codeStates['warranty_expiring_groupb5bd4'] = warranty_expiring_groupb5bd4Props,
        codeStates['setwarranty_expiring_groupb5bd4'] = setwarranty_expiring_groupb5bd4Props,
        codeStates['software_licenses_group'] = software_licenses_group4beb5,
        codeStates['setsoftware_licenses_group'] = setsoftware_licenses_group4beb5,
        codeStates['software_licenses_group4beb5'] = software_licenses_group4beb5Props,
        codeStates['setsoftware_licenses_group4beb5'] = setsoftware_licenses_group4beb5Props,
        codeStates['pending_disposal_group'] = pending_disposal_group2580d,
        codeStates['setpending_disposal_group'] = setpending_disposal_group2580d,
        codeStates['pending_disposal_group2580d'] = pending_disposal_group2580dProps,
        codeStates['setpending_disposal_group2580d'] = setpending_disposal_group2580dProps,
        codeStates['table_group'] = table_group94010,
        codeStates['settable_group'] = settable_group94010,
        codeStates['table_group94010'] = table_group94010Props,
        codeStates['settable_group94010'] = settable_group94010Props,
        codeStates['subscreen'] = subscreen99589,
        codeStates['setsubscreen'] = setsubscreen99589,
        codeStates['subscreen99589'] = subscreen99589Props,
        codeStates['setsubscreen99589'] = setsubscreen99589Props,
        codeStates['ct006_af_uf_ufws_ecp_ams_asset_v1'] = ct006_af_uf_ufws_ecp_ams_asset_v104dc1,
        codeStates['setct006_af_uf_ufws_ecp_ams_asset_v1'] = setct006_af_uf_ufws_ecp_ams_asset_v104dc1,
        codeStates['ct006_af_uf_ufws_ecp_ams_asset_v104dc1'] = ct006_af_uf_ufws_ecp_ams_asset_v104dc1Props,
        codeStates['setct006_af_uf_ufws_ecp_ams_asset_v104dc1'] = setct006_af_uf_ufws_ecp_ams_asset_v104dc1Props,
        codeStates['asset_table_group'] = asset_table_group6fffa,
        codeStates['setasset_table_group'] = setasset_table_group6fffa,
        codeStates['asset_table_group6fffa'] = asset_table_group6fffaProps,
        codeStates['setasset_table_group6fffa'] = setasset_table_group6fffaProps,
        codeStates['asset_table'] = asset_table6082a,
        codeStates['setasset_table'] = setasset_table6082a,
        codeStates['asset_table6082a'] = asset_table6082aProps,
        codeStates['setasset_table6082a'] = setasset_table6082aProps,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1'] = ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1'] = setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e'] = ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e'] = setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps,
        codeStates['asset_maintenance_table_group'] = asset_maintenance_table_groupe042b,
        codeStates['setasset_maintenance_table_group'] = setasset_maintenance_table_groupe042b,
        codeStates['asset_maintenance_table_groupe042b'] = asset_maintenance_table_groupe042bProps,
        codeStates['setasset_maintenance_table_groupe042b'] = setasset_maintenance_table_groupe042bProps,
        codeStates['asset_maintenance_table'] = asset_maintenance_table6cdf1,
        codeStates['setasset_maintenance_table'] = setasset_maintenance_table6cdf1,
        codeStates['asset_maintenance_table6cdf1'] = asset_maintenance_table6cdf1Props,
        codeStates['setasset_maintenance_table6cdf1'] = setasset_maintenance_table6cdf1Props,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1'] = ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1'] = setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426'] = ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426'] = setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props,
        codeStates['asset_software_licenses_table_group'] = asset_software_licenses_table_groupcb553,
        codeStates['setasset_software_licenses_table_group'] = setasset_software_licenses_table_groupcb553,
        codeStates['asset_software_licenses_table_groupcb553'] = asset_software_licenses_table_groupcb553Props,
        codeStates['setasset_software_licenses_table_groupcb553'] = setasset_software_licenses_table_groupcb553Props,
        codeStates['asset_software_licenses_table'] = asset_software_licenses_table13758,
        codeStates['setasset_software_licenses_table'] = setasset_software_licenses_table13758,
        codeStates['asset_software_licenses_table13758'] = asset_software_licenses_table13758Props,
        codeStates['setasset_software_licenses_table13758'] = setasset_software_licenses_table13758Props,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetdisposal_v1'] = ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetdisposal_v1'] = setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1'] = ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1'] = setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props,
        codeStates['asset_disposal_table_group'] = asset_disposal_table_group329e9,
        codeStates['setasset_disposal_table_group'] = setasset_disposal_table_group329e9,
        codeStates['asset_disposal_table_group329e9'] = asset_disposal_table_group329e9Props,
        codeStates['setasset_disposal_table_group329e9'] = setasset_disposal_table_group329e9Props,
        codeStates['asset_disposal_table'] = asset_disposal_table440cd,
        codeStates['setasset_disposal_table'] = setasset_disposal_table440cd,
        codeStates['asset_disposal_table440cd'] = asset_disposal_table440cdProps,
        codeStates['setasset_disposal_table440cd'] = setasset_disposal_table440cdProps,
        codeStates['ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1'] = ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7,
        codeStates['setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1'] = setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7,
        codeStates['ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7'] = ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props,
        codeStates['setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7'] = setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props,
        codeStates['warrenty_expiring_table_group'] = warrenty_expiring_table_group116d1,
        codeStates['setwarrenty_expiring_table_group'] = setwarrenty_expiring_table_group116d1,
        codeStates['warrenty_expiring_table_group116d1'] = warrenty_expiring_table_group116d1Props,
        codeStates['setwarrenty_expiring_table_group116d1'] = setwarrenty_expiring_table_group116d1Props,
        codeStates['warrenty_expiring_table'] = warrenty_expiring_tablee3168,
        codeStates['setwarrenty_expiring_table'] = setwarrenty_expiring_tablee3168,
        codeStates['warrenty_expiring_tablee3168'] = warrenty_expiring_tablee3168Props,
        codeStates['setwarrenty_expiring_tablee3168'] = setwarrenty_expiring_tablee3168Props,

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
        codeStates['asset_dashboard_group'] = asset_dashboard_group4d6cb,
        codeStates['setasset_dashboard_group'] = setasset_dashboard_group4d6cb,
        codeStates['asset_dashboard_group4d6cb'] = asset_dashboard_group4d6cbProps,
        codeStates['setasset_dashboard_group4d6cb'] = setasset_dashboard_group4d6cbProps,
        codeStates['total_asset_group'] = total_asset_group69aa9,
        codeStates['settotal_asset_group'] = settotal_asset_group69aa9,
        codeStates['total_asset_group69aa9'] = total_asset_group69aa9Props,
        codeStates['settotal_asset_group69aa9'] = settotal_asset_group69aa9Props,
        codeStates['maintenance_due_group'] = maintenance_due_group704ca,
        codeStates['setmaintenance_due_group'] = setmaintenance_due_group704ca,
        codeStates['maintenance_due_group704ca'] = maintenance_due_group704caProps,
        codeStates['setmaintenance_due_group704ca'] = setmaintenance_due_group704caProps,
        codeStates['warranty_expiring_group'] = warranty_expiring_groupb5bd4,
        codeStates['setwarranty_expiring_group'] = setwarranty_expiring_groupb5bd4,
        codeStates['warranty_expiring_groupb5bd4'] = warranty_expiring_groupb5bd4Props,
        codeStates['setwarranty_expiring_groupb5bd4'] = setwarranty_expiring_groupb5bd4Props,
        codeStates['software_licenses_group'] = software_licenses_group4beb5,
        codeStates['setsoftware_licenses_group'] = setsoftware_licenses_group4beb5,
        codeStates['software_licenses_group4beb5'] = software_licenses_group4beb5Props,
        codeStates['setsoftware_licenses_group4beb5'] = setsoftware_licenses_group4beb5Props,
        codeStates['pending_disposal_group'] = pending_disposal_group2580d,
        codeStates['setpending_disposal_group'] = setpending_disposal_group2580d,
        codeStates['pending_disposal_group2580d'] = pending_disposal_group2580dProps,
        codeStates['setpending_disposal_group2580d'] = setpending_disposal_group2580dProps,
        codeStates['table_group'] = table_group94010,
        codeStates['settable_group'] = settable_group94010,
        codeStates['table_group94010'] = table_group94010Props,
        codeStates['settable_group94010'] = settable_group94010Props,
        codeStates['subscreen'] = subscreen99589,
        codeStates['setsubscreen'] = setsubscreen99589,
        codeStates['subscreen99589'] = subscreen99589Props,
        codeStates['setsubscreen99589'] = setsubscreen99589Props,
        codeStates['ct006_af_uf_ufws_ecp_ams_asset_v1'] = ct006_af_uf_ufws_ecp_ams_asset_v104dc1,
        codeStates['setct006_af_uf_ufws_ecp_ams_asset_v1'] = setct006_af_uf_ufws_ecp_ams_asset_v104dc1,
        codeStates['ct006_af_uf_ufws_ecp_ams_asset_v104dc1'] = ct006_af_uf_ufws_ecp_ams_asset_v104dc1Props,
        codeStates['setct006_af_uf_ufws_ecp_ams_asset_v104dc1'] = setct006_af_uf_ufws_ecp_ams_asset_v104dc1Props,
        codeStates['asset_table_group'] = asset_table_group6fffa,
        codeStates['setasset_table_group'] = setasset_table_group6fffa,
        codeStates['asset_table_group6fffa'] = asset_table_group6fffaProps,
        codeStates['setasset_table_group6fffa'] = setasset_table_group6fffaProps,
        codeStates['asset_table'] = asset_table6082a,
        codeStates['setasset_table'] = setasset_table6082a,
        codeStates['asset_table6082a'] = asset_table6082aProps,
        codeStates['setasset_table6082a'] = setasset_table6082aProps,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1'] = ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1'] = setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e'] = ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e'] = setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps,
        codeStates['asset_maintenance_table_group'] = asset_maintenance_table_groupe042b,
        codeStates['setasset_maintenance_table_group'] = setasset_maintenance_table_groupe042b,
        codeStates['asset_maintenance_table_groupe042b'] = asset_maintenance_table_groupe042bProps,
        codeStates['setasset_maintenance_table_groupe042b'] = setasset_maintenance_table_groupe042bProps,
        codeStates['asset_maintenance_table'] = asset_maintenance_table6cdf1,
        codeStates['setasset_maintenance_table'] = setasset_maintenance_table6cdf1,
        codeStates['asset_maintenance_table6cdf1'] = asset_maintenance_table6cdf1Props,
        codeStates['setasset_maintenance_table6cdf1'] = setasset_maintenance_table6cdf1Props,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1'] = ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1'] = setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426'] = ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426'] = setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props,
        codeStates['asset_software_licenses_table_group'] = asset_software_licenses_table_groupcb553,
        codeStates['setasset_software_licenses_table_group'] = setasset_software_licenses_table_groupcb553,
        codeStates['asset_software_licenses_table_groupcb553'] = asset_software_licenses_table_groupcb553Props,
        codeStates['setasset_software_licenses_table_groupcb553'] = setasset_software_licenses_table_groupcb553Props,
        codeStates['asset_software_licenses_table'] = asset_software_licenses_table13758,
        codeStates['setasset_software_licenses_table'] = setasset_software_licenses_table13758,
        codeStates['asset_software_licenses_table13758'] = asset_software_licenses_table13758Props,
        codeStates['setasset_software_licenses_table13758'] = setasset_software_licenses_table13758Props,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetdisposal_v1'] = ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetdisposal_v1'] = setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1'] = ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1'] = setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props,
        codeStates['asset_disposal_table_group'] = asset_disposal_table_group329e9,
        codeStates['setasset_disposal_table_group'] = setasset_disposal_table_group329e9,
        codeStates['asset_disposal_table_group329e9'] = asset_disposal_table_group329e9Props,
        codeStates['setasset_disposal_table_group329e9'] = setasset_disposal_table_group329e9Props,
        codeStates['asset_disposal_table'] = asset_disposal_table440cd,
        codeStates['setasset_disposal_table'] = setasset_disposal_table440cd,
        codeStates['asset_disposal_table440cd'] = asset_disposal_table440cdProps,
        codeStates['setasset_disposal_table440cd'] = setasset_disposal_table440cdProps,
        codeStates['ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1'] = ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7,
        codeStates['setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1'] = setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7,
        codeStates['ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7'] = ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props,
        codeStates['setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7'] = setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props,
        codeStates['warrenty_expiring_table_group'] = warrenty_expiring_table_group116d1,
        codeStates['setwarrenty_expiring_table_group'] = setwarrenty_expiring_table_group116d1,
        codeStates['warrenty_expiring_table_group116d1'] = warrenty_expiring_table_group116d1Props,
        codeStates['setwarrenty_expiring_table_group116d1'] = setwarrenty_expiring_table_group116d1Props,
        codeStates['warrenty_expiring_table'] = warrenty_expiring_tablee3168,
        codeStates['setwarrenty_expiring_table'] = setwarrenty_expiring_tablee3168,
        codeStates['warrenty_expiring_tablee3168'] = warrenty_expiring_tablee3168Props,
        codeStates['setwarrenty_expiring_tablee3168'] = setwarrenty_expiring_tablee3168Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const warrenty_expiring_table_group116d1Ref = useRef<any>(null);
  const handleClearSearch = () => {
    warrenty_expiring_table_group116d1Ref.current?.setSearchParams();
    warrenty_expiring_table_group116d1Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(warrenty_expiring_table_group116d1) && Object.keys(warrenty_expiring_table_group116d1)?.length>0)
      {
        setwarrenty_expiring_table_group116d1({})
      }
    }else 
      prevRefreshRef.current= true
  }, [warrenty_expiring_table_group116d1Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 125',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
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
        {allowedComponent.includes("warrenty_expiring_table")  &&<Groupwarrenty_expiring_table  
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
    </div>
 )
}

export default Groupwarrenty_expiring_table_group
