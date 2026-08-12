'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Dividerdividersss = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing,controlData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {add_case_group4945a, setadd_case_group4945a}= useContext(TotalContext) as TotalContextProps;
  const {add_case_group4945aProps, setadd_case_group4945aProps}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf55cb, setheader_groupf55cb}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf55cbProps, setheader_groupf55cbProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_groupdfaaf, setrequired_dociument_main_groupdfaaf}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_groupdfaafProps, setrequired_dociument_main_groupdfaafProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8af83, setdoc_table8af83}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8af83Props, setdoc_table8af83Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group40df6, setcase_information_group40df6}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group40df6Props, setcase_information_group40df6Props}= useContext(TotalContext) as TotalContextProps;
  const {card_group00ce3, setcard_group00ce3}= useContext(TotalContext) as TotalContextProps;
  const {card_group00ce3Props, setcard_group00ce3Props}= useContext(TotalContext) as TotalContextProps;
  const {principal_group510ca, setprincipal_group510ca}= useContext(TotalContext) as TotalContextProps;
  const {principal_group510caProps, setprincipal_group510caProps}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group1ba85, setintrest_group1ba85}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group1ba85Props, setintrest_group1ba85Props}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupbee4a, setfees_groupbee4a}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupbee4aProps, setfees_groupbee4aProps}= useContext(TotalContext) as TotalContextProps;
  const {total_group197f6, settotal_group197f6}= useContext(TotalContext) as TotalContextProps;
  const {total_group197f6Props, settotal_group197f6Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group5f664, setvenue_details_group5f664}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group5f664Props, setvenue_details_group5f664Props}= useContext(TotalContext) as TotalContextProps;
  const {ven_name_textb2d6a, setven_name_textb2d6a}= useContext(TotalContext) as TotalContextProps;
  const {text_stateb7b09, settext_stateb7b09}= useContext(TotalContext) as TotalContextProps;
  const {state7419e, setstate7419e}= useContext(TotalContext) as TotalContextProps;
  const {dividers23b80, setdividers23b80}= useContext(TotalContext) as TotalContextProps;
  const {text1eec9, settext1eec9}= useContext(TotalContext) as TotalContextProps;
  const {countyb406d, setcountyb406d}= useContext(TotalContext) as TotalContextProps;
  const {dividerss87146, setdividerss87146}= useContext(TotalContext) as TotalContextProps;
  const {text_courtc793b, settext_courtc793b}= useContext(TotalContext) as TotalContextProps;
  const {court02ff6, setcourt02ff6}= useContext(TotalContext) as TotalContextProps;
  const {dividersss1271b, setdividersss1271b}= useContext(TotalContext) as TotalContextProps;
  const {text_judgeba2cd, settext_judgeba2cd}= useContext(TotalContext) as TotalContextProps;
  const {judge65dff, setjudge65dff}= useContext(TotalContext) as TotalContextProps;
  const {dividerssssedbaf, setdividerssssedbaf}= useContext(TotalContext) as TotalContextProps;
  const {text_filing_fee56d8d, settext_filing_fee56d8d}= useContext(TotalContext) as TotalContextProps;
  const {filing_fee3e689, setfiling_fee3e689}= useContext(TotalContext) as TotalContextProps;
  const {dividersssssc1504, setdividersssssc1504}= useContext(TotalContext) as TotalContextProps;
  const {text_service_methodabd13, settext_service_methodabd13}= useContext(TotalContext) as TotalContextProps;
  const {service_method624d8, setservice_method624d8}= useContext(TotalContext) as TotalContextProps;
  const {dividerssssss6b575, setdividerssssss6b575}= useContext(TotalContext) as TotalContextProps;
  const {text_efile_system7e43b, settext_efile_system7e43b}= useContext(TotalContext) as TotalContextProps;
  const {efile_system553b3, setefile_system553b3}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2d71b, setchecklist_main_group2d71b}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2d71bProps, setchecklist_main_group2d71bProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablec0934, setchecklist_tablec0934}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablec0934Props, setchecklist_tablec0934Props}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group47bec, setspecial_rules_group47bec}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group47becProps, setspecial_rules_group47becProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules3c582, setspecial_rules3c582}= useContext(TotalContext) as TotalContextProps;
  const {special_rules3c582Props, setspecial_rules3c582Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[dividersss1271b?.refresh])

  if (dividersss1271b?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `53 / 56`, gap:``, height: `100%`}} >
<Divider
  className=""
  direction="horizontal"
  position="middle"
  color="#b5b5b5"
  thickness={2}
/>
  </div>
  )
}

export default Dividerdividersss
