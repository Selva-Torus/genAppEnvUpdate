'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textdisposal_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetdisposal_v1Props, setdfd_assetdisposal_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {initiate_asset_disposal_group0196a, setinitiate_asset_disposal_group0196a}= useContext(TotalContext) as TotalContextProps;
  const {initiate_asset_disposal_group0196aProps, setinitiate_asset_disposal_group0196aProps}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaa369, setdisposal_details_groupaa369}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaa369Props, setdisposal_details_groupaa369Props}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_groupe5dd8, setcompliance_financial_groupe5dd8}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_groupe5dd8Props, setcompliance_financial_groupe5dd8Props}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financialc9043, setcompliance_financialc9043}= useContext(TotalContext) as TotalContextProps;
  const {approval_referenceb0a46, setapproval_referenceb0a46}= useContext(TotalContext) as TotalContextProps;
  const {witness_name6fddf, setwitness_name6fddf}= useContext(TotalContext) as TotalContextProps;
  const {data_wipe_method8923d, setdata_wipe_method8923d}= useContext(TotalContext) as TotalContextProps;
  const {data_wipeda4257, setdata_wipeda4257}= useContext(TotalContext) as TotalContextProps;
  const {disposal_value13578, setdisposal_value13578}= useContext(TotalContext) as TotalContextProps;
  const {disposal_cost23f44, setdisposal_cost23f44}= useContext(TotalContext) as TotalContextProps;
  const {resale_amount5336f, setresale_amount5336f}= useContext(TotalContext) as TotalContextProps;
  const {disposal_idee44c, setdisposal_idee44c}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_assetdisposal_v1Props && !dfd_assetdisposal_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_assetdisposal_v1Props.dstKey,
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
        setcompliance_financial_groupe5dd8((pre: any) => {
          return { ...pre, disposal_id: api_paginationData.data.records[0]?.disposal_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_assetdisposal_v1Props) && dfd_assetdisposal_v1Props && !compliance_financial_groupe5dd8.disposal_id){
        setcompliance_financial_groupe5dd8((pre:any)=>({...pre,disposal_id:dfd_assetdisposal_v1Props[0]?.disposal_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[disposal_idee44c?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_assetdisposal_v1Props) && !compliance_financial_groupe5dd8.disposal_id){
    setcompliance_financial_groupe5dd8((pre:any)=>({...pre,disposal_id:dfd_assetdisposal_v1Props[0]?.disposal_id}));
  }
  },[dfd_assetdisposal_v1Props])

  if (disposal_idee44c?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `21 / 23`,gridRow: `32 / 33`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.disposal_id : (compliance_financial_groupe5dd8?.disposal_id || ""))}
</Text>
  </div>
  )
}

export default Textdisposal_id
