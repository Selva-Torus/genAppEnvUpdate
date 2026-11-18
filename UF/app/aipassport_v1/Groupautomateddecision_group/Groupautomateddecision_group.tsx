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
import Textautomateddecision_text  from "./Textautomateddecision_text";
import Textis_automated_decision  from "./Textis_automated_decision";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupautomateddecision_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_aipassport_v1Props, setdfd_aipassport_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_aimodeltable_v1Props, setdfd_aimodeltable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_aiagentactiontable_v1Props, setdfd_aiagentactiontable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_aicertificationtable_v1Props, setdfd_aicertificationtable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_aichangehistorytable_v1Props, setdfd_aichangehistorytable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_aiaudittable_v1Props, setdfd_aiaudittable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "automateddecision_text",
      "is_automated_decision"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_passport_group",
      "header_group",
      "identity_group",
      "business_owner_group",
      "technical_owner_group",
      "vendor_group",
      "hosting_group",
      "usecase_group",
      "risktier_group",
      "agentauthority_group",
      "killswitch_group",
      "datahandled_group",
      "automateddecision_group",
      "livesince_group",
      "passportversion_group",
      "overall_ai_passport_tab_group",
      "ai_passport_tab_group",
      "idenity_tab_header",
      "discovery_source_code",
      "purpose_and_risk_tab_header",
      "purpose_and_risk_group",
      "model_and_data_tab_header",
      "model_and_data_group",
      "model_table",
      "agent_control_tab_header",
      "agent_controls_group",
      "tool_and_permission_table",
      "certification_tab_header",
      "vevrsion_group",
      "certification_group",
      "template_group",
      "status_group",
      "effective_group",
      "expiry_group",
      "certified_by_group",
      "stage_decision_table",
      "evidence_tab_header",
      "evidence_group",
      "evidence_attached_table",
      "dependencies_header",
      "data_class_group",
      "upstream_table",
      "downstream_table",
      "change_history_tab_header",
      "change_history_group",
      "chnage_history_table",
      "audit_tab_header",
      "audit_group",
      "audit_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "automateddecision_text",
      "is_automated_decision"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_passport_group",
      "header_group",
      "identity_group",
      "business_owner_group",
      "technical_owner_group",
      "vendor_group",
      "hosting_group",
      "usecase_group",
      "risktier_group",
      "agentauthority_group",
      "killswitch_group",
      "datahandled_group",
      "automateddecision_group",
      "livesince_group",
      "passportversion_group",
      "overall_ai_passport_tab_group",
      "ai_passport_tab_group",
      "idenity_tab_header",
      "discovery_source_code",
      "purpose_and_risk_tab_header",
      "purpose_and_risk_group",
      "model_and_data_tab_header",
      "model_and_data_group",
      "model_table",
      "agent_control_tab_header",
      "agent_controls_group",
      "tool_and_permission_table",
      "certification_tab_header",
      "vevrsion_group",
      "certification_group",
      "template_group",
      "status_group",
      "effective_group",
      "expiry_group",
      "certified_by_group",
      "stage_decision_table",
      "evidence_tab_header",
      "evidence_group",
      "evidence_attached_table",
      "dependencies_header",
      "data_class_group",
      "upstream_table",
      "downstream_table",
      "change_history_tab_header",
      "change_history_group",
      "chnage_history_table",
      "audit_tab_header",
      "audit_group",
      "audit_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "automateddecision_text",
      "is_automated_decision"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_passport_group",
      "header_group",
      "identity_group",
      "business_owner_group",
      "technical_owner_group",
      "vendor_group",
      "hosting_group",
      "usecase_group",
      "risktier_group",
      "agentauthority_group",
      "killswitch_group",
      "datahandled_group",
      "automateddecision_group",
      "livesince_group",
      "passportversion_group",
      "overall_ai_passport_tab_group",
      "ai_passport_tab_group",
      "idenity_tab_header",
      "discovery_source_code",
      "purpose_and_risk_tab_header",
      "purpose_and_risk_group",
      "model_and_data_tab_header",
      "model_and_data_group",
      "model_table",
      "agent_control_tab_header",
      "agent_controls_group",
      "tool_and_permission_table",
      "certification_tab_header",
      "vevrsion_group",
      "certification_group",
      "template_group",
      "status_group",
      "effective_group",
      "expiry_group",
      "certified_by_group",
      "stage_decision_table",
      "evidence_tab_header",
      "evidence_group",
      "evidence_attached_table",
      "dependencies_header",
      "data_class_group",
      "upstream_table",
      "downstream_table",
      "change_history_tab_header",
      "change_history_group",
      "chnage_history_table",
      "audit_tab_header",
      "audit_group",
      "audit_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "automateddecision_text",
      "is_automated_decision"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_passport_group",
      "header_group",
      "identity_group",
      "business_owner_group",
      "technical_owner_group",
      "vendor_group",
      "hosting_group",
      "usecase_group",
      "risktier_group",
      "agentauthority_group",
      "killswitch_group",
      "datahandled_group",
      "automateddecision_group",
      "livesince_group",
      "passportversion_group",
      "overall_ai_passport_tab_group",
      "ai_passport_tab_group",
      "idenity_tab_header",
      "discovery_source_code",
      "purpose_and_risk_tab_header",
      "purpose_and_risk_group",
      "model_and_data_tab_header",
      "model_and_data_group",
      "model_table",
      "agent_control_tab_header",
      "agent_controls_group",
      "tool_and_permission_table",
      "certification_tab_header",
      "vevrsion_group",
      "certification_group",
      "template_group",
      "status_group",
      "effective_group",
      "expiry_group",
      "certified_by_group",
      "stage_decision_table",
      "evidence_tab_header",
      "evidence_group",
      "evidence_attached_table",
      "dependencies_header",
      "data_class_group",
      "upstream_table",
      "downstream_table",
      "change_history_tab_header",
      "change_history_group",
      "chnage_history_table",
      "audit_tab_header",
      "audit_group",
      "audit_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "automateddecision_text",
      "is_automated_decision"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_passport_group",
      "header_group",
      "identity_group",
      "business_owner_group",
      "technical_owner_group",
      "vendor_group",
      "hosting_group",
      "usecase_group",
      "risktier_group",
      "agentauthority_group",
      "killswitch_group",
      "datahandled_group",
      "automateddecision_group",
      "livesince_group",
      "passportversion_group",
      "overall_ai_passport_tab_group",
      "ai_passport_tab_group",
      "idenity_tab_header",
      "discovery_source_code",
      "purpose_and_risk_tab_header",
      "purpose_and_risk_group",
      "model_and_data_tab_header",
      "model_and_data_group",
      "model_table",
      "agent_control_tab_header",
      "agent_controls_group",
      "tool_and_permission_table",
      "certification_tab_header",
      "vevrsion_group",
      "certification_group",
      "template_group",
      "status_group",
      "effective_group",
      "expiry_group",
      "certified_by_group",
      "stage_decision_table",
      "evidence_tab_header",
      "evidence_group",
      "evidence_attached_table",
      "dependencies_header",
      "data_class_group",
      "upstream_table",
      "downstream_table",
      "change_history_tab_header",
      "change_history_group",
      "chnage_history_table",
      "audit_tab_header",
      "audit_group",
      "audit_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "automateddecision_text",
      "is_automated_decision"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_passport_group",
      "header_group",
      "identity_group",
      "business_owner_group",
      "technical_owner_group",
      "vendor_group",
      "hosting_group",
      "usecase_group",
      "risktier_group",
      "agentauthority_group",
      "killswitch_group",
      "datahandled_group",
      "automateddecision_group",
      "livesince_group",
      "passportversion_group",
      "overall_ai_passport_tab_group",
      "ai_passport_tab_group",
      "idenity_tab_header",
      "discovery_source_code",
      "purpose_and_risk_tab_header",
      "purpose_and_risk_group",
      "model_and_data_tab_header",
      "model_and_data_group",
      "model_table",
      "agent_control_tab_header",
      "agent_controls_group",
      "tool_and_permission_table",
      "certification_tab_header",
      "vevrsion_group",
      "certification_group",
      "template_group",
      "status_group",
      "effective_group",
      "expiry_group",
      "certified_by_group",
      "stage_decision_table",
      "evidence_tab_header",
      "evidence_group",
      "evidence_attached_table",
      "dependencies_header",
      "data_class_group",
      "upstream_table",
      "downstream_table",
      "change_history_tab_header",
      "change_history_group",
      "chnage_history_table",
      "audit_tab_header",
      "audit_group",
      "audit_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "automateddecision_text",
      "is_automated_decision"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_passport_group",
      "header_group",
      "identity_group",
      "business_owner_group",
      "technical_owner_group",
      "vendor_group",
      "hosting_group",
      "usecase_group",
      "risktier_group",
      "agentauthority_group",
      "killswitch_group",
      "datahandled_group",
      "automateddecision_group",
      "livesince_group",
      "passportversion_group",
      "overall_ai_passport_tab_group",
      "ai_passport_tab_group",
      "idenity_tab_header",
      "discovery_source_code",
      "purpose_and_risk_tab_header",
      "purpose_and_risk_group",
      "model_and_data_tab_header",
      "model_and_data_group",
      "model_table",
      "agent_control_tab_header",
      "agent_controls_group",
      "tool_and_permission_table",
      "certification_tab_header",
      "vevrsion_group",
      "certification_group",
      "template_group",
      "status_group",
      "effective_group",
      "expiry_group",
      "certified_by_group",
      "stage_decision_table",
      "evidence_tab_header",
      "evidence_group",
      "evidence_attached_table",
      "dependencies_header",
      "data_class_group",
      "upstream_table",
      "downstream_table",
      "change_history_tab_header",
      "change_history_group",
      "chnage_history_table",
      "audit_tab_header",
      "audit_group",
      "audit_table"
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
  const {overall_ai_passport_group14d6a, setoverall_ai_passport_group14d6a}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_passport_group14d6aProps, setoverall_ai_passport_group14d6aProps}= useContext(TotalContext) as TotalContextProps;
  const {header_groupe507c, setheader_groupe507c}= useContext(TotalContext) as TotalContextProps;
  const {header_groupe507cProps, setheader_groupe507cProps}= useContext(TotalContext) as TotalContextProps;
  const {identity_groupae639, setidentity_groupae639}= useContext(TotalContext) as TotalContextProps;
  const {identity_groupae639Props, setidentity_groupae639Props}= useContext(TotalContext) as TotalContextProps;
  const {business_owner_group0fd57, setbusiness_owner_group0fd57}= useContext(TotalContext) as TotalContextProps;
  const {business_owner_group0fd57Props, setbusiness_owner_group0fd57Props}= useContext(TotalContext) as TotalContextProps;
  const {technical_owner_group6acd5, settechnical_owner_group6acd5}= useContext(TotalContext) as TotalContextProps;
  const {technical_owner_group6acd5Props, settechnical_owner_group6acd5Props}= useContext(TotalContext) as TotalContextProps;
  const {vendor_group7db41, setvendor_group7db41}= useContext(TotalContext) as TotalContextProps;
  const {vendor_group7db41Props, setvendor_group7db41Props}= useContext(TotalContext) as TotalContextProps;
  const {hosting_groupad047, sethosting_groupad047}= useContext(TotalContext) as TotalContextProps;
  const {hosting_groupad047Props, sethosting_groupad047Props}= useContext(TotalContext) as TotalContextProps;
  const {usecase_group83ab6, setusecase_group83ab6}= useContext(TotalContext) as TotalContextProps;
  const {usecase_group83ab6Props, setusecase_group83ab6Props}= useContext(TotalContext) as TotalContextProps;
  const {risktier_group88dc6, setrisktier_group88dc6}= useContext(TotalContext) as TotalContextProps;
  const {risktier_group88dc6Props, setrisktier_group88dc6Props}= useContext(TotalContext) as TotalContextProps;
  const {agentauthority_group4c81b, setagentauthority_group4c81b}= useContext(TotalContext) as TotalContextProps;
  const {agentauthority_group4c81bProps, setagentauthority_group4c81bProps}= useContext(TotalContext) as TotalContextProps;
  const {killswitch_groupc3403, setkillswitch_groupc3403}= useContext(TotalContext) as TotalContextProps;
  const {killswitch_groupc3403Props, setkillswitch_groupc3403Props}= useContext(TotalContext) as TotalContextProps;
  const {datahandled_groupb59d4, setdatahandled_groupb59d4}= useContext(TotalContext) as TotalContextProps;
  const {datahandled_groupb59d4Props, setdatahandled_groupb59d4Props}= useContext(TotalContext) as TotalContextProps;
  const {automateddecision_group912a5, setautomateddecision_group912a5}= useContext(TotalContext) as TotalContextProps;
  const {automateddecision_group912a5Props, setautomateddecision_group912a5Props}= useContext(TotalContext) as TotalContextProps;
  const {automateddecision_textc2ecb, setautomateddecision_textc2ecb}= useContext(TotalContext) as TotalContextProps;
  const {is_automated_decisionb7243, setis_automated_decisionb7243}= useContext(TotalContext) as TotalContextProps;
  const {livesince_groupb984e, setlivesince_groupb984e}= useContext(TotalContext) as TotalContextProps;
  const {livesince_groupb984eProps, setlivesince_groupb984eProps}= useContext(TotalContext) as TotalContextProps;
  const {passportversion_group27afa, setpassportversion_group27afa}= useContext(TotalContext) as TotalContextProps;
  const {passportversion_group27afaProps, setpassportversion_group27afaProps}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_passport_tab_group92b9a, setoverall_ai_passport_tab_group92b9a}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_passport_tab_group92b9aProps, setoverall_ai_passport_tab_group92b9aProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_passport_tab_groupe8efb, setai_passport_tab_groupe8efb}= useContext(TotalContext) as TotalContextProps;
  const {ai_passport_tab_groupe8efbProps, setai_passport_tab_groupe8efbProps}= useContext(TotalContext) as TotalContextProps;
  const {idenity_tab_header5ad09, setidenity_tab_header5ad09}= useContext(TotalContext) as TotalContextProps;
  const {idenity_tab_header5ad09Props, setidenity_tab_header5ad09Props}= useContext(TotalContext) as TotalContextProps;
  const {discovery_source_codebb08c, setdiscovery_source_codebb08c}= useContext(TotalContext) as TotalContextProps;
  const {discovery_source_codebb08cProps, setdiscovery_source_codebb08cProps}= useContext(TotalContext) as TotalContextProps;
  const {purpose_and_risk_tab_headerb468e, setpurpose_and_risk_tab_headerb468e}= useContext(TotalContext) as TotalContextProps;
  const {purpose_and_risk_tab_headerb468eProps, setpurpose_and_risk_tab_headerb468eProps}= useContext(TotalContext) as TotalContextProps;
  const {purpose_and_risk_group39f23, setpurpose_and_risk_group39f23}= useContext(TotalContext) as TotalContextProps;
  const {purpose_and_risk_group39f23Props, setpurpose_and_risk_group39f23Props}= useContext(TotalContext) as TotalContextProps;
  const {model_and_data_tab_header0eed8, setmodel_and_data_tab_header0eed8}= useContext(TotalContext) as TotalContextProps;
  const {model_and_data_tab_header0eed8Props, setmodel_and_data_tab_header0eed8Props}= useContext(TotalContext) as TotalContextProps;
  const {model_and_data_groupef6dc, setmodel_and_data_groupef6dc}= useContext(TotalContext) as TotalContextProps;
  const {model_and_data_groupef6dcProps, setmodel_and_data_groupef6dcProps}= useContext(TotalContext) as TotalContextProps;
  const {model_table0c788, setmodel_table0c788}= useContext(TotalContext) as TotalContextProps;
  const {model_table0c788Props, setmodel_table0c788Props}= useContext(TotalContext) as TotalContextProps;
  const {agent_control_tab_headere9c54, setagent_control_tab_headere9c54}= useContext(TotalContext) as TotalContextProps;
  const {agent_control_tab_headere9c54Props, setagent_control_tab_headere9c54Props}= useContext(TotalContext) as TotalContextProps;
  const {agent_controls_groupb0779, setagent_controls_groupb0779}= useContext(TotalContext) as TotalContextProps;
  const {agent_controls_groupb0779Props, setagent_controls_groupb0779Props}= useContext(TotalContext) as TotalContextProps;
  const {tool_and_permission_tableaa970, settool_and_permission_tableaa970}= useContext(TotalContext) as TotalContextProps;
  const {tool_and_permission_tableaa970Props, settool_and_permission_tableaa970Props}= useContext(TotalContext) as TotalContextProps;
  const {certification_tab_header59ba4, setcertification_tab_header59ba4}= useContext(TotalContext) as TotalContextProps;
  const {certification_tab_header59ba4Props, setcertification_tab_header59ba4Props}= useContext(TotalContext) as TotalContextProps;
  const {vevrsion_group032b2, setvevrsion_group032b2}= useContext(TotalContext) as TotalContextProps;
  const {vevrsion_group032b2Props, setvevrsion_group032b2Props}= useContext(TotalContext) as TotalContextProps;
  const {certification_groupf95c3, setcertification_groupf95c3}= useContext(TotalContext) as TotalContextProps;
  const {certification_groupf95c3Props, setcertification_groupf95c3Props}= useContext(TotalContext) as TotalContextProps;
  const {template_group89403, settemplate_group89403}= useContext(TotalContext) as TotalContextProps;
  const {template_group89403Props, settemplate_group89403Props}= useContext(TotalContext) as TotalContextProps;
  const {status_group01099, setstatus_group01099}= useContext(TotalContext) as TotalContextProps;
  const {status_group01099Props, setstatus_group01099Props}= useContext(TotalContext) as TotalContextProps;
  const {effective_groupa2193, seteffective_groupa2193}= useContext(TotalContext) as TotalContextProps;
  const {effective_groupa2193Props, seteffective_groupa2193Props}= useContext(TotalContext) as TotalContextProps;
  const {expiry_group2739d, setexpiry_group2739d}= useContext(TotalContext) as TotalContextProps;
  const {expiry_group2739dProps, setexpiry_group2739dProps}= useContext(TotalContext) as TotalContextProps;
  const {certified_by_group1075c, setcertified_by_group1075c}= useContext(TotalContext) as TotalContextProps;
  const {certified_by_group1075cProps, setcertified_by_group1075cProps}= useContext(TotalContext) as TotalContextProps;
  const {stage_decision_table3ec0b, setstage_decision_table3ec0b}= useContext(TotalContext) as TotalContextProps;
  const {stage_decision_table3ec0bProps, setstage_decision_table3ec0bProps}= useContext(TotalContext) as TotalContextProps;
  const {evidence_tab_headerd12b0, setevidence_tab_headerd12b0}= useContext(TotalContext) as TotalContextProps;
  const {evidence_tab_headerd12b0Props, setevidence_tab_headerd12b0Props}= useContext(TotalContext) as TotalContextProps;
  const {evidence_groupc23c4, setevidence_groupc23c4}= useContext(TotalContext) as TotalContextProps;
  const {evidence_groupc23c4Props, setevidence_groupc23c4Props}= useContext(TotalContext) as TotalContextProps;
  const {evidence_attached_table6da8c, setevidence_attached_table6da8c}= useContext(TotalContext) as TotalContextProps;
  const {evidence_attached_table6da8cProps, setevidence_attached_table6da8cProps}= useContext(TotalContext) as TotalContextProps;
  const {dependencies_headera5dd6, setdependencies_headera5dd6}= useContext(TotalContext) as TotalContextProps;
  const {dependencies_headera5dd6Props, setdependencies_headera5dd6Props}= useContext(TotalContext) as TotalContextProps;
  const {data_class_groupc7f3d, setdata_class_groupc7f3d}= useContext(TotalContext) as TotalContextProps;
  const {data_class_groupc7f3dProps, setdata_class_groupc7f3dProps}= useContext(TotalContext) as TotalContextProps;
  const {upstream_table1fd94, setupstream_table1fd94}= useContext(TotalContext) as TotalContextProps;
  const {upstream_table1fd94Props, setupstream_table1fd94Props}= useContext(TotalContext) as TotalContextProps;
  const {downstream_table9d391, setdownstream_table9d391}= useContext(TotalContext) as TotalContextProps;
  const {downstream_table9d391Props, setdownstream_table9d391Props}= useContext(TotalContext) as TotalContextProps;
  const {change_history_tab_header6e714, setchange_history_tab_header6e714}= useContext(TotalContext) as TotalContextProps;
  const {change_history_tab_header6e714Props, setchange_history_tab_header6e714Props}= useContext(TotalContext) as TotalContextProps;
  const {change_history_group5a983, setchange_history_group5a983}= useContext(TotalContext) as TotalContextProps;
  const {change_history_group5a983Props, setchange_history_group5a983Props}= useContext(TotalContext) as TotalContextProps;
  const {chnage_history_tableddb58, setchnage_history_tableddb58}= useContext(TotalContext) as TotalContextProps;
  const {chnage_history_tableddb58Props, setchnage_history_tableddb58Props}= useContext(TotalContext) as TotalContextProps;
  const {audit_tab_headerb76d2, setaudit_tab_headerb76d2}= useContext(TotalContext) as TotalContextProps;
  const {audit_tab_headerb76d2Props, setaudit_tab_headerb76d2Props}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupf8b5f, setaudit_groupf8b5f}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupf8b5fProps, setaudit_groupf8b5fProps}= useContext(TotalContext) as TotalContextProps;
  const {audit_tablec41d7, setaudit_tablec41d7}= useContext(TotalContext) as TotalContextProps;
  const {audit_tablec41d7Props, setaudit_tablec41d7Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {aipassport_v1, setaipassport_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1',
    [user],
    'GroupAutomateddecisionGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "761b5f38a320422da266571ada0912a5");
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
    setautomateddecision_group912a5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("automateddecision_text")){
        setautomateddecision_textc2ecb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(automateddecision_textc2ecb?.isDisabled==null)
      {
        setautomateddecision_textc2ecb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_automated_decision")){
        setis_automated_decisionb7243((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_automated_decisionb7243?.isDisabled==null)
      {
        setis_automated_decisionb7243((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_passport_group'] = overall_ai_passport_group14d6a,
        codeStates['setoverall_ai_passport_group'] = setoverall_ai_passport_group14d6a,
        codeStates['overall_ai_passport_group14d6a'] = overall_ai_passport_group14d6aProps,
        codeStates['setoverall_ai_passport_group14d6a'] = setoverall_ai_passport_group14d6aProps,
        codeStates['header_group'] = header_groupe507c,
        codeStates['setheader_group'] = setheader_groupe507c,
        codeStates['header_groupe507c'] = header_groupe507cProps,
        codeStates['setheader_groupe507c'] = setheader_groupe507cProps,
        codeStates['identity_group'] = identity_groupae639,
        codeStates['setidentity_group'] = setidentity_groupae639,
        codeStates['identity_groupae639'] = identity_groupae639Props,
        codeStates['setidentity_groupae639'] = setidentity_groupae639Props,
        codeStates['business_owner_group'] = business_owner_group0fd57,
        codeStates['setbusiness_owner_group'] = setbusiness_owner_group0fd57,
        codeStates['business_owner_group0fd57'] = business_owner_group0fd57Props,
        codeStates['setbusiness_owner_group0fd57'] = setbusiness_owner_group0fd57Props,
        codeStates['technical_owner_group'] = technical_owner_group6acd5,
        codeStates['settechnical_owner_group'] = settechnical_owner_group6acd5,
        codeStates['technical_owner_group6acd5'] = technical_owner_group6acd5Props,
        codeStates['settechnical_owner_group6acd5'] = settechnical_owner_group6acd5Props,
        codeStates['vendor_group'] = vendor_group7db41,
        codeStates['setvendor_group'] = setvendor_group7db41,
        codeStates['vendor_group7db41'] = vendor_group7db41Props,
        codeStates['setvendor_group7db41'] = setvendor_group7db41Props,
        codeStates['hosting_group'] = hosting_groupad047,
        codeStates['sethosting_group'] = sethosting_groupad047,
        codeStates['hosting_groupad047'] = hosting_groupad047Props,
        codeStates['sethosting_groupad047'] = sethosting_groupad047Props,
        codeStates['usecase_group'] = usecase_group83ab6,
        codeStates['setusecase_group'] = setusecase_group83ab6,
        codeStates['usecase_group83ab6'] = usecase_group83ab6Props,
        codeStates['setusecase_group83ab6'] = setusecase_group83ab6Props,
        codeStates['risktier_group'] = risktier_group88dc6,
        codeStates['setrisktier_group'] = setrisktier_group88dc6,
        codeStates['risktier_group88dc6'] = risktier_group88dc6Props,
        codeStates['setrisktier_group88dc6'] = setrisktier_group88dc6Props,
        codeStates['agentauthority_group'] = agentauthority_group4c81b,
        codeStates['setagentauthority_group'] = setagentauthority_group4c81b,
        codeStates['agentauthority_group4c81b'] = agentauthority_group4c81bProps,
        codeStates['setagentauthority_group4c81b'] = setagentauthority_group4c81bProps,
        codeStates['killswitch_group'] = killswitch_groupc3403,
        codeStates['setkillswitch_group'] = setkillswitch_groupc3403,
        codeStates['killswitch_groupc3403'] = killswitch_groupc3403Props,
        codeStates['setkillswitch_groupc3403'] = setkillswitch_groupc3403Props,
        codeStates['datahandled_group'] = datahandled_groupb59d4,
        codeStates['setdatahandled_group'] = setdatahandled_groupb59d4,
        codeStates['datahandled_groupb59d4'] = datahandled_groupb59d4Props,
        codeStates['setdatahandled_groupb59d4'] = setdatahandled_groupb59d4Props,
        codeStates['automateddecision_group'] = automateddecision_group912a5,
        codeStates['setautomateddecision_group'] = setautomateddecision_group912a5,
        codeStates['automateddecision_group912a5'] = automateddecision_group912a5Props,
        codeStates['setautomateddecision_group912a5'] = setautomateddecision_group912a5Props,
        codeStates['automateddecision_text'] = automateddecision_textc2ecb,
        codeStates['setautomateddecision_text'] = setautomateddecision_textc2ecb,
        codeStates['is_automated_decision'] = is_automated_decisionb7243,
        codeStates['setis_automated_decision'] = setis_automated_decisionb7243,
        codeStates['livesince_group'] = livesince_groupb984e,
        codeStates['setlivesince_group'] = setlivesince_groupb984e,
        codeStates['livesince_groupb984e'] = livesince_groupb984eProps,
        codeStates['setlivesince_groupb984e'] = setlivesince_groupb984eProps,
        codeStates['passportversion_group'] = passportversion_group27afa,
        codeStates['setpassportversion_group'] = setpassportversion_group27afa,
        codeStates['passportversion_group27afa'] = passportversion_group27afaProps,
        codeStates['setpassportversion_group27afa'] = setpassportversion_group27afaProps,
        codeStates['overall_ai_passport_tab_group'] = overall_ai_passport_tab_group92b9a,
        codeStates['setoverall_ai_passport_tab_group'] = setoverall_ai_passport_tab_group92b9a,
        codeStates['overall_ai_passport_tab_group92b9a'] = overall_ai_passport_tab_group92b9aProps,
        codeStates['setoverall_ai_passport_tab_group92b9a'] = setoverall_ai_passport_tab_group92b9aProps,
        codeStates['ai_passport_tab_group'] = ai_passport_tab_groupe8efb,
        codeStates['setai_passport_tab_group'] = setai_passport_tab_groupe8efb,
        codeStates['ai_passport_tab_groupe8efb'] = ai_passport_tab_groupe8efbProps,
        codeStates['setai_passport_tab_groupe8efb'] = setai_passport_tab_groupe8efbProps,
        codeStates['idenity_tab_header'] = idenity_tab_header5ad09,
        codeStates['setidenity_tab_header'] = setidenity_tab_header5ad09,
        codeStates['idenity_tab_header5ad09'] = idenity_tab_header5ad09Props,
        codeStates['setidenity_tab_header5ad09'] = setidenity_tab_header5ad09Props,
        codeStates['discovery_source_code'] = discovery_source_codebb08c,
        codeStates['setdiscovery_source_code'] = setdiscovery_source_codebb08c,
        codeStates['discovery_source_codebb08c'] = discovery_source_codebb08cProps,
        codeStates['setdiscovery_source_codebb08c'] = setdiscovery_source_codebb08cProps,
        codeStates['purpose_and_risk_tab_header'] = purpose_and_risk_tab_headerb468e,
        codeStates['setpurpose_and_risk_tab_header'] = setpurpose_and_risk_tab_headerb468e,
        codeStates['purpose_and_risk_tab_headerb468e'] = purpose_and_risk_tab_headerb468eProps,
        codeStates['setpurpose_and_risk_tab_headerb468e'] = setpurpose_and_risk_tab_headerb468eProps,
        codeStates['purpose_and_risk_group'] = purpose_and_risk_group39f23,
        codeStates['setpurpose_and_risk_group'] = setpurpose_and_risk_group39f23,
        codeStates['purpose_and_risk_group39f23'] = purpose_and_risk_group39f23Props,
        codeStates['setpurpose_and_risk_group39f23'] = setpurpose_and_risk_group39f23Props,
        codeStates['model_and_data_tab_header'] = model_and_data_tab_header0eed8,
        codeStates['setmodel_and_data_tab_header'] = setmodel_and_data_tab_header0eed8,
        codeStates['model_and_data_tab_header0eed8'] = model_and_data_tab_header0eed8Props,
        codeStates['setmodel_and_data_tab_header0eed8'] = setmodel_and_data_tab_header0eed8Props,
        codeStates['model_and_data_group'] = model_and_data_groupef6dc,
        codeStates['setmodel_and_data_group'] = setmodel_and_data_groupef6dc,
        codeStates['model_and_data_groupef6dc'] = model_and_data_groupef6dcProps,
        codeStates['setmodel_and_data_groupef6dc'] = setmodel_and_data_groupef6dcProps,
        codeStates['model_table'] = model_table0c788,
        codeStates['setmodel_table'] = setmodel_table0c788,
        codeStates['model_table0c788'] = model_table0c788Props,
        codeStates['setmodel_table0c788'] = setmodel_table0c788Props,
        codeStates['agent_control_tab_header'] = agent_control_tab_headere9c54,
        codeStates['setagent_control_tab_header'] = setagent_control_tab_headere9c54,
        codeStates['agent_control_tab_headere9c54'] = agent_control_tab_headere9c54Props,
        codeStates['setagent_control_tab_headere9c54'] = setagent_control_tab_headere9c54Props,
        codeStates['agent_controls_group'] = agent_controls_groupb0779,
        codeStates['setagent_controls_group'] = setagent_controls_groupb0779,
        codeStates['agent_controls_groupb0779'] = agent_controls_groupb0779Props,
        codeStates['setagent_controls_groupb0779'] = setagent_controls_groupb0779Props,
        codeStates['tool_and_permission_table'] = tool_and_permission_tableaa970,
        codeStates['settool_and_permission_table'] = settool_and_permission_tableaa970,
        codeStates['tool_and_permission_tableaa970'] = tool_and_permission_tableaa970Props,
        codeStates['settool_and_permission_tableaa970'] = settool_and_permission_tableaa970Props,
        codeStates['certification_tab_header'] = certification_tab_header59ba4,
        codeStates['setcertification_tab_header'] = setcertification_tab_header59ba4,
        codeStates['certification_tab_header59ba4'] = certification_tab_header59ba4Props,
        codeStates['setcertification_tab_header59ba4'] = setcertification_tab_header59ba4Props,
        codeStates['vevrsion_group'] = vevrsion_group032b2,
        codeStates['setvevrsion_group'] = setvevrsion_group032b2,
        codeStates['vevrsion_group032b2'] = vevrsion_group032b2Props,
        codeStates['setvevrsion_group032b2'] = setvevrsion_group032b2Props,
        codeStates['certification_group'] = certification_groupf95c3,
        codeStates['setcertification_group'] = setcertification_groupf95c3,
        codeStates['certification_groupf95c3'] = certification_groupf95c3Props,
        codeStates['setcertification_groupf95c3'] = setcertification_groupf95c3Props,
        codeStates['template_group'] = template_group89403,
        codeStates['settemplate_group'] = settemplate_group89403,
        codeStates['template_group89403'] = template_group89403Props,
        codeStates['settemplate_group89403'] = settemplate_group89403Props,
        codeStates['status_group'] = status_group01099,
        codeStates['setstatus_group'] = setstatus_group01099,
        codeStates['status_group01099'] = status_group01099Props,
        codeStates['setstatus_group01099'] = setstatus_group01099Props,
        codeStates['effective_group'] = effective_groupa2193,
        codeStates['seteffective_group'] = seteffective_groupa2193,
        codeStates['effective_groupa2193'] = effective_groupa2193Props,
        codeStates['seteffective_groupa2193'] = seteffective_groupa2193Props,
        codeStates['expiry_group'] = expiry_group2739d,
        codeStates['setexpiry_group'] = setexpiry_group2739d,
        codeStates['expiry_group2739d'] = expiry_group2739dProps,
        codeStates['setexpiry_group2739d'] = setexpiry_group2739dProps,
        codeStates['certified_by_group'] = certified_by_group1075c,
        codeStates['setcertified_by_group'] = setcertified_by_group1075c,
        codeStates['certified_by_group1075c'] = certified_by_group1075cProps,
        codeStates['setcertified_by_group1075c'] = setcertified_by_group1075cProps,
        codeStates['stage_decision_table'] = stage_decision_table3ec0b,
        codeStates['setstage_decision_table'] = setstage_decision_table3ec0b,
        codeStates['stage_decision_table3ec0b'] = stage_decision_table3ec0bProps,
        codeStates['setstage_decision_table3ec0b'] = setstage_decision_table3ec0bProps,
        codeStates['evidence_tab_header'] = evidence_tab_headerd12b0,
        codeStates['setevidence_tab_header'] = setevidence_tab_headerd12b0,
        codeStates['evidence_tab_headerd12b0'] = evidence_tab_headerd12b0Props,
        codeStates['setevidence_tab_headerd12b0'] = setevidence_tab_headerd12b0Props,
        codeStates['evidence_group'] = evidence_groupc23c4,
        codeStates['setevidence_group'] = setevidence_groupc23c4,
        codeStates['evidence_groupc23c4'] = evidence_groupc23c4Props,
        codeStates['setevidence_groupc23c4'] = setevidence_groupc23c4Props,
        codeStates['evidence_attached_table'] = evidence_attached_table6da8c,
        codeStates['setevidence_attached_table'] = setevidence_attached_table6da8c,
        codeStates['evidence_attached_table6da8c'] = evidence_attached_table6da8cProps,
        codeStates['setevidence_attached_table6da8c'] = setevidence_attached_table6da8cProps,
        codeStates['dependencies_header'] = dependencies_headera5dd6,
        codeStates['setdependencies_header'] = setdependencies_headera5dd6,
        codeStates['dependencies_headera5dd6'] = dependencies_headera5dd6Props,
        codeStates['setdependencies_headera5dd6'] = setdependencies_headera5dd6Props,
        codeStates['data_class_group'] = data_class_groupc7f3d,
        codeStates['setdata_class_group'] = setdata_class_groupc7f3d,
        codeStates['data_class_groupc7f3d'] = data_class_groupc7f3dProps,
        codeStates['setdata_class_groupc7f3d'] = setdata_class_groupc7f3dProps,
        codeStates['upstream_table'] = upstream_table1fd94,
        codeStates['setupstream_table'] = setupstream_table1fd94,
        codeStates['upstream_table1fd94'] = upstream_table1fd94Props,
        codeStates['setupstream_table1fd94'] = setupstream_table1fd94Props,
        codeStates['downstream_table'] = downstream_table9d391,
        codeStates['setdownstream_table'] = setdownstream_table9d391,
        codeStates['downstream_table9d391'] = downstream_table9d391Props,
        codeStates['setdownstream_table9d391'] = setdownstream_table9d391Props,
        codeStates['change_history_tab_header'] = change_history_tab_header6e714,
        codeStates['setchange_history_tab_header'] = setchange_history_tab_header6e714,
        codeStates['change_history_tab_header6e714'] = change_history_tab_header6e714Props,
        codeStates['setchange_history_tab_header6e714'] = setchange_history_tab_header6e714Props,
        codeStates['change_history_group'] = change_history_group5a983,
        codeStates['setchange_history_group'] = setchange_history_group5a983,
        codeStates['change_history_group5a983'] = change_history_group5a983Props,
        codeStates['setchange_history_group5a983'] = setchange_history_group5a983Props,
        codeStates['chnage_history_table'] = chnage_history_tableddb58,
        codeStates['setchnage_history_table'] = setchnage_history_tableddb58,
        codeStates['chnage_history_tableddb58'] = chnage_history_tableddb58Props,
        codeStates['setchnage_history_tableddb58'] = setchnage_history_tableddb58Props,
        codeStates['audit_tab_header'] = audit_tab_headerb76d2,
        codeStates['setaudit_tab_header'] = setaudit_tab_headerb76d2,
        codeStates['audit_tab_headerb76d2'] = audit_tab_headerb76d2Props,
        codeStates['setaudit_tab_headerb76d2'] = setaudit_tab_headerb76d2Props,
        codeStates['audit_group'] = audit_groupf8b5f,
        codeStates['setaudit_group'] = setaudit_groupf8b5f,
        codeStates['audit_groupf8b5f'] = audit_groupf8b5fProps,
        codeStates['setaudit_groupf8b5f'] = setaudit_groupf8b5fProps,
        codeStates['audit_table'] = audit_tablec41d7,
        codeStates['setaudit_table'] = setaudit_tablec41d7,
        codeStates['audit_tablec41d7'] = audit_tablec41d7Props,
        codeStates['setaudit_tablec41d7'] = setaudit_tablec41d7Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "761b5f38a320422da266571ada0912a5");
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
        codeStates['overall_ai_passport_group'] = overall_ai_passport_group14d6a,
        codeStates['setoverall_ai_passport_group'] = setoverall_ai_passport_group14d6a,
        codeStates['overall_ai_passport_group14d6a'] = overall_ai_passport_group14d6aProps,
        codeStates['setoverall_ai_passport_group14d6a'] = setoverall_ai_passport_group14d6aProps,
        codeStates['header_group'] = header_groupe507c,
        codeStates['setheader_group'] = setheader_groupe507c,
        codeStates['header_groupe507c'] = header_groupe507cProps,
        codeStates['setheader_groupe507c'] = setheader_groupe507cProps,
        codeStates['identity_group'] = identity_groupae639,
        codeStates['setidentity_group'] = setidentity_groupae639,
        codeStates['identity_groupae639'] = identity_groupae639Props,
        codeStates['setidentity_groupae639'] = setidentity_groupae639Props,
        codeStates['business_owner_group'] = business_owner_group0fd57,
        codeStates['setbusiness_owner_group'] = setbusiness_owner_group0fd57,
        codeStates['business_owner_group0fd57'] = business_owner_group0fd57Props,
        codeStates['setbusiness_owner_group0fd57'] = setbusiness_owner_group0fd57Props,
        codeStates['technical_owner_group'] = technical_owner_group6acd5,
        codeStates['settechnical_owner_group'] = settechnical_owner_group6acd5,
        codeStates['technical_owner_group6acd5'] = technical_owner_group6acd5Props,
        codeStates['settechnical_owner_group6acd5'] = settechnical_owner_group6acd5Props,
        codeStates['vendor_group'] = vendor_group7db41,
        codeStates['setvendor_group'] = setvendor_group7db41,
        codeStates['vendor_group7db41'] = vendor_group7db41Props,
        codeStates['setvendor_group7db41'] = setvendor_group7db41Props,
        codeStates['hosting_group'] = hosting_groupad047,
        codeStates['sethosting_group'] = sethosting_groupad047,
        codeStates['hosting_groupad047'] = hosting_groupad047Props,
        codeStates['sethosting_groupad047'] = sethosting_groupad047Props,
        codeStates['usecase_group'] = usecase_group83ab6,
        codeStates['setusecase_group'] = setusecase_group83ab6,
        codeStates['usecase_group83ab6'] = usecase_group83ab6Props,
        codeStates['setusecase_group83ab6'] = setusecase_group83ab6Props,
        codeStates['risktier_group'] = risktier_group88dc6,
        codeStates['setrisktier_group'] = setrisktier_group88dc6,
        codeStates['risktier_group88dc6'] = risktier_group88dc6Props,
        codeStates['setrisktier_group88dc6'] = setrisktier_group88dc6Props,
        codeStates['agentauthority_group'] = agentauthority_group4c81b,
        codeStates['setagentauthority_group'] = setagentauthority_group4c81b,
        codeStates['agentauthority_group4c81b'] = agentauthority_group4c81bProps,
        codeStates['setagentauthority_group4c81b'] = setagentauthority_group4c81bProps,
        codeStates['killswitch_group'] = killswitch_groupc3403,
        codeStates['setkillswitch_group'] = setkillswitch_groupc3403,
        codeStates['killswitch_groupc3403'] = killswitch_groupc3403Props,
        codeStates['setkillswitch_groupc3403'] = setkillswitch_groupc3403Props,
        codeStates['datahandled_group'] = datahandled_groupb59d4,
        codeStates['setdatahandled_group'] = setdatahandled_groupb59d4,
        codeStates['datahandled_groupb59d4'] = datahandled_groupb59d4Props,
        codeStates['setdatahandled_groupb59d4'] = setdatahandled_groupb59d4Props,
        codeStates['automateddecision_group'] = automateddecision_group912a5,
        codeStates['setautomateddecision_group'] = setautomateddecision_group912a5,
        codeStates['automateddecision_group912a5'] = automateddecision_group912a5Props,
        codeStates['setautomateddecision_group912a5'] = setautomateddecision_group912a5Props,
        codeStates['automateddecision_text'] = automateddecision_textc2ecb,
        codeStates['setautomateddecision_text'] = setautomateddecision_textc2ecb,
        codeStates['is_automated_decision'] = is_automated_decisionb7243,
        codeStates['setis_automated_decision'] = setis_automated_decisionb7243,
        codeStates['livesince_group'] = livesince_groupb984e,
        codeStates['setlivesince_group'] = setlivesince_groupb984e,
        codeStates['livesince_groupb984e'] = livesince_groupb984eProps,
        codeStates['setlivesince_groupb984e'] = setlivesince_groupb984eProps,
        codeStates['passportversion_group'] = passportversion_group27afa,
        codeStates['setpassportversion_group'] = setpassportversion_group27afa,
        codeStates['passportversion_group27afa'] = passportversion_group27afaProps,
        codeStates['setpassportversion_group27afa'] = setpassportversion_group27afaProps,
        codeStates['overall_ai_passport_tab_group'] = overall_ai_passport_tab_group92b9a,
        codeStates['setoverall_ai_passport_tab_group'] = setoverall_ai_passport_tab_group92b9a,
        codeStates['overall_ai_passport_tab_group92b9a'] = overall_ai_passport_tab_group92b9aProps,
        codeStates['setoverall_ai_passport_tab_group92b9a'] = setoverall_ai_passport_tab_group92b9aProps,
        codeStates['ai_passport_tab_group'] = ai_passport_tab_groupe8efb,
        codeStates['setai_passport_tab_group'] = setai_passport_tab_groupe8efb,
        codeStates['ai_passport_tab_groupe8efb'] = ai_passport_tab_groupe8efbProps,
        codeStates['setai_passport_tab_groupe8efb'] = setai_passport_tab_groupe8efbProps,
        codeStates['idenity_tab_header'] = idenity_tab_header5ad09,
        codeStates['setidenity_tab_header'] = setidenity_tab_header5ad09,
        codeStates['idenity_tab_header5ad09'] = idenity_tab_header5ad09Props,
        codeStates['setidenity_tab_header5ad09'] = setidenity_tab_header5ad09Props,
        codeStates['discovery_source_code'] = discovery_source_codebb08c,
        codeStates['setdiscovery_source_code'] = setdiscovery_source_codebb08c,
        codeStates['discovery_source_codebb08c'] = discovery_source_codebb08cProps,
        codeStates['setdiscovery_source_codebb08c'] = setdiscovery_source_codebb08cProps,
        codeStates['purpose_and_risk_tab_header'] = purpose_and_risk_tab_headerb468e,
        codeStates['setpurpose_and_risk_tab_header'] = setpurpose_and_risk_tab_headerb468e,
        codeStates['purpose_and_risk_tab_headerb468e'] = purpose_and_risk_tab_headerb468eProps,
        codeStates['setpurpose_and_risk_tab_headerb468e'] = setpurpose_and_risk_tab_headerb468eProps,
        codeStates['purpose_and_risk_group'] = purpose_and_risk_group39f23,
        codeStates['setpurpose_and_risk_group'] = setpurpose_and_risk_group39f23,
        codeStates['purpose_and_risk_group39f23'] = purpose_and_risk_group39f23Props,
        codeStates['setpurpose_and_risk_group39f23'] = setpurpose_and_risk_group39f23Props,
        codeStates['model_and_data_tab_header'] = model_and_data_tab_header0eed8,
        codeStates['setmodel_and_data_tab_header'] = setmodel_and_data_tab_header0eed8,
        codeStates['model_and_data_tab_header0eed8'] = model_and_data_tab_header0eed8Props,
        codeStates['setmodel_and_data_tab_header0eed8'] = setmodel_and_data_tab_header0eed8Props,
        codeStates['model_and_data_group'] = model_and_data_groupef6dc,
        codeStates['setmodel_and_data_group'] = setmodel_and_data_groupef6dc,
        codeStates['model_and_data_groupef6dc'] = model_and_data_groupef6dcProps,
        codeStates['setmodel_and_data_groupef6dc'] = setmodel_and_data_groupef6dcProps,
        codeStates['model_table'] = model_table0c788,
        codeStates['setmodel_table'] = setmodel_table0c788,
        codeStates['model_table0c788'] = model_table0c788Props,
        codeStates['setmodel_table0c788'] = setmodel_table0c788Props,
        codeStates['agent_control_tab_header'] = agent_control_tab_headere9c54,
        codeStates['setagent_control_tab_header'] = setagent_control_tab_headere9c54,
        codeStates['agent_control_tab_headere9c54'] = agent_control_tab_headere9c54Props,
        codeStates['setagent_control_tab_headere9c54'] = setagent_control_tab_headere9c54Props,
        codeStates['agent_controls_group'] = agent_controls_groupb0779,
        codeStates['setagent_controls_group'] = setagent_controls_groupb0779,
        codeStates['agent_controls_groupb0779'] = agent_controls_groupb0779Props,
        codeStates['setagent_controls_groupb0779'] = setagent_controls_groupb0779Props,
        codeStates['tool_and_permission_table'] = tool_and_permission_tableaa970,
        codeStates['settool_and_permission_table'] = settool_and_permission_tableaa970,
        codeStates['tool_and_permission_tableaa970'] = tool_and_permission_tableaa970Props,
        codeStates['settool_and_permission_tableaa970'] = settool_and_permission_tableaa970Props,
        codeStates['certification_tab_header'] = certification_tab_header59ba4,
        codeStates['setcertification_tab_header'] = setcertification_tab_header59ba4,
        codeStates['certification_tab_header59ba4'] = certification_tab_header59ba4Props,
        codeStates['setcertification_tab_header59ba4'] = setcertification_tab_header59ba4Props,
        codeStates['vevrsion_group'] = vevrsion_group032b2,
        codeStates['setvevrsion_group'] = setvevrsion_group032b2,
        codeStates['vevrsion_group032b2'] = vevrsion_group032b2Props,
        codeStates['setvevrsion_group032b2'] = setvevrsion_group032b2Props,
        codeStates['certification_group'] = certification_groupf95c3,
        codeStates['setcertification_group'] = setcertification_groupf95c3,
        codeStates['certification_groupf95c3'] = certification_groupf95c3Props,
        codeStates['setcertification_groupf95c3'] = setcertification_groupf95c3Props,
        codeStates['template_group'] = template_group89403,
        codeStates['settemplate_group'] = settemplate_group89403,
        codeStates['template_group89403'] = template_group89403Props,
        codeStates['settemplate_group89403'] = settemplate_group89403Props,
        codeStates['status_group'] = status_group01099,
        codeStates['setstatus_group'] = setstatus_group01099,
        codeStates['status_group01099'] = status_group01099Props,
        codeStates['setstatus_group01099'] = setstatus_group01099Props,
        codeStates['effective_group'] = effective_groupa2193,
        codeStates['seteffective_group'] = seteffective_groupa2193,
        codeStates['effective_groupa2193'] = effective_groupa2193Props,
        codeStates['seteffective_groupa2193'] = seteffective_groupa2193Props,
        codeStates['expiry_group'] = expiry_group2739d,
        codeStates['setexpiry_group'] = setexpiry_group2739d,
        codeStates['expiry_group2739d'] = expiry_group2739dProps,
        codeStates['setexpiry_group2739d'] = setexpiry_group2739dProps,
        codeStates['certified_by_group'] = certified_by_group1075c,
        codeStates['setcertified_by_group'] = setcertified_by_group1075c,
        codeStates['certified_by_group1075c'] = certified_by_group1075cProps,
        codeStates['setcertified_by_group1075c'] = setcertified_by_group1075cProps,
        codeStates['stage_decision_table'] = stage_decision_table3ec0b,
        codeStates['setstage_decision_table'] = setstage_decision_table3ec0b,
        codeStates['stage_decision_table3ec0b'] = stage_decision_table3ec0bProps,
        codeStates['setstage_decision_table3ec0b'] = setstage_decision_table3ec0bProps,
        codeStates['evidence_tab_header'] = evidence_tab_headerd12b0,
        codeStates['setevidence_tab_header'] = setevidence_tab_headerd12b0,
        codeStates['evidence_tab_headerd12b0'] = evidence_tab_headerd12b0Props,
        codeStates['setevidence_tab_headerd12b0'] = setevidence_tab_headerd12b0Props,
        codeStates['evidence_group'] = evidence_groupc23c4,
        codeStates['setevidence_group'] = setevidence_groupc23c4,
        codeStates['evidence_groupc23c4'] = evidence_groupc23c4Props,
        codeStates['setevidence_groupc23c4'] = setevidence_groupc23c4Props,
        codeStates['evidence_attached_table'] = evidence_attached_table6da8c,
        codeStates['setevidence_attached_table'] = setevidence_attached_table6da8c,
        codeStates['evidence_attached_table6da8c'] = evidence_attached_table6da8cProps,
        codeStates['setevidence_attached_table6da8c'] = setevidence_attached_table6da8cProps,
        codeStates['dependencies_header'] = dependencies_headera5dd6,
        codeStates['setdependencies_header'] = setdependencies_headera5dd6,
        codeStates['dependencies_headera5dd6'] = dependencies_headera5dd6Props,
        codeStates['setdependencies_headera5dd6'] = setdependencies_headera5dd6Props,
        codeStates['data_class_group'] = data_class_groupc7f3d,
        codeStates['setdata_class_group'] = setdata_class_groupc7f3d,
        codeStates['data_class_groupc7f3d'] = data_class_groupc7f3dProps,
        codeStates['setdata_class_groupc7f3d'] = setdata_class_groupc7f3dProps,
        codeStates['upstream_table'] = upstream_table1fd94,
        codeStates['setupstream_table'] = setupstream_table1fd94,
        codeStates['upstream_table1fd94'] = upstream_table1fd94Props,
        codeStates['setupstream_table1fd94'] = setupstream_table1fd94Props,
        codeStates['downstream_table'] = downstream_table9d391,
        codeStates['setdownstream_table'] = setdownstream_table9d391,
        codeStates['downstream_table9d391'] = downstream_table9d391Props,
        codeStates['setdownstream_table9d391'] = setdownstream_table9d391Props,
        codeStates['change_history_tab_header'] = change_history_tab_header6e714,
        codeStates['setchange_history_tab_header'] = setchange_history_tab_header6e714,
        codeStates['change_history_tab_header6e714'] = change_history_tab_header6e714Props,
        codeStates['setchange_history_tab_header6e714'] = setchange_history_tab_header6e714Props,
        codeStates['change_history_group'] = change_history_group5a983,
        codeStates['setchange_history_group'] = setchange_history_group5a983,
        codeStates['change_history_group5a983'] = change_history_group5a983Props,
        codeStates['setchange_history_group5a983'] = setchange_history_group5a983Props,
        codeStates['chnage_history_table'] = chnage_history_tableddb58,
        codeStates['setchnage_history_table'] = setchnage_history_tableddb58,
        codeStates['chnage_history_tableddb58'] = chnage_history_tableddb58Props,
        codeStates['setchnage_history_tableddb58'] = setchnage_history_tableddb58Props,
        codeStates['audit_tab_header'] = audit_tab_headerb76d2,
        codeStates['setaudit_tab_header'] = setaudit_tab_headerb76d2,
        codeStates['audit_tab_headerb76d2'] = audit_tab_headerb76d2Props,
        codeStates['setaudit_tab_headerb76d2'] = setaudit_tab_headerb76d2Props,
        codeStates['audit_group'] = audit_groupf8b5f,
        codeStates['setaudit_group'] = setaudit_groupf8b5f,
        codeStates['audit_groupf8b5f'] = audit_groupf8b5fProps,
        codeStates['setaudit_groupf8b5f'] = setaudit_groupf8b5fProps,
        codeStates['audit_table'] = audit_tablec41d7,
        codeStates['setaudit_table'] = setaudit_tablec41d7,
        codeStates['audit_tablec41d7'] = audit_tablec41d7Props,
        codeStates['setaudit_tablec41d7'] = setaudit_tablec41d7Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const automateddecision_group912a5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    automateddecision_group912a5Ref.current?.setSearchParams();
    automateddecision_group912a5Ref.current?.handleSearch({});
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
        !Array.isArray(automateddecision_group912a5) &&
        Object.keys(automateddecision_group912a5)?.length > 0
      ) {
        setautomateddecision_group912a5({})
        setautomateddecision_group912a5Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [automateddecision_group912a5Props?.refresh])


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
        gridColumn: '7 / 13',
        gridRow: '41 / 60',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-3 !rounded-none ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaipassport_v1((pre:any)=>({...pre,_selectedGroup_:"automateddecision_group"}))
        }}
    >
          {allowedControls.includes("automateddecision_text") ?<Textautomateddecision_text   /* c2ecb */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("is_automated_decision") ?<Textis_automated_decision   /* b7243 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupautomateddecision_group
