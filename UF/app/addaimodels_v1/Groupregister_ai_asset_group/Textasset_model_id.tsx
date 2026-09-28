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

const Textasset_model_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_modeldetails_v1Props, setdfd_modeldetails_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {overall_ai_asset_registry61215, setoverall_ai_asset_registry61215}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry61215Props, setoverall_ai_asset_registry61215Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group1b724, setregister_ai_asset_group1b724}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group1b724Props, setregister_ai_asset_group1b724Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group905fc, setmodel_info_group905fc}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group905fcProps, setmodel_info_group905fcProps}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group4df86, setgrounding_group4df86}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group4df86Props, setgrounding_group4df86Props}= useContext(TotalContext) as TotalContextProps;
  const {validation_group50e82, setvalidation_group50e82}= useContext(TotalContext) as TotalContextProps;
  const {validation_group50e82Props, setvalidation_group50e82Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_model_id180c1, setasset_model_id180c1}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions16b90, setdynamicactions16b90}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions16b90Props, setdynamicactions16b90Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_model_id180c1Props, setasset_model_id180c1Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_modeldetails_v1Props && !dfd_modeldetails_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_modeldetails_v1Props.dstKey,
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
        setregister_ai_asset_group1b724((pre: any) => ({
          ...pre,
          asset_model_id: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.asset_model_id
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setregister_ai_asset_group1b724((pre: any) => ({
          ...pre,
          asset_model_id: asset_model_id180c1Props?.filteredData?.length > 0
            ? asset_model_id180c1Props?.filteredData[0]?.asset_model_id
            : "0"
        }))
      }else if(Array.isArray(dfd_modeldetails_v1Props) && dfd_modeldetails_v1Props && !register_ai_asset_group1b724.asset_model_id){
        setregister_ai_asset_group1b724((pre:any)=>({...pre,asset_model_id:dfd_modeldetails_v1Props[0]?.asset_model_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[asset_model_id180c1?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_modeldetails_v1Props) && !register_ai_asset_group1b724.asset_model_id){
    setregister_ai_asset_group1b724((pre:any)=>({...pre,asset_model_id:dfd_modeldetails_v1Props[0]?.asset_model_id}));
  }
  },[dfd_modeldetails_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!asset_model_id180c1Props?.filterProps) return;
    handleMapperValue(asset_model_id180c1Props?.filterProps,asset_model_id180c1Props?.filterFlag);
  },[asset_model_id180c1Props?.filterProps])

  if (asset_model_id180c1?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 3`,gridRow: `77 / 79`, gap:``, height: `100%`}} >
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

export default Textasset_model_id
