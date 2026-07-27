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
  const {group_delete34b87, setgroup_delete34b87}= useContext(TotalContext) as TotalContextProps;
  const {group_delete34b87Props, setgroup_delete34b87Props}= useContext(TotalContext) as TotalContextProps;
  const {divider_top46f9f, setdivider_top46f9f}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text27aec, setdelete_heading_text27aec}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txtafea2, setattachment_id_txtafea2}= useContext(TotalContext) as TotalContextProps;
  const {attachment_idb53af, setattachment_idb53af}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_text06da8, setdoc_group_text06da8}= useContext(TotalContext) as TotalContextProps;
  const {doc_group6a933, setdoc_group6a933}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_text43fe5, setdoc_name_text43fe5}= useContext(TotalContext) as TotalContextProps;
  const {doc_namec14df, setdoc_namec14df}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_textb6f28, settrs_created_by_textb6f28}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by2301e, settrs_created_by2301e}= useContext(TotalContext) as TotalContextProps;
  const {confo_text31826, setconfo_text31826}= useContext(TotalContext) as TotalContextProps;
  const {divider19fb2, setdivider19fb2}= useContext(TotalContext) as TotalContextProps;
  const {policy_idb60b9, setpolicy_idb60b9}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button890a9, setcancel_button890a9}= useContext(TotalContext) as TotalContextProps;
  const {ok_button435a9, setok_button435a9}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[divider_top46f9f?.refresh])

  if (divider_top46f9f?.isHidden) {
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
