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

const Textis_active = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_codetype_v1Props, setdfd_codetype_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete9bbe1, setgroup_delete9bbe1}= useContext(TotalContext) as TotalContextProps;
  const {group_delete9bbe1Props, setgroup_delete9bbe1Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text7380b, setdelete_heading_text7380b}= useContext(TotalContext) as TotalContextProps;
  const {divider_s1a15b, setdivider_s1a15b}= useContext(TotalContext) as TotalContextProps;
  const {del_code_type_idea039, setdel_code_type_idea039}= useContext(TotalContext) as TotalContextProps;
  const {code_type_id8fe6f, setcode_type_id8fe6f}= useContext(TotalContext) as TotalContextProps;
  const {del_code_type3ce03, setdel_code_type3ce03}= useContext(TotalContext) as TotalContextProps;
  const {code_typedf5a3, setcode_typedf5a3}= useContext(TotalContext) as TotalContextProps;
  const {description_typef91cb, setdescription_typef91cb}= useContext(TotalContext) as TotalContextProps;
  const {description32634, setdescription32634}= useContext(TotalContext) as TotalContextProps;
  const {system_code_type9d603, setsystem_code_type9d603}= useContext(TotalContext) as TotalContextProps;
  const {is_systemc0200, setis_systemc0200}= useContext(TotalContext) as TotalContextProps;
  const {is_active6bc58, setis_active6bc58}= useContext(TotalContext) as TotalContextProps;
  const {active_type0da2f, setactive_type0da2f}= useContext(TotalContext) as TotalContextProps;
  const {confo_textcb476, setconfo_textcb476}= useContext(TotalContext) as TotalContextProps;
  const {dividerca7df, setdividerca7df}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttona9054, setcancel_buttona9054}= useContext(TotalContext) as TotalContextProps;
  const {ok_button8e870, setok_button8e870}= useContext(TotalContext) as TotalContextProps;
  const {is_active6bc58Props, setis_active6bc58Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_codetype_v1Props && !dfd_codetype_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_codetype_v1Props.dstKey,
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
        setgroup_delete9bbe1((pre: any) => ({
          ...pre,
          is_active: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.is_active
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setgroup_delete9bbe1((pre: any) => ({
          ...pre,
          is_active: is_active6bc58Props?.filteredData?.length > 0
            ? is_active6bc58Props?.filteredData[0]?.is_active
            : "0"
        }))
      }else if(Array.isArray(dfd_codetype_v1Props) && dfd_codetype_v1Props && !group_delete9bbe1.is_active){
        setgroup_delete9bbe1((pre:any)=>({...pre,is_active:dfd_codetype_v1Props[0]?.is_active}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[is_active6bc58?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_codetype_v1Props) && !group_delete9bbe1.is_active){
    setgroup_delete9bbe1((pre:any)=>({...pre,is_active:dfd_codetype_v1Props[0]?.is_active}));
  }
  },[dfd_codetype_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!is_active6bc58Props?.filterProps) return;
    handleMapperValue(is_active6bc58Props?.filterProps,is_active6bc58Props?.filterFlag);
  },[is_active6bc58Props?.filterProps])

  if (is_active6bc58?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `8 / 24`,gridRow: `39 / 44`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !rounded-l !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.is_active : (group_delete9bbe1?.is_active || ""))}
</Text>
  </div>
  )
}

export default Textis_active
