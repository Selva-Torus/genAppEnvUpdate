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

const Textasset_code = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_airegistry_v1Props, setdfd_airegistry_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {del_groupd73cb, setdel_groupd73cb}= useContext(TotalContext) as TotalContextProps;
  const {del_groupd73cbProps, setdel_groupd73cbProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt74c2d, setdelete_heading_txt74c2d}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1258b4, setdel_divider_1258b4}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text7fd5e, setasset_name_text7fd5e}= useContext(TotalContext) as TotalContextProps;
  const {asset_name64b8e, setasset_name64b8e}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text333ee, setasset_code_text333ee}= useContext(TotalContext) as TotalContextProps;
  const {asset_codeabd34, setasset_codeabd34}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_textfadb9, setasset_type_code_textfadb9}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code2fd2c, setasset_type_code2fd2c}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text398fb, setrisk_tier_code_text398fb}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_codea1cf5, setrisk_tier_codea1cf5}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_texte5517, setlifecycle_status_code_texte5517}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code21964, setlifecycle_status_code21964}= useContext(TotalContext) as TotalContextProps;
  const {textb25bd, settextb25bd}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_25d9ec, setdel_divider_25d9ec}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id005d2, setai_asset_id005d2}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn0ef33, setdel_cancel_btn0ef33}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn0f4f4, setdel_okl_btn0f4f4}= useContext(TotalContext) as TotalContextProps;
  const {asset_codeabd34Props, setasset_codeabd34Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_airegistry_v1Props && !dfd_airegistry_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_airegistry_v1Props.dstKey,
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
        setdel_groupd73cb((pre: any) => ({
          ...pre,
          asset_code: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.asset_code
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setdel_groupd73cb((pre: any) => ({
          ...pre,
          asset_code: asset_codeabd34Props?.filteredData?.length > 0
            ? asset_codeabd34Props?.filteredData[0]?.asset_code
            : "0"
        }))
      }else if(Array.isArray(dfd_airegistry_v1Props) && dfd_airegistry_v1Props && !del_groupd73cb.asset_code){
        setdel_groupd73cb((pre:any)=>({...pre,asset_code:dfd_airegistry_v1Props[0]?.asset_code}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[asset_codeabd34?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_airegistry_v1Props) && !del_groupd73cb.asset_code){
    setdel_groupd73cb((pre:any)=>({...pre,asset_code:dfd_airegistry_v1Props[0]?.asset_code}));
  }
  },[dfd_airegistry_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!asset_codeabd34Props?.filterProps) return;
    handleMapperValue(asset_codeabd34Props?.filterProps,asset_codeabd34Props?.filterFlag);
  },[asset_codeabd34Props?.filterProps])

  if (asset_codeabd34?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `8 / 24`,gridRow: `16 / 21`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !rounded-l !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset("")}
</Text>
  </div>
  )
}

export default Textasset_code
