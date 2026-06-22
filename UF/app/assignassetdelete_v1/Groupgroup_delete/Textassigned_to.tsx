'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textassigned_to = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetassignments_v1Props, setdfd_assetassignments_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete0df4b, setgroup_delete0df4b}= useContext(TotalContext) as TotalContextProps;
  const {group_delete0df4bProps, setgroup_delete0df4bProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textc848b, setdelete_heading_textc848b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text16bc2, setasset_name_text16bc2}= useContext(TotalContext) as TotalContextProps;
  const {asset_named51ee, setasset_named51ee}= useContext(TotalContext) as TotalContextProps;
  const {assigned_to_text5d18d, setassigned_to_text5d18d}= useContext(TotalContext) as TotalContextProps;
  const {assigned_to51299, setassigned_to51299}= useContext(TotalContext) as TotalContextProps;
  const {assigned_at_text4a3af, setassigned_at_text4a3af}= useContext(TotalContext) as TotalContextProps;
  const {assigned_bycb5ab, setassigned_bycb5ab}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_assign_text4ad2d, setcondition_at_assign_text4ad2d}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_assignc35c4, setcondition_at_assignc35c4}= useContext(TotalContext) as TotalContextProps;
  const {expected_return_date_text80abb, setexpected_return_date_text80abb}= useContext(TotalContext) as TotalContextProps;
  const {expected_return_date11169, setexpected_return_date11169}= useContext(TotalContext) as TotalContextProps;
  const {confo_text66873, setconfo_text66873}= useContext(TotalContext) as TotalContextProps;
  const {assign_idf7b2f, setassign_idf7b2f}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button0c073, setcancel_button0c073}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonfa294, setok_buttonfa294}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_assetassignments_v1Props && !dfd_assetassignments_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_assetassignments_v1Props.dstKey,
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
        setgroup_delete0df4b((pre: any) => {
          return { ...pre, assigned_to: api_paginationData.data.records[0]?.assigned_to }
        })
        }
      }
      else{
      if(Array.isArray(dfd_assetassignments_v1Props) && dfd_assetassignments_v1Props && !group_delete0df4b.assigned_to){
        setgroup_delete0df4b((pre:any)=>({...pre,assigned_to:dfd_assetassignments_v1Props[0]?.assigned_to}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[assigned_to51299?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_assetassignments_v1Props) && !group_delete0df4b.assigned_to){
    setgroup_delete0df4b((pre:any)=>({...pre,assigned_to:dfd_assetassignments_v1Props[0]?.assigned_to}));
  }
  },[dfd_assetassignments_v1Props])

  if (assigned_to51299?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `9 / 24`,gridRow: `13 / 18`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.assigned_to : (group_delete0df4b?.assigned_to || ""))}
</Text>
  </div>
  )
}

export default Textassigned_to
