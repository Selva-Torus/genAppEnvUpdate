'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textcheck_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_addbackgroundcheckmodify_v1Props, setdfd_addbackgroundcheckmodify_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {new_access_group03ace, setnew_access_group03ace}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group03aceProps, setnew_access_group03aceProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupdd45d, setaccess_req__groupdd45d}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupdd45dProps, setaccess_req__groupdd45dProps}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group0d865, setaddt__dts_group0d865}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group0d865Props, setaddt__dts_group0d865Props}= useContext(TotalContext) as TotalContextProps;
  const {check_idb8cbf, setcheck_idb8cbf}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2fc7f, setdynamicactions2fc7f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2fc7fProps, setdynamicactions2fc7fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_addbackgroundcheckmodify_v1Props && !dfd_addbackgroundcheckmodify_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_addbackgroundcheckmodify_v1Props.dstKey,
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
        setnew_access_group03ace((pre: any) => {
          return { ...pre, check_id: api_paginationData.data.records[0]?.check_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_addbackgroundcheckmodify_v1Props) && dfd_addbackgroundcheckmodify_v1Props && !new_access_group03ace.check_id){
        setnew_access_group03ace((pre:any)=>({...pre,check_id:dfd_addbackgroundcheckmodify_v1Props[0]?.check_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[check_idb8cbf?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_addbackgroundcheckmodify_v1Props) && !new_access_group03ace.check_id){
    setnew_access_group03ace((pre:any)=>({...pre,check_id:dfd_addbackgroundcheckmodify_v1Props[0]?.check_id}));
  }
  },[dfd_addbackgroundcheckmodify_v1Props])

  if (check_idb8cbf?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 4`,gridRow: `64 / 65`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.check_id : (new_access_group03ace?.check_id || ""))}
</Text>
  </div>
  )
}

export default Textcheck_id
