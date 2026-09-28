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

const Textintegration_run_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {inegration_run_group5a7be, setinegration_run_group5a7be}= useContext(TotalContext) as TotalContextProps;
  const {inegration_run_group5a7beProps, setinegration_run_group5a7beProps}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group519a1, setrun_information_group519a1}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group519a1Props, setrun_information_group519a1Props}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_group9ec90, settimeandstatus_group9ec90}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_group9ec90Props, settimeandstatus_group9ec90Props}= useContext(TotalContext) as TotalContextProps;
  const {record_groupa6d32, setrecord_groupa6d32}= useContext(TotalContext) as TotalContextProps;
  const {record_groupa6d32Props, setrecord_groupa6d32Props}= useContext(TotalContext) as TotalContextProps;
  const {error_group193e2, seterror_group193e2}= useContext(TotalContext) as TotalContextProps;
  const {error_group193e2Props, seterror_group193e2Props}= useContext(TotalContext) as TotalContextProps;
  const {integration_run_id58a1b, setintegration_run_id58a1b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions669ce, setdynamicactions669ce}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions669ceProps, setdynamicactions669ceProps}= useContext(TotalContext) as TotalContextProps;
  const {integration_run_id58a1bProps, setintegration_run_id58a1bProps} = useContext(TotalContext) as TotalContextProps;
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
        setinegration_run_group5a7be((pre: any) => ({
          ...pre,
          integration_run_id: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.integration_run_id
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setinegration_run_group5a7be((pre: any) => ({
          ...pre,
          integration_run_id: integration_run_id58a1bProps?.filteredData?.length > 0
            ? integration_run_id58a1bProps?.filteredData[0]?.integration_run_id
            : "0"
        }))
      }else if(Array.isArray(dfd_integrationrun_v1Props) && dfd_integrationrun_v1Props && !inegration_run_group5a7be.integration_run_id){
        setinegration_run_group5a7be((pre:any)=>({...pre,integration_run_id:dfd_integrationrun_v1Props[0]?.integration_run_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[integration_run_id58a1b?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_integrationrun_v1Props) && !inegration_run_group5a7be.integration_run_id){
    setinegration_run_group5a7be((pre:any)=>({...pre,integration_run_id:dfd_integrationrun_v1Props[0]?.integration_run_id}));
  }
  },[dfd_integrationrun_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!integration_run_id58a1bProps?.filterProps) return;
    handleMapperValue(integration_run_id58a1bProps?.filterProps,integration_run_id58a1bProps?.filterFlag);
  },[integration_run_id58a1bProps?.filterProps])

  if (integration_run_id58a1b?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 2`,gridRow: `81 / 82`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.integration_run_id : (inegration_run_group5a7be?.integration_run_id || ""))}
</Text>
  </div>
  )
}

export default Textintegration_run_id
