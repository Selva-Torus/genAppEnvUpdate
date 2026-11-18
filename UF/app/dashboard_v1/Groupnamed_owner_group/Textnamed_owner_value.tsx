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

const Textnamed_owner_value = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_cardmetricsdashboard_v1Props, setdfd_cardmetricsdashboard_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {overall_group0ca82, setoverall_group0ca82}= useContext(TotalContext) as TotalContextProps;
  const {overall_group0ca82Props, setoverall_group0ca82Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_group08810, setregister_ai_group08810}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_group08810Props, setregister_ai_group08810Props}= useContext(TotalContext) as TotalContextProps;
  const {tier_critical_group484c4, settier_critical_group484c4}= useContext(TotalContext) as TotalContextProps;
  const {tier_critical_group484c4Props, settier_critical_group484c4Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_expired_groupf48db, setcert_expired_groupf48db}= useContext(TotalContext) as TotalContextProps;
  const {cert_expired_groupf48dbProps, setcert_expired_groupf48dbProps}= useContext(TotalContext) as TotalContextProps;
  const {named_owner_group4361e, setnamed_owner_group4361e}= useContext(TotalContext) as TotalContextProps;
  const {named_owner_group4361eProps, setnamed_owner_group4361eProps}= useContext(TotalContext) as TotalContextProps;
  const {named_owner_textdfcc1, setnamed_owner_textdfcc1}= useContext(TotalContext) as TotalContextProps;
  const {named_owner_valueb01fd, setnamed_owner_valueb01fd}= useContext(TotalContext) as TotalContextProps;
  const {cert_date_group9ac35, setcert_date_group9ac35}= useContext(TotalContext) as TotalContextProps;
  const {cert_date_group9ac35Props, setcert_date_group9ac35Props}= useContext(TotalContext) as TotalContextProps;
  const {governer_gap_group09585, setgoverner_gap_group09585}= useContext(TotalContext) as TotalContextProps;
  const {governer_gap_group09585Props, setgoverner_gap_group09585Props}= useContext(TotalContext) as TotalContextProps;
  const {table0a722, settable0a722}= useContext(TotalContext) as TotalContextProps;
  const {table0a722Props, settable0a722Props}= useContext(TotalContext) as TotalContextProps;
  const {pirchart_group8d70d, setpirchart_group8d70d}= useContext(TotalContext) as TotalContextProps;
  const {pirchart_group8d70dProps, setpirchart_group8d70dProps}= useContext(TotalContext) as TotalContextProps;
  const {assets_by_business_unit_group374c2, setassets_by_business_unit_group374c2}= useContext(TotalContext) as TotalContextProps;
  const {assets_by_business_unit_group374c2Props, setassets_by_business_unit_group374c2Props}= useContext(TotalContext) as TotalContextProps;
  const {named_owner_valueb01fdProps, setnamed_owner_valueb01fdProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_cardmetricsdashboard_v1Props && !dfd_cardmetricsdashboard_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_cardmetricsdashboard_v1Props.dstKey,
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
        setnamed_owner_group4361e((pre: any) => ({
          ...pre,
          without_a_named_owner: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.without_a_named_owner
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setnamed_owner_group4361e((pre: any) => ({
          ...pre,
          without_a_named_owner: named_owner_valueb01fdProps?.filteredData?.length > 0
            ? named_owner_valueb01fdProps?.filteredData[0]?.without_a_named_owner
            : "0"
        }))
      }else if(Array.isArray(dfd_cardmetricsdashboard_v1Props) && dfd_cardmetricsdashboard_v1Props && !named_owner_group4361e.without_a_named_owner){
        setnamed_owner_group4361e((pre:any)=>({...pre,without_a_named_owner:dfd_cardmetricsdashboard_v1Props[0]?.without_a_named_owner}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[named_owner_valueb01fd?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_cardmetricsdashboard_v1Props) && !named_owner_group4361e.without_a_named_owner){
    setnamed_owner_group4361e((pre:any)=>({...pre,without_a_named_owner:dfd_cardmetricsdashboard_v1Props[0]?.without_a_named_owner}));
  }
  },[dfd_cardmetricsdashboard_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!named_owner_valueb01fdProps?.filterProps) return;
    handleMapperValue(named_owner_valueb01fdProps?.filterProps,named_owner_valueb01fdProps?.filterFlag);
  },[named_owner_valueb01fdProps?.filterProps])

  if (named_owner_valueb01fd?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `8 / 15`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold"
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.without_a_named_owner : (named_owner_group4361e?.without_a_named_owner || ""))}
</Text>
  </div>
  )
}

export default Textnamed_owner_value
