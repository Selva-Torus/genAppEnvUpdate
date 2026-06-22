'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textassign_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {doc_table392d0, setdoc_table392d0}= useContext(TotalContext) as TotalContextProps;
  const {doc_table392d0Props, setdoc_table392d0Props}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanel96f16, setdocumentuploadpanel96f16}= useContext(TotalContext) as TotalContextProps;
  const {button_add_doc8e522, setbutton_add_doc8e522}= useContext(TotalContext) as TotalContextProps;
  const {assign_id67308, setassign_id67308}= useContext(TotalContext) as TotalContextProps;
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
        setdoc_attached_groupbc2cf((pre: any) => {
          return { ...pre, assign_id: api_paginationData.data.records[0]?.assign_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_assigndoctable_v1Props) && dfd_assigndoctable_v1Props && !doc_attached_groupbc2cf.assign_id){
        setdoc_attached_groupbc2cf((pre:any)=>({...pre,assign_id:dfd_assigndoctable_v1Props[0]?.assign_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[assign_id67308?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_assigndoctable_v1Props) && !doc_attached_groupbc2cf.assign_id){
    setdoc_attached_groupbc2cf((pre:any)=>({...pre,assign_id:dfd_assigndoctable_v1Props[0]?.assign_id}));
  }
  },[dfd_assigndoctable_v1Props])

  if (assign_id67308?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 2`,gridRow: `142 / 143`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.assign_id : (doc_attached_groupbc2cf?.assign_id || ""))}
</Text>
  </div>
  )
}

export default Textassign_id
