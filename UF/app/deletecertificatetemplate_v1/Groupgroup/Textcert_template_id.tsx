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
  const {group84d30, setgroup84d30}= useContext(TotalContext) as TotalContextProps;
  const {group84d30Props, setgroup84d30Props}= useContext(TotalContext) as TotalContextProps;
  const {del_heading_text10f67, setdel_heading_text10f67}= useContext(TotalContext) as TotalContextProps;
  const {divider_16c710, setdivider_16c710}= useContext(TotalContext) as TotalContextProps;
  const {del_template_code7b871, setdel_template_code7b871}= useContext(TotalContext) as TotalContextProps;
  const {template_codeb7abe, settemplate_codeb7abe}= useContext(TotalContext) as TotalContextProps;
  const {del_template_name73ab9, setdel_template_name73ab9}= useContext(TotalContext) as TotalContextProps;
  const {template_name5bed7, settemplate_name5bed7}= useContext(TotalContext) as TotalContextProps;
  const {del_applies_tier_code247d5, setdel_applies_tier_code247d5}= useContext(TotalContext) as TotalContextProps;
  const {applies_tier_coded4d29, setapplies_tier_coded4d29}= useContext(TotalContext) as TotalContextProps;
  const {del_applies_use_casef094c, setdel_applies_use_casef094c}= useContext(TotalContext) as TotalContextProps;
  const {applies_use_casef037b, setapplies_use_casef037b}= useContext(TotalContext) as TotalContextProps;
  const {applies_asset_typea5e3d, setapplies_asset_typea5e3d}= useContext(TotalContext) as TotalContextProps;
  const {del_applies_asset_typeabda2, setdel_applies_asset_typeabda2}= useContext(TotalContext) as TotalContextProps;
  const {validity_monthsc0c5a, setvalidity_monthsc0c5a}= useContext(TotalContext) as TotalContextProps;
  const {del_validity_monthsf911c, setdel_validity_monthsf911c}= useContext(TotalContext) as TotalContextProps;
  const {template_version21972, settemplate_version21972}= useContext(TotalContext) as TotalContextProps;
  const {del_template_version5c803, setdel_template_version5c803}= useContext(TotalContext) as TotalContextProps;
  const {is_active8dede, setis_active8dede}= useContext(TotalContext) as TotalContextProps;
  const {del_is_active7a7ba, setdel_is_active7a7ba}= useContext(TotalContext) as TotalContextProps;
  const {text58d63, settext58d63}= useContext(TotalContext) as TotalContextProps;
  const {divider_2d3d61, setdivider_2d3d61}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btnc7ae2, setcancel_btnc7ae2}= useContext(TotalContext) as TotalContextProps;
  const {ok_btnce26e, setok_btnce26e}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_idd4429, setcert_template_idd4429}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_idd4429Props, setcert_template_idd4429Props} = useContext(TotalContext) as TotalContextProps;
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
        setgroup84d30((pre: any) => ({
          ...pre,
          cert_template_id: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.cert_template_id
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setgroup84d30((pre: any) => ({
          ...pre,
          cert_template_id: cert_template_idd4429Props?.filteredData?.length > 0
            ? cert_template_idd4429Props?.filteredData[0]?.cert_template_id
            : "0"
        }))
      }else if(Array.isArray(dfd_certificatetemplate_v1Props) && dfd_certificatetemplate_v1Props && !group84d30.cert_template_id){
        setgroup84d30((pre:any)=>({...pre,cert_template_id:dfd_certificatetemplate_v1Props[0]?.cert_template_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[cert_template_idd4429?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_certificatetemplate_v1Props) && !group84d30.cert_template_id){
    setgroup84d30((pre:any)=>({...pre,cert_template_id:dfd_certificatetemplate_v1Props[0]?.cert_template_id}));
  }
  },[dfd_certificatetemplate_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!cert_template_idd4429Props?.filterProps) return;
    handleMapperValue(cert_template_idd4429Props?.filterProps,cert_template_idd4429Props?.filterFlag);
  },[cert_template_idd4429Props?.filterProps])

  if (cert_template_idd4429?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 4`,gridRow: `74 / 76`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.cert_template_id : (group84d30?.cert_template_id || ""))}
</Text>
  </div>
  )
}

export default Textcert_template_id
