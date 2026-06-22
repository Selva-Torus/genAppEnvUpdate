'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textproduct_name = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetsoftwarelicenses_v1Props, setdfd_assetsoftwarelicenses_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_deletedf5b8, setgroup_deletedf5b8}= useContext(TotalContext) as TotalContextProps;
  const {group_deletedf5b8Props, setgroup_deletedf5b8Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textb375f, setdelete_heading_textb375f}= useContext(TotalContext) as TotalContextProps;
  const {product_name_text501de, setproduct_name_text501de}= useContext(TotalContext) as TotalContextProps;
  const {product_namead2dd, setproduct_namead2dd}= useContext(TotalContext) as TotalContextProps;
  const {license_type_text3c22b, setlicense_type_text3c22b}= useContext(TotalContext) as TotalContextProps;
  const {license_typecec9e, setlicense_typecec9e}= useContext(TotalContext) as TotalContextProps;
  const {auto_renewal_textbdbd2, setauto_renewal_textbdbd2}= useContext(TotalContext) as TotalContextProps;
  const {auto_renewal8e280, setauto_renewal8e280}= useContext(TotalContext) as TotalContextProps;
  const {seats_total_texta19fe, setseats_total_texta19fe}= useContext(TotalContext) as TotalContextProps;
  const {seats_totalf37ee, setseats_totalf37ee}= useContext(TotalContext) as TotalContextProps;
  const {seats_used_textc1a25, setseats_used_textc1a25}= useContext(TotalContext) as TotalContextProps;
  const {seats_used8c8d5, setseats_used8c8d5}= useContext(TotalContext) as TotalContextProps;
  const {confo_textbc695, setconfo_textbc695}= useContext(TotalContext) as TotalContextProps;
  const {license_id027b5, setlicense_id027b5}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button3e8d9, setcancel_button3e8d9}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonf3727, setok_buttonf3727}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_assetsoftwarelicenses_v1Props && !dfd_assetsoftwarelicenses_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_assetsoftwarelicenses_v1Props.dstKey,
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
        setgroup_deletedf5b8((pre: any) => {
          return { ...pre, product_name: api_paginationData.data.records[0]?.product_name }
        })
        }
      }
      else{
      if(Array.isArray(dfd_assetsoftwarelicenses_v1Props) && dfd_assetsoftwarelicenses_v1Props && !group_deletedf5b8.product_name){
        setgroup_deletedf5b8((pre:any)=>({...pre,product_name:dfd_assetsoftwarelicenses_v1Props[0]?.product_name}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[product_namead2dd?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_assetsoftwarelicenses_v1Props) && !group_deletedf5b8.product_name){
    setgroup_deletedf5b8((pre:any)=>({...pre,product_name:dfd_assetsoftwarelicenses_v1Props[0]?.product_name}));
  }
  },[dfd_assetsoftwarelicenses_v1Props])

  if (product_namead2dd?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `9 / 24`,gridRow: `9 / 15`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !rounded-l !border !border-[#c4c4c4] !text-black"
  variant="subheader-2"
  color="primary"
>
      {keyset(isDynamic ? item?.product_name : (group_deletedf5b8?.product_name || ""))}
</Text>
  </div>
  )
}

export default Textproduct_name
