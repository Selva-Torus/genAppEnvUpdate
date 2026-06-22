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
  const {dfd_assetcategory_v1Props, setdfd_assetcategory_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {category_group70e38, setcategory_group70e38}= useContext(TotalContext) as TotalContextProps;
  const {category_group70e38Props, setcategory_group70e38Props}= useContext(TotalContext) as TotalContextProps;
  const {category_information_groupa040a, setcategory_information_groupa040a}= useContext(TotalContext) as TotalContextProps;
  const {category_information_groupa040aProps, setcategory_information_groupa040aProps}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_group06f09, setcategory_configuration_group06f09}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_group06f09Props, setcategory_configuration_group06f09Props}= useContext(TotalContext) as TotalContextProps;
  const {acat_id298b7, setacat_id298b7}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_assetcategory_v1Props && !dfd_assetcategory_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_assetcategory_v1Props.dstKey,
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
        setcategory_group70e38((pre: any) => {
          return { ...pre, acat_id: api_paginationData.data.records[0]?.acat_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_assetcategory_v1Props) && dfd_assetcategory_v1Props && !category_group70e38.acat_id){
        setcategory_group70e38((pre:any)=>({...pre,acat_id:dfd_assetcategory_v1Props[0]?.acat_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[acat_id298b7?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_assetcategory_v1Props) && !category_group70e38.acat_id){
    setcategory_group70e38((pre:any)=>({...pre,acat_id:dfd_assetcategory_v1Props[0]?.acat_id}));
  }
  },[dfd_assetcategory_v1Props])

  if (acat_id298b7?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 3`,gridRow: `61 / 62`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.acat_id : (category_group70e38?.acat_id || ""))}
</Text>
  </div>
  )
}

export default Textacat_id
