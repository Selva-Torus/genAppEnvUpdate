'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textwarranty_description = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetdashboard_v1Props, setdfd_assetdashboard_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {asset_dashboard_group4d6cb, setasset_dashboard_group4d6cb}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group4d6cbProps, setasset_dashboard_group4d6cbProps}= useContext(TotalContext) as TotalContextProps;
  const {total_asset_group69aa9, settotal_asset_group69aa9}= useContext(TotalContext) as TotalContextProps;
  const {total_asset_group69aa9Props, settotal_asset_group69aa9Props}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_due_group704ca, setmaintenance_due_group704ca}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_due_group704caProps, setmaintenance_due_group704caProps}= useContext(TotalContext) as TotalContextProps;
  const {warranty_expiring_groupb5bd4, setwarranty_expiring_groupb5bd4}= useContext(TotalContext) as TotalContextProps;
  const {warranty_expiring_groupb5bd4Props, setwarranty_expiring_groupb5bd4Props}= useContext(TotalContext) as TotalContextProps;
  const {warranty_expiring_dividerf7152, setwarranty_expiring_dividerf7152}= useContext(TotalContext) as TotalContextProps;
  const {warranty_expiring_texteee70, setwarranty_expiring_texteee70}= useContext(TotalContext) as TotalContextProps;
  const {warranty_expiringfa250, setwarranty_expiringfa250}= useContext(TotalContext) as TotalContextProps;
  const {warranty_description49c85, setwarranty_description49c85}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_group4beb5, setsoftware_licenses_group4beb5}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_group4beb5Props, setsoftware_licenses_group4beb5Props}= useContext(TotalContext) as TotalContextProps;
  const {pending_disposal_group2580d, setpending_disposal_group2580d}= useContext(TotalContext) as TotalContextProps;
  const {pending_disposal_group2580dProps, setpending_disposal_group2580dProps}= useContext(TotalContext) as TotalContextProps;
  const {table_group94010, settable_group94010}= useContext(TotalContext) as TotalContextProps;
  const {table_group94010Props, settable_group94010Props}= useContext(TotalContext) as TotalContextProps;
  const {subscreen99589, setsubscreen99589}= useContext(TotalContext) as TotalContextProps;
  const {subscreen99589Props, setsubscreen99589Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_asset_v104dc1, setct006_af_uf_ufws_ecp_ams_asset_v104dc1}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_asset_v104dc1Props, setct006_af_uf_ufws_ecp_ams_asset_v104dc1Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_table_group6fffa, setasset_table_group6fffa}= useContext(TotalContext) as TotalContextProps;
  const {asset_table_group6fffaProps, setasset_table_group6fffaProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_table6082a, setasset_table6082a}= useContext(TotalContext) as TotalContextProps;
  const {asset_table6082aProps, setasset_table6082aProps}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e, setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps, setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_maintenance_table_groupe042b, setasset_maintenance_table_groupe042b}= useContext(TotalContext) as TotalContextProps;
  const {asset_maintenance_table_groupe042bProps, setasset_maintenance_table_groupe042bProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_maintenance_table6cdf1, setasset_maintenance_table6cdf1}= useContext(TotalContext) as TotalContextProps;
  const {asset_maintenance_table6cdf1Props, setasset_maintenance_table6cdf1Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426, setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props, setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_software_licenses_table_groupcb553, setasset_software_licenses_table_groupcb553}= useContext(TotalContext) as TotalContextProps;
  const {asset_software_licenses_table_groupcb553Props, setasset_software_licenses_table_groupcb553Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_software_licenses_table13758, setasset_software_licenses_table13758}= useContext(TotalContext) as TotalContextProps;
  const {asset_software_licenses_table13758Props, setasset_software_licenses_table13758Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1, setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props, setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_disposal_table_group329e9, setasset_disposal_table_group329e9}= useContext(TotalContext) as TotalContextProps;
  const {asset_disposal_table_group329e9Props, setasset_disposal_table_group329e9Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_disposal_table440cd, setasset_disposal_table440cd}= useContext(TotalContext) as TotalContextProps;
  const {asset_disposal_table440cdProps, setasset_disposal_table440cdProps}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7, setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props, setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props}= useContext(TotalContext) as TotalContextProps;
  const {warrenty_expiring_table_group116d1, setwarrenty_expiring_table_group116d1}= useContext(TotalContext) as TotalContextProps;
  const {warrenty_expiring_table_group116d1Props, setwarrenty_expiring_table_group116d1Props}= useContext(TotalContext) as TotalContextProps;
  const {warrenty_expiring_tablee3168, setwarrenty_expiring_tablee3168}= useContext(TotalContext) as TotalContextProps;
  const {warrenty_expiring_tablee3168Props, setwarrenty_expiring_tablee3168Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_assetdashboard_v1Props && !dfd_assetdashboard_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_assetdashboard_v1Props.dstKey,
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
        setwarranty_expiring_groupb5bd4((pre: any) => {
          return { ...pre, warranty_description: api_paginationData.data.records[0]?.warranty_description }
        })
        }
      }
      else{
      if(Array.isArray(dfd_assetdashboard_v1Props) && dfd_assetdashboard_v1Props && !warranty_expiring_groupb5bd4.warranty_description){
        setwarranty_expiring_groupb5bd4((pre:any)=>({...pre,warranty_description:dfd_assetdashboard_v1Props[0]?.warranty_description}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[warranty_description49c85?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_assetdashboard_v1Props) && !warranty_expiring_groupb5bd4.warranty_description){
    setwarranty_expiring_groupb5bd4((pre:any)=>({...pre,warranty_description:dfd_assetdashboard_v1Props[0]?.warranty_description}));
  }
  },[dfd_assetdashboard_v1Props])

  if (warranty_description49c85?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `16 / 22`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-gray-600"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.warranty_description : (warranty_expiring_groupb5bd4?.warranty_description || ""))}
</Text>
  </div>
  )
}

export default Textwarranty_description
