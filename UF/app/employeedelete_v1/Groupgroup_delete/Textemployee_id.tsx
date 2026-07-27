'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textemployee_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employees_v1Props, setdfd_employees_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete68104, setgroup_delete68104}= useContext(TotalContext) as TotalContextProps;
  const {group_delete68104Props, setgroup_delete68104Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textf472f, setdelete_heading_textf472f}= useContext(TotalContext) as TotalContextProps;
  const {divider_se84d1, setdivider_se84d1}= useContext(TotalContext) as TotalContextProps;
  const {employee_code_textd7eed, setemployee_code_textd7eed}= useContext(TotalContext) as TotalContextProps;
  const {employee_code89740, setemployee_code89740}= useContext(TotalContext) as TotalContextProps;
  const {full_name_text4a492, setfull_name_text4a492}= useContext(TotalContext) as TotalContextProps;
  const {full_name89c4f, setfull_name89c4f}= useContext(TotalContext) as TotalContextProps;
  const {work_email_text10688, setwork_email_text10688}= useContext(TotalContext) as TotalContextProps;
  const {work_email16f90, setwork_email16f90}= useContext(TotalContext) as TotalContextProps;
  const {employment_type_textc33f9, setemployment_type_textc33f9}= useContext(TotalContext) as TotalContextProps;
  const {employment_type48765, setemployment_type48765}= useContext(TotalContext) as TotalContextProps;
  const {employee_status_textef64f, setemployee_status_textef64f}= useContext(TotalContext) as TotalContextProps;
  const {employee_status8c982, setemployee_status8c982}= useContext(TotalContext) as TotalContextProps;
  const {confo_text730b1, setconfo_text730b1}= useContext(TotalContext) as TotalContextProps;
  const {divider0b449, setdivider0b449}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonccddf, setcancel_buttonccddf}= useContext(TotalContext) as TotalContextProps;
  const {ok_button3d34b, setok_button3d34b}= useContext(TotalContext) as TotalContextProps;
  const {employee_id7e621, setemployee_id7e621}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_employees_v1Props && !dfd_employees_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_employees_v1Props.dstKey,
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
        setgroup_delete68104((pre: any) => {
          return { ...pre, employee_id: api_paginationData.data.records[0]?.employee_id }
        })
        }
      }
      else{
      if(Array.isArray(dfd_employees_v1Props) && dfd_employees_v1Props && !group_delete68104.employee_id){
        setgroup_delete68104((pre:any)=>({...pre,employee_id:dfd_employees_v1Props[0]?.employee_id}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[employee_id7e621?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_employees_v1Props) && !group_delete68104.employee_id){
    setgroup_delete68104((pre:any)=>({...pre,employee_id:dfd_employees_v1Props[0]?.employee_id}));
  }
  },[dfd_employees_v1Props])

  if (employee_id7e621?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 3`,gridRow: `51 / 52`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.employee_id : (group_delete68104?.employee_id || ""))}
</Text>
  </div>
  )
}

export default Textemployee_id
