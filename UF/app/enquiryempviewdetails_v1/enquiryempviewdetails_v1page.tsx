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

const Groupgrp_emp_view_details = dynamic(() => import("./Groupgrp_emp_view_details/Groupgrp_emp_view_details"), { ssr: false });

export default function PageEnquiryempviewdetailsV1({ onReady }: { onReady?: () => void } = {}) {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "Business Team": {
    "blockedGroups": []
  },
  "IT Team": {
    "blockedGroups": []
  },
  "Operation Team": {
    "blockedGroups": []
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "grp_emp_view_details": {
    "hdr_view_details": {
      "show": false
    },
    "divider": {
      "show": false
    }
  },
  "grp_emp_details": {
    "hdr_emp_details": {
      "show": false
    },
    "lbl_s_channel_code": {
      "show": false
    },
    "lbl_s_leave": {
      "show": false
    },
    "lbl_s_inside_cntry": {
      "show": false
    },
    "lbl_ch_code": {
      "show": false
    },
    "lbl_leave": {
      "show": false
    },
    "lbl_inside_cntry": {
      "show": false
    },
    "divider1": {
      "show": false
    },
    "lbl_s_sal_type": {
      "show": false
    },
    "lbl_s_wrk_emid": {
      "show": false
    },
    "lbl_s_pas_num": {
      "show": false
    },
    "lbl_sal_type": {
      "show": false
    },
    "lbl_wrk_emid": {
      "show": false
    },
    "lbl_pass_num": {
      "show": false
    },
    "divider3": {
      "show": false
    },
    "lbl_s_cmp_code": {
      "show": false
    },
    "lbl_s_persn_code": {
      "show": false
    },
    "lbl_s_agntcode": {
      "show": false
    },
    "lbl_cmp_cde": {
      "show": false
    },
    "lbl_prsn_code": {
      "show": false
    },
    "lbl_angnt_cde": {
      "show": false
    },
    "divider2": {
      "show": false
    },
    "lbl_s_wrk_iban": {
      "show": false
    },
    "lbl_s_remarks": {
      "show": false
    },
    "lblwrk_iban": {
      "show": false
    },
    "lbl_rmks": {
      "show": false
    }
  },
  "grp_other_details": {
    "hdr_sal_details": {
      "show": false
    },
    "lbl_s_year": {
      "show": false
    },
    "lbl_s_prd": {
      "show": false
    },
    "lbl_s_frm_dte": {
      "show": false
    },
    "lbl_year": {
      "show": false
    },
    "lbl_prd": {
      "show": false
    },
    "lbl_from_date": {
      "show": false
    },
    "divider4": {
      "show": false
    },
    "lbl_s_to_dte": {
      "show": false
    },
    "lbl_s_sal_pymt_date": {
      "show": false
    },
    "lbl_s_days_paid": {
      "show": false
    },
    "lbl_to_date": {
      "show": false
    },
    "lbl_file_id": {
      "show": false
    },
    "lbl_days_paid": {
      "show": false
    },
    "divider5": {
      "show": false
    },
    "lbl_s_fix_in": {
      "show": false
    },
    "lbl_s_in_var": {
      "show": false
    },
    "lbl_s_to_sal": {
      "show": false
    },
    "lbl_fix_in": {
      "show": false
    },
    "lbl_in_var": {
      "show": false
    },
    "lbl_to_sal": {
      "show": false
    },
    "divider6": {
      "show": false
    },
    "lbl_s_to_bene": {
      "show": false
    },
    "lbl_s_to_deduction": {
      "show": false
    },
    "lbl_s_to_allow": {
      "show": false
    },
    "lbl_to_bene": {
      "show": false
    },
    "lbl_to_deduction": {
      "show": false
    },
    "lbl_to_allo": {
      "show": false
    },
    "divider7": {
      "show": false
    },
    "lbl_s_to_incen": {
      "show": false
    },
    "lbl_toince": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "enquiry";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {enquiryempviewdetails_v1, setenquiryempviewdetails_v1} = useContext(TotalContext) as TotalContextProps;
  const {enquiryempviewdetails_v1Props, setenquiryempviewdetails_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkgrp_emp_view_details,setCheckgrp_emp_view_details,]=useState<boolean>(false);
  const [checkgrp_emp_details,setCheckgrp_emp_details,]=useState<boolean>(false);
  const [checkgrp_other_details,setCheckgrp_other_details,]=useState<boolean>(false);
  const {grp_emp_view_details7cca5, setgrp_emp_view_details7cca5} = useContext(TotalContext) as TotalContextProps;
  const {grp_emp_details5bbf3, setgrp_emp_details5bbf3} = useContext(TotalContext) as TotalContextProps;
  const {grp_other_details0dea3, setgrp_other_details0dea3} = useContext(TotalContext) as TotalContextProps;
  const {dfd_enquiryemployersalaryrpt_v1Props, setdfd_enquiryemployersalaryrpt_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      enquiryemployersalaryrpt_v1:false,
    });
    async function enquiryemployersalaryrpt_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let enquiryemployersalaryrpt_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          enquiryemployersalaryrpt_v1Body["dpdKey"] = encryptionDpd;
          enquiryemployersalaryrpt_v1Body["method"] = encryptionMethod;
        }
        if(enquiryempviewdetails_v1Props.length > 0){
          for(let i=0;i< enquiryempviewdetails_v1Props.length;i++){
            if(enquiryempviewdetails_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1"){
              // delete enquiryempviewdetails_v1Props[i].DFDkey;
              let temp=structuredClone(enquiryempviewdetails_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          enquiryemployersalaryrpt_v1Body['filterData'] = filterData;
        }
        const enquiryemployersalaryrpt_v1Data:any=await AxiosService.post("/te/eventEmitter",enquiryemployersalaryrpt_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=enquiryemployersalaryrpt_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(enquiryemployersalaryrpt_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_enquiryemployersalaryrpt_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_enquiryemployersalaryrpt_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (enquiryemployersalaryrpt_v1Data?.data?.dataset) {
           setdfd_enquiryemployersalaryrpt_v1Props(
              Array.isArray(enquiryemployersalaryrpt_v1Data?.data?.dataset?.data)
                 ? enquiryemployersalaryrpt_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_enquiryemployersalaryrpt_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.enquiryemployersalaryrpt_v1) {
      enquiryemployersalaryrpt_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.enquiryemployersalaryrpt_v1= true
  },[refetch?.enquiryemployersalaryrpt_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setenquiryempviewdetails_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiryEmpViewDetails:AFVK:v1"
        }
      : { key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiryEmpViewDetails:AFVK:v1" }
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
        'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiryEmpViewDetails:AFVK:v1',
        [user],
        'pageEnquiryempviewdetailsV1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiryEmpViewDetails:AFVK:v1`)
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
    await enquiryemployersalaryrpt_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'grp_emp_view_details' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrp_emp_view_details(true)
            }
            if(nodes?.groupName == 'grp_emp_details' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrp_emp_details(true)
            }
            if(nodes?.groupName == 'grp_other_details' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrp_other_details(true)
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
          codeStates['grp_emp_view_details'] = grp_emp_view_details7cca5;
          codeStates['setgrp_emp_view_details'] = setgrp_emp_view_details7cca5;
          codeStates['grp_emp_details'] = grp_emp_details5bbf3;
          codeStates['setgrp_emp_details'] = setgrp_emp_details5bbf3;
          codeStates['grp_other_details'] = grp_other_details0dea3;
          codeStates['setgrp_other_details'] = setgrp_other_details0dea3;
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
    setenquiryempviewdetails_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(enquiryempviewdetails_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(enquiryempviewdetails_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setenquiryempviewdetails_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkgrp_emp_view_details && initialLoad &&<Groupgrp_emp_view_details
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
    