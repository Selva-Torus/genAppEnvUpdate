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

const Texttext = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {group6f5e6, setgroup6f5e6}= useContext(TotalContext) as TotalContextProps;
  const {group6f5e6Props, setgroup6f5e6Props}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_group3cc06, setstage_details_group3cc06}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_group3cc06Props, setstage_details_group3cc06Props}= useContext(TotalContext) as TotalContextProps;
  const {text0cd7b, settext0cd7b}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_name79179, setcert_template_name79179}= useContext(TotalContext) as TotalContextProps;
  const {stage_sequencefde55, setstage_sequencefde55}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_codefe371, setstage_type_codefe371}= useContext(TotalContext) as TotalContextProps;
  const {stage_namef712f, setstage_namef712f}= useContext(TotalContext) as TotalContextProps;
  const {approver_role_id278bd, setapprover_role_id278bd}= useContext(TotalContext) as TotalContextProps;
  const {sla_days5202a, setsla_days5202a}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group8a0a2, setevidence_configuration_group8a0a2}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group8a0a2Props, setevidence_configuration_group8a0a2Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction218e0, setdynamicaction218e0}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction218e0Props, setdynamicaction218e0Props}= useContext(TotalContext) as TotalContextProps;
  const {text0cd7bProps, settext0cd7bProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[text0cd7b?.refresh])

  if (text0cd7b?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 10`,gridRow: `1 / 13`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-2"
  color="primary"
>
      {keyset("Stage Details")}
</Text>
  </div>
  )
}

export default Texttext
