

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

export default function ComboBoxoffline_online_combobox({encryptionFlagCompData,setIsProcessing,controlData}:any) { 
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
  const {online_offline_process41265Props, setonline_offline_process41265Props}= useContext(TotalContext) as TotalContextProps;
  const {transaction_countc3fd5Props, settransaction_countc3fd5Props}= useContext(TotalContext) as TotalContextProps;
  const {total_amount94c0bProps, settotal_amount94c0bProps}= useContext(TotalContext) as TotalContextProps;
  const {gdb_group5384d, setgdb_group5384d}= useContext(TotalContext) as TotalContextProps;
  const {gdb_group5384dProps, setgdb_group5384dProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_group65b41, settab_group65b41}= useContext(TotalContext) as TotalContextProps;
  const {tab_group65b41Props, settab_group65b41Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header04820, settab_header04820}= useContext(TotalContext) as TotalContextProps;
  const {tab_header04820Props, settab_header04820Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_grpe63f4, settab_grpe63f4}= useContext(TotalContext) as TotalContextProps;
  const {tab_grpe63f4Props, settab_grpe63f4Props}= useContext(TotalContext) as TotalContextProps;
  const {product_combobox7ef64, setproduct_combobox7ef64}= useContext(TotalContext) as TotalContextProps;
  const {channel_combobox95649, setchannel_combobox95649}= useContext(TotalContext) as TotalContextProps;
  const {currency_comboboxfbbfc, setcurrency_comboboxfbbfc}= useContext(TotalContext) as TotalContextProps;
  const {process_category_comboboxbb731, setprocess_category_comboboxbb731}= useContext(TotalContext) as TotalContextProps;
  const {offline_online_combobox88add, setoffline_online_combobox88add}= useContext(TotalContext) as TotalContextProps;
  const {key_matrics54124, setkey_matrics54124}= useContext(TotalContext) as TotalContextProps;
  const {transaction_group6c6f2, settransaction_group6c6f2}= useContext(TotalContext) as TotalContextProps;
  const {transaction_group6c6f2Props, settransaction_group6c6f2Props}= useContext(TotalContext) as TotalContextProps;
  const {total_value_group9d783, settotal_value_group9d783}= useContext(TotalContext) as TotalContextProps;
  const {total_value_group9d783Props, settotal_value_group9d783Props}= useContext(TotalContext) as TotalContextProps;
  const {online_offline_processing_group7ad24, setonline_offline_processing_group7ad24}= useContext(TotalContext) as TotalContextProps;
  const {online_offline_processing_group7ad24Props, setonline_offline_processing_group7ad24Props}= useContext(TotalContext) as TotalContextProps;
  const {bar_chart_group737a3, setbar_chart_group737a3}= useContext(TotalContext) as TotalContextProps;
  const {bar_chart_group737a3Props, setbar_chart_group737a3Props}= useContext(TotalContext) as TotalContextProps;
  const {pie_chart_group15067, setpie_chart_group15067}= useContext(TotalContext) as TotalContextProps;
  const {pie_chart_group15067Props, setpie_chart_group15067Props}= useContext(TotalContext) as TotalContextProps;
  const {transaction_table_label9d37f, settransaction_table_label9d37f}= useContext(TotalContext) as TotalContextProps;
  const {transaction_tablef4f34, settransaction_tablef4f34}= useContext(TotalContext) as TotalContextProps;
  const {transaction_tablef4f34Props, settransaction_tablef4f34Props}= useContext(TotalContext) as TotalContextProps;
  const {online_offline_process41265, setonline_offline_process41265}= useContext(TotalContext) as TotalContextProps;
  const {transaction_countc3fd5, settransaction_countc3fd5}= useContext(TotalContext) as TotalContextProps;
  const {total_amount94c0b, settotal_amount94c0b}= useContext(TotalContext) as TotalContextProps;
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
        codeStates['gdb_group'] = gdb_group5384d,
        codeStates['setgdb_group'] = setgdb_group5384d,
        codeStates['gdb_group5384d'] = gdb_group5384dProps,
        codeStates['setgdb_group5384d'] = setgdb_group5384dProps,
        codeStates['tab_group'] = tab_group65b41,
        codeStates['settab_group'] = settab_group65b41,
        codeStates['tab_group65b41'] = tab_group65b41Props,
        codeStates['settab_group65b41'] = settab_group65b41Props,
        codeStates['tab_header'] = tab_header04820,
        codeStates['settab_header'] = settab_header04820,
        codeStates['tab_header04820'] = tab_header04820Props,
        codeStates['settab_header04820'] = settab_header04820Props,
        codeStates['tab_grp'] = tab_grpe63f4,
        codeStates['settab_grp'] = settab_grpe63f4,
        codeStates['tab_grpe63f4'] = tab_grpe63f4Props,
        codeStates['settab_grpe63f4'] = settab_grpe63f4Props,
        codeStates['product_combobox'] = product_combobox7ef64,
        codeStates['setproduct_combobox'] = setproduct_combobox7ef64,
        codeStates['channel_combobox'] = channel_combobox95649,
        codeStates['setchannel_combobox'] = setchannel_combobox95649,
        codeStates['currency_combobox'] = currency_comboboxfbbfc,
        codeStates['setcurrency_combobox'] = setcurrency_comboboxfbbfc,
        codeStates['process_category_combobox'] = process_category_comboboxbb731,
        codeStates['setprocess_category_combobox'] = setprocess_category_comboboxbb731,
        codeStates['offline_online_combobox'] = offline_online_combobox88add,
        codeStates['setoffline_online_combobox'] = setoffline_online_combobox88add,
        codeStates['key_matrics'] = key_matrics54124,
        codeStates['setkey_matrics'] = setkey_matrics54124,
        codeStates['transaction_group'] = transaction_group6c6f2,
        codeStates['settransaction_group'] = settransaction_group6c6f2,
        codeStates['transaction_group6c6f2'] = transaction_group6c6f2Props,
        codeStates['settransaction_group6c6f2'] = settransaction_group6c6f2Props,
        codeStates['total_value_group'] = total_value_group9d783,
        codeStates['settotal_value_group'] = settotal_value_group9d783,
        codeStates['total_value_group9d783'] = total_value_group9d783Props,
        codeStates['settotal_value_group9d783'] = settotal_value_group9d783Props,
        codeStates['online_offline_processing_group'] = online_offline_processing_group7ad24,
        codeStates['setonline_offline_processing_group'] = setonline_offline_processing_group7ad24,
        codeStates['online_offline_processing_group7ad24'] = online_offline_processing_group7ad24Props,
        codeStates['setonline_offline_processing_group7ad24'] = setonline_offline_processing_group7ad24Props,
        codeStates['bar_chart_group'] = bar_chart_group737a3,
        codeStates['setbar_chart_group'] = setbar_chart_group737a3,
        codeStates['bar_chart_group737a3'] = bar_chart_group737a3Props,
        codeStates['setbar_chart_group737a3'] = setbar_chart_group737a3Props,
        codeStates['pie_chart_group'] = pie_chart_group15067,
        codeStates['setpie_chart_group'] = setpie_chart_group15067,
        codeStates['pie_chart_group15067'] = pie_chart_group15067Props,
        codeStates['setpie_chart_group15067'] = setpie_chart_group15067Props,
        codeStates['transaction_table_label'] = transaction_table_label9d37f,
        codeStates['settransaction_table_label'] = settransaction_table_label9d37f,
        codeStates['transaction_table'] = transaction_tablef4f34,
        codeStates['settransaction_table'] = settransaction_tablef4f34,
        codeStates['transaction_tablef4f34'] = transaction_tablef4f34Props,
        codeStates['settransaction_tablef4f34'] = settransaction_tablef4f34Props,
        codeStates['online_offline_process'] = online_offline_process41265,
        codeStates['setonline_offline_process'] = setonline_offline_process41265,
        codeStates['transaction_count'] = transaction_countc3fd5,
        codeStates['settransaction_count'] = settransaction_countc3fd5,
        codeStates['total_amount'] = total_amount94c0b,
        codeStates['settotal_amount'] = settotal_amount94c0b,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }
  }
  const handleOrchestration=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "6dbd5fa461ad4c3e9c75f0fa14ae63f4",
        "41ed6d8dc134490d9ccda05e05d88add"
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
  const {dfd_onlineofflinedashboard_v1Props, setdfd_onlineofflinedashboard_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const getDropdownData = async(count?:any, page: number = 1,searchValue?:string,isFromEvent?:boolean,fromWhere?:string,eventFilterDataParam? : any)=>{
    let dstKey0:string = dfd_onlineofflinedashboard_v1Props.dstKey;
    if (isFromEvent) {
      let paginationBody={}
      if(isFromEvent)
      {
        let temp="CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:onlineOfflineDashboard:AFVK:v1:"
        dstKey0=temp.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
      }
      if(searchValue!=""||isFromEvent)
      {
        let getFromDataFilter = eventFilterDataParam ? eventFilterDataParam : eventFilterData
        let tempSearchFilter=nullFilter({transaction_process:searchValue,...getFromDataFilter})
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
          new Map(temp.map((item:any) => [item.transaction_process + '|' + item.transaction_process, item])).values()
        );
        setDynamicDFDData(unique)
        return
      }
      if(searchValue!=""||isFromEvent)
      {
        let temp:any = records
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.transaction_process + '|' + item.transaction_process, item])).values()
        );
        setDynamicDFDData(unique)
      }else
      {
        let temp:any = [...dynamicDFDData,...records]
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.transaction_process + '|' + item.transaction_process, item])).values()
        );
        setDynamicDFDData(unique)
      }
    } else {
      if(prevRefreshRef.current==false) // prevent onload data get
        setDynamicDFDData(dfd_onlineofflinedashboard_v1Props );
    }
  }
//setSearchFilters
async function handleSearch0(value:any) {
  let mainData: any =  nullFilter({...structuredClone(tab_grpe63f4), offline_online_combobox: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  tab_grpe63f4Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:onlineOfflineCountVPHDashboard:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"99520ab4b2f84f5f9e5c57b59acb8bab",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:onlineOfflineCountVPHDashboard:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "99520ab4b2f84f5f9e5c57b59acb8bab",
        "object": {
          "properties.transaction_process": "41ed6d8dc134490d9ccda05e05d88add"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = tab_grpe63f4Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (online_offline_process41265Props?.filterProps?.length) {
    online_offline_process41265Props.filterProps.forEach((existingItem: any) => {
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
  setonline_offline_process41265Props((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      offline_online_combobox88add: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch1(value:any) {
  let mainData: any =  nullFilter({...structuredClone(tab_grpe63f4), offline_online_combobox: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  tab_grpe63f4Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:transactionCountVphDashboard:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"ccfeff99b47a41a1b1fc2a6a55c13247",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:transactionCountVphDashboard:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "ccfeff99b47a41a1b1fc2a6a55c13247",
        "object": {
          "properties.transaction_process": "41ed6d8dc134490d9ccda05e05d88add"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = tab_grpe63f4Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (transaction_countc3fd5Props?.filterProps?.length) {
    transaction_countc3fd5Props.filterProps.forEach((existingItem: any) => {
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
  settransaction_countc3fd5Props((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      offline_online_combobox88add: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch2(value:any) {
  let mainData: any =  nullFilter({...structuredClone(tab_grpe63f4), offline_online_combobox: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  tab_grpe63f4Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:channelCountVphDashboard:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"4694b4cd0ea34d0db77992bbda019635",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:channelCountVphDashboard:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "4694b4cd0ea34d0db77992bbda019635",
        "object": {
          "properties.transaction_process": "41ed6d8dc134490d9ccda05e05d88add"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = tab_grpe63f4Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (total_amount94c0bProps?.filterProps?.length) {
    total_amount94c0bProps.filterProps.forEach((existingItem: any) => {
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
  settotal_amount94c0bProps((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      offline_online_combobox88add: true
    }
  };
  });
  }
  ///////////////
  const [selectedData,setselectedData]=useState("")
  const handleOnUpdate=async(data:any)=>{

    settab_grpe63f4((pre:any)=>({...pre,offline_online_combobox:data?.transaction_process}))
    setselectedData(data?.transaction_process)
  ///////////

    let selectedObj=dynamicDFDData?.find((items:any)=>(items?.transaction_process == data?.transaction_process && items?.transaction_process == data?.transaction_process)) || {};  
    try{
    setIsProcessing(true);
    let filterValue = data?.transaction_process;

    await  handleSearch0(filterValue);
    await  handleSearch1(filterValue);
    await  handleSearch2(filterValue);
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

  const tab_grpe63f4Ref = useRef<any>(tab_grpe63f4);
  useEffect(() => { tab_grpe63f4Ref.current = tab_grpe63f4; }, [tab_grpe63f4]);
    useEffect(()=>{
        handleBlur()
      getDropdownData(10,1,"",true,"",{})
    const handler = (id:any) => {
      if (id === "41ed6d8dc134490d9ccda05e05d88add") {
        handleOnUpdate({
          value:selectedData,
          text:tab_grpe63f4Ref?.current?.offline_online_combobox||""
        });
      }
    };
    eventBus.on("triggerElement|onChange", handler);
    return () => {
      eventBus.off("triggerElement|onChange", handler);
    };
    },[])
    useEffect(()=>{
    if(offline_online_combobox88add?.trigger===undefined || !offline_online_combobox88add?.trigger) return;
    handleOnUpdate({offline_online_combobox:tab_grpe63f4Ref?.current?.offline_online_combobox||""});
  },[offline_online_combobox88add?.trigger])

  useEffect(()=>{
    if(tab_grpe63f4?.offline_online_combobox=="")
    {
      setselectedData('')
    }else
    {

      let formBindedData:any=dynamicDFDData?.find((item:any)=>(item?.transaction_process==(selectedData||tab_grpe63f4?.offline_online_combobox)))?.transaction_process || tab_grpe63f4?.offline_online_combobox;
      setselectedData(formBindedData)
    }
  },[tab_grpe63f4?.offline_online_combobox])

  const [search, setSearch] = useState("");
return (
  <div 
    style={{
      gridColumn: `11 / 15`,
      gridRow: `6 / 21`, 
      gap:``,
      height: `100%`, 
      overflow: 'visible',
      display: 'flex',
      flexDirection: 'column'
 }} >
      <Combobox
      //style props
        className="!rounded-xl"
        search={search}
        setSearch={setSearch}
        disabled= {offline_online_combobox88add?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Offline/Online
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        onBlur={handleBlur}
        isStatic={false}
        placeholder={ "Select"}
        value={selectedData}
        onChange={handleOnUpdate}

        toSave="transaction_process"
        toDisplay="transaction_process"
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
