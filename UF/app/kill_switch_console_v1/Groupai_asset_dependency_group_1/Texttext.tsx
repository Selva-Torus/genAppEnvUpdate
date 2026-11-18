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

const Texttext = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_group8bfb3, setoverall_group8bfb3}= useContext(TotalContext) as TotalContextProps;
  const {overall_group8bfb3Props, setoverall_group8bfb3Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupeee40, setai_asset_dependency_groupeee40}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupeee40Props, setai_asset_dependency_groupeee40Props}= useContext(TotalContext) as TotalContextProps;
  const {service_identity_table953a0, setservice_identity_table953a0}= useContext(TotalContext) as TotalContextProps;
  const {service_identity_table953a0Props, setservice_identity_table953a0Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group_1ed024, setai_asset_dependency_group_1ed024}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group_1ed024Props, setai_asset_dependency_group_1ed024Props}= useContext(TotalContext) as TotalContextProps;
  const {text23bea, settext23bea}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button67fc3, setrefresh_button67fc3}= useContext(TotalContext) as TotalContextProps;
  const {search5aafb, setsearch5aafb}= useContext(TotalContext) as TotalContextProps;
  const {groupb1db8, setgroupb1db8}= useContext(TotalContext) as TotalContextProps;
  const {groupb1db8Props, setgroupb1db8Props}= useContext(TotalContext) as TotalContextProps;
  const {revocation_table5b204, setrevocation_table5b204}= useContext(TotalContext) as TotalContextProps;
  const {revocation_table5b204Props, setrevocation_table5b204Props}= useContext(TotalContext) as TotalContextProps;
  const {text23beaProps, settext23beaProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[text23bea?.refresh])

  if (text23bea?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 9`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="header-1"
  color="primary"
>
      {keyset("Revocation Receipt")}
</Text>
  </div>
  )
}

export default Texttext
