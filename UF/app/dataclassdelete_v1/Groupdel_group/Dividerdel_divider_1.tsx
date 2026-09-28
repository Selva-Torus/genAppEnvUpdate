'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Dividerdel_divider_1 = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing,controlData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {del_group7e857, setdel_group7e857}= useContext(TotalContext) as TotalContextProps;
  const {del_group7e857Props, setdel_group7e857Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt4a602, setdelete_heading_txt4a602}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_17957b, setdel_divider_17957b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text7377f, setasset_name_text7377f}= useContext(TotalContext) as TotalContextProps;
  const {asset_nameae58e, setasset_nameae58e}= useContext(TotalContext) as TotalContextProps;
  const {data_class_code_text87efb, setdata_class_code_text87efb}= useContext(TotalContext) as TotalContextProps;
  const {data_class_codee6763, setdata_class_codee6763}= useContext(TotalContext) as TotalContextProps;
  const {text3364f, settext3364f}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_2725fd, setdel_divider_2725fd}= useContext(TotalContext) as TotalContextProps;
  const {asset_data_class_id9ae60, setasset_data_class_id9ae60}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btnd5bbd, setdel_cancel_btnd5bbd}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn25863, setdel_okl_btn25863}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[del_divider_17957b?.refresh])

  if (del_divider_17957b?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 24`,gridRow: `7 / 9`, gap:``, height: `100%`}} >
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

export default Dividerdel_divider_1
