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

const Groupacksimulatormaingroup = dynamic(() => import("./Groupacksimulatormaingroup/Groupacksimulatormaingroup"), { ssr: false });

export default function PageSimulatorV1({ onReady }: { onReady?: () => void } = {}) {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "Operational Manager": {
    "blockedGroups": [
      "canvas",
      "acksimulatormaingroup"
    ]
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
  "acksimulatormaingroup": {},
  "ack_simulator_tab_group": {},
  "op_financial_tab_header": {},
  "op_simulator_sub_group": {
    "productcode": {
      "show": false
    },
    "message_type": {
      "show": false
    },
    "date": {
      "show": false
    },
    "uuid": {
      "show": false
    },
    "status": {
      "show": false
    },
    "reject_reason": {
      "show": false
    }
  },
  "customwidgetmaingroup": {
    "customwidget": {
      "show": false
    }
  },
  "dynamicactionmaingroup": {},
  "dynamicactionsubgroup": {
    "op_financial_submit_btn": {
      "show": false
    }
  },
  "ip_financial_tab_header": {},
  "ip_simulator_sub_group": {
    "ip_productcode": {
      "show": false
    },
    "ip_message_type": {
      "show": false
    },
    "ip_date": {
      "show": false
    },
    "amount": {
      "show": false
    }
  },
  "ip_dynamicactionmaingroup": {},
  "ip_dynamicactionsubgroup": {
    "ip_financial_submit_btn": {
      "show": false
    }
  },
  "op_nf_camt110_tab_header": {},
  "op_camt110_simulator_sub_group": {
    "op_110_productcode": {
      "show": false
    },
    "op_110_message_type": {
      "show": false
    },
    "op_110_date": {
      "show": false
    },
    "op_110_uuid": {
      "show": false
    },
    "op_110_request_type": {
      "show": false
    },
    "op_110_request_reason": {
      "show": false
    }
  },
  "op_110_dynamicactionmaingroup": {},
  "op_110_dynamicactionsubgroup": {
    "op_110_submit_btn": {
      "show": false
    }
  },
  "op_nf_camt111_tab_header": {},
  "op_camt111_simulator_sub_group": {
    "op_111_productcode": {
      "show": false
    },
    "op_111_message_type": {
      "show": false
    },
    "op_111_date": {
      "show": false
    },
    "op_111_uuid": {
      "show": false
    },
    "op_111_response_status": {
      "show": false
    },
    "op_111_response_reason": {
      "show": false
    }
  },
  "op_111_dynamicactionmaingroup": {},
  "op_111_dynamicactionsubgroup": {
    "op_111_submit_btn": {
      "show": false
    }
  },
  "ip_nf_camt055_tab_header": {},
  "ip_camt055_simulator_sub_group": {
    "ip_055_productcode": {
      "show": false
    },
    "ip_055_message_type": {
      "show": false
    },
    "ip_055_date": {
      "show": false
    },
    "ip_055_uuid": {
      "show": false
    },
    "ip_055_reason_code": {
      "show": false
    },
    "ip_055_additional_info": {
      "show": false
    }
  },
  "ip_055_dynamicactionmaingroup": {},
  "ip_055_dynamicactionsubgroup": {
    "ip_055_submit_btn": {
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
  const {acksimulator_v1, setacksimulator_v1} = useContext(TotalContext) as TotalContextProps;
  const {acksimulator_v1Props, setacksimulator_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkacksimulatormaingroup,setCheckacksimulatormaingroup,]=useState<boolean>(false);
  const [checkop_simulator_sub_group,setCheckop_simulator_sub_group,]=useState<boolean>(false);
  const [checkcustomwidgetmaingroup,setCheckcustomwidgetmaingroup,]=useState<boolean>(false);
  const [checkdynamicactionmaingroup,setCheckdynamicactionmaingroup,]=useState<boolean>(false);
  const [checkdynamicactionsubgroup,setCheckdynamicactionsubgroup,]=useState<boolean>(false);
  const [checkip_simulator_sub_group,setCheckip_simulator_sub_group,]=useState<boolean>(false);
  const [checkip_dynamicactionmaingroup,setCheckip_dynamicactionmaingroup,]=useState<boolean>(false);
  const [checkip_dynamicactionsubgroup,setCheckip_dynamicactionsubgroup,]=useState<boolean>(false);
  const [checkop_camt110_simulator_sub_group,setCheckop_camt110_simulator_sub_group,]=useState<boolean>(false);
  const [checkop_110_dynamicactionmaingroup,setCheckop_110_dynamicactionmaingroup,]=useState<boolean>(false);
  const [checkop_110_dynamicactionsubgroup,setCheckop_110_dynamicactionsubgroup,]=useState<boolean>(false);
  const [checkop_camt111_simulator_sub_group,setCheckop_camt111_simulator_sub_group,]=useState<boolean>(false);
  const [checkop_111_dynamicactionmaingroup,setCheckop_111_dynamicactionmaingroup,]=useState<boolean>(false);
  const [checkop_111_dynamicactionsubgroup,setCheckop_111_dynamicactionsubgroup,]=useState<boolean>(false);
  const [checkip_camt055_simulator_sub_group,setCheckip_camt055_simulator_sub_group,]=useState<boolean>(false);
  const [checkip_055_dynamicactionmaingroup,setCheckip_055_dynamicactionmaingroup,]=useState<boolean>(false);
  const [checkip_055_dynamicactionsubgroup,setCheckip_055_dynamicactionsubgroup,]=useState<boolean>(false);
  const {acksimulatormaingroup3a007, setacksimulatormaingroup3a007} = useContext(TotalContext) as TotalContextProps;
  const {op_simulator_sub_group467ba, setop_simulator_sub_group467ba} = useContext(TotalContext) as TotalContextProps;
  const {customwidgetmaingroupcf43a, setcustomwidgetmaingroupcf43a} = useContext(TotalContext) as TotalContextProps;
  const {dynamicactionmaingroupd3a78, setdynamicactionmaingroupd3a78} = useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsubgroupa58e6, setdynamicactionsubgroupa58e6} = useContext(TotalContext) as TotalContextProps;
  const {ip_simulator_sub_groupa1dc8, setip_simulator_sub_groupa1dc8} = useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionmaingroup2f849, setip_dynamicactionmaingroup2f849} = useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionsubgroup31c5b, setip_dynamicactionsubgroup31c5b} = useContext(TotalContext) as TotalContextProps;
  const {op_camt110_simulator_sub_group6f9ed, setop_camt110_simulator_sub_group6f9ed} = useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionmaingroup4acc0, setop_110_dynamicactionmaingroup4acc0} = useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionsubgroup56a89, setop_110_dynamicactionsubgroup56a89} = useContext(TotalContext) as TotalContextProps;
  const {op_camt111_simulator_sub_group120d6, setop_camt111_simulator_sub_group120d6} = useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionmaingroupe4308, setop_111_dynamicactionmaingroupe4308} = useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionsubgroup73de7, setop_111_dynamicactionsubgroup73de7} = useContext(TotalContext) as TotalContextProps;
  const {ip_camt055_simulator_sub_group52216, setip_camt055_simulator_sub_group52216} = useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionmaingroup84550, setip_055_dynamicactionmaingroup84550} = useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionsubgroup2ae9c, setip_055_dynamicactionsubgroup2ae9c} = useContext(TotalContext) as TotalContextProps;
  const {ack_simulator_tab_group0778c, setack_simulator_tab_group0778c} = useContext(TotalContext) as TotalContextProps;
  const {dfd_messagetypesimulatorcombo_v1Props, setdfd_messagetypesimulatorcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_statussimulatorcombo_v1Props, setdfd_statussimulatorcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_ipmessagetypestimulatorcombo_v1Props, setdfd_ipmessagetypestimulatorcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfsimulatormessage_v1Props, setdfd_nfsimulatormessage_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfreqtype_v1Props, setdfd_nfreqtype_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfreqreason_v1Props, setdfd_nfreqreason_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfrespreason_v1Props, setdfd_nfrespreason_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfresptype_v1Props, setdfd_nfresptype_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfcancelreasoncombo_v1Props, setdfd_nfcancelreasoncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_rejectreasonsimulatorcombo_v1Props, setdfd_rejectreasonsimulatorcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      messagetypesimulatorcombo_v1:false,
      statussimulatorcombo_v1:false,
      ipmessagetypestimulatorcombo_v1:false,
      nfsimulatormessage_v1:false,
      nfreqtype_v1:false,
      nfreqreason_v1:false,
      nfrespreason_v1:false,
      nfresptype_v1:false,
      nfcancelreasoncombo_v1:false,
      rejectreasonsimulatorcombo_v1:false,
    });
    async function messagetypesimulatorcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let messagetypesimulatorcombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:messageTypeSimulatorCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          messagetypesimulatorcombo_v1Body["dpdKey"] = encryptionDpd;
          messagetypesimulatorcombo_v1Body["method"] = encryptionMethod;
        }
        if(acksimulator_v1Props.length > 0){
          for(let i=0;i< acksimulator_v1Props.length;i++){
            if(acksimulator_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:messageTypeSimulatorCombo:AFVK:v1"){
              // delete acksimulator_v1Props[i].DFDkey;
              let temp=structuredClone(acksimulator_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          messagetypesimulatorcombo_v1Body['filterData'] = filterData;
        }
        const messagetypesimulatorcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",messagetypesimulatorcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=messagetypesimulatorcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(messagetypesimulatorcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_messagetypesimulatorcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_messagetypesimulatorcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (messagetypesimulatorcombo_v1Data?.data?.dataset) {
           setdfd_messagetypesimulatorcombo_v1Props(
              Array.isArray(messagetypesimulatorcombo_v1Data?.data?.dataset?.data)
                 ? messagetypesimulatorcombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_messagetypesimulatorcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.messagetypesimulatorcombo_v1) {
      messagetypesimulatorcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.messagetypesimulatorcombo_v1= true
  },[refetch?.messagetypesimulatorcombo_v1])
    async function statussimulatorcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let statussimulatorcombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:statusSimulatorCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          statussimulatorcombo_v1Body["dpdKey"] = encryptionDpd;
          statussimulatorcombo_v1Body["method"] = encryptionMethod;
        }
        if(acksimulator_v1Props.length > 0){
          for(let i=0;i< acksimulator_v1Props.length;i++){
            if(acksimulator_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:statusSimulatorCombo:AFVK:v1"){
              // delete acksimulator_v1Props[i].DFDkey;
              let temp=structuredClone(acksimulator_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          statussimulatorcombo_v1Body['filterData'] = filterData;
        }
        const statussimulatorcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",statussimulatorcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=statussimulatorcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(statussimulatorcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_statussimulatorcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_statussimulatorcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (statussimulatorcombo_v1Data?.data?.dataset) {
           setdfd_statussimulatorcombo_v1Props(
              Array.isArray(statussimulatorcombo_v1Data?.data?.dataset?.data)
                 ? statussimulatorcombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_statussimulatorcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.statussimulatorcombo_v1) {
      statussimulatorcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.statussimulatorcombo_v1= true
  },[refetch?.statussimulatorcombo_v1])
    async function ipmessagetypestimulatorcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let ipmessagetypestimulatorcombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:ipmessageTypeStimulatorCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          ipmessagetypestimulatorcombo_v1Body["dpdKey"] = encryptionDpd;
          ipmessagetypestimulatorcombo_v1Body["method"] = encryptionMethod;
        }
        if(acksimulator_v1Props.length > 0){
          for(let i=0;i< acksimulator_v1Props.length;i++){
            if(acksimulator_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:ipmessageTypeStimulatorCombo:AFVK:v1"){
              // delete acksimulator_v1Props[i].DFDkey;
              let temp=structuredClone(acksimulator_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          ipmessagetypestimulatorcombo_v1Body['filterData'] = filterData;
        }
        const ipmessagetypestimulatorcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",ipmessagetypestimulatorcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=ipmessagetypestimulatorcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(ipmessagetypestimulatorcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_ipmessagetypestimulatorcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_ipmessagetypestimulatorcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (ipmessagetypestimulatorcombo_v1Data?.data?.dataset) {
           setdfd_ipmessagetypestimulatorcombo_v1Props(
              Array.isArray(ipmessagetypestimulatorcombo_v1Data?.data?.dataset?.data)
                 ? ipmessagetypestimulatorcombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_ipmessagetypestimulatorcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.ipmessagetypestimulatorcombo_v1) {
      ipmessagetypestimulatorcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.ipmessagetypestimulatorcombo_v1= true
  },[refetch?.ipmessagetypestimulatorcombo_v1])
    async function nfsimulatormessage_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let nfsimulatormessage_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfSimulatorMessage:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          nfsimulatormessage_v1Body["dpdKey"] = encryptionDpd;
          nfsimulatormessage_v1Body["method"] = encryptionMethod;
        }
        if(acksimulator_v1Props.length > 0){
          for(let i=0;i< acksimulator_v1Props.length;i++){
            if(acksimulator_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfSimulatorMessage:AFVK:v1"){
              // delete acksimulator_v1Props[i].DFDkey;
              let temp=structuredClone(acksimulator_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          nfsimulatormessage_v1Body['filterData'] = filterData;
        }
        const nfsimulatormessage_v1Data:any=await AxiosService.post("/te/eventEmitter",nfsimulatormessage_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=nfsimulatormessage_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(nfsimulatormessage_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_nfsimulatormessage_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_nfsimulatormessage_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (nfsimulatormessage_v1Data?.data?.dataset) {
           setdfd_nfsimulatormessage_v1Props(
              Array.isArray(nfsimulatormessage_v1Data?.data?.dataset?.data)
                 ? nfsimulatormessage_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_nfsimulatormessage_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.nfsimulatormessage_v1) {
      nfsimulatormessage_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.nfsimulatormessage_v1= true
  },[refetch?.nfsimulatormessage_v1])
    async function nfreqtype_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let nfreqtype_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfReqType:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          nfreqtype_v1Body["dpdKey"] = encryptionDpd;
          nfreqtype_v1Body["method"] = encryptionMethod;
        }
        if(acksimulator_v1Props.length > 0){
          for(let i=0;i< acksimulator_v1Props.length;i++){
            if(acksimulator_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfReqType:AFVK:v1"){
              // delete acksimulator_v1Props[i].DFDkey;
              let temp=structuredClone(acksimulator_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          nfreqtype_v1Body['filterData'] = filterData;
        }
        const nfreqtype_v1Data:any=await AxiosService.post("/te/eventEmitter",nfreqtype_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=nfreqtype_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(nfreqtype_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_nfreqtype_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_nfreqtype_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (nfreqtype_v1Data?.data?.dataset) {
           setdfd_nfreqtype_v1Props(
              Array.isArray(nfreqtype_v1Data?.data?.dataset?.data)
                 ? nfreqtype_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_nfreqtype_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.nfreqtype_v1) {
      nfreqtype_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.nfreqtype_v1= true
  },[refetch?.nfreqtype_v1])
    async function nfreqreason_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let nfreqreason_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfReqReason:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          nfreqreason_v1Body["dpdKey"] = encryptionDpd;
          nfreqreason_v1Body["method"] = encryptionMethod;
        }
        if(acksimulator_v1Props.length > 0){
          for(let i=0;i< acksimulator_v1Props.length;i++){
            if(acksimulator_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfReqReason:AFVK:v1"){
              // delete acksimulator_v1Props[i].DFDkey;
              let temp=structuredClone(acksimulator_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          nfreqreason_v1Body['filterData'] = filterData;
        }
        const nfreqreason_v1Data:any=await AxiosService.post("/te/eventEmitter",nfreqreason_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=nfreqreason_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(nfreqreason_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_nfreqreason_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_nfreqreason_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (nfreqreason_v1Data?.data?.dataset) {
           setdfd_nfreqreason_v1Props(
              Array.isArray(nfreqreason_v1Data?.data?.dataset?.data)
                 ? nfreqreason_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_nfreqreason_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.nfreqreason_v1) {
      nfreqreason_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.nfreqreason_v1= true
  },[refetch?.nfreqreason_v1])
    async function nfrespreason_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let nfrespreason_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfRespReason:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          nfrespreason_v1Body["dpdKey"] = encryptionDpd;
          nfrespreason_v1Body["method"] = encryptionMethod;
        }
        if(acksimulator_v1Props.length > 0){
          for(let i=0;i< acksimulator_v1Props.length;i++){
            if(acksimulator_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfRespReason:AFVK:v1"){
              // delete acksimulator_v1Props[i].DFDkey;
              let temp=structuredClone(acksimulator_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          nfrespreason_v1Body['filterData'] = filterData;
        }
        const nfrespreason_v1Data:any=await AxiosService.post("/te/eventEmitter",nfrespreason_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=nfrespreason_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(nfrespreason_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_nfrespreason_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_nfrespreason_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (nfrespreason_v1Data?.data?.dataset) {
           setdfd_nfrespreason_v1Props(
              Array.isArray(nfrespreason_v1Data?.data?.dataset?.data)
                 ? nfrespreason_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_nfrespreason_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.nfrespreason_v1) {
      nfrespreason_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.nfrespreason_v1= true
  },[refetch?.nfrespreason_v1])
    async function nfresptype_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let nfresptype_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfRespType:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          nfresptype_v1Body["dpdKey"] = encryptionDpd;
          nfresptype_v1Body["method"] = encryptionMethod;
        }
        if(acksimulator_v1Props.length > 0){
          for(let i=0;i< acksimulator_v1Props.length;i++){
            if(acksimulator_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfRespType:AFVK:v1"){
              // delete acksimulator_v1Props[i].DFDkey;
              let temp=structuredClone(acksimulator_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          nfresptype_v1Body['filterData'] = filterData;
        }
        const nfresptype_v1Data:any=await AxiosService.post("/te/eventEmitter",nfresptype_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=nfresptype_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(nfresptype_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_nfresptype_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_nfresptype_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (nfresptype_v1Data?.data?.dataset) {
           setdfd_nfresptype_v1Props(
              Array.isArray(nfresptype_v1Data?.data?.dataset?.data)
                 ? nfresptype_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_nfresptype_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.nfresptype_v1) {
      nfresptype_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.nfresptype_v1= true
  },[refetch?.nfresptype_v1])
    async function nfcancelreasoncombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let nfcancelreasoncombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfCancelReasonCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          nfcancelreasoncombo_v1Body["dpdKey"] = encryptionDpd;
          nfcancelreasoncombo_v1Body["method"] = encryptionMethod;
        }
        if(acksimulator_v1Props.length > 0){
          for(let i=0;i< acksimulator_v1Props.length;i++){
            if(acksimulator_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfCancelReasonCombo:AFVK:v1"){
              // delete acksimulator_v1Props[i].DFDkey;
              let temp=structuredClone(acksimulator_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          nfcancelreasoncombo_v1Body['filterData'] = filterData;
        }
        const nfcancelreasoncombo_v1Data:any=await AxiosService.post("/te/eventEmitter",nfcancelreasoncombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=nfcancelreasoncombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(nfcancelreasoncombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_nfcancelreasoncombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_nfcancelreasoncombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (nfcancelreasoncombo_v1Data?.data?.dataset) {
           setdfd_nfcancelreasoncombo_v1Props(
              Array.isArray(nfcancelreasoncombo_v1Data?.data?.dataset?.data)
                 ? nfcancelreasoncombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_nfcancelreasoncombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.nfcancelreasoncombo_v1) {
      nfcancelreasoncombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.nfcancelreasoncombo_v1= true
  },[refetch?.nfcancelreasoncombo_v1])
    async function rejectreasonsimulatorcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let rejectreasonsimulatorcombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:rejectReasonSimulatorCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          rejectreasonsimulatorcombo_v1Body["dpdKey"] = encryptionDpd;
          rejectreasonsimulatorcombo_v1Body["method"] = encryptionMethod;
        }
        if(acksimulator_v1Props.length > 0){
          for(let i=0;i< acksimulator_v1Props.length;i++){
            if(acksimulator_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:rejectReasonSimulatorCombo:AFVK:v1"){
              // delete acksimulator_v1Props[i].DFDkey;
              let temp=structuredClone(acksimulator_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          rejectreasonsimulatorcombo_v1Body['filterData'] = filterData;
        }
        const rejectreasonsimulatorcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",rejectreasonsimulatorcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=rejectreasonsimulatorcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(rejectreasonsimulatorcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_rejectreasonsimulatorcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_rejectreasonsimulatorcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (rejectreasonsimulatorcombo_v1Data?.data?.dataset) {
           setdfd_rejectreasonsimulatorcombo_v1Props(
              Array.isArray(rejectreasonsimulatorcombo_v1Data?.data?.dataset?.data)
                 ? rejectreasonsimulatorcombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_rejectreasonsimulatorcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.rejectreasonsimulatorcombo_v1) {
      rejectreasonsimulatorcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.rejectreasonsimulatorcombo_v1= true
  },[refetch?.rejectreasonsimulatorcombo_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setacksimulator_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:ackSimulator:AFVK:v1"
        }
      : { key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:ackSimulator:AFVK:v1" }
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
        'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:ackSimulator:AFVK:v1',
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
      const basePath = getPublicEnv('NEXT_PUBLIC_BASE_PATH');
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:ackSimulator:AFVK:v1`)
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
    await messagetypesimulatorcombo_v1DFD(pagination)
    await statussimulatorcombo_v1DFD(pagination)
    await ipmessagetypestimulatorcombo_v1DFD(pagination)
    await nfsimulatormessage_v1DFD(pagination)
    await nfreqtype_v1DFD(pagination)
    await nfreqreason_v1DFD(pagination)
    await nfrespreason_v1DFD(pagination)
    await nfresptype_v1DFD(pagination)
    await nfcancelreasoncombo_v1DFD(pagination)
    await rejectreasonsimulatorcombo_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'acksimulatormaingroup' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckacksimulatormaingroup(true)
            }
            if(nodes?.groupName == 'op_simulator_sub_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckop_simulator_sub_group(true)
            }
            if(nodes?.groupName == 'customwidgetmaingroup' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcustomwidgetmaingroup(true)
            }
            if(nodes?.groupName == 'dynamicactionmaingroup' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdynamicactionmaingroup(true)
            }
            if(nodes?.groupName == 'dynamicactionsubgroup' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdynamicactionsubgroup(true)
            }
            if(nodes?.groupName == 'ip_simulator_sub_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckip_simulator_sub_group(true)
            }
            if(nodes?.groupName == 'ip_dynamicactionmaingroup' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckip_dynamicactionmaingroup(true)
            }
            if(nodes?.groupName == 'ip_dynamicactionsubgroup' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckip_dynamicactionsubgroup(true)
            }
            if(nodes?.groupName == 'op_camt110_simulator_sub_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckop_camt110_simulator_sub_group(true)
            }
            if(nodes?.groupName == 'op_110_dynamicactionmaingroup' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckop_110_dynamicactionmaingroup(true)
            }
            if(nodes?.groupName == 'op_110_dynamicactionsubgroup' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckop_110_dynamicactionsubgroup(true)
            }
            if(nodes?.groupName == 'op_camt111_simulator_sub_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckop_camt111_simulator_sub_group(true)
            }
            if(nodes?.groupName == 'op_111_dynamicactionmaingroup' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckop_111_dynamicactionmaingroup(true)
            }
            if(nodes?.groupName == 'op_111_dynamicactionsubgroup' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckop_111_dynamicactionsubgroup(true)
            }
            if(nodes?.groupName == 'ip_camt055_simulator_sub_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckip_camt055_simulator_sub_group(true)
            }
            if(nodes?.groupName == 'ip_055_dynamicactionmaingroup' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckip_055_dynamicactionmaingroup(true)
            }
            if(nodes?.groupName == 'ip_055_dynamicactionsubgroup' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckip_055_dynamicactionsubgroup(true)
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
          codeStates['acksimulatormaingroup'] = acksimulatormaingroup3a007;
          codeStates['setacksimulatormaingroup'] = setacksimulatormaingroup3a007;
          codeStates['op_simulator_sub_group'] = op_simulator_sub_group467ba;
          codeStates['setop_simulator_sub_group'] = setop_simulator_sub_group467ba;
          codeStates['customwidgetmaingroup'] = customwidgetmaingroupcf43a;
          codeStates['setcustomwidgetmaingroup'] = setcustomwidgetmaingroupcf43a;
          codeStates['dynamicactionmaingroup'] = dynamicactionmaingroupd3a78;
          codeStates['setdynamicactionmaingroup'] = setdynamicactionmaingroupd3a78;
          codeStates['dynamicactionsubgroup'] = dynamicactionsubgroupa58e6;
          codeStates['setdynamicactionsubgroup'] = setdynamicactionsubgroupa58e6;
          codeStates['ip_simulator_sub_group'] = ip_simulator_sub_groupa1dc8;
          codeStates['setip_simulator_sub_group'] = setip_simulator_sub_groupa1dc8;
          codeStates['ip_dynamicactionmaingroup'] = ip_dynamicactionmaingroup2f849;
          codeStates['setip_dynamicactionmaingroup'] = setip_dynamicactionmaingroup2f849;
          codeStates['ip_dynamicactionsubgroup'] = ip_dynamicactionsubgroup31c5b;
          codeStates['setip_dynamicactionsubgroup'] = setip_dynamicactionsubgroup31c5b;
          codeStates['op_camt110_simulator_sub_group'] = op_camt110_simulator_sub_group6f9ed;
          codeStates['setop_camt110_simulator_sub_group'] = setop_camt110_simulator_sub_group6f9ed;
          codeStates['op_110_dynamicactionmaingroup'] = op_110_dynamicactionmaingroup4acc0;
          codeStates['setop_110_dynamicactionmaingroup'] = setop_110_dynamicactionmaingroup4acc0;
          codeStates['op_110_dynamicactionsubgroup'] = op_110_dynamicactionsubgroup56a89;
          codeStates['setop_110_dynamicactionsubgroup'] = setop_110_dynamicactionsubgroup56a89;
          codeStates['op_camt111_simulator_sub_group'] = op_camt111_simulator_sub_group120d6;
          codeStates['setop_camt111_simulator_sub_group'] = setop_camt111_simulator_sub_group120d6;
          codeStates['op_111_dynamicactionmaingroup'] = op_111_dynamicactionmaingroupe4308;
          codeStates['setop_111_dynamicactionmaingroup'] = setop_111_dynamicactionmaingroupe4308;
          codeStates['op_111_dynamicactionsubgroup'] = op_111_dynamicactionsubgroup73de7;
          codeStates['setop_111_dynamicactionsubgroup'] = setop_111_dynamicactionsubgroup73de7;
          codeStates['ip_camt055_simulator_sub_group'] = ip_camt055_simulator_sub_group52216;
          codeStates['setip_camt055_simulator_sub_group'] = setip_camt055_simulator_sub_group52216;
          codeStates['ip_055_dynamicactionmaingroup'] = ip_055_dynamicactionmaingroup84550;
          codeStates['setip_055_dynamicactionmaingroup'] = setip_055_dynamicactionmaingroup84550;
          codeStates['ip_055_dynamicactionsubgroup'] = ip_055_dynamicactionsubgroup2ae9c;
          codeStates['setip_055_dynamicactionsubgroup'] = setip_055_dynamicactionsubgroup2ae9c;
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
    setacksimulator_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(acksimulator_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
ack_simulator_tab_group:ack_simulator_tab_group0778c.ack_simulator_tab_group,      }
      handleArtfactRule(acksimulator_v1?._artfactPFRule_,data,allRuleData)
    }
  },[ack_simulator_tab_group0778c.ack_simulator_tab_group,])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setacksimulator_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkacksimulatormaingroup && initialLoad &&<Groupacksimulatormaingroup
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
    