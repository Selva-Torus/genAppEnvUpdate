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

const Textcredential_ref_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_credentialref_v1Props, setdfd_credentialref_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {overall_group28e6a, setoverall_group28e6a}= useContext(TotalContext) as TotalContextProps;
  const {overall_group28e6aProps, setoverall_group28e6aProps}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group24206, setaction_details_group24206}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group24206Props, setaction_details_group24206Props}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group383de, setaction_detail_group383de}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group383deProps, setaction_detail_group383deProps}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group5fe07, setrisk_conf_group5fe07}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group5fe07Props, setrisk_conf_group5fe07Props}= useContext(TotalContext) as TotalContextProps;
  const {credential_ref_idb11d6, setcredential_ref_idb11d6}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9ea03, setdynamicactions9ea03}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9ea03Props, setdynamicactions9ea03Props}= useContext(TotalContext) as TotalContextProps;
  const {credential_ref_idb11d6Props, setcredential_ref_idb11d6Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_credentialref_v1Props && !dfd_credentialref_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_credentialref_v1Props.dstKey,
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
        setaction_details_group24206((pre: any) => ({
          ...pre,
          credential_ref_id: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.credential_ref_id
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setaction_details_group24206((pre: any) => ({
          ...pre,
          credential_ref_id: credential_ref_idb11d6Props?.filteredData?.length > 0
            ? credential_ref_idb11d6Props?.filteredData[0]?.credential_ref_id
            : "0"
        }))
      }else if(Array.isArray(dfd_credentialref_v1Props) && dfd_credentialref_v1Props && !action_details_group24206.credential_ref_id){
        setaction_details_group24206((pre:any)=>({...pre,credential_ref_id:dfd_credentialref_v1Props[0]?.credential_ref_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[credential_ref_idb11d6?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_credentialref_v1Props) && !action_details_group24206.credential_ref_id){
    setaction_details_group24206((pre:any)=>({...pre,credential_ref_id:dfd_credentialref_v1Props[0]?.credential_ref_id}));
  }
  },[dfd_credentialref_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!credential_ref_idb11d6Props?.filterProps) return;
    handleMapperValue(credential_ref_idb11d6Props?.filterProps,credential_ref_idb11d6Props?.filterFlag);
  },[credential_ref_idb11d6Props?.filterProps])

  if (credential_ref_idb11d6?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 3`,gridRow: `43 / 44`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.credential_ref_id : (action_details_group24206?.credential_ref_id || ""))}
</Text>
  </div>
  )
}

export default Textcredential_ref_id
