'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textdoc_group = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employeedoctable_v1Props, setdfd_employeedoctable_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete6f37f, setgroup_delete6f37f}= useContext(TotalContext) as TotalContextProps;
  const {group_delete6f37fProps, setgroup_delete6f37fProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textb9cbd, setdelete_heading_textb9cbd}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txte9114, setattachment_id_txte9114}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id662fa, setattachment_id662fa}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_textb1ad5, setdoc_group_textb1ad5}= useContext(TotalContext) as TotalContextProps;
  const {doc_groupef536, setdoc_groupef536}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_textabec1, setdoc_name_textabec1}= useContext(TotalContext) as TotalContextProps;
  const {doc_name5ec80, setdoc_name5ec80}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_text5e093, settrs_created_by_text5e093}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by4392c, settrs_created_by4392c}= useContext(TotalContext) as TotalContextProps;
  const {confo_text764b5, setconfo_text764b5}= useContext(TotalContext) as TotalContextProps;
  const {employee_id5281a, setemployee_id5281a}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button3d359, setcancel_button3d359}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonc9ba6, setok_buttonc9ba6}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_employeedoctable_v1Props && !dfd_employeedoctable_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_employeedoctable_v1Props.dstKey,
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
        setgroup_delete6f37f((pre: any) => {
          return { ...pre, doc_group: api_paginationData.data.records[0]?.doc_group }
        })
        }
      }
      else{
      if(Array.isArray(dfd_employeedoctable_v1Props) && dfd_employeedoctable_v1Props && !group_delete6f37f.doc_group){
        setgroup_delete6f37f((pre:any)=>({...pre,doc_group:dfd_employeedoctable_v1Props[0]?.doc_group}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[doc_groupef536?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_employeedoctable_v1Props) && !group_delete6f37f.doc_group){
    setgroup_delete6f37f((pre:any)=>({...pre,doc_group:dfd_employeedoctable_v1Props[0]?.doc_group}));
  }
  },[dfd_employeedoctable_v1Props])

  if (doc_groupef536?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `8 / 24`,gridRow: `13 / 18`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.doc_group : (group_delete6f37f?.doc_group || ""))}
</Text>
  </div>
  )
}

export default Textdoc_group
