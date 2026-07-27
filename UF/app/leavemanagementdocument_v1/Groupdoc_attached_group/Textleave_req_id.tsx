'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textleave_req_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_leavemanagedoctable_v1Props, setdfd_leavemanagedoctable_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {doc_attached_groupe2bd6, setdoc_attached_groupe2bd6}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupe2bd6Props, setdoc_attached_groupe2bd6Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupf34e5, settable_groupf34e5}= useContext(TotalContext) as TotalContextProps;
  const {table_groupf34e5Props, settable_groupf34e5Props}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tabled1189, setrequest_doc_tabled1189}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tabled1189Props, setrequest_doc_tabled1189Props}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanelbe83c, setdocumentuploadpanelbe83c}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_id072b8, setleave_req_id072b8}= useContext(TotalContext) as TotalContextProps;
  const {button_add_docdaa1e, setbutton_add_docdaa1e}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_leavemanagedoctable_v1Props && !dfd_leavemanagedoctable_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_leavemanagedoctable_v1Props.dstKey,
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
        setdoc_attached_groupe2bd6((pre: any) => {
          return { ...pre, leave_req_id: api_paginationData.data.records[0]?.leave_req_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_leavemanagedoctable_v1Props) && dfd_leavemanagedoctable_v1Props && !doc_attached_groupe2bd6.leave_req_id){
        setdoc_attached_groupe2bd6((pre:any)=>({...pre,leave_req_id:dfd_leavemanagedoctable_v1Props[0]?.leave_req_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[leave_req_id072b8?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_leavemanagedoctable_v1Props) && !doc_attached_groupe2bd6.leave_req_id){
    setdoc_attached_groupe2bd6((pre:any)=>({...pre,leave_req_id:dfd_leavemanagedoctable_v1Props[0]?.leave_req_id}));
  }
  },[dfd_leavemanagedoctable_v1Props])

  if (leave_req_id072b8?.isHidden) {
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

export default Textleave_req_id
