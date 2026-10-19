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

const Textcert_template_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_certificatetemplate_v1Props, setdfd_certificatetemplate_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {groupb224b, setgroupb224b}= useContext(TotalContext) as TotalContextProps;
  const {groupb224bProps, setgroupb224bProps}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupec16d, settemplate_detail_groupec16d}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupec16dProps, settemplate_detail_groupec16dProps}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group23860, setadditional_info_group23860}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group23860Props, setadditional_info_group23860Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_ide9458, setcert_template_ide9458}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionb465f, setdynamicactionb465f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionb465fProps, setdynamicactionb465fProps}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_ide9458Props, setcert_template_ide9458Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_certificatetemplate_v1Props && !dfd_certificatetemplate_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_certificatetemplate_v1Props.dstKey,
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
        setgroupb224b((pre: any) => ({
          ...pre,
          cert_template_id: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.cert_template_id
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setgroupb224b((pre: any) => ({
          ...pre,
          cert_template_id: cert_template_ide9458Props?.filteredData?.length > 0
            ? cert_template_ide9458Props?.filteredData[0]?.cert_template_id
            : "0"
        }))
      }else if(Array.isArray(dfd_certificatetemplate_v1Props) && dfd_certificatetemplate_v1Props && !groupb224b.cert_template_id){
        setgroupb224b((pre:any)=>({...pre,cert_template_id:dfd_certificatetemplate_v1Props[0]?.cert_template_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[cert_template_ide9458?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_certificatetemplate_v1Props) && !groupb224b.cert_template_id){
    setgroupb224b((pre:any)=>({...pre,cert_template_id:dfd_certificatetemplate_v1Props[0]?.cert_template_id}));
  }
  },[dfd_certificatetemplate_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!cert_template_ide9458Props?.filterProps) return;
    handleMapperValue(cert_template_ide9458Props?.filterProps,cert_template_ide9458Props?.filterFlag);
  },[cert_template_ide9458Props?.filterProps])

  if (cert_template_ide9458?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 2`,gridRow: `41 / 42`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.cert_template_id : (groupb224b?.cert_template_id || ""))}
</Text>
  </div>
  )
}

export default Textcert_template_id
