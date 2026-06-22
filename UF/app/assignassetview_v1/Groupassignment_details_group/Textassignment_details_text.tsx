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
  const {assign_asset_groupb4f2d, setassign_asset_groupb4f2d}= useContext(TotalContext) as TotalContextProps;
  const {assign_asset_groupb4f2dProps, setassign_asset_groupb4f2dProps}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_groupc96e9, setassignment_information_groupc96e9}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_groupc96e9Props, setassignment_information_groupc96e9Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group136e4, setassignment_details_group136e4}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group136e4Props, setassignment_details_group136e4Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_text97d83, setassignment_details_text97d83}= useContext(TotalContext) as TotalContextProps;
  const {actual_return_datec1f64, setactual_return_datec1f64}= useContext(TotalContext) as TotalContextProps;
  const {returned_atecafb, setreturned_atecafb}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_return1d3c7, setcondition_at_return1d3c7}= useContext(TotalContext) as TotalContextProps;
  const {approved_by2b89c, setapproved_by2b89c}= useContext(TotalContext) as TotalContextProps;
  const {approval_statusf07b0, setapproval_statusf07b0}= useContext(TotalContext) as TotalContextProps;
  const {acknowledgement_signed5ee58, setacknowledgement_signed5ee58}= useContext(TotalContext) as TotalContextProps;
  const {assignment_notes59be1, setassignment_notes59be1}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[assignment_details_text97d83?.refresh])

  if (assignment_details_text97d83?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 14`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold"
  variant="subheader-3"
  color="primary"
>
      {keyset("Assignment Details")}
</Text>
  </div>
  )
}

export default Textassignment_details_text
