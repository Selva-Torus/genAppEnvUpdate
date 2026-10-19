'use client'
import React,{ useContext,useEffect,useState,useRef } from "react";
import { AxiosService } from '@/app/components/axiosService';
import { te_refreshDto,api_paginationDto } from '@/app/interfaces/interfaces';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from "../globalContext";
import decodeToken from "../components/decodeToken";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode } from "@/types/global";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import clsx from "clsx";
import dynamic from 'next/dynamic';
import { useGlobal } from '@/context/GlobalContext'
import { logout } from "@/app/components/utils";  

const Groupoverall_ai_passport_group = dynamic(() => import("./Groupoverall_ai_passport_group/Groupoverall_ai_passport_group"), { ssr: false });

export default function PageAipassportV1({ onReady }: { onReady?: () => void } = {}) {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "AI Product Owner": {
    "blockedGroups": []
  },
  "Auditor": {
    "blockedGroups": []
  },
  "Executive": {
    "blockedGroups": []
  },
  "FinOps / Operation": {
    "blockedGroups": []
  },
  "Model RIsk / Compliance": {
    "blockedGroups": []
  },
  "Platform Administrator": {
    "blockedGroups": []
  },
  "Security (CISO Office)": {
    "blockedGroups": []
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "overall_ai_passport_group": {},
  "header_group": {
    "asset_name": {
      "show": false
    },
    "divider1": {
      "show": false
    },
    "certification": {
      "show": false
    },
    "risk_tier_source": {
      "show": false
    },
    "asset_details": {
      "show": false
    }
  },
  "identity_group": {},
  "business_owner_group": {
    "business_owner_text": {
      "show": false
    },
    "business_owner_name": {
      "show": false
    }
  },
  "technical_owner_group": {
    "technical_owner_text": {
      "show": false
    },
    "technical_owner_name": {
      "show": false
    }
  },
  "vendor_group": {
    "vendor_text": {
      "show": false
    },
    "vendor_name": {
      "show": false
    }
  },
  "hosting_group": {
    "hosting_text": {
      "show": false
    },
    "hosting_location": {
      "show": false
    }
  },
  "usecase_group": {
    "usecase_text": {
      "show": false
    },
    "use_case_code": {
      "show": false
    }
  },
  "risktier_group": {
    "risktier_text": {
      "show": false
    },
    "risk_tier_code": {
      "show": false
    }
  },
  "agentauthority_group": {
    "agentauthority_text": {
      "show": false
    },
    "authority_level_code": {
      "show": false
    }
  },
  "killswitch_group": {
    "killswitch_text": {
      "show": false
    },
    "kill_switch_state_code": {
      "show": false
    }
  },
  "datahandled_group": {
    "datahandled_text": {
      "show": false
    },
    "data_class_code": {
      "show": false
    }
  },
  "automateddecision_group": {
    "automateddecision_text": {
      "show": false
    },
    "is_automated_decision": {
      "show": false
    }
  },
  "livesince_group": {
    "livesince_text": {
      "show": false
    },
    "go_live_date": {
      "show": false
    }
  },
  "passportversion_group": {
    "current_version_number_text": {
      "show": false
    },
    "current_version_no": {
      "show": false
    }
  },
  "overall_ai_passport_tab_group": {},
  "ai_passport_tab_group": {},
  "idenity_tab_header": {},
  "discovery_source_code": {
    "registration_text": {
      "show": false
    },
    "accountability_text": {
      "show": false
    },
    "assetcode_text": {
      "show": false
    },
    "asset_code": {
      "show": false
    },
    "business_owner_text": {
      "show": false
    },
    "business_owner_name": {
      "show": false
    },
    "divider42": {
      "show": false
    },
    "divider39": {
      "show": false
    },
    "asset_type_code_text": {
      "show": false
    },
    "asset_type_code": {
      "show": false
    },
    "technical_owner_text": {
      "show": false
    },
    "technical_owner_name": {
      "show": false
    },
    "divider4": {
      "show": false
    },
    "business_unit_text": {
      "show": false
    },
    "business_unit_name": {
      "show": false
    },
    "divider3": {
      "show": false
    },
    "discovery_source_code_text": {
      "show": false
    },
    "discovery_source_code": {
      "show": false
    },
    "divider2": {
      "show": false
    },
    "last_seen_text": {
      "show": false
    },
    "last_seen_on": {
      "show": false
    },
    "divider252": {
      "show": false
    }
  },
  "purpose_and_risk_tab_header": {},
  "purpose_and_risk_group": {
    "purpose_text": {
      "show": false
    },
    "risk_classification_text": {
      "show": false
    },
    "usecase_text": {
      "show": false
    },
    "use_case_code": {
      "show": false
    },
    "risk_tier_source_text": {
      "show": false
    },
    "risk_tier_source": {
      "show": false
    },
    "divider100": {
      "show": false
    },
    "divider500": {
      "show": false
    },
    "business_criticality_text": {
      "show": false
    },
    "criticality_code": {
      "show": false
    },
    "derived_by_rule_text": {
      "show": false
    },
    "rule_code": {
      "show": false
    },
    "divider200": {
      "show": false
    },
    "divider600": {
      "show": false
    },
    "is_customer_facing_text": {
      "show": false
    },
    "is_customer_facing": {
      "show": false
    },
    "data_handled_text": {
      "show": false
    },
    "data_class_code": {
      "show": false
    },
    "divider300": {
      "show": false
    },
    "divider700": {
      "show": false
    },
    "is_automated_decision_text": {
      "show": false
    },
    "is_automated_decision": {
      "show": false
    },
    "confirmed_text": {
      "show": false
    },
    "assessed_on": {
      "show": false
    },
    "divider400": {
      "show": false
    },
    "divider800": {
      "show": false
    },
    "regulatory_mapping_text": {
      "show": false
    },
    "regulatory_text": {
      "show": false
    },
    "regulatory": {
      "show": false
    },
    "divider900": {
      "show": false
    }
  },
  "model_and_data_tab_header": {},
  "model_and_data_group": {
    "dataandgrounding_text": {
      "show": false
    },
    "grounding_text": {
      "show": false
    },
    "data_classification_text": {
      "show": false
    },
    "data_class_code": {
      "show": false
    },
    "last_validated_on_text": {
      "show": false
    },
    "last_validated_on": {
      "show": false
    },
    "divider41": {
      "show": false
    },
    "divider42": {
      "show": false
    },
    "rag_vector_store_text": {
      "show": false
    },
    "uses_rag": {
      "show": false
    },
    "next_validation_due_text": {
      "show": false
    },
    "next_validation_due": {
      "show": false
    },
    "divider26": {
      "show": false
    },
    "divider4": {
      "show": false
    },
    "grounding_source_text": {
      "show": false
    },
    "grounding_source": {
      "show": false
    },
    "bias_assessment_text": {
      "show": false
    },
    "evidence_type_code": {
      "show": false
    },
    "divider15": {
      "show": false
    },
    "divider244": {
      "show": false
    },
    "index_refresh_text": {
      "show": false
    },
    "index_refresh": {
      "show": false
    },
    "system_prompt_text": {
      "show": false
    },
    "system_prompt": {
      "show": false
    },
    "dividerrrr": {
      "show": false
    },
    "dividerr": {
      "show": false
    },
    "drift_monitoring_text": {
      "show": false
    },
    "drift_monitoring": {
      "show": false
    },
    "dividerrr": {
      "show": false
    },
    "model_text": {
      "show": false
    }
  },
  "model_table": {
    "model_name": {
      "show": false
    },
    "model_family_code": {
      "show": false
    },
    "model_version": {
      "show": false
    },
    "training_source": {
      "show": false
    }
  },
  "agent_control_tab_header": {},
  "agent_controls_group": {
    "authorityandoversight_text": {
      "show": false
    },
    "toolpermissions_text": {
      "show": false
    },
    "agentauthority_text": {
      "show": false
    },
    "authority_level_code": {
      "show": false
    },
    "divider41": {
      "show": false
    },
    "humanoversight_text": {
      "show": false
    },
    "requires_human_approval": {
      "show": false
    },
    "divider26": {
      "show": false
    },
    "killswitch_text": {
      "show": false
    },
    "kill_switch_state_code": {
      "show": false
    },
    "divider15": {
      "show": false
    },
    "killswitchowner_text": {
      "show": false
    },
    "kill_switch_updated_by": {
      "show": false
    },
    "divider488": {
      "show": false
    }
  },
  "tool_and_permission_table": {
    "target_system": {
      "show": false
    },
    "is_permitted": {
      "show": false
    }
  },
  "certification_tab_header": {},
  "vevrsion_group": {
    "certification_text": {
      "show": false
    },
    "stagedecisions_text": {
      "show": false
    }
  },
  "certification_group": {
    "certification_text": {
      "show": false
    },
    "cert_code": {
      "show": false
    }
  },
  "template_group": {
    "template_text": {
      "show": false
    },
    "template_name": {
      "show": false
    }
  },
  "status_group": {
    "status_text": {
      "show": false
    },
    "cert_status_code": {
      "show": false
    }
  },
  "effective_group": {
    "effective_date_text": {
      "show": false
    },
    "effective_date": {
      "show": false
    }
  },
  "expiry_group": {
    "expiry_date_text": {
      "show": false
    },
    "expiry_date": {
      "show": false
    }
  },
  "certified_by_group": {
    "certified_by_text": {
      "show": false
    },
    "effective_date": {
      "show": false
    }
  },
  "stage_decision_table": {
    "stage_name": {
      "show": false
    },
    "full_name": {
      "show": false
    },
    "decision_code": {
      "show": false
    },
    "decided_on": {
      "show": false
    }
  },
  "evidence_tab_header": {},
  "evidence_group": {
    "evidence_text": {
      "show": false
    }
  },
  "evidence_attached_table": {
    "attachment_id": {
      "show": false
    },
    "doc_group": {
      "show": false
    },
    "doc_name": {
      "show": false
    },
    "trs_created_date": {
      "show": false
    },
    "trs_created_by": {
      "show": false
    }
  },
  "dependencies_header": {},
  "data_class_group": {
    "upstream_text": {
      "show": false
    },
    "downstream_text": {
      "show": false
    }
  },
  "upstream_table": {
    "dependency_name": {
      "show": false
    },
    "dependency_type_code": {
      "show": false
    },
    "asset_code": {
      "show": false
    }
  },
  "downstream_table": {
    "dependency_name": {
      "show": false
    },
    "dependency_type_code": {
      "show": false
    },
    "asset_code": {
      "show": false
    }
  },
  "change_history_tab_header": {},
  "change_history_group": {
    "passport_version_text": {
      "show": false
    }
  },
  "chnage_history_table": {
    "valid_from": {
      "show": false
    },
    "version_no": {
      "show": false
    },
    "change_reason": {
      "show": false
    },
    "changed_by": {
      "show": false
    }
  },
  "audit_tab_header": {},
  "audit_group": {
    "audit_text": {
      "show": false
    }
  },
  "audit_table": {
    "event_timestamp": {
      "show": false
    },
    "event_type_code": {
      "show": false
    },
    "actor_login": {
      "show": false
    },
    "action_summary": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "ai passport";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {aipassport_v1, setaipassport_v1} = useContext(TotalContext) as TotalContextProps;
  const {aipassport_v1Props, setaipassport_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkoverall_ai_passport_group,setCheckoverall_ai_passport_group,]=useState<boolean>(false);
  const [checkheader_group,setCheckheader_group,]=useState<boolean>(false);
  const [checkidentity_group,setCheckidentity_group,]=useState<boolean>(false);
  const [checkbusiness_owner_group,setCheckbusiness_owner_group,]=useState<boolean>(false);
  const [checktechnical_owner_group,setChecktechnical_owner_group,]=useState<boolean>(false);
  const [checkvendor_group,setCheckvendor_group,]=useState<boolean>(false);
  const [checkhosting_group,setCheckhosting_group,]=useState<boolean>(false);
  const [checkusecase_group,setCheckusecase_group,]=useState<boolean>(false);
  const [checkrisktier_group,setCheckrisktier_group,]=useState<boolean>(false);
  const [checkagentauthority_group,setCheckagentauthority_group,]=useState<boolean>(false);
  const [checkkillswitch_group,setCheckkillswitch_group,]=useState<boolean>(false);
  const [checkdatahandled_group,setCheckdatahandled_group,]=useState<boolean>(false);
  const [checkautomateddecision_group,setCheckautomateddecision_group,]=useState<boolean>(false);
  const [checklivesince_group,setChecklivesince_group,]=useState<boolean>(false);
  const [checkpassportversion_group,setCheckpassportversion_group,]=useState<boolean>(false);
  const [checkoverall_ai_passport_tab_group,setCheckoverall_ai_passport_tab_group,]=useState<boolean>(false);
  const [checkdiscovery_source_code,setCheckdiscovery_source_code,]=useState<boolean>(false);
  const [checkpurpose_and_risk_group,setCheckpurpose_and_risk_group,]=useState<boolean>(false);
  const [checkmodel_and_data_group,setCheckmodel_and_data_group,]=useState<boolean>(false);
  const [checkmodel_table,setCheckmodel_table,]=useState<boolean>(false);
  const [checkagent_controls_group,setCheckagent_controls_group,]=useState<boolean>(false);
  const [checktool_and_permission_table,setChecktool_and_permission_table,]=useState<boolean>(false);
  const [checkvevrsion_group,setCheckvevrsion_group,]=useState<boolean>(false);
  const [checkcertification_group,setCheckcertification_group,]=useState<boolean>(false);
  const [checktemplate_group,setChecktemplate_group,]=useState<boolean>(false);
  const [checkstatus_group,setCheckstatus_group,]=useState<boolean>(false);
  const [checkeffective_group,setCheckeffective_group,]=useState<boolean>(false);
  const [checkexpiry_group,setCheckexpiry_group,]=useState<boolean>(false);
  const [checkcertified_by_group,setCheckcertified_by_group,]=useState<boolean>(false);
  const [checkstage_decision_table,setCheckstage_decision_table,]=useState<boolean>(false);
  const [checkevidence_group,setCheckevidence_group,]=useState<boolean>(false);
  const [checkevidence_attached_table,setCheckevidence_attached_table,]=useState<boolean>(false);
  const [checkdata_class_group,setCheckdata_class_group,]=useState<boolean>(false);
  const [checkupstream_table,setCheckupstream_table,]=useState<boolean>(false);
  const [checkdownstream_table,setCheckdownstream_table,]=useState<boolean>(false);
  const [checkchange_history_group,setCheckchange_history_group,]=useState<boolean>(false);
  const [checkchnage_history_table,setCheckchnage_history_table,]=useState<boolean>(false);
  const [checkaudit_group,setCheckaudit_group,]=useState<boolean>(false);
  const [checkaudit_table,setCheckaudit_table,]=useState<boolean>(false);
  const {overall_ai_passport_group14d6a, setoverall_ai_passport_group14d6a} = useContext(TotalContext) as TotalContextProps;
  const {header_groupe507c, setheader_groupe507c} = useContext(TotalContext) as TotalContextProps;
  const {identity_groupae639, setidentity_groupae639} = useContext(TotalContext) as TotalContextProps;
  const {business_owner_group0fd57, setbusiness_owner_group0fd57} = useContext(TotalContext) as TotalContextProps;
  const {technical_owner_group6acd5, settechnical_owner_group6acd5} = useContext(TotalContext) as TotalContextProps;
  const {vendor_group7db41, setvendor_group7db41} = useContext(TotalContext) as TotalContextProps;
  const {hosting_groupad047, sethosting_groupad047} = useContext(TotalContext) as TotalContextProps;
  const {usecase_group83ab6, setusecase_group83ab6} = useContext(TotalContext) as TotalContextProps;
  const {risktier_group88dc6, setrisktier_group88dc6} = useContext(TotalContext) as TotalContextProps;
  const {agentauthority_group4c81b, setagentauthority_group4c81b} = useContext(TotalContext) as TotalContextProps;
  const {killswitch_groupc3403, setkillswitch_groupc3403} = useContext(TotalContext) as TotalContextProps;
  const {datahandled_groupb59d4, setdatahandled_groupb59d4} = useContext(TotalContext) as TotalContextProps;
  const {automateddecision_group912a5, setautomateddecision_group912a5} = useContext(TotalContext) as TotalContextProps;
  const {livesince_groupb984e, setlivesince_groupb984e} = useContext(TotalContext) as TotalContextProps;
  const {passportversion_group27afa, setpassportversion_group27afa} = useContext(TotalContext) as TotalContextProps;
  const {overall_ai_passport_tab_group92b9a, setoverall_ai_passport_tab_group92b9a} = useContext(TotalContext) as TotalContextProps;
  const {discovery_source_codebb08c, setdiscovery_source_codebb08c} = useContext(TotalContext) as TotalContextProps;
  const {purpose_and_risk_group39f23, setpurpose_and_risk_group39f23} = useContext(TotalContext) as TotalContextProps;
  const {model_and_data_groupef6dc, setmodel_and_data_groupef6dc} = useContext(TotalContext) as TotalContextProps;
  const {model_table0c788, setmodel_table0c788} = useContext(TotalContext) as TotalContextProps;
  const {agent_controls_groupb0779, setagent_controls_groupb0779} = useContext(TotalContext) as TotalContextProps;
  const {tool_and_permission_tableaa970, settool_and_permission_tableaa970} = useContext(TotalContext) as TotalContextProps;
  const {vevrsion_group032b2, setvevrsion_group032b2} = useContext(TotalContext) as TotalContextProps;
  const {certification_groupf95c3, setcertification_groupf95c3} = useContext(TotalContext) as TotalContextProps;
  const {template_group89403, settemplate_group89403} = useContext(TotalContext) as TotalContextProps;
  const {status_group01099, setstatus_group01099} = useContext(TotalContext) as TotalContextProps;
  const {effective_groupa2193, seteffective_groupa2193} = useContext(TotalContext) as TotalContextProps;
  const {expiry_group2739d, setexpiry_group2739d} = useContext(TotalContext) as TotalContextProps;
  const {certified_by_group1075c, setcertified_by_group1075c} = useContext(TotalContext) as TotalContextProps;
  const {stage_decision_table3ec0b, setstage_decision_table3ec0b} = useContext(TotalContext) as TotalContextProps;
  const {evidence_groupc23c4, setevidence_groupc23c4} = useContext(TotalContext) as TotalContextProps;
  const {evidence_attached_table6da8c, setevidence_attached_table6da8c} = useContext(TotalContext) as TotalContextProps;
  const {data_class_groupc7f3d, setdata_class_groupc7f3d} = useContext(TotalContext) as TotalContextProps;
  const {upstream_table1fd94, setupstream_table1fd94} = useContext(TotalContext) as TotalContextProps;
  const {downstream_table9d391, setdownstream_table9d391} = useContext(TotalContext) as TotalContextProps;
  const {change_history_group5a983, setchange_history_group5a983} = useContext(TotalContext) as TotalContextProps;
  const {chnage_history_tableddb58, setchnage_history_tableddb58} = useContext(TotalContext) as TotalContextProps;
  const {audit_groupf8b5f, setaudit_groupf8b5f} = useContext(TotalContext) as TotalContextProps;
  const {audit_tablec41d7, setaudit_tablec41d7} = useContext(TotalContext) as TotalContextProps;
  const {ai_passport_tab_groupe8efb, setai_passport_tab_groupe8efb} = useContext(TotalContext) as TotalContextProps;
  const {dfd_aipassport_v1Props, setdfd_aipassport_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_aimodeltable_v1Props, setdfd_aimodeltable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_aiagentactiontable_v1Props, setdfd_aiagentactiontable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_aicertificationtable_v1Props, setdfd_aicertificationtable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_aichangehistorytable_v1Props, setdfd_aichangehistorytable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_aiaudittable_v1Props, setdfd_aiaudittable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_attachevidence_v1Props, setdfd_attachevidence_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [controlData, setControlData] = useState<any>({});
  const [groupData, setGroupData] = useState<any>({});
  const encryptionFlagPage: boolean = false|| encAppFalg.flag;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encAppFalg.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encAppFalg.method;
  let encryptionFlagPageData : EncryptionFlagPageData ={
    "flag":encryptionFlagPage,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  }
  const [paginationDetails, setpaginationDetails] = useState<Record<string, any>>({});
  const [paginationData,setPaginationData]=useState<PaginationData>({count:10,page:1})
    const prevRefreshRef = useRef<any>({
      aipassport_v1:false,
      aimodeltable_v1:false,
      aiagentactiontable_v1:false,
      aicertificationtable_v1:false,
      aichangehistorytable_v1:false,
      aiaudittable_v1:false,
      attachevidence_v1:false,
    });
    async function aipassport_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let aipassport_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          aipassport_v1Body["dpdKey"] = encryptionDpd;
          aipassport_v1Body["method"] = encryptionMethod;
        }
        if(aipassport_v1Props.length > 0){
          for(let i=0;i< aipassport_v1Props.length;i++){
            if(aipassport_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1"){
              // delete aipassport_v1Props[i].DFDkey;
              let temp=structuredClone(aipassport_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          aipassport_v1Body['filterData'] = filterData;
        }
        const aipassport_v1Data:any=await AxiosService.post("/te/eventEmitter",aipassport_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=aipassport_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(aipassport_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_aipassport_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_aipassport_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (aipassport_v1Data?.data?.dataset) {
           setdfd_aipassport_v1Props(
              Array.isArray(aipassport_v1Data?.data?.dataset?.data)
                 ? aipassport_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_aipassport_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.aipassport_v1) {
      aipassport_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.aipassport_v1= true
  },[refetch?.aipassport_v1])
    async function aimodeltable_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let aimodeltable_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIModelTable:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          aimodeltable_v1Body["dpdKey"] = encryptionDpd;
          aimodeltable_v1Body["method"] = encryptionMethod;
        }
        if(aipassport_v1Props.length > 0){
          for(let i=0;i< aipassport_v1Props.length;i++){
            if(aipassport_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIModelTable:AFVK:v1"){
              // delete aipassport_v1Props[i].DFDkey;
              let temp=structuredClone(aipassport_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          aimodeltable_v1Body['filterData'] = filterData;
        }
        const aimodeltable_v1Data:any=await AxiosService.post("/te/eventEmitter",aimodeltable_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=aimodeltable_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(aimodeltable_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_aimodeltable_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_aimodeltable_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (aimodeltable_v1Data?.data?.dataset) {
           setdfd_aimodeltable_v1Props(
              Array.isArray(aimodeltable_v1Data?.data?.dataset?.data)
                 ? aimodeltable_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_aimodeltable_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.aimodeltable_v1) {
      aimodeltable_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.aimodeltable_v1= true
  },[refetch?.aimodeltable_v1])
    async function aiagentactiontable_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let aiagentactiontable_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentActionTable:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          aiagentactiontable_v1Body["dpdKey"] = encryptionDpd;
          aiagentactiontable_v1Body["method"] = encryptionMethod;
        }
        if(aipassport_v1Props.length > 0){
          for(let i=0;i< aipassport_v1Props.length;i++){
            if(aipassport_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentActionTable:AFVK:v1"){
              // delete aipassport_v1Props[i].DFDkey;
              let temp=structuredClone(aipassport_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          aiagentactiontable_v1Body['filterData'] = filterData;
        }
        const aiagentactiontable_v1Data:any=await AxiosService.post("/te/eventEmitter",aiagentactiontable_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=aiagentactiontable_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(aiagentactiontable_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_aiagentactiontable_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_aiagentactiontable_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (aiagentactiontable_v1Data?.data?.dataset) {
           setdfd_aiagentactiontable_v1Props(
              Array.isArray(aiagentactiontable_v1Data?.data?.dataset?.data)
                 ? aiagentactiontable_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_aiagentactiontable_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.aiagentactiontable_v1) {
      aiagentactiontable_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.aiagentactiontable_v1= true
  },[refetch?.aiagentactiontable_v1])
    async function aicertificationtable_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let aicertificationtable_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AICertificationTable:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          aicertificationtable_v1Body["dpdKey"] = encryptionDpd;
          aicertificationtable_v1Body["method"] = encryptionMethod;
        }
        if(aipassport_v1Props.length > 0){
          for(let i=0;i< aipassport_v1Props.length;i++){
            if(aipassport_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AICertificationTable:AFVK:v1"){
              // delete aipassport_v1Props[i].DFDkey;
              let temp=structuredClone(aipassport_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          aicertificationtable_v1Body['filterData'] = filterData;
        }
        const aicertificationtable_v1Data:any=await AxiosService.post("/te/eventEmitter",aicertificationtable_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=aicertificationtable_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(aicertificationtable_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_aicertificationtable_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_aicertificationtable_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (aicertificationtable_v1Data?.data?.dataset) {
           setdfd_aicertificationtable_v1Props(
              Array.isArray(aicertificationtable_v1Data?.data?.dataset?.data)
                 ? aicertificationtable_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_aicertificationtable_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.aicertificationtable_v1) {
      aicertificationtable_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.aicertificationtable_v1= true
  },[refetch?.aicertificationtable_v1])
    async function aichangehistorytable_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let aichangehistorytable_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIChangeHistoryTable:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          aichangehistorytable_v1Body["dpdKey"] = encryptionDpd;
          aichangehistorytable_v1Body["method"] = encryptionMethod;
        }
        if(aipassport_v1Props.length > 0){
          for(let i=0;i< aipassport_v1Props.length;i++){
            if(aipassport_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIChangeHistoryTable:AFVK:v1"){
              // delete aipassport_v1Props[i].DFDkey;
              let temp=structuredClone(aipassport_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          aichangehistorytable_v1Body['filterData'] = filterData;
        }
        const aichangehistorytable_v1Data:any=await AxiosService.post("/te/eventEmitter",aichangehistorytable_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=aichangehistorytable_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(aichangehistorytable_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_aichangehistorytable_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_aichangehistorytable_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (aichangehistorytable_v1Data?.data?.dataset) {
           setdfd_aichangehistorytable_v1Props(
              Array.isArray(aichangehistorytable_v1Data?.data?.dataset?.data)
                 ? aichangehistorytable_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_aichangehistorytable_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.aichangehistorytable_v1) {
      aichangehistorytable_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.aichangehistorytable_v1= true
  },[refetch?.aichangehistorytable_v1])
    async function aiaudittable_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let aiaudittable_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAUditTable:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          aiaudittable_v1Body["dpdKey"] = encryptionDpd;
          aiaudittable_v1Body["method"] = encryptionMethod;
        }
        if(aipassport_v1Props.length > 0){
          for(let i=0;i< aipassport_v1Props.length;i++){
            if(aipassport_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAUditTable:AFVK:v1"){
              // delete aipassport_v1Props[i].DFDkey;
              let temp=structuredClone(aipassport_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          aiaudittable_v1Body['filterData'] = filterData;
        }
        const aiaudittable_v1Data:any=await AxiosService.post("/te/eventEmitter",aiaudittable_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=aiaudittable_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(aiaudittable_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_aiaudittable_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_aiaudittable_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (aiaudittable_v1Data?.data?.dataset) {
           setdfd_aiaudittable_v1Props(
              Array.isArray(aiaudittable_v1Data?.data?.dataset?.data)
                 ? aiaudittable_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_aiaudittable_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.aiaudittable_v1) {
      aiaudittable_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.aiaudittable_v1= true
  },[refetch?.aiaudittable_v1])
    async function attachevidence_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let attachevidence_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          attachevidence_v1Body["dpdKey"] = encryptionDpd;
          attachevidence_v1Body["method"] = encryptionMethod;
        }
        if(aipassport_v1Props.length > 0){
          for(let i=0;i< aipassport_v1Props.length;i++){
            if(aipassport_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1"){
              // delete aipassport_v1Props[i].DFDkey;
              let temp=structuredClone(aipassport_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          attachevidence_v1Body['filterData'] = filterData;
        }
        const attachevidence_v1Data:any=await AxiosService.post("/te/eventEmitter",attachevidence_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=attachevidence_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(attachevidence_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_attachevidence_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_attachevidence_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (attachevidence_v1Data?.data?.dataset) {
           setdfd_attachevidence_v1Props(
              Array.isArray(attachevidence_v1Data?.data?.dataset?.data)
                 ? attachevidence_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_attachevidence_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.attachevidence_v1) {
      attachevidence_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.attachevidence_v1= true
  },[refetch?.attachevidence_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setaipassport_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1"
        }
      : { key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1" }
    const encryptionFlagPageData: EncryptionFlagPageData = {
      flag: encryptionFlagPage,
      dpd: encryptionDpd,
      method: encryptionMethod
    }
    // fetchBatchData, introspect and myAccount-for-client don't depend on one
    // another's results — only programmain_v1DFD (below) needs the pagination
    // value that comes out of fetchBatchData. Run all three concurrently
    // instead of one after another. Each call is caught locally so one
    // failure doesn't swallow the other two responses (Promise.all rejects
    // on the first rejection otherwise).
    const [data, myAccountRes]: [any, any] = await Promise.all([
      fetchBatchData(
        'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1',
        [user],
        'pageAipassportV1',
        token,
        encryptionFlagPageData
      ),
      token
        ? AxiosService.get("/UF/myAccount-for-client", {
            headers: { Authorization: `Bearer ${token}` },
            params: introspectParams
          }).catch((err: any) => ({ __error: err }))
        : Promise.resolve(null)
    ])
    const orchestrationData: any = data.pageData
    setGroupData(data.groupData || {});
    setControlData(data.controlData || {});
    const security:string = orchestrationData?.security;
    const allowedGroup: AllowedGroupNode[] = orchestrationData?.allowedGroup||[];
    code = orchestrationData?.code;
    const pagination:any = orchestrationData?.action?.pagination;
    setpaginationDetails({
      page: +orchestrationData?.action?.pagination?.page || 0,
      pageSize: +orchestrationData?.action?.pagination?.count || 0
    })
    if("artfactPFRule" in orchestrationData && orchestrationData?.artfactPFRule?.nodes?.length>0){
      await handleArtfactRule(orchestrationData?.artfactPFRule,{...decodedTokenObj},allRuleData)  
    }
    if (token) {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1`)
      if (!res.ok) {
        logout(token)
        return
      }
      //routes.refresh()

      try {
        if (myAccountRes?.__error) throw myAccountRes.__error;
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await aipassport_v1DFD(pagination)
    await aimodeltable_v1DFD(pagination)
    await aiagentactiontable_v1DFD(pagination)
    await aicertificationtable_v1DFD(pagination)
    await aichangehistorytable_v1DFD(pagination)
    await aiaudittable_v1DFD(pagination)
    await attachevidence_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'overall_ai_passport_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckoverall_ai_passport_group(true)
            }
            if(nodes?.groupName == 'header_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckheader_group(true)
            }
            if(nodes?.groupName == 'identity_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckidentity_group(true)
            }
            if(nodes?.groupName == 'business_owner_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckbusiness_owner_group(true)
            }
            if(nodes?.groupName == 'technical_owner_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktechnical_owner_group(true)
            }
            if(nodes?.groupName == 'vendor_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckvendor_group(true)
            }
            if(nodes?.groupName == 'hosting_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckhosting_group(true)
            }
            if(nodes?.groupName == 'usecase_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckusecase_group(true)
            }
            if(nodes?.groupName == 'risktier_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrisktier_group(true)
            }
            if(nodes?.groupName == 'agentauthority_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckagentauthority_group(true)
            }
            if(nodes?.groupName == 'killswitch_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckkillswitch_group(true)
            }
            if(nodes?.groupName == 'datahandled_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdatahandled_group(true)
            }
            if(nodes?.groupName == 'automateddecision_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckautomateddecision_group(true)
            }
            if(nodes?.groupName == 'livesince_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecklivesince_group(true)
            }
            if(nodes?.groupName == 'passportversion_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckpassportversion_group(true)
            }
            if(nodes?.groupName == 'overall_ai_passport_tab_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckoverall_ai_passport_tab_group(true)
            }
            if(nodes?.groupName == 'discovery_source_code' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdiscovery_source_code(true)
            }
            if(nodes?.groupName == 'purpose_and_risk_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckpurpose_and_risk_group(true)
            }
            if(nodes?.groupName == 'model_and_data_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckmodel_and_data_group(true)
            }
            if(nodes?.groupName == 'model_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckmodel_table(true)
            }
            if(nodes?.groupName == 'agent_controls_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckagent_controls_group(true)
            }
            if(nodes?.groupName == 'tool_and_permission_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktool_and_permission_table(true)
            }
            if(nodes?.groupName == 'vevrsion_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckvevrsion_group(true)
            }
            if(nodes?.groupName == 'certification_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcertification_group(true)
            }
            if(nodes?.groupName == 'template_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktemplate_group(true)
            }
            if(nodes?.groupName == 'status_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckstatus_group(true)
            }
            if(nodes?.groupName == 'effective_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckeffective_group(true)
            }
            if(nodes?.groupName == 'expiry_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckexpiry_group(true)
            }
            if(nodes?.groupName == 'certified_by_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcertified_by_group(true)
            }
            if(nodes?.groupName == 'stage_decision_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckstage_decision_table(true)
            }
            if(nodes?.groupName == 'evidence_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckevidence_group(true)
            }
            if(nodes?.groupName == 'evidence_attached_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckevidence_attached_table(true)
            }
            if(nodes?.groupName == 'data_class_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdata_class_group(true)
            }
            if(nodes?.groupName == 'upstream_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckupstream_table(true)
            }
            if(nodes?.groupName == 'downstream_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdownstream_table(true)
            }
            if(nodes?.groupName == 'change_history_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckchange_history_group(true)
            }
            if(nodes?.groupName == 'chnage_history_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckchnage_history_table(true)
            }
            if(nodes?.groupName == 'audit_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckaudit_group(true)
            }
            if(nodes?.groupName == 'audit_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckaudit_table(true)
            }
          })
          }
           }catch(err:any)
          {
            if( typeof err =='string')
              toast(err, 'danger');
            else
              toast(err?.response?.data?.message, 'danger');
          }
        /////////
        //Code Execution
        if (code !="" ) {
          let codeStates: Record<string, any> = {}
          codeStates['overall_ai_passport_group'] = overall_ai_passport_group14d6a;
          codeStates['setoverall_ai_passport_group'] = setoverall_ai_passport_group14d6a;
          codeStates['header_group'] = header_groupe507c;
          codeStates['setheader_group'] = setheader_groupe507c;
          codeStates['identity_group'] = identity_groupae639;
          codeStates['setidentity_group'] = setidentity_groupae639;
          codeStates['business_owner_group'] = business_owner_group0fd57;
          codeStates['setbusiness_owner_group'] = setbusiness_owner_group0fd57;
          codeStates['technical_owner_group'] = technical_owner_group6acd5;
          codeStates['settechnical_owner_group'] = settechnical_owner_group6acd5;
          codeStates['vendor_group'] = vendor_group7db41;
          codeStates['setvendor_group'] = setvendor_group7db41;
          codeStates['hosting_group'] = hosting_groupad047;
          codeStates['sethosting_group'] = sethosting_groupad047;
          codeStates['usecase_group'] = usecase_group83ab6;
          codeStates['setusecase_group'] = setusecase_group83ab6;
          codeStates['risktier_group'] = risktier_group88dc6;
          codeStates['setrisktier_group'] = setrisktier_group88dc6;
          codeStates['agentauthority_group'] = agentauthority_group4c81b;
          codeStates['setagentauthority_group'] = setagentauthority_group4c81b;
          codeStates['killswitch_group'] = killswitch_groupc3403;
          codeStates['setkillswitch_group'] = setkillswitch_groupc3403;
          codeStates['datahandled_group'] = datahandled_groupb59d4;
          codeStates['setdatahandled_group'] = setdatahandled_groupb59d4;
          codeStates['automateddecision_group'] = automateddecision_group912a5;
          codeStates['setautomateddecision_group'] = setautomateddecision_group912a5;
          codeStates['livesince_group'] = livesince_groupb984e;
          codeStates['setlivesince_group'] = setlivesince_groupb984e;
          codeStates['passportversion_group'] = passportversion_group27afa;
          codeStates['setpassportversion_group'] = setpassportversion_group27afa;
          codeStates['overall_ai_passport_tab_group'] = overall_ai_passport_tab_group92b9a;
          codeStates['setoverall_ai_passport_tab_group'] = setoverall_ai_passport_tab_group92b9a;
          codeStates['discovery_source_code'] = discovery_source_codebb08c;
          codeStates['setdiscovery_source_code'] = setdiscovery_source_codebb08c;
          codeStates['purpose_and_risk_group'] = purpose_and_risk_group39f23;
          codeStates['setpurpose_and_risk_group'] = setpurpose_and_risk_group39f23;
          codeStates['model_and_data_group'] = model_and_data_groupef6dc;
          codeStates['setmodel_and_data_group'] = setmodel_and_data_groupef6dc;
          codeStates['model_table'] = model_table0c788;
          codeStates['setmodel_table'] = setmodel_table0c788;
          codeStates['agent_controls_group'] = agent_controls_groupb0779;
          codeStates['setagent_controls_group'] = setagent_controls_groupb0779;
          codeStates['tool_and_permission_table'] = tool_and_permission_tableaa970;
          codeStates['settool_and_permission_table'] = settool_and_permission_tableaa970;
          codeStates['vevrsion_group'] = vevrsion_group032b2;
          codeStates['setvevrsion_group'] = setvevrsion_group032b2;
          codeStates['certification_group'] = certification_groupf95c3;
          codeStates['setcertification_group'] = setcertification_groupf95c3;
          codeStates['template_group'] = template_group89403;
          codeStates['settemplate_group'] = settemplate_group89403;
          codeStates['status_group'] = status_group01099;
          codeStates['setstatus_group'] = setstatus_group01099;
          codeStates['effective_group'] = effective_groupa2193;
          codeStates['seteffective_group'] = seteffective_groupa2193;
          codeStates['expiry_group'] = expiry_group2739d;
          codeStates['setexpiry_group'] = setexpiry_group2739d;
          codeStates['certified_by_group'] = certified_by_group1075c;
          codeStates['setcertified_by_group'] = setcertified_by_group1075c;
          codeStates['stage_decision_table'] = stage_decision_table3ec0b;
          codeStates['setstage_decision_table'] = setstage_decision_table3ec0b;
          codeStates['evidence_group'] = evidence_groupc23c4;
          codeStates['setevidence_group'] = setevidence_groupc23c4;
          codeStates['evidence_attached_table'] = evidence_attached_table6da8c;
          codeStates['setevidence_attached_table'] = setevidence_attached_table6da8c;
          codeStates['data_class_group'] = data_class_groupc7f3d;
          codeStates['setdata_class_group'] = setdata_class_groupc7f3d;
          codeStates['upstream_table'] = upstream_table1fd94;
          codeStates['setupstream_table'] = setupstream_table1fd94;
          codeStates['downstream_table'] = downstream_table9d391;
          codeStates['setdownstream_table'] = setdownstream_table9d391;
          codeStates['change_history_group'] = change_history_group5a983;
          codeStates['setchange_history_group'] = setchange_history_group5a983;
          codeStates['chnage_history_table'] = chnage_history_tableddb58;
          codeStates['setchnage_history_table'] = setchnage_history_tableddb58;
          codeStates['audit_group'] = audit_groupf8b5f;
          codeStates['setaudit_group'] = setaudit_groupf8b5f;
          codeStates['audit_table'] = audit_tablec41d7;
          codeStates['setaudit_table'] = setaudit_tablec41d7;
          const { codeExecution } = await import("../utils/codeExecution");
          codeExecution(code,codeStates);
        }   
        setInitialLoad(true);        
      } catch (err: any) {
        toast(err?.message, 'danger');
      }
    
    }else{
      toast('token not found','danger');
    }    
  }
  const handleClick = (): void => {
    routes.push("/");
  }
  const handleOnload = (): void => {
  }

  useEffect(() => {    
    setMemoryVariables((prev: Record<string, string>) => ({
      ...prev,
      screenName: screenName,    
    }))
    securityCheck().finally(() => onReady?.());
    handleOnload();
    setaipassport_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(aipassport_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
ai_passport_tab_group:ai_passport_tab_groupe8efb.ai_passport_tab_group,      }
      handleArtfactRule(aipassport_v1?._artfactPFRule_,data,allRuleData)
    }
  },[ai_passport_tab_groupe8efb.ai_passport_tab_group,])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setaipassport_v1((pre:any)=>({...pre,_selectedGroup_:""}))
      }
    };
      document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>

     <div className={clsx("",
        "w-full",
        isDark ? 'text-white' : 'text-black',
        isProcessing && "pointer-events-none select-none"
      )}

      ref={parentRef}
     style={{
        gridColumn: '',
        gridRow: '',
        gridAutoRows: '4px',
        columnGap: '0px',
        rowGap: '0px',
        display: "grid",
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: '',
        height: '',
        overflow: '',
        backgroundColor:bgStyle,
        backgroundImage:'',
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: '',
        color: textStyle,
       // minHeight: '100vh',
        ...(isHighContrast && {
          fontWeight: '500',
          borderWidth: '2px'
      })
      }}>
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="flex items-center gap-3 rounded-xl bg-neutral-900/80 px-6 py-4 text-sm text-white shadow-lg backdrop-blur">
            {/* Spinner */}
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

            {/* Text */}
            <span className="font-medium tracking-wide">
              Processing, please wait…
            </span>
          </div>
        </div>
      )}
        {checkoverall_ai_passport_group && initialLoad &&<Groupoverall_ai_passport_group
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          tableData={tableData}
          setTableData={setTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          controlData={controlData} 
          groupData={groupData}        />}
        
      </div> 
    </>
  )
}
    