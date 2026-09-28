'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Dividerdivider_2 = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing,controlData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group79c03, setgroup79c03}= useContext(TotalContext) as TotalContextProps;
  const {group79c03Props, setgroup79c03Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_texte4a10, setdelete_heading_texte4a10}= useContext(TotalContext) as TotalContextProps;
  const {div_198ee5, setdiv_198ee5}= useContext(TotalContext) as TotalContextProps;
  const {source_id53454, setsource_id53454}= useContext(TotalContext) as TotalContextProps;
  const {integration_source_idf4d20, setintegration_source_idf4d20}= useContext(TotalContext) as TotalContextProps;
  const {source_code13e0c, setsource_code13e0c}= useContext(TotalContext) as TotalContextProps;
  const {integration_source_code3e7e2, setintegration_source_code3e7e2}= useContext(TotalContext) as TotalContextProps;
  const {source_name60ac7, setsource_name60ac7}= useContext(TotalContext) as TotalContextProps;
  const {integration_source_name2b239, setintegration_source_name2b239}= useContext(TotalContext) as TotalContextProps;
  const {connector_type328cc, setconnector_type328cc}= useContext(TotalContext) as TotalContextProps;
  const {integration_connector_type29cd0, setintegration_connector_type29cd0}= useContext(TotalContext) as TotalContextProps;
  const {status9cd32, setstatus9cd32}= useContext(TotalContext) as TotalContextProps;
  const {is_activef0183, setis_activef0183}= useContext(TotalContext) as TotalContextProps;
  const {textfd8c5, settextfd8c5}= useContext(TotalContext) as TotalContextProps;
  const {divider_27dbcc, setdivider_27dbcc}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btn82ef5, setcancel_btn82ef5}= useContext(TotalContext) as TotalContextProps;
  const {delete_btnb4584, setdelete_btnb4584}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[divider_27dbcc?.refresh])

  if (divider_27dbcc?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 24`,gridRow: `51 / 52`, gap:``, height: `100%`}} >
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

export default Dividerdivider_2
