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

const Textai_dataclass_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_ai_data_class7e3b7, setoverall_ai_data_class7e3b7}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_data_class7e3b7Props, setoverall_ai_data_class7e3b7Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_group81854, setai_dataclass_group81854}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_group81854Props, setai_dataclass_group81854Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group57c68, setai_registry_text_group57c68}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group57c68Props, setai_registry_text_group57c68Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_text7841b, setai_dataclass_text7841b}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_textsbf22a, setai_dataclass_textsbf22a}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_tabledf39c, setai_dataclass_tabledf39c}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_tabledf39cProps, setai_dataclass_tabledf39cProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_text7841bProps, setai_dataclass_text7841bProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[ai_dataclass_text7841b?.refresh])

  if (ai_dataclass_text7841b?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-gray-900 !font-bold"
  variant="subheader-2"
  color="primary"
>
      {keyset("AI Data Class")}
</Text>
  </div>
  )
}

export default Textai_dataclass_text
