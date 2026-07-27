'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textemployee_code = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employeedoctable_v1Props, setdfd_employeedoctable_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {doc_attached_groupac2a0, setdoc_attached_groupac2a0}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupac2a0Props, setdoc_attached_groupac2a0Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group034b1, settable_group034b1}= useContext(TotalContext) as TotalContextProps;
  const {table_group034b1Props, settable_group034b1Props}= useContext(TotalContext) as TotalContextProps;
  const {employee_id_text0c3bb, setemployee_id_text0c3bb}= useContext(TotalContext) as TotalContextProps;
  const {employee_id7455d, setemployee_id7455d}= useContext(TotalContext) as TotalContextProps;
  const {employee_code_text464d8, setemployee_code_text464d8}= useContext(TotalContext) as TotalContextProps;
  const {employee_coded1c2f, setemployee_coded1c2f}= useContext(TotalContext) as TotalContextProps;
  const {employee_name_textca8de, setemployee_name_textca8de}= useContext(TotalContext) as TotalContextProps;
  const {full_namede77c, setfull_namede77c}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tableb42f3, setemployee_doc_tableb42f3}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tableb42f3Props, setemployee_doc_tableb42f3Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_employeedoctable_v1Props && !dfd_employeedoctable_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_employeedoctable_v1Props.dstKey,
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
        settable_group034b1((pre: any) => {
          return { ...pre, employee_code: api_paginationData.data.records[0]?.employee_code }
        })
        }
      }
      else{
      if(Array.isArray(dfd_employeedoctable_v1Props) && dfd_employeedoctable_v1Props && !table_group034b1.employee_code){
        settable_group034b1((pre:any)=>({...pre,employee_code:dfd_employeedoctable_v1Props[0]?.employee_code}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[employee_coded1c2f?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_employeedoctable_v1Props) && !table_group034b1.employee_code){
    settable_group034b1((pre:any)=>({...pre,employee_code:dfd_employeedoctable_v1Props[0]?.employee_code}));
  }
  },[dfd_employeedoctable_v1Props])

  if (employee_coded1c2f?.isHidden) {
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
      {keyset(isDynamic ? item?.employee_code : (table_group034b1?.employee_code || ""))}
</Text>
  </div>
  )
}

export default Textemployee_code
