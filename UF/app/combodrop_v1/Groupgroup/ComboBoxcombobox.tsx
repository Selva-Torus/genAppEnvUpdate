

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useGlobal } from '@/context/GlobalContext'
import { getDropdownDetailsNew } from '@/app/utils/getMapperDetails';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import { Combobox } from '@/components/ComboBox';
import { Text } from '@/components/Text';
import {Modal} from '@/components/Modal';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { getMapperDetailsDto,uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import * as v from 'valibot';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
  function SourceIdFilter(eventProperty:any,matchingSequence?:string){
    let ans : any[] = [];
    let id : string = "";
    if(eventProperty.name=='saveHandler' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    if(eventProperty.name=='eventEmitter' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    for(let i=0;i<eventProperty?.children?.length;i++)
    {
      let temp:any=SourceIdFilter(eventProperty?.children[i],matchingSequence)
      if(temp.length)
      {
        ans.push(eventProperty?.children[i].id)
        id=id+"|"+eventProperty?.children[i].id
        ans.push(...temp)
      }
    }
    return ans
  }

export default function ComboBoxcombobox({encryptionFlagCompData,setIsProcessing,controlData}:any) { 
  const { token } = useGlobal();
  const decodedTokenObj:any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  let dfData:any;
  let dfdFlag:boolean = false;
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [validate, setValidate]=useState<Record<string, any>>({})
  const { validateRefetch, setValidateRefetch } = useContext(
    TotalContext
  ) as TotalContextProps
    //validation
  let schemaArray = [] ;
    //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {carde8dd8Props, setcarde8dd8Props}= useContext(TotalContext) as TotalContextProps;
  const {groupa03b5, setgroupa03b5}= useContext(TotalContext) as TotalContextProps;
  const {groupa03b5Props, setgroupa03b5Props}= useContext(TotalContext) as TotalContextProps;
  const {combobox659b9, setcombobox659b9}= useContext(TotalContext) as TotalContextProps;
  const {carde8dd8, setcarde8dd8}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [allCode, setAllCode] = React.useState<string>("");
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['group'] = groupa03b5,
        codeStates['setgroup'] = setgroupa03b5,
        codeStates['groupa03b5'] = groupa03b5Props,
        codeStates['setgroupa03b5'] = setgroupa03b5Props,
        codeStates['combobox'] = combobox659b9,
        codeStates['setcombobox'] = setcombobox659b9,
        codeStates['card'] = carde8dd8,
        codeStates['setcard'] = setcarde8dd8,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }
  }
  const handleOrchestration=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "50933b8d5a344889973e1c61e4aa03b5",
        "9747e878ad84446ab14c113b7d0659b9"
      );
      if(orchestrationData?.data?.error == true){      
        return
      }
      if (orchestrationData?.data) {
        setAllCode(orchestrationData?.data?.code)
        setPaginationData((pre: any) => ({
          ...pre,
          page: +orchestrationData?.data?.action?.pagination?.page || 0,
          pageSize: +orchestrationData?.data?.action?.pagination?.count || 0
        }))
      }
    }
    catch(err)
    {
      console.log(err);
    }
  }
  useEffect(()=>{
    handleOrchestration()
  },[])
  async function handleConfirmonClick(){
  }
  const [eventFilterData,seteventFilterData]=useState({})
  const [dynamicDFDData,setDynamicDFDData]=useState<any>([])
  const prevRefreshRef = useRef(false);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const {dfd_chart_data_v1Props, setdfd_chart_data_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const getDropdownData = async(count?:any, page: number = 1,searchValue?:string,isFromEvent?:boolean,fromWhere?:string,eventFilterDataParam? : any)=>{
    let dstKey0:string = dfd_chart_data_v1Props.dstKey;
    if (isFromEvent) {
      let paginationBody={}
      if(isFromEvent)
      {
        let temp="CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:chart_data:AFVK:v1:"
        dstKey0=temp.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
      }
      if(searchValue!=""||isFromEvent)
      {
        let getFromDataFilter = eventFilterDataParam ? eventFilterDataParam : eventFilterData
        let tempSearchFilter=nullFilter({name:searchValue,...getFromDataFilter})
        paginationBody= {key:dstKey0,
            page: page, 
            count: paginationData.pageSize,
            searchFilter:tempSearchFilter
          }
      }else
      {
          paginationBody= {key:dstKey0,
            page: page, 
            count: paginationData.pageSize,
          }
      }

      const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        paginationBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      const records:any = api_paginationData?.data?.records || [];
      if(fromWhere=="onScroll"&&records?.length==0)
        return
      else if(fromWhere=="onScroll")
      {
        let temp:any = [...dynamicDFDData,...records]
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.name + '|' + item.name, item])).values()
        );
        setDynamicDFDData(unique)
        return
      }
      if(searchValue!=""||isFromEvent)
      {
        let temp:any = records
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.name + '|' + item.name, item])).values()
        );
        setDynamicDFDData(unique)

        setgroupa03b5((pre:any)=>({...pre,name:records[0]?.name}))
        setselectedData(records[0]?.name)
      }else
      {
        let temp:any = [...dynamicDFDData,...records]
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.name + '|' + item.name, item])).values()
        );
        setDynamicDFDData(unique)
      }
    } else {
      if(prevRefreshRef.current==false) // prevent onload data get
        setDynamicDFDData(dfd_chart_data_v1Props );
    }
  }
//setSearchFilters
async function handleSearch0(value:any) {
  let mainData: any =  nullFilter({...structuredClone(groupa03b5), name: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  groupa03b5Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:chart_data:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"a0e99bd52d2548d78dd167e5fee11919",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:chart_data:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "a0e99bd52d2548d78dd167e5fee11919",
        "object": {
          "properties.name": "9747e878ad84446ab14c113b7d0659b9"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = groupa03b5Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (carde8dd8Props?.filterProps?.length) {
    carde8dd8Props.filterProps.forEach((existingItem: any) => {
      const matchIndex = filterData.findIndex(
        (f: any) => f.nodeId === existingItem.nodeId
      );
      if (matchIndex >= 0) {
        filterData[matchIndex] = {
          ...existingItem,
          ...filterData[matchIndex]
        };
      } else {
        filterData.push(existingItem);
      }
    });
  }
  if (!value) {
    filterData = filterData.map((f: any) => {
      const filtered = { ...f };
      delete filtered[filterColumn];
      return filtered;
    });
  }
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationData?.pageSize,
    page:paginationData?.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  const te_refresh: any = await AxiosService.post(
    '/te/eventEmitter',
    te_refreshBody,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
if(te_refresh.data.dataset=== "Bulk Data Processing"){
      const paginationFilterData = filterData.reduce((acc: any, item: any) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'nodeId' && item[key] !== undefined) {
          acc[key] = item[key]
        }
      })
      return acc
    }, {})

    const { filterData: _, key, ...restBody } = te_refreshBody
    const paginationKey = key?.replace(':AFC:', ':AFCP:').replace(':AF:', ':AFP:').replace(':DF-DFD:', ':DF-DST:');
    const hasPropertiesKey = Object.keys(paginationFilterData).some(key => key.startsWith("properties."));
    const paginationBody = hasPropertiesKey
      ? { ...restBody, key: paginationKey, filterData: [paginationFilterData] }
      : { ...restBody, key: paginationKey, searchFilter: paginationFilterData };

    // const pagination = await AxiosService.post(
    //   '/UF/pagination',
    //   paginationBody,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // )
  }else{
    if(te_refresh.data.dataset.data)
    filteredData = te_refresh.data.dataset.data
  }
  setcarde8dd8Props((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      combobox659b9: true
    }
  };
  });
  }
  ///////////////
  const [selectedData,setselectedData]=useState("")
  const handleOnUpdate=async(data:any)=>{

    setgroupa03b5((pre:any)=>({...pre,name:data?.name}))
    setselectedData(data?.name)
  ///////////

    let selectedObj=dynamicDFDData?.find((items:any)=>(items?.name == data?.name && items?.name == data?.name)) || {};  
    try{
    setIsProcessing(true);
    let filterValue = data?.name;

    await  handleSearch0(filterValue);
    let copyFormhandlerData :any = {}
    if(Object.keys(selectedObj).length){
  }
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
    }finally{
      setIsProcessing(false);
    }
  }
  const handleBlur = async (data:any="") => {
    //validation
    handleCustomCode()
  }

  const groupa03b5Ref = useRef<any>(groupa03b5);
  useEffect(() => { groupa03b5Ref.current = groupa03b5; }, [groupa03b5]);
    useEffect(()=>{
        handleBlur()
      getDropdownData(10,1,"",true,"",{})
    const handler = (id:any) => {
      if (id === "9747e878ad84446ab14c113b7d0659b9") {
        handleOnUpdate({
          value:selectedData,
          text:groupa03b5Ref?.current?.name||""
        });
      }
    };
    eventBus.on("triggerElement|onChange", handler);
    return () => {
      eventBus.off("triggerElement|onChange", handler);
    };
    },[])
    useEffect(()=>{
    if(combobox659b9?.trigger===undefined || !combobox659b9?.trigger) return;
    handleOnUpdate({name:groupa03b5Ref?.current?.name||""});
  },[combobox659b9?.trigger])

  useEffect(()=>{
    if(groupa03b5?.name=="")
    {
      setselectedData('')
    }else
    {

      let formBindedData:any=dynamicDFDData?.find((item:any)=>(item?.name==(selectedData||groupa03b5?.name)))?.name || groupa03b5?.name;
      setselectedData(formBindedData)
    }
  },[groupa03b5?.name])

  const [search, setSearch] = useState("");
return (
  <div 
    style={{
      gridColumn: `12 / 18`,
      gridRow: `42 / 52`, 
      gap:``,
      height: `100%`, 
      overflow: 'visible',
      display: 'flex',
      flexDirection: 'column'
 }} >
      <Combobox
      //style props
        className=""
        search={search}
        setSearch={setSearch}
        disabled= {combobox659b9?.isDisabled ? true : false}
        contentAlign={"center"}
        onBlur={handleBlur}
        isStatic={false}
        placeholder={"Search name..."}
        value={selectedData}
        onChange={handleOnUpdate}

        toSave="name"
        toDisplay="name"
        isArray={false}
        isMultiple={false}
        dynamicData={dynamicDFDData||[]}
        getPaginationData={getDropdownData}
        initialPage ={paginationData.page}
        pageCount ={paginationData.pageSize}
      />
    
  </div>
  )
}
