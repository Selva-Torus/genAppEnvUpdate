'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textpolicy_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {policy_doc_table06d23, setpolicy_doc_table06d23}= useContext(TotalContext) as TotalContextProps;
  const {policy_doc_table06d23Props, setpolicy_doc_table06d23Props}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanelf0a9b, setdocumentuploadpanelf0a9b}= useContext(TotalContext) as TotalContextProps;
  const {policy_id939d5, setpolicy_id939d5}= useContext(TotalContext) as TotalContextProps;
  const {button_canceldce7e, setbutton_canceldce7e}= useContext(TotalContext) as TotalContextProps;
  const {button_add_docc4540, setbutton_add_docc4540}= useContext(TotalContext) as TotalContextProps;
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
        setdoc_attached_group1c693((pre: any) => {
          return { ...pre, policy_id: api_paginationData.data.records[0]?.policy_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_leavepolicydoctable_v1Props) && dfd_leavepolicydoctable_v1Props && !doc_attached_group1c693.policy_id){
        setdoc_attached_group1c693((pre:any)=>({...pre,policy_id:dfd_leavepolicydoctable_v1Props[0]?.policy_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[policy_id939d5?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_leavepolicydoctable_v1Props) && !doc_attached_group1c693.policy_id){
    setdoc_attached_group1c693((pre:any)=>({...pre,policy_id:dfd_leavepolicydoctable_v1Props[0]?.policy_id}));
  }
  },[dfd_leavepolicydoctable_v1Props])

  if (policy_id939d5?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 3`,gridRow: `136 / 137`, gap:``, height: `100%`}} >
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

export default Textpolicy_id
