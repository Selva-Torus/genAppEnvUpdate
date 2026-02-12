'use client'
import React, { useState, useContext, useEffect, useRef } from 'react'; 
import { Text } from '@/components/Text';
import { Card } from '@/components/Card';
import { Modal } from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { getCookie } from '@/app/components/cookieMgment';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { te_refreshDto } from '@/app/interfaces/interfaces';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";

const Cardrejectedcard = ({checkToAdd,setCheckToAdd,encryptionFlagCompData}:any) => {
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const {dfd_card_data_v1Props, setdfd_card_data_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;  
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const toast : Function = useInfoMsg();
  const routes : AppRouterInstance = useRouter();
  const prevRefreshRef = useRef<any>(false);
 
  /////////////
   //another screen
  const {user_grpd6690, setuser_grpd6690}= useContext(TotalContext) as TotalContextProps  
  const {user_grpd6690Props, setuser_grpd6690Props}= useContext(TotalContext) as TotalContextProps  
  const {approvedcardc5971, setapprovedcardc5971}= useContext(TotalContext) as TotalContextProps  
  const {rejectedcardefafa, setrejectedcardefafa}= useContext(TotalContext) as TotalContextProps  
  const {pendingcardee3c0, setpendingcardee3c0}= useContext(TotalContext) as TotalContextProps  
  const {dailyexpenses798bd, setdailyexpenses798bd}= useContext(TotalContext) as TotalContextProps  
  const {offsiteexpensescd925, setoffsiteexpensescd925}= useContext(TotalContext) as TotalContextProps  
  const {addd126f, setaddd126f}= useContext(TotalContext) as TotalContextProps  
  const {offsite_add1ab15, setoffsite_add1ab15}= useContext(TotalContext) as TotalContextProps  
  const {daily_expa1e3b, setdaily_expa1e3b}= useContext(TotalContext) as TotalContextProps  
  const {offsite_exp949f2, setoffsite_exp949f2}= useContext(TotalContext) as TotalContextProps  
  const {daily_expense_table13758, setdaily_expense_table13758}= useContext(TotalContext) as TotalContextProps  
  const {daily_expense_table13758Props, setdaily_expense_table13758Props}= useContext(TotalContext) as TotalContextProps  
  const {offsite_expense_table4ffd6, setoffsite_expense_table4ffd6}= useContext(TotalContext) as TotalContextProps  
  const {offsite_expense_table4ffd6Props, setoffsite_expense_table4ffd6Props}= useContext(TotalContext) as TotalContextProps  
  ////////////// 
  
  const handleMapperDetails=async():Promise<void>=>{
  }

  const handleClick=async(value:any):Promise<void>=>{
   }


  useEffect(() => {
    if(Array.isArray(dfd_card_data_v1Props)){
      setuser_grpd6690((pre:any)=>({...pre,rejectedcard:dfd_card_data_v1Props[0]?.rejectedcard}));
    }
  },[dfd_card_data_v1Props])

  const style = {    
    display: 'flex',
    //boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)', 
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  if (rejectedcardefafa?.isHidden) {
    return <></>
  }  
  return (
    <div 
    style={{gridColumn: `6 / 10`,gridRow: `1 / 33`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Card 
        style={style}
        className=""
        theme="info"
        view="filled"
        icon="MdCancel"
        label="Rejected"
        disabled= {rejectedcardefafa?.isDisabled ? true : false}
        onClick={handleClick}  
        contentAlign={"center"}
        >
      {user_grpd6690?.rejectedcard?user_grpd6690?.rejectedcard:"0"}
      </Card>
      </div>
  )
}

export default Cardrejectedcard
