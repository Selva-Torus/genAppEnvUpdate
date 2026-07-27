'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textposition_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_jobpositions_v1Props, setdfd_jobpositions_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {overall_group2c693, setoverall_group2c693}= useContext(TotalContext) as TotalContextProps;
  const {overall_group2c693Props, setoverall_group2c693Props}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group67802, setposition_information_group67802}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group67802Props, setposition_information_group67802Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8fe, setcompensation_benfits_group0d8fe}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8feProps, setcompensation_benfits_group0d8feProps}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanel5ec2d, setdocumentuploadpanel5ec2d}= useContext(TotalContext) as TotalContextProps;
  const {position_id479a8, setposition_id479a8}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_jobpositions_v1Props && !dfd_jobpositions_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_jobpositions_v1Props.dstKey,
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
        setoverall_group2c693((pre: any) => {
          return { ...pre, position_id: api_paginationData.data.records[0]?.position_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_jobpositions_v1Props) && dfd_jobpositions_v1Props && !overall_group2c693.position_id){
        setoverall_group2c693((pre:any)=>({...pre,position_id:dfd_jobpositions_v1Props[0]?.position_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[position_id479a8?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_jobpositions_v1Props) && !overall_group2c693.position_id){
    setoverall_group2c693((pre:any)=>({...pre,position_id:dfd_jobpositions_v1Props[0]?.position_id}));
  }
  },[dfd_jobpositions_v1Props])

  if (position_id479a8?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 3`,gridRow: `155 / 156`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.position_id : (overall_group2c693?.position_id || ""))}
</Text>
  </div>
  )
}

export default Textposition_id
