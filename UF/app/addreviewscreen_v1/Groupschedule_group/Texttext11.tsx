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

const Texttext11 = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {add_groupac52e, setadd_groupac52e}= useContext(TotalContext) as TotalContextProps;
  const {add_groupac52eProps, setadd_groupac52eProps}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition_headerf18e6, setadd_rule_condition_headerf18e6}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition_headerf18e6Props, setadd_rule_condition_headerf18e6Props}= useContext(TotalContext) as TotalContextProps;
  const {group73b09, setgroup73b09}= useContext(TotalContext) as TotalContextProps;
  const {group73b09Props, setgroup73b09Props}= useContext(TotalContext) as TotalContextProps;
  const {schedule_groupc0bee, setschedule_groupc0bee}= useContext(TotalContext) as TotalContextProps;
  const {schedule_groupc0beeProps, setschedule_groupc0beeProps}= useContext(TotalContext) as TotalContextProps;
  const {text113556f, settext113556f}= useContext(TotalContext) as TotalContextProps;
  const {due_on4bc44, setdue_on4bc44}= useContext(TotalContext) as TotalContextProps;
  const {evidence_count4538e, setevidence_count4538e}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_oncdec5, settrs_created_oncdec5}= useContext(TotalContext) as TotalContextProps;
  const {status_groupc59b9, setstatus_groupc59b9}= useContext(TotalContext) as TotalContextProps;
  const {status_groupc59b9Props, setstatus_groupc59b9Props}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition96c45, setadd_rule_condition96c45}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition96c45Props, setadd_rule_condition96c45Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions62ac1, setdynamicactions62ac1}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions62ac1Props, setdynamicactions62ac1Props}= useContext(TotalContext) as TotalContextProps;
  const {text113556fProps, settext113556fProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[text113556f?.refresh])

  if (text113556f?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 12`,gridRow: `1 / 6`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="font-bold"
  variant="subheader-1"
  color="primary"
>
      {keyset("Schedule and Evidence")}
</Text>
  </div>
  )
}

export default Texttext11
