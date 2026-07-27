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
  const {dfd_addperformancecyclemodify_v1Props, setdfd_addperformancecyclemodify_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {new_access_groupc1763, setnew_access_groupc1763}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc1763Props, setnew_access_groupc1763Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group70ea9, setaccess_req__group70ea9}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group70ea9Props, setaccess_req__group70ea9Props}= useContext(TotalContext) as TotalContextProps;
  const {valid_group35ad5, setvalid_group35ad5}= useContext(TotalContext) as TotalContextProps;
  const {valid_group35ad5Props, setvalid_group35ad5Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicjsonform81ed5, setdynamicjsonform81ed5}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_dynamicjsonformd624a, setadditional_details_dynamicjsonformd624a}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2db99, setbusiness_just__group2db99}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2db99Props, setbusiness_just__group2db99Props}= useContext(TotalContext) as TotalContextProps;
  const {cycle_id84005, setcycle_id84005}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_addperformancecyclemodify_v1Props && !dfd_addperformancecyclemodify_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_addperformancecyclemodify_v1Props.dstKey,
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
        setnew_access_groupc1763((pre: any) => {
          return { ...pre, cycle_id: api_paginationData.data.records[0]?.cycle_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_addperformancecyclemodify_v1Props) && dfd_addperformancecyclemodify_v1Props && !new_access_groupc1763.cycle_id){
        setnew_access_groupc1763((pre:any)=>({...pre,cycle_id:dfd_addperformancecyclemodify_v1Props[0]?.cycle_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[cycle_id84005?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_addperformancecyclemodify_v1Props) && !new_access_groupc1763.cycle_id){
    setnew_access_groupc1763((pre:any)=>({...pre,cycle_id:dfd_addperformancecyclemodify_v1Props[0]?.cycle_id}));
  }
  },[dfd_addperformancecyclemodify_v1Props])

  if (cycle_id84005?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 4`,gridRow: `105 / 106`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.cycle_id : (new_access_groupc1763?.cycle_id || ""))}
</Text>
  </div>
  )
}

export default Textcycle_id
