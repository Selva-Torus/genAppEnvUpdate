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

const Textcredential_ref_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_credentialref_v1Props, setdfd_credentialref_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {del_group3becd, setdel_group3becd}= useContext(TotalContext) as TotalContextProps;
  const {del_group3becdProps, setdel_group3becdProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtc7473, setdelete_heading_txtc7473}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1f696f, setdel_divider_1f696f}= useContext(TotalContext) as TotalContextProps;
  const {ref_name_textaabe8, setref_name_textaabe8}= useContext(TotalContext) as TotalContextProps;
  const {ref_name9d1bd, setref_name9d1bd}= useContext(TotalContext) as TotalContextProps;
  const {vault_path_textf581e, setvault_path_textf581e}= useContext(TotalContext) as TotalContextProps;
  const {vault_pathf1128, setvault_pathf1128}= useContext(TotalContext) as TotalContextProps;
  const {credential_type_text132b9, setcredential_type_text132b9}= useContext(TotalContext) as TotalContextProps;
  const {credential_type67f51, setcredential_type67f51}= useContext(TotalContext) as TotalContextProps;
  const {texta0b32, settexta0b32}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_207f16, setdel_divider_207f16}= useContext(TotalContext) as TotalContextProps;
  const {credential_ref_idc5f97, setcredential_ref_idc5f97}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn9c8ad, setdel_cancel_btn9c8ad}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btnc484c, setdel_okl_btnc484c}= useContext(TotalContext) as TotalContextProps;
  const {credential_ref_idc5f97Props, setcredential_ref_idc5f97Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_credentialref_v1Props && !dfd_credentialref_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_credentialref_v1Props.dstKey,
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
        setdel_group3becd((pre: any) => ({
          ...pre,
          credential_ref_id: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.credential_ref_id
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setdel_group3becd((pre: any) => ({
          ...pre,
          credential_ref_id: credential_ref_idc5f97Props?.filteredData?.length > 0
            ? credential_ref_idc5f97Props?.filteredData[0]?.credential_ref_id
            : "0"
        }))
      }else if(Array.isArray(dfd_credentialref_v1Props) && dfd_credentialref_v1Props && !del_group3becd.credential_ref_id){
        setdel_group3becd((pre:any)=>({...pre,credential_ref_id:dfd_credentialref_v1Props[0]?.credential_ref_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[credential_ref_idc5f97?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_credentialref_v1Props) && !del_group3becd.credential_ref_id){
    setdel_group3becd((pre:any)=>({...pre,credential_ref_id:dfd_credentialref_v1Props[0]?.credential_ref_id}));
  }
  },[dfd_credentialref_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!credential_ref_idc5f97Props?.filterProps) return;
    handleMapperValue(credential_ref_idc5f97Props?.filterProps,credential_ref_idc5f97Props?.filterFlag);
  },[credential_ref_idc5f97Props?.filterProps])

  if (credential_ref_idc5f97?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 4`,gridRow: `36 / 37`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset("Lorem ipsum dolor sit")}
</Text>
  </div>
  )
}

export default Textcredential_ref_id
