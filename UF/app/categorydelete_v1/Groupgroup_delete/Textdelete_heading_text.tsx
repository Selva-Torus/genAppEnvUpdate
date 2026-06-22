'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textdelete_heading_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete3c2cd, setgroup_delete3c2cd}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3c2cdProps, setgroup_delete3c2cdProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textb1f29, setdelete_heading_textb1f29}= useContext(TotalContext) as TotalContextProps;
  const {category_code_text0975e, setcategory_code_text0975e}= useContext(TotalContext) as TotalContextProps;
  const {category_codef16a8, setcategory_codef16a8}= useContext(TotalContext) as TotalContextProps;
  const {category_name_text7648e, setcategory_name_text7648e}= useContext(TotalContext) as TotalContextProps;
  const {category_namecbc0b, setcategory_namecbc0b}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_method_text82fb3, setdepreciation_method_text82fb3}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_method0e872, setdepreciation_method0e872}= useContext(TotalContext) as TotalContextProps;
  const {useful_life_years_text30347, setuseful_life_years_text30347}= useContext(TotalContext) as TotalContextProps;
  const {useful_life_yearsa64db, setuseful_life_yearsa64db}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_required_textf1aaf, setmaintenance_required_textf1aaf}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_required336be, setmaintenance_required336be}= useContext(TotalContext) as TotalContextProps;
  const {confo_texte7cc3, setconfo_texte7cc3}= useContext(TotalContext) as TotalContextProps;
  const {acat_id9127b, setacat_id9127b}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonc0568, setcancel_buttonc0568}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonc8577, setok_buttonc8577}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[delete_heading_textb1f29?.refresh])

  if (delete_heading_textb1f29?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `1 / 6`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-2"
  color="primary"
>
      {keyset("Are you sure you want to delete this category record?")}
</Text>
  </div>
  )
}

export default Textdelete_heading_text
