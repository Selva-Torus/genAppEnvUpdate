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

const Textasset_name = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_dataclasslist_v1Props, setdfd_dataclasslist_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {del_group7e857, setdel_group7e857}= useContext(TotalContext) as TotalContextProps;
  const {del_group7e857Props, setdel_group7e857Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt4a602, setdelete_heading_txt4a602}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_17957b, setdel_divider_17957b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text7377f, setasset_name_text7377f}= useContext(TotalContext) as TotalContextProps;
  const {asset_nameae58e, setasset_nameae58e}= useContext(TotalContext) as TotalContextProps;
  const {data_class_code_text87efb, setdata_class_code_text87efb}= useContext(TotalContext) as TotalContextProps;
  const {data_class_codee6763, setdata_class_codee6763}= useContext(TotalContext) as TotalContextProps;
  const {text3364f, settext3364f}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_2725fd, setdel_divider_2725fd}= useContext(TotalContext) as TotalContextProps;
  const {asset_data_class_id9ae60, setasset_data_class_id9ae60}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btnd5bbd, setdel_cancel_btnd5bbd}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn25863, setdel_okl_btn25863}= useContext(TotalContext) as TotalContextProps;
  const {asset_nameae58eProps, setasset_nameae58eProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_dataclasslist_v1Props && !dfd_dataclasslist_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_dataclasslist_v1Props.dstKey,
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
        setdel_group7e857((pre: any) => ({
          ...pre,
          asset_name: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.asset_name
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setdel_group7e857((pre: any) => ({
          ...pre,
          asset_name: asset_nameae58eProps?.filteredData?.length > 0
            ? asset_nameae58eProps?.filteredData[0]?.asset_name
            : "0"
        }))
      }else if(Array.isArray(dfd_dataclasslist_v1Props) && dfd_dataclasslist_v1Props && !del_group7e857.asset_name){
        setdel_group7e857((pre:any)=>({...pre,asset_name:dfd_dataclasslist_v1Props[0]?.asset_name}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[asset_nameae58e?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_dataclasslist_v1Props) && !del_group7e857.asset_name){
    setdel_group7e857((pre:any)=>({...pre,asset_name:dfd_dataclasslist_v1Props[0]?.asset_name}));
  }
  },[dfd_dataclasslist_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!asset_nameae58eProps?.filterProps) return;
    handleMapperValue(asset_nameae58eProps?.filterProps,asset_nameae58eProps?.filterFlag);
  },[asset_nameae58eProps?.filterProps])

  if (asset_nameae58e?.isHidden) {
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
      {keyset(isDynamic ? item?.asset_name : (del_group7e857?.asset_name || ""))}
</Text>
  </div>
  )
}

export default Textasset_name
