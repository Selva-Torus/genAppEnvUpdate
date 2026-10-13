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

const Labellbl_hear = ({lockedData,setLockedData,encryptionFlagCompData,setIsProcessing}:any) => {
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
  const {grp_overallsif_list6060c, setgrp_overallsif_list6060c}= useContext(TotalContext) as TotalContextProps;
  const {grp_overallsif_list6060cProps, setgrp_overallsif_list6060cProps}= useContext(TotalContext) as TotalContextProps;
  const {lbl_hear96d7b, setlbl_hear96d7b}= useContext(TotalContext) as TotalContextProps;
  const {btn_search8b202, setbtn_search8b202}= useContext(TotalContext) as TotalContextProps;
  const {btn_export_as_excele8f9c, setbtn_export_as_excele8f9c}= useContext(TotalContext) as TotalContextProps;
  const {tbl_pif_list653ae, settbl_pif_list653ae}= useContext(TotalContext) as TotalContextProps;
  const {tbl_pif_list653aeProps, settbl_pif_list653aeProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


const handleMapperValue=async()=>{
  try{
    //fetching orchestration data for label
    const orchestrationData: any = await AxiosService.post(
      '/UF/Orchestration',
      {
        key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:pifSummaryReport:AFVK:v1",
        componentId: "3dbaa8b693538bdcf02633127d46060c",
        controlId: "a994531472568fa411a7607769d96d7b",
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
  setgrp_overallsif_list6060c((pre:any)=>({...pre,lbl_hear:""}));
},[lbl_hear96d7b?.refresh])


const handleClick =async(e:any)=>{
  try{
    setIsProcessing(true);
  setgrp_overallsif_list6060c((prev: any) => ({ ...prev, lbl_hear: e.target.value }));
  let code = allCode;
    if (code != '') {
    let codeStates: any = {};
        codeStates['grp_overallsif_list'] = grp_overallsif_list6060c,
        codeStates['setgrp_overallsif_list'] = setgrp_overallsif_list6060c,
        codeStates['grp_overallsif_list6060c'] = grp_overallsif_list6060cProps,
        codeStates['setgrp_overallsif_list6060c'] = setgrp_overallsif_list6060cProps,
        codeStates['lbl_hear'] = lbl_hear96d7b,
        codeStates['setlbl_hear'] = setlbl_hear96d7b,
        codeStates['btn_search'] = btn_search8b202,
        codeStates['setbtn_search'] = setbtn_search8b202,
        codeStates['btn_export_as_excel'] = btn_export_as_excele8f9c,
        codeStates['setbtn_export_as_excel'] = setbtn_export_as_excele8f9c,
        codeStates['tbl_pif_list'] = tbl_pif_list653ae,
        codeStates['settbl_pif_list'] = settbl_pif_list653ae,
        codeStates['tbl_pif_list653ae'] = tbl_pif_list653aeProps,
        codeStates['settbl_pif_list653ae'] = settbl_pif_list653aeProps,
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


  if (lbl_hear96d7b?.isHidden) {
    return <></>
  }  

  return (
    <div 
      style={{gridColumn: `6 / 16`,gridRow: `1 / 11`, gap:``, height: `100%`, overflow: 'hidden'}} >

      <Label 
        className=""
        disabled= {lbl_hear96d7b?.isDisabled ? true : false}
        theme="normal"
        interactive={false}
      onClick = {handleClick}
      >
      PIF Summary Report
      </Label>
    </div>
  )
}

export default Labellbl_hear
