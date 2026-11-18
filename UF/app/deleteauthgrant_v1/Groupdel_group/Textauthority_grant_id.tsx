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

const Textauthority_grant_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_authoritygrant_v1Props, setdfd_authoritygrant_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {del_group1428f, setdel_group1428f}= useContext(TotalContext) as TotalContextProps;
  const {del_group1428fProps, setdel_group1428fProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtebcb8, setdelete_heading_txtebcb8}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_127efe, setdel_divider_127efe}= useContext(TotalContext) as TotalContextProps;
  const {authority_grant_id_text79504, setauthority_grant_id_text79504}= useContext(TotalContext) as TotalContextProps;
  const {authority_grant_id84597, setauthority_grant_id84597}= useContext(TotalContext) as TotalContextProps;
  const {grant_code_text94baa, setgrant_code_text94baa}= useContext(TotalContext) as TotalContextProps;
  const {grant_code8a454, setgrant_code8a454}= useContext(TotalContext) as TotalContextProps;
  const {max_amount_per_txn_textec183, setmax_amount_per_txn_textec183}= useContext(TotalContext) as TotalContextProps;
  const {max_amount_per_txnd3f90, setmax_amount_per_txnd3f90}= useContext(TotalContext) as TotalContextProps;
  const {currency_text0fee1, setcurrency_text0fee1}= useContext(TotalContext) as TotalContextProps;
  const {currencye5d71, setcurrencye5d71}= useContext(TotalContext) as TotalContextProps;
  const {revocation_reason_texte522e, setrevocation_reason_texte522e}= useContext(TotalContext) as TotalContextProps;
  const {revocation_reasonb4abb, setrevocation_reasonb4abb}= useContext(TotalContext) as TotalContextProps;
  const {statust_textcc6bd, setstatust_textcc6bd}= useContext(TotalContext) as TotalContextProps;
  const {status66a0b, setstatus66a0b}= useContext(TotalContext) as TotalContextProps;
  const {text6cc24, settext6cc24}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_28ee76, setdel_divider_28ee76}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn6d001, setdel_cancel_btn6d001}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn256dd, setdel_okl_btn256dd}= useContext(TotalContext) as TotalContextProps;
  const {authority_grant_id84597Props, setauthority_grant_id84597Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_authoritygrant_v1Props && !dfd_authoritygrant_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_authoritygrant_v1Props.dstKey,
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
        setdel_group1428f((pre: any) => ({
          ...pre,
          authority_grant_id: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.authority_grant_id
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setdel_group1428f((pre: any) => ({
          ...pre,
          authority_grant_id: authority_grant_id84597Props?.filteredData?.length > 0
            ? authority_grant_id84597Props?.filteredData[0]?.authority_grant_id
            : "0"
        }))
      }else if(Array.isArray(dfd_authoritygrant_v1Props) && dfd_authoritygrant_v1Props && !del_group1428f.authority_grant_id){
        setdel_group1428f((pre:any)=>({...pre,authority_grant_id:dfd_authoritygrant_v1Props[0]?.authority_grant_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[authority_grant_id84597?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_authoritygrant_v1Props) && !del_group1428f.authority_grant_id){
    setdel_group1428f((pre:any)=>({...pre,authority_grant_id:dfd_authoritygrant_v1Props[0]?.authority_grant_id}));
  }
  },[dfd_authoritygrant_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!authority_grant_id84597Props?.filterProps) return;
    handleMapperValue(authority_grant_id84597Props?.filterProps,authority_grant_id84597Props?.filterFlag);
  },[authority_grant_id84597Props?.filterProps])

  if (authority_grant_id84597?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `8 / 24`,gridRow: `10 / 15`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !rounded-l !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.authority_grant_id : (del_group1428f?.authority_grant_id || ""))}
</Text>
  </div>
  )
}

export default Textauthority_grant_id
