'use client'


import React, { useState, useContext, useEffect, useRef } from 'react'; 
import { Text } from '@/components/Text';
import { Card } from '@/components/Card';
import { Modal } from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useGlobal } from '@/context/GlobalContext'
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { te_refreshDto } from '@/app/interfaces/interfaces';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import i18n from '@/app/components/i18n';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Cardcard = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const { token } = useGlobal();
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_chart_data_v1Props, setdfd_chart_data_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const selected=useRef({});
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const toast : Function=useInfoMsg();
  const routes : AppRouterInstance  = useRouter();
  const prevRefreshRef = useRef<any>(false);
  //showComponentAsPopup || showArtifactAsModal
  /////////////
   //another screen
  const {groupa03b5, setgroupa03b5}= useContext(TotalContext) as TotalContextProps
  const {groupa03b5Props, setgroupa03b5Props}= useContext(TotalContext) as TotalContextProps
  const {combobox659b9, setcombobox659b9}= useContext(TotalContext) as TotalContextProps
  const {carde8dd8, setcarde8dd8}= useContext(TotalContext) as TotalContextProps
  const {carde8dd8Props, setcarde8dd8Props} = useContext(TotalContext) as TotalContextProps;
  //////////////
 
  
  const handleMapperDetails=async(filterProps?:any,filterFlag?:boolean):Promise<void>=>{
    try{
    let code:string;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "50933b8d5a344889973e1c61e4aa03b5",
        "ac2e049ec1104ac6b649ab574b9e8dd8"
      );
    code = orchestrationData?.data?.code;
    if (code != '') {
      let codeStates: Record<string, any> = {}
      codeStates['group'] = groupa03b5,
      codeStates['setgroup'] = setgroupa03b5,
      codeStates['groupa03b5'] = groupa03b5Props,
      codeStates['setgroupa03b5'] = setgroupa03b5Props,
      codeStates['combobox'] = combobox659b9,
      codeStates['setcombobox'] = setcombobox659b9,
      codeStates['card'] = carde8dd8,
      codeStates['setcard'] = setcarde8dd8,
      codeStates['selected']  = selected
      codeExecution(code,codeStates)
    }
    }catch(err){
      console.log(err)
    }
    try{
      if ("hasLogicCenter" in dfd_chart_data_v1Props && !dfd_chart_data_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_chart_data_v1Props.dstKey,
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
        setgroupa03b5((pre: any) => ({
          ...pre,
          name: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.name
            : "0"
        }))
      }
      else{
        if(filterFlag){
          setgroupa03b5((pre: any) => ({
            ...pre,
            name: carde8dd8Props?.filteredData?.length > 0
              ? carde8dd8Props?.filteredData[0]?.name
              : "0"
          }))
        }else if(Array.isArray(dfd_chart_data_v1Props) && dfd_chart_data_v1Props && !groupa03b5.name){
          setgroupa03b5((pre:any)=>({...pre,name:dfd_chart_data_v1Props[0]?.name}))
        }
      }
    }catch(err){
      console.log(err)
    }
  }

  const handleClick=async(value:Record<string, any>):Promise<void>=>{
    try{
    setIsProcessing(true);
    selected.current = value;
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


  useEffect(() => {
    if (prevRefreshRef.current) {
      handleMapperDetails()
    }else 
    prevRefreshRef.current= true
  },[carde8dd8?.refresh])

  useEffect(() => {
    handleMapperDetails()
    if(Array.isArray(dfd_chart_data_v1Props)){
      setgroupa03b5((pre:any)=>({...pre,name:dfd_chart_data_v1Props[0]?.name}));
    }
  },[dfd_chart_data_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!carde8dd8Props?.filterProps) return;
    handleMapperDetails(carde8dd8Props?.filterProps,carde8dd8Props?.filterFlag);
  },[carde8dd8Props?.filterProps])


  const style = {
    
    display: 'flex',
   // boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)', 
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  if (carde8dd8?.isHidden) {
    return <></>
  }  
  return (
    <div 
    style={{gridColumn: `13 / 17`,gridRow: `87 / 117`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Card 
      style={style}
      className=""   
      theme="normal"
      view="filled"
      label={keyset("")}
      prefixValue="₹"
      disabled= {carde8dd8?.isDisabled ? true : false}
      onClick={handleClick} 
      contentAlign={"center"}
      >
      {groupa03b5?.name?groupa03b5?.name:"0"}
      </Card>
    </div>
  )
}

export default Cardcard
