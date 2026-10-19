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

const Textasset_data_class_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_dataclasslist_v1Props, setdfd_dataclasslist_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {overall_ai_asset_registryb99cd, setoverall_ai_asset_registryb99cd}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryb99cdProps, setoverall_ai_asset_registryb99cdProps}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group01907, setregister_ai_asset_group01907}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group01907Props, setregister_ai_asset_group01907Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_groupfe421, setasset_identity_groupfe421}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_groupfe421Props, setasset_identity_groupfe421Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_data_class_id8fe3d, setasset_data_class_id8fe3d}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions92938, setdynamicactions92938}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions92938Props, setdynamicactions92938Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_data_class_id8fe3dProps, setasset_data_class_id8fe3dProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_dataclasslist_v1Props && !dfd_dataclasslist_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_dataclasslist_v1Props.dstKey,
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
        setregister_ai_asset_group01907((pre: any) => ({
          ...pre,
          asset_data_class_id: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.asset_data_class_id
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setregister_ai_asset_group01907((pre: any) => ({
          ...pre,
          asset_data_class_id: asset_data_class_id8fe3dProps?.filteredData?.length > 0
            ? asset_data_class_id8fe3dProps?.filteredData[0]?.asset_data_class_id
            : "0"
        }))
      }else if(Array.isArray(dfd_dataclasslist_v1Props) && dfd_dataclasslist_v1Props && !register_ai_asset_group01907.asset_data_class_id){
        setregister_ai_asset_group01907((pre:any)=>({...pre,asset_data_class_id:dfd_dataclasslist_v1Props[0]?.asset_data_class_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[asset_data_class_id8fe3d?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_dataclasslist_v1Props) && !register_ai_asset_group01907.asset_data_class_id){
    setregister_ai_asset_group01907((pre:any)=>({...pre,asset_data_class_id:dfd_dataclasslist_v1Props[0]?.asset_data_class_id}));
  }
  },[dfd_dataclasslist_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!asset_data_class_id8fe3dProps?.filterProps) return;
    handleMapperValue(asset_data_class_id8fe3dProps?.filterProps,asset_data_class_id8fe3dProps?.filterFlag);
  },[asset_data_class_id8fe3dProps?.filterProps])

  if (asset_data_class_id8fe3d?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 3`,gridRow: `50 / 51`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset("Lorem ipsum dolor sit")}
</Text>
  </div>
  )
}

export default Textasset_data_class_id
