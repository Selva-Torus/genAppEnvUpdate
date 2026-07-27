'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textgrade_name = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {group_deletebeb3a, setgroup_deletebeb3a}= useContext(TotalContext) as TotalContextProps;
  const {group_deletebeb3aProps, setgroup_deletebeb3aProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text04bf4, setdelete_heading_text04bf4}= useContext(TotalContext) as TotalContextProps;
  const {position_code_text4b960, setposition_code_text4b960}= useContext(TotalContext) as TotalContextProps;
  const {position_codea4c8a, setposition_codea4c8a}= useContext(TotalContext) as TotalContextProps;
  const {position_title_textd9ad1, setposition_title_textd9ad1}= useContext(TotalContext) as TotalContextProps;
  const {position_titleee3e1, setposition_titleee3e1}= useContext(TotalContext) as TotalContextProps;
  const {grade_name_text9d72d, setgrade_name_text9d72d}= useContext(TotalContext) as TotalContextProps;
  const {grade_name2249c, setgrade_name2249c}= useContext(TotalContext) as TotalContextProps;
  const {job_level_text55a41, setjob_level_text55a41}= useContext(TotalContext) as TotalContextProps;
  const {job_level29550, setjob_level29550}= useContext(TotalContext) as TotalContextProps;
  const {vacancy_status_text733a2, setvacancy_status_text733a2}= useContext(TotalContext) as TotalContextProps;
  const {vacancy_status0fe05, setvacancy_status0fe05}= useContext(TotalContext) as TotalContextProps;
  const {confo_text9a251, setconfo_text9a251}= useContext(TotalContext) as TotalContextProps;
  const {position_idebcb1, setposition_idebcb1}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonedd0a, setcancel_buttonedd0a}= useContext(TotalContext) as TotalContextProps;
  const {ok_button1f631, setok_button1f631}= useContext(TotalContext) as TotalContextProps;
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
        setgroup_deletebeb3a((pre: any) => {
          return { ...pre, grade_code_name: api_paginationData.data.records[0]?.grade_code_name }
        })
        }
      }
      else{
      if(Array.isArray(dfd_jobpositions_v1Props) && dfd_jobpositions_v1Props && !group_deletebeb3a.grade_code_name){
        setgroup_deletebeb3a((pre:any)=>({...pre,grade_code_name:dfd_jobpositions_v1Props[0]?.grade_code_name}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[grade_name2249c?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_jobpositions_v1Props) && !group_deletebeb3a.grade_code_name){
    setgroup_deletebeb3a((pre:any)=>({...pre,grade_code_name:dfd_jobpositions_v1Props[0]?.grade_code_name}));
  }
  },[dfd_jobpositions_v1Props])

  if (grade_name2249c?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `8 / 24`,gridRow: `22 / 28`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !rounded-l !border !border-[#c4c4c4] !text-black"
  variant="subheader-2"
  color="primary"
>
      {keyset(isDynamic ? item?.grade_code_name : (group_deletebeb3a?.grade_code_name || ""))}
</Text>
  </div>
  )
}

export default Textgrade_name
