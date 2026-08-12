'use client'


import React, { useContext,useEffect } from 'react';
import { Icon } from '@/components/Icon';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { useGlobal } from '@/context/GlobalContext'
const Iconwarnings_icon = ({encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  /////////////
  //another screen
  const {add_case_groupeb161, setadd_case_groupeb161}= useContext(TotalContext) as TotalContextProps
  const {add_case_groupeb161Props, setadd_case_groupeb161Props}= useContext(TotalContext) as TotalContextProps
  const {header_group4878f, setheader_group4878f}= useContext(TotalContext) as TotalContextProps
  const {header_group4878fProps, setheader_group4878fProps}= useContext(TotalContext) as TotalContextProps
  const {dynamicactions094c3, setdynamicactions094c3}= useContext(TotalContext) as TotalContextProps
  const {dynamicactions094c3Props, setdynamicactions094c3Props}= useContext(TotalContext) as TotalContextProps
  const {case_information_group28f6f, setcase_information_group28f6f}= useContext(TotalContext) as TotalContextProps
  const {case_information_group28f6fProps, setcase_information_group28f6fProps}= useContext(TotalContext) as TotalContextProps
  const {venue_group6a36d, setvenue_group6a36d}= useContext(TotalContext) as TotalContextProps
  const {venue_group6a36dProps, setvenue_group6a36dProps}= useContext(TotalContext) as TotalContextProps
  const {georgia_group0fa18, setgeorgia_group0fa18}= useContext(TotalContext) as TotalContextProps
  const {georgia_group0fa18Props, setgeorgia_group0fa18Props}= useContext(TotalContext) as TotalContextProps
  const {georgias_group945fd, setgeorgias_group945fd}= useContext(TotalContext) as TotalContextProps
  const {georgias_group945fdProps, setgeorgias_group945fdProps}= useContext(TotalContext) as TotalContextProps
  const {warnings_icon63b3d, setwarnings_icon63b3d}= useContext(TotalContext) as TotalContextProps
  const {georgias_sol_textea2e1, setgeorgias_sol_textea2e1}= useContext(TotalContext) as TotalContextProps
  const {specials_rulesb4b8b, setspecials_rulesb4b8b}= useContext(TotalContext) as TotalContextProps
  const {georgias_groups6f85f, setgeorgias_groups6f85f}= useContext(TotalContext) as TotalContextProps
  const {georgias_groups6f85fProps, setgeorgias_groups6f85fProps}= useContext(TotalContext) as TotalContextProps
  const {georgiass_groups86a87, setgeorgiass_groups86a87}= useContext(TotalContext) as TotalContextProps
  const {georgiass_groups86a87Props, setgeorgiass_groups86a87Props}= useContext(TotalContext) as TotalContextProps
  const {georgsiass_groupsb044a, setgeorgsiass_groupsb044a}= useContext(TotalContext) as TotalContextProps
  const {georgsiass_groupsb044aProps, setgeorgsiass_groupsb044aProps}= useContext(TotalContext) as TotalContextProps
  const {debtor_information_group78a70, setdebtor_information_group78a70}= useContext(TotalContext) as TotalContextProps
  const {debtor_information_group78a70Props, setdebtor_information_group78a70Props}= useContext(TotalContext) as TotalContextProps
  const {financial_details_group52f47, setfinancial_details_group52f47}= useContext(TotalContext) as TotalContextProps
  const {financial_details_group52f47Props, setfinancial_details_group52f47Props}= useContext(TotalContext) as TotalContextProps
  const {venue_details_group17ac6, setvenue_details_group17ac6}= useContext(TotalContext) as TotalContextProps
  const {venue_details_group17ac6Props, setvenue_details_group17ac6Props}= useContext(TotalContext) as TotalContextProps
  const {required_dociument_main_group04e92, setrequired_dociument_main_group04e92}= useContext(TotalContext) as TotalContextProps
  const {required_dociument_main_group04e92Props, setrequired_dociument_main_group04e92Props}= useContext(TotalContext) as TotalContextProps
  const {required_dociument_header_groupe39c8, setrequired_dociument_header_groupe39c8}= useContext(TotalContext) as TotalContextProps
  const {required_dociument_header_groupe39c8Props, setrequired_dociument_header_groupe39c8Props}= useContext(TotalContext) as TotalContextProps
  const {doc_type_tablebe9fa, setdoc_type_tablebe9fa}= useContext(TotalContext) as TotalContextProps
  const {doc_type_tablebe9faProps, setdoc_type_tablebe9faProps}= useContext(TotalContext) as TotalContextProps
  const {checklist_main_group0df6b, setchecklist_main_group0df6b}= useContext(TotalContext) as TotalContextProps
  const {checklist_main_group0df6bProps, setchecklist_main_group0df6bProps}= useContext(TotalContext) as TotalContextProps
  const {checklist_group32b3d, setchecklist_group32b3d}= useContext(TotalContext) as TotalContextProps
  const {checklist_group32b3dProps, setchecklist_group32b3dProps}= useContext(TotalContext) as TotalContextProps
  const {checklist_table198e1, setchecklist_table198e1}= useContext(TotalContext) as TotalContextProps
  const {checklist_table198e1Props, setchecklist_table198e1Props}= useContext(TotalContext) as TotalContextProps
  //////////////
  const handleCode=async () => {
    let code:any;
    //get orchestration data for icon
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "a80b3abb0dbf4486aa4eb364aa6945fd",
      "4657a0971aba4b50af1ed47f43063b3d"
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

  if (warnings_icon63b3d?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `1 / 5`,gridRow: `1 / 11`, gap:``, height: `100%`, overflow: 'auto'
 }} >
    <Icon 
      className="class=&#34;pi pi-user text-[#daad2f] text-2xl"
      data="MdWarning"
      contentAlign={"center"}
    />
  </div>
  )
}

export default Iconwarnings_icon
