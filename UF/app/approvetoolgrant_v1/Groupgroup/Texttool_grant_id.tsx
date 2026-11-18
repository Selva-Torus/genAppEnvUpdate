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

const Texttool_grant_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {group8f0c2, setgroup8f0c2}= useContext(TotalContext) as TotalContextProps;
  const {group8f0c2Props, setgroup8f0c2Props}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group410a7, settemplate_detail_group410a7}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group410a7Props, settemplate_detail_group410a7Props}= useContext(TotalContext) as TotalContextProps;
  const {groupsae790, setgroupsae790}= useContext(TotalContext) as TotalContextProps;
  const {groupsae790Props, setgroupsae790Props}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_id32a6f, settool_grant_id32a6f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction9560b, setdynamicaction9560b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction9560bProps, setdynamicaction9560bProps}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_id32a6fProps, settool_grant_id32a6fProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[tool_grant_id32a6f?.refresh])

  if (tool_grant_id32a6f?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 2`,gridRow: `93 / 94`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.tool_grant_id : (group8f0c2?.tool_grant_id || ""))}
</Text>
  </div>
  )
}

export default Texttool_grant_id
