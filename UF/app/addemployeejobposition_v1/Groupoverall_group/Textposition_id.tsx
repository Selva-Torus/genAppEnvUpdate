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
  const {overall_groupae38a, setoverall_groupae38a}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupae38aProps, setoverall_groupae38aProps}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group5335b, setposition_information_group5335b}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group5335bProps, setposition_information_group5335bProps}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6, setcompensation_benfits_groupb46e6}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6Props, setcompensation_benfits_groupb46e6Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44, setdynamicactions76c44}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44Props, setdynamicactions76c44Props}= useContext(TotalContext) as TotalContextProps;
  const {position_id8e1e3, setposition_id8e1e3}= useContext(TotalContext) as TotalContextProps;
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
        setoverall_groupae38a((pre: any) => {
          return { ...pre, position_id: api_paginationData.data.records[0]?.position_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_jobpositions_v1Props) && dfd_jobpositions_v1Props && !overall_groupae38a.position_id){
        setoverall_groupae38a((pre:any)=>({...pre,position_id:dfd_jobpositions_v1Props[0]?.position_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[position_id8e1e3?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_jobpositions_v1Props) && !overall_groupae38a.position_id){
    setoverall_groupae38a((pre:any)=>({...pre,position_id:dfd_jobpositions_v1Props[0]?.position_id}));
  }
  },[dfd_jobpositions_v1Props])

  if (position_id8e1e3?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 3`,gridRow: `91 / 92`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.position_id : (overall_groupae38a?.position_id || ""))}
</Text>
  </div>
  )
}

export default Textposition_id
