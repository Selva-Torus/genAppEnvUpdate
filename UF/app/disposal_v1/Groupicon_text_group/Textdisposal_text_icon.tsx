'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textdisposal_text_icon = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_disposal_group04cba, setoverall_disposal_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_disposal_group04cbaProps, setoverall_disposal_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group23d8c, seticon_text_group23d8c}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group23d8cProps, seticon_text_group23d8cProps}= useContext(TotalContext) as TotalContextProps;
  const {disposal_text_icon59950, setdisposal_text_icon59950}= useContext(TotalContext) as TotalContextProps;
  const {disposal_text2d2ac, setdisposal_text2d2ac}= useContext(TotalContext) as TotalContextProps;
  const {disposal_table75a5d, setdisposal_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {disposal_table75a5dProps, setdisposal_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[disposal_text_icon59950?.refresh])

  if (disposal_text_icon59950?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 5`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className="!text-gray-900 !font-bold"
  variant="subheader-1"
  color="primary"
  icon="MdOutlineDelete"
  iconSize={28}
  iconDisplay="Icon only"
>
</Text>
  </div>
  )
}

export default Textdisposal_text_icon
