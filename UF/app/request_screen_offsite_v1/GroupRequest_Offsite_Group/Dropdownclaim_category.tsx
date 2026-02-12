

'use client'    
import React, { useState,useContext,useEffect,useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { getMapperDetailsDto, te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/app/components/cookieMgment';
import { getDropdownDetailsNew } from '@/app/utils/getMapperDetails';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import { Dropdown } from '@/components/Dropdown';
import { Text } from '@/components/Text';
import {Modal} from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import * as v from 'valibot';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";

let getMapperDetailsBindValues:Record<string, any> ={};
const Dropdownclaim_category = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagCompData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  let customecode:string="";
  let ruleCode:string={};
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_code_description_v1Props, setdfd_code_description_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const { validate, setValidate } = useContext(
    TotalContext
  ) as TotalContextProps
  const handleDfdRefresh = useHandleDfdRefresh();
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const keyset:any=i18n.keyset("language");
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
 /////////////
   //another screen
  const {request_offsite_group429cb, setrequest_offsite_group429cb}= useContext(TotalContext) as TotalContextProps; 
  const {request_offsite_group429cbProps, setrequest_offsite_group429cbProps}= useContext(TotalContext) as TotalContextProps; 
  const {offsite_expense39c39, setoffsite_expense39c39}= useContext(TotalContext) as TotalContextProps; 
  const {claim_expense_type51f6e, setclaim_expense_type51f6e}= useContext(TotalContext) as TotalContextProps; 
  const {expense_namebf755, setexpense_namebf755}= useContext(TotalContext) as TotalContextProps; 
  const {from_date6f9c3, setfrom_date6f9c3}= useContext(TotalContext) as TotalContextProps; 
  const {to_date6db82, setto_date6db82}= useContext(TotalContext) as TotalContextProps; 
  const {claim_categorya4a14, setclaim_categorya4a14}= useContext(TotalContext) as TotalContextProps; 
  const {category_total_amounte603b, setcategory_total_amounte603b}= useContext(TotalContext) as TotalContextProps; 
  const {attachmentc9c51, setattachmentc9c51}= useContext(TotalContext) as TotalContextProps; 
  const {receipt_imageafe30, setreceipt_imageafe30}= useContext(TotalContext) as TotalContextProps; 
  const {comments65b18, setcomments65b18}= useContext(TotalContext) as TotalContextProps; 
  const {enableeff29, setenableeff29}= useContext(TotalContext) as TotalContextProps; 
  const {is_comment_enabled5ca5f, setis_comment_enabled5ca5f}= useContext(TotalContext) as TotalContextProps; 
  const {clear2b3e6, setclear2b3e6}= useContext(TotalContext) as TotalContextProps; 
  const {add5cae4, setadd5cae4}= useContext(TotalContext) as TotalContextProps; 
  const {claims_detail_tablef8143, setclaims_detail_tablef8143}= useContext(TotalContext) as TotalContextProps; 
  const {claims_detail_tablef8143Props, setclaims_detail_tablef8143Props}= useContext(TotalContext) as TotalContextProps; 
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [claim_categoryOptions, setclaim_categoryOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any
  category = "";

  const getDropdownData = async(value?:any)=>{
    let te_refreshBody:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:code_description:AFVK:v1"+":",
          refreshFlag: "Y",                
          count:1000,
          page:1
        }
        if (encryptionFlagCont) {
          te_refreshBody["dpdKey"] = encryptionDpd;
          te_refreshBody["method"] = encryptionMethod;
        }
        const te_refreshData:any=await AxiosService.post("/te/eventEmitter",te_refreshBody,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if(te_refreshData?.data?.error == true){
          toast(te_refreshData?.data?.errorDetails?.message, 'danger')
        }else{
          //setdfd_code_description_v1Props(te_refreshData?.data?.dataset?.data || [])
        }
    let dfData = te_refreshData?.data?.dataset?.data
    let mapperColumn: string =  `cdcategory`
    let mapperText: string =  `cdcategory`

  try{
    getMapperDetails = await getDropdownDetailsNew(dfData,mapperColumn,mapperText,category, bindtranValue, code)
    getMapperDetailsValues = await getDropdownDetailsNew(dfData,mapperText,mapperColumn,category, bindtranValue, code)
    if(!bindtranValue){
      getMapperDetails.map((item: any) => {
        getMapperDetailsBindValues[item] = getMapperDetailsValues[getMapperDetails.indexOf(item)];
      })
    }
    if(!value){
    let temp:any[] = getMapperDetails.filter((item:any, index:any) => getMapperDetails.indexOf(item) === index)
    temp = temp.filter((ele:any)=>ele)
    setclaim_categoryOptions(temp);
    }
    } catch (error) {
      console.error("Error fetching mapper details for dropdown:", error);
    }
  }
  
  useEffect(() => {
    getDropdownData()
  },[claim_categorya4a14?.refresh])

  const handlechange = async(value: any) => {
    if(value.length>0){
      setrequest_offsite_group429cb((prev: any) => ({ ...prev, cdcategory: getMapperDetailsBindValues[value],cdcategory: value }))
        setIsRequredData(false)
    }else{
      let temp:any = request_offsite_group429cb
      delete temp.cdcategory
      delete temp.cdcategory
      setrequest_offsite_group429cb(temp)
      getDropdownData()
      setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,cdcategory:undefined}))
  };

  useEffect(() => {
    if(Array.isArray(dfd_code_description_v1Props) && dfd_code_description_v1Props?.length == 1){
    // setrequest_offsite_group429cb((pre:any)=>({...pre,cdcategory:dfd_code_description_v1Props[0]?.cdcategory}))
    }
  },[dfd_code_description_v1Props])


  const handleClick=async(value?:any)=>{
    if (value.length > 0) {
      let temp:any=[]
      if(Array.isArray(value)){
        for( let val of value){
          if(Array.isArray(val)){
            // let temp2=
            temp.push(val)
          }else{
            temp.push(val)   
          }
        }
      }
      setrequest_offsite_group429cb((prev: any) => ({ ...prev, cdcategory: getMapperDetailsBindValues[value]}))
      setIsRequredData(false) 
    }else {
      setrequest_offsite_group429cb((prev: any) => ({ ...prev, cdcategory: ''}))
      setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,cdcategory:undefined}))
    if (customecode != '') {
      let codeStates: any = {}
            codeStates['request_offsite_group']  = request_offsite_group429cb,
            codeStates['setrequest_offsite_group'] = setrequest_offsite_group429cb,
            codeStates['claims_detail_table']  = claims_detail_tablef8143,
            codeStates['setclaims_detail_table'] = setclaims_detail_tablef8143,
    codeExecution(customecode,codeStates)
    }
  }
   
  const { validateRefetch, setValidateRefetch } = useContext(
    TotalContext
  ) as TotalContextProps
  let schemaArray = [] ;
  const handleBlur = async () => {
  }
    useEffect(()=>{
        handleBlur()
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
      setrequest_offsite_group429cb((pre:any)=>({...pre,cdcategory:""}))
    else
      setInitialCount(1)
  },[claim_categorya4a14?.refresh])

  if (claim_categorya4a14?.isHidden) {
    return <></>
  }
  return (
    <div 
      style={{
        gridColumn: `5 / 20`,
        gridRow: `67 / 84`, 
        gap:``, 
        height: `100%`, 
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {claim_categorya4a14?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Category
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={claim_categoryOptions}
        placeholder={keyset("")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={request_offsite_group429cb?.cdcategory ? [request_offsite_group429cb?.cdcategory] : []}
      />
        {validate?.claim_category && (
          <Text fillContainer={false} variant="caption-1" color="danger" className="mt-1 flex-shrink-0">
            {error || 'This field is required'}
          </Text>
        )}   
    </div>
  );
};

export default Dropdownclaim_category;
