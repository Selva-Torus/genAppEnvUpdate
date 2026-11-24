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

const Textaccount_number = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_beneficiarylistquery_v1Props, setdfd_beneficiarylistquery_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {ben_list_groupb24ac, setben_list_groupb24ac}= useContext(TotalContext) as TotalContextProps;
  const {ben_list_groupb24acProps, setben_list_groupb24acProps}= useContext(TotalContext) as TotalContextProps;
  const {benc_groupa95a7, setbenc_groupa95a7}= useContext(TotalContext) as TotalContextProps;
  const {benc_groupa95a7Props, setbenc_groupa95a7Props}= useContext(TotalContext) as TotalContextProps;
  const {account_holder_namedb849, setaccount_holder_namedb849}= useContext(TotalContext) as TotalContextProps;
  const {iconcd6e8, seticoncd6e8}= useContext(TotalContext) as TotalContextProps;
  const {account_numberf1543, setaccount_numberf1543}= useContext(TotalContext) as TotalContextProps;
  const {account_numberf1543Props, setaccount_numberf1543Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_beneficiarylistquery_v1Props && !dfd_beneficiarylistquery_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_beneficiarylistquery_v1Props.dstKey,
            page: 1,
            count: 1,
            filterData: searchFilter
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        setbenc_groupa95a7((pre: any) => ({
          ...pre,
          cr_account: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.cr_account
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setbenc_groupa95a7((pre: any) => ({
          ...pre,
          cr_account: account_numberf1543Props?.filteredData?.length > 0
            ? account_numberf1543Props?.filteredData[0]?.cr_account
            : "0"
        }))
      }else if(Array.isArray(dfd_beneficiarylistquery_v1Props) && dfd_beneficiarylistquery_v1Props && !benc_groupa95a7.cr_account){
        setbenc_groupa95a7((pre:any)=>({...pre,cr_account:dfd_beneficiarylistquery_v1Props[0]?.cr_account}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[account_numberf1543?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_beneficiarylistquery_v1Props) && !benc_groupa95a7.cr_account){
    setbenc_groupa95a7((pre:any)=>({...pre,cr_account:dfd_beneficiarylistquery_v1Props[0]?.cr_account}));
  }
  },[dfd_beneficiarylistquery_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!account_numberf1543Props?.filterProps) return;
    handleMapperValue(account_numberf1543Props?.filterProps,account_numberf1543Props?.filterFlag);
  },[account_numberf1543Props?.filterProps])

  if (account_numberf1543?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `6 / 25`,gridRow: `8 / 14`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="className=&#34;text-lg font-semibold text-gray-900&#34;"
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.cr_account : (benc_groupa95a7?.cr_account || ""))}
</Text>
  </div>
  )
}

export default Textaccount_number
