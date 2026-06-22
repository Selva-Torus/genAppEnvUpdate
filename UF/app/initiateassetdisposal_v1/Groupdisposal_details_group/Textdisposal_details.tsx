'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textdisposal_details = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {initiate_asset_disposal_groupdb5a7, setinitiate_asset_disposal_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {initiate_asset_disposal_groupdb5a7Props, setinitiate_asset_disposal_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupe1b0c, setdisposal_details_groupe1b0c}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupe1b0cProps, setdisposal_details_groupe1b0cProps}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details0c71e, setdisposal_details0c71e}= useContext(TotalContext) as TotalContextProps;
  const {vendor_nameabdbb, setvendor_nameabdbb}= useContext(TotalContext) as TotalContextProps;
  const {asset_name819e8, setasset_name819e8}= useContext(TotalContext) as TotalContextProps;
  const {disposal_methoddeb30, setdisposal_methoddeb30}= useContext(TotalContext) as TotalContextProps;
  const {disposal_date12263, setdisposal_date12263}= useContext(TotalContext) as TotalContextProps;
  const {reasonadb68, setreasonadb68}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_group1f9bc, setcompliance_financial_group1f9bc}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_group1f9bcProps, setcompliance_financial_group1f9bcProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9a7ff, setdynamicactions9a7ff}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9a7ffProps, setdynamicactions9a7ffProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[disposal_details0c71e?.refresh])

  if (disposal_details0c71e?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 7`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset("Disposal details")}
</Text>
  </div>
  )
}

export default Textdisposal_details
