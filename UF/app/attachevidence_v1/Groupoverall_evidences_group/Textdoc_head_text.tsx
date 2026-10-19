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

const Textdoc_head_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_evidences_groupc014d, setoverall_evidences_groupc014d}= useContext(TotalContext) as TotalContextProps;
  const {overall_evidences_groupc014dProps, setoverall_evidences_groupc014dProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_group300d2, setasset_information_group300d2}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_group300d2Props, setasset_information_group300d2Props}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_groupfe37c, setevidence_table_groupfe37c}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_groupfe37cProps, setevidence_table_groupfe37cProps}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table88d5c, setevidence_table88d5c}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table88d5cProps, setevidence_table88d5cProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_head_text584e0, setdoc_head_text584e0}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanel611bd, setdocumentuploadpanel611bd}= useContext(TotalContext) as TotalContextProps;
  const {button_add_doc7661f, setbutton_add_doc7661f}= useContext(TotalContext) as TotalContextProps;
  const {doc_head_text584e0Props, setdoc_head_text584e0Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[doc_head_text584e0?.refresh])

  if (doc_head_text584e0?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `70 / 77`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold"
  variant="subheader-2"
  color="primary"
>
      {keyset("Document Attachment")}
</Text>
  </div>
  )
}

export default Textdoc_head_text
