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

const Textaccount_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_addcase_v1Props, setdfd_addcase_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {add_case_group4945a, setadd_case_group4945a}= useContext(TotalContext) as TotalContextProps;
  const {add_case_group4945aProps, setadd_case_group4945aProps}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf55cb, setheader_groupf55cb}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf55cbProps, setheader_groupf55cbProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_groupdfaaf, setrequired_dociument_main_groupdfaaf}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_groupdfaafProps, setrequired_dociument_main_groupdfaafProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8af83, setdoc_table8af83}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8af83Props, setdoc_table8af83Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group40df6, setcase_information_group40df6}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group40df6Props, setcase_information_group40df6Props}= useContext(TotalContext) as TotalContextProps;
  const {card_group00ce3, setcard_group00ce3}= useContext(TotalContext) as TotalContextProps;
  const {card_group00ce3Props, setcard_group00ce3Props}= useContext(TotalContext) as TotalContextProps;
  const {principal_group510ca, setprincipal_group510ca}= useContext(TotalContext) as TotalContextProps;
  const {principal_group510caProps, setprincipal_group510caProps}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group1ba85, setintrest_group1ba85}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group1ba85Props, setintrest_group1ba85Props}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupbee4a, setfees_groupbee4a}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupbee4aProps, setfees_groupbee4aProps}= useContext(TotalContext) as TotalContextProps;
  const {total_group197f6, settotal_group197f6}= useContext(TotalContext) as TotalContextProps;
  const {total_group197f6Props, settotal_group197f6Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group5f664, setvenue_details_group5f664}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group5f664Props, setvenue_details_group5f664Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2d71b, setchecklist_main_group2d71b}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2d71bProps, setchecklist_main_group2d71bProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablec0934, setchecklist_tablec0934}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablec0934Props, setchecklist_tablec0934Props}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group47bec, setspecial_rules_group47bec}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group47becProps, setspecial_rules_group47becProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules3c582, setspecial_rules3c582}= useContext(TotalContext) as TotalContextProps;
  const {special_rules3c582Props, setspecial_rules3c582Props}= useContext(TotalContext) as TotalContextProps;
  const {account_iddb411, setaccount_iddb411}= useContext(TotalContext) as TotalContextProps;
  const {venue_id85b23, setvenue_id85b23}= useContext(TotalContext) as TotalContextProps;
  const {account_iddb411Props, setaccount_iddb411Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_addcase_v1Props && !dfd_addcase_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_addcase_v1Props.dstKey,
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
        setadd_case_group4945a((pre: any) => ({
          ...pre,
          account_id: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.account_id
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setadd_case_group4945a((pre: any) => ({
          ...pre,
          account_id: account_iddb411Props?.filteredData?.length > 0
            ? account_iddb411Props?.filteredData[0]?.account_id
            : "0"
        }))
      }else if(Array.isArray(dfd_addcase_v1Props) && dfd_addcase_v1Props && !add_case_group4945a.account_id){
        setadd_case_group4945a((pre:any)=>({...pre,account_id:dfd_addcase_v1Props[0]?.account_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[account_iddb411?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_addcase_v1Props) && !add_case_group4945a.account_id){
    setadd_case_group4945a((pre:any)=>({...pre,account_id:dfd_addcase_v1Props[0]?.account_id}));
  }
  },[dfd_addcase_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!account_iddb411Props?.filterProps) return;
    handleMapperValue(account_iddb411Props?.filterProps,account_iddb411Props?.filterFlag);
  },[account_iddb411Props?.filterProps])

  if (account_iddb411?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 4`,gridRow: `229 / 230`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset("")}
</Text>
  </div>
  )
}

export default Textaccount_id
