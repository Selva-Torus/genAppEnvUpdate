'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textsalary_range = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {group_deletea1de0, setgroup_deletea1de0}= useContext(TotalContext) as TotalContextProps;
  const {group_deletea1de0Props, setgroup_deletea1de0Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text14d64, setdelete_heading_text14d64}= useContext(TotalContext) as TotalContextProps;
  const {grade_code_textff14c, setgrade_code_textff14c}= useContext(TotalContext) as TotalContextProps;
  const {grade_code812e5, setgrade_code812e5}= useContext(TotalContext) as TotalContextProps;
  const {grade_name_textea710, setgrade_name_textea710}= useContext(TotalContext) as TotalContextProps;
  const {grade_nameaa0a4, setgrade_nameaa0a4}= useContext(TotalContext) as TotalContextProps;
  const {grade_level_text85021, setgrade_level_text85021}= useContext(TotalContext) as TotalContextProps;
  const {grade_level40e36, setgrade_level40e36}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_text80689, setsalary_range_text80689}= useContext(TotalContext) as TotalContextProps;
  const {salary_range4d41c, setsalary_range4d41c}= useContext(TotalContext) as TotalContextProps;
  const {appraisal_cycle_text2841d, setappraisal_cycle_text2841d}= useContext(TotalContext) as TotalContextProps;
  const {appraisal_cycle961f2, setappraisal_cycle961f2}= useContext(TotalContext) as TotalContextProps;
  const {confo_texta7470, setconfo_texta7470}= useContext(TotalContext) as TotalContextProps;
  const {grade_id65c54, setgrade_id65c54}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button0a3db, setcancel_button0a3db}= useContext(TotalContext) as TotalContextProps;
  const {ok_button504a2, setok_button504a2}= useContext(TotalContext) as TotalContextProps;
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
        setgroup_deletea1de0((pre: any) => {
          return { ...pre, salary_range: api_paginationData.data.records[0]?.salary_range }
        })
        }
      }
      else{
      if(Array.isArray(dfd_jobgrade_v1Props) && dfd_jobgrade_v1Props && !group_deletea1de0.salary_range){
        setgroup_deletea1de0((pre:any)=>({...pre,salary_range:dfd_jobgrade_v1Props[0]?.salary_range}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[salary_range4d41c?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_jobgrade_v1Props) && !group_deletea1de0.salary_range){
    setgroup_deletea1de0((pre:any)=>({...pre,salary_range:dfd_jobgrade_v1Props[0]?.salary_range}));
  }
  },[dfd_jobgrade_v1Props])

  if (salary_range4d41c?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `8 / 24`,gridRow: `29 / 35`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !rounded-l !border !border-[#c4c4c4] !text-black"
  variant="subheader-2"
  color="primary"
>
      {keyset(isDynamic ? item?.salary_range : (group_deletea1de0?.salary_range || ""))}
</Text>
  </div>
  )
}

export default Textsalary_range
