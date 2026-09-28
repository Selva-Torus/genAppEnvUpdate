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

const Textintegrationrun_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {group089a5, setgroup089a5}= useContext(TotalContext) as TotalContextProps;
  const {group089a5Props, setgroup089a5Props}= useContext(TotalContext) as TotalContextProps;
  const {integrationrun_text846c5, setintegrationrun_text846c5}= useContext(TotalContext) as TotalContextProps;
  const {ref_btn14f17, setref_btn14f17}= useContext(TotalContext) as TotalContextProps;
  const {search_btn323c8, setsearch_btn323c8}= useContext(TotalContext) as TotalContextProps;
  const {new_run_btn3082c, setnew_run_btn3082c}= useContext(TotalContext) as TotalContextProps;
  const {integration_run8ef02, setintegration_run8ef02}= useContext(TotalContext) as TotalContextProps;
  const {integration_run8ef02Props, setintegration_run8ef02Props}= useContext(TotalContext) as TotalContextProps;
  const {integrationrun_text846c5Props, setintegrationrun_text846c5Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[integrationrun_text846c5?.refresh])

  if (integrationrun_text846c5?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 5`,gridRow: `1 / 8`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-black !font-bold"
  variant="subheader-2"
  color="primary"
>
      {keyset("Integration Run")}
</Text>
  </div>
  )
}

export default Textintegrationrun_text
