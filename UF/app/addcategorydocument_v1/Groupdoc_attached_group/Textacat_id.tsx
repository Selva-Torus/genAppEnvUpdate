'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textacat_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_categorydoctable_v1Props, setdfd_categorydoctable_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {doc_attached_groupb9604, setdoc_attached_groupb9604}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupb9604Props, setdoc_attached_groupb9604Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupefcb8, settable_groupefcb8}= useContext(TotalContext) as TotalContextProps;
  const {table_groupefcb8Props, settable_groupefcb8Props}= useContext(TotalContext) as TotalContextProps;
  const {category_doc_table9b042, setcategory_doc_table9b042}= useContext(TotalContext) as TotalContextProps;
  const {category_doc_table9b042Props, setcategory_doc_table9b042Props}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanel643f7, setdocumentuploadpanel643f7}= useContext(TotalContext) as TotalContextProps;
  const {button_add_doc24b11, setbutton_add_doc24b11}= useContext(TotalContext) as TotalContextProps;
  const {acat_idf572e, setacat_idf572e}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_categorydoctable_v1Props && !dfd_categorydoctable_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_categorydoctable_v1Props.dstKey,
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
        setdoc_attached_groupb9604((pre: any) => {
          return { ...pre, acat_id: api_paginationData.data.records[0]?.acat_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_categorydoctable_v1Props) && dfd_categorydoctable_v1Props && !doc_attached_groupb9604.acat_id){
        setdoc_attached_groupb9604((pre:any)=>({...pre,acat_id:dfd_categorydoctable_v1Props[0]?.acat_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[acat_idf572e?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_categorydoctable_v1Props) && !doc_attached_groupb9604.acat_id){
    setdoc_attached_groupb9604((pre:any)=>({...pre,acat_id:dfd_categorydoctable_v1Props[0]?.acat_id}));
  }
  },[dfd_categorydoctable_v1Props])

  if (acat_idf572e?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 3`,gridRow: `149 / 150`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.acat_id : (doc_attached_groupb9604?.acat_id || ""))}
</Text>
  </div>
  )
}

export default Textacat_id
