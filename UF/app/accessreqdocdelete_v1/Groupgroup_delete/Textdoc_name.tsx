'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textdoc_name = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_accessreqdoctable_v1Props, setdfd_accessreqdoctable_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_deletee7496, setgroup_deletee7496}= useContext(TotalContext) as TotalContextProps;
  const {group_deletee7496Props, setgroup_deletee7496Props}= useContext(TotalContext) as TotalContextProps;
  const {divider_topff733, setdivider_topff733}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text54f32, setdelete_heading_text54f32}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txt06ae9, setattachment_id_txt06ae9}= useContext(TotalContext) as TotalContextProps;
  const {attachment_ideb2da, setattachment_ideb2da}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_textac80d, setdoc_group_textac80d}= useContext(TotalContext) as TotalContextProps;
  const {doc_groupd3c6e, setdoc_groupd3c6e}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_text550d7, setdoc_name_text550d7}= useContext(TotalContext) as TotalContextProps;
  const {doc_name42663, setdoc_name42663}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_texte814b, settrs_created_by_texte814b}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_byfc11e, settrs_created_byfc11e}= useContext(TotalContext) as TotalContextProps;
  const {confo_text8976f, setconfo_text8976f}= useContext(TotalContext) as TotalContextProps;
  const {divider004b8, setdivider004b8}= useContext(TotalContext) as TotalContextProps;
  const {access_req_idf71e7, setaccess_req_idf71e7}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonbc6e4, setcancel_buttonbc6e4}= useContext(TotalContext) as TotalContextProps;
  const {ok_button53062, setok_button53062}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_accessreqdoctable_v1Props && !dfd_accessreqdoctable_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_accessreqdoctable_v1Props.dstKey,
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
        setgroup_deletee7496((pre: any) => {
          return { ...pre, doc_name: api_paginationData.data.records[0]?.doc_name }
        })
        }
      }
      else{
      if(Array.isArray(dfd_accessreqdoctable_v1Props) && dfd_accessreqdoctable_v1Props && !group_deletee7496.doc_name){
        setgroup_deletee7496((pre:any)=>({...pre,doc_name:dfd_accessreqdoctable_v1Props[0]?.doc_name}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[doc_name42663?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_accessreqdoctable_v1Props) && !group_deletee7496.doc_name){
    setgroup_deletee7496((pre:any)=>({...pre,doc_name:dfd_accessreqdoctable_v1Props[0]?.doc_name}));
  }
  },[dfd_accessreqdoctable_v1Props])

  if (doc_name42663?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `8 / 24`,gridRow: `23 / 28`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.doc_name : (group_deletee7496?.doc_name || ""))}
</Text>
  </div>
  )
}

export default Textdoc_name
