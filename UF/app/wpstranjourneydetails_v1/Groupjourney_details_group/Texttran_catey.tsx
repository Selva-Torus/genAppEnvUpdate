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

const Texttran_catey = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tranjourney_v1Props, setdfd_tranjourney_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {journey_details_group764b7, setjourney_details_group764b7}= useContext(TotalContext) as TotalContextProps;
  const {journey_details_group764b7Props, setjourney_details_group764b7Props}= useContext(TotalContext) as TotalContextProps;
  const {details_labelaa81c, setdetails_labelaa81c}= useContext(TotalContext) as TotalContextProps;
  const {divider_topb49bf, setdivider_topb49bf}= useContext(TotalContext) as TotalContextProps;
  const {l_file_name7a6bd, setl_file_name7a6bd}= useContext(TotalContext) as TotalContextProps;
  const {l_emp_mol8c2e1, setl_emp_mol8c2e1}= useContext(TotalContext) as TotalContextProps;
  const {file_nameebc26, setfile_nameebc26}= useContext(TotalContext) as TotalContextProps;
  const {empl_mold6666, setempl_mold6666}= useContext(TotalContext) as TotalContextProps;
  const {l_fixed_amont9c6be, setl_fixed_amont9c6be}= useContext(TotalContext) as TotalContextProps;
  const {l_variable_amount98c92, setl_variable_amount98c92}= useContext(TotalContext) as TotalContextProps;
  const {fixed_amot7ca4c, setfixed_amot7ca4c}= useContext(TotalContext) as TotalContextProps;
  const {var_amontdd609, setvar_amontdd609}= useContext(TotalContext) as TotalContextProps;
  const {l_charge_amount53cd9, setl_charge_amount53cd9}= useContext(TotalContext) as TotalContextProps;
  const {l_agent_routing_code9af99, setl_agent_routing_code9af99}= useContext(TotalContext) as TotalContextProps;
  const {charge_amnt64cb4, setcharge_amnt64cb4}= useContext(TotalContext) as TotalContextProps;
  const {agent_routng_codee5a1e, setagent_routng_codee5a1e}= useContext(TotalContext) as TotalContextProps;
  const {l_processing_system553cb, setl_processing_system553cb}= useContext(TotalContext) as TotalContextProps;
  const {l_tran_categoryaa4a1, setl_tran_categoryaa4a1}= useContext(TotalContext) as TotalContextProps;
  const {process_system9b66e, setprocess_system9b66e}= useContext(TotalContext) as TotalContextProps;
  const {tran_catey46647, settran_catey46647}= useContext(TotalContext) as TotalContextProps;
  const {divider_bottom02761, setdivider_bottom02761}= useContext(TotalContext) as TotalContextProps;
  const {view_msg_data_btn2563b, setview_msg_data_btn2563b}= useContext(TotalContext) as TotalContextProps;
  const {view_tran_log_btn00416, setview_tran_log_btn00416}= useContext(TotalContext) as TotalContextProps;
  const {customwidget84bb0, setcustomwidget84bb0}= useContext(TotalContext) as TotalContextProps;
  const {tran_catey46647Props, settran_catey46647Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_tranjourney_v1Props && !dfd_tranjourney_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_tranjourney_v1Props.dstKey,
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
        setjourney_details_group764b7((pre: any) => ({
          ...pre,
          tran_category: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.tran_category
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setjourney_details_group764b7((pre: any) => ({
          ...pre,
          tran_category: tran_catey46647Props?.filteredData?.length > 0
            ? tran_catey46647Props?.filteredData[0]?.tran_category
            : "0"
        }))
      }else if(Array.isArray(dfd_tranjourney_v1Props) && dfd_tranjourney_v1Props && !journey_details_group764b7.tran_category){
        setjourney_details_group764b7((pre:any)=>({...pre,tran_category:dfd_tranjourney_v1Props[0]?.tran_category}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[tran_catey46647?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_tranjourney_v1Props) && !journey_details_group764b7.tran_category){
    setjourney_details_group764b7((pre:any)=>({...pre,tran_category:dfd_tranjourney_v1Props[0]?.tran_category}));
  }
  },[dfd_tranjourney_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!tran_catey46647Props?.filterProps) return;
    handleMapperValue(tran_catey46647Props?.filterProps,tran_catey46647Props?.filterFlag);
  },[tran_catey46647Props?.filterProps])

  if (tran_catey46647?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `13 / 25`,gridRow: `74 / 82`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f7f8f8] p-2 !pl-3 !rounded-lg !text-base !font-medium"
  variant="code-1"
  color="primary"
>
      {keyset(isDynamic ? item?.tran_category : (journey_details_group764b7?.tran_category || ""))}
</Text>
  </div>
  )
}

export default Texttran_catey
