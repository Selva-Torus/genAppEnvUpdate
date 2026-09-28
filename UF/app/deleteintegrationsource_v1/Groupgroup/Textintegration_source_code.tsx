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

const Textintegration_source_code = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_integrationsource_v1Props, setdfd_integrationsource_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group79c03, setgroup79c03}= useContext(TotalContext) as TotalContextProps;
  const {group79c03Props, setgroup79c03Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_texte4a10, setdelete_heading_texte4a10}= useContext(TotalContext) as TotalContextProps;
  const {div_198ee5, setdiv_198ee5}= useContext(TotalContext) as TotalContextProps;
  const {source_id53454, setsource_id53454}= useContext(TotalContext) as TotalContextProps;
  const {integration_source_idf4d20, setintegration_source_idf4d20}= useContext(TotalContext) as TotalContextProps;
  const {source_code13e0c, setsource_code13e0c}= useContext(TotalContext) as TotalContextProps;
  const {integration_source_code3e7e2, setintegration_source_code3e7e2}= useContext(TotalContext) as TotalContextProps;
  const {source_name60ac7, setsource_name60ac7}= useContext(TotalContext) as TotalContextProps;
  const {integration_source_name2b239, setintegration_source_name2b239}= useContext(TotalContext) as TotalContextProps;
  const {connector_type328cc, setconnector_type328cc}= useContext(TotalContext) as TotalContextProps;
  const {integration_connector_type29cd0, setintegration_connector_type29cd0}= useContext(TotalContext) as TotalContextProps;
  const {status9cd32, setstatus9cd32}= useContext(TotalContext) as TotalContextProps;
  const {is_activef0183, setis_activef0183}= useContext(TotalContext) as TotalContextProps;
  const {textfd8c5, settextfd8c5}= useContext(TotalContext) as TotalContextProps;
  const {divider_27dbcc, setdivider_27dbcc}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btn82ef5, setcancel_btn82ef5}= useContext(TotalContext) as TotalContextProps;
  const {delete_btnb4584, setdelete_btnb4584}= useContext(TotalContext) as TotalContextProps;
  const {integration_source_code3e7e2Props, setintegration_source_code3e7e2Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_integrationsource_v1Props && !dfd_integrationsource_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_integrationsource_v1Props.dstKey,
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
        setgroup79c03((pre: any) => ({
          ...pre,
          source_code: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.source_code
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setgroup79c03((pre: any) => ({
          ...pre,
          source_code: integration_source_code3e7e2Props?.filteredData?.length > 0
            ? integration_source_code3e7e2Props?.filteredData[0]?.source_code
            : "0"
        }))
      }else if(Array.isArray(dfd_integrationsource_v1Props) && dfd_integrationsource_v1Props && !group79c03.source_code){
        setgroup79c03((pre:any)=>({...pre,source_code:dfd_integrationsource_v1Props[0]?.source_code}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[integration_source_code3e7e2?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_integrationsource_v1Props) && !group79c03.source_code){
    setgroup79c03((pre:any)=>({...pre,source_code:dfd_integrationsource_v1Props[0]?.source_code}));
  }
  },[dfd_integrationsource_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!integration_source_code3e7e2Props?.filterProps) return;
    handleMapperValue(integration_source_code3e7e2Props?.filterProps,integration_source_code3e7e2Props?.filterFlag);
  },[integration_source_code3e7e2Props?.filterProps])

  if (integration_source_code3e7e2?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `7 / 23`,gridRow: `17 / 22`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !rounded-l !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.source_code : (group79c03?.source_code || ""))}
</Text>
  </div>
  )
}

export default Textintegration_source_code
