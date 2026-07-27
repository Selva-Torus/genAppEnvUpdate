'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textfull_name = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_addperformancereviewmodify_v1Props, setdfd_addperformancereviewmodify_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete3ee3b, setgroup_delete3ee3b}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3ee3bProps, setgroup_delete3ee3bProps}= useContext(TotalContext) as TotalContextProps;
  const {divider_topc704d, setdivider_topc704d}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textdfa35, setdelete_heading_textdfa35}= useContext(TotalContext) as TotalContextProps;
  const {reviewnumb10f3, setreviewnumb10f3}= useContext(TotalContext) as TotalContextProps;
  const {review_number5cbc0, setreview_number5cbc0}= useContext(TotalContext) as TotalContextProps;
  const {employee_name564a0, setemployee_name564a0}= useContext(TotalContext) as TotalContextProps;
  const {full_name68092, setfull_name68092}= useContext(TotalContext) as TotalContextProps;
  const {cyclename50ebb, setcyclename50ebb}= useContext(TotalContext) as TotalContextProps;
  const {cycle_namecf2b5, setcycle_namecf2b5}= useContext(TotalContext) as TotalContextProps;
  const {statusbb202, setstatusbb202}= useContext(TotalContext) as TotalContextProps;
  const {review_status9db4f, setreview_status9db4f}= useContext(TotalContext) as TotalContextProps;
  const {confo_textd6ad8, setconfo_textd6ad8}= useContext(TotalContext) as TotalContextProps;
  const {divider652b0, setdivider652b0}= useContext(TotalContext) as TotalContextProps;
  const {review_id5d984, setreview_id5d984}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button5aa68, setcancel_button5aa68}= useContext(TotalContext) as TotalContextProps;
  const {ok_button9b4bd, setok_button9b4bd}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_addperformancereviewmodify_v1Props && !dfd_addperformancereviewmodify_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_addperformancereviewmodify_v1Props.dstKey,
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
        setgroup_delete3ee3b((pre: any) => {
          return { ...pre, employee_name: api_paginationData.data.records[0]?.employee_name }
        })
        }
      }
      else{
      if(Array.isArray(dfd_addperformancereviewmodify_v1Props) && dfd_addperformancereviewmodify_v1Props && !group_delete3ee3b.employee_name){
        setgroup_delete3ee3b((pre:any)=>({...pre,employee_name:dfd_addperformancereviewmodify_v1Props[0]?.employee_name}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[full_name68092?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_addperformancereviewmodify_v1Props) && !group_delete3ee3b.employee_name){
    setgroup_delete3ee3b((pre:any)=>({...pre,employee_name:dfd_addperformancereviewmodify_v1Props[0]?.employee_name}));
  }
  },[dfd_addperformancereviewmodify_v1Props])

  if (full_name68092?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `9 / 24`,gridRow: `17 / 22`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.employee_name : (group_delete3ee3b?.employee_name || ""))}
</Text>
  </div>
  )
}

export default Textfull_name
