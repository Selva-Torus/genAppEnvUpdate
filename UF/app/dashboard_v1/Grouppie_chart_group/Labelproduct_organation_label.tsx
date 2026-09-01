'use client'




import React, {useState, useContext,useEffect,useRef } from 'react';
import { AxiosService } from "@/app/components/axiosService";
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { useGlobal } from '@/context/GlobalContext'
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { Label } from '@/components/Label';
import { useRouter } from 'next/navigation';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { eventBus } from '@/app/eventBus';
import { Modal } from '@/components/Modal';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const Labelproduct_organation_label = ({encryptionFlagCompData,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const decodedTokenObj:any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  const [allCode,setAllCode]=useState<string>("");

 /////////////
   //another screen
  const {gdb_group5384d, setgdb_group5384d}= useContext(TotalContext) as TotalContextProps;
  const {gdb_group5384dProps, setgdb_group5384dProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_group65b41, settab_group65b41}= useContext(TotalContext) as TotalContextProps;
  const {tab_group65b41Props, settab_group65b41Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header04820, settab_header04820}= useContext(TotalContext) as TotalContextProps;
  const {tab_header04820Props, settab_header04820Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_grpe63f4, settab_grpe63f4}= useContext(TotalContext) as TotalContextProps;
  const {tab_grpe63f4Props, settab_grpe63f4Props}= useContext(TotalContext) as TotalContextProps;
  const {transaction_group6c6f2, settransaction_group6c6f2}= useContext(TotalContext) as TotalContextProps;
  const {transaction_group6c6f2Props, settransaction_group6c6f2Props}= useContext(TotalContext) as TotalContextProps;
  const {total_value_group9d783, settotal_value_group9d783}= useContext(TotalContext) as TotalContextProps;
  const {total_value_group9d783Props, settotal_value_group9d783Props}= useContext(TotalContext) as TotalContextProps;
  const {online_offline_processing_group7ad24, setonline_offline_processing_group7ad24}= useContext(TotalContext) as TotalContextProps;
  const {online_offline_processing_group7ad24Props, setonline_offline_processing_group7ad24Props}= useContext(TotalContext) as TotalContextProps;
  const {bar_chart_group737a3, setbar_chart_group737a3}= useContext(TotalContext) as TotalContextProps;
  const {bar_chart_group737a3Props, setbar_chart_group737a3Props}= useContext(TotalContext) as TotalContextProps;
  const {pie_chart_group15067, setpie_chart_group15067}= useContext(TotalContext) as TotalContextProps;
  const {pie_chart_group15067Props, setpie_chart_group15067Props}= useContext(TotalContext) as TotalContextProps;
  const {product_organation_label2e07d, setproduct_organation_label2e07d}= useContext(TotalContext) as TotalContextProps;
  const {piechart9dde7, setpiechart9dde7}= useContext(TotalContext) as TotalContextProps;
  const {transaction_tablef4f34, settransaction_tablef4f34}= useContext(TotalContext) as TotalContextProps;
  const {transaction_tablef4f34Props, settransaction_tablef4f34Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


const handleMapperValue=async()=>{
  try{
    //fetching orchestration data for label
    const orchestrationData: any = await AxiosService.post(
      '/UF/Orchestration',
      {
        key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:VGPH:AFK:globalDashboard:AFVK:v1",
        componentId: "7169a37581d049d395f6f3949db15067",
        controlId: "0a0b222658e64fb9960352eabda2e07d",
        isTable: false,
        from:"label",
        accessProfile:accessProfile
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if(orchestrationData?.data?.error == true){
      return
    }
    setAllCode(orchestrationData?.data?.code);
  }catch(err){
    console.log(err)
  }
}

useEffect(()=>{
  handleMapperValue();
  setpie_chart_group15067((pre:any)=>({...pre,product_organation_label:""}));
},[product_organation_label2e07d?.refresh])


const handleClick =async(e:any)=>{
  try{
    setIsProcessing(true);
  setpie_chart_group15067((prev: any) => ({ ...prev, product_organation_label: e.target.value }));
  let code = allCode;
    if (code != '') {
    let codeStates: any = {};
        codeStates['gdb_group'] = gdb_group5384d,
        codeStates['setgdb_group'] = setgdb_group5384d,
        codeStates['gdb_group5384d'] = gdb_group5384dProps,
        codeStates['setgdb_group5384d'] = setgdb_group5384dProps,
        codeStates['tab_group'] = tab_group65b41,
        codeStates['settab_group'] = settab_group65b41,
        codeStates['tab_group65b41'] = tab_group65b41Props,
        codeStates['settab_group65b41'] = settab_group65b41Props,
        codeStates['tab_header'] = tab_header04820,
        codeStates['settab_header'] = settab_header04820,
        codeStates['tab_header04820'] = tab_header04820Props,
        codeStates['settab_header04820'] = settab_header04820Props,
        codeStates['tab_grp'] = tab_grpe63f4,
        codeStates['settab_grp'] = settab_grpe63f4,
        codeStates['tab_grpe63f4'] = tab_grpe63f4Props,
        codeStates['settab_grpe63f4'] = settab_grpe63f4Props,
        codeStates['transaction_group'] = transaction_group6c6f2,
        codeStates['settransaction_group'] = settransaction_group6c6f2,
        codeStates['transaction_group6c6f2'] = transaction_group6c6f2Props,
        codeStates['settransaction_group6c6f2'] = settransaction_group6c6f2Props,
        codeStates['total_value_group'] = total_value_group9d783,
        codeStates['settotal_value_group'] = settotal_value_group9d783,
        codeStates['total_value_group9d783'] = total_value_group9d783Props,
        codeStates['settotal_value_group9d783'] = settotal_value_group9d783Props,
        codeStates['online_offline_processing_group'] = online_offline_processing_group7ad24,
        codeStates['setonline_offline_processing_group'] = setonline_offline_processing_group7ad24,
        codeStates['online_offline_processing_group7ad24'] = online_offline_processing_group7ad24Props,
        codeStates['setonline_offline_processing_group7ad24'] = setonline_offline_processing_group7ad24Props,
        codeStates['bar_chart_group'] = bar_chart_group737a3,
        codeStates['setbar_chart_group'] = setbar_chart_group737a3,
        codeStates['bar_chart_group737a3'] = bar_chart_group737a3Props,
        codeStates['setbar_chart_group737a3'] = setbar_chart_group737a3Props,
        codeStates['pie_chart_group'] = pie_chart_group15067,
        codeStates['setpie_chart_group'] = setpie_chart_group15067,
        codeStates['pie_chart_group15067'] = pie_chart_group15067Props,
        codeStates['setpie_chart_group15067'] = setpie_chart_group15067Props,
        codeStates['product_organation_label'] = product_organation_label2e07d,
        codeStates['setproduct_organation_label'] = setproduct_organation_label2e07d,
        codeStates['piechart'] = piechart9dde7,
        codeStates['setpiechart'] = setpiechart9dde7,
        codeStates['transaction_table'] = transaction_tablef4f34,
        codeStates['settransaction_table'] = settransaction_tablef4f34,
        codeStates['transaction_tablef4f34'] = transaction_tablef4f34Props,
        codeStates['settransaction_tablef4f34'] = settransaction_tablef4f34Props,
  codeExecution(code,codeStates);
  }
  }catch (err: any) {
    setIsProcessing(false);
    if(typeof err == 'string')
      toast(err, 'danger');
    else
      toast(err?.response?.data?.errorDetails?.message, 'danger');
  }finally{
    setIsProcessing(false);
  }
}


  if (product_organation_label2e07d?.isHidden) {
    return <></>
  }  

  return (
    <div 
      style={{gridColumn: `1 / 12`,gridRow: `1 / 9`, gap:``, height: `100%`, overflow: 'hidden'}} >

      <Label 
        className=""
        disabled= {product_organation_label2e07d?.isDisabled ? true : false}
        theme="clear"
        interactive={false}
      onClick = {handleClick}
      >
      PRODUCT ORGINATION
      </Label>
    </div>
  )
}

export default Labelproduct_organation_label
