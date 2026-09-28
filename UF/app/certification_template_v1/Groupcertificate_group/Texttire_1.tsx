'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { useGlobal } from '@/context/GlobalContext'
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Texttire_1 = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group12090, setgroup12090}= useContext(TotalContext) as TotalContextProps;
  const {group12090Props, setgroup12090Props}= useContext(TotalContext) as TotalContextProps;
  const {certificate_group22fde, setcertificate_group22fde}= useContext(TotalContext) as TotalContextProps;
  const {certificate_group22fdeProps, setcertificate_group22fdeProps}= useContext(TotalContext) as TotalContextProps;
  const {full_certificate203ea, setfull_certificate203ea}= useContext(TotalContext) as TotalContextProps;
  const {tire_1dcb19, settire_1dcb19}= useContext(TotalContext) as TotalContextProps;
  const {stagesd1045, setstagesd1045}= useContext(TotalContext) as TotalContextProps;
  const {validiitye81a8, setvalidiitye81a8}= useContext(TotalContext) as TotalContextProps;
  const {in_usea8ed3, setin_usea8ed3}= useContext(TotalContext) as TotalContextProps;
  const {version6d864, setversion6d864}= useContext(TotalContext) as TotalContextProps;
  const {structed_cert_groupe6058, setstructed_cert_groupe6058}= useContext(TotalContext) as TotalContextProps;
  const {structed_cert_groupe6058Props, setstructed_cert_groupe6058Props}= useContext(TotalContext) as TotalContextProps;
  const {light_weight_group15e17, setlight_weight_group15e17}= useContext(TotalContext) as TotalContextProps;
  const {light_weight_group15e17Props, setlight_weight_group15e17Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_table75349, setcert_template_table75349}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_table75349Props, setcert_template_table75349Props}= useContext(TotalContext) as TotalContextProps;
  const {tire_1dcb19Props, settire_1dcb19Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[tire_1dcb19?.refresh])

  if (tire_1dcb19?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `20 / 25`,gridRow: `2 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"right"}
  className="text-[10px] font-medium uppercase tracking-wide text-[#71717A] bg-[#F4F5FA] px-2 py-0.5 rounded-full border border-[#E4E4E7]"
  variant="body-1"
  color="primary"
>
      {keyset("tire 1")}
</Text>
  </div>
  )
}

export default Texttire_1
