
'use client'
import React, { useState, useContext, useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
import { useGlobal } from '@/context/GlobalContext'
import { Switch } from '@/components/Switch'
import { Text } from '@/components/Text'
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { eventBus } from '@/app/eventBus';
import { te_refreshDto } from '@/app/interfaces/interfaces';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import {Modal} from '@/components/Modal';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import UOmapperData from '@/context/dfdmapperContolnames.json';

const Switchoutbound_or_inbound = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const [allCode,setAllCode] = useState<string>("");
  const [ruleCode,setRuleCode] = useState<any>("");
  const toast : Function = useInfoMsg();
  const routes : AppRouterInstance = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const prevRefreshRef = useRef<any>(false);
 /////////////
   //another screen
  const {tran_main_group9581a, settran_main_group9581a}= useContext(TotalContext) as TotalContextProps;
  const {tran_main_group9581aProps, settran_main_group9581aProps}= useContext(TotalContext) as TotalContextProps;
  const {tran_tab_group2a929, settran_tab_group2a929}= useContext(TotalContext) as TotalContextProps;
  const {tran_tab_group2a929Props, settran_tab_group2a929Props}= useContext(TotalContext) as TotalContextProps;
  const {outbound_or_inbound5a71c, setoutbound_or_inbound5a71c}= useContext(TotalContext) as TotalContextProps;
  const {searchfab91, setsearchfab91}= useContext(TotalContext) as TotalContextProps;
  const {refreshe9e64, setrefreshe9e64}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tab9a177, setview_all_tab9a177}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tableccb40, setview_all_tableccb40}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tableccb40Props, setview_all_tableccb40Props}= useContext(TotalContext) as TotalContextProps;
  const {view_all_journey_groupca47a, setview_all_journey_groupca47a}= useContext(TotalContext) as TotalContextProps;
  const {view_all_journey_groupca47aProps, setview_all_journey_groupca47aProps}= useContext(TotalContext) as TotalContextProps;
  const {cancel_equest_camt055_tabf8dc6, setcancel_equest_camt055_tabf8dc6}= useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_table9e976, setcancel_request_camt055_table9e976}= useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_table9e976Props, setcancel_request_camt055_table9e976Props}= useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_journey_groupd18a2, setcancel_request_camt055_journey_groupd18a2}= useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_journey_groupd18a2Props, setcancel_request_camt055_journey_groupd18a2Props}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tab81869, setinves_req_camt110_tab81869}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tablefa00e, setinves_req_camt110_tablefa00e}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tablefa00eProps, setinves_req_camt110_tablefa00eProps}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_journey_groupca738, setinves_req_camt110_journey_groupca738}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_journey_groupca738Props, setinves_req_camt110_journey_groupca738Props}= useContext(TotalContext) as TotalContextProps;
  const {investigation_response_camt111_tabf6177, setinvestigation_response_camt111_tabf6177}= useContext(TotalContext) as TotalContextProps;
  const {inves_res_camt111_table0f401, setinves_res_camt111_table0f401}= useContext(TotalContext) as TotalContextProps;
  const {inves_res_camt111_table0f401Props, setinves_res_camt111_table0f401Props}= useContext(TotalContext) as TotalContextProps;
  const {inves_res_camt111_journey_group785d4, setinves_res_camt111_journey_group785d4}= useContext(TotalContext) as TotalContextProps;
  const {inves_res_camt111_journey_group785d4Props, setinves_res_camt111_journey_group785d4Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "abd4991381842b64159b9cf4e5a2a929",
      "1de4ca63048633518a91a8e6f765a71c"
    );
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code)
      setRuleCode(orchestrationData?.data?.rule)
      await delay(1000)
      handleChange(tran_tab_group2a929?.outbound_or_inbound||false,orchestrationData?.data?.rule?.nodes)
    }catch(err)
    {
      console.log(err)
    }
  }

  useEffect(() => {
    if(prevRefreshRef.current)
      settran_tab_group2a929((pre:any)=>({...pre,outbound_or_inbound:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[outbound_or_inbound5a71c?.refresh])

  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    settran_tab_group2a929((prev: any) => ({ ...prev, outbound_or_inbound: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['tran_main_group'] = tran_main_group9581a,
        codeStates['settran_main_group'] = settran_main_group9581a,
        codeStates['tran_main_group9581a'] = tran_main_group9581aProps,
        codeStates['settran_main_group9581a'] = settran_main_group9581aProps,
        codeStates['tran_tab_group'] = tran_tab_group2a929,
        codeStates['settran_tab_group'] = settran_tab_group2a929,
        codeStates['tran_tab_group2a929'] = tran_tab_group2a929Props,
        codeStates['settran_tab_group2a929'] = settran_tab_group2a929Props,
        codeStates['outbound_or_inbound'] = outbound_or_inbound5a71c,
        codeStates['setoutbound_or_inbound'] = setoutbound_or_inbound5a71c,
        codeStates['search'] = searchfab91,
        codeStates['setsearch'] = setsearchfab91,
        codeStates['refresh'] = refreshe9e64,
        codeStates['setrefresh'] = setrefreshe9e64,
        codeStates['view_all_tab'] = view_all_tab9a177,
        codeStates['setview_all_tab'] = setview_all_tab9a177,
        codeStates['view_all_table'] = view_all_tableccb40,
        codeStates['setview_all_table'] = setview_all_tableccb40,
        codeStates['view_all_tableccb40'] = view_all_tableccb40Props,
        codeStates['setview_all_tableccb40'] = setview_all_tableccb40Props,
        codeStates['view_all_journey_group'] = view_all_journey_groupca47a,
        codeStates['setview_all_journey_group'] = setview_all_journey_groupca47a,
        codeStates['view_all_journey_groupca47a'] = view_all_journey_groupca47aProps,
        codeStates['setview_all_journey_groupca47a'] = setview_all_journey_groupca47aProps,
        codeStates['cancel_equest_camt055_tab'] = cancel_equest_camt055_tabf8dc6,
        codeStates['setcancel_equest_camt055_tab'] = setcancel_equest_camt055_tabf8dc6,
        codeStates['cancel_request_camt055_table'] = cancel_request_camt055_table9e976,
        codeStates['setcancel_request_camt055_table'] = setcancel_request_camt055_table9e976,
        codeStates['cancel_request_camt055_table9e976'] = cancel_request_camt055_table9e976Props,
        codeStates['setcancel_request_camt055_table9e976'] = setcancel_request_camt055_table9e976Props,
        codeStates['cancel_request_camt055_journey_group'] = cancel_request_camt055_journey_groupd18a2,
        codeStates['setcancel_request_camt055_journey_group'] = setcancel_request_camt055_journey_groupd18a2,
        codeStates['cancel_request_camt055_journey_groupd18a2'] = cancel_request_camt055_journey_groupd18a2Props,
        codeStates['setcancel_request_camt055_journey_groupd18a2'] = setcancel_request_camt055_journey_groupd18a2Props,
        codeStates['inves_req_camt110_tab'] = inves_req_camt110_tab81869,
        codeStates['setinves_req_camt110_tab'] = setinves_req_camt110_tab81869,
        codeStates['inves_req_camt110_table'] = inves_req_camt110_tablefa00e,
        codeStates['setinves_req_camt110_table'] = setinves_req_camt110_tablefa00e,
        codeStates['inves_req_camt110_tablefa00e'] = inves_req_camt110_tablefa00eProps,
        codeStates['setinves_req_camt110_tablefa00e'] = setinves_req_camt110_tablefa00eProps,
        codeStates['inves_req_camt110_journey_group'] = inves_req_camt110_journey_groupca738,
        codeStates['setinves_req_camt110_journey_group'] = setinves_req_camt110_journey_groupca738,
        codeStates['inves_req_camt110_journey_groupca738'] = inves_req_camt110_journey_groupca738Props,
        codeStates['setinves_req_camt110_journey_groupca738'] = setinves_req_camt110_journey_groupca738Props,
        codeStates['investigation_response_camt111_tab'] = investigation_response_camt111_tabf6177,
        codeStates['setinvestigation_response_camt111_tab'] = setinvestigation_response_camt111_tabf6177,
        codeStates['inves_res_camt111_table'] = inves_res_camt111_table0f401,
        codeStates['setinves_res_camt111_table'] = setinves_res_camt111_table0f401,
        codeStates['inves_res_camt111_table0f401'] = inves_res_camt111_table0f401Props,
        codeStates['setinves_res_camt111_table0f401'] = setinves_res_camt111_table0f401Props,
        codeStates['inves_res_camt111_journey_group'] = inves_res_camt111_journey_group785d4,
        codeStates['setinves_res_camt111_journey_group'] = setinves_res_camt111_journey_group785d4,
        codeStates['inves_res_camt111_journey_group785d4'] = inves_res_camt111_journey_group785d4Props,
        codeStates['setinves_res_camt111_journey_group785d4'] = setinves_res_camt111_journey_group785d4Props,
    codeExecution(code,codeStates)
    }
    let presentRule:any=ruleCode?.nodes || comingRule
      let filterPropsEvaluateDecisionTable2:any = evaluateDecisionTable(
        presentRule,
        {outbound_or_inbound: checked},
        {...decodedTokenObj,...memoryVariables}
      )
      let filterProps2:any =  [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfViewAllTransaction:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "d4bb33784a53454faa4a0fb510dfd772",
        "object": {
          "properties.direction": "outbound_or_inbound"
        }
      }
    ]
  }
]
      delete filterProps2[0].nodeBasedData[0].object
      setview_all_tableccb40Props((prev: any) => {
        const merged = [{
          ...(prev.filterProps?.[0] ?? {}),
          ...filterProps2[0].nodeBasedData[0],
          ...filterPropsEvaluateDecisionTable2 // NEW values
        }];
        return {
          ...prev,
          filterProps: merged,
          filterControllers: {
            ...prev.filterControllers,
            outbound_or_inbound5a71c: true
          }
        };
      });
      let filterPropsEvaluateDecisionTable4:any = evaluateDecisionTable(
        presentRule,
        {outbound_or_inbound: checked},
        {...decodedTokenObj,...memoryVariables}
      )
      let filterProps4:any =  [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "b17c3283176b4f9eb5105f6f3c0f5169",
        "object": {
          "properties.direction": "outbound_or_inbound"
        }
      }
    ]
  }
]
      delete filterProps4[0].nodeBasedData[0].object
      setcancel_request_camt055_table9e976Props((prev: any) => {
        const merged = [{
          ...(prev.filterProps?.[0] ?? {}),
          ...filterProps4[0].nodeBasedData[0],
          ...filterPropsEvaluateDecisionTable4 // NEW values
        }];
        return {
          ...prev,
          filterProps: merged,
          filterControllers: {
            ...prev.filterControllers,
            outbound_or_inbound5a71c: true
          }
        };
      });
      let filterPropsEvaluateDecisionTable6:any = evaluateDecisionTable(
        presentRule,
        {outbound_or_inbound: checked},
        {...decodedTokenObj,...memoryVariables}
      )
      let filterProps6:any =  [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "b17c3283176b4f9eb5105f6f3c0f5169",
        "object": {
          "properties.direction": "outbound_or_inbound"
        }
      }
    ]
  }
]
      delete filterProps6[0].nodeBasedData[0].object
      setinves_req_camt110_tablefa00eProps((prev: any) => {
        const merged = [{
          ...(prev.filterProps?.[0] ?? {}),
          ...filterProps6[0].nodeBasedData[0],
          ...filterPropsEvaluateDecisionTable6 // NEW values
        }];
        return {
          ...prev,
          filterProps: merged,
          filterControllers: {
            ...prev.filterControllers,
            outbound_or_inbound5a71c: true
          }
        };
      });
      let filterPropsEvaluateDecisionTable8:any = evaluateDecisionTable(
        presentRule,
        {outbound_or_inbound: checked},
        {...decodedTokenObj,...memoryVariables}
      )
      let filterProps8:any =  [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "b17c3283176b4f9eb5105f6f3c0f5169",
        "object": {
          "properties.direction": "outbound_or_inbound"
        }
      }
    ]
  }
]
      delete filterProps8[0].nodeBasedData[0].object
      setinves_res_camt111_table0f401Props((prev: any) => {
        const merged = [{
          ...(prev.filterProps?.[0] ?? {}),
          ...filterProps8[0].nodeBasedData[0],
          ...filterPropsEvaluateDecisionTable8 // NEW values
        }];
        return {
          ...prev,
          filterProps: merged,
          filterControllers: {
            ...prev.filterControllers,
            outbound_or_inbound5a71c: true
          }
        };
      });
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

  async function handleConfirmOnChange(){
  } 
  if (outbound_or_inbound5a71c?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `12 / 18`,gridRow: `3 / 12`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className="!bg-white !rounded-md !p-1.5"
        disabled= {outbound_or_inbound5a71c?.isDisabled ? true : false}
        content="OUTBOUND"
        checkedContent="INBOUND"                                                                                                                                             
        uncheckedContent="OUTBOUND"
        checked={tran_tab_group2a929?.outbound_or_inbound || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchoutbound_or_inbound



