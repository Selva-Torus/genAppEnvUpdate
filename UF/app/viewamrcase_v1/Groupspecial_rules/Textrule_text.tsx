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
  const {add_case_groupbe1de, setadd_case_groupbe1de}= useContext(TotalContext) as TotalContextProps;
  const {add_case_groupbe1deProps, setadd_case_groupbe1deProps}= useContext(TotalContext) as TotalContextProps;
  const {header_groupc587e, setheader_groupc587e}= useContext(TotalContext) as TotalContextProps;
  const {header_groupc587eProps, setheader_groupc587eProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group6f022, setrequired_dociument_main_group6f022}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group6f022Props, setrequired_dociument_main_group6f022Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8bfa1, setdoc_table8bfa1}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8bfa1Props, setdoc_table8bfa1Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupe3c1b, setcase_information_groupe3c1b}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupe3c1bProps, setcase_information_groupe3c1bProps}= useContext(TotalContext) as TotalContextProps;
  const {card_group7fa83, setcard_group7fa83}= useContext(TotalContext) as TotalContextProps;
  const {card_group7fa83Props, setcard_group7fa83Props}= useContext(TotalContext) as TotalContextProps;
  const {principal_groupde6dd, setprincipal_groupde6dd}= useContext(TotalContext) as TotalContextProps;
  const {principal_groupde6ddProps, setprincipal_groupde6ddProps}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group44b4d, setintrest_group44b4d}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group44b4dProps, setintrest_group44b4dProps}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupee523, setfees_groupee523}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupee523Props, setfees_groupee523Props}= useContext(TotalContext) as TotalContextProps;
  const {total_groupd3e06, settotal_groupd3e06}= useContext(TotalContext) as TotalContextProps;
  const {total_groupd3e06Props, settotal_groupd3e06Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group1d734, setvenue_details_group1d734}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group1d734Props, setvenue_details_group1d734Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group32240, setchecklist_main_group32240}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group32240Props, setchecklist_main_group32240Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablee7dea, setchecklist_tablee7dea}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablee7deaProps, setchecklist_tablee7deaProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupf22ab, setspecial_rules_groupf22ab}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupf22abProps, setspecial_rules_groupf22abProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules96aec, setspecial_rules96aec}= useContext(TotalContext) as TotalContextProps;
  const {special_rules96aecProps, setspecial_rules96aecProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamic_icon8f352, setdynamic_icon8f352}= useContext(TotalContext) as TotalContextProps;
  const {rule_text55ce9, setrule_text55ce9}= useContext(TotalContext) as TotalContextProps;
  const {rule_text55ce9Props, setrule_text55ce9Props} = useContext(TotalContext) as TotalContextProps;
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
        setspecial_rules96aec((pre: any) => ({
          ...pre,
          rule_text: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.rule_text
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setspecial_rules96aec((pre: any) => ({
          ...pre,
          rule_text: rule_text55ce9Props?.filteredData?.length > 0
            ? rule_text55ce9Props?.filteredData[0]?.rule_text
            : "0"
        }))
      }else if(Array.isArray(dfd_venuespecialrules_v1Props) && dfd_venuespecialrules_v1Props && !special_rules96aec.rule_text){
        setspecial_rules96aec((pre:any)=>({...pre,rule_text:dfd_venuespecialrules_v1Props[0]?.rule_text}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[rule_text55ce9?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_venuespecialrules_v1Props) && !special_rules96aec.rule_text){
    setspecial_rules96aec((pre:any)=>({...pre,rule_text:dfd_venuespecialrules_v1Props[0]?.rule_text}));
  }
  },[dfd_venuespecialrules_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!rule_text55ce9Props?.filterProps) return;
    handleMapperValue(rule_text55ce9Props?.filterProps,rule_text55ce9Props?.filterFlag);
  },[rule_text55ce9Props?.filterProps])

  if (rule_text55ce9?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `5 / 25`,gridRow: `2 / 20`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className="!text-[#8A7A55]"
  variant="subheader-2"
  color="primary"
>
      {keyset(isDynamic ? item?.rule_text : (special_rules96aec?.rule_text || ""))}
</Text>
  </div>
  )
}

export default Textrule_text
