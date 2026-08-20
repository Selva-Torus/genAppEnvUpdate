'use client'
import React,{ useContext,useEffect,useState,useRef } from "react";
import { AxiosService } from '@/app/components/axiosService';
import { te_refreshDto,api_paginationDto } from '@/app/interfaces/interfaces';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from "../globalContext";
import decodeToken from "../components/decodeToken";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode } from "@/types/global";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import clsx from "clsx";
import dynamic from 'next/dynamic';
import { useGlobal } from '@/context/GlobalContext'

const Groupsimulator_main_group = dynamic(() => import("./Groupsimulator_main_group/Groupsimulator_main_group"), { ssr: false });

export default function PageSimulatorV1({ onReady }: { onReady?: () => void } = {}) {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "Operational Manager": {
    "blockedGroups": []
  },
  "Operational Officer": {
    "blockedGroups": []
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "simulator_main_group": {},
  "simulator_tab_group": {},
  "op_financial": {},
  "op_financial_grp": {
    "product_code_op": {
      "show": false
    },
    "product_code_op_financ": {
      "show": false
    },
    "message_type_op": {
      "show": false
    },
    "message_type_op_financ": {
      "show": false
    },
    "date_op": {
      "show": false
    },
    "date_op_fianc": {
      "show": false
    },
    "uuid_op": {
      "show": false
    },
    "uuid_op_financ": {
      "show": false
    },
    "status_op": {
      "show": false
    },
    "status_op_financ": {
      "show": false
    },
    "reject_reason_op": {
      "show": false
    },
    "rej_reasn_op_financ": {
      "show": false
    },
    "submit_op": {
      "show": false
    },
    "customwidget": {
      "show": false
    }
  },
  "op_settlement": {},
  "op_settlement_grp": {
    "op_setl_product_code": {
      "show": false
    },
    "product_code_setl_op": {
      "show": false
    },
    "msg_type_op_setlmnt": {
      "show": false
    },
    "op_setl_message_type": {
      "show": false
    },
    "op_setl_date": {
      "show": false
    },
    "date_op_setlmnt": {
      "show": false
    },
    "uuid_op_setlmnt": {
      "show": false
    },
    "uuid_op_settlmnt": {
      "show": false
    },
    "op_setlmnt_submit": {
      "show": false
    }
  },
  "ip_financial": {},
  "ip_debtor_dtls": {
    "debtor_info": {
      "show": false
    },
    "dr_account": {
      "show": false
    },
    "dr_account_lbl": {
      "show": false
    },
    "dr_name_lbl": {
      "show": false
    },
    "dr_name": {
      "show": false
    },
    "dr_bank_lbl": {
      "show": false
    },
    "dr_bank": {
      "show": false
    }
  },
  "ip_creditor_dtls": {
    "creditor_info": {
      "show": false
    },
    "cr_account": {
      "show": false
    },
    "cr_account_lbl": {
      "show": false
    },
    "cr_name": {
      "show": false
    },
    "cr_name_lbl": {
      "show": false
    },
    "cr_bank": {
      "show": false
    },
    "cr_bank_lbl": {
      "show": false
    },
    "rtgs_account": {
      "show": false
    },
    "rtgs_acnt_lbl": {
      "show": false
    }
  },
  "payment_dtls": {
    "payment_info": {
      "show": false
    },
    "currency": {
      "show": false
    },
    "currency_lbl": {
      "show": false
    },
    "amount": {
      "show": false
    },
    "amount_lbl": {
      "show": false
    }
  },
  "addionl_info": {
    "addtional_info": {
      "show": false
    },
    "remittance_info": {
      "show": false
    },
    "remittance_lbl": {
      "show": false
    }
  },
  "button_grp": {
    "submit_ip": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "simulator";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {simulatorprocessui_v1, setsimulatorprocessui_v1} = useContext(TotalContext) as TotalContextProps;
  const {simulatorprocessui_v1Props, setsimulatorprocessui_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checksimulator_main_group,setChecksimulator_main_group,]=useState<boolean>(false);
  const [checkop_financial_grp,setCheckop_financial_grp,]=useState<boolean>(false);
  const [checkop_settlement_grp,setCheckop_settlement_grp,]=useState<boolean>(false);
  const [checkip_debtor_dtls,setCheckip_debtor_dtls,]=useState<boolean>(false);
  const [checkip_creditor_dtls,setCheckip_creditor_dtls,]=useState<boolean>(false);
  const [checkpayment_dtls,setCheckpayment_dtls,]=useState<boolean>(false);
  const [checkaddionl_info,setCheckaddionl_info,]=useState<boolean>(false);
  const [checkbutton_grp,setCheckbutton_grp,]=useState<boolean>(false);
  const {simulator_main_group0541e, setsimulator_main_group0541e} = useContext(TotalContext) as TotalContextProps;
  const {op_financial_grp8a39a, setop_financial_grp8a39a} = useContext(TotalContext) as TotalContextProps;
  const {op_settlement_grpb706d, setop_settlement_grpb706d} = useContext(TotalContext) as TotalContextProps;
  const {ip_debtor_dtls8143c, setip_debtor_dtls8143c} = useContext(TotalContext) as TotalContextProps;
  const {ip_creditor_dtls1ade4, setip_creditor_dtls1ade4} = useContext(TotalContext) as TotalContextProps;
  const {payment_dtls30132, setpayment_dtls30132} = useContext(TotalContext) as TotalContextProps;
  const {addionl_info43014, setaddionl_info43014} = useContext(TotalContext) as TotalContextProps;
  const {button_grp7b9b7, setbutton_grp7b9b7} = useContext(TotalContext) as TotalContextProps;
  const {simulator_tab_groupfd732, setsimulator_tab_groupfd732} = useContext(TotalContext) as TotalContextProps;
  const {dfd_returnreasondfd_v1Props, setdfd_returnreasondfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [controlData, setControlData] = useState<any>({});
  const [groupData, setGroupData] = useState<any>({});
  const encryptionFlagPage: boolean = false|| encAppFalg.flag;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encAppFalg.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encAppFalg.method;
  let encryptionFlagPageData : EncryptionFlagPageData ={
    "flag":encryptionFlagPage,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  }
  const [paginationDetails, setpaginationDetails] = useState<Record<string, any>>({});
  const [paginationData,setPaginationData]=useState<PaginationData>({count:10,page:1})
    const prevRefreshRef = useRef<any>({
      returnreasondfd_v1:false,
    });
    async function returnreasondfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let returnreasondfd_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:returnReasonDfd:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          returnreasondfd_v1Body["dpdKey"] = encryptionDpd;
          returnreasondfd_v1Body["method"] = encryptionMethod;
        }
        if(simulatorprocessui_v1Props.length > 0){
          for(let i=0;i< simulatorprocessui_v1Props.length;i++){
            if(simulatorprocessui_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:returnReasonDfd:AFVK:v1"){
              // delete simulatorprocessui_v1Props[i].DFDkey;
              let temp=structuredClone(simulatorprocessui_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          returnreasondfd_v1Body['filterData'] = filterData;
        }
        const returnreasondfd_v1Data:any=await AxiosService.post("/te/eventEmitter",returnreasondfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=returnreasondfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(returnreasondfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_returnreasondfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_returnreasondfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (returnreasondfd_v1Data?.data?.dataset) {
           setdfd_returnreasondfd_v1Props(
              Array.isArray(returnreasondfd_v1Data?.data?.dataset?.data)
                 ? returnreasondfd_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_returnreasondfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.returnreasondfd_v1) {
      returnreasondfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.returnreasondfd_v1= true
  },[refetch?.returnreasondfd_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setsimulatorprocessui_v1({...result,_artfactPFRule_:rule})
  }

  
  const logout = () => {
    localStorage.clear();
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    const from = encodeURIComponent(`${basePath}/`);
    window.location.href = `${basePath}/next-api/auth/logout?from=${from}`;
  };

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:simulatorProcessUi:AFVK:v1"
        }
      : { key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:simulatorProcessUi:AFVK:v1" }
    const encryptionFlagPageData: EncryptionFlagPageData = {
      flag: encryptionFlagPage,
      dpd: encryptionDpd,
      method: encryptionMethod
    }
    // fetchBatchData, introspect and myAccount-for-client don't depend on one
    // another's results — only programmain_v1DFD (below) needs the pagination
    // value that comes out of fetchBatchData. Run all three concurrently
    // instead of one after another. Each call is caught locally so one
    // failure doesn't swallow the other two responses (Promise.all rejects
    // on the first rejection otherwise).
    const [data, myAccountRes]: [any, any] = await Promise.all([
      fetchBatchData(
        'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:simulatorProcessUi:AFVK:v1',
        [user],
        'pageSimulatorV1',
        token,
        encryptionFlagPageData
      ),
      token
        ? AxiosService.get("/UF/myAccount-for-client", {
            headers: { Authorization: `Bearer ${token}` },
            params: introspectParams
          }).catch((err: any) => ({ __error: err }))
        : Promise.resolve(null)
    ])
    const orchestrationData: any = data.pageData
    setGroupData(data.groupData || {});
    setControlData(data.controlData || {});
    const security:string = orchestrationData?.security;
    const allowedGroup: AllowedGroupNode[] = orchestrationData?.allowedGroup||[];
    code = orchestrationData?.code;
    const pagination:any = orchestrationData?.action?.pagination;
    setpaginationDetails({
      page: +orchestrationData?.action?.pagination?.page || 0,
      pageSize: +orchestrationData?.action?.pagination?.count || 0
    })
    if("artfactPFRule" in orchestrationData && orchestrationData?.artfactPFRule?.nodes?.length>0){
      await handleArtfactRule(orchestrationData?.artfactPFRule,{...decodedTokenObj},allRuleData)  
    }
    if (token) {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:simulatorProcessUi:AFVK:v1`)
      if (!res.ok) {
        logout()
        return
      }
      routes.refresh()

      try {
        if (myAccountRes?.__error) throw myAccountRes.__error;
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await returnreasondfd_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'simulator_main_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecksimulator_main_group(true)
            }
            if(nodes?.groupName == 'op_financial_grp' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckop_financial_grp(true)
            }
            if(nodes?.groupName == 'op_settlement_grp' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckop_settlement_grp(true)
            }
            if(nodes?.groupName == 'ip_debtor_dtls' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckip_debtor_dtls(true)
            }
            if(nodes?.groupName == 'ip_creditor_dtls' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckip_creditor_dtls(true)
            }
            if(nodes?.groupName == 'payment_dtls' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckpayment_dtls(true)
            }
            if(nodes?.groupName == 'addionl_info' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckaddionl_info(true)
            }
            if(nodes?.groupName == 'button_grp' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckbutton_grp(true)
            }
          })
          }
           }catch(err:any)
          {
            if( typeof err =='string')
              toast(err, 'danger');
            else
              toast(err?.response?.data?.message, 'danger');
          }
        /////////
        //Code Execution
        if (code !="" ) {
          let codeStates: Record<string, any> = {}
          codeStates['simulator_main_group'] = simulator_main_group0541e;
          codeStates['setsimulator_main_group'] = setsimulator_main_group0541e;
          codeStates['op_financial_grp'] = op_financial_grp8a39a;
          codeStates['setop_financial_grp'] = setop_financial_grp8a39a;
          codeStates['op_settlement_grp'] = op_settlement_grpb706d;
          codeStates['setop_settlement_grp'] = setop_settlement_grpb706d;
          codeStates['ip_debtor_dtls'] = ip_debtor_dtls8143c;
          codeStates['setip_debtor_dtls'] = setip_debtor_dtls8143c;
          codeStates['ip_creditor_dtls'] = ip_creditor_dtls1ade4;
          codeStates['setip_creditor_dtls'] = setip_creditor_dtls1ade4;
          codeStates['payment_dtls'] = payment_dtls30132;
          codeStates['setpayment_dtls'] = setpayment_dtls30132;
          codeStates['addionl_info'] = addionl_info43014;
          codeStates['setaddionl_info'] = setaddionl_info43014;
          codeStates['button_grp'] = button_grp7b9b7;
          codeStates['setbutton_grp'] = setbutton_grp7b9b7;
          const { codeExecution } = await import("../utils/codeExecution");
          codeExecution(code,codeStates);
        }   
        setInitialLoad(true);        
      } catch (err: any) {
        toast(err?.message, 'danger');
      }
    
    }else{
      toast('token not found','danger');
    }    
  }
  const handleClick = (): void => {
    routes.push("/");
  }
  const handleOnload = (): void => {
  }

  useEffect(() => {    
    setMemoryVariables((prev: Record<string, string>) => ({
      ...prev,
      screenName: screenName,    
    }))
    securityCheck().finally(() => onReady?.());
    handleOnload();
    setsimulatorprocessui_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(simulatorprocessui_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
simulator_tab_group:simulator_tab_groupfd732.simulator_tab_group,      }
      handleArtfactRule(simulatorprocessui_v1?._artfactPFRule_,data,allRuleData)
    }
  },[simulator_tab_groupfd732.simulator_tab_group,])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setsimulatorprocessui_v1((pre:any)=>({...pre,_selectedGroup_:""}))
      }
    };
      document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>

     <div className={clsx("",
        "w-full",
        isDark ? 'text-white' : 'text-black',
        isProcessing && "pointer-events-none select-none"
      )}

      ref={parentRef}
     style={{
        gridColumn: '',
        gridRow: '',
        gridAutoRows: '4px',
        columnGap: '0px',
        rowGap: '0px',
        display: "grid",
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: '',
        height: '',
        overflow: '',
        backgroundColor:bgStyle,
        backgroundImage:'',
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: '',
        color: textStyle,
       // minHeight: '100vh',
        ...(isHighContrast && {
          fontWeight: '500',
          borderWidth: '2px'
      })
      }}>
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="flex items-center gap-3 rounded-xl bg-neutral-900/80 px-6 py-4 text-sm text-white shadow-lg backdrop-blur">
            {/* Spinner */}
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

            {/* Text */}
            <span className="font-medium tracking-wide">
              Processing, please wait…
            </span>
          </div>
        </div>
      )}
        {checksimulator_main_group && initialLoad &&<Groupsimulator_main_group
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          tableData={tableData}
          setTableData={setTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          controlData={controlData} 
          groupData={groupData}        />}
        
      </div> 
    </>
  )
}
    