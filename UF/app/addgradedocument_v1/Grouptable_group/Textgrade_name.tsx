'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textgrade_name = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_gradedoctable_v1Props, setdfd_gradedoctable_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {doc_attached_groupe6469, setdoc_attached_groupe6469}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupe6469Props, setdoc_attached_groupe6469Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group16d33, settable_group16d33}= useContext(TotalContext) as TotalContextProps;
  const {table_group16d33Props, settable_group16d33Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_id_text56f22, setgrade_id_text56f22}= useContext(TotalContext) as TotalContextProps;
  const {grade_id47240, setgrade_id47240}= useContext(TotalContext) as TotalContextProps;
  const {grade_name_texta5f89, setgrade_name_texta5f89}= useContext(TotalContext) as TotalContextProps;
  const {grade_name628eb, setgrade_name628eb}= useContext(TotalContext) as TotalContextProps;
  const {grade_doc_tablea652a, setgrade_doc_tablea652a}= useContext(TotalContext) as TotalContextProps;
  const {grade_doc_tablea652aProps, setgrade_doc_tablea652aProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_gradedoctable_v1Props && !dfd_gradedoctable_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_gradedoctable_v1Props.dstKey,
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
        settable_group16d33((pre: any) => {
          return { ...pre, grade_name: api_paginationData.data.records[0]?.grade_name }
        })
        }
      }
      else{
      if(Array.isArray(dfd_gradedoctable_v1Props) && dfd_gradedoctable_v1Props && !table_group16d33.grade_name){
        settable_group16d33((pre:any)=>({...pre,grade_name:dfd_gradedoctable_v1Props[0]?.grade_name}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[grade_name628eb?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_gradedoctable_v1Props) && !table_group16d33.grade_name){
    settable_group16d33((pre:any)=>({...pre,grade_name:dfd_gradedoctable_v1Props[0]?.grade_name}));
  }
  },[dfd_gradedoctable_v1Props])

  if (grade_name628eb?.isHidden) {
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
      {keyset(isDynamic ? item?.grade_name : (table_group16d33?.grade_name || ""))}
</Text>
  </div>
  )
}

export default Textgrade_name
