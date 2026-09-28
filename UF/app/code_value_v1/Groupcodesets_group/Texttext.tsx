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
  const {codesets_groupbc8b0, setcodesets_groupbc8b0}= useContext(TotalContext) as TotalContextProps;
  const {codesets_groupbc8b0Props, setcodesets_groupbc8b0Props}= useContext(TotalContext) as TotalContextProps;
  const {text2d252, settext2d252}= useContext(TotalContext) as TotalContextProps;
  const {ref_btnececf, setref_btnececf}= useContext(TotalContext) as TotalContextProps;
  const {search_btn958f1, setsearch_btn958f1}= useContext(TotalContext) as TotalContextProps;
  const {add_btn9eb67, setadd_btn9eb67}= useContext(TotalContext) as TotalContextProps;
  const {code_sets_tablec9811, setcode_sets_tablec9811}= useContext(TotalContext) as TotalContextProps;
  const {code_sets_tablec9811Props, setcode_sets_tablec9811Props}= useContext(TotalContext) as TotalContextProps;
  const {text2d252Props, settext2d252Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[text2d252?.refresh])

  if (text2d252?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 6`,gridRow: `2 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold"
  variant="subheader-3"
  color="primary"
>
      {keyset("Code Value")}
</Text>
  </div>
  )
}

export default Texttext
