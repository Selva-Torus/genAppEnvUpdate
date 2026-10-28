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
import { logout } from "@/app/components/utils";  
import { getPublicEnv } from "@/app/components/public-env";

const Groupmanager_group = dynamic(() => import("./Groupmanager_group/Groupmanager_group"), { ssr: false });

export default function PageManagerHomeScreenV1({ onReady }: { onReady?: () => void } = {}) {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "Employee": {
    "blockedGroups": [
      "canvas",
      "manager_group",
      "daily_expense_table",
      "offsite_expense_table"
    ]
  },
  "Manager": {
    "blockedGroups": []
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "manager_group": {
    "approvedcard": {
      "show": false
    },
    "rejectedcard": {
      "show": false
    },
    "pendingcard": {
      "show": false
    },
    "dailyexpenses": {
      "show": false
    },
    "offsiteexpenses": {
      "show": false
    },
    "daily_exp": {
      "show": false
    },
    "offstie_exp": {
      "show": false
    }
  },
  "daily_expense_table": {
    "cl_id": {
      "show": false
    },
    "trs_created_by": {
      "show": false
    },
    "claim_category": {
      "show": false
    },
    "total_amount": {
      "show": false
    },
    "status": {
      "show": false
    },
    "expense_date": {
      "show": false
    }
  },
  "offsite_expense_table": {
    "claim_id": {
      "show": false
    },
    "expense_name": {
      "show": false
    },
    "category_total_amount": {
      "show": false
    },
    "trs_status": {
      "show": false
    },
    "formatted_date": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "manager home screen";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {dashboard_for_manager_v1, setdashboard_for_manager_v1} = useContext(TotalContext) as TotalContextProps;
  const {dashboard_for_manager_v1Props, setdashboard_for_manager_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkmanager_group,setCheckmanager_group,]=useState<boolean>(false);
  const [checkdaily_expense_table,setCheckdaily_expense_table,]=useState<boolean>(false);
  const [checkoffsite_expense_table,setCheckoffsite_expense_table,]=useState<boolean>(false);
  const {manager_group41477, setmanager_group41477} = useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table91568, setdaily_expense_table91568} = useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table1e924, setoffsite_expense_table1e924} = useContext(TotalContext) as TotalContextProps;
  const {dfd_card_data_v1Props, setdfd_card_data_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_claim_table_data_v1Props, setdfd_claim_table_data_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      card_data_v1:false,
      claim_table_data_v1:false,
    });
    async function card_data_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let card_data_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:RF:AFK:card_data:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          card_data_v1Body["dpdKey"] = encryptionDpd;
          card_data_v1Body["method"] = encryptionMethod;
        }
        if(dashboard_for_manager_v1Props.length > 0){
          for(let i=0;i< dashboard_for_manager_v1Props.length;i++){
            if(dashboard_for_manager_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:RF:AFK:card_data:AFVK:v1"){
              // delete dashboard_for_manager_v1Props[i].DFDkey;
              let temp=structuredClone(dashboard_for_manager_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          card_data_v1Body['filterData'] = filterData;
        }
        const card_data_v1Data:any=await AxiosService.post("/te/eventEmitter",card_data_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=card_data_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(card_data_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_card_data_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_card_data_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (card_data_v1Data?.data?.dataset) {
           setdfd_card_data_v1Props(
              Array.isArray(card_data_v1Data?.data?.dataset?.data)
                 ? card_data_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_card_data_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.card_data_v1) {
      card_data_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.card_data_v1= true
  },[refetch?.card_data_v1])
    async function claim_table_data_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let claim_table_data_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:RF:AFK:claim_table_data:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          claim_table_data_v1Body["dpdKey"] = encryptionDpd;
          claim_table_data_v1Body["method"] = encryptionMethod;
        }
        if(dashboard_for_manager_v1Props.length > 0){
          for(let i=0;i< dashboard_for_manager_v1Props.length;i++){
            if(dashboard_for_manager_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:RF:AFK:claim_table_data:AFVK:v1"){
              // delete dashboard_for_manager_v1Props[i].DFDkey;
              let temp=structuredClone(dashboard_for_manager_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          claim_table_data_v1Body['filterData'] = filterData;
        }
        const claim_table_data_v1Data:any=await AxiosService.post("/te/eventEmitter",claim_table_data_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=claim_table_data_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(claim_table_data_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_claim_table_data_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_claim_table_data_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (claim_table_data_v1Data?.data?.dataset) {
           setdfd_claim_table_data_v1Props(
              Array.isArray(claim_table_data_v1Data?.data?.dataset?.data)
                 ? claim_table_data_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_claim_table_data_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.claim_table_data_v1) {
      claim_table_data_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.claim_table_data_v1= true
  },[refetch?.claim_table_data_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setdashboard_for_manager_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Dashboard_For_Manager:AFVK:v1"
        }
      : { key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Dashboard_For_Manager:AFVK:v1" }
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
        'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Dashboard_For_Manager:AFVK:v1',
        [user],
        'pageManagerHomeScreenV1',
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
      const basePath = getPublicEnv('NEXT_PUBLIC_BASE_PATH');
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Dashboard_For_Manager:AFVK:v1`)
      if (!res.ok) {
        logout(token)
        return
      }
      //routes.refresh()

      try {
        if (myAccountRes?.__error) throw myAccountRes.__error;
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await card_data_v1DFD(pagination)
    await claim_table_data_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'manager_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckmanager_group(true)
            }
            if(nodes?.groupName == 'daily_expense_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdaily_expense_table(true)
            }
            if(nodes?.groupName == 'offsite_expense_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckoffsite_expense_table(true)
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
          codeStates['manager_group'] = manager_group41477;
          codeStates['setmanager_group'] = setmanager_group41477;
          codeStates['daily_expense_table'] = daily_expense_table91568;
          codeStates['setdaily_expense_table'] = setdaily_expense_table91568;
          codeStates['offsite_expense_table'] = offsite_expense_table1e924;
          codeStates['setoffsite_expense_table'] = setoffsite_expense_table1e924;
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
    setdashboard_for_manager_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(dashboard_for_manager_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(dashboard_for_manager_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setdashboard_for_manager_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkmanager_group && initialLoad &&<Groupmanager_group
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
    