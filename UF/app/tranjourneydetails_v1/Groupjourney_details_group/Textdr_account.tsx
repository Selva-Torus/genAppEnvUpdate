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

const Textdr_account = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_transaction_v1Props, setdfd_transaction_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {journey_details_groupd9a0e, setjourney_details_groupd9a0e}= useContext(TotalContext) as TotalContextProps;
  const {journey_details_groupd9a0eProps, setjourney_details_groupd9a0eProps}= useContext(TotalContext) as TotalContextProps;
  const {divider_tope6917, setdivider_tope6917}= useContext(TotalContext) as TotalContextProps;
  const {transaction_date_time_label669d7, settransaction_date_time_label669d7}= useContext(TotalContext) as TotalContextProps;
  const {status_labelf3713, setstatus_labelf3713}= useContext(TotalContext) as TotalContextProps;
  const {transaction_date_time14856, settransaction_date_time14856}= useContext(TotalContext) as TotalContextProps;
  const {status88bc7, setstatus88bc7}= useContext(TotalContext) as TotalContextProps;
  const {processed_by_label542e8, setprocessed_by_label542e8}= useContext(TotalContext) as TotalContextProps;
  const {debit_account_label3b1b7, setdebit_account_label3b1b7}= useContext(TotalContext) as TotalContextProps;
  const {processed_byd2b69, setprocessed_byd2b69}= useContext(TotalContext) as TotalContextProps;
  const {dr_account36b40, setdr_account36b40}= useContext(TotalContext) as TotalContextProps;
  const {currency_labele21ba, setcurrency_labele21ba}= useContext(TotalContext) as TotalContextProps;
  const {credit_account_label65c7b, setcredit_account_label65c7b}= useContext(TotalContext) as TotalContextProps;
  const {dr_currency9c8a2, setdr_currency9c8a2}= useContext(TotalContext) as TotalContextProps;
  const {cr_account0d1f4, setcr_account0d1f4}= useContext(TotalContext) as TotalContextProps;
  const {amount_labelfd725, setamount_labelfd725}= useContext(TotalContext) as TotalContextProps;
  const {process_status_labelb1ca9, setprocess_status_labelb1ca9}= useContext(TotalContext) as TotalContextProps;
  const {cr_amount01416, setcr_amount01416}= useContext(TotalContext) as TotalContextProps;
  const {process_status500d6, setprocess_status500d6}= useContext(TotalContext) as TotalContextProps;
  const {divider_bottom8bad5, setdivider_bottom8bad5}= useContext(TotalContext) as TotalContextProps;
  const {view_msg_data_btne6a88, setview_msg_data_btne6a88}= useContext(TotalContext) as TotalContextProps;
  const {view_tran_log_btn9cd8c, setview_tran_log_btn9cd8c}= useContext(TotalContext) as TotalContextProps;
  const {dr_account36b40Props, setdr_account36b40Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_transaction_v1Props && !dfd_transaction_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_transaction_v1Props.dstKey,
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
        setjourney_details_groupd9a0e((pre: any) => ({
          ...pre,
          dr_account: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.dr_account
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setjourney_details_groupd9a0e((pre: any) => ({
          ...pre,
          dr_account: dr_account36b40Props?.filteredData?.length > 0
            ? dr_account36b40Props?.filteredData[0]?.dr_account
            : "0"
        }))
      }else if(Array.isArray(dfd_transaction_v1Props) && dfd_transaction_v1Props && !journey_details_groupd9a0e.dr_account){
        setjourney_details_groupd9a0e((pre:any)=>({...pre,dr_account:dfd_transaction_v1Props[0]?.dr_account}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[dr_account36b40?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_transaction_v1Props) && !journey_details_groupd9a0e.dr_account){
    setjourney_details_groupd9a0e((pre:any)=>({...pre,dr_account:dfd_transaction_v1Props[0]?.dr_account}));
  }
  },[dfd_transaction_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!dr_account36b40Props?.filterProps) return;
    handleMapperValue(dr_account36b40Props?.filterProps,dr_account36b40Props?.filterFlag);
  },[dr_account36b40Props?.filterProps])

  if (dr_account36b40?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `13 / 25`,gridRow: `32 / 40`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f7f8f8] p-2 !pl-3 !rounded-lg !text-base !font-medium"
  variant="code-1"
  color="primary"
>
      {keyset(isDynamic ? item?.dr_account : (journey_details_groupd9a0e?.dr_account || ""))}
</Text>
  </div>
  )
}

export default Textdr_account
