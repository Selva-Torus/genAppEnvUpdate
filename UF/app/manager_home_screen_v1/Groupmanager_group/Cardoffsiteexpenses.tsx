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

const Cardoffsiteexpenses = ({checkToAdd,setCheckToAdd,encryptionFlagCompData}:any) => {
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
  const {manager_group41477, setmanager_group41477}= useContext(TotalContext) as TotalContextProps  
  const {manager_group41477Props, setmanager_group41477Props}= useContext(TotalContext) as TotalContextProps  
  const {approvedcard75ed7, setapprovedcard75ed7}= useContext(TotalContext) as TotalContextProps  
  const {rejectedcard0ceee, setrejectedcard0ceee}= useContext(TotalContext) as TotalContextProps  
  const {pendingcard727e3, setpendingcard727e3}= useContext(TotalContext) as TotalContextProps  
  const {dailyexpensese7cda, setdailyexpensese7cda}= useContext(TotalContext) as TotalContextProps  
  const {offsiteexpenses62fe1, setoffsiteexpenses62fe1}= useContext(TotalContext) as TotalContextProps  
  const {daily_expa8b25, setdaily_expa8b25}= useContext(TotalContext) as TotalContextProps  
  const {offstie_exp400c9, setoffstie_exp400c9}= useContext(TotalContext) as TotalContextProps  
  const {daily_expense_table91568, setdaily_expense_table91568}= useContext(TotalContext) as TotalContextProps  
  const {daily_expense_table91568Props, setdaily_expense_table91568Props}= useContext(TotalContext) as TotalContextProps  
  const {offsite_expense_table1e924, setoffsite_expense_table1e924}= useContext(TotalContext) as TotalContextProps  
  const {offsite_expense_table1e924Props, setoffsite_expense_table1e924Props}= useContext(TotalContext) as TotalContextProps  
  ////////////// 
  
  const handleMapperDetails=async():Promise<void>=>{
  }

  const handleClick=async(value:any):Promise<void>=>{
   }


  useEffect(() => {
    if(Array.isArray(dfd_card_data_v1Props)){
      setmanager_group41477((pre:any)=>({...pre,offsiteexpenses:dfd_card_data_v1Props[0]?.offsiteexpenses}));
    }
  },[dfd_card_data_v1Props])

  const style = {    
    display: 'flex',
    //boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)', 
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  if (offsiteexpenses62fe1?.isHidden) {
    return <></>
  }  
  return (
    <div 
    style={{gridColumn: `21 / 25`,gridRow: `2 / 30`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Card 
        style={style}
        className=""
        theme="info"
        view="filled"
        icon="MdEmojiTransportation"
        label="Offsite Expenses"
        disabled= {offsiteexpenses62fe1?.isDisabled ? true : false}
        onClick={handleClick}  
        contentAlign={"center"}
        >
      {manager_group41477?.offsiteexpenses?manager_group41477?.offsiteexpenses:"0"}
      </Card>
      </div>
  )
}

export default Cardoffsiteexpenses
