'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textpolicy_name = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_leavepolicydoctable_v1Props, setdfd_leavepolicydoctable_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {doc_attached_group1c693, setdoc_attached_group1c693}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_group1c693Props, setdoc_attached_group1c693Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group973f0, settable_group973f0}= useContext(TotalContext) as TotalContextProps;
  const {table_group973f0Props, settable_group973f0Props}= useContext(TotalContext) as TotalContextProps;
  const {policy_id_textbba07, setpolicy_id_textbba07}= useContext(TotalContext) as TotalContextProps;
  const {policy_id4c831, setpolicy_id4c831}= useContext(TotalContext) as TotalContextProps;
  const {policy_name_textf741b, setpolicy_name_textf741b}= useContext(TotalContext) as TotalContextProps;
  const {policy_name67d57, setpolicy_name67d57}= useContext(TotalContext) as TotalContextProps;
  const {policy_doc_table06d23, setpolicy_doc_table06d23}= useContext(TotalContext) as TotalContextProps;
  const {policy_doc_table06d23Props, setpolicy_doc_table06d23Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_leavepolicydoctable_v1Props && !dfd_leavepolicydoctable_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_leavepolicydoctable_v1Props.dstKey,
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
        settable_group973f0((pre: any) => {
          return { ...pre, policy_name: api_paginationData.data.records[0]?.policy_name }
        })
        }
      }
      else{
      if(Array.isArray(dfd_leavepolicydoctable_v1Props) && dfd_leavepolicydoctable_v1Props && !table_group973f0.policy_name){
        settable_group973f0((pre:any)=>({...pre,policy_name:dfd_leavepolicydoctable_v1Props[0]?.policy_name}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[policy_name67d57?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_leavepolicydoctable_v1Props) && !table_group973f0.policy_name){
    settable_group973f0((pre:any)=>({...pre,policy_name:dfd_leavepolicydoctable_v1Props[0]?.policy_name}));
  }
  },[dfd_leavepolicydoctable_v1Props])

  if (policy_name67d57?.isHidden) {
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
      {keyset(isDynamic ? item?.policy_name : (table_group973f0?.policy_name || ""))}
</Text>
  </div>
  )
}

export default Textpolicy_name
