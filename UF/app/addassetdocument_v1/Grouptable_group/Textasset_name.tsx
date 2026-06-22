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
  const {dfd_assetdoctable_v1Props, setdfd_assetdoctable_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {doc_attached_group36b0d, setdoc_attached_group36b0d}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_group36b0dProps, setdoc_attached_group36b0dProps}= useContext(TotalContext) as TotalContextProps;
  const {table_groupdaaaa, settable_groupdaaaa}= useContext(TotalContext) as TotalContextProps;
  const {table_groupdaaaaProps, settable_groupdaaaaProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_id_text67e51, setasset_id_text67e51}= useContext(TotalContext) as TotalContextProps;
  const {asset_idfc689, setasset_idfc689}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text06c7c, setasset_name_text06c7c}= useContext(TotalContext) as TotalContextProps;
  const {asset_name7dfbc, setasset_name7dfbc}= useContext(TotalContext) as TotalContextProps;
  const {asset_doc_table49f40, setasset_doc_table49f40}= useContext(TotalContext) as TotalContextProps;
  const {asset_doc_table49f40Props, setasset_doc_table49f40Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_assetdoctable_v1Props && !dfd_assetdoctable_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_assetdoctable_v1Props.dstKey,
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
        settable_groupdaaaa((pre: any) => {
          return { ...pre, asset_name: api_paginationData.data.records[0]?.asset_name }
        })
        }
      }
      else{
      if(Array.isArray(dfd_assetdoctable_v1Props) && dfd_assetdoctable_v1Props && !table_groupdaaaa.asset_name){
        settable_groupdaaaa((pre:any)=>({...pre,asset_name:dfd_assetdoctable_v1Props[0]?.asset_name}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[asset_name7dfbc?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_assetdoctable_v1Props) && !table_groupdaaaa.asset_name){
    settable_groupdaaaa((pre:any)=>({...pre,asset_name:dfd_assetdoctable_v1Props[0]?.asset_name}));
  }
  },[dfd_assetdoctable_v1Props])

  if (asset_name7dfbc?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `6 / 25`,gridRow: `8 / 14`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.asset_name : (table_groupdaaaa?.asset_name || ""))}
</Text>
  </div>
  )
}

export default Textasset_name
