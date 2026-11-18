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

const Textai_asset_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_authoritygrant_v1Props, setdfd_authoritygrant_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {overall_auth_grant_grpba23f, setoverall_auth_grant_grpba23f}= useContext(TotalContext) as TotalContextProps;
  const {overall_auth_grant_grpba23fProps, setoverall_auth_grant_grpba23fProps}= useContext(TotalContext) as TotalContextProps;
  const {revocat_info_group2037f, setrevocat_info_group2037f}= useContext(TotalContext) as TotalContextProps;
  const {revocat_info_group2037fProps, setrevocat_info_group2037fProps}= useContext(TotalContext) as TotalContextProps;
  const {authority_grant__textc6ded, setauthority_grant__textc6ded}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_details_groupd026c, setauth_grant_details_groupd026c}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_details_groupd026cProps, setauth_grant_details_groupd026cProps}= useContext(TotalContext) as TotalContextProps;
  const {finacial_transaction__group6585c, setfinacial_transaction__group6585c}= useContext(TotalContext) as TotalContextProps;
  const {finacial_transaction__group6585cProps, setfinacial_transaction__group6585cProps}= useContext(TotalContext) as TotalContextProps;
  const {condition_validity_group3e45f, setcondition_validity_group3e45f}= useContext(TotalContext) as TotalContextProps;
  const {condition_validity_group3e45fProps, setcondition_validity_group3e45fProps}= useContext(TotalContext) as TotalContextProps;
  const {certification_group91bfd, setcertification_group91bfd}= useContext(TotalContext) as TotalContextProps;
  const {certification_group91bfdProps, setcertification_group91bfdProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions401a9, setdynamicactions401a9}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions401a9Props, setdynamicactions401a9Props}= useContext(TotalContext) as TotalContextProps;
  const {authority_grant_id3078f, setauthority_grant_id3078f}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_idfa567, setai_asset_idfa567}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_idfa567Props, setai_asset_idfa567Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_authoritygrant_v1Props && !dfd_authoritygrant_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_authoritygrant_v1Props.dstKey,
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
        setrevocat_info_group2037f((pre: any) => ({
          ...pre,
          ai_asset_id: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.ai_asset_id
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setrevocat_info_group2037f((pre: any) => ({
          ...pre,
          ai_asset_id: ai_asset_idfa567Props?.filteredData?.length > 0
            ? ai_asset_idfa567Props?.filteredData[0]?.ai_asset_id
            : "0"
        }))
      }else if(Array.isArray(dfd_authoritygrant_v1Props) && dfd_authoritygrant_v1Props && !revocat_info_group2037f.ai_asset_id){
        setrevocat_info_group2037f((pre:any)=>({...pre,ai_asset_id:dfd_authoritygrant_v1Props[0]?.ai_asset_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[ai_asset_idfa567?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_authoritygrant_v1Props) && !revocat_info_group2037f.ai_asset_id){
    setrevocat_info_group2037f((pre:any)=>({...pre,ai_asset_id:dfd_authoritygrant_v1Props[0]?.ai_asset_id}));
  }
  },[dfd_authoritygrant_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!ai_asset_idfa567Props?.filterProps) return;
    handleMapperValue(ai_asset_idfa567Props?.filterProps,ai_asset_idfa567Props?.filterFlag);
  },[ai_asset_idfa567Props?.filterProps])

  if (ai_asset_idfa567?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `3 / 5`,gridRow: `99 / 100`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.ai_asset_id : (revocat_info_group2037f?.ai_asset_id || ""))}
</Text>
  </div>
  )
}

export default Textai_asset_id
