'use client'
import React, { useContext,useEffect, useState } from 'react';
import { codeExecution } from "../utils/codeExecution";
import { Multiply, ThreeLineIcon } from '../components/svgApplication';
import { AxiosService } from '../components/axiosService';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import decodeToken from "../components/decodeToken";
import { te_refreshDto } from '../interfaces/interfaces';
import { TotalContext, TotalContextProps } from '../globalContext';
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useTheme } from '@/hooks/useTheme';
import clsx from "clsx";
import { fetchBatchData } from '../utils/Orchestration';
import { DecodedToken,PrimaryTableData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Groupgroup  from "./Groupgroup/Groupgroup";


type ReportItem = {
  displayName: string
  referanceName: string
  referencePath: string
  nodeId: string
  key: string
  type: string
  children?: ReportItem[]
}

type FilterDataItem = Record<string, any> & { nodeId: string }

const PageReportV1 = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  let code:string="";
  const toast:Function=useInfoMsg();
  const [generatedPayload, setGeneratedPayload] = useState<any[]>([])
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const [dropdownData, setDropdownData] = useState<Record<string, any>>({});
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const token:string = getCookie('token'); 
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const user: string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {paginationDetails, setpaginationDetails} = useContext(TotalContext) as TotalContextProps;
  const {myreport_v1Props, setmyreport_v1Props} = useContext(TotalContext) as TotalContextProps;
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const artifactName: string =
    "CK:CT001:FNGK:AF:FNK:UF-UFR:CATK:TGW01:AFGK:TGW004:AFK:myreport:AFVK:v1".split(
      ':'
    )[11]
  const [controlData, setControlData] = useState<any>({});
  const [groupData, setGroupData] = useState<any>({});
  const encryptionFlagPage: boolean = false|| encAppFalg.flag;
  const { property } = useContext(TotalContext) as TotalContextProps
  let brandcolor: string = property?.brandColor ?? '#0736c4'
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encAppFalg.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encAppFalg.method;
  let encryptionFlagPageData :EncryptionFlagPageData ={
    "flag":encryptionFlagPage,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  }
  const [checkgroup,setCheckgroup,]=useState<boolean>(false);
  const {group6c7b4, setgroup6c7b4} = useContext(TotalContext) as TotalContextProps;
  const {dfd_country_code_dfd_v1Props, setdfd_country_code_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [dfd_country_code_dfd_v1Params, setdfd_country_code_dfd_v1Params] = React.useState<any>({
    "key":"CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TGW01:AFGK:TGW004:AFK:country_code_dfd:AFVK:v1:",
    "count":1000,
    "page":1,
    "refreshFlag":"Y",
    "reportFlag":true
    });
  const [pdfUrl, setPdfUrl] = useState<string | null>(
    'https://www.orimi.com/pdf-test.pdf'
  )

  const reportData:ReportItem[] = []

  const capitalizeEachWord = (str: string): string => {
    if (!str) return ''
    return str
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  }

  // Initialize payload with empty values
  useEffect(() => {
      setdfd_country_code_dfd_v1Props([])
    if (reportData.length) {
      const initPayload: any[] = extractFilterDataByKey(reportData)
      setGeneratedPayload(initPayload)
    }
  }, [])

  // Recursive function to extract filterData grouped by key
  const extractFilterDataByKey = (items: ReportItem[]): any[] => {
    const keyMap: Record<string, FilterDataItem[]> = {}

    const recurse = (item: ReportItem, key: string) => {
      if (!keyMap[key]) keyMap[key] = []

      if (item.type === 'object' && item.children) {
        item.children.forEach(child => recurse(child, key))
      } else {
        keyMap[key].push({ nodeId: item.nodeId, [item.referencePath]: '' })
      }
    }

    items.forEach(item => recurse(item, item.key))

    return Object.keys(keyMap).map(k => ({
      key: k,
      refreshFlag: 'Y',
      count: 1000,
      page: 1,
      filterData: keyMap[k],
      reportFlag:true
    }))
  }

  const mergeFilterDataByNodeId = (payload: any): any[] => {
  return payload.map((p: any) => {
    const mergedMap: Record<string, any> = {}

    p.filterData.forEach((fd: any) => {
      const nodeId: string = fd.nodeId
      if (!mergedMap[nodeId]) {
        mergedMap[nodeId] = { nodeId }
      }
      Object.keys(fd).forEach(k => {
        if (k !== 'nodeId') {
          mergedMap[nodeId][k] = fd[k]
        }
      })
    })

    return {
      ...p,
      filterData: Object.values(mergedMap)
    }
  })
}

  const handleInputChange = (
    key: string,
    referencePath: string,
    value: string,
    type: string
  ): void => {
    if (type === 'number' && isNaN(Number(value))) {
      return
    }
    setGeneratedPayload(prev => {
      const updatedPayload = prev.map(p => {
        if (p.key !== key) return p
        const updatedFilterData = p.filterData.map((fd: any) => {
          if (fd.hasOwnProperty(referencePath)) {
            return { ...fd, [referencePath]: value }
          }
          return fd
        })
        return { ...p, filterData: updatedFilterData }
      })

      // Split into v1 and v2 live
      const cleanedPayload = updatedPayload.map(p => ({
        ...p,
        filterData: p.filterData
          .map((fd: any) => {
            const cleanFd: Record<string, any> = { nodeId: fd.nodeId }
            for (const k in fd) {
              if (k !== 'nodeId' && fd[k] !== '') cleanFd[k] = fd[k]
            }
            return Object.keys(cleanFd).length > 1 ? cleanFd : null
          })
          .filter(Boolean)
      }))

      const updatedCleanedPayload: any[] = mergeFilterDataByNodeId(cleanedPayload)

     const country_code_dfd_v1Payload= updatedCleanedPayload.find((p: any) => p.key.split(':')[11].toLowerCase() === "country_code_dfd" && p.key.split(':')[11].toLowerCase() === "country_code_dfd") || null;
     setdfd_country_code_dfd_v1Params(country_code_dfd_v1Payload)


      return updatedPayload
    })
  }
  

// Recursive UI rendering
 const renderItem = (item: ReportItem, index: number): React.JSX.Element => {
    if (item.type === 'object' && item.children) {
      return (
        <div
          key={index}
          style={{
            backgroundColor: brandcolor,
            borderColor: 'var(--g-color-line-generic)'
          }}
          className='flex w-full flex-col gap-[10px] rounded-lg border px-[10px] py-[10px]'
        >
          <Text variant='subheader-3'>
            {capitalizeEachWord(item.displayName || item.referanceName)}
          </Text>
          {item.children.map((child, childIndex) =>
            renderItem(child, childIndex)
          )}
        </div>
      )
    } else {
      const value: string =
        generatedPayload
          .find(p => p.key === item.key)
          ?.filterData.find((fd: any) =>
            fd.hasOwnProperty(item.referencePath)
          )?.[item.referencePath] || ''

      return (
        <div
          key={item.referencePath}
          className='flex w-full flex-col rounded-lg border px-[12px] py-[5px]'
          style={{
            backgroundColor: 'var(--g-color-base-background)',
            color: 'var(--g-color-text-primary)',
            borderColor: 'var(--g-color-line-generic)'
          }}
        >
          <Text variant='code-2'>
            {capitalizeEachWord(item.displayName || item.referanceName)}
          </Text>
          <input
            style={{
              backgroundColor: 'var(--g-color-base-background)',
              color: 'var(--g-color-text-primary)',
              borderColor: 'var(--g-color-line-generic)',
              outline: 'none'
            }}
            placeholder={item.displayName || item.referanceName}
            value={value}
            onChange={e =>
              handleInputChange(
                item.key,
                item.referencePath,
                e.target.value,
                item.type
              )
            }
            className='rounded-lg'
          />
        </div>
      )
    }
  }


  const handleClick = async (): Promise<void> => {
    try {
        const res = await AxiosService.post(
        '/te/eventEmitter',
        dfd_country_code_dfd_v1Params,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('token')}`
          }
        }
      )
      if(res.status === 201){
        setdfd_country_code_dfd_v1Props(res.data.dataset.data || {})
      } 
    } catch (error) {
      console.log(error)
    }
  }

  async function securityCheck(): Promise<void> {
    const data: any = await fetchBatchData(
      "CK:CT001:FNGK:AF:FNK:UF-UFR:CATK:TGW01:AFGK:TGW004:AFK:myreport:AFVK:v1",
      [user],
      "pageReportV1",
      token
    )
    setGroupData(data.groupData || {});
    setControlData(data.controlData || {});
    const orchestrationData: any = data.pageData
    const uf_dfKey:string[] = orchestrationData?.DFkeys;
    const security:string = orchestrationData?.security; 
    const allowedGroup:any[] = orchestrationData?.allowedGroup||[];
    code = orchestrationData?.code;
    const pagination:Record<string, any> = orchestrationData?.action?.pagination;
    setpaginationDetails({
      page: +orchestrationData?.action?.pagination?.page || 0,
      pageSize: +orchestrationData?.action?.pagination?.count || 0
    })
    let encryptionData:Record<string, any> = {};
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
              key:"CK:CT001:FNGK:AF:FNK:UF-UFR:CATK:TGW01:AFGK:TGW004:AFK:myreport:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT001:FNGK:AF:FNK:UF-UFR:CATK:TGW01:AFGK:TGW004:AFK:myreport:AFVK:v1"  
            }
          })          
        }
        if(introspect?.data?.authenticated === false){
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct001/tgw01/tgw004/v1';
        }
      }catch (err: any) {
        toast("The token is no longer active.", 'danger');
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct001/tgw01/tgw004/v1';
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
              key:"CK:CT001:FNGK:AF:FNK:UF-UFR:CATK:TGW01:AFGK:TGW004:AFK:myreport:AFVK:v1"
            }
        }) 
        }else{
          myAccount = await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT001:FNGK:AF:FNK:UF-UFR:CATK:TGW01:AFGK:TGW004:AFK:myreport:AFVK:v1"
            }
         })          
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        let actionDetails:ActionDetails = {
  "lock": {
    "ttl": "",
    "name": "",
    "lockMode": ""
  },
  "events": {},
  "encryption": {
    "isEnabled": false,
    "selectedDpd": "",
    "encryptionMethod": ""
  },
  "pagination": {
    "page": "1",
    "count": "10"
  },
  "stateTransition": {
    "sourceQueue": "",
    "targetQueue": "",
    "sourceStatus": "",
    "targetStatus": ""
  }
};
        try{
        let country_code_dfd_v1Body:te_refreshDto={
          key: "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TGW01:AFGK:TGW004:AFK:country_code_dfd:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          country_code_dfd_v1Body["dpdKey"] = encryptionDpd;
          country_code_dfd_v1Body["method"] = encryptionMethod;
        }
        if(myreport_v1Props.length > 0){
          let filterData :any[] =[];
          for(let i=0;i< myreport_v1Props.length;i++){
            if(myreport_v1Props[i].DFDkey == "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TGW01:AFGK:TGW004:AFK:country_code_dfd:AFVK:v1"){
              delete myreport_v1Props[i].DFDkey;
              filterData.push(myreport_v1Props[i])
            }           
          }
          country_code_dfd_v1Body['filterData'] = filterData;
        }
        const country_code_dfd_v1Data:any=await AxiosService.post("/te/eventEmitter",country_code_dfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          setdfd_country_code_dfd_v1Props(country_code_dfd_v1Data?.data?.dataset?.data || []);
          if (security == 'AA') {
          allowedGroup.map((nodes:any)=>{
            if(nodes?.groupName == 'group' && (nodes?.security== 'AA' || nodes?.security == 'ATO'))
            {
              setCheckgroup(true)
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
          codeStates['group'] = group6c7b4;
          codeStates['setgroup'] = setgroup6c7b4;
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


  useEffect(() => {    
    securityCheck();
  }, [])

  return (
     <div className='flex h-[80vh] xl:h-[87vh] w-full gap-[20px] overflow-hidden'>
      <>
        {isFormOpen ? (
          <div
            style={{
              borderColor: 'var(--g-color-line-generic)'
            }}
           className='flex h-full flex-col gap-[10px] rounded-lg border min-w-52'
          >
            <div className='flex items-center justify-between gap-[10px] px-[15px] py-[10px]'>
              <Text variant='subheader-3' contentAlign="left">{capitalizeEachWord(artifactName)}</Text>
              <Button view='flat' fillContainer={false} onClick={() => setIsFormOpen(false)} className="!w-fit">
                 <Multiply fill={isDark ? "white" : "black"} />
              </Button>
            </div>
            <hr className='w-full border border-black/15' />
            <div
              //style={{ backgroundColor: selectionColor }}
               className='flex h-full w-full flex-col items-center gap-[10px] overflow-y-auto rounded-lg px-[10px] py-[10px] scrollbar-hide'
            >
              {reportData.map((item: any, index: number) =>
                renderItem(item, index)
              )}
            </div>
            <div className='flex w-full justify-end gap-[10px] px-[10px] py-[10px]'>
              <Button onClick={handleClick}>Generate Report</Button>
            </div>
          </div>
        ) : (
          <div>
          <Button view='flat' fillContainer={false} onClick={() => setIsFormOpen(true)} className="!w-fit !h-fit">
            <ThreeLineIcon
              fill={isDark ? "white" : "black"}
            />
          </Button>
          </div>
        )}
      </>
      <div className={clsx("",
        "w-full",
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'
      )}>
        <div style={{
        gridColumn: '',
        gridRow: '',
        gridAutoRows: '4px',
        columnGap: '0px',
        rowGap: '0px',
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
      }} className='w-full h-full' >
        {checkgroup && initialLoad &&<Groupgroup
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
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          isFormOpen={isFormOpen}
          controlData={controlData} 
          groupData={groupData}  
        />}
        
          </div> 
      </div>
    </div>
  )
}

export default PageReportV1


