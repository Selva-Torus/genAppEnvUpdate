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
  const {dfd_performancereviewdoctable_v1Props, setdfd_performancereviewdoctable_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete4384f, setgroup_delete4384f}= useContext(TotalContext) as TotalContextProps;
  const {group_delete4384fProps, setgroup_delete4384fProps}= useContext(TotalContext) as TotalContextProps;
  const {divider_topd6bd8, setdivider_topd6bd8}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text314e9, setdelete_heading_text314e9}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txta253e, setattachment_id_txta253e}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id0a460, setattachment_id0a460}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_text2ee44, setdoc_group_text2ee44}= useContext(TotalContext) as TotalContextProps;
  const {doc_group35e3d, setdoc_group35e3d}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_textc0cad, setdoc_name_textc0cad}= useContext(TotalContext) as TotalContextProps;
  const {doc_namebd198, setdoc_namebd198}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_text0bbf6, settrs_created_by_text0bbf6}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_bya3008, settrs_created_bya3008}= useContext(TotalContext) as TotalContextProps;
  const {confo_textdfcf2, setconfo_textdfcf2}= useContext(TotalContext) as TotalContextProps;
  const {divider98807, setdivider98807}= useContext(TotalContext) as TotalContextProps;
  const {review_idd53ee, setreview_idd53ee}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonfc045, setcancel_buttonfc045}= useContext(TotalContext) as TotalContextProps;
  const {ok_button03deb, setok_button03deb}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_performancereviewdoctable_v1Props && !dfd_performancereviewdoctable_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_performancereviewdoctable_v1Props.dstKey,
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
        setgroup_delete4384f((pre: any) => {
          return { ...pre, doc_name: api_paginationData.data.records[0]?.doc_name }
        })
        }
      }
      else{
      if(Array.isArray(dfd_performancereviewdoctable_v1Props) && dfd_performancereviewdoctable_v1Props && !group_delete4384f.doc_name){
        setgroup_delete4384f((pre:any)=>({...pre,doc_name:dfd_performancereviewdoctable_v1Props[0]?.doc_name}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[doc_namebd198?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_performancereviewdoctable_v1Props) && !group_delete4384f.doc_name){
    setgroup_delete4384f((pre:any)=>({...pre,doc_name:dfd_performancereviewdoctable_v1Props[0]?.doc_name}));
  }
  },[dfd_performancereviewdoctable_v1Props])

  if (doc_namebd198?.isHidden) {
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
      {keyset(isDynamic ? item?.doc_name : (group_delete4384f?.doc_name || ""))}
</Text>
  </div>
  )
}

export default Textdoc_name
