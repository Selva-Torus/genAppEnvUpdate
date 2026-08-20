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
  const {groupdd3f6, setgroupdd3f6}= useContext(TotalContext) as TotalContextProps;
  const {groupdd3f6Props, setgroupdd3f6Props}= useContext(TotalContext) as TotalContextProps;
  const {text574c6, settext574c6}= useContext(TotalContext) as TotalContextProps;
  const {return_reason_dropdown6f51c, setreturn_reason_dropdown6f51c}= useContext(TotalContext) as TotalContextProps;
  const {closea52fd, setclosea52fd}= useContext(TotalContext) as TotalContextProps;
  const {savebe5ab, setsavebe5ab}= useContext(TotalContext) as TotalContextProps;
  const {text574c6Props, settext574c6Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[text574c6?.refresh])

  if (text574c6?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 24`,gridRow: `2 / 8`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset("Return Reason")}
</Text>
  </div>
  )
}

export default Texttext
