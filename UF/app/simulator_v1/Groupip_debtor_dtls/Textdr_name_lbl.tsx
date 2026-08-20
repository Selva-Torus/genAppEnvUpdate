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

const Textdr_name_lbl = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {simulator_main_group0541e, setsimulator_main_group0541e}= useContext(TotalContext) as TotalContextProps;
  const {simulator_main_group0541eProps, setsimulator_main_group0541eProps}= useContext(TotalContext) as TotalContextProps;
  const {simulator_tab_groupfd732, setsimulator_tab_groupfd732}= useContext(TotalContext) as TotalContextProps;
  const {simulator_tab_groupfd732Props, setsimulator_tab_groupfd732Props}= useContext(TotalContext) as TotalContextProps;
  const {op_financial4735b, setop_financial4735b}= useContext(TotalContext) as TotalContextProps;
  const {op_financial4735bProps, setop_financial4735bProps}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_grp8a39a, setop_financial_grp8a39a}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_grp8a39aProps, setop_financial_grp8a39aProps}= useContext(TotalContext) as TotalContextProps;
  const {op_settlemente399b, setop_settlemente399b}= useContext(TotalContext) as TotalContextProps;
  const {op_settlemente399bProps, setop_settlemente399bProps}= useContext(TotalContext) as TotalContextProps;
  const {op_settlement_grpb706d, setop_settlement_grpb706d}= useContext(TotalContext) as TotalContextProps;
  const {op_settlement_grpb706dProps, setop_settlement_grpb706dProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial66005, setip_financial66005}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial66005Props, setip_financial66005Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_debtor_dtls8143c, setip_debtor_dtls8143c}= useContext(TotalContext) as TotalContextProps;
  const {ip_debtor_dtls8143cProps, setip_debtor_dtls8143cProps}= useContext(TotalContext) as TotalContextProps;
  const {debtor_info5fbb6, setdebtor_info5fbb6}= useContext(TotalContext) as TotalContextProps;
  const {dr_account50944, setdr_account50944}= useContext(TotalContext) as TotalContextProps;
  const {dr_account_lble3517, setdr_account_lble3517}= useContext(TotalContext) as TotalContextProps;
  const {dr_name_lbl2b7b9, setdr_name_lbl2b7b9}= useContext(TotalContext) as TotalContextProps;
  const {dr_name9810f, setdr_name9810f}= useContext(TotalContext) as TotalContextProps;
  const {dr_bank_lbl81c4c, setdr_bank_lbl81c4c}= useContext(TotalContext) as TotalContextProps;
  const {dr_banke5943, setdr_banke5943}= useContext(TotalContext) as TotalContextProps;
  const {ip_creditor_dtls1ade4, setip_creditor_dtls1ade4}= useContext(TotalContext) as TotalContextProps;
  const {ip_creditor_dtls1ade4Props, setip_creditor_dtls1ade4Props}= useContext(TotalContext) as TotalContextProps;
  const {payment_dtls30132, setpayment_dtls30132}= useContext(TotalContext) as TotalContextProps;
  const {payment_dtls30132Props, setpayment_dtls30132Props}= useContext(TotalContext) as TotalContextProps;
  const {addionl_info43014, setaddionl_info43014}= useContext(TotalContext) as TotalContextProps;
  const {addionl_info43014Props, setaddionl_info43014Props}= useContext(TotalContext) as TotalContextProps;
  const {button_grp7b9b7, setbutton_grp7b9b7}= useContext(TotalContext) as TotalContextProps;
  const {button_grp7b9b7Props, setbutton_grp7b9b7Props}= useContext(TotalContext) as TotalContextProps;
  const {dr_name_lbl2b7b9Props, setdr_name_lbl2b7b9Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[dr_name_lbl2b7b9?.refresh])

  if (dr_name_lbl2b7b9?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 6`,gridRow: `9 / 12`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-2"
  color="primary"
>
      {keyset("Dr Name")}
</Text>
  </div>
  )
}

export default Textdr_name_lbl
