'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textreview_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_addperformancereviewmodify_v1Props, setdfd_addperformancereviewmodify_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {new_access_groupc5a99, setnew_access_groupc5a99}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc5a99Props, setnew_access_groupc5a99Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group002d0, setaccess_req__group002d0}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group002d0Props, setaccess_req__group002d0Props}= useContext(TotalContext) as TotalContextProps;
  const {valid_group3a8ab, setvalid_group3a8ab}= useContext(TotalContext) as TotalContextProps;
  const {valid_group3a8abProps, setvalid_group3a8abProps}= useContext(TotalContext) as TotalContextProps;
  const {addt__group6ba4f, setaddt__group6ba4f}= useContext(TotalContext) as TotalContextProps;
  const {addt__group6ba4fProps, setaddt__group6ba4fProps}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group613d2, setaddt__dts_group613d2}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group613d2Props, setaddt__dts_group613d2Props}= useContext(TotalContext) as TotalContextProps;
  const {completed_at_datepicker9e849, setcompleted_at_datepicker9e849}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsb315b, setdynamicactionsb315b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsb315bProps, setdynamicactionsb315bProps}= useContext(TotalContext) as TotalContextProps;
  const {review_id0ac0f, setreview_id0ac0f}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_addperformancereviewmodify_v1Props && !dfd_addperformancereviewmodify_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_addperformancereviewmodify_v1Props.dstKey,
            page: 1,
            count: 1
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if(api_paginationData.data.records?.length){
        setnew_access_groupc5a99((pre: any) => {
          return { ...pre, review_id: api_paginationData.data.records[0]?.review_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_addperformancereviewmodify_v1Props) && dfd_addperformancereviewmodify_v1Props && !new_access_groupc5a99.review_id){
        setnew_access_groupc5a99((pre:any)=>({...pre,review_id:dfd_addperformancereviewmodify_v1Props[0]?.review_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[review_id0ac0f?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_addperformancereviewmodify_v1Props) && !new_access_groupc5a99.review_id){
    setnew_access_groupc5a99((pre:any)=>({...pre,review_id:dfd_addperformancereviewmodify_v1Props[0]?.review_id}));
  }
  },[dfd_addperformancereviewmodify_v1Props])

  if (review_id0ac0f?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 4`,gridRow: `80 / 81`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.review_id : (new_access_groupc5a99?.review_id || ""))}
</Text>
  </div>
  )
}

export default Textreview_id
