'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textdisposal_details_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {new_asset_group3261e, setnew_asset_group3261e}= useContext(TotalContext) as TotalContextProps;
  const {new_asset_group3261eProps, setnew_asset_group3261eProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupcc113, setasset_info_groupcc113}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupcc113Props, setasset_info_groupcc113Props}= useContext(TotalContext) as TotalContextProps;
  const {classification_groupd9d65, setclassification_groupd9d65}= useContext(TotalContext) as TotalContextProps;
  const {classification_groupd9d65Props, setclassification_groupd9d65Props}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_groupaff35, setadditional_details_groupaff35}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_groupaff35Props, setadditional_details_groupaff35Props}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_groupc3900, setpyrchase_details_groupc3900}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_groupc3900Props, setpyrchase_details_groupc3900Props}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_group67f77, setdisposal_details_group67f77}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_group67f77Props, setdisposal_details_group67f77Props}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_textb2754, setdisposal_details_textb2754}= useContext(TotalContext) as TotalContextProps;
  const {disposal_method1fd3c, setdisposal_method1fd3c}= useContext(TotalContext) as TotalContextProps;
  const {disposal_dateb9385, setdisposal_dateb9385}= useContext(TotalContext) as TotalContextProps;
  const {disposal_ref35f4b, setdisposal_ref35f4b}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[disposal_details_textb2754?.refresh])

  if (disposal_details_textb2754?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 15`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold"
  variant="subheader-3"
  color="primary"
>
      {keyset("Disposal Details")}
</Text>
  </div>
  )
}

export default Textdisposal_details_text
