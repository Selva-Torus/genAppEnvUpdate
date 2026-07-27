'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment'
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Dividerdivider = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing,controlData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete617ef, setgroup_delete617ef}= useContext(TotalContext) as TotalContextProps;
  const {group_delete617efProps, setgroup_delete617efProps}= useContext(TotalContext) as TotalContextProps;
  const {divider_top168f7, setdivider_top168f7}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text2560c, setdelete_heading_text2560c}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txt17233, setattachment_id_txt17233}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id987ae, setattachment_id987ae}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_textffd12, setdoc_group_textffd12}= useContext(TotalContext) as TotalContextProps;
  const {doc_group3263c, setdoc_group3263c}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_text76c54, setdoc_name_text76c54}= useContext(TotalContext) as TotalContextProps;
  const {doc_name2d223, setdoc_name2d223}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_texte87c8, settrs_created_by_texte87c8}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by3ee0e, settrs_created_by3ee0e}= useContext(TotalContext) as TotalContextProps;
  const {confo_textbbf51, setconfo_textbbf51}= useContext(TotalContext) as TotalContextProps;
  const {divider77bc6, setdivider77bc6}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_id3cec0, setleave_req_id3cec0}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonc4f32, setcancel_buttonc4f32}= useContext(TotalContext) as TotalContextProps;
  const {ok_button0c2f2, setok_button0c2f2}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[divider77bc6?.refresh])

  if (divider77bc6?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `41 / 44`, gap:``, height: `100%`}} >
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

export default Dividerdivider
