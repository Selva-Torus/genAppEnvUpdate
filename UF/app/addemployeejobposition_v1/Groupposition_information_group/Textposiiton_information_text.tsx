'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textposiiton_information_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {overall_groupae38a, setoverall_groupae38a}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupae38aProps, setoverall_groupae38aProps}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group5335b, setposition_information_group5335b}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group5335bProps, setposition_information_group5335bProps}= useContext(TotalContext) as TotalContextProps;
  const {posiiton_information_texta2b56, setposiiton_information_texta2b56}= useContext(TotalContext) as TotalContextProps;
  const {position_codea4553, setposition_codea4553}= useContext(TotalContext) as TotalContextProps;
  const {position_titleda529, setposition_titleda529}= useContext(TotalContext) as TotalContextProps;
  const {description9d446, setdescription9d446}= useContext(TotalContext) as TotalContextProps;
  const {grade_namee4856, setgrade_namee4856}= useContext(TotalContext) as TotalContextProps;
  const {employment_type9bb76, setemployment_type9bb76}= useContext(TotalContext) as TotalContextProps;
  const {experience_required6a911, setexperience_required6a911}= useContext(TotalContext) as TotalContextProps;
  const {job_family4c9f2, setjob_family4c9f2}= useContext(TotalContext) as TotalContextProps;
  const {job_level77c64, setjob_level77c64}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6, setcompensation_benfits_groupb46e6}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6Props, setcompensation_benfits_groupb46e6Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44, setdynamicactions76c44}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44Props, setdynamicactions76c44Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[posiiton_information_texta2b56?.refresh])

  if (posiiton_information_texta2b56?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 7`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold"
  variant="subheader-3"
  color="primary"
>
      {keyset("Position Information")}
</Text>
  </div>
  )
}

export default Textposiiton_information_text
