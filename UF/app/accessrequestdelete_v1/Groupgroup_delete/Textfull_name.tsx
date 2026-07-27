'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textfull_name = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_addaccessrequestmodify_v1Props, setdfd_addaccessrequestmodify_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete39e95, setgroup_delete39e95}= useContext(TotalContext) as TotalContextProps;
  const {group_delete39e95Props, setgroup_delete39e95Props}= useContext(TotalContext) as TotalContextProps;
  const {divider_s2f4d7, setdivider_s2f4d7}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text9fa17, setdelete_heading_text9fa17}= useContext(TotalContext) as TotalContextProps;
  const {request_number_textfe1e3, setrequest_number_textfe1e3}= useContext(TotalContext) as TotalContextProps;
  const {request_numbera8283, setrequest_numbera8283}= useContext(TotalContext) as TotalContextProps;
  const {full_name_text42c95, setfull_name_text42c95}= useContext(TotalContext) as TotalContextProps;
  const {full_name3103b, setfull_name3103b}= useContext(TotalContext) as TotalContextProps;
  const {system_name_text214d0, setsystem_name_text214d0}= useContext(TotalContext) as TotalContextProps;
  const {system_named477d, setsystem_named477d}= useContext(TotalContext) as TotalContextProps;
  const {access_role_text651e8, setaccess_role_text651e8}= useContext(TotalContext) as TotalContextProps;
  const {access_rolef3310, setaccess_rolef3310}= useContext(TotalContext) as TotalContextProps;
  const {confo_text6b398, setconfo_text6b398}= useContext(TotalContext) as TotalContextProps;
  const {divider2d5c2, setdivider2d5c2}= useContext(TotalContext) as TotalContextProps;
  const {access_req_id2b2a7, setaccess_req_id2b2a7}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button00993, setcancel_button00993}= useContext(TotalContext) as TotalContextProps;
  const {ok_button3840c, setok_button3840c}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_addaccessrequestmodify_v1Props && !dfd_addaccessrequestmodify_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_addaccessrequestmodify_v1Props.dstKey,
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
        setgroup_delete39e95((pre: any) => {
          return { ...pre, employee_name: api_paginationData.data.records[0]?.employee_name }
        })
        }
      }
      else{
      if(Array.isArray(dfd_addaccessrequestmodify_v1Props) && dfd_addaccessrequestmodify_v1Props && !group_delete39e95.employee_name){
        setgroup_delete39e95((pre:any)=>({...pre,employee_name:dfd_addaccessrequestmodify_v1Props[0]?.employee_name}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[full_name3103b?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_addaccessrequestmodify_v1Props) && !group_delete39e95.employee_name){
    setgroup_delete39e95((pre:any)=>({...pre,employee_name:dfd_addaccessrequestmodify_v1Props[0]?.employee_name}));
  }
  },[dfd_addaccessrequestmodify_v1Props])

  if (full_name3103b?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `8 / 24`,gridRow: `17 / 22`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !rounded-l !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.employee_name : (group_delete39e95?.employee_name || ""))}
</Text>
  </div>
  )
}

export default Textfull_name
