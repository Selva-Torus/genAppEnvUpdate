'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { useGlobal } from '@/context/GlobalContext'
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textasset_name = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tierassessment_v1Props, setdfd_tierassessment_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {overall_ai_asset_registry1e42b, setoverall_ai_asset_registry1e42b}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry1e42bProps, setoverall_ai_asset_registry1e42bProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupb6b42, setai_registry_groupb6b42}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupb6b42Props, setai_registry_groupb6b42Props}= useContext(TotalContext) as TotalContextProps;
  const {group675e8, setgroup675e8}= useContext(TotalContext) as TotalContextProps;
  const {group675e8Props, setgroup675e8Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_text65667, setasset_text65667}= useContext(TotalContext) as TotalContextProps;
  const {desc_groupda73a, setdesc_groupda73a}= useContext(TotalContext) as TotalContextProps;
  const {desc_groupda73aProps, setdesc_groupda73aProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text1cbe3, setasset_code_text1cbe3}= useContext(TotalContext) as TotalContextProps;
  const {asset_code2ce4b, setasset_code2ce4b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textd22c2, setasset_name_textd22c2}= useContext(TotalContext) as TotalContextProps;
  const {asset_name32f12, setasset_name32f12}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_texte12db, setrisk_tier_texte12db}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code611f1, setrisk_tier_code611f1}= useContext(TotalContext) as TotalContextProps;
  const {bus_unit_text980f9, setbus_unit_text980f9}= useContext(TotalContext) as TotalContextProps;
  const {business_unit_namec3c51, setbusiness_unit_namec3c51}= useContext(TotalContext) as TotalContextProps;
  const {owner_name_textbda95, setowner_name_textbda95}= useContext(TotalContext) as TotalContextProps;
  const {business_owner_namef2a73, setbusiness_owner_namef2a73}= useContext(TotalContext) as TotalContextProps;
  const {rule_group83db0, setrule_group83db0}= useContext(TotalContext) as TotalContextProps;
  const {rule_group83db0Props, setrule_group83db0Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_evaluation_table9e865, setrule_evaluation_table9e865}= useContext(TotalContext) as TotalContextProps;
  const {rule_evaluation_table9e865Props, setrule_evaluation_table9e865Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_name32f12Props, setasset_name32f12Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_tierassessment_v1Props && !dfd_tierassessment_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_tierassessment_v1Props.dstKey,
            page: 1,
            count: 1,
            filterData: searchFilter
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        setgroup675e8((pre: any) => ({
          ...pre,
          asset_name: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.asset_name
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setgroup675e8((pre: any) => ({
          ...pre,
          asset_name: asset_name32f12Props?.filteredData?.length > 0
            ? asset_name32f12Props?.filteredData[0]?.asset_name
            : "0"
        }))
      }else if(Array.isArray(dfd_tierassessment_v1Props) && dfd_tierassessment_v1Props && !group675e8.asset_name){
        setgroup675e8((pre:any)=>({...pre,asset_name:dfd_tierassessment_v1Props[0]?.asset_name}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[asset_name32f12?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_tierassessment_v1Props) && !group675e8.asset_name){
    setgroup675e8((pre:any)=>({...pre,asset_name:dfd_tierassessment_v1Props[0]?.asset_name}));
  }
  },[dfd_tierassessment_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!asset_name32f12Props?.filterProps) return;
    handleMapperValue(asset_name32f12Props?.filterProps,asset_name32f12Props?.filterFlag);
  },[asset_name32f12Props?.filterProps])

  if (asset_name32f12?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `4 / 13`,gridRow: `17 / 23`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!p-1 !bg-[#f0f2f7] !rounded-l !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.asset_name : (group675e8?.asset_name || ""))}
</Text>
  </div>
  )
}

export default Textasset_name
