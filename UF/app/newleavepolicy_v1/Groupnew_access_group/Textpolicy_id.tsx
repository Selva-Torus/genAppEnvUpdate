'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textpolicy_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_addleavepolicymodify_v1Props, setdfd_addleavepolicymodify_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {new_access_group86c35, setnew_access_group86c35}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group86c35Props, setnew_access_group86c35Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupae6e3, setaccess_req__groupae6e3}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupae6e3Props, setaccess_req__groupae6e3Props}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group2196e, setapp_inf_group2196e}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group2196eProps, setapp_inf_group2196eProps}= useContext(TotalContext) as TotalContextProps;
  const {approve_group0167c, setapprove_group0167c}= useContext(TotalContext) as TotalContextProps;
  const {approve_group0167cProps, setapprove_group0167cProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_group5c57c, setvalid_group5c57c}= useContext(TotalContext) as TotalContextProps;
  const {valid_group5c57cProps, setvalid_group5c57cProps}= useContext(TotalContext) as TotalContextProps;
  const {business_just__groupd6ebd, setbusiness_just__groupd6ebd}= useContext(TotalContext) as TotalContextProps;
  const {business_just__groupd6ebdProps, setbusiness_just__groupd6ebdProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupc3fca, setprovision_groupc3fca}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupc3fcaProps, setprovision_groupc3fcaProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_groupf75c0, setleave_rule_groupf75c0}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_groupf75c0Props, setleave_rule_groupf75c0Props}= useContext(TotalContext) as TotalContextProps;
  const {policy_id895de, setpolicy_id895de}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd8c40, setdynamicactionsd8c40}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd8c40Props, setdynamicactionsd8c40Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_addleavepolicymodify_v1Props && !dfd_addleavepolicymodify_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_addleavepolicymodify_v1Props.dstKey,
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
        setnew_access_group86c35((pre: any) => {
          return { ...pre, policy_id: api_paginationData.data.records[0]?.policy_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_addleavepolicymodify_v1Props) && dfd_addleavepolicymodify_v1Props && !new_access_group86c35.policy_id){
        setnew_access_group86c35((pre:any)=>({...pre,policy_id:dfd_addleavepolicymodify_v1Props[0]?.policy_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[policy_id895de?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_addleavepolicymodify_v1Props) && !new_access_group86c35.policy_id){
    setnew_access_group86c35((pre:any)=>({...pre,policy_id:dfd_addleavepolicymodify_v1Props[0]?.policy_id}));
  }
  },[dfd_addleavepolicymodify_v1Props])

  if (policy_id895de?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 5`,gridRow: `136 / 137`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.policy_id : (new_access_group86c35?.policy_id || ""))}
</Text>
  </div>
  )
}

export default Textpolicy_id
