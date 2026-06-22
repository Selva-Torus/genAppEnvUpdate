'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textuseful_life_years = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetcategory_v1Props, setdfd_assetcategory_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete3c2cd, setgroup_delete3c2cd}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3c2cdProps, setgroup_delete3c2cdProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textb1f29, setdelete_heading_textb1f29}= useContext(TotalContext) as TotalContextProps;
  const {category_code_text0975e, setcategory_code_text0975e}= useContext(TotalContext) as TotalContextProps;
  const {category_codef16a8, setcategory_codef16a8}= useContext(TotalContext) as TotalContextProps;
  const {category_name_text7648e, setcategory_name_text7648e}= useContext(TotalContext) as TotalContextProps;
  const {category_namecbc0b, setcategory_namecbc0b}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_method_text82fb3, setdepreciation_method_text82fb3}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_method0e872, setdepreciation_method0e872}= useContext(TotalContext) as TotalContextProps;
  const {useful_life_years_text30347, setuseful_life_years_text30347}= useContext(TotalContext) as TotalContextProps;
  const {useful_life_yearsa64db, setuseful_life_yearsa64db}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_required_textf1aaf, setmaintenance_required_textf1aaf}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_required336be, setmaintenance_required336be}= useContext(TotalContext) as TotalContextProps;
  const {confo_texte7cc3, setconfo_texte7cc3}= useContext(TotalContext) as TotalContextProps;
  const {acat_id9127b, setacat_id9127b}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonc0568, setcancel_buttonc0568}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonc8577, setok_buttonc8577}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_assetcategory_v1Props && !dfd_assetcategory_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_assetcategory_v1Props.dstKey,
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
        setgroup_delete3c2cd((pre: any) => {
          return { ...pre, useful_life_years: api_paginationData.data.records[0]?.useful_life_years }
        })
        }
      }
      else{
      if(Array.isArray(dfd_assetcategory_v1Props) && dfd_assetcategory_v1Props && !group_delete3c2cd.useful_life_years){
        setgroup_delete3c2cd((pre:any)=>({...pre,useful_life_years:dfd_assetcategory_v1Props[0]?.useful_life_years}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[useful_life_yearsa64db?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_assetcategory_v1Props) && !group_delete3c2cd.useful_life_years){
    setgroup_delete3c2cd((pre:any)=>({...pre,useful_life_years:dfd_assetcategory_v1Props[0]?.useful_life_years}));
  }
  },[dfd_assetcategory_v1Props])

  if (useful_life_yearsa64db?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `9 / 24`,gridRow: `25 / 30`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.useful_life_years : (group_delete3c2cd?.useful_life_years || ""))}
</Text>
  </div>
  )
}

export default Textuseful_life_years
