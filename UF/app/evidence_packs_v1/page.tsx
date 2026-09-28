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

const Groupoverall_ai_asset_registry = dynamic(() => import("./Groupoverall_ai_asset_registry/Groupoverall_ai_asset_registry"), { ssr: false });

export default function PageEvidencePacksV1({ onReady }: { onReady?: () => void } = {}) {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "AI Product Owner": {
    "blockedGroups": []
  },
  "Auditor": {
    "blockedGroups": [
      "ai_registry_tab_header",
      "gen_pack_group",
      "ai_registry_text_group_1",
      "export_pack_group",
      "ai_registry_text_group",
      "export_pack_table"
    ]
  },
  "Executive": {
    "blockedGroups": [
      "ai_registry_tab_header",
      "gen_pack_group",
      "ai_registry_text_group_1",
      "export_pack_group",
      "ai_registry_text_group",
      "export_pack_table"
    ]
  },
  "FinOps / Operation": {
    "blockedGroups": [
      "ai_registry_tab_header",
      "gen_pack_group",
      "ai_registry_text_group_1",
      "export_pack_group",
      "ai_registry_text_group",
      "export_pack_table"
    ]
  },
  "Model RIsk / Compliance": {
    "blockedGroups": [
      "ai_registry_tab_header",
      "gen_pack_group",
      "ai_registry_text_group_1",
      "export_pack_group",
      "ai_registry_text_group",
      "export_pack_table"
    ]
  },
  "Platform Administrator": {
    "blockedGroups": [
      "ai_registry_tab_header",
      "gen_pack_group",
      "ai_registry_text_group_1",
      "export_pack_group",
      "ai_registry_text_group",
      "export_pack_table"
    ]
  },
  "Security (CISO Office)": {
    "blockedGroups": [
      "ai_registry_tab_header",
      "gen_pack_group",
      "ai_registry_text_group_1",
      "export_pack_group",
      "ai_registry_text_group",
      "export_pack_table"
    ]
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "overall_ai_asset_registry": {},
  "overall_tab_group": {},
  "ai_registry_tab_header": {},
  "gen_pack_group": {
    "generate_btn": {
      "show": false
    },
    "asset_display_name": {
      "show": false
    },
    "as_at_timestamp": {
      "show": false
    },
    "sections_included": {
      "show": false
    },
    "export_format_code": {
      "show": false
    },
    "purpose_note": {
      "show": false
    }
  },
  "ai_registry_text_group_1": {
    "ai_registry_text_1": {
      "show": false
    }
  },
  "export_pack_group": {
    "refresh_button": {
      "show": false
    },
    "search": {
      "show": false
    }
  },
  "ai_registry_text_group": {
    "ai_registry_text": {
      "show": false
    }
  },
  "export_pack_table": {
    "export_id": {
      "show": false
    },
    "reference": {
      "show": false
    },
    "asset_name": {
      "show": false
    },
    "as_at_timestamp": {
      "show": false
    },
    "sections": {
      "show": false
    },
    "requested_by": {
      "show": false
    },
    "status": {
      "show": false
    },
    "view_btn": {
      "show": false
    },
    "edit_btn": {
      "show": false
    },
    "delete_btn": {
      "show": false
    }
  },
  "aaaaaaaaaaa": {},
  "bbb": {
    "asdsad": {
      "show": false
    },
    "asdasdsd": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "evidence packs";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {auditevidence_v1, setauditevidence_v1} = useContext(TotalContext) as TotalContextProps;
  const {auditevidence_v1Props, setauditevidence_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkoverall_ai_asset_registry,setCheckoverall_ai_asset_registry,]=useState<boolean>(false);
  const [checkgen_pack_group,setCheckgen_pack_group,]=useState<boolean>(false);
  const [checkai_registry_text_group_1,setCheckai_registry_text_group_1,]=useState<boolean>(false);
  const [checkexport_pack_group,setCheckexport_pack_group,]=useState<boolean>(false);
  const [checkai_registry_text_group,setCheckai_registry_text_group,]=useState<boolean>(false);
  const [checkexport_pack_table,setCheckexport_pack_table,]=useState<boolean>(false);
  const [checkbbb,setCheckbbb,]=useState<boolean>(false);
  const {overall_ai_asset_registry3c08f, setoverall_ai_asset_registry3c08f} = useContext(TotalContext) as TotalContextProps;
  const {gen_pack_groupbebe9, setgen_pack_groupbebe9} = useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group_1b5885, setai_registry_text_group_1b5885} = useContext(TotalContext) as TotalContextProps;
  const {export_pack_group738c0, setexport_pack_group738c0} = useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group1679d, setai_registry_text_group1679d} = useContext(TotalContext) as TotalContextProps;
  const {export_pack_table4a1c2, setexport_pack_table4a1c2} = useContext(TotalContext) as TotalContextProps;
  const {bbb6cbd6, setbbb6cbd6} = useContext(TotalContext) as TotalContextProps;
  const {overall_tab_group97825, setoverall_tab_group97825} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetcodenameconcatcombo_v1Props, setdfd_assetcodenameconcatcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_recentevidencepacktable_v1Props, setdfd_recentevidencepacktable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      assetcodenameconcatcombo_v1:false,
      recentevidencepacktable_v1:false,
    });
    async function assetcodenameconcatcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assetcodenameconcatcombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetCodeNameConcatCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assetcodenameconcatcombo_v1Body["dpdKey"] = encryptionDpd;
          assetcodenameconcatcombo_v1Body["method"] = encryptionMethod;
        }
        if(auditevidence_v1Props.length > 0){
          for(let i=0;i< auditevidence_v1Props.length;i++){
            if(auditevidence_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetCodeNameConcatCombo:AFVK:v1"){
              // delete auditevidence_v1Props[i].DFDkey;
              let temp=structuredClone(auditevidence_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assetcodenameconcatcombo_v1Body['filterData'] = filterData;
        }
        const assetcodenameconcatcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",assetcodenameconcatcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assetcodenameconcatcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assetcodenameconcatcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_assetcodenameconcatcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assetcodenameconcatcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assetcodenameconcatcombo_v1Data?.data?.dataset) {
           setdfd_assetcodenameconcatcombo_v1Props(
              Array.isArray(assetcodenameconcatcombo_v1Data?.data?.dataset?.data)
                 ? assetcodenameconcatcombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_assetcodenameconcatcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assetcodenameconcatcombo_v1) {
      assetcodenameconcatcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assetcodenameconcatcombo_v1= true
  },[refetch?.assetcodenameconcatcombo_v1])
    async function recentevidencepacktable_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let recentevidencepacktable_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:recentEvidencePackTable:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          recentevidencepacktable_v1Body["dpdKey"] = encryptionDpd;
          recentevidencepacktable_v1Body["method"] = encryptionMethod;
        }
        if(auditevidence_v1Props.length > 0){
          for(let i=0;i< auditevidence_v1Props.length;i++){
            if(auditevidence_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:recentEvidencePackTable:AFVK:v1"){
              // delete auditevidence_v1Props[i].DFDkey;
              let temp=structuredClone(auditevidence_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          recentevidencepacktable_v1Body['filterData'] = filterData;
        }
        const recentevidencepacktable_v1Data:any=await AxiosService.post("/te/eventEmitter",recentevidencepacktable_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=recentevidencepacktable_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(recentevidencepacktable_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_recentevidencepacktable_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_recentevidencepacktable_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (recentevidencepacktable_v1Data?.data?.dataset) {
           setdfd_recentevidencepacktable_v1Props(
              Array.isArray(recentevidencepacktable_v1Data?.data?.dataset?.data)
                 ? recentevidencepacktable_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_recentevidencepacktable_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.recentevidencepacktable_v1) {
      recentevidencepacktable_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.recentevidencepacktable_v1= true
  },[refetch?.recentevidencepacktable_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setauditevidence_v1({...result,_artfactPFRule_:rule})
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
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:auditEvidence:AFVK:v1"
        }
      : { key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:auditEvidence:AFVK:v1" }
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
        'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:auditEvidence:AFVK:v1',
        [user],
        'pageEvidencePacksV1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:auditEvidence:AFVK:v1`)
      if (!res.ok) {
        logout()
        return
      }
      //routes.refresh()

      try {
        if (myAccountRes?.__error) throw myAccountRes.__error;
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await assetcodenameconcatcombo_v1DFD(pagination)
    await recentevidencepacktable_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'overall_ai_asset_registry' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckoverall_ai_asset_registry(true)
            }
            if(nodes?.groupName == 'gen_pack_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgen_pack_group(true)
            }
            if(nodes?.groupName == 'ai_registry_text_group_1' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckai_registry_text_group_1(true)
            }
            if(nodes?.groupName == 'export_pack_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckexport_pack_group(true)
            }
            if(nodes?.groupName == 'ai_registry_text_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckai_registry_text_group(true)
            }
            if(nodes?.groupName == 'export_pack_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckexport_pack_table(true)
            }
            if(nodes?.groupName == 'bbb' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckbbb(true)
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
          codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry3c08f;
          codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry3c08f;
          codeStates['gen_pack_group'] = gen_pack_groupbebe9;
          codeStates['setgen_pack_group'] = setgen_pack_groupbebe9;
          codeStates['ai_registry_text_group_1'] = ai_registry_text_group_1b5885;
          codeStates['setai_registry_text_group_1'] = setai_registry_text_group_1b5885;
          codeStates['export_pack_group'] = export_pack_group738c0;
          codeStates['setexport_pack_group'] = setexport_pack_group738c0;
          codeStates['ai_registry_text_group'] = ai_registry_text_group1679d;
          codeStates['setai_registry_text_group'] = setai_registry_text_group1679d;
          codeStates['export_pack_table'] = export_pack_table4a1c2;
          codeStates['setexport_pack_table'] = setexport_pack_table4a1c2;
          codeStates['bbb'] = bbb6cbd6;
          codeStates['setbbb'] = setbbb6cbd6;
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
    setauditevidence_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(auditevidence_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
overall_tab_group:overall_tab_group97825.overall_tab_group,      }
      handleArtfactRule(auditevidence_v1?._artfactPFRule_,data,allRuleData)
    }
  },[overall_tab_group97825.overall_tab_group,])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setauditevidence_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkoverall_ai_asset_registry && initialLoad &&<Groupoverall_ai_asset_registry
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
    