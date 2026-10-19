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

const Textnote_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_ai_asset_registry1e42b, setoverall_ai_asset_registry1e42b}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry1e42bProps, setoverall_ai_asset_registry1e42bProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupb6b42, setai_registry_groupb6b42}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupb6b42Props, setai_registry_groupb6b42Props}= useContext(TotalContext) as TotalContextProps;
  const {group675e8, setgroup675e8}= useContext(TotalContext) as TotalContextProps;
  const {group675e8Props, setgroup675e8Props}= useContext(TotalContext) as TotalContextProps;
  const {desc_groupda73a, setdesc_groupda73a}= useContext(TotalContext) as TotalContextProps;
  const {desc_groupda73aProps, setdesc_groupda73aProps}= useContext(TotalContext) as TotalContextProps;
  const {note_textf520a, setnote_textf520a}= useContext(TotalContext) as TotalContextProps;
  const {desc_text65a80, setdesc_text65a80}= useContext(TotalContext) as TotalContextProps;
  const {notes_text0130b, setnotes_text0130b}= useContext(TotalContext) as TotalContextProps;
  const {rule_group83db0, setrule_group83db0}= useContext(TotalContext) as TotalContextProps;
  const {rule_group83db0Props, setrule_group83db0Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_evaluation_table9e865, setrule_evaluation_table9e865}= useContext(TotalContext) as TotalContextProps;
  const {rule_evaluation_table9e865Props, setrule_evaluation_table9e865Props}= useContext(TotalContext) as TotalContextProps;
  const {note_textf520aProps, setnote_textf520aProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[note_textf520a?.refresh])

  if (note_textf520a?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `1 / 8`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!p-1 !font-bold !bg-[#f0f2f7] !rounded-l !border !border-[#c4c4c4] !text-black"
  variant="subheader-2"
  color="primary"
>
      {keyset("Note :")}
</Text>
  </div>
  )
}

export default Textnote_text
