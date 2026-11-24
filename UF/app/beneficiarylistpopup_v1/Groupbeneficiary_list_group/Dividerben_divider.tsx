'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Dividerben_divider = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing,controlData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {beneficiary_list_group9d9c4, setbeneficiary_list_group9d9c4}= useContext(TotalContext) as TotalContextProps;
  const {beneficiary_list_group9d9c4Props, setbeneficiary_list_group9d9c4Props}= useContext(TotalContext) as TotalContextProps;
  const {benificiary_textb53b9, setbenificiary_textb53b9}= useContext(TotalContext) as TotalContextProps;
  const {search_textinput7144f, setsearch_textinput7144f}= useContext(TotalContext) as TotalContextProps;
  const {search_btne5c0a, setsearch_btne5c0a}= useContext(TotalContext) as TotalContextProps;
  const {ben_divideraec54, setben_divideraec54}= useContext(TotalContext) as TotalContextProps;
  const {ben_list_groupb24ac, setben_list_groupb24ac}= useContext(TotalContext) as TotalContextProps;
  const {ben_list_groupb24acProps, setben_list_groupb24acProps}= useContext(TotalContext) as TotalContextProps;
  const {benc_groupa95a7, setbenc_groupa95a7}= useContext(TotalContext) as TotalContextProps;
  const {benc_groupa95a7Props, setbenc_groupa95a7Props}= useContext(TotalContext) as TotalContextProps;
  const {confirm_dividere3b17, setconfirm_dividere3b17}= useContext(TotalContext) as TotalContextProps;
  const {clear_button188cc, setclear_button188cc}= useContext(TotalContext) as TotalContextProps;
  const {confirm_button246d5, setconfirm_button246d5}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[ben_divideraec54?.refresh])

  if (ben_divideraec54?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `10 / 13`, gap:``, height: `100%`}} >
<Divider
  className=""
  direction="horizontal"
  position="middle"
  color="#c4c0c0"
  thickness={2}
/>
  </div>
  )
}

export default Dividerben_divider
