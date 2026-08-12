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

const Textvenue_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {add_case_groupeb161, setadd_case_groupeb161}= useContext(TotalContext) as TotalContextProps;
  const {add_case_groupeb161Props, setadd_case_groupeb161Props}= useContext(TotalContext) as TotalContextProps;
  const {header_group4878f, setheader_group4878f}= useContext(TotalContext) as TotalContextProps;
  const {header_group4878fProps, setheader_group4878fProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions094c3, setdynamicactions094c3}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions094c3Props, setdynamicactions094c3Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_id0c4bb, setvenue_id0c4bb}= useContext(TotalContext) as TotalContextProps;
  const {creditor_idf6f71, setcreditor_idf6f71}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group28f6f, setcase_information_group28f6f}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group28f6fProps, setcase_information_group28f6fProps}= useContext(TotalContext) as TotalContextProps;
  const {venue_group6a36d, setvenue_group6a36d}= useContext(TotalContext) as TotalContextProps;
  const {venue_group6a36dProps, setvenue_group6a36dProps}= useContext(TotalContext) as TotalContextProps;
  const {georgia_group0fa18, setgeorgia_group0fa18}= useContext(TotalContext) as TotalContextProps;
  const {georgia_group0fa18Props, setgeorgia_group0fa18Props}= useContext(TotalContext) as TotalContextProps;
  const {georgias_group945fd, setgeorgias_group945fd}= useContext(TotalContext) as TotalContextProps;
  const {georgias_group945fdProps, setgeorgias_group945fdProps}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groups6f85f, setgeorgias_groups6f85f}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groups6f85fProps, setgeorgias_groups6f85fProps}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups86a87, setgeorgiass_groups86a87}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups86a87Props, setgeorgiass_groups86a87Props}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groupsb044a, setgeorgsiass_groupsb044a}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groupsb044aProps, setgeorgsiass_groupsb044aProps}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_group78a70, setdebtor_information_group78a70}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_group78a70Props, setdebtor_information_group78a70Props}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_group52f47, setfinancial_details_group52f47}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_group52f47Props, setfinancial_details_group52f47Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group17ac6, setvenue_details_group17ac6}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group17ac6Props, setvenue_details_group17ac6Props}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group04e92, setrequired_dociument_main_group04e92}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group04e92Props, setrequired_dociument_main_group04e92Props}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_header_groupe39c8, setrequired_dociument_header_groupe39c8}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_header_groupe39c8Props, setrequired_dociument_header_groupe39c8Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_type_tablebe9fa, setdoc_type_tablebe9fa}= useContext(TotalContext) as TotalContextProps;
  const {doc_type_tablebe9faProps, setdoc_type_tablebe9faProps}= useContext(TotalContext) as TotalContextProps;
  const {customwidgetd1a34, setcustomwidgetd1a34}= useContext(TotalContext) as TotalContextProps;
  const {account_id7e64e, setaccount_id7e64e}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group0df6b, setchecklist_main_group0df6b}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group0df6bProps, setchecklist_main_group0df6bProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_group32b3d, setchecklist_group32b3d}= useContext(TotalContext) as TotalContextProps;
  const {checklist_group32b3dProps, setchecklist_group32b3dProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table198e1, setchecklist_table198e1}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table198e1Props, setchecklist_table198e1Props}= useContext(TotalContext) as TotalContextProps;
  const {remarks_textareadc753, setremarks_textareadc753}= useContext(TotalContext) as TotalContextProps;
  const {venue_id0c4bbProps, setvenue_id0c4bbProps} = useContext(TotalContext) as TotalContextProps;
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
        setadd_case_groupeb161((pre: any) => ({
          ...pre,
          venue_id: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.venue_id
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setadd_case_groupeb161((pre: any) => ({
          ...pre,
          venue_id: venue_id0c4bbProps?.filteredData?.length > 0
            ? venue_id0c4bbProps?.filteredData[0]?.venue_id
            : "0"
        }))
      }else if(Array.isArray(dfd_addcase_v1Props) && dfd_addcase_v1Props && !add_case_groupeb161.venue_id){
        setadd_case_groupeb161((pre:any)=>({...pre,venue_id:dfd_addcase_v1Props[0]?.venue_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[venue_id0c4bb?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_addcase_v1Props) && !add_case_groupeb161.venue_id){
    setadd_case_groupeb161((pre:any)=>({...pre,venue_id:dfd_addcase_v1Props[0]?.venue_id}));
  }
  },[dfd_addcase_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!venue_id0c4bbProps?.filterProps) return;
    handleMapperValue(venue_id0c4bbProps?.filterProps,venue_id0c4bbProps?.filterFlag);
  },[venue_id0c4bbProps?.filterProps])

  if (venue_id0c4bb?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `14 / 16`,gridRow: `8 / 9`, gap:``, height: `100%`}} >
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

export default Textvenue_id
