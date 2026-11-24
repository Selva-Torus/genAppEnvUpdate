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

const Textsearch_label = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {main_group746bf, setmain_group746bf}= useContext(TotalContext) as TotalContextProps;
  const {main_group746bfProps, setmain_group746bfProps}= useContext(TotalContext) as TotalContextProps;
  const {search_label130a2, setsearch_label130a2}= useContext(TotalContext) as TotalContextProps;
  const {top_dividerdea5b, settop_dividerdea5b}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date28cb9, settrs_created_date28cb9}= useContext(TotalContext) as TotalContextProps;
  const {uuida0e9e, setuuida0e9e}= useContext(TotalContext) as TotalContextProps;
  const {debtor_account_no1b62b, setdebtor_account_no1b62b}= useContext(TotalContext) as TotalContextProps;
  const {debtor_name908b6, setdebtor_name908b6}= useContext(TotalContext) as TotalContextProps;
  const {creditor_account_no14a5f, setcreditor_account_no14a5f}= useContext(TotalContext) as TotalContextProps;
  const {cr_name1ecf4, setcr_name1ecf4}= useContext(TotalContext) as TotalContextProps;
  const {cr_currencydbebf, setcr_currencydbebf}= useContext(TotalContext) as TotalContextProps;
  const {cr_amounta1974, setcr_amounta1974}= useContext(TotalContext) as TotalContextProps;
  const {message_codefa765, setmessage_codefa765}= useContext(TotalContext) as TotalContextProps;
  const {bottom_divideradc51, setbottom_divideradc51}= useContext(TotalContext) as TotalContextProps;
  const {search4197d, setsearch4197d}= useContext(TotalContext) as TotalContextProps;
  const {clear91c04, setclear91c04}= useContext(TotalContext) as TotalContextProps;
  const {search_label130a2Props, setsearch_label130a2Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[search_label130a2?.refresh])

  if (search_label130a2?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 13`,gridRow: `1 / 9`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="header-1"
  color="primary"
>
      {keyset("Search")}
</Text>
  </div>
  )
}

export default Textsearch_label
