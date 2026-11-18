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

const Textcondition_txt = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_certificationcondition_v1Props, setdfd_certificationcondition_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group33388, setgroup33388}= useContext(TotalContext) as TotalContextProps;
  const {group33388Props, setgroup33388Props}= useContext(TotalContext) as TotalContextProps;
  const {del_heading_textaea5a, setdel_heading_textaea5a}= useContext(TotalContext) as TotalContextProps;
  const {divider_1e1b27, setdivider_1e1b27}= useContext(TotalContext) as TotalContextProps;
  const {stage_name_txt46880, setstage_name_txt46880}= useContext(TotalContext) as TotalContextProps;
  const {stage_name53e8f, setstage_name53e8f}= useContext(TotalContext) as TotalContextProps;
  const {del_condition_txt5e2fe, setdel_condition_txt5e2fe}= useContext(TotalContext) as TotalContextProps;
  const {condition_txt9eed1, setcondition_txt9eed1}= useContext(TotalContext) as TotalContextProps;
  const {del_status_code_txt7812f, setdel_status_code_txt7812f}= useContext(TotalContext) as TotalContextProps;
  const {status_code3655c, setstatus_code3655c}= useContext(TotalContext) as TotalContextProps;
  const {del_due_date4d800, setdel_due_date4d800}= useContext(TotalContext) as TotalContextProps;
  const {due_dated27ee, setdue_dated27ee}= useContext(TotalContext) as TotalContextProps;
  const {textd0517, settextd0517}= useContext(TotalContext) as TotalContextProps;
  const {divider_2d32a6, setdivider_2d32a6}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btnf4b06, setcancel_btnf4b06}= useContext(TotalContext) as TotalContextProps;
  const {del_btn5ea29, setdel_btn5ea29}= useContext(TotalContext) as TotalContextProps;
  const {cert_condition_idb65fc, setcert_condition_idb65fc}= useContext(TotalContext) as TotalContextProps;
  const {cert_stage_idd8967, setcert_stage_idd8967}= useContext(TotalContext) as TotalContextProps;
  const {condition_txt9eed1Props, setcondition_txt9eed1Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_certificationcondition_v1Props && !dfd_certificationcondition_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_certificationcondition_v1Props.dstKey,
            page: 1,
            count: 1,
            filterData: searchFilter
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        setgroup33388((pre: any) => ({
          ...pre,
          condition_text: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.condition_text
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setgroup33388((pre: any) => ({
          ...pre,
          condition_text: condition_txt9eed1Props?.filteredData?.length > 0
            ? condition_txt9eed1Props?.filteredData[0]?.condition_text
            : "0"
        }))
      }else if(Array.isArray(dfd_certificationcondition_v1Props) && dfd_certificationcondition_v1Props && !group33388.condition_text){
        setgroup33388((pre:any)=>({...pre,condition_text:dfd_certificationcondition_v1Props[0]?.condition_text}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[condition_txt9eed1?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_certificationcondition_v1Props) && !group33388.condition_text){
    setgroup33388((pre:any)=>({...pre,condition_text:dfd_certificationcondition_v1Props[0]?.condition_text}));
  }
  },[dfd_certificationcondition_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!condition_txt9eed1Props?.filterProps) return;
    handleMapperValue(condition_txt9eed1Props?.filterProps,condition_txt9eed1Props?.filterFlag);
  },[condition_txt9eed1Props?.filterProps])

  if (condition_txt9eed1?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `7 / 23`,gridRow: `21 / 26`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !rounded-l !border !border-[#c4c4c4] !text-black"
  variant="subheader-2"
  color="primary"
>
      {keyset(isDynamic ? item?.condition_text : (group33388?.condition_text || ""))}
</Text>
  </div>
  )
}

export default Textcondition_txt
