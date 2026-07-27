'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textfull_name = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {access_req_id_text12a0d, setaccess_req_id_text12a0d}= useContext(TotalContext) as TotalContextProps;
  const {access_req_id5df25, setaccess_req_id5df25}= useContext(TotalContext) as TotalContextProps;
  const {request_number_textdcd44, setrequest_number_textdcd44}= useContext(TotalContext) as TotalContextProps;
  const {request_numberd4d19, setrequest_numberd4d19}= useContext(TotalContext) as TotalContextProps;
  const {employee_name_text578db, setemployee_name_text578db}= useContext(TotalContext) as TotalContextProps;
  const {full_name84f79, setfull_name84f79}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tablea9098, setrequest_doc_tablea9098}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tablea9098Props, setrequest_doc_tablea9098Props}= useContext(TotalContext) as TotalContextProps;
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
        settable_groupbcd33((pre: any) => {
          return { ...pre, full_name: api_paginationData.data.records[0]?.full_name }
        })
        }
      }
      else{
      if(Array.isArray(dfd_accessreqdoctable_v1Props) && dfd_accessreqdoctable_v1Props && !table_groupbcd33.full_name){
        settable_groupbcd33((pre:any)=>({...pre,full_name:dfd_accessreqdoctable_v1Props[0]?.full_name}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[full_name84f79?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_accessreqdoctable_v1Props) && !table_groupbcd33.full_name){
    settable_groupbcd33((pre:any)=>({...pre,full_name:dfd_accessreqdoctable_v1Props[0]?.full_name}));
  }
  },[dfd_accessreqdoctable_v1Props])

  if (full_name84f79?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `6 / 25`,gridRow: `15 / 21`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.full_name : (table_groupbcd33?.full_name || ""))}
</Text>
  </div>
  )
}

export default Textfull_name
