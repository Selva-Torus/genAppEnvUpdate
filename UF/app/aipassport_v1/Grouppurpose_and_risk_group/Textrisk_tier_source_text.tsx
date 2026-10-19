'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { useGlobal } from '@/context/GlobalContext'
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textrisk_tier_source_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
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
  const {purpose_text42ab2, setpurpose_text42ab2}= useContext(TotalContext) as TotalContextProps;
  const {risk_classification_text9aa44, setrisk_classification_text9aa44}= useContext(TotalContext) as TotalContextProps;
  const {usecase_text93c10, setusecase_text93c10}= useContext(TotalContext) as TotalContextProps;
  const {use_case_codeeba71, setuse_case_codeeba71}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_source_text00376, setrisk_tier_source_text00376}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_source1b2de, setrisk_tier_source1b2de}= useContext(TotalContext) as TotalContextProps;
  const {divider100a2443, setdivider100a2443}= useContext(TotalContext) as TotalContextProps;
  const {divider5006844a, setdivider5006844a}= useContext(TotalContext) as TotalContextProps;
  const {business_criticality_textde6e9, setbusiness_criticality_textde6e9}= useContext(TotalContext) as TotalContextProps;
  const {criticality_codeac572, setcriticality_codeac572}= useContext(TotalContext) as TotalContextProps;
  const {derived_by_rule_textf6c12, setderived_by_rule_textf6c12}= useContext(TotalContext) as TotalContextProps;
  const {rule_code04b08, setrule_code04b08}= useContext(TotalContext) as TotalContextProps;
  const {divider20025cab, setdivider20025cab}= useContext(TotalContext) as TotalContextProps;
  const {divider6000db29, setdivider6000db29}= useContext(TotalContext) as TotalContextProps;
  const {is_customer_facing_text5159f, setis_customer_facing_text5159f}= useContext(TotalContext) as TotalContextProps;
  const {is_customer_facingc6e97, setis_customer_facingc6e97}= useContext(TotalContext) as TotalContextProps;
  const {data_handled_text7cbe4, setdata_handled_text7cbe4}= useContext(TotalContext) as TotalContextProps;
  const {data_class_code9596f, setdata_class_code9596f}= useContext(TotalContext) as TotalContextProps;
  const {divider30005f2d, setdivider30005f2d}= useContext(TotalContext) as TotalContextProps;
  const {divider70091ce3, setdivider70091ce3}= useContext(TotalContext) as TotalContextProps;
  const {is_automated_decision_text8dadd, setis_automated_decision_text8dadd}= useContext(TotalContext) as TotalContextProps;
  const {is_automated_decision9347b, setis_automated_decision9347b}= useContext(TotalContext) as TotalContextProps;
  const {confirmed_text38241, setconfirmed_text38241}= useContext(TotalContext) as TotalContextProps;
  const {assessed_one03a4, setassessed_one03a4}= useContext(TotalContext) as TotalContextProps;
  const {divider40092f76, setdivider40092f76}= useContext(TotalContext) as TotalContextProps;
  const {divider80090d9f, setdivider80090d9f}= useContext(TotalContext) as TotalContextProps;
  const {regulatory_mapping_textbd0fa, setregulatory_mapping_textbd0fa}= useContext(TotalContext) as TotalContextProps;
  const {regulatory_text860a8, setregulatory_text860a8}= useContext(TotalContext) as TotalContextProps;
  const {regulatory68d33, setregulatory68d33}= useContext(TotalContext) as TotalContextProps;
  const {divider9001ae4b, setdivider9001ae4b}= useContext(TotalContext) as TotalContextProps;
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
  const {risk_tier_source_text00376Props, setrisk_tier_source_text00376Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[risk_tier_source_text00376?.refresh])

  if (risk_tier_source_text00376?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `13 / 19`,gridRow: `8 / 14`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset("Risk Tier Source")}
</Text>
  </div>
  )
}

export default Textrisk_tier_source_text
