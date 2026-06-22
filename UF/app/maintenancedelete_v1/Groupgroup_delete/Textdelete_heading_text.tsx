'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textdelete_heading_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete3f77f, setgroup_delete3f77f}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3f77fProps, setgroup_delete3f77fProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text64ac6, setdelete_heading_text64ac6}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text99dc6, setasset_name_text99dc6}= useContext(TotalContext) as TotalContextProps;
  const {asset_name9f8b1, setasset_name9f8b1}= useContext(TotalContext) as TotalContextProps;
  const {maint_type_textf805a, setmaint_type_textf805a}= useContext(TotalContext) as TotalContextProps;
  const {maint_typefc524, setmaint_typefc524}= useContext(TotalContext) as TotalContextProps;
  const {priority_text5afe4, setpriority_text5afe4}= useContext(TotalContext) as TotalContextProps;
  const {priority1b975, setpriority1b975}= useContext(TotalContext) as TotalContextProps;
  const {schedule_date_textc8d71, setschedule_date_textc8d71}= useContext(TotalContext) as TotalContextProps;
  const {schedule_dateef711, setschedule_dateef711}= useContext(TotalContext) as TotalContextProps;
  const {performed_by_textb5193, setperformed_by_textb5193}= useContext(TotalContext) as TotalContextProps;
  const {performed_byc179b, setperformed_byc179b}= useContext(TotalContext) as TotalContextProps;
  const {confo_text7649e, setconfo_text7649e}= useContext(TotalContext) as TotalContextProps;
  const {maint_id927de, setmaint_id927de}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button36974, setcancel_button36974}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttond1793, setok_buttond1793}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[delete_heading_text64ac6?.refresh])

  if (delete_heading_text64ac6?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset("Are you sure you want to delete this maintenance record?")}
</Text>
  </div>
  )
}

export default Textdelete_heading_text
