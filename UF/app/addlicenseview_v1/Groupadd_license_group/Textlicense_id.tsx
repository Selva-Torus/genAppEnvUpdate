'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textlicense_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {add_license_group1bee6, setadd_license_group1bee6}= useContext(TotalContext) as TotalContextProps;
  const {add_license_group1bee6Props, setadd_license_group1bee6Props}= useContext(TotalContext) as TotalContextProps;
  const {license_information_group4e03c, setlicense_information_group4e03c}= useContext(TotalContext) as TotalContextProps;
  const {license_information_group4e03cProps, setlicense_information_group4e03cProps}= useContext(TotalContext) as TotalContextProps;
  const {license_configuration_groupa329d, setlicense_configuration_groupa329d}= useContext(TotalContext) as TotalContextProps;
  const {license_configuration_groupa329dProps, setlicense_configuration_groupa329dProps}= useContext(TotalContext) as TotalContextProps;
  const {validity_financial_details_groupb8a9f, setvalidity_financial_details_groupb8a9f}= useContext(TotalContext) as TotalContextProps;
  const {validity_financial_details_groupb8a9fProps, setvalidity_financial_details_groupb8a9fProps}= useContext(TotalContext) as TotalContextProps;
  const {license_id49b2a, setlicense_id49b2a}= useContext(TotalContext) as TotalContextProps;
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
        setadd_license_group1bee6((pre: any) => {
          return { ...pre, license_id: api_paginationData.data.records[0]?.license_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_assetsoftwarelicenses_v1Props) && dfd_assetsoftwarelicenses_v1Props && !add_license_group1bee6.license_id){
        setadd_license_group1bee6((pre:any)=>({...pre,license_id:dfd_assetsoftwarelicenses_v1Props[0]?.license_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[license_id49b2a?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_assetsoftwarelicenses_v1Props) && !add_license_group1bee6.license_id){
    setadd_license_group1bee6((pre:any)=>({...pre,license_id:dfd_assetsoftwarelicenses_v1Props[0]?.license_id}));
  }
  },[dfd_assetsoftwarelicenses_v1Props])

  if (license_id49b2a?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 3`,gridRow: `95 / 96`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="code-1"
  color="primary"
>
      {keyset(isDynamic ? item?.license_id : (add_license_group1bee6?.license_id || ""))}
</Text>
  </div>
  )
}

export default Textlicense_id
