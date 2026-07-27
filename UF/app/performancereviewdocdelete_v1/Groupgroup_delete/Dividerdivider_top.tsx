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
  const {group_delete4384f, setgroup_delete4384f}= useContext(TotalContext) as TotalContextProps;
  const {group_delete4384fProps, setgroup_delete4384fProps}= useContext(TotalContext) as TotalContextProps;
  const {divider_topd6bd8, setdivider_topd6bd8}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text314e9, setdelete_heading_text314e9}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txta253e, setattachment_id_txta253e}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id0a460, setattachment_id0a460}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_text2ee44, setdoc_group_text2ee44}= useContext(TotalContext) as TotalContextProps;
  const {doc_group35e3d, setdoc_group35e3d}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_textc0cad, setdoc_name_textc0cad}= useContext(TotalContext) as TotalContextProps;
  const {doc_namebd198, setdoc_namebd198}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_text0bbf6, settrs_created_by_text0bbf6}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_bya3008, settrs_created_bya3008}= useContext(TotalContext) as TotalContextProps;
  const {confo_textdfcf2, setconfo_textdfcf2}= useContext(TotalContext) as TotalContextProps;
  const {divider98807, setdivider98807}= useContext(TotalContext) as TotalContextProps;
  const {review_idd53ee, setreview_idd53ee}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonfc045, setcancel_buttonfc045}= useContext(TotalContext) as TotalContextProps;
  const {ok_button03deb, setok_button03deb}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[divider_topd6bd8?.refresh])

  if (divider_topd6bd8?.isHidden) {
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
