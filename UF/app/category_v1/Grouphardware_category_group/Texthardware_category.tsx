'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Texthardware_category = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetcategorycards_v1Props, setdfd_assetcategorycards_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {asset_dashboard_group485d3, setasset_dashboard_group485d3}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group485d3Props, setasset_dashboard_group485d3Props}= useContext(TotalContext) as TotalContextProps;
  const {total_asset_groupfe2e6, settotal_asset_groupfe2e6}= useContext(TotalContext) as TotalContextProps;
  const {total_asset_groupfe2e6Props, settotal_asset_groupfe2e6Props}= useContext(TotalContext) as TotalContextProps;
  const {software_category_group6e622, setsoftware_category_group6e622}= useContext(TotalContext) as TotalContextProps;
  const {software_category_group6e622Props, setsoftware_category_group6e622Props}= useContext(TotalContext) as TotalContextProps;
  const {hardware_category_groupfcf3f, sethardware_category_groupfcf3f}= useContext(TotalContext) as TotalContextProps;
  const {hardware_category_groupfcf3fProps, sethardware_category_groupfcf3fProps}= useContext(TotalContext) as TotalContextProps;
  const {hw_cat_divider1452f, sethw_cat_divider1452f}= useContext(TotalContext) as TotalContextProps;
  const {sc_iconbaaa3, setsc_iconbaaa3}= useContext(TotalContext) as TotalContextProps;
  const {hardware_category_text66f11, sethardware_category_text66f11}= useContext(TotalContext) as TotalContextProps;
  const {hardware_categoryad98e, sethardware_categoryad98e}= useContext(TotalContext) as TotalContextProps;
  const {req_maint_groupcf317, setreq_maint_groupcf317}= useContext(TotalContext) as TotalContextProps;
  const {req_maint_groupcf317Props, setreq_maint_groupcf317Props}= useContext(TotalContext) as TotalContextProps;
  const {cat_groupe0f50, setcat_groupe0f50}= useContext(TotalContext) as TotalContextProps;
  const {cat_groupe0f50Props, setcat_groupe0f50Props}= useContext(TotalContext) as TotalContextProps;
  const {category_table3e4ac, setcategory_table3e4ac}= useContext(TotalContext) as TotalContextProps;
  const {category_table3e4acProps, setcategory_table3e4acProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_assetcategorycards_v1Props && !dfd_assetcategorycards_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_assetcategorycards_v1Props.dstKey,
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
        sethardware_category_groupfcf3f((pre: any) => {
          return { ...pre, hardware_category: api_paginationData.data.records[0]?.hardware_category }
        })
        }
      }
      else{
      if(Array.isArray(dfd_assetcategorycards_v1Props) && dfd_assetcategorycards_v1Props && !hardware_category_groupfcf3f.hardware_category){
        sethardware_category_groupfcf3f((pre:any)=>({...pre,hardware_category:dfd_assetcategorycards_v1Props[0]?.hardware_category}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[hardware_categoryad98e?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_assetcategorycards_v1Props) && !hardware_category_groupfcf3f.hardware_category){
    sethardware_category_groupfcf3f((pre:any)=>({...pre,hardware_category:dfd_assetcategorycards_v1Props[0]?.hardware_category}));
  }
  },[dfd_assetcategorycards_v1Props])

  if (hardware_categoryad98e?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `3 / 23`,gridRow: `10 / 16`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className="!text-gray-900 !font-bold"
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.hardware_category : (hardware_category_groupfcf3f?.hardware_category || ""))}
</Text>
  </div>
  )
}

export default Texthardware_category
