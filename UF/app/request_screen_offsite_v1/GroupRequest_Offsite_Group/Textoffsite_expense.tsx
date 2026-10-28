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

const Textoffsite_expense = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {request_offsite_group429cb, setrequest_offsite_group429cb}= useContext(TotalContext) as TotalContextProps;
  const {request_offsite_group429cbProps, setrequest_offsite_group429cbProps}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense39c39, setoffsite_expense39c39}= useContext(TotalContext) as TotalContextProps;
  const {claim_expense_type51f6e, setclaim_expense_type51f6e}= useContext(TotalContext) as TotalContextProps;
  const {expense_namebf755, setexpense_namebf755}= useContext(TotalContext) as TotalContextProps;
  const {emailad8a5, setemailad8a5}= useContext(TotalContext) as TotalContextProps;
  const {from_datee96b6, setfrom_datee96b6}= useContext(TotalContext) as TotalContextProps;
  const {to_dateaf8c4, setto_dateaf8c4}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryb2e83, setclaim_categoryb2e83}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amounte603b, setcategory_total_amounte603b}= useContext(TotalContext) as TotalContextProps;
  const {attachmentc9c51, setattachmentc9c51}= useContext(TotalContext) as TotalContextProps;
  const {receipt_imageafe30, setreceipt_imageafe30}= useContext(TotalContext) as TotalContextProps;
  const {enableeff29, setenableeff29}= useContext(TotalContext) as TotalContextProps;
  const {comments65b18, setcomments65b18}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enabled5ca5f, setis_comment_enabled5ca5f}= useContext(TotalContext) as TotalContextProps;
  const {clear2b3e6, setclear2b3e6}= useContext(TotalContext) as TotalContextProps;
  const {add5cae4, setadd5cae4}= useContext(TotalContext) as TotalContextProps;
  const {claimsdetailtablef8143, setclaimsdetailtablef8143}= useContext(TotalContext) as TotalContextProps;
  const {claimsdetailtablef8143Props, setclaimsdetailtablef8143Props}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense39c39Props, setoffsite_expense39c39Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[offsite_expense39c39?.refresh])

  if (offsite_expense39c39?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `4 / 16`,gridRow: `7 / 17`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="display-1"
  color="primary"
>
      {keyset("Offsite Expense")}
</Text>
  </div>
  )
}

export default Textoffsite_expense
