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

const Textdate_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {vob_api_info_group5fc53, setvob_api_info_group5fc53}= useContext(TotalContext) as TotalContextProps;
  const {vob_api_info_group5fc53Props, setvob_api_info_group5fc53Props}= useContext(TotalContext) as TotalContextProps;
  const {group1f4ba, setgroup1f4ba}= useContext(TotalContext) as TotalContextProps;
  const {group1f4baProps, setgroup1f4baProps}= useContext(TotalContext) as TotalContextProps;
  const {api_info_group6ad41, setapi_info_group6ad41}= useContext(TotalContext) as TotalContextProps;
  const {api_info_group6ad41Props, setapi_info_group6ad41Props}= useContext(TotalContext) as TotalContextProps;
  const {total_calls_group76982, settotal_calls_group76982}= useContext(TotalContext) as TotalContextProps;
  const {total_calls_group76982Props, settotal_calls_group76982Props}= useContext(TotalContext) as TotalContextProps;
  const {success_rate_groupb6598, setsuccess_rate_groupb6598}= useContext(TotalContext) as TotalContextProps;
  const {success_rate_groupb6598Props, setsuccess_rate_groupb6598Props}= useContext(TotalContext) as TotalContextProps;
  const {error_rate_group773d1, seterror_rate_group773d1}= useContext(TotalContext) as TotalContextProps;
  const {error_rate_group773d1Props, seterror_rate_group773d1Props}= useContext(TotalContext) as TotalContextProps;
  const {ob_group76678, setob_group76678}= useContext(TotalContext) as TotalContextProps;
  const {ob_group76678Props, setob_group76678Props}= useContext(TotalContext) as TotalContextProps;
  const {api_info_text692fd, setapi_info_text692fd}= useContext(TotalContext) as TotalContextProps;
  const {api_name_textaccc0, setapi_name_textaccc0}= useContext(TotalContext) as TotalContextProps;
  const {api_name_textinput4e4bf, setapi_name_textinput4e4bf}= useContext(TotalContext) as TotalContextProps;
  const {version_text67538, setversion_text67538}= useContext(TotalContext) as TotalContextProps;
  const {version_textinput19065, setversion_textinput19065}= useContext(TotalContext) as TotalContextProps;
  const {status_text66555, setstatus_text66555}= useContext(TotalContext) as TotalContextProps;
  const {status_textinput62886, setstatus_textinput62886}= useContext(TotalContext) as TotalContextProps;
  const {categiry_text7520b, setcategiry_text7520b}= useContext(TotalContext) as TotalContextProps;
  const {category_textinpute77d9, setcategory_textinpute77d9}= useContext(TotalContext) as TotalContextProps;
  const {date_text44a5e, setdate_text44a5e}= useContext(TotalContext) as TotalContextProps;
  const {date_textinputb262e, setdate_textinputb262e}= useContext(TotalContext) as TotalContextProps;
  const {path_textaf97a, setpath_textaf97a}= useContext(TotalContext) as TotalContextProps;
  const {path_textinputec3d3, setpath_textinputec3d3}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_group192b0, setapi_process_log_group192b0}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_group192b0Props, setapi_process_log_group192b0Props}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_table5904e, setapi_process_log_table5904e}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_table5904eProps, setapi_process_log_table5904eProps}= useContext(TotalContext) as TotalContextProps;
  const {date_text44a5eProps, setdate_text44a5eProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[date_text44a5e?.refresh])

  if (date_text44a5e?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 9`,gridRow: `58 / 67`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className="!bg-white !rounded-xl"
  variant="subheader-3"
  color="primary"
>
      {keyset("Date")}
</Text>
  </div>
  )
}

export default Textdate_text
