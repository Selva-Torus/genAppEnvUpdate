'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Texttrs_created_by = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_backgroundcheckdoctable_v1Props, setdfd_backgroundcheckdoctable_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete04302, setgroup_delete04302}= useContext(TotalContext) as TotalContextProps;
  const {group_delete04302Props, setgroup_delete04302Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text813d1, setdelete_heading_text813d1}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txta2aee, setattachment_id_txta2aee}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id23a23, setattachment_id23a23}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_text1a134, setdoc_group_text1a134}= useContext(TotalContext) as TotalContextProps;
  const {doc_group89f93, setdoc_group89f93}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_texted263, setdoc_name_texted263}= useContext(TotalContext) as TotalContextProps;
  const {doc_name36a98, setdoc_name36a98}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_textb6c3e, settrs_created_by_textb6c3e}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by1d9cc, settrs_created_by1d9cc}= useContext(TotalContext) as TotalContextProps;
  const {confo_text86039, setconfo_text86039}= useContext(TotalContext) as TotalContextProps;
  const {check_ide9e25, setcheck_ide9e25}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button3bd3f, setcancel_button3bd3f}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonba1e7, setok_buttonba1e7}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_backgroundcheckdoctable_v1Props && !dfd_backgroundcheckdoctable_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_backgroundcheckdoctable_v1Props.dstKey,
            page: 1,
            count: 1
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if(api_paginationData.data.records?.length){
        setgroup_delete04302((pre: any) => {
          return { ...pre, trs_created_by: api_paginationData.data.records[0]?.trs_created_by }
        })
        }
      }
      else{
      if(Array.isArray(dfd_backgroundcheckdoctable_v1Props) && dfd_backgroundcheckdoctable_v1Props && !group_delete04302.trs_created_by){
        setgroup_delete04302((pre:any)=>({...pre,trs_created_by:dfd_backgroundcheckdoctable_v1Props[0]?.trs_created_by}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[trs_created_by1d9cc?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_backgroundcheckdoctable_v1Props) && !group_delete04302.trs_created_by){
    setgroup_delete04302((pre:any)=>({...pre,trs_created_by:dfd_backgroundcheckdoctable_v1Props[0]?.trs_created_by}));
  }
  },[dfd_backgroundcheckdoctable_v1Props])

  if (trs_created_by1d9cc?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `8 / 24`,gridRow: `25 / 30`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.trs_created_by : (group_delete04302?.trs_created_by || ""))}
</Text>
  </div>
  )
}

export default Texttrs_created_by
