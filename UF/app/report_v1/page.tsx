'use client'
import React, { useContext,useEffect, useState } from 'react';
import { codeExecution } from "../utils/codeExecution";
import { Multiply, ThreeLineIcon } from '../components/svgApplication';
import { AxiosService } from '../components/axiosService';
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
import { useGlobal } from '@/context/GlobalContext'
import Groupgroup_report  from "./Groupgroup_report/Groupgroup_report";
import { useRouter } from 'next/navigation';


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
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const user: string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {paginationDetails, setpaginationDetails} = useContext(TotalContext) as TotalContextProps;
  const {report_v1Props, setreport_v1Props} = useContext(TotalContext) as TotalContextProps;
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const artifactName: string =
    "CK:CT006:FNGK:AF:FNK:UF-UFR:CATK:LAP:AFGK:LAP:AFK:report:AFVK:v1".split(
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
  const [checkgroup_report,setCheckgroup_report,]=useState<boolean>(false);
  const {group_report8ef47, setgroup_report8ef47} = useContext(TotalContext) as TotalContextProps;
  const {dfd_reportcase_v1Props, setdfd_reportcase_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [dfd_reportcase_v1Params, setdfd_reportcase_v1Params] = React.useState<any>({
    "key":"CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:reportCase:AFVK:v1:",
    "count":1000,
    "page":1,
    "refreshFlag":"Y",
    "reportFlag":true
    });
  const [pdfUrl, setPdfUrl] = useState<string | null>(
    'https://www.orimi.com/pdf-test.pdf'
  )
  const router = useRouter();

  const reportData:ReportItem[] = [
  {
    "displayName": "",
    "referanceName": "case_display_id",
    "referencePath": "properties.case_display_id",
    "nodeId": "4a33e365d6e64576a23ff761aa19bdab",
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:reportCase:AFVK:v1:",
    "type": "string"
  },
  {
    "displayName": "",
    "referanceName": "debtor_name",
    "referencePath": "properties.debtor_name",
    "nodeId": "4a33e365d6e64576a23ff761aa19bdab",
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:reportCase:AFVK:v1:",
    "type": "string"
  },
  {
    "displayName": "",
    "referanceName": "creditor_name",
    "referencePath": "properties.creditor_name",
    "nodeId": "4a33e365d6e64576a23ff761aa19bdab",
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:reportCase:AFVK:v1:",
    "type": "string"
  },
  {
    "displayName": "",
    "referanceName": "attorney_name",
    "referencePath": "properties.attorney_name",
    "nodeId": "4a33e365d6e64576a23ff761aa19bdab",
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:reportCase:AFVK:v1:",
    "type": "string"
  }
]

  const capitalizeEachWord = (str: string): string => {
    if (!str) return ''
    return str
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  }

  // Initialize payload with empty values
  useEffect(() => {
      setdfd_reportcase_v1Props([])
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

     const reportcase_v1Payload= updatedCleanedPayload.find((p: any) => p.key.split(':')[11].toLowerCase() === "reportcase" && p.key.split(':')[11].toLowerCase() === "reportcase") || null;
     setdfd_reportcase_v1Params(reportcase_v1Payload)


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
        dfd_reportcase_v1Params,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(res.status === 201){
        setdfd_reportcase_v1Props(res.data.dataset.data || {})
      } 
    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    localStorage.clear();
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    const from = encodeURIComponent(`${basePath}/`);
    window.location.href = `${basePath}/next-api/auth/logout?from=${from}`;
  };

  async function securityCheck(): Promise<void> {
    const data: any = await fetchBatchData(
      "CK:CT006:FNGK:AF:FNK:UF-UFR:CATK:LAP:AFGK:LAP:AFK:report:AFVK:v1",
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
     const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
     const res = await fetch(`${basePath}/next-api/auth/introspect?key=Logs screen`)
     if (!res.ok) {
       logout()
       return
     }
     router.refresh()
     } catch (err: any) {
       logout()
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFR:CATK:LAP:AFGK:LAP:AFK:report:AFVK:v1"
            }
        }) 
        }else{
          myAccount = await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFR:CATK:LAP:AFGK:LAP:AFK:report:AFVK:v1"
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
    "count": "10"
  },
  "encryption": {
    "isEnabled": false,
    "selectedDpd": "",
    "encryptionMethod": ""
  },
  "events": {}
};
        try{
          if (security == 'AA') {
          allowedGroup.map((nodes:any)=>{
            if(nodes?.groupName == 'group_report' && (nodes?.security== 'AA' || nodes?.security == 'ATO'))
            {
              setCheckgroup_report(true)
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
          codeStates['group_report'] = group_report8ef47;
          codeStates['setgroup_report'] = setgroup_report8ef47;
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
        {checkgroup_report && initialLoad &&<Groupgroup_report
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


