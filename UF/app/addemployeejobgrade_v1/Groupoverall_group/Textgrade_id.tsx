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
  const {overall_groupfc238, setoverall_groupfc238}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupfc238Props, setoverall_groupfc238Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_title7a754, setgrade_title7a754}= useContext(TotalContext) as TotalContextProps;
  const {grade_desefd9c, setgrade_desefd9c}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_groupddd50, setgrade_information_groupddd50}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_groupddd50Props, setgrade_information_groupddd50Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group49b64, setcompensation_benfits_group49b64}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group49b64Props, setcompensation_benfits_group49b64Props}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_group0f880, sethr_policies_group0f880}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_group0f880Props, sethr_policies_group0f880Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions7e8c7, setdynamicactions7e8c7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions7e8c7Props, setdynamicactions7e8c7Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_iddb511, setgrade_iddb511}= useContext(TotalContext) as TotalContextProps;
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
        setoverall_groupfc238((pre: any) => {
          return { ...pre, grade_id: api_paginationData.data.records[0]?.grade_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_jobgrade_v1Props) && dfd_jobgrade_v1Props && !overall_groupfc238.grade_id){
        setoverall_groupfc238((pre:any)=>({...pre,grade_id:dfd_jobgrade_v1Props[0]?.grade_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[grade_iddb511?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_jobgrade_v1Props) && !overall_groupfc238.grade_id){
    setoverall_groupfc238((pre:any)=>({...pre,grade_id:dfd_jobgrade_v1Props[0]?.grade_id}));
  }
  },[dfd_jobgrade_v1Props])

  if (grade_iddb511?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 2`,gridRow: `110 / 111`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.grade_id : (overall_groupfc238?.grade_id || ""))}
</Text>
  </div>
  )
}

export default Textgrade_id
