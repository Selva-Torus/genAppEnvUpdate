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

const Textagent_identity_ref = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_aiagentcontrol_v1Props, setdfd_aiagentcontrol_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {del_group9b94a, setdel_group9b94a}= useContext(TotalContext) as TotalContextProps;
  const {del_group9b94aProps, setdel_group9b94aProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt85a72, setdelete_heading_txt85a72}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1a0820, setdel_divider_1a0820}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text203a8, setasset_name_text203a8}= useContext(TotalContext) as TotalContextProps;
  const {asset_namee9a75, setasset_namee9a75}= useContext(TotalContext) as TotalContextProps;
  const {agent_identity_ref_texteb31d, setagent_identity_ref_texteb31d}= useContext(TotalContext) as TotalContextProps;
  const {agent_identity_ref64e77, setagent_identity_ref64e77}= useContext(TotalContext) as TotalContextProps;
  const {identity_provider_textc3f7e, setidentity_provider_textc3f7e}= useContext(TotalContext) as TotalContextProps;
  const {identity_providerd954f, setidentity_providerd954f}= useContext(TotalContext) as TotalContextProps;
  const {textf0a5f, settextf0a5f}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_2eac8b, setdel_divider_2eac8b}= useContext(TotalContext) as TotalContextProps;
  const {agent_control_idbe6d2, setagent_control_idbe6d2}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btnc83c5, setdel_cancel_btnc83c5}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn2a546, setdel_okl_btn2a546}= useContext(TotalContext) as TotalContextProps;
  const {agent_identity_ref64e77Props, setagent_identity_ref64e77Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_aiagentcontrol_v1Props && !dfd_aiagentcontrol_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_aiagentcontrol_v1Props.dstKey,
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
        setdel_group9b94a((pre: any) => ({
          ...pre,
          agent_identity_ref: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.agent_identity_ref
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setdel_group9b94a((pre: any) => ({
          ...pre,
          agent_identity_ref: agent_identity_ref64e77Props?.filteredData?.length > 0
            ? agent_identity_ref64e77Props?.filteredData[0]?.agent_identity_ref
            : "0"
        }))
      }else if(Array.isArray(dfd_aiagentcontrol_v1Props) && dfd_aiagentcontrol_v1Props && !del_group9b94a.agent_identity_ref){
        setdel_group9b94a((pre:any)=>({...pre,agent_identity_ref:dfd_aiagentcontrol_v1Props[0]?.agent_identity_ref}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[agent_identity_ref64e77?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_aiagentcontrol_v1Props) && !del_group9b94a.agent_identity_ref){
    setdel_group9b94a((pre:any)=>({...pre,agent_identity_ref:dfd_aiagentcontrol_v1Props[0]?.agent_identity_ref}));
  }
  },[dfd_aiagentcontrol_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!agent_identity_ref64e77Props?.filterProps) return;
    handleMapperValue(agent_identity_ref64e77Props?.filterProps,agent_identity_ref64e77Props?.filterFlag);
  },[agent_identity_ref64e77Props?.filterProps])

  if (agent_identity_ref64e77?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `8 / 24`,gridRow: `16 / 21`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !rounded-l !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.agent_identity_ref : (del_group9b94a?.agent_identity_ref || ""))}
</Text>
  </div>
  )
}

export default Textagent_identity_ref
