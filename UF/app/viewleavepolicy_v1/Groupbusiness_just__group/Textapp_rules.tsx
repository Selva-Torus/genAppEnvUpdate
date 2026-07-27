'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textapp_rules = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {business_just__group4dcdb, setbusiness_just__group4dcdb}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group4dcdbProps, setbusiness_just__group4dcdbProps}= useContext(TotalContext) as TotalContextProps;
  const {app_rules097e1, setapp_rules097e1}= useContext(TotalContext) as TotalContextProps;
  const {applicable_tod7cba, setapplicable_tod7cba}= useContext(TotalContext) as TotalContextProps;
  const {gender_applicability4d461, setgender_applicability4d461}= useContext(TotalContext) as TotalContextProps;
  const {applicable_locations81924, setapplicable_locations81924}= useContext(TotalContext) as TotalContextProps;
  const {provision_group68072, setprovision_group68072}= useContext(TotalContext) as TotalContextProps;
  const {provision_group68072Props, setprovision_group68072Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_group1e665, setleave_rule_group1e665}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_group1e665Props, setleave_rule_group1e665Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[app_rules097e1?.refresh])

  if (app_rules097e1?.isHidden) {
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
      {keyset("Applicability Rules")}
</Text>
  </div>
  )
}

export default Textapp_rules
