

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
import { Dropdown } from '@/components/Dropdown';
import { Text } from '@/components/Text';
import {Modal} from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getMapperDetailsDto,uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import * as v from 'valibot';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
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
let dfData:any;
let dfdFlag:boolean = false;
let getMapperDetailsBindValues:Record<string, any> ={} ;
const Dropdowncharge_type = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_chargetypecombo_v1Props, setdfd_chargetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const { validate, setValidate } = useContext(
    TotalContext
  ) as TotalContextProps
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const keyset:Function=i18n.keyset("language");
  const [initialCount,setInitialCount]=useState<number>(0)
  let getMapperDetails:string[];
  let getMapperDetailsValues:string[];
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef<any>(false);
  const loadingMoreRef = useRef<boolean>(false);    
  const isUserSelectionRef = useRef<boolean>(false);
  const [isDropdownDataReady, setIsDropdownDataReady] = useState<boolean>(false);
  let customecode:string="if(selected.current?.charge_type === \"SHA\" || selected.current?.charge_type === \"BEN\" ){\r\nsetcorrespondent_charge((pre)=>({\r\n  ...pre,\r\n  isDisabled:true\r\n}))\r\n\r\nsetcharge_type((pre)=>({\r\n  ...pre,\r\n  isDisabled:false\r\n}))\r\n\r\n}\r\n\r\n";
  const [allCode,setAllCode]=useState<string>("");
  const [ruleCode,setRuleCode]=useState<string>("");  
  const [dropdownValue, setdropdownValue] = useState<string | string[]>("");
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  let items:any = [];
  //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {payment_info_group1bac9, setpayment_info_group1bac9}= useContext(TotalContext) as TotalContextProps;
  const {payment_info_group1bac9Props, setpayment_info_group1bac9Props}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39d, setmidynamicactions3b39d}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39dProps, setmidynamicactions3b39dProps}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6, setgeneral_info_groupc83e6}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6Props, setgeneral_info_groupc83e6Props}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8ea, setdbtr_info_group4e8ea}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8eaProps, setdbtr_info_group4e8eaProps}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8, setcr_info_groupb01e8}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8Props, setcr_info_groupb01e8Props}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0, setchrg_info_group76ab0}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0Props, setchrg_info_group76ab0Props}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_text_labelf2fb3, setchrg_info_text_labelf2fb3}= useContext(TotalContext) as TotalContextProps;
  const {charge_type63052, setcharge_type63052}= useContext(TotalContext) as TotalContextProps;
  const {charge_amount44ea6, setcharge_amount44ea6}= useContext(TotalContext) as TotalContextProps;
  const {correspondent_chargeff14a, setcorrespondent_chargeff14a}= useContext(TotalContext) as TotalContextProps;
  const {bank_chargeb33d7, setbank_chargeb33d7}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6, setadd_info_groupe8dc6}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6Props, setadd_info_groupe8dc6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [charge_typeOptions, setcharge_typeOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `charge_type`
    let mapperText: string =  `charge_type`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "d09e00f0631e41e281343019f9076ab0",
      "d9bbb8260fd44758b7881b66c3e63052"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_chargetypecombo_v1Props.dstKey){
      dstKey = dfd_chargetypecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_chargetypecombo_v1Props && !dfd_chargetypecombo_v1Props.hasLogicCenter && !dfdFlag) {
    const api_paginationData:any = await AxiosService.post(
      '/UF/pagination',
      {
        key:dstKey,
        page:page,
        count:PAGE_SIZE,
        searchFilter:searchFilterData
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (api_paginationData?.data?.records.length === 0) {
      dfdFlag = true
    }
    if (Array.isArray(dfData)) {
      dfData = [...dfData, ...api_paginationData?.data?.records];
    } else {
      dfData = api_paginationData?.data?.records;
    }
    }else if(!value && !dfdFlag){
    const api_paginationData:any = await AxiosService.post(
      '/UF/pagination',
      {
        key:dstKey,
        page:page,
        count:PAGE_SIZE,
        searchFilter:searchFilterData
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (api_paginationData?.data?.records.length === 0) {
      dfdFlag = true
    }
    if (Array.isArray(dfData)) {
      dfData = [...dfData, ...api_paginationData?.data?.records];
    } else {
      dfData = api_paginationData?.data?.records;
    }
  }

  try{
    getMapperDetails = await getDropdownDetailsNew(dfData,mapperValue,mapperText, bindtranValue, code, getSourceFilterColumn,copySourceFilterColumn)
    getMapperDetailsValues = await getDropdownDetailsNew(dfData,mapperText,mapperValue, bindtranValue, code, getSourceFilterColumn,copySourceFilterColumn)
    if(!bindtranValue){
      getMapperDetails.map((item: any) => {
        getMapperDetailsBindValues[item] = getMapperDetailsValues[getMapperDetails.indexOf(item)];
      })
    }
    if(!value){
      let temp:any[] = getMapperDetails.filter((item:any, index:any) => getMapperDetails.indexOf(item) === index)
      temp = temp.filter((ele:any)=>ele);
      setcharge_typeOptions(temp);
      if (dfData.length < PAGE_SIZE) setHasMore(false);
    }
    } catch (error) {
      console.error("Error fetching mapper details for dropdown:", error);
    }
  }

  const loadMore = async () => {
    if (!hasMore || loadingMoreRef.current) return;
    loadingMoreRef.current = true;
    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await getDropdownData(undefined, nextPage);
    setIsLoadingMore(false);
    loadingMoreRef.current = false;
  }


  useEffect(() => {
    const fetchGetDropdownData = async () => {
    setCurrentPage(currentPage);
    setHasMore(true);
    setIsDropdownDataReady(false);
    await getDropdownData(undefined, currentPage).then(() => {
      setIsDropdownDataReady(true);
    });
    };
  fetchGetDropdownData();
  },[charge_type63052?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setchrg_info_group76ab0((prev: any) => ({ ...prev,charge_type63052: value }))
      setIsRequredData(false)
    }else{
      let temp:any = chrg_info_group76ab0;
      delete temp.charge_type;
      delete temp.CHARGE_TYPE;
      delete temp.charge_type63052;
      setchrg_info_group76ab0(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,charge_type:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(chrg_info_group76ab0.charge_type){
      if(Array.isArray(dfd_chargetypecombo_v1Props)){
        if(dfd_chargetypecombo_v1Props?.find((item: any) => item.charge_type === chrg_info_group76ab0.charge_type)){
          setdropdownValue([dfd_chargetypecombo_v1Props?.find((item: any) => item.charge_type === chrg_info_group76ab0.charge_type)?.charge_type])
          tempValue=dfd_chargetypecombo_v1Props?.find((item: any) => item.charge_type === chrg_info_group76ab0.charge_type)?.charge_type
        }else{
          setdropdownValue([chrg_info_group76ab0.charge_type])
          tempValue=chrg_info_group76ab0.charge_type
        }
      }else{
        let dstKey:string = dfd_chargetypecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{charge_type:chrg_info_group76ab0.charge_type}
        },
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
      if(api_paginationData?.data?.records?.find((item: any) => item.charge_type === chrg_info_group76ab0.charge_type)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.charge_type === chrg_info_group76ab0.charge_type)?.charge_type ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.charge_type === chrg_info_group76ab0.charge_type)?.charge_type
      }else{
        setdropdownValue([chrg_info_group76ab0.charge_type])
        tempValue=chrg_info_group76ab0.charge_type
      }   
      }
    }
    if(charge_type63052?.trigger == true)
    {
      await handlechange(tempValue)
      setcharge_type63052((pre:any)=>({...pre,trigger:false}))
      isUserSelectionRef.current = false;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!isDropdownDataReady) return;
      if (isUserSelectionRef.current) {
        isUserSelectionRef.current = false;
        return;
      }
      await fetchDropdownData();
    };
    fetchData();
  },[chrg_info_group76ab0.charge_type, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_chargetypecombo_v1Props) && dfd_chargetypecombo_v1Props?.length == 1){
    // setchrg_info_group76ab0((pre:any)=>({...pre,charge_type:dfd_chargetypecombo_v1Props[0]?.charge_type}))
    }
  },[dfd_chargetypecombo_v1Props])

  const selected=useRef({})
  const handleClick=async(value?:any)=>{
    if (value.length > 0) {
      let temp:any=[];
      if(Array.isArray(value)){
        for( let val of value){
          if(Array.isArray(val)){
            temp.push(val)
          }else{
            temp.push(val)
          }        
        }
      }
      setchrg_info_group76ab0((prev: any) => ({ ...prev, charge_type: getMapperDetailsBindValues[value],CHARGE_TYPE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setchrg_info_group76ab0((prev: any) => ({ ...prev, charge_type: '', charge_type63052: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,charge_type:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.charge_type==getMapperDetailsBindValues[value] && items?.charge_type==value)) || {}
    selected.current={
      ...selectedObj||{},
      charge_type:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['payment_info_group'] = payment_info_group1bac9,
        codeStates['setpayment_info_group'] = setpayment_info_group1bac9,
        codeStates['payment_info_group1bac9'] = payment_info_group1bac9Props,
        codeStates['setpayment_info_group1bac9'] = setpayment_info_group1bac9Props,
        codeStates['midynamicactions'] = midynamicactions3b39d,
        codeStates['setmidynamicactions'] = setmidynamicactions3b39d,
        codeStates['midynamicactions3b39d'] = midynamicactions3b39dProps,
        codeStates['setmidynamicactions3b39d'] = setmidynamicactions3b39dProps,
        codeStates['general_info_group'] = general_info_groupc83e6,
        codeStates['setgeneral_info_group'] = setgeneral_info_groupc83e6,
        codeStates['general_info_groupc83e6'] = general_info_groupc83e6Props,
        codeStates['setgeneral_info_groupc83e6'] = setgeneral_info_groupc83e6Props,
        codeStates['dbtr_info_group'] = dbtr_info_group4e8ea,
        codeStates['setdbtr_info_group'] = setdbtr_info_group4e8ea,
        codeStates['dbtr_info_group4e8ea'] = dbtr_info_group4e8eaProps,
        codeStates['setdbtr_info_group4e8ea'] = setdbtr_info_group4e8eaProps,
        codeStates['cr_info_group'] = cr_info_groupb01e8,
        codeStates['setcr_info_group'] = setcr_info_groupb01e8,
        codeStates['cr_info_groupb01e8'] = cr_info_groupb01e8Props,
        codeStates['setcr_info_groupb01e8'] = setcr_info_groupb01e8Props,
        codeStates['chrg_info_group'] = chrg_info_group76ab0,
        codeStates['setchrg_info_group'] = setchrg_info_group76ab0,
        codeStates['chrg_info_group76ab0'] = chrg_info_group76ab0Props,
        codeStates['setchrg_info_group76ab0'] = setchrg_info_group76ab0Props,
        codeStates['chrg_info_text_label'] = chrg_info_text_labelf2fb3,
        codeStates['setchrg_info_text_label'] = setchrg_info_text_labelf2fb3,
        codeStates['charge_type'] = charge_type63052,
        codeStates['setcharge_type'] = setcharge_type63052,
        codeStates['charge_amount'] = charge_amount44ea6,
        codeStates['setcharge_amount'] = setcharge_amount44ea6,
        codeStates['correspondent_charge'] = correspondent_chargeff14a,
        codeStates['setcorrespondent_charge'] = setcorrespondent_chargeff14a,
        codeStates['bank_charge'] = bank_chargeb33d7,
        codeStates['setbank_charge'] = setbank_chargeb33d7,
        codeStates['add_info_group'] = add_info_groupe8dc6,
        codeStates['setadd_info_group'] = setadd_info_groupe8dc6,
        codeStates['add_info_groupe8dc6'] = add_info_groupe8dc6Props,
        codeStates['setadd_info_groupe8dc6'] = setadd_info_groupe8dc6Props,
      codeStates['selected']  = selected
    codeExecution(customecode,codeStates)
    }
    
    try{
    setIsProcessing(true);
    if(value.length==0){
      return
    }
    let te_eventEmitter : any =  {};
    let copyFormhandlerData :any = {}

      // eventEmitter     
        let uf_getPFDetails:any={
          key: "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationChargeCalulationApi:AFVK:v1|f0384673c93447a4929d8d343cd3e09e"
        };
        let eventProperty :any = {
  "id": "d9bbb8260fd44758b7881b66c3e63052",
  "type": "dropdown",
  "name": "charge_type",
  "label": "charge_type",
  "sequence": 1,
  "children": [
    {
      "id": "d9bbb8260fd44758b7881b66c3e63052.1.1",
      "type": "eventNode",
      "name": "onClick",
      "label": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "d9bbb8260fd44758b7881b66c3e63052.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "label": "eventEmitter",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "d9bbb8260fd44758b7881b66c3e63052.1.1.1.2",
              "eventContext": "riseListen",
              "value": "OUR",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.2",
              "children": [
                {
                  "id": "d09e00f0631e41e281343019f9076ab0|b8e52906f56a4f4da7b3f293cabff14a.1.1.1.2.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|chrg_info_group|correspondent_charge",
                  "label": "paymentInfo.v1|chrg_info_group|correspondent_charge",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|chrg_info_group|correspondent_charge",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.1.2.1",
                  "children": []
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "parentTable",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "primaryKey",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "path",
                    "_type": "text",
                    "value": "data[0].correspondent_charge",
                    "enabled": true
                  },
                  {
                    "name": "setValue",
                    "_type": "array",
                    "items": [
                      {
                        "source": "",
                        "target": ""
                      }
                    ],
                    "value": "",
                    "enabled": true
                  }
                ]
              }
            },
            {
              "id": "d9bbb8260fd44758b7881b66c3e63052.1.1.1.3",
              "eventContext": "riseListen",
              "value": "OUR",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.3",
              "children": [
                {
                  "id": "d09e00f0631e41e281343019f9076ab0|5969ac62bb7c49488ff56119a66b33d7.1.1.1.3.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|chrg_info_group|bank_charge",
                  "label": "paymentInfo.v1|chrg_info_group|bank_charge",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|chrg_info_group|bank_charge",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.1.3.1",
                  "children": []
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "parentTable",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "primaryKey",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "path",
                    "_type": "text",
                    "value": "data[0].bank_charge",
                    "enabled": true
                  },
                  {
                    "name": "setValue",
                    "_type": "array",
                    "items": [
                      {
                        "source": "",
                        "target": ""
                      }
                    ],
                    "value": "",
                    "enabled": true
                  }
                ]
              }
            },
            {
              "id": "d9bbb8260fd44758b7881b66c3e63052.1.1.1.5",
              "eventContext": "riseListen",
              "value": "BEN,SHA",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.5",
              "children": [
                {
                  "id": "d09e00f0631e41e281343019f9076ab0|5969ac62bb7c49488ff56119a66b33d7.1.1.1.5.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|chrg_info_group|bank_charge",
                  "label": "paymentInfo.v1|chrg_info_group|bank_charge",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|chrg_info_group|bank_charge",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.1.5.1",
                  "children": []
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "parentTable",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "primaryKey",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "path",
                    "_type": "text",
                    "value": "data.charge_amount",
                    "enabled": true
                  },
                  {
                    "name": "setValue",
                    "_type": "array",
                    "items": [
                      {
                        "source": "",
                        "target": ""
                      }
                    ],
                    "value": "",
                    "enabled": true
                  }
                ]
              }
            },
            {
              "id": "d9bbb8260fd44758b7881b66c3e63052.1.1.1.7",
              "eventContext": "riseListen",
              "value": "BEN",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.7",
              "children": [
                {
                  "id": "8f330edd3ad240fa85163fad3e81bac9.1.1.1.7.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|payment_info_group",
                  "label": "paymentInfo.v1|payment_info_group",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|payment_info_group",
                  "elementType": "group",
                  "groupType": "group",
                  "sequence": "1.1.1.7.1",
                  "children": []
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "parentTable",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "primaryKey",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "path",
                    "_type": "text",
                    "value": "data",
                    "enabled": true
                  },
                  {
                    "name": "setValue",
                    "_type": "array",
                    "items": [
                      {
                        "source": "",
                        "target": ""
                      }
                    ],
                    "value": "",
                    "enabled": true
                  }
                ]
              }
            },
            {
              "id": "d9bbb8260fd44758b7881b66c3e63052.1.1.1.8",
              "eventContext": "riseListen",
              "value": "OUR",
              "type": "handlerNode",
              "name": "enableElement",
              "label": "enableElement",
              "sequence": "1.1.1.8",
              "children": [
                {
                  "id": "d09e00f0631e41e281343019f9076ab0|b8e52906f56a4f4da7b3f293cabff14a.1.1.1.8.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|chrg_info_group|correspondent_charge",
                  "label": "paymentInfo.v1|chrg_info_group|correspondent_charge",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|chrg_info_group|correspondent_charge",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.1.8.1",
                  "children": []
                }
              ],
              "hlr": {}
            }
          ],
          "hlr": {
            "params": [
              {
                "name": "status",
                "_type": "text",
                "value": "",
                "enabled": true
              },
              {
                "name": "needClearValue",
                "_type": "boolean",
                "value": false,
                "enabled": true
              }
            ]
          },
          "targetKey": [
            "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationChargeCalulationApi:AFVK:v1|f0384673c93447a4929d8d343cd3e09e"
          ]
        }
      ]
    }
  ]
};
        const eventDetails : any = await eventFunction(eventProperty);
        const eventDetailsArray = eventDetails[0];
        let sourceId : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1";
        sourceId+= "|"+"d09e00f0631e41e281343019f9076ab0";
        const pathIds = SourceIdFilter(eventProperty,"1.1.1");
        let sourceIdNewPath : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1"+"|"+"d09e00f0631e41e281343019f9076ab0"+"|"+eventProperty.id;
        pathIds.map((ele:any,id:number)=>{
          if(id!=pathIds.length-1)
          {
            sourceIdNewPath=sourceIdNewPath+"|"+ele
          }
        })
        for (let k = 0; k < eventDetailsArray.length; k++) {
          if (
            eventDetailsArray[k].type === 'handlerNode' &&
            eventDetailsArray[k].name === 'eventEmitter'
          ) {
            if (
              eventDetailsArray[k].targetKey &&
              eventDetailsArray[k].targetKey.length > 0
            ) {
              uf_getPFDetails= {
              key:eventDetailsArray[k].targetKey[0],
                status: eventDetailsArray[k]?.status,
                sourceId:sourceIdNewPath
              };
            } else if (!eventDetailsArray[k].targetKey) {
              uf_getPFDetails= {
                status: eventDetailsArray[k]?.status,
                sourceId:sourceIdNewPath
              };
            }
          }
        }
      
      if (!uf_getPFDetails.key) {
        throw new Error('Please check PF configuration')
      }

      // Initiate PF
      const uf_initiatePfBody:uf_initiatePfDto={
        key:uf_getPFDetails.key,
        sourceId:sourceIdNewPath
      };

      if (encryptionFlagCont) {
        uf_initiatePfBody["dpdKey"] = encryptionDpd;
        uf_initiatePfBody["method"] = encryptionMethod;
      };

      const uf_initiatePf = await AxiosService.post("/UF/InitiatePF",uf_initiatePfBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if(uf_initiatePf?.data?.error == true){
        toast(uf_initiatePf?.data?.errorDetails?.message, 'danger')
        return
      }

        
      // Call IFO
      const uf_ifoBody:uf_ifoDto={
        formData:{...nullFilter(payment_info_group1bac9),...nullFilter(midynamicactions3b39d),...nullFilter(general_info_groupc83e6),...nullFilter(dbtr_info_group4e8ea),...nullFilter(cr_info_groupb01e8),...nullFilter(add_info_groupe8dc6),...chrg_info_group76ab0,charge_type: getMapperDetailsBindValues[value] },
        key:uf_getPFDetails.key,
        groupId:"d09e00f0631e41e281343019f9076ab0",
        controlId:"d9bbb8260fd44758b7881b66c3e63052"
      };

      if (encryptionFlagCont) {
        uf_ifoBody["dpdKey"] = encryptionDpd;
        uf_ifoBody["method"] = encryptionMethod;
      } 

      const uf_ifo = await AxiosService.post('/UF/ifo', uf_ifoBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (uf_ifo?.data?.error == true) {
        toast(uf_ifo?.data?.errorDetails?.message, 'danger')
        return
      }

      //eventEmitter
      const { key, nodeId, nodeType, nodeName } = uf_initiatePf.data.nodeProperty || {};
      const  te_eventEmitterBody: te_eventEmitterDto = {
          key: key,
          nodeId: nodeId,
          nodeType: nodeType,
          nodeName: nodeName,
          data:[{...uf_ifo?.data }],
          event : uf_initiatePf.data.eventProperty?.source?.status,
          sourceId : uf_initiatePf.data.eventProperty?.sourceId,
          controlName: "charge_type",
          upId : chrg_info_group76ab0?.upId? [chrg_info_group76ab0?.upId ] : lockedData.processIds,

      };
      
      if (chrg_info_group76ab0Props.ssKey !== '' && chrg_info_group76ab0Props.ssKey !== undefined) {
        te_eventEmitterBody["ssKey"] = chrg_info_group76ab0Props.ssKey;
      }
      
      if (encryptionFlagCont) {
        te_eventEmitterBody["dpdKey"] = encryptionDpd;
        te_eventEmitterBody["method"] = encryptionMethod;
      }
      
      te_eventEmitter = await AxiosService.post(
        '/te/eventEmitter',
        te_eventEmitterBody,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (te_eventEmitter?.data?.error == true) {
        toast(te_eventEmitter?.data?.errorDetails?.message, 'danger')
        throw te_eventEmitter?.data?.errorDetails?.message
      }
      // copyFormData
    if (value === "OUR") {
                  // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store paymentInfo.v1|chrg_info_group|correspondent_charge
              copyFormhandlerData["setchrg_info_group76ab0"]={...copyFormhandlerData["setchrg_info_group76ab0"],[UOmapperData['b8e52906f56a4f4da7b3f293cabff14a']['source']]:commonSepareteDataFromTheObject("data[0].correspondent_charge",te_eventEmitter?.data)}
    }
      // copyFormData
    if (value === "OUR") {
                  // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store paymentInfo.v1|chrg_info_group|bank_charge
              copyFormhandlerData["setchrg_info_group76ab0"]={...copyFormhandlerData["setchrg_info_group76ab0"],[UOmapperData['5969ac62bb7c49488ff56119a66b33d7']['source']]:commonSepareteDataFromTheObject("data[0].bank_charge",te_eventEmitter?.data)}
    }
      // copyFormData
    if (value === "BEN" || value === "SHA") {
                  // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store paymentInfo.v1|chrg_info_group|bank_charge
              copyFormhandlerData["setchrg_info_group76ab0"]={...copyFormhandlerData["setchrg_info_group76ab0"],[UOmapperData['5969ac62bb7c49488ff56119a66b33d7']['source']]:commonSepareteDataFromTheObject("data.charge_amount",te_eventEmitter?.data)}
    }
      // copyFormData
    if (value === "BEN") {
            setpayment_info_group1bac9({...chrg_info_group76ab0,...commonSepareteDataFromTheObject("data",te_eventEmitter?.data)});
    }
      //enableElement
    if (value === "OUR") {
      setcorrespondent_chargeff14a((prev: any) => ({ ...prev, isDisabled: false }))
    }
      if("setchrg_info_group76ab0" in copyFormhandlerData){
        setchrg_info_group76ab0((pre:any)=>({...pre,...copyFormhandlerData["setchrg_info_group76ab0"]}) )
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
   
  async function handleConfirmonClick(){
  } 
  const { validateRefetch, setValidateRefetch } = useContext(
    TotalContext
  ) as TotalContextProps
  //validation


  let schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
  const handleBlur = async () => {
    //validation
    if(chrg_info_group76ab0?.charge_type == "" || chrg_info_group76ab0?.charge_type == undefined){
      chrg_info_group76ab0.charge_type = "";
      const validate:any = v.safeParse(schema, chrg_info_group76ab0?.charge_type);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,charge_type:"invalid"}}));
        }
    }else if(chrg_info_group76ab0?.charge_type !== ""){
    const validate:any = v.safeParse(schema, chrg_info_group76ab0?.charge_type);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,charge_type:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,charge_type:undefined}}));
      }
    }
  }
  const chrg_info_group76ab0Ref = useRef<any>(chrg_info_group76ab0);
  useEffect(() => { chrg_info_group76ab0Ref.current = chrg_info_group76ab0; }, [chrg_info_group76ab0]);
    useEffect(()=>{
        if(!chrg_info_group76ab0?.charge_type)
        { 
          setchrg_info_group76ab0Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "d9bbb8260fd44758b7881b66c3e63052") {
        handleClick(chrg_info_group76ab0Ref?.current?.charge_type63052?chrg_info_group76ab0Ref?.current?.charge_type63052:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "d9bbb8260fd44758b7881b66c3e63052");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setchrg_info_group76ab0((pre:any)=>({...pre,charge_type:""}))
    else
      setInitialCount(1)
  },[charge_type63052?.refresh])
  

  if (charge_type63052?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 9`,
        gridRow: `8 / 22`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className="!rounded-lg"    
        disabled= {charge_type63052?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Charge Type
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={charge_typeOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={chrg_info_group76ab0?.charge_type63052 ? [chrg_info_group76ab0?.charge_type63052] : (chrg_info_group76ab0?.charge_type ? dropdownValue : [])}
        validationState={validate?.paymentInfo_v1?.charge_type ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdowncharge_type;
