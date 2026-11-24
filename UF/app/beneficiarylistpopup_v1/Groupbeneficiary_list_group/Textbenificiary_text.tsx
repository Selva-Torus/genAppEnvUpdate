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

const Textbenificiary_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {beneficiary_list_group9d9c4, setbeneficiary_list_group9d9c4}= useContext(TotalContext) as TotalContextProps;
  const {beneficiary_list_group9d9c4Props, setbeneficiary_list_group9d9c4Props}= useContext(TotalContext) as TotalContextProps;
  const {benificiary_textb53b9, setbenificiary_textb53b9}= useContext(TotalContext) as TotalContextProps;
  const {search_textinput7144f, setsearch_textinput7144f}= useContext(TotalContext) as TotalContextProps;
  const {search_btne5c0a, setsearch_btne5c0a}= useContext(TotalContext) as TotalContextProps;
  const {ben_divideraec54, setben_divideraec54}= useContext(TotalContext) as TotalContextProps;
  const {ben_list_groupb24ac, setben_list_groupb24ac}= useContext(TotalContext) as TotalContextProps;
  const {ben_list_groupb24acProps, setben_list_groupb24acProps}= useContext(TotalContext) as TotalContextProps;
  const {benc_groupa95a7, setbenc_groupa95a7}= useContext(TotalContext) as TotalContextProps;
  const {benc_groupa95a7Props, setbenc_groupa95a7Props}= useContext(TotalContext) as TotalContextProps;
  const {confirm_dividere3b17, setconfirm_dividere3b17}= useContext(TotalContext) as TotalContextProps;
  const {clear_button188cc, setclear_button188cc}= useContext(TotalContext) as TotalContextProps;
  const {confirm_button246d5, setconfirm_button246d5}= useContext(TotalContext) as TotalContextProps;
  const {benificiary_textb53b9Props, setbenificiary_textb53b9Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[benificiary_textb53b9?.refresh])

  if (benificiary_textb53b9?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 7`,gridRow: `1 / 8`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="header-2"
  color="primary"
>
      {keyset("Benificiary List")}
</Text>
  </div>
  )
}

export default Textbenificiary_text
