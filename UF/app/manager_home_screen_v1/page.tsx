'use client'
import { useLanguage } from "../components/languageContext";
import React,{ useContext,useEffect,useState,useRef } from "react";
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto,te_refreshDto,te_dfDto,api_paginationDto } from '@/app/interfaces/interfaces';
import { codeExecution } from "../utils/codeExecution";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from "../globalContext";
import decodeToken from "../components/decodeToken";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import clsx from "clsx";
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Groupmanager_group  from "./Groupmanager_group/Groupmanager_group";


export default function PageManagerHomeScreenV1() {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const screenName:string = "manager home screen";
  const token:string = getCookie('token'); 
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {dashboard_for_manager_v1Props, setdashboard_for_manager_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const securityData : SecurityData = {
  "Template 1": {
    "allowedGroups": [
      "canvas",
      "manager_group",
      "daily_expense_table",
      "offsite_expense_table"
    ]
  },
  "Employee": {
    "allowedGroups": []
  },
  "Manager": {
    "allowedGroups": [
      "canvas",
      "manager_group",
      "daily_expense_table",
      "offsite_expense_table"
    ]
  }
};
  const code : string = "";
  //const language=useLanguage();
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const [dropdownData, setDropdownData] = useState<Record<string, any>>({});
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
  const [checkmanager_group,setCheckmanager_group,]=useState<boolean>(false);
  const [checkdaily_expense_table,setCheckdaily_expense_table,]=useState<boolean>(false);
  const [checkoffsite_expense_table,setCheckoffsite_expense_table,]=useState<boolean>(false);
  const {manager_group41477, setmanager_group41477} = useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table91568, setdaily_expense_table91568} = useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table1e924, setoffsite_expense_table1e924} = useContext(TotalContext) as TotalContextProps;
  const {dfd_card_data_v1Props, setdfd_card_data_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_claim_table_data_v1Props, setdfd_claim_table_data_v1Props} = useContext(TotalContext) as TotalContextProps;

  const [paginationData,setPaginationData]=useState<PaginationData>({count:10,page:1})
    const prevRefreshRef = useRef<any>({
      card_data_v1:false,
      claim_table_data_v1:false,
    });
    async function card_data_v1(pagination:any): Promise<void>{
        let card_data_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:card_data:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          card_data_v1Body["dpdKey"] = encryptionDpd;
          card_data_v1Body["method"] = encryptionMethod;
        }
        if(dashboard_for_manager_v1Props.length > 0){
          let filterData :any[] =[];
          for(let i=0;i< dashboard_for_manager_v1Props.length;i++){
            if(dashboard_for_manager_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:card_data:AFVK:v1"){
              delete dashboard_for_manager_v1Props[i].DFDkey;
              filterData.push(dashboard_for_manager_v1Props[i])
            }           
          }
          card_data_v1Body['filterData'] = filterData;
        }
        const card_data_v1Data:any=await AxiosService.post("/te/eventEmitter",card_data_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (card_data_v1Data?.data?.dataset) {
          setdfd_card_data_v1Props(card_data_v1Data?.data?.dataset?.data || []);
        }else{
         //////////////
        let dstKey:string=card_data_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");

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
      card_data_v1(paginationData)
    }else 
      prevRefreshRef.current.card_data_v1= true
  },[refetch?.card_data_v1])
    async function claim_table_data_v1(pagination:any): Promise<void>{
        let claim_table_data_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          claim_table_data_v1Body["dpdKey"] = encryptionDpd;
          claim_table_data_v1Body["method"] = encryptionMethod;
        }
        if(dashboard_for_manager_v1Props.length > 0){
          let filterData :any[] =[];
          for(let i=0;i< dashboard_for_manager_v1Props.length;i++){
            if(dashboard_for_manager_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1"){
              delete dashboard_for_manager_v1Props[i].DFDkey;
              filterData.push(dashboard_for_manager_v1Props[i])
            }           
          }
          claim_table_data_v1Body['filterData'] = filterData;
        }
        const claim_table_data_v1Data:any=await AxiosService.post("/te/eventEmitter",claim_table_data_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (claim_table_data_v1Data?.data?.dataset) {
          setdfd_claim_table_data_v1Props(claim_table_data_v1Data?.data?.dataset?.data || []);
        }else{
         //////////////
        let dstKey:string=claim_table_data_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");

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
      claim_table_data_v1(paginationData)
    }else 
      prevRefreshRef.current.claim_table_data_v1= true
  },[refetch?.claim_table_data_v1])

  async function securityCheck(): Promise<void> {
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
              key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1"  
            }
          })          
        }
        if(introspect?.data?.authenticated === false){
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct003/ag001/a001/v1';
        }
      }catch (err: any) {
        toast("The token is no longer active.", 'danger');
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct003/ag001/a001/v1';
      }
      try {
        let myAccount:any;
        if(encryptionFlagPage){
         myAccount = await AxiosService.get("/UF/myAccount-for-client",{
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
              dpdKey: encryptionDpd,
              method: encryptionMethod,
              key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1"
            }
        }) 
        }else{
          myAccount = await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1"
            }
         })          
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        let actionDetails:ActionDetails = {
  "lock": {
    "lockMode": "",
    "name": "",
    "ttl": ""
  },
  "stateTransition": {
    "sourceQueue": "",
    "sourceStatus": "",
    "targetQueue": "",
    "targetStatus": ""
  },
  "pagination": {
    "page": "1",
    "count": 1000
  },
  "encryption": {
    "isEnabled": false,
    "selectedDpd": "",
    "encryptionMethod": ""
  },
  "events": {}
};
        const pagination:any = actionDetails?.pagination;
        try{
          await card_data_v1(pagination)
          await claim_table_data_v1(pagination)
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
  }, [])
  return (
    <>
    <div className={clsx("",
        "w-full",
        isDark ? 'text-white' : 'text-black'
      )}
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
        //minHeight: '100vh',
        ...(isHighContrast && {
          fontWeight: '500',
          borderWidth: '2px'
      })
      }}>
    {securityData[accessProfile]?.allowedGroups?.includes("manager_group") && initialLoad &&<Groupmanager_group 
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          dropdownData={dropdownData} 
          setDropdownData={setDropdownData}
          encryptionFlagPageData={encryptionFlagPageData}        />}
          </div> 
    </>
  )
}
    