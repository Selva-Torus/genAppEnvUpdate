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

const Textlbl_prsn_code = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {grp_emp_view_details7cca5, setgrp_emp_view_details7cca5}= useContext(TotalContext) as TotalContextProps;
  const {grp_emp_view_details7cca5Props, setgrp_emp_view_details7cca5Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_emp_details5bbf3, setgrp_emp_details5bbf3}= useContext(TotalContext) as TotalContextProps;
  const {grp_emp_details5bbf3Props, setgrp_emp_details5bbf3Props}= useContext(TotalContext) as TotalContextProps;
  const {hdr_emp_details519b3, sethdr_emp_details519b3}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_channel_code83f4d, setlbl_s_channel_code83f4d}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_leave6881d, setlbl_s_leave6881d}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_inside_cntrybe1b2, setlbl_s_inside_cntrybe1b2}= useContext(TotalContext) as TotalContextProps;
  const {lbl_ch_code6fd21, setlbl_ch_code6fd21}= useContext(TotalContext) as TotalContextProps;
  const {lbl_leavefc2c9, setlbl_leavefc2c9}= useContext(TotalContext) as TotalContextProps;
  const {lbl_inside_cntry8bcae, setlbl_inside_cntry8bcae}= useContext(TotalContext) as TotalContextProps;
  const {divider1d3fd6, setdivider1d3fd6}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_sal_typeb0082, setlbl_s_sal_typeb0082}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_wrk_emid0fa84, setlbl_s_wrk_emid0fa84}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_pas_num2951b, setlbl_s_pas_num2951b}= useContext(TotalContext) as TotalContextProps;
  const {lbl_sal_typee5fad, setlbl_sal_typee5fad}= useContext(TotalContext) as TotalContextProps;
  const {lbl_wrk_emidd0501, setlbl_wrk_emidd0501}= useContext(TotalContext) as TotalContextProps;
  const {lbl_pass_numbf1c1, setlbl_pass_numbf1c1}= useContext(TotalContext) as TotalContextProps;
  const {divider3e5b62, setdivider3e5b62}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_cmp_code11164, setlbl_s_cmp_code11164}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_persn_code785b1, setlbl_s_persn_code785b1}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_agntcodee3a1d, setlbl_s_agntcodee3a1d}= useContext(TotalContext) as TotalContextProps;
  const {lbl_cmp_cde8afa3, setlbl_cmp_cde8afa3}= useContext(TotalContext) as TotalContextProps;
  const {lbl_prsn_code9fac4, setlbl_prsn_code9fac4}= useContext(TotalContext) as TotalContextProps;
  const {lbl_angnt_cdee285a, setlbl_angnt_cdee285a}= useContext(TotalContext) as TotalContextProps;
  const {divider223785, setdivider223785}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_wrk_iban0b21a, setlbl_s_wrk_iban0b21a}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_remarks514e5, setlbl_s_remarks514e5}= useContext(TotalContext) as TotalContextProps;
  const {lblwrk_ibane57ee, setlblwrk_ibane57ee}= useContext(TotalContext) as TotalContextProps;
  const {lbl_rmksb105f, setlbl_rmksb105f}= useContext(TotalContext) as TotalContextProps;
  const {grp_other_details0dea3, setgrp_other_details0dea3}= useContext(TotalContext) as TotalContextProps;
  const {grp_other_details0dea3Props, setgrp_other_details0dea3Props}= useContext(TotalContext) as TotalContextProps;
  const {lbl_prsn_code9fac4Props, setlbl_prsn_code9fac4Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[lbl_prsn_code9fac4?.refresh])

  if (lbl_prsn_code9fac4?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `9 / 16`,gridRow: `69 / 76`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.lbl_prsn_code : (grp_emp_details5bbf3?.lbl_prsn_code || ""))}
</Text>
  </div>
  )
}

export default Textlbl_prsn_code
