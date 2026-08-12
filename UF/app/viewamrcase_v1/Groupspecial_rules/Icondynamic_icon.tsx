'use client'


import React, { useContext,useEffect } from 'react';
import { Icon } from '@/components/Icon';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { useGlobal } from '@/context/GlobalContext'
const Icondynamic_icon = ({encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  /////////////
  //another screen
  const {add_case_groupbe1de, setadd_case_groupbe1de}= useContext(TotalContext) as TotalContextProps
  const {add_case_groupbe1deProps, setadd_case_groupbe1deProps}= useContext(TotalContext) as TotalContextProps
  const {header_groupc587e, setheader_groupc587e}= useContext(TotalContext) as TotalContextProps
  const {header_groupc587eProps, setheader_groupc587eProps}= useContext(TotalContext) as TotalContextProps
  const {required_dociument_main_group6f022, setrequired_dociument_main_group6f022}= useContext(TotalContext) as TotalContextProps
  const {required_dociument_main_group6f022Props, setrequired_dociument_main_group6f022Props}= useContext(TotalContext) as TotalContextProps
  const {doc_table8bfa1, setdoc_table8bfa1}= useContext(TotalContext) as TotalContextProps
  const {doc_table8bfa1Props, setdoc_table8bfa1Props}= useContext(TotalContext) as TotalContextProps
  const {case_information_groupe3c1b, setcase_information_groupe3c1b}= useContext(TotalContext) as TotalContextProps
  const {case_information_groupe3c1bProps, setcase_information_groupe3c1bProps}= useContext(TotalContext) as TotalContextProps
  const {card_group7fa83, setcard_group7fa83}= useContext(TotalContext) as TotalContextProps
  const {card_group7fa83Props, setcard_group7fa83Props}= useContext(TotalContext) as TotalContextProps
  const {principal_groupde6dd, setprincipal_groupde6dd}= useContext(TotalContext) as TotalContextProps
  const {principal_groupde6ddProps, setprincipal_groupde6ddProps}= useContext(TotalContext) as TotalContextProps
  const {intrest_group44b4d, setintrest_group44b4d}= useContext(TotalContext) as TotalContextProps
  const {intrest_group44b4dProps, setintrest_group44b4dProps}= useContext(TotalContext) as TotalContextProps
  const {fees_groupee523, setfees_groupee523}= useContext(TotalContext) as TotalContextProps
  const {fees_groupee523Props, setfees_groupee523Props}= useContext(TotalContext) as TotalContextProps
  const {total_groupd3e06, settotal_groupd3e06}= useContext(TotalContext) as TotalContextProps
  const {total_groupd3e06Props, settotal_groupd3e06Props}= useContext(TotalContext) as TotalContextProps
  const {venue_details_group1d734, setvenue_details_group1d734}= useContext(TotalContext) as TotalContextProps
  const {venue_details_group1d734Props, setvenue_details_group1d734Props}= useContext(TotalContext) as TotalContextProps
  const {checklist_main_group32240, setchecklist_main_group32240}= useContext(TotalContext) as TotalContextProps
  const {checklist_main_group32240Props, setchecklist_main_group32240Props}= useContext(TotalContext) as TotalContextProps
  const {checklist_tablee7dea, setchecklist_tablee7dea}= useContext(TotalContext) as TotalContextProps
  const {checklist_tablee7deaProps, setchecklist_tablee7deaProps}= useContext(TotalContext) as TotalContextProps
  const {special_rules_groupf22ab, setspecial_rules_groupf22ab}= useContext(TotalContext) as TotalContextProps
  const {special_rules_groupf22abProps, setspecial_rules_groupf22abProps}= useContext(TotalContext) as TotalContextProps
  const {special_rules96aec, setspecial_rules96aec}= useContext(TotalContext) as TotalContextProps
  const {special_rules96aecProps, setspecial_rules96aecProps}= useContext(TotalContext) as TotalContextProps
  const {dynamic_icon8f352, setdynamic_icon8f352}= useContext(TotalContext) as TotalContextProps
  const {rules_text55ce9, setrules_text55ce9}= useContext(TotalContext) as TotalContextProps
  //////////////
  const handleCode=async () => {
    let code:any;
    //get orchestration data for icon
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "6c6f64ede0d44ab186cc0171c6c96aec",
      "fd3f0c1039a54f709db204207d28f352"
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

  if (dynamic_icon8f352?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `1 / 4`,gridRow: `3 / 11`, gap:``, height: `100%`, overflow: 'auto'
 }} >
    <Icon 
      className="!text-[#f1bf09]"
      data="MdWarning"
      contentAlign={"center"}
    />
  </div>
  )
}

export default Icondynamic_icon
