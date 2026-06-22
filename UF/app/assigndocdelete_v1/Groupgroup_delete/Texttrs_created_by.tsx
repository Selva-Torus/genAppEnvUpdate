'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Texttrs_created_by = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {group_delete8ee3b, setgroup_delete8ee3b}= useContext(TotalContext) as TotalContextProps;
  const {group_delete8ee3bProps, setgroup_delete8ee3bProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text5f884, setdelete_heading_text5f884}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txt0f0d3, setattachment_id_txt0f0d3}= useContext(TotalContext) as TotalContextProps;
  const {attachment_idea582, setattachment_idea582}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_text09f3f, setdoc_group_text09f3f}= useContext(TotalContext) as TotalContextProps;
  const {doc_group796b8, setdoc_group796b8}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_text69cc2, setdoc_name_text69cc2}= useContext(TotalContext) as TotalContextProps;
  const {doc_name19bda, setdoc_name19bda}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_text805fb, settrs_created_by_text805fb}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by4c93f, settrs_created_by4c93f}= useContext(TotalContext) as TotalContextProps;
  const {confo_text0c7c5, setconfo_text0c7c5}= useContext(TotalContext) as TotalContextProps;
  const {assign_id67319, setassign_id67319}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button7e1a2, setcancel_button7e1a2}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonc63df, setok_buttonc63df}= useContext(TotalContext) as TotalContextProps;
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
        setgroup_delete8ee3b((pre: any) => {
          return { ...pre, trs_created_by: api_paginationData.data.records[0]?.trs_created_by }
        })
        }
      }
      else{
      if(Array.isArray(dfd_assigndoctable_v1Props) && dfd_assigndoctable_v1Props && !group_delete8ee3b.trs_created_by){
        setgroup_delete8ee3b((pre:any)=>({...pre,trs_created_by:dfd_assigndoctable_v1Props[0]?.trs_created_by}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[trs_created_by4c93f?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_assigndoctable_v1Props) && !group_delete8ee3b.trs_created_by){
    setgroup_delete8ee3b((pre:any)=>({...pre,trs_created_by:dfd_assigndoctable_v1Props[0]?.trs_created_by}));
  }
  },[dfd_assigndoctable_v1Props])

  if (trs_created_by4c93f?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `8 / 24`,gridRow: `25 / 30`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.trs_created_by : (group_delete8ee3b?.trs_created_by || ""))}
</Text>
  </div>
  )
}

export default Texttrs_created_by
