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
  const {overall_group5e5f7, setoverall_group5e5f7}= useContext(TotalContext) as TotalContextProps;
  const {overall_group5e5f7Props, setoverall_group5e5f7Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupdbcec, setai_asset_dependency_groupdbcec}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupdbcecProps, setai_asset_dependency_groupdbcecProps}= useContext(TotalContext) as TotalContextProps;
  const {textde639, settextde639}= useContext(TotalContext) as TotalContextProps;
  const {refresh_buttonca25d, setrefresh_buttonca25d}= useContext(TotalContext) as TotalContextProps;
  const {search53d65, setsearch53d65}= useContext(TotalContext) as TotalContextProps;
  const {new_sourcea3d90, setnew_sourcea3d90}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_table789c8, setai_asset_dependency_table789c8}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_table789c8Props, setai_asset_dependency_table789c8Props}= useContext(TotalContext) as TotalContextProps;
  const {textde639Props, settextde639Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[textde639?.refresh])

  if (textde639?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 18`,gridRow: `1 / 8`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-black !font-bold"
  variant="subheader-2"
  color="primary"
>
      {keyset("AI Asset Dependency")}
</Text>
  </div>
  )
}

export default Texttext
