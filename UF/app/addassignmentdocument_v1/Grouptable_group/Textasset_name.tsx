'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textasset_name = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assigndoctable_v1Props, setdfd_assigndoctable_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {doc_attached_groupbc2cf, setdoc_attached_groupbc2cf}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupbc2cfProps, setdoc_attached_groupbc2cfProps}= useContext(TotalContext) as TotalContextProps;
  const {table_group75a5e, settable_group75a5e}= useContext(TotalContext) as TotalContextProps;
  const {table_group75a5eProps, settable_group75a5eProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textbdd29, setasset_name_textbdd29}= useContext(TotalContext) as TotalContextProps;
  const {asset_namee1fc6, setasset_namee1fc6}= useContext(TotalContext) as TotalContextProps;
  const {assigned_to_text824e7, setassigned_to_text824e7}= useContext(TotalContext) as TotalContextProps;
  const {assigned_to72696, setassigned_to72696}= useContext(TotalContext) as TotalContextProps;
  const {doc_table392d0, setdoc_table392d0}= useContext(TotalContext) as TotalContextProps;
  const {doc_table392d0Props, setdoc_table392d0Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_assigndoctable_v1Props && !dfd_assigndoctable_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_assigndoctable_v1Props.dstKey,
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
        settable_group75a5e((pre: any) => {
          return { ...pre, asset_name: api_paginationData.data.records[0]?.asset_name }
        })
        }
      }
      else{
      if(Array.isArray(dfd_assigndoctable_v1Props) && dfd_assigndoctable_v1Props && !table_group75a5e.asset_name){
        settable_group75a5e((pre:any)=>({...pre,asset_name:dfd_assigndoctable_v1Props[0]?.asset_name}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[asset_namee1fc6?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_assigndoctable_v1Props) && !table_group75a5e.asset_name){
    settable_group75a5e((pre:any)=>({...pre,asset_name:dfd_assigndoctable_v1Props[0]?.asset_name}));
  }
  },[dfd_assigndoctable_v1Props])

  if (asset_namee1fc6?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `5 / 25`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.asset_name : (table_group75a5e?.asset_name || ""))}
</Text>
  </div>
  )
}

export default Textasset_name
