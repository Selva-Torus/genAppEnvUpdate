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

const Textrule_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_venuespecialrules_v1Props, setdfd_venuespecialrules_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {add_case_group77747, setadd_case_group77747}= useContext(TotalContext) as TotalContextProps;
  const {add_case_group77747Props, setadd_case_group77747Props}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbae8a, setheader_groupbae8a}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbae8aProps, setheader_groupbae8aProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group999a8, setrequired_dociument_main_group999a8}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group999a8Props, setrequired_dociument_main_group999a8Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_table45b8d, setdoc_table45b8d}= useContext(TotalContext) as TotalContextProps;
  const {doc_table45b8dProps, setdoc_table45b8dProps}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group35ed3, setcase_information_group35ed3}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group35ed3Props, setcase_information_group35ed3Props}= useContext(TotalContext) as TotalContextProps;
  const {card_groupe78fa, setcard_groupe78fa}= useContext(TotalContext) as TotalContextProps;
  const {card_groupe78faProps, setcard_groupe78faProps}= useContext(TotalContext) as TotalContextProps;
  const {principal_group9ae9f, setprincipal_group9ae9f}= useContext(TotalContext) as TotalContextProps;
  const {principal_group9ae9fProps, setprincipal_group9ae9fProps}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group8df75, setintrest_group8df75}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group8df75Props, setintrest_group8df75Props}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupac23b, setfees_groupac23b}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupac23bProps, setfees_groupac23bProps}= useContext(TotalContext) as TotalContextProps;
  const {total_groupe6175, settotal_groupe6175}= useContext(TotalContext) as TotalContextProps;
  const {total_groupe6175Props, settotal_groupe6175Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6904e, setvenue_details_group6904e}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6904eProps, setvenue_details_group6904eProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_groupda0ff, setchecklist_main_groupda0ff}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_groupda0ffProps, setchecklist_main_groupda0ffProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table0e25b, setchecklist_table0e25b}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table0e25bProps, setchecklist_table0e25bProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupc1585, setspecial_rules_groupc1585}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupc1585Props, setspecial_rules_groupc1585Props}= useContext(TotalContext) as TotalContextProps;
  const {special_rules1fc30, setspecial_rules1fc30}= useContext(TotalContext) as TotalContextProps;
  const {special_rules1fc30Props, setspecial_rules1fc30Props}= useContext(TotalContext) as TotalContextProps;
  const {warning_icon83e9f, setwarning_icon83e9f}= useContext(TotalContext) as TotalContextProps;
  const {rule_texta87d5, setrule_texta87d5}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions37e34, setdynamicactions37e34}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions37e34Props, setdynamicactions37e34Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_texta87d5Props, setrule_texta87d5Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_venuespecialrules_v1Props && !dfd_venuespecialrules_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_venuespecialrules_v1Props.dstKey,
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
        setspecial_rules1fc30((pre: any) => ({
          ...pre,
          rule_text: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.rule_text
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setspecial_rules1fc30((pre: any) => ({
          ...pre,
          rule_text: rule_texta87d5Props?.filteredData?.length > 0
            ? rule_texta87d5Props?.filteredData[0]?.rule_text
            : "0"
        }))
      }else if(Array.isArray(dfd_venuespecialrules_v1Props) && dfd_venuespecialrules_v1Props && !special_rules1fc30.rule_text){
        setspecial_rules1fc30((pre:any)=>({...pre,rule_text:dfd_venuespecialrules_v1Props[0]?.rule_text}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[rule_texta87d5?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_venuespecialrules_v1Props) && !special_rules1fc30.rule_text){
    setspecial_rules1fc30((pre:any)=>({...pre,rule_text:dfd_venuespecialrules_v1Props[0]?.rule_text}));
  }
  },[dfd_venuespecialrules_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!rule_texta87d5Props?.filterProps) return;
    handleMapperValue(rule_texta87d5Props?.filterProps,rule_texta87d5Props?.filterFlag);
  },[rule_texta87d5Props?.filterProps])

  if (rule_texta87d5?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `5 / 25`,gridRow: `1 / 19`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-[#f1bf09]"
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.rule_text : (special_rules1fc30?.rule_text || ""))}
</Text>
  </div>
  )
}

export default Textrule_text
