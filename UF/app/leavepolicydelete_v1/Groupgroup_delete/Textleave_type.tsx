'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textleave_type = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_leavepolicy_v1Props, setdfd_leavepolicy_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete40e71, setgroup_delete40e71}= useContext(TotalContext) as TotalContextProps;
  const {group_delete40e71Props, setgroup_delete40e71Props}= useContext(TotalContext) as TotalContextProps;
  const {divider_topb8510, setdivider_topb8510}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text43413, setdelete_heading_text43413}= useContext(TotalContext) as TotalContextProps;
  const {policy_code_textc4602, setpolicy_code_textc4602}= useContext(TotalContext) as TotalContextProps;
  const {policy_codeea843, setpolicy_codeea843}= useContext(TotalContext) as TotalContextProps;
  const {policy_nmf1837, setpolicy_nmf1837}= useContext(TotalContext) as TotalContextProps;
  const {policy_name3b3f3, setpolicy_name3b3f3}= useContext(TotalContext) as TotalContextProps;
  const {leave_typ6b883, setleave_typ6b883}= useContext(TotalContext) as TotalContextProps;
  const {leave_type0879a, setleave_type0879a}= useContext(TotalContext) as TotalContextProps;
  const {confo_text43c73, setconfo_text43c73}= useContext(TotalContext) as TotalContextProps;
  const {divider8d9a8, setdivider8d9a8}= useContext(TotalContext) as TotalContextProps;
  const {policy_id80b01, setpolicy_id80b01}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonc1acc, setcancel_buttonc1acc}= useContext(TotalContext) as TotalContextProps;
  const {ok_button4bf3f, setok_button4bf3f}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_leavepolicy_v1Props && !dfd_leavepolicy_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_leavepolicy_v1Props.dstKey,
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
        setgroup_delete40e71((pre: any) => {
          return { ...pre, leavetype: api_paginationData.data.records[0]?.leavetype }
        })
        }
      }
      else{
      if(Array.isArray(dfd_leavepolicy_v1Props) && dfd_leavepolicy_v1Props && !group_delete40e71.leavetype){
        setgroup_delete40e71((pre:any)=>({...pre,leavetype:dfd_leavepolicy_v1Props[0]?.leavetype}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[leave_type0879a?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_leavepolicy_v1Props) && !group_delete40e71.leavetype){
    setgroup_delete40e71((pre:any)=>({...pre,leavetype:dfd_leavepolicy_v1Props[0]?.leavetype}));
  }
  },[dfd_leavepolicy_v1Props])

  if (leave_type0879a?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `9 / 24`,gridRow: `23 / 28`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.leavetype : (group_delete40e71?.leavetype || ""))}
</Text>
  </div>
  )
}

export default Textleave_type
