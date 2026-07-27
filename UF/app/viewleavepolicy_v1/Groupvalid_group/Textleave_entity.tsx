'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textleave_entity = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {new_access_group193d2, setnew_access_group193d2}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group193d2Props, setnew_access_group193d2Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupc57b7, setaccess_req__groupc57b7}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupc57b7Props, setaccess_req__groupc57b7Props}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group60e94, setapp_inf_group60e94}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group60e94Props, setapp_inf_group60e94Props}= useContext(TotalContext) as TotalContextProps;
  const {approve_group27e47, setapprove_group27e47}= useContext(TotalContext) as TotalContextProps;
  const {approve_group27e47Props, setapprove_group27e47Props}= useContext(TotalContext) as TotalContextProps;
  const {valid_group60f4e, setvalid_group60f4e}= useContext(TotalContext) as TotalContextProps;
  const {valid_group60f4eProps, setvalid_group60f4eProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_entity44a9e, setleave_entity44a9e}= useContext(TotalContext) as TotalContextProps;
  const {days_per_year540db, setdays_per_year540db}= useContext(TotalContext) as TotalContextProps;
  const {carry_forward_days069b8, setcarry_forward_days069b8}= useContext(TotalContext) as TotalContextProps;
  const {carry_forward_expiry2db6d, setcarry_forward_expiry2db6d}= useContext(TotalContext) as TotalContextProps;
  const {accrual_frequency7324d, setaccrual_frequency7324d}= useContext(TotalContext) as TotalContextProps;
  const {max_consecutive_days47fe8, setmax_consecutive_days47fe8}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group4dcdb, setbusiness_just__group4dcdb}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group4dcdbProps, setbusiness_just__group4dcdbProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_group68072, setprovision_group68072}= useContext(TotalContext) as TotalContextProps;
  const {provision_group68072Props, setprovision_group68072Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_group1e665, setleave_rule_group1e665}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_group1e665Props, setleave_rule_group1e665Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[leave_entity44a9e?.refresh])

  if (leave_entity44a9e?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 12`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold"
  variant="subheader-1"
  color="primary"
>
      {keyset("Leave Entitlement Configuration")}
</Text>
  </div>
  )
}

export default Textleave_entity
