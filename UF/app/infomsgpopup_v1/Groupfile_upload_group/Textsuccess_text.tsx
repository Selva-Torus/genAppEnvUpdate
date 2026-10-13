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

const Textsuccess_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {file_upload_groupfa783, setfile_upload_groupfa783}= useContext(TotalContext) as TotalContextProps;
  const {file_upload_groupfa783Props, setfile_upload_groupfa783Props}= useContext(TotalContext) as TotalContextProps;
  const {icon12b96, seticon12b96}= useContext(TotalContext) as TotalContextProps;
  const {success_textd0c07, setsuccess_textd0c07}= useContext(TotalContext) as TotalContextProps;
  const {file_upload_success9ee39, setfile_upload_success9ee39}= useContext(TotalContext) as TotalContextProps;
  const {dividerdb2f5, setdividerdb2f5}= useContext(TotalContext) as TotalContextProps;
  const {okk_btn97301, setokk_btn97301}= useContext(TotalContext) as TotalContextProps;
  const {success_textd0c07Props, setsuccess_textd0c07Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[success_textd0c07?.refresh])

  if (success_textd0c07?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `5 / 21`,gridRow: `24 / 34`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className="!text-[#2f53d5] !font-bold"
  variant="header-2"
  color="primary"
>
      {keyset("Success")}
</Text>
  </div>
  )
}

export default Textsuccess_text
