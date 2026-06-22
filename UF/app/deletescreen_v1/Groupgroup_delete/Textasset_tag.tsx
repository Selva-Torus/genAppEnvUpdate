'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textasset_tag = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assets_v1Props, setdfd_assets_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete3c02f, setgroup_delete3c02f}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3c02fProps, setgroup_delete3c02fProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text766e5, setdelete_heading_text766e5}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text2a279, setasset_name_text2a279}= useContext(TotalContext) as TotalContextProps;
  const {asset_named7764, setasset_named7764}= useContext(TotalContext) as TotalContextProps;
  const {asset_tag_text6db8e, setasset_tag_text6db8e}= useContext(TotalContext) as TotalContextProps;
  const {asset_tag5b0ef, setasset_tag5b0ef}= useContext(TotalContext) as TotalContextProps;
  const {category_name_text6b1b6, setcategory_name_text6b1b6}= useContext(TotalContext) as TotalContextProps;
  const {category_nameb3bdb, setcategory_nameb3bdb}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_textbf4bc, setasset_type_textbf4bc}= useContext(TotalContext) as TotalContextProps;
  const {asset_typebe078, setasset_typebe078}= useContext(TotalContext) as TotalContextProps;
  const {location_text55088, setlocation_text55088}= useContext(TotalContext) as TotalContextProps;
  const {location0b4e4, setlocation0b4e4}= useContext(TotalContext) as TotalContextProps;
  const {confo_textad78a, setconfo_textad78a}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button24a33, setcancel_button24a33}= useContext(TotalContext) as TotalContextProps;
  const {ok_button58a95, setok_button58a95}= useContext(TotalContext) as TotalContextProps;
  const {asset_id4d81b, setasset_id4d81b}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_assets_v1Props && !dfd_assets_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_assets_v1Props.dstKey,
            page: 1,
            count: 1
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if(api_paginationData.data.records?.length){
        setgroup_delete3c02f((pre: any) => {
          return { ...pre, asset_tag: api_paginationData.data.records[0]?.asset_tag }
        })
        }
      }
      else{
      if(Array.isArray(dfd_assets_v1Props) && dfd_assets_v1Props && !group_delete3c02f.asset_tag){
        setgroup_delete3c02f((pre:any)=>({...pre,asset_tag:dfd_assets_v1Props[0]?.asset_tag}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[asset_tag5b0ef?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_assets_v1Props) && !group_delete3c02f.asset_tag){
    setgroup_delete3c02f((pre:any)=>({...pre,asset_tag:dfd_assets_v1Props[0]?.asset_tag}));
  }
  },[dfd_assets_v1Props])

  if (asset_tag5b0ef?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `8 / 24`,gridRow: `13 / 18`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.asset_tag : (group_delete3c02f?.asset_tag || ""))}
</Text>
  </div>
  )
}

export default Textasset_tag
