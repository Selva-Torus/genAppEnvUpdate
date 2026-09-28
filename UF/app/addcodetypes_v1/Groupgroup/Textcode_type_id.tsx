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

const Textcode_type_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {groupa1a96, setgroupa1a96}= useContext(TotalContext) as TotalContextProps;
  const {groupa1a96Props, setgroupa1a96Props}= useContext(TotalContext) as TotalContextProps;
  const {code_type_informationd59aa, setcode_type_informationd59aa}= useContext(TotalContext) as TotalContextProps;
  const {code_type_informationd59aaProps, setcode_type_informationd59aaProps}= useContext(TotalContext) as TotalContextProps;
  const {code_type_id981b3, setcode_type_id981b3}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions48144, setdynamicactions48144}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions48144Props, setdynamicactions48144Props}= useContext(TotalContext) as TotalContextProps;
  const {code_type_id981b3Props, setcode_type_id981b3Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[code_type_id981b3?.refresh])

  if (code_type_id981b3?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 3`,gridRow: `30 / 31`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.code_type_id : (groupa1a96?.code_type_id || ""))}
</Text>
  </div>
  )
}

export default Textcode_type_id
