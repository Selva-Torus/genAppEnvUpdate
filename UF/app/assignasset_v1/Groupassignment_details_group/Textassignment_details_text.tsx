'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textassignment_details_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {assign_asset_groupdb5a7, setassign_asset_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {assign_asset_groupdb5a7Props, setassign_asset_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_group5d144, setassignment_information_group5d144}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_group5d144Props, setassignment_information_group5d144Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group7f60d, setassignment_details_group7f60d}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group7f60dProps, setassignment_details_group7f60dProps}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_textb98b6, setassignment_details_textb98b6}= useContext(TotalContext) as TotalContextProps;
  const {actual_return_date06574, setactual_return_date06574}= useContext(TotalContext) as TotalContextProps;
  const {returned_atb4ccc, setreturned_atb4ccc}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_return40b7c, setcondition_at_return40b7c}= useContext(TotalContext) as TotalContextProps;
  const {approved_by8c220, setapproved_by8c220}= useContext(TotalContext) as TotalContextProps;
  const {approval_statuseb2b2, setapproval_statuseb2b2}= useContext(TotalContext) as TotalContextProps;
  const {assignment_notese758f, setassignment_notese758f}= useContext(TotalContext) as TotalContextProps;
  const {acknowledgement_signedfdaee, setacknowledgement_signedfdaee}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions956ba, setdynamicactions956ba}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions956baProps, setdynamicactions956baProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[assignment_details_textb98b6?.refresh])

  if (assignment_details_textb98b6?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 14`,gridRow: `1 / 8`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="header-1"
  color="primary"
>
      {keyset("Assignment Details")}
</Text>
  </div>
  )
}

export default Textassignment_details_text
