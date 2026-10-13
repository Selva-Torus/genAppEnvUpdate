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

const Textlbl_s_sal_pymt_date = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {grp_other_details0dea3, setgrp_other_details0dea3}= useContext(TotalContext) as TotalContextProps;
  const {grp_other_details0dea3Props, setgrp_other_details0dea3Props}= useContext(TotalContext) as TotalContextProps;
  const {hdr_sal_detailscc668, sethdr_sal_detailscc668}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_year8a7b7, setlbl_s_year8a7b7}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_prd1d712, setlbl_s_prd1d712}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_frm_dteaf9ff, setlbl_s_frm_dteaf9ff}= useContext(TotalContext) as TotalContextProps;
  const {lbl_year77e9a, setlbl_year77e9a}= useContext(TotalContext) as TotalContextProps;
  const {lbl_prd231ed, setlbl_prd231ed}= useContext(TotalContext) as TotalContextProps;
  const {lbl_from_date5c572, setlbl_from_date5c572}= useContext(TotalContext) as TotalContextProps;
  const {divider41b7ce, setdivider41b7ce}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_to_dtec31c3, setlbl_s_to_dtec31c3}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_sal_pymt_date3433b, setlbl_s_sal_pymt_date3433b}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_days_paid8f15c, setlbl_s_days_paid8f15c}= useContext(TotalContext) as TotalContextProps;
  const {lbl_to_date68efb, setlbl_to_date68efb}= useContext(TotalContext) as TotalContextProps;
  const {lbl_file_id71627, setlbl_file_id71627}= useContext(TotalContext) as TotalContextProps;
  const {lbl_days_paidfaad7, setlbl_days_paidfaad7}= useContext(TotalContext) as TotalContextProps;
  const {divider54066d, setdivider54066d}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_fix_in368c0, setlbl_s_fix_in368c0}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_in_varaf378, setlbl_s_in_varaf378}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_to_sal357e4, setlbl_s_to_sal357e4}= useContext(TotalContext) as TotalContextProps;
  const {lbl_fix_in1338c, setlbl_fix_in1338c}= useContext(TotalContext) as TotalContextProps;
  const {lbl_in_varb6ce9, setlbl_in_varb6ce9}= useContext(TotalContext) as TotalContextProps;
  const {lbl_to_sal3b4e8, setlbl_to_sal3b4e8}= useContext(TotalContext) as TotalContextProps;
  const {divider6490c6, setdivider6490c6}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_to_beneaed7e, setlbl_s_to_beneaed7e}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_to_deduction078ca, setlbl_s_to_deduction078ca}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_to_allow8942c, setlbl_s_to_allow8942c}= useContext(TotalContext) as TotalContextProps;
  const {lbl_to_bene728c0, setlbl_to_bene728c0}= useContext(TotalContext) as TotalContextProps;
  const {lbl_to_deductionbd7f3, setlbl_to_deductionbd7f3}= useContext(TotalContext) as TotalContextProps;
  const {lbl_to_allo2f67a, setlbl_to_allo2f67a}= useContext(TotalContext) as TotalContextProps;
  const {divider7df1c4, setdivider7df1c4}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_to_incen9e037, setlbl_s_to_incen9e037}= useContext(TotalContext) as TotalContextProps;
  const {lbl_toince2e251, setlbl_toince2e251}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_sal_pymt_date3433bProps, setlbl_s_sal_pymt_date3433bProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[lbl_s_sal_pymt_date3433b?.refresh])

  if (lbl_s_sal_pymt_date3433b?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `9 / 17`,gridRow: `37 / 44`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset("Salary Payment Date")}
</Text>
  </div>
  )
}

export default Textlbl_s_sal_pymt_date
