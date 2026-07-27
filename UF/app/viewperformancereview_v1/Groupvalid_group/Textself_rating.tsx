'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textself_rating = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {new_access_groupc5a99, setnew_access_groupc5a99}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc5a99Props, setnew_access_groupc5a99Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group002d0, setaccess_req__group002d0}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group002d0Props, setaccess_req__group002d0Props}= useContext(TotalContext) as TotalContextProps;
  const {valid_group3a8ab, setvalid_group3a8ab}= useContext(TotalContext) as TotalContextProps;
  const {valid_group3a8abProps, setvalid_group3a8abProps}= useContext(TotalContext) as TotalContextProps;
  const {ratingsa108f, setratingsa108f}= useContext(TotalContext) as TotalContextProps;
  const {self_ratingc8c53, setself_ratingc8c53}= useContext(TotalContext) as TotalContextProps;
  const {self_rating_progressd31b7, setself_rating_progressd31b7}= useContext(TotalContext) as TotalContextProps;
  const {manager_rating7a9e7, setmanager_rating7a9e7}= useContext(TotalContext) as TotalContextProps;
  const {manager_rating_progress0b73b, setmanager_rating_progress0b73b}= useContext(TotalContext) as TotalContextProps;
  const {final_ratingc093c, setfinal_ratingc093c}= useContext(TotalContext) as TotalContextProps;
  const {final_rating_progressfca5f, setfinal_rating_progressfca5f}= useContext(TotalContext) as TotalContextProps;
  const {addt__group6ba4f, setaddt__group6ba4f}= useContext(TotalContext) as TotalContextProps;
  const {addt__group6ba4fProps, setaddt__group6ba4fProps}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group613d2, setaddt__dts_group613d2}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group613d2Props, setaddt__dts_group613d2Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsb315b, setdynamicactionsb315b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsb315bProps, setdynamicactionsb315bProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[self_ratingc8c53?.refresh])

  if (self_ratingc8c53?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 7`,gridRow: `8 / 15`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset("Self Rating")}
</Text>
  </div>
  )
}

export default Textself_rating
