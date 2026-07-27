'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textcomments = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {new_access_groupfa034, setnew_access_groupfa034}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupfa034Props, setnew_access_groupfa034Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupdb1de, setaccess_req__groupdb1de}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupdb1deProps, setaccess_req__groupdb1deProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupb4569, setvalid_groupb4569}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupb4569Props, setvalid_groupb4569Props}= useContext(TotalContext) as TotalContextProps;
  const {addt__group82d26, setaddt__group82d26}= useContext(TotalContext) as TotalContextProps;
  const {addt__group82d26Props, setaddt__group82d26Props}= useContext(TotalContext) as TotalContextProps;
  const {commentsd3579, setcommentsd3579}= useContext(TotalContext) as TotalContextProps;
  const {improvementsd073c, setimprovementsd073c}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group7fd81, setaddt__dts_group7fd81}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group7fd81Props, setaddt__dts_group7fd81Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions31354, setdynamicactions31354}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions31354Props, setdynamicactions31354Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[commentsd3579?.refresh])

  if (commentsd3579?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 12`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold"
  variant="subheader-1"
  color="primary"
>
      {keyset("Comments")}
</Text>
  </div>
  )
}

export default Textcomments
