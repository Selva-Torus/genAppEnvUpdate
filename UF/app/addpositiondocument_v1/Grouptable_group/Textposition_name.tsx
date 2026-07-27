'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textposition_name = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_positiondoctable_v1Props, setdfd_positiondoctable_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {doc_attached_groupedd83, setdoc_attached_groupedd83}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupedd83Props, setdoc_attached_groupedd83Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group5e697, settable_group5e697}= useContext(TotalContext) as TotalContextProps;
  const {table_group5e697Props, settable_group5e697Props}= useContext(TotalContext) as TotalContextProps;
  const {position_id_text19613, setposition_id_text19613}= useContext(TotalContext) as TotalContextProps;
  const {position_id7990c, setposition_id7990c}= useContext(TotalContext) as TotalContextProps;
  const {position_name_text4bbbe, setposition_name_text4bbbe}= useContext(TotalContext) as TotalContextProps;
  const {position_namee3147, setposition_namee3147}= useContext(TotalContext) as TotalContextProps;
  const {position_doc_tableb28d5, setposition_doc_tableb28d5}= useContext(TotalContext) as TotalContextProps;
  const {position_doc_tableb28d5Props, setposition_doc_tableb28d5Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_positiondoctable_v1Props && !dfd_positiondoctable_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_positiondoctable_v1Props.dstKey,
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
        settable_group5e697((pre: any) => {
          return { ...pre, position_name: api_paginationData.data.records[0]?.position_name }
        })
        }
      }
      else{
      if(Array.isArray(dfd_positiondoctable_v1Props) && dfd_positiondoctable_v1Props && !table_group5e697.position_name){
        settable_group5e697((pre:any)=>({...pre,position_name:dfd_positiondoctable_v1Props[0]?.position_name}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[position_namee3147?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_positiondoctable_v1Props) && !table_group5e697.position_name){
    settable_group5e697((pre:any)=>({...pre,position_name:dfd_positiondoctable_v1Props[0]?.position_name}));
  }
  },[dfd_positiondoctable_v1Props])

  if (position_namee3147?.isHidden) {
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
      {keyset(isDynamic ? item?.position_name : (table_group5e697?.position_name || ""))}
</Text>
  </div>
  )
}

export default Textposition_name
