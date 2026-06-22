'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Texttotal_categories = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {total_category_divider52a07, settotal_category_divider52a07}= useContext(TotalContext) as TotalContextProps;
  const {tc_icon1ed4f, settc_icon1ed4f}= useContext(TotalContext) as TotalContextProps;
  const {total_category_textb2d2f, settotal_category_textb2d2f}= useContext(TotalContext) as TotalContextProps;
  const {total_categories55fa9, settotal_categories55fa9}= useContext(TotalContext) as TotalContextProps;
  const {software_category_group6e622, setsoftware_category_group6e622}= useContext(TotalContext) as TotalContextProps;
  const {software_category_group6e622Props, setsoftware_category_group6e622Props}= useContext(TotalContext) as TotalContextProps;
  const {hardware_category_groupfcf3f, sethardware_category_groupfcf3f}= useContext(TotalContext) as TotalContextProps;
  const {hardware_category_groupfcf3fProps, sethardware_category_groupfcf3fProps}= useContext(TotalContext) as TotalContextProps;
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
        settotal_asset_groupfe2e6((pre: any) => {
          return { ...pre, total_categories: api_paginationData.data.records[0]?.total_categories }
        })
        }
      }
      else{
      if(Array.isArray(dfd_assetcategorycards_v1Props) && dfd_assetcategorycards_v1Props && !total_asset_groupfe2e6.total_categories){
        settotal_asset_groupfe2e6((pre:any)=>({...pre,total_categories:dfd_assetcategorycards_v1Props[0]?.total_categories}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[total_categories55fa9?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_assetcategorycards_v1Props) && !total_asset_groupfe2e6.total_categories){
    settotal_asset_groupfe2e6((pre:any)=>({...pre,total_categories:dfd_assetcategorycards_v1Props[0]?.total_categories}));
  }
  },[dfd_assetcategorycards_v1Props])

  if (total_categories55fa9?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `4 / 21`,gridRow: `10 / 16`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className="!text-gray-900 !font-bold"
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.total_categories : (total_asset_groupfe2e6?.total_categories || ""))}
</Text>
  </div>
  )
}

export default Texttotal_categories
