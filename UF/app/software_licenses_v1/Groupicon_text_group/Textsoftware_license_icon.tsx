'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textsoftware_license_icon = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_softwarelicenses_group04cba, setoverall_softwarelicenses_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_softwarelicenses_group04cbaProps, setoverall_softwarelicenses_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group44cf7, seticon_text_group44cf7}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group44cf7Props, seticon_text_group44cf7Props}= useContext(TotalContext) as TotalContextProps;
  const {software_license_iconfe876, setsoftware_license_iconfe876}= useContext(TotalContext) as TotalContextProps;
  const {software_license_text8a69d, setsoftware_license_text8a69d}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_table75a5d, setsoftware_licenses_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_table75a5dProps, setsoftware_licenses_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[software_license_iconfe876?.refresh])

  if (software_license_iconfe876?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 5`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=" !text-gray-900 !font-bold"
  variant="subheader-1"
  color="primary"
  icon="MdAllInbox"
  iconSize={28}
  iconDisplay="Icon only"
>
</Text>
  </div>
  )
}

export default Textsoftware_license_icon
