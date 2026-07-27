'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textadd_info = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {new_access_group8a441, setnew_access_group8a441}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group8a441Props, setnew_access_group8a441Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group578e5, setaccess_req__group578e5}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group578e5Props, setaccess_req__group578e5Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_groupeb48f, setemp_avail_groupeb48f}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_groupeb48fProps, setemp_avail_groupeb48fProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98af0, setleave_balance_group98af0}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98af0Props, setleave_balance_group98af0Props}= useContext(TotalContext) as TotalContextProps;
  const {app_det_group5b97e, setapp_det_group5b97e}= useContext(TotalContext) as TotalContextProps;
  const {app_det_group5b97eProps, setapp_det_group5b97eProps}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4d845, setapprove_group4d845}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4d845Props, setapprove_group4d845Props}= useContext(TotalContext) as TotalContextProps;
  const {audit_group2b7ff, setaudit_group2b7ff}= useContext(TotalContext) as TotalContextProps;
  const {audit_group2b7ffProps, setaudit_group2b7ffProps}= useContext(TotalContext) as TotalContextProps;
  const {add_info6942e, setadd_info6942e}= useContext(TotalContext) as TotalContextProps;
  const {add_inf_textareadbdbf, setadd_inf_textareadbdbf}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[add_info6942e?.refresh])

  if (add_info6942e?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold "
  variant="subheader-1"
  color="primary"
>
      {keyset("Additional Information")}
</Text>
  </div>
  )
}

export default Textadd_info
