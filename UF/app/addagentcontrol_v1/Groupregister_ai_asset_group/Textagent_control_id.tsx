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

const Textagent_control_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_ai_asset_registryfa224, setoverall_ai_asset_registryfa224}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryfa224Props, setoverall_ai_asset_registryfa224Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group9d43f, setregister_ai_asset_group9d43f}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group9d43fProps, setregister_ai_asset_group9d43fProps}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group5b641, setmodel_info_group5b641}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group5b641Props, setmodel_info_group5b641Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupb1b6f, setgrounding_groupb1b6f}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupb1b6fProps, setgrounding_groupb1b6fProps}= useContext(TotalContext) as TotalContextProps;
  const {validation_group4d206, setvalidation_group4d206}= useContext(TotalContext) as TotalContextProps;
  const {validation_group4d206Props, setvalidation_group4d206Props}= useContext(TotalContext) as TotalContextProps;
  const {agent_control_id67ff7, setagent_control_id67ff7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions78fa5, setdynamicactions78fa5}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions78fa5Props, setdynamicactions78fa5Props}= useContext(TotalContext) as TotalContextProps;
  const {agent_control_id67ff7Props, setagent_control_id67ff7Props} = useContext(TotalContext) as TotalContextProps;
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
        setregister_ai_asset_group9d43f((pre: any) => ({
          ...pre,
          agent_control_id: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.agent_control_id
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setregister_ai_asset_group9d43f((pre: any) => ({
          ...pre,
          agent_control_id: agent_control_id67ff7Props?.filteredData?.length > 0
            ? agent_control_id67ff7Props?.filteredData[0]?.agent_control_id
            : "0"
        }))
      }else if(Array.isArray(dfd_aiagentcontrol_v1Props) && dfd_aiagentcontrol_v1Props && !register_ai_asset_group9d43f.agent_control_id){
        setregister_ai_asset_group9d43f((pre:any)=>({...pre,agent_control_id:dfd_aiagentcontrol_v1Props[0]?.agent_control_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[agent_control_id67ff7?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_aiagentcontrol_v1Props) && !register_ai_asset_group9d43f.agent_control_id){
    setregister_ai_asset_group9d43f((pre:any)=>({...pre,agent_control_id:dfd_aiagentcontrol_v1Props[0]?.agent_control_id}));
  }
  },[dfd_aiagentcontrol_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!agent_control_id67ff7Props?.filterProps) return;
    handleMapperValue(agent_control_id67ff7Props?.filterProps,agent_control_id67ff7Props?.filterFlag);
  },[agent_control_id67ff7Props?.filterProps])

  if (agent_control_id67ff7?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 3`,gridRow: `96 / 97`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.agent_control_id : (register_ai_asset_group9d43f?.agent_control_id || ""))}
</Text>
  </div>
  )
}

export default Textagent_control_id
