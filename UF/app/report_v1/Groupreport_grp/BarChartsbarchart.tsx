
'use client'
import { useContext, useEffect, useState, useRef } from 'react';
import { codeExecution } from '@/app/utils/codeExecution';
import { getCookie } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from '@/app/components/axiosService';
import { te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext';
import { Tooltip } from '@/components/Tooltip';
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import {BarChart} from '@/components/BarChart';
import { Text } from "@/components/Text";
import { Card } from '@/components/Card';

type ContentAlign = "left" | "center" | "right";

interface BarChartsbarChartCompProps {
  encryptionFlagCompData: any;
}

export default function BarChartsbarchart({ 
  encryptionFlagCompData,
}: BarChartsbarChartCompProps) {
  const token: string = getCookie('token'); 
  const { globalState, setGlobalState } = useContext(TotalContext) as TotalContextProps;
  const { accessProfile, setAccessProfile } = useContext(TotalContext) as TotalContextProps;
  const [data,setData] = useState<any[]>([]);
  const {dfd_chart_data_v1Props, setdfd_chart_data_v1Props} = useContext(TotalContext) as TotalContextProps;
  
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef<any>(false);
  const toast : Function = useInfoMsg();
  /////////////
   //another screen
  const {report_grp0286e, setreport_grp0286e}= useContext(TotalContext) as TotalContextProps;  
  const {report_grp0286eProps, setreport_grp0286eProps}= useContext(TotalContext) as TotalContextProps;  
  const {barchart5a930, setbarchart5a930}= useContext(TotalContext) as TotalContextProps;  
  const {piechart95a71, setpiechart95a71}= useContext(TotalContext) as TotalContextProps;  
  //////////////
  const handleMapperDetails=async()=>{
    try{
      let te_refreshBody:te_refreshDto={
      key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:chart_data:AFVK:v1"+":",
      refreshFlag: "Y",
      count: 10 ,
      page: 1
    }
    if (encryptionFlagCont) {
      te_refreshBody["dpdKey"] = encryptionDpd;
      te_refreshBody["method"] = encryptionMethod;
    }
    const te_refreshData:any=await AxiosService.post("/te/eventEmitter",te_refreshBody,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if(te_refreshData?.data?.error == true){
      toast(te_refreshData?.data?.errorDetails?.message, 'danger');
    }else{
      setdfd_chart_data_v1Props(te_refreshData?.data?.dataset?.data || []);
    }
    let code : string = ``;
      if (code != '') {
        let codeStates: any = {};
          codeStates['report_grp']  = report_grp0286e,
          codeStates['setreport_grp'] = setreport_grp0286e,
        codeExecution(code,codeStates);
      }
      setData(te_refreshData?.data?.dataset?.data);
      if(Array.isArray(te_refreshData?.data?.dataset?.data)){
        return
      }else{
        setdfd_chart_data_v1Props(te_refreshData?.data?.dataset?.data || []);
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    if (prevRefreshRef.current) {
       handleMapperDetails();
    }else 
     prevRefreshRef.current= true
   },[barchart5a930?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_chart_data_v1Props) && dfd_chart_data_v1Props?.length > 0){
      setData(dfd_chart_data_v1Props)
      setreport_grp0286e((pre:any)=>({...pre,name:dfd_chart_data_v1Props[0]?.name}))
    }
  },[dfd_chart_data_v1Props])
  if (barchart5a930?.isHidden) {
    return <></>
  }
  return (
    <div
      className="w-full h-full"
      style={{gridColumn: `1 / 13`,gridRow: `1 / 97`, gap:``, height: `100%`}}
    >
      <BarChart
        data={data}
        showCurrencySign = "₹"
        title  = "Bar Chart"
        fillContainer={true}
        contentAlign="left"
      />
    </div>
  );
   
}
