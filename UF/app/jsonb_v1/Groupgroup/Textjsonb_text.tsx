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

const Textjsonb_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {group90e92, setgroup90e92}= useContext(TotalContext) as TotalContextProps;
  const {group90e92Props, setgroup90e92Props}= useContext(TotalContext) as TotalContextProps;
  const {jsonb_textb0818, setjsonb_textb0818}= useContext(TotalContext) as TotalContextProps;
  const {employee_name9e7d9, setemployee_name9e7d9}= useContext(TotalContext) as TotalContextProps;
  const {employee_infoa1b53, setemployee_infoa1b53}= useContext(TotalContext) as TotalContextProps;
  const {jsoneditor0b2fe, setjsoneditor0b2fe}= useContext(TotalContext) as TotalContextProps;
  const {savee80dc, setsavee80dc}= useContext(TotalContext) as TotalContextProps;
  const {jsonb_textb0818Props, setjsonb_textb0818Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[jsonb_textb0818?.refresh])

  if (jsonb_textb0818?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `10 / 16`,gridRow: `8 / 18`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="display-1"
  color="primary"
>
      {keyset("JsonB")}
</Text>
  </div>
  )
}

export default Textjsonb_text
