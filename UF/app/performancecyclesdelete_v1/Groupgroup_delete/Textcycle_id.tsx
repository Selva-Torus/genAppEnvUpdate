'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textcycle_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_performancecycle_v1Props, setdfd_performancecycle_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_deletebe86e, setgroup_deletebe86e}= useContext(TotalContext) as TotalContextProps;
  const {group_deletebe86eProps, setgroup_deletebe86eProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textfe4b7, setdelete_heading_textfe4b7}= useContext(TotalContext) as TotalContextProps;
  const {divider_s18ff5, setdivider_s18ff5}= useContext(TotalContext) as TotalContextProps;
  const {cycle_code_textea00f, setcycle_code_textea00f}= useContext(TotalContext) as TotalContextProps;
  const {cycle_code5f073, setcycle_code5f073}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name_text7ecc5, setcycle_name_text7ecc5}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name6a018, setcycle_name6a018}= useContext(TotalContext) as TotalContextProps;
  const {cycle_type_text57344, setcycle_type_text57344}= useContext(TotalContext) as TotalContextProps;
  const {cycle_type89f52, setcycle_type89f52}= useContext(TotalContext) as TotalContextProps;
  const {confo_text4c8be, setconfo_text4c8be}= useContext(TotalContext) as TotalContextProps;
  const {divider477db, setdivider477db}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonb2f7a, setcancel_buttonb2f7a}= useContext(TotalContext) as TotalContextProps;
  const {ok_button24d12, setok_button24d12}= useContext(TotalContext) as TotalContextProps;
  const {cycle_id8c16d, setcycle_id8c16d}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_performancecycle_v1Props && !dfd_performancecycle_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_performancecycle_v1Props.dstKey,
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
        setgroup_deletebe86e((pre: any) => {
          return { ...pre, cycle_id: api_paginationData.data.records[0]?.cycle_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_performancecycle_v1Props) && dfd_performancecycle_v1Props && !group_deletebe86e.cycle_id){
        setgroup_deletebe86e((pre:any)=>({...pre,cycle_id:dfd_performancecycle_v1Props[0]?.cycle_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[cycle_id8c16d?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_performancecycle_v1Props) && !group_deletebe86e.cycle_id){
    setgroup_deletebe86e((pre:any)=>({...pre,cycle_id:dfd_performancecycle_v1Props[0]?.cycle_id}));
  }
  },[dfd_performancecycle_v1Props])

  if (cycle_id8c16d?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 3`,gridRow: `44 / 45`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.cycle_id : (group_deletebe86e?.cycle_id || ""))}
</Text>
  </div>
  )
}

export default Textcycle_id
