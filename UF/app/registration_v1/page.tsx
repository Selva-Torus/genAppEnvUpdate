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

const Groupsalary_file_overall_group = dynamic(() => import("./Groupsalary_file_overall_group/Groupsalary_file_overall_group"), { ssr: false });

export default function PageRegistrationV1({ onReady }: { onReady?: () => void } = {}) {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "IT Team": {
    "blockedGroups": []
  },
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
  "salary_file_overall_group": {},
  "tab_group": {},
  "dynamication": {
    "btn_toggle": {
      "show": false
    },
    "btn_reg_moh": {
      "show": false
    },
    "reg_emplr_search": {
      "show": false
    },
    "search_btn": {
      "show": false
    }
  },
  "update_reg_employr_tab": {},
  "upd_reg_group": {},
  "upd_reg_emplr_list": {
    "cor_mol": {
      "show": false
    },
    "cor_name": {
      "show": false
    },
    "owner_eid": {
      "show": false
    },
    "cor_moh_sts": {
      "show": false
    },
    "cor_sts": {
      "show": false
    },
    "comp_sts": {
      "show": false
    }
  },
  "reg_empr_tab": {},
  "reg_emplr_group": {},
  "emplr_list": {
    "cor_mol": {
      "show": false
    },
    "cor_name": {
      "show": false
    },
    "cor_reg_id": {
      "show": false
    },
    "cor_eid": {
      "show": false
    },
    "moh_status": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "registration";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {registration_v1, setregistration_v1} = useContext(TotalContext) as TotalContextProps;
  const {registration_v1Props, setregistration_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checksalary_file_overall_group,setChecksalary_file_overall_group,]=useState<boolean>(false);
  const [checkdynamication,setCheckdynamication,]=useState<boolean>(false);
  const [checkupd_reg_group,setCheckupd_reg_group,]=useState<boolean>(false);
  const [checkupd_reg_emplr_list,setCheckupd_reg_emplr_list,]=useState<boolean>(false);
  const [checkreg_emplr_group,setCheckreg_emplr_group,]=useState<boolean>(false);
  const [checkemplr_list,setCheckemplr_list,]=useState<boolean>(false);
  const {salary_file_overall_group144dd, setsalary_file_overall_group144dd} = useContext(TotalContext) as TotalContextProps;
  const {dynamicatione8e04, setdynamicatione8e04} = useContext(TotalContext) as TotalContextProps;
  const {upd_reg_group25c38, setupd_reg_group25c38} = useContext(TotalContext) as TotalContextProps;
  const {upd_reg_emplr_listd336e, setupd_reg_emplr_listd336e} = useContext(TotalContext) as TotalContextProps;
  const {reg_emplr_group1073d, setreg_emplr_group1073d} = useContext(TotalContext) as TotalContextProps;
  const {emplr_list0e076, setemplr_list0e076} = useContext(TotalContext) as TotalContextProps;
  const {tab_group12ca0, settab_group12ca0} = useContext(TotalContext) as TotalContextProps;
  const {dfd_updateregemployer_v1Props, setdfd_updateregemployer_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_regemployer_v1Props, setdfd_regemployer_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      updateregemployer_v1:false,
      regemployer_v1:false,
    });
    async function updateregemployer_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let updateregemployer_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:updateRegEmployer:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          updateregemployer_v1Body["dpdKey"] = encryptionDpd;
          updateregemployer_v1Body["method"] = encryptionMethod;
        }
        if(registration_v1Props.length > 0){
          for(let i=0;i< registration_v1Props.length;i++){
            if(registration_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:updateRegEmployer:AFVK:v1"){
              // delete registration_v1Props[i].DFDkey;
              let temp=structuredClone(registration_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          updateregemployer_v1Body['filterData'] = filterData;
        }
        const updateregemployer_v1Data:any=await AxiosService.post("/te/eventEmitter",updateregemployer_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=updateregemployer_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(updateregemployer_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_updateregemployer_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_updateregemployer_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (updateregemployer_v1Data?.data?.dataset) {
           setdfd_updateregemployer_v1Props(
              Array.isArray(updateregemployer_v1Data?.data?.dataset?.data)
                 ? updateregemployer_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_updateregemployer_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.updateregemployer_v1) {
      updateregemployer_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.updateregemployer_v1= true
  },[refetch?.updateregemployer_v1])
    async function regemployer_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let regemployer_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:RegEmployer:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          regemployer_v1Body["dpdKey"] = encryptionDpd;
          regemployer_v1Body["method"] = encryptionMethod;
        }
        if(registration_v1Props.length > 0){
          for(let i=0;i< registration_v1Props.length;i++){
            if(registration_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:RegEmployer:AFVK:v1"){
              // delete registration_v1Props[i].DFDkey;
              let temp=structuredClone(registration_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          regemployer_v1Body['filterData'] = filterData;
        }
        const regemployer_v1Data:any=await AxiosService.post("/te/eventEmitter",regemployer_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=regemployer_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(regemployer_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_regemployer_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_regemployer_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (regemployer_v1Data?.data?.dataset) {
           setdfd_regemployer_v1Props(
              Array.isArray(regemployer_v1Data?.data?.dataset?.data)
                 ? regemployer_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_regemployer_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.regemployer_v1) {
      regemployer_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.regemployer_v1= true
  },[refetch?.regemployer_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setregistration_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:registration:AFVK:v1"
        }
      : { key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:registration:AFVK:v1" }
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
        'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:registration:AFVK:v1',
        [user],
        'pageRegistrationV1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:registration:AFVK:v1`)
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
    await updateregemployer_v1DFD(pagination)
    await regemployer_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'salary_file_overall_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecksalary_file_overall_group(true)
            }
            if(nodes?.groupName == 'dynamication' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdynamication(true)
            }
            if(nodes?.groupName == 'upd_reg_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckupd_reg_group(true)
            }
            if(nodes?.groupName == 'upd_reg_emplr_list' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckupd_reg_emplr_list(true)
            }
            if(nodes?.groupName == 'reg_emplr_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckreg_emplr_group(true)
            }
            if(nodes?.groupName == 'emplr_list' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckemplr_list(true)
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
          codeStates['salary_file_overall_group'] = salary_file_overall_group144dd;
          codeStates['setsalary_file_overall_group'] = setsalary_file_overall_group144dd;
          codeStates['dynamication'] = dynamicatione8e04;
          codeStates['setdynamication'] = setdynamicatione8e04;
          codeStates['upd_reg_group'] = upd_reg_group25c38;
          codeStates['setupd_reg_group'] = setupd_reg_group25c38;
          codeStates['upd_reg_emplr_list'] = upd_reg_emplr_listd336e;
          codeStates['setupd_reg_emplr_list'] = setupd_reg_emplr_listd336e;
          codeStates['reg_emplr_group'] = reg_emplr_group1073d;
          codeStates['setreg_emplr_group'] = setreg_emplr_group1073d;
          codeStates['emplr_list'] = emplr_list0e076;
          codeStates['setemplr_list'] = setemplr_list0e076;
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
    setregistration_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(registration_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
tab_group:tab_group12ca0.tab_group,      }
      handleArtfactRule(registration_v1?._artfactPFRule_,data,allRuleData)
    }
  },[tab_group12ca0.tab_group,])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setregistration_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checksalary_file_overall_group && initialLoad &&<Groupsalary_file_overall_group
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
    