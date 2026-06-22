'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textassign_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {assign_asset_groupb4f2d, setassign_asset_groupb4f2d}= useContext(TotalContext) as TotalContextProps;
  const {assign_asset_groupb4f2dProps, setassign_asset_groupb4f2dProps}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_groupc96e9, setassignment_information_groupc96e9}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_groupc96e9Props, setassignment_information_groupc96e9Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group136e4, setassignment_details_group136e4}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group136e4Props, setassignment_details_group136e4Props}= useContext(TotalContext) as TotalContextProps;
  const {assign_idb53db, setassign_idb53db}= useContext(TotalContext) as TotalContextProps;
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
        setassign_asset_groupb4f2d((pre: any) => {
          return { ...pre, assign_id: api_paginationData.data.records[0]?.assign_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_assetassignments_v1Props) && dfd_assetassignments_v1Props && !assign_asset_groupb4f2d.assign_id){
        setassign_asset_groupb4f2d((pre:any)=>({...pre,assign_id:dfd_assetassignments_v1Props[0]?.assign_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[assign_idb53db?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_assetassignments_v1Props) && !assign_asset_groupb4f2d.assign_id){
    setassign_asset_groupb4f2d((pre:any)=>({...pre,assign_id:dfd_assetassignments_v1Props[0]?.assign_id}));
  }
  },[dfd_assetassignments_v1Props])

  if (assign_idb53db?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 2`,gridRow: `100 / 101`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.assign_id : (assign_asset_groupb4f2d?.assign_id || ""))}
</Text>
  </div>
  )
}

export default Textassign_id
