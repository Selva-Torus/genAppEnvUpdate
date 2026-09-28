'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Dividerdivider_s = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing,controlData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete8f763, setgroup_delete8f763}= useContext(TotalContext) as TotalContextProps;
  const {group_delete8f763Props, setgroup_delete8f763Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_texta0ff5, setdelete_heading_texta0ff5}= useContext(TotalContext) as TotalContextProps;
  const {divider_s5e9e7, setdivider_s5e9e7}= useContext(TotalContext) as TotalContextProps;
  const {del_risk_rule__id8a1a8, setdel_risk_rule__id8a1a8}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_idb7f80, setrisk_rule_idb7f80}= useContext(TotalContext) as TotalContextProps;
  const {del_attribute_nameea67e, setdel_attribute_nameea67e}= useContext(TotalContext) as TotalContextProps;
  const {attribute_name38f26, setattribute_name38f26}= useContext(TotalContext) as TotalContextProps;
  const {del_operator_codefe788, setdel_operator_codefe788}= useContext(TotalContext) as TotalContextProps;
  const {operator_code0e759, setoperator_code0e759}= useContext(TotalContext) as TotalContextProps;
  const {sequence_no_del5f79d, setsequence_no_del5f79d}= useContext(TotalContext) as TotalContextProps;
  const {sequence_nofc431, setsequence_nofc431}= useContext(TotalContext) as TotalContextProps;
  const {active_type5f80e, setactive_type5f80e}= useContext(TotalContext) as TotalContextProps;
  const {is_active4eecd, setis_active4eecd}= useContext(TotalContext) as TotalContextProps;
  const {confo_text2ede6, setconfo_text2ede6}= useContext(TotalContext) as TotalContextProps;
  const {divider40ded, setdivider40ded}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button620c9, setcancel_button620c9}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonfd2d0, setok_buttonfd2d0}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[divider_s5e9e7?.refresh])

  if (divider_s5e9e7?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 24`,gridRow: `9 / 12`, gap:``, height: `100%`}} >
<Divider
  className=""
  direction="horizontal"
  position="middle"
  color="#dad7d7"
  thickness={2}
/>
  </div>
  )
}

export default Dividerdivider_s
