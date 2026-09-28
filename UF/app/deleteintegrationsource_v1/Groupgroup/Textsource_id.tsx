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

const Textsource_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {source_id53454Props, setsource_id53454Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[source_id53454?.refresh])

  if (source_id53454?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 7`,gridRow: `11 / 15`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset("Source ID")}
</Text>
  </div>
  )
}

export default Textsource_id
