'use client'


import React, { useContext,useEffect } from 'react';
import { Icon } from '@/components/Icon';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
const Iconrules_icon = ({encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token:string = getCookie('token'); 
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  /////////////
  //another screen
  const {add_case_group1f6e4, setadd_case_group1f6e4}= useContext(TotalContext) as TotalContextProps
  const {add_case_group1f6e4Props, setadd_case_group1f6e4Props}= useContext(TotalContext) as TotalContextProps
  const {header_group3749a, setheader_group3749a}= useContext(TotalContext) as TotalContextProps
  const {header_group3749aProps, setheader_group3749aProps}= useContext(TotalContext) as TotalContextProps
  const {case_information_groupcec29, setcase_information_groupcec29}= useContext(TotalContext) as TotalContextProps
  const {case_information_groupcec29Props, setcase_information_groupcec29Props}= useContext(TotalContext) as TotalContextProps
  const {venue_groupa72d9, setvenue_groupa72d9}= useContext(TotalContext) as TotalContextProps
  const {venue_groupa72d9Props, setvenue_groupa72d9Props}= useContext(TotalContext) as TotalContextProps
  const {rules_iconfb03f, setrules_iconfb03f}= useContext(TotalContext) as TotalContextProps
  const {venue_special_rules_textecd92, setvenue_special_rules_textecd92}= useContext(TotalContext) as TotalContextProps
  const {special_rules2001a, setspecial_rules2001a}= useContext(TotalContext) as TotalContextProps
  const {venue_special_rules_divider206ab, setvenue_special_rules_divider206ab}= useContext(TotalContext) as TotalContextProps
  const {georgia_groupa636c, setgeorgia_groupa636c}= useContext(TotalContext) as TotalContextProps
  const {georgia_groupa636cProps, setgeorgia_groupa636cProps}= useContext(TotalContext) as TotalContextProps
  const {venue_special_rules_dividers28a68, setvenue_special_rules_dividers28a68}= useContext(TotalContext) as TotalContextProps
  const {georgias_groupbac01, setgeorgias_groupbac01}= useContext(TotalContext) as TotalContextProps
  const {georgias_groupbac01Props, setgeorgias_groupbac01Props}= useContext(TotalContext) as TotalContextProps
  const {venue_special_rules_dividerss0c16e, setvenue_special_rules_dividerss0c16e}= useContext(TotalContext) as TotalContextProps
  const {georgias_groupsbf356, setgeorgias_groupsbf356}= useContext(TotalContext) as TotalContextProps
  const {georgias_groupsbf356Props, setgeorgias_groupsbf356Props}= useContext(TotalContext) as TotalContextProps
  const {venue_special_rules_dividersssdcaab, setvenue_special_rules_dividersssdcaab}= useContext(TotalContext) as TotalContextProps
  const {georgiass_groups9e4dd, setgeorgiass_groups9e4dd}= useContext(TotalContext) as TotalContextProps
  const {georgiass_groups9e4ddProps, setgeorgiass_groups9e4ddProps}= useContext(TotalContext) as TotalContextProps
  const {venues_special_rules_dividerssss44419, setvenues_special_rules_dividerssss44419}= useContext(TotalContext) as TotalContextProps
  const {georgsiass_groups6bf7a, setgeorgsiass_groups6bf7a}= useContext(TotalContext) as TotalContextProps
  const {georgsiass_groups6bf7aProps, setgeorgsiass_groups6bf7aProps}= useContext(TotalContext) as TotalContextProps
  const {debtor_information_groupdfa55, setdebtor_information_groupdfa55}= useContext(TotalContext) as TotalContextProps
  const {debtor_information_groupdfa55Props, setdebtor_information_groupdfa55Props}= useContext(TotalContext) as TotalContextProps
  const {financial_details_grouped0d9, setfinancial_details_grouped0d9}= useContext(TotalContext) as TotalContextProps
  const {financial_details_grouped0d9Props, setfinancial_details_grouped0d9Props}= useContext(TotalContext) as TotalContextProps
  const {venue_details_group6a27a, setvenue_details_group6a27a}= useContext(TotalContext) as TotalContextProps
  const {venue_details_group6a27aProps, setvenue_details_group6a27aProps}= useContext(TotalContext) as TotalContextProps
  const {required_dociument_main_group3eb5b, setrequired_dociument_main_group3eb5b}= useContext(TotalContext) as TotalContextProps
  const {required_dociument_main_group3eb5bProps, setrequired_dociument_main_group3eb5bProps}= useContext(TotalContext) as TotalContextProps
  const {doc_tablee79c7, setdoc_tablee79c7}= useContext(TotalContext) as TotalContextProps
  const {doc_tablee79c7Props, setdoc_tablee79c7Props}= useContext(TotalContext) as TotalContextProps
  const {checklist_main_group5b62e, setchecklist_main_group5b62e}= useContext(TotalContext) as TotalContextProps
  const {checklist_main_group5b62eProps, setchecklist_main_group5b62eProps}= useContext(TotalContext) as TotalContextProps
  const {checklist_table45abc, setchecklist_table45abc}= useContext(TotalContext) as TotalContextProps
  const {checklist_table45abcProps, setchecklist_table45abcProps}= useContext(TotalContext) as TotalContextProps
  //////////////
  const handleCode=async () => {
    let code:any;
    //get orchestration data for icon
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "ec222c2350517802d6fc59b9deaa72d9",
      "0dd74c9fb7392409220af1e786efb03f"
    );
    code=orchestrationData?.data?.code
    if (code == '') {
      //toast(code?.data?.errorDetails?.message, 'danger')
      //return
    }  else if (code != '') {
      let codeStates: any = {}
      codeExecution(code,codeStates)
    }
  }

  useEffect(() => {
    handleCode()
  }, [])

  if (rules_iconfb03f?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `2 / 5`,gridRow: `6 / 16`, gap:``, height: `100%`, overflow: 'auto'
 }} >
    <Icon 
      className="class=&#34;w-12 h-12 rounded-full bg-[#FDE68A] flex items-center justify-center"
      data="MdGavel"
      contentAlign={"center"}
    />
  </div>
  )
}

export default Iconrules_icon
