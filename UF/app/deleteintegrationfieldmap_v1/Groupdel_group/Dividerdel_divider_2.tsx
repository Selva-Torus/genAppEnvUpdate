'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Dividerdel_divider_2 = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing,controlData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {del_group0e789, setdel_group0e789}= useContext(TotalContext) as TotalContextProps;
  const {del_group0e789Props, setdel_group0e789Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtc115c, setdelete_heading_txtc115c}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_19e216, setdel_divider_19e216}= useContext(TotalContext) as TotalContextProps;
  const {del_field_map_id42f08, setdel_field_map_id42f08}= useContext(TotalContext) as TotalContextProps;
  const {field_map_id7529d, setfield_map_id7529d}= useContext(TotalContext) as TotalContextProps;
  const {del_integration_source_text3544e, setdel_integration_source_text3544e}= useContext(TotalContext) as TotalContextProps;
  const {source_name6c577, setsource_name6c577}= useContext(TotalContext) as TotalContextProps;
  const {source_field_path_textdb42b, setsource_field_path_textdb42b}= useContext(TotalContext) as TotalContextProps;
  const {source_field_path92e47, setsource_field_path92e47}= useContext(TotalContext) as TotalContextProps;
  const {targe_tentity__text6b5d0, settarge_tentity__text6b5d0}= useContext(TotalContext) as TotalContextProps;
  const {target_entity6f0f5, settarget_entity6f0f5}= useContext(TotalContext) as TotalContextProps;
  const {target_attribute_txtf878b, settarget_attribute_txtf878b}= useContext(TotalContext) as TotalContextProps;
  const {target_attributedce21, settarget_attributedce21}= useContext(TotalContext) as TotalContextProps;
  const {is_active_txt7b746, setis_active_txt7b746}= useContext(TotalContext) as TotalContextProps;
  const {is_active9655f, setis_active9655f}= useContext(TotalContext) as TotalContextProps;
  const {textb50e5, settextb50e5}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_231d84, setdel_divider_231d84}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn4ada6, setdel_cancel_btn4ada6}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btnb2163, setdel_okl_btnb2163}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[del_divider_231d84?.refresh])

  if (del_divider_231d84?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 24`,gridRow: `54 / 55`, gap:``, height: `100%`}} >
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

export default Dividerdel_divider_2
