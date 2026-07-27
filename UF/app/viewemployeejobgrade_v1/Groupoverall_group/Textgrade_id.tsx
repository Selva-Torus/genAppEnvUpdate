'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textgrade_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_jobgrade_v1Props, setdfd_jobgrade_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {overall_group926e0, setoverall_group926e0}= useContext(TotalContext) as TotalContextProps;
  const {overall_group926e0Props, setoverall_group926e0Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_title638d2, setgrade_title638d2}= useContext(TotalContext) as TotalContextProps;
  const {grade_des7783b, setgrade_des7783b}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_group162a8, setgrade_information_group162a8}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_group162a8Props, setgrade_information_group162a8Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupa044d, setcompensation_benfits_groupa044d}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupa044dProps, setcompensation_benfits_groupa044dProps}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_groupa0e79, sethr_policies_groupa0e79}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_groupa0e79Props, sethr_policies_groupa0e79Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_idec4e8, setgrade_idec4e8}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_jobgrade_v1Props && !dfd_jobgrade_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_jobgrade_v1Props.dstKey,
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
        setoverall_group926e0((pre: any) => {
          return { ...pre, grade_id: api_paginationData.data.records[0]?.grade_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_jobgrade_v1Props) && dfd_jobgrade_v1Props && !overall_group926e0.grade_id){
        setoverall_group926e0((pre:any)=>({...pre,grade_id:dfd_jobgrade_v1Props[0]?.grade_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[grade_idec4e8?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_jobgrade_v1Props) && !overall_group926e0.grade_id){
    setoverall_group926e0((pre:any)=>({...pre,grade_id:dfd_jobgrade_v1Props[0]?.grade_id}));
  }
  },[dfd_jobgrade_v1Props])

  if (grade_idec4e8?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 2`,gridRow: `107 / 108`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.grade_id : (overall_group926e0?.grade_id || ""))}
</Text>
  </div>
  )
}

export default Textgrade_id
