'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
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
  const {group_delete9bbe1, setgroup_delete9bbe1}= useContext(TotalContext) as TotalContextProps;
  const {group_delete9bbe1Props, setgroup_delete9bbe1Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text7380b, setdelete_heading_text7380b}= useContext(TotalContext) as TotalContextProps;
  const {divider_s1a15b, setdivider_s1a15b}= useContext(TotalContext) as TotalContextProps;
  const {del_code_type_idea039, setdel_code_type_idea039}= useContext(TotalContext) as TotalContextProps;
  const {code_type_id8fe6f, setcode_type_id8fe6f}= useContext(TotalContext) as TotalContextProps;
  const {del_code_type3ce03, setdel_code_type3ce03}= useContext(TotalContext) as TotalContextProps;
  const {code_typedf5a3, setcode_typedf5a3}= useContext(TotalContext) as TotalContextProps;
  const {description_typef91cb, setdescription_typef91cb}= useContext(TotalContext) as TotalContextProps;
  const {description32634, setdescription32634}= useContext(TotalContext) as TotalContextProps;
  const {system_code_type9d603, setsystem_code_type9d603}= useContext(TotalContext) as TotalContextProps;
  const {is_systemc0200, setis_systemc0200}= useContext(TotalContext) as TotalContextProps;
  const {is_active6bc58, setis_active6bc58}= useContext(TotalContext) as TotalContextProps;
  const {active_type0da2f, setactive_type0da2f}= useContext(TotalContext) as TotalContextProps;
  const {confo_textcb476, setconfo_textcb476}= useContext(TotalContext) as TotalContextProps;
  const {dividerca7df, setdividerca7df}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttona9054, setcancel_buttona9054}= useContext(TotalContext) as TotalContextProps;
  const {ok_button8e870, setok_button8e870}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[dividerca7df?.refresh])

  if (dividerca7df?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 24`,gridRow: `55 / 58`, gap:``, height: `100%`}} >
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

export default Dividerdivider
