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
  const {add_case_grouped126, setadd_case_grouped126}= useContext(TotalContext) as TotalContextProps
  const {add_case_grouped126Props, setadd_case_grouped126Props}= useContext(TotalContext) as TotalContextProps
  const {header_groupbd8a8, setheader_groupbd8a8}= useContext(TotalContext) as TotalContextProps
  const {header_groupbd8a8Props, setheader_groupbd8a8Props}= useContext(TotalContext) as TotalContextProps
  const {required_dociument_main_group255d1, setrequired_dociument_main_group255d1}= useContext(TotalContext) as TotalContextProps
  const {required_dociument_main_group255d1Props, setrequired_dociument_main_group255d1Props}= useContext(TotalContext) as TotalContextProps
  const {doc_table9c4f7, setdoc_table9c4f7}= useContext(TotalContext) as TotalContextProps
  const {doc_table9c4f7Props, setdoc_table9c4f7Props}= useContext(TotalContext) as TotalContextProps
  const {case_information_group48f3c, setcase_information_group48f3c}= useContext(TotalContext) as TotalContextProps
  const {case_information_group48f3cProps, setcase_information_group48f3cProps}= useContext(TotalContext) as TotalContextProps
  const {card_group4c709, setcard_group4c709}= useContext(TotalContext) as TotalContextProps
  const {card_group4c709Props, setcard_group4c709Props}= useContext(TotalContext) as TotalContextProps
  const {principal_group42235, setprincipal_group42235}= useContext(TotalContext) as TotalContextProps
  const {principal_group42235Props, setprincipal_group42235Props}= useContext(TotalContext) as TotalContextProps
  const {intrest_group65c3b, setintrest_group65c3b}= useContext(TotalContext) as TotalContextProps
  const {intrest_group65c3bProps, setintrest_group65c3bProps}= useContext(TotalContext) as TotalContextProps
  const {fees_group8c4a6, setfees_group8c4a6}= useContext(TotalContext) as TotalContextProps
  const {fees_group8c4a6Props, setfees_group8c4a6Props}= useContext(TotalContext) as TotalContextProps
  const {total_groupc52d3, settotal_groupc52d3}= useContext(TotalContext) as TotalContextProps
  const {total_groupc52d3Props, settotal_groupc52d3Props}= useContext(TotalContext) as TotalContextProps
  const {venue_details_group51614, setvenue_details_group51614}= useContext(TotalContext) as TotalContextProps
  const {venue_details_group51614Props, setvenue_details_group51614Props}= useContext(TotalContext) as TotalContextProps
  const {checklist_main_group2b466, setchecklist_main_group2b466}= useContext(TotalContext) as TotalContextProps
  const {checklist_main_group2b466Props, setchecklist_main_group2b466Props}= useContext(TotalContext) as TotalContextProps
  const {checklist_tablecafb0, setchecklist_tablecafb0}= useContext(TotalContext) as TotalContextProps
  const {checklist_tablecafb0Props, setchecklist_tablecafb0Props}= useContext(TotalContext) as TotalContextProps
  const {special_rules_group7ce9f, setspecial_rules_group7ce9f}= useContext(TotalContext) as TotalContextProps
  const {special_rules_group7ce9fProps, setspecial_rules_group7ce9fProps}= useContext(TotalContext) as TotalContextProps
  const {special_rules7f109, setspecial_rules7f109}= useContext(TotalContext) as TotalContextProps
  const {special_rules7f109Props, setspecial_rules7f109Props}= useContext(TotalContext) as TotalContextProps
  const {dynamic_iconc7b56, setdynamic_iconc7b56}= useContext(TotalContext) as TotalContextProps
  const {textdb2d4, settextdb2d4}= useContext(TotalContext) as TotalContextProps
  //////////////
  const handleCode=async () => {
    let code:any;
    //get orchestration data for icon
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "185e829724c63ba22f1107a22e37f109",
      "0cc589581fc87972ea2624d8f07c7b56"
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

  if (dynamic_iconc7b56?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `2 / 5`,gridRow: `2 / 9`, gap:``, height: `100%`, overflow: 'auto'
 }} >
    <Icon 
      className="!text-[#8A7A55]"
      data="MdWarningAmber"
      contentAlign={"center"}
    />
  </div>
  )
}

export default Icondynamic_icon
