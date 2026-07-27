'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment'
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Dividerdivider_top = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing,controlData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_deletee7496, setgroup_deletee7496}= useContext(TotalContext) as TotalContextProps;
  const {group_deletee7496Props, setgroup_deletee7496Props}= useContext(TotalContext) as TotalContextProps;
  const {divider_topff733, setdivider_topff733}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text54f32, setdelete_heading_text54f32}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txt06ae9, setattachment_id_txt06ae9}= useContext(TotalContext) as TotalContextProps;
  const {attachment_ideb2da, setattachment_ideb2da}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_textac80d, setdoc_group_textac80d}= useContext(TotalContext) as TotalContextProps;
  const {doc_groupd3c6e, setdoc_groupd3c6e}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_text550d7, setdoc_name_text550d7}= useContext(TotalContext) as TotalContextProps;
  const {doc_name42663, setdoc_name42663}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_texte814b, settrs_created_by_texte814b}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_byfc11e, settrs_created_byfc11e}= useContext(TotalContext) as TotalContextProps;
  const {confo_text8976f, setconfo_text8976f}= useContext(TotalContext) as TotalContextProps;
  const {divider004b8, setdivider004b8}= useContext(TotalContext) as TotalContextProps;
  const {access_req_idf71e7, setaccess_req_idf71e7}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonbc6e4, setcancel_buttonbc6e4}= useContext(TotalContext) as TotalContextProps;
  const {ok_button53062, setok_button53062}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[divider_topff733?.refresh])

  if (divider_topff733?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `1 / 4`, gap:``, height: `100%`}} >
<Divider
  className=""
  direction="horizontal"
  position="middle"
  color="#d4d4d4"
  thickness={2}
/>
  </div>
  )
}

export default Dividerdivider_top
