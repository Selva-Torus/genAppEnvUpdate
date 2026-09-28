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
  const {dfd_certificationstage_v1Props, setdfd_certificationstage_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {groupb40f5, setgroupb40f5}= useContext(TotalContext) as TotalContextProps;
  const {groupb40f5Props, setgroupb40f5Props}= useContext(TotalContext) as TotalContextProps;
  const {del_headibg_textff66f, setdel_headibg_textff66f}= useContext(TotalContext) as TotalContextProps;
  const {divider_103b38, setdivider_103b38}= useContext(TotalContext) as TotalContextProps;
  const {del_template_stage_id9994c, setdel_template_stage_id9994c}= useContext(TotalContext) as TotalContextProps;
  const {template_stage_id33d37, settemplate_stage_id33d37}= useContext(TotalContext) as TotalContextProps;
  const {del_cert_template_id08b25, setdel_cert_template_id08b25}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_id54cca, setcert_template_id54cca}= useContext(TotalContext) as TotalContextProps;
  const {del_stage_namef6a12, setdel_stage_namef6a12}= useContext(TotalContext) as TotalContextProps;
  const {stage_name6920f, setstage_name6920f}= useContext(TotalContext) as TotalContextProps;
  const {del_stage_type_codeb7ed2, setdel_stage_type_codeb7ed2}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_code0d58a, setstage_type_code0d58a}= useContext(TotalContext) as TotalContextProps;
  const {del_sla_days4f73f, setdel_sla_days4f73f}= useContext(TotalContext) as TotalContextProps;
  const {sla_days7b386, setsla_days7b386}= useContext(TotalContext) as TotalContextProps;
  const {del_is_active9e4c4, setdel_is_active9e4c4}= useContext(TotalContext) as TotalContextProps;
  const {is_active312fd, setis_active312fd}= useContext(TotalContext) as TotalContextProps;
  const {combo_text1c6ae, setcombo_text1c6ae}= useContext(TotalContext) as TotalContextProps;
  const {divider_2a3264, setdivider_2a3264}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btneba2d, setcancel_btneba2d}= useContext(TotalContext) as TotalContextProps;
  const {ok_btn01d91, setok_btn01d91}= useContext(TotalContext) as TotalContextProps;
  const {template_stage_idtexte686f, settemplate_stage_idtexte686f}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_id54ccaProps, setcert_template_id54ccaProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_certificationstage_v1Props && !dfd_certificationstage_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_certificationstage_v1Props.dstKey,
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
        setgroupb40f5((pre: any) => ({
          ...pre,
          cert_template_id: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.cert_template_id
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setgroupb40f5((pre: any) => ({
          ...pre,
          cert_template_id: cert_template_id54ccaProps?.filteredData?.length > 0
            ? cert_template_id54ccaProps?.filteredData[0]?.cert_template_id
            : "0"
        }))
      }else if(Array.isArray(dfd_certificationstage_v1Props) && dfd_certificationstage_v1Props && !groupb40f5.cert_template_id){
        setgroupb40f5((pre:any)=>({...pre,cert_template_id:dfd_certificationstage_v1Props[0]?.cert_template_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[cert_template_id54cca?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_certificationstage_v1Props) && !groupb40f5.cert_template_id){
    setgroupb40f5((pre:any)=>({...pre,cert_template_id:dfd_certificationstage_v1Props[0]?.cert_template_id}));
  }
  },[dfd_certificationstage_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!cert_template_id54ccaProps?.filterProps) return;
    handleMapperValue(cert_template_id54ccaProps?.filterProps,cert_template_id54ccaProps?.filterFlag);
  },[cert_template_id54ccaProps?.filterProps])

  if (cert_template_id54cca?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `7 / 23`,gridRow: `24 / 29`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.cert_template_id : (groupb40f5?.cert_template_id || ""))}
</Text>
  </div>
  )
}

export default Textcert_template_id
