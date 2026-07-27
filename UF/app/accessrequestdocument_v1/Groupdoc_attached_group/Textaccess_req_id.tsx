'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textaccess_req_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {doc_attached_groupd9ca3, setdoc_attached_groupd9ca3}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupd9ca3Props, setdoc_attached_groupd9ca3Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupbcd33, settable_groupbcd33}= useContext(TotalContext) as TotalContextProps;
  const {table_groupbcd33Props, settable_groupbcd33Props}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tablea9098, setrequest_doc_tablea9098}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tablea9098Props, setrequest_doc_tablea9098Props}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanelfebb3, setdocumentuploadpanelfebb3}= useContext(TotalContext) as TotalContextProps;
  const {access_req_idaf179, setaccess_req_idaf179}= useContext(TotalContext) as TotalContextProps;
  const {button_add_doc1ee80, setbutton_add_doc1ee80}= useContext(TotalContext) as TotalContextProps;
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
        setdoc_attached_groupd9ca3((pre: any) => {
          return { ...pre, access_req_id: api_paginationData.data.records[0]?.access_req_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_accessreqdoctable_v1Props) && dfd_accessreqdoctable_v1Props && !doc_attached_groupd9ca3.access_req_id){
        setdoc_attached_groupd9ca3((pre:any)=>({...pre,access_req_id:dfd_accessreqdoctable_v1Props[0]?.access_req_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[access_req_idaf179?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_accessreqdoctable_v1Props) && !doc_attached_groupd9ca3.access_req_id){
    setdoc_attached_groupd9ca3((pre:any)=>({...pre,access_req_id:dfd_accessreqdoctable_v1Props[0]?.access_req_id}));
  }
  },[dfd_accessreqdoctable_v1Props])

  if (access_req_idaf179?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `3 / 4`,gridRow: `150 / 151`, gap:``, height: `100%`}} >
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

export default Textaccess_req_id
