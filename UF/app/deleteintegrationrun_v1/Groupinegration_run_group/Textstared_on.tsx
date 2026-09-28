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

const Textstared_on = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_integrationrun_v1Props, setdfd_integrationrun_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {inegration_run_groupe1d5c, setinegration_run_groupe1d5c}= useContext(TotalContext) as TotalContextProps;
  const {inegration_run_groupe1d5cProps, setinegration_run_groupe1d5cProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_header_textda5f0, setdelete_header_textda5f0}= useContext(TotalContext) as TotalContextProps;
  const {divider_1b3e45, setdivider_1b3e45}= useContext(TotalContext) as TotalContextProps;
  const {del_run_idbec07, setdel_run_idbec07}= useContext(TotalContext) as TotalContextProps;
  const {integration_run_id13501, setintegration_run_id13501}= useContext(TotalContext) as TotalContextProps;
  const {del_intergration_sorucename7fb8f, setdel_intergration_sorucename7fb8f}= useContext(TotalContext) as TotalContextProps;
  const {integration_source_namece900, setintegration_source_namece900}= useContext(TotalContext) as TotalContextProps;
  const {run_trigger_codeb5d3d, setrun_trigger_codeb5d3d}= useContext(TotalContext) as TotalContextProps;
  const {del_trigger08e5f, setdel_trigger08e5f}= useContext(TotalContext) as TotalContextProps;
  const {del_start_onc70e3, setdel_start_onc70e3}= useContext(TotalContext) as TotalContextProps;
  const {stared_ona8f54, setstared_ona8f54}= useContext(TotalContext) as TotalContextProps;
  const {del_status29cc8, setdel_status29cc8}= useContext(TotalContext) as TotalContextProps;
  const {run_status_code37f79, setrun_status_code37f79}= useContext(TotalContext) as TotalContextProps;
  const {del_action1cf57, setdel_action1cf57}= useContext(TotalContext) as TotalContextProps;
  const {divider_2dbf85, setdivider_2dbf85}= useContext(TotalContext) as TotalContextProps;
  const {integration_run_id_texta0ce0, setintegration_run_id_texta0ce0}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btna8a96, setcancel_btna8a96}= useContext(TotalContext) as TotalContextProps;
  const {del_btn80c50, setdel_btn80c50}= useContext(TotalContext) as TotalContextProps;
  const {stared_ona8f54Props, setstared_ona8f54Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_integrationrun_v1Props && !dfd_integrationrun_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_integrationrun_v1Props.dstKey,
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
        setinegration_run_groupe1d5c((pre: any) => ({
          ...pre,
          started_on: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.started_on
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setinegration_run_groupe1d5c((pre: any) => ({
          ...pre,
          started_on: stared_ona8f54Props?.filteredData?.length > 0
            ? stared_ona8f54Props?.filteredData[0]?.started_on
            : "0"
        }))
      }else if(Array.isArray(dfd_integrationrun_v1Props) && dfd_integrationrun_v1Props && !inegration_run_groupe1d5c.started_on){
        setinegration_run_groupe1d5c((pre:any)=>({...pre,started_on:dfd_integrationrun_v1Props[0]?.started_on}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[stared_ona8f54?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_integrationrun_v1Props) && !inegration_run_groupe1d5c.started_on){
    setinegration_run_groupe1d5c((pre:any)=>({...pre,started_on:dfd_integrationrun_v1Props[0]?.started_on}));
  }
  },[dfd_integrationrun_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!stared_ona8f54Props?.filterProps) return;
    handleMapperValue(stared_ona8f54Props?.filterProps,stared_ona8f54Props?.filterFlag);
  },[stared_ona8f54Props?.filterProps])

  if (stared_ona8f54?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `7 / 23`,gridRow: `36 / 41`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !rounded-l !border !border-[#c4c4c4] !text-black"
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.started_on : (inegration_run_groupe1d5c?.started_on || ""))}
</Text>
  </div>
  )
}

export default Textstared_on
