'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textattachment_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {group_delete10eb3, setgroup_delete10eb3}= useContext(TotalContext) as TotalContextProps;
  const {group_delete10eb3Props, setgroup_delete10eb3Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textc80ba, setdelete_heading_textc80ba}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txt02e0f, setattachment_id_txt02e0f}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id4eeac, setattachment_id4eeac}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_texte3945, setdoc_group_texte3945}= useContext(TotalContext) as TotalContextProps;
  const {doc_group82055, setdoc_group82055}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_text6a957, setdoc_name_text6a957}= useContext(TotalContext) as TotalContextProps;
  const {doc_name1f607, setdoc_name1f607}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_text29a4f, settrs_created_by_text29a4f}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_byad133, settrs_created_byad133}= useContext(TotalContext) as TotalContextProps;
  const {confo_text29a5c, setconfo_text29a5c}= useContext(TotalContext) as TotalContextProps;
  const {asset_idbf0b0, setasset_idbf0b0}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button753bf, setcancel_button753bf}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttone6d7f, setok_buttone6d7f}= useContext(TotalContext) as TotalContextProps;
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
        setgroup_delete10eb3((pre: any) => {
          return { ...pre, attachment_id: api_paginationData.data.records[0]?.attachment_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_assetdoctable_v1Props) && dfd_assetdoctable_v1Props && !group_delete10eb3.attachment_id){
        setgroup_delete10eb3((pre:any)=>({...pre,attachment_id:dfd_assetdoctable_v1Props[0]?.attachment_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[attachment_id4eeac?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_assetdoctable_v1Props) && !group_delete10eb3.attachment_id){
    setgroup_delete10eb3((pre:any)=>({...pre,attachment_id:dfd_assetdoctable_v1Props[0]?.attachment_id}));
  }
  },[dfd_assetdoctable_v1Props])

  if (attachment_id4eeac?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `8 / 24`,gridRow: `7 / 12`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.attachment_id : (group_delete10eb3?.attachment_id || ""))}
</Text>
  </div>
  )
}

export default Textattachment_id
