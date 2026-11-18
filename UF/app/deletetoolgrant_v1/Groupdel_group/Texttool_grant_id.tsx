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

const Texttool_grant_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_toolgrant_v1Props, setdfd_toolgrant_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {del_groupbb7f0, setdel_groupbb7f0}= useContext(TotalContext) as TotalContextProps;
  const {del_groupbb7f0Props, setdel_groupbb7f0Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt26f8b, setdelete_heading_txt26f8b}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1c0da3, setdel_divider_1c0da3}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textfb333, setasset_name_textfb333}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_id281e4, settool_grant_id281e4}= useContext(TotalContext) as TotalContextProps;
  const {agent_name_text71756, setagent_name_text71756}= useContext(TotalContext) as TotalContextProps;
  const {asset_name5c40e, setasset_name5c40e}= useContext(TotalContext) as TotalContextProps;
  const {too_operation_texte0dbf, settoo_operation_texte0dbf}= useContext(TotalContext) as TotalContextProps;
  const {tool_operation03227, settool_operation03227}= useContext(TotalContext) as TotalContextProps;
  const {access_mode_text74d1f, setaccess_mode_text74d1f}= useContext(TotalContext) as TotalContextProps;
  const {access_mode763de, setaccess_mode763de}= useContext(TotalContext) as TotalContextProps;
  const {ststus_txt329f4, setststus_txt329f4}= useContext(TotalContext) as TotalContextProps;
  const {status659a7, setstatus659a7}= useContext(TotalContext) as TotalContextProps;
  const {textb6666, settextb6666}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_27f134, setdel_divider_27f134}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn3e3af, setdel_cancel_btn3e3af}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btnbeefc, setdel_okl_btnbeefc}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_id281e4Props, settool_grant_id281e4Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_toolgrant_v1Props && !dfd_toolgrant_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_toolgrant_v1Props.dstKey,
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
        setdel_groupbb7f0((pre: any) => ({
          ...pre,
          tool_grant_id: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.tool_grant_id
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setdel_groupbb7f0((pre: any) => ({
          ...pre,
          tool_grant_id: tool_grant_id281e4Props?.filteredData?.length > 0
            ? tool_grant_id281e4Props?.filteredData[0]?.tool_grant_id
            : "0"
        }))
      }else if(Array.isArray(dfd_toolgrant_v1Props) && dfd_toolgrant_v1Props && !del_groupbb7f0.tool_grant_id){
        setdel_groupbb7f0((pre:any)=>({...pre,tool_grant_id:dfd_toolgrant_v1Props[0]?.tool_grant_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[tool_grant_id281e4?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_toolgrant_v1Props) && !del_groupbb7f0.tool_grant_id){
    setdel_groupbb7f0((pre:any)=>({...pre,tool_grant_id:dfd_toolgrant_v1Props[0]?.tool_grant_id}));
  }
  },[dfd_toolgrant_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!tool_grant_id281e4Props?.filterProps) return;
    handleMapperValue(tool_grant_id281e4Props?.filterProps,tool_grant_id281e4Props?.filterFlag);
  },[tool_grant_id281e4Props?.filterProps])

  if (tool_grant_id281e4?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `8 / 24`,gridRow: `10 / 15`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !rounded-l !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.tool_grant_id : (del_groupbb7f0?.tool_grant_id || ""))}
</Text>
  </div>
  )
}

export default Texttool_grant_id
