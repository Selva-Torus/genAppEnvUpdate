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

const Textmax_txn_per_day = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_authoritygranddynamicgroup_v1Props, setdfd_authoritygranddynamicgroup_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {overall_ai_asset_registry9dc87, setoverall_ai_asset_registry9dc87}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry9dc87Props, setoverall_ai_asset_registry9dc87Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamic_group_authority_group9ddb8, setdynamic_group_authority_group9ddb8}= useContext(TotalContext) as TotalContextProps;
  const {dynamic_group_authority_group9ddb8Props, setdynamic_group_authority_group9ddb8Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamic_group_authority6cb35, setdynamic_group_authority6cb35}= useContext(TotalContext) as TotalContextProps;
  const {dynamic_group_authority6cb35Props, setdynamic_group_authority6cb35Props}= useContext(TotalContext) as TotalContextProps;
  const {grant_code415fd, setgrant_code415fd}= useContext(TotalContext) as TotalContextProps;
  const {status3c177, setstatus3c177}= useContext(TotalContext) as TotalContextProps;
  const {asset_namefdd05, setasset_namefdd05}= useContext(TotalContext) as TotalContextProps;
  const {action_type48b5a, setaction_type48b5a}= useContext(TotalContext) as TotalContextProps;
  const {static1b59fa, setstatic1b59fa}= useContext(TotalContext) as TotalContextProps;
  const {max_amount_per_txn63c4f, setmax_amount_per_txn63c4f}= useContext(TotalContext) as TotalContextProps;
  const {static218e01, setstatic218e01}= useContext(TotalContext) as TotalContextProps;
  const {daily_amount_limitd326a, setdaily_amount_limitd326a}= useContext(TotalContext) as TotalContextProps;
  const {static3d73c5, setstatic3d73c5}= useContext(TotalContext) as TotalContextProps;
  const {hitl_threshold_amount021c8, sethitl_threshold_amount021c8}= useContext(TotalContext) as TotalContextProps;
  const {static437b9c, setstatic437b9c}= useContext(TotalContext) as TotalContextProps;
  const {max_txn_per_day0fc86, setmax_txn_per_day0fc86}= useContext(TotalContext) as TotalContextProps;
  const {static5bee64, setstatic5bee64}= useContext(TotalContext) as TotalContextProps;
  const {delegator_user_id55b43, setdelegator_user_id55b43}= useContext(TotalContext) as TotalContextProps;
  const {tool_group1f1a2, settool_group1f1a2}= useContext(TotalContext) as TotalContextProps;
  const {tool_group1f1a2Props, settool_group1f1a2Props}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant80694, settool_grant80694}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant80694Props, settool_grant80694Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group5e5a6, setai_registry_group5e5a6}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group5e5a6Props, setai_registry_group5e5a6Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table560c1, setai_registry_table560c1}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table560c1Props, setai_registry_table560c1Props}= useContext(TotalContext) as TotalContextProps;
  const {max_txn_per_day0fc86Props, setmax_txn_per_day0fc86Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_authoritygranddynamicgroup_v1Props && !dfd_authoritygranddynamicgroup_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_authoritygranddynamicgroup_v1Props.dstKey,
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
        setdynamic_group_authority6cb35((pre: any) => ({
          ...pre,
          max_txn_per_day: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.max_txn_per_day
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setdynamic_group_authority6cb35((pre: any) => ({
          ...pre,
          max_txn_per_day: max_txn_per_day0fc86Props?.filteredData?.length > 0
            ? max_txn_per_day0fc86Props?.filteredData[0]?.max_txn_per_day
            : "0"
        }))
      }else if(Array.isArray(dfd_authoritygranddynamicgroup_v1Props) && dfd_authoritygranddynamicgroup_v1Props && !dynamic_group_authority6cb35.max_txn_per_day){
        setdynamic_group_authority6cb35((pre:any)=>({...pre,max_txn_per_day:dfd_authoritygranddynamicgroup_v1Props[0]?.max_txn_per_day}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[max_txn_per_day0fc86?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_authoritygranddynamicgroup_v1Props) && !dynamic_group_authority6cb35.max_txn_per_day){
    setdynamic_group_authority6cb35((pre:any)=>({...pre,max_txn_per_day:dfd_authoritygranddynamicgroup_v1Props[0]?.max_txn_per_day}));
  }
  },[dfd_authoritygranddynamicgroup_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!max_txn_per_day0fc86Props?.filterProps) return;
    handleMapperValue(max_txn_per_day0fc86Props?.filterProps,max_txn_per_day0fc86Props?.filterFlag);
  },[max_txn_per_day0fc86Props?.filterProps])

  if (max_txn_per_day0fc86?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `10 / 22`,gridRow: `43 / 49`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="caption-2"
  color="primary"
>
      {keyset(isDynamic ? item?.max_txn_per_day : (dynamic_group_authority6cb35?.max_txn_per_day || ""))}
</Text>
  </div>
  )
}

export default Textmax_txn_per_day
