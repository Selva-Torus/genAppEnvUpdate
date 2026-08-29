

'use client'
import { useContext, useEffect, useState, useRef } from 'react';
import { codeExecution } from '@/app/utils/codeExecution';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from '@/app/components/axiosService';
import { te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext';
import { Tooltip } from '@/components/Tooltip';
import {BarChart} from '@/components/BarChart';
import { Text } from "@/components/Text";
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { Card } from '@/components/Card';
import i18n from '@/app/components/i18n';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { getFilterProps } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

type ContentAlign = "left" | "center" | "right";

interface BarChartsbarChartCompProps {
  encryptionFlagCompData: any;
  setIsProcessing: any;
  controlData: any;
}

export default function BarChartsbarchart({ 
  encryptionFlagCompData,
  setIsProcessing,
  controlData
}: BarChartsbarChartCompProps) {
  const { token } = useGlobal();
  const { globalState, setGlobalState } = useContext(TotalContext) as TotalContextProps;
  const { accessProfile, setAccessProfile } = useContext(TotalContext) as TotalContextProps;
  const [data,setData] = useState<any[]>([]);
  const {dfd_combo_dfd_v1Props, setdfd_combo_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef<any>(false);
  const toast : Function = useInfoMsg();
  const keyset:any=i18n.keyset("language"); 
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  /////////////
   //another screen

  const {group89800, setgroup89800}= useContext(TotalContext) as TotalContextProps;  
  const {group89800Props, setgroup89800Props}= useContext(TotalContext) as TotalContextProps;  
  const {barchartcf891, setbarchartcf891}= useContext(TotalContext) as TotalContextProps;  
  const {table3c3b1, settable3c3b1}= useContext(TotalContext) as TotalContextProps;  
  const {table3c3b1Props, settable3c3b1Props}= useContext(TotalContext) as TotalContextProps;  
  const {barchartcf891Props, setbarchartcf891Props} = useContext(TotalContext) as TotalContextProps;
  //////////////



//setSearchFilters
async function handleSearch0(value:any) {
  let mainData: any =  nullFilter({...structuredClone(group89800), country: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  group89800Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:combo_dfd:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"78bb95add98e422fa099d25fb7da6056",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:combo_dfd:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "78bb95add98e422fa099d25fb7da6056",
        "object": {
          "parameters[0].name": "dfb1ceb6e8e34c99ad3e9788e9dcf891"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = group89800Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (table3c3b1Props?.filterProps?.length) {
    table3c3b1Props.filterProps.forEach((existingItem: any) => {
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
    count:PAGE_SIZE,
    page:currentPage
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  settable3c3b1Props((prev: any) => {
  let mergedData: any;
  mergedData = [...filterData];

  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterInitalLoad:true
  };
  });
  }
  ///////////////

  const handleMapperDetails=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
     // orchestration API call
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "fb42a21c2f8b49c6a44ac466aeb89800",
      "dfb1ceb6e8e34c99ad3e9788e9dcf891"
    );
    let code:string= orchestrationData?.data?.code;
      if (code != '') {
        let codeStates: Record<string, any> = {}
          codeStates['group']  = group89800,
          codeStates['setgroup'] = setgroup89800,
          codeStates['table']  = table3c3b1,
          codeStates['settable'] = settable3c3b1,
        codeExecution(code,codeStates);
      }
      if ("hasLogicCenter" in dfd_combo_dfd_v1Props && !dfd_combo_dfd_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_combo_dfd_v1Props.dstKey,
            page: +orchestrationData?.data?.action?.pagination?.page,
            count: +orchestrationData?.data?.action?.pagination?.count,
            filterData: searchFilter
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        setgroup89800((pre: any) => ({
          ...pre,
          country: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.country
            : "0"
        }))
        setData(api_paginationData.data.records);
      }else{
      if(filterFlag){
        setgroup89800((pre: any) => ({
          ...pre,
          country: barchartcf891Props?.filteredData?.length > 0
            ? barchartcf891Props?.filteredData[0]?.country
            : "0"
        }))
        setData(barchartcf891Props?.filteredData);
      }else if(Array.isArray(dfd_combo_dfd_v1Props) && dfd_combo_dfd_v1Props && !group89800.country){
          setData(dfd_combo_dfd_v1Props);
          setgroup89800((pre:any)=>({...pre,country:dfd_combo_dfd_v1Props[0]?.country}));
        }
      }
      if(Array.isArray(dfd_combo_dfd_v1Props)){
        return
      }
    }catch(err){
      console.log(err);
    }
  }

  const handleClick=async(value?:any)=>{
    try{
    setIsProcessing(true);
    if(value){
      await  handleSearch0(value);
    }
    let te_eventEmitter : any =  {};
    let copyFormhandlerData :any = {}
      //infoMsg
      toast('Data saved successfully', 'success',false,'')
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

  async function handleConfirmonClick(){
  } 

  const handleBarClick = async (barData: any, index: number, event: React.MouseEvent) => {
    const clickedName = barData?.payload?.name;
    await handleClick(clickedName);
  };

  useEffect(() => {
    handleMapperDetails();
   },[barchartcf891?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_combo_dfd_v1Props) && dfd_combo_dfd_v1Props?.length > 0){
      setData(dfd_combo_dfd_v1Props);
      setgroup89800((pre:any)=>({...pre,country:dfd_combo_dfd_v1Props[0]?.country}));
    }
  },[dfd_combo_dfd_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!barchartcf891Props?.filterProps) return;
    handleMapperDetails(barchartcf891Props?.filterProps,barchartcf891Props?.filterFlag);
  },[barchartcf891Props?.filterProps])

 
  if (barchartcf891?.isHidden) {
    return <></>
  }
  return (
    <div
      className="w-full h-full"
      style={{gridColumn: `7 / 17`,gridRow: `13 / 108`, gap:``, height: `100%`}}
    >
      <BarChart
        data={data}
        showCurrencySign = "₹"
        title  = {`${keyset("title")}`}
        className = ""
        fillContainer={true}
        colors = {["#000000"]}
        contentAlign="left"
        onClick={handleBarClick}
      />
    </div>
  );
}
