'use client'
import React,{ useContext,useEffect,useState,useRef } from "react";
import { AxiosService } from '@/app/components/axiosService';
import { te_refreshDto,api_paginationDto } from '@/app/interfaces/interfaces';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from "../globalContext";
import decodeToken from "../components/decodeToken";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode } from "@/types/global";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import clsx from "clsx";
import dynamic from 'next/dynamic';
const Groupoverall_group = dynamic(() => import("./Groupoverall_group/Groupoverall_group"), { ssr: false });


export default function PageLeaveManagementV1() {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "CXO": {
    "blockedGroups": []
  },
  "HR Manager": {
    "blockedGroups": []
  },
  "Info Security Officer": {
    "blockedGroups": []
  },
  "Employee": {
    "blockedGroups": []
  },
  "IT Manager": {
    "blockedGroups": []
  },
  "Operation Staff": {
    "blockedGroups": []
  },
  "Auditor": {
    "blockedGroups": []
  },
  "Operation Manager": {
    "blockedGroups": []
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "overall_group": {
    "leave_management": {
      "show": false
    },
    "search_button": {
      "show": false
    }
  },
  "tab_group": {},
  "leave_request_table": {},
  "emp_table_group": {},
  "leave_req_tables": {
    "employee_id": {
      "show": false
    },
    "employee_code": {
      "show": false
    },
    "emp_number": {
      "show": false
    },
    "full_name": {
      "show": false
    },
    "reporting_manager_id": {
      "show": false
    },
    "available_leave": {
      "show": false
    },
    "bt_view": {
      "show": false
    }
  },
  "approval_pending": {},
  "leave_approval_pending_group": {},
  "approval_pending_table": {
    "leave_req_id": {
      "show": false
    },
    "leave_request_number": {
      "show": false
    },
    "full_name": {
      "show": false
    },
    "start_date": {
      "show": false
    },
    "end_date": {
      "show": false
    },
    "days_requested": {
      "show": false
    },
    "trs_event_process_status": {
      "show": false
    },
    "view_bt": {
      "show": false
    }
  }
}
  const token:string = getCookie('token'); 
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "leave management";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {leaverequest_v1, setleaverequest_v1} = useContext(TotalContext) as TotalContextProps;
  const {leaverequest_v1Props, setleaverequest_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkoverall_group,setCheckoverall_group,]=useState<boolean>(false);
  const [checkemp_table_group,setCheckemp_table_group,]=useState<boolean>(false);
  const [checkleave_req_tables,setCheckleave_req_tables,]=useState<boolean>(false);
  const [checkleave_approval_pending_group,setCheckleave_approval_pending_group,]=useState<boolean>(false);
  const [checkapproval_pending_table,setCheckapproval_pending_table,]=useState<boolean>(false);
  const {overall_group3fa8c, setoverall_group3fa8c} = useContext(TotalContext) as TotalContextProps;
  const {emp_table_group0a9cd, setemp_table_group0a9cd} = useContext(TotalContext) as TotalContextProps;
  const {leave_req_tablesbb32b, setleave_req_tablesbb32b} = useContext(TotalContext) as TotalContextProps;
  const {leave_approval_pending_group05215, setleave_approval_pending_group05215} = useContext(TotalContext) as TotalContextProps;
  const {approval_pending_tablee294f, setapproval_pending_tablee294f} = useContext(TotalContext) as TotalContextProps;
  const {tab_groupfe908, settab_groupfe908} = useContext(TotalContext) as TotalContextProps;
  const {dfd_leaverequesttab_v1Props, setdfd_leaverequesttab_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_leaveapprovalpendingtab_v1Props, setdfd_leaveapprovalpendingtab_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      leaverequesttab_v1:false,
      leaveapprovalpendingtab_v1:false,
    });
    async function leaverequesttab_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let leaverequesttab_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:leaveRequestTab:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          leaverequesttab_v1Body["dpdKey"] = encryptionDpd;
          leaverequesttab_v1Body["method"] = encryptionMethod;
        }
        if(leaverequest_v1Props.length > 0){
          for(let i=0;i< leaverequest_v1Props.length;i++){
            if(leaverequest_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:leaveRequestTab:AFVK:v1"){
              // delete leaverequest_v1Props[i].DFDkey;
              let temp=structuredClone(leaverequest_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          leaverequesttab_v1Body['filterData'] = filterData;
        }
        const leaverequesttab_v1Data:any=await AxiosService.post("/te/eventEmitter",leaverequesttab_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=leaverequesttab_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(leaverequesttab_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_leaverequesttab_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_leaverequesttab_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (leaverequesttab_v1Data?.data?.dataset) {
           setdfd_leaverequesttab_v1Props(
              Array.isArray(leaverequesttab_v1Data?.data?.dataset?.data)
                 ? leaverequesttab_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_leaverequesttab_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.leaverequesttab_v1) {
      leaverequesttab_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.leaverequesttab_v1= true
  },[refetch?.leaverequesttab_v1])
    async function leaveapprovalpendingtab_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let leaveapprovalpendingtab_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:leaveApprovalPendingTab:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          leaveapprovalpendingtab_v1Body["dpdKey"] = encryptionDpd;
          leaveapprovalpendingtab_v1Body["method"] = encryptionMethod;
        }
        if(leaverequest_v1Props.length > 0){
          for(let i=0;i< leaverequest_v1Props.length;i++){
            if(leaverequest_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:leaveApprovalPendingTab:AFVK:v1"){
              // delete leaverequest_v1Props[i].DFDkey;
              let temp=structuredClone(leaverequest_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          leaveapprovalpendingtab_v1Body['filterData'] = filterData;
        }
        const leaveapprovalpendingtab_v1Data:any=await AxiosService.post("/te/eventEmitter",leaveapprovalpendingtab_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=leaveapprovalpendingtab_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(leaveapprovalpendingtab_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_leaveapprovalpendingtab_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_leaveapprovalpendingtab_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (leaveapprovalpendingtab_v1Data?.data?.dataset) {
           setdfd_leaveapprovalpendingtab_v1Props(
              Array.isArray(leaveapprovalpendingtab_v1Data?.data?.dataset?.data)
                 ? leaveapprovalpendingtab_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_leaveapprovalpendingtab_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.leaveapprovalpendingtab_v1) {
      leaveapprovalpendingtab_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.leaveapprovalpendingtab_v1= true
  },[refetch?.leaveapprovalpendingtab_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setleaverequest_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const data: any = await fetchBatchData(
      'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leaveRequest:AFVK:v1',
      [user],
      'pageLeaveManagementV1',
      token
    )
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
      try {
        let introspect:any;
        if(encryptionFlagPage){
           introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              dpdKey: encryptionDpd,
              method: encryptionMethod,
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leaveRequest:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leaveRequest:AFVK:v1"  
            }
          })          
        }
        if(introspect?.data?.authenticated === false){
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct006/ecp/hrm/v1';
        }
      }catch (err: any) {
        toast("The token is no longer active.", 'danger');
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct006/ecp/hrm/v1';
      }
      try {
        if(encryptionFlagPage){
          await AxiosService.get("/UF/myAccount-for-client",{
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
              dpdKey: encryptionDpd,
              method: encryptionMethod,
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leaveRequest:AFVK:v1"
            }
        })
        }else{
          await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leaveRequest:AFVK:v1"
            }
         })
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await leaverequesttab_v1DFD(pagination)
    await leaveapprovalpendingtab_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'overall_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckoverall_group(true)
            }
            if(nodes?.groupName == 'emp_table_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckemp_table_group(true)
            }
            if(nodes?.groupName == 'leave_req_tables' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckleave_req_tables(true)
            }
            if(nodes?.groupName == 'leave_approval_pending_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckleave_approval_pending_group(true)
            }
            if(nodes?.groupName == 'approval_pending_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckapproval_pending_table(true)
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
          codeStates['overall_group'] = overall_group3fa8c;
          codeStates['setoverall_group'] = setoverall_group3fa8c;
          codeStates['emp_table_group'] = emp_table_group0a9cd;
          codeStates['setemp_table_group'] = setemp_table_group0a9cd;
          codeStates['leave_req_tables'] = leave_req_tablesbb32b;
          codeStates['setleave_req_tables'] = setleave_req_tablesbb32b;
          codeStates['leave_approval_pending_group'] = leave_approval_pending_group05215;
          codeStates['setleave_approval_pending_group'] = setleave_approval_pending_group05215;
          codeStates['approval_pending_table'] = approval_pending_tablee294f;
          codeStates['setapproval_pending_table'] = setapproval_pending_tablee294f;
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
    securityCheck();
    handleOnload();
    setleaverequest_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(leaverequest_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
tab_group:tab_groupfe908.tab_group,      }
      handleArtfactRule(leaverequest_v1?._artfactPFRule_,data,allRuleData)
    }
  },[tab_groupfe908.tab_group,])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setleaverequest_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkoverall_group && initialLoad &&<Groupoverall_group
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
    