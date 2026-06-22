'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textasset_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {asset_doc_table49f40, setasset_doc_table49f40}= useContext(TotalContext) as TotalContextProps;
  const {asset_doc_table49f40Props, setasset_doc_table49f40Props}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanel14fde, setdocumentuploadpanel14fde}= useContext(TotalContext) as TotalContextProps;
  const {asset_id358d1, setasset_id358d1}= useContext(TotalContext) as TotalContextProps;
  const {button_add_docfde68, setbutton_add_docfde68}= useContext(TotalContext) as TotalContextProps;
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
        setdoc_attached_group36b0d((pre: any) => {
          return { ...pre, asset_id: api_paginationData.data.records[0]?.asset_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_assetdoctable_v1Props) && dfd_assetdoctable_v1Props && !doc_attached_group36b0d.asset_id){
        setdoc_attached_group36b0d((pre:any)=>({...pre,asset_id:dfd_assetdoctable_v1Props[0]?.asset_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[asset_id358d1?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_assetdoctable_v1Props) && !doc_attached_group36b0d.asset_id){
    setdoc_attached_group36b0d((pre:any)=>({...pre,asset_id:dfd_assetdoctable_v1Props[0]?.asset_id}));
  }
  },[dfd_assetdoctable_v1Props])

  if (asset_id358d1?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 3`,gridRow: `141 / 142`, gap:``, height: `100%`}} >
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

export default Textasset_id
