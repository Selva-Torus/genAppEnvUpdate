'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { nullFilter } from '@/app/utils/nullDataFilter';
import {commonSepareteDataFromTheObject, eventFunction, filterByKeys } from '@/app/utils/eventFunction';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import {Modal} from '@/components/Modal';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import evaluateDecisionTable  from '@/app/utils/evaluateDecisionTable';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGridPositionFromOrder } from '@/app/utils/getGridPositionFromOrder';
import { Scan } from '@/app/utils/scanService';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import PageAddlicenseviewpage2 from '@/app/addlicenseview_v1/addlicenseview_v1page';
import { XMLParser } from 'fast-xml-parser'

    

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map(key => {
      // Determine the modifier based on the type of the value
      const value = obj[key];
      let modifiedKey = key;

      if (typeof value === 'string') {
        modifiedKey += '-contains';  // Append '-contains' if value is a string
      } else if (typeof value === 'number') {
        modifiedKey += '-equals';    // Append '-equals' if value is a number
      }

      // Return the key-value pair with the modified key
      return `${encodeURIComponent(modifiedKey)}=${encodeURIComponent(value)}`;
    })
    .join('&');
}
 

const Buttonview = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
  const token:string = getCookie('token');
  const {currentToken, setCurrentToken} = useContext(TotalContext) as TotalContextProps;
  const decodedTokenObj:any = decodeToken(token);
  const createdBy : string = decodedTokenObj.users;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const [selectedData,setSelectedData]=useState<any[]>()
  useEffect(()=>{
    setSelectedData([lockedData?.data||{}])
  },[lockedData])

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const savedData=useRef<Record<string, any>>({})
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function=useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const lockMode:any = lockedData?.lockMode;
  const [loading, setLoading] = useState<boolean>(false);
  const routes : AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  let actionLockData : any = {"lockMode":"","name":"","ttl":""}
  const [allCode,setAllCode]=useState<string>("");
  const [gridPosition, setGridPosition] = useState<any>({ gridColumn: '1 / 3', gridRow: '1 / 12' });
  ////showComponentAsPopup || showArtifactAsModal
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {overall_softwarelicenses_group04cba, setoverall_softwarelicenses_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_softwarelicenses_group04cbaProps, setoverall_softwarelicenses_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group44cf7, seticon_text_group44cf7}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group44cf7Props, seticon_text_group44cf7Props}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_table75a5d, setsoftware_licenses_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_table75a5dProps, setsoftware_licenses_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  const {license_id87b4a, setlicense_id87b4a}= useContext(TotalContext) as TotalContextProps;
  const {product_namedaa81, setproduct_namedaa81}= useContext(TotalContext) as TotalContextProps;
  const {license_typeba0b9, setlicense_typeba0b9}= useContext(TotalContext) as TotalContextProps;
  const {seats_totalc4b88, setseats_totalc4b88}= useContext(TotalContext) as TotalContextProps;
  const {seats_used910b8, setseats_used910b8}= useContext(TotalContext) as TotalContextProps;
  const {expiry_date7fb4b, setexpiry_date7fb4b}= useContext(TotalContext) as TotalContextProps;
  const {cost0d30b, setcost0d30b}= useContext(TotalContext) as TotalContextProps;
  const {view113d0, setview113d0}= useContext(TotalContext) as TotalContextProps;
  const {edit_btne7446, setedit_btne7446}= useContext(TotalContext) as TotalContextProps;
  const {button_delete6b394, setbutton_delete6b394}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_doce2f55, setbt_add_doce2f55}= useContext(TotalContext) as TotalContextProps;
  const {addlicenseview_v1Props, setaddlicenseview_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {add_license_group1bee6, setadd_license_group1bee6}= useContext(TotalContext) as TotalContextProps;
  const {add_license_group1bee6Props, setadd_license_group1bee6Props}= useContext(TotalContext) as TotalContextProps;
  const {license_information_group4e03c, setlicense_information_group4e03c}= useContext(TotalContext) as TotalContextProps;
  const {license_information_group4e03cProps, setlicense_information_group4e03cProps}= useContext(TotalContext) as TotalContextProps;
  const {license_configuration_groupa329d, setlicense_configuration_groupa329d}= useContext(TotalContext) as TotalContextProps;
  const {license_configuration_groupa329dProps, setlicense_configuration_groupa329dProps}= useContext(TotalContext) as TotalContextProps;
  const {validity_financial_details_groupb8a9f, setvalidity_financial_details_groupb8a9f}= useContext(TotalContext) as TotalContextProps;
  const {validity_financial_details_groupb8a9fProps, setvalidity_financial_details_groupb8a9fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_softwarelicenses_group'] = overall_softwarelicenses_group04cba,
      codeStates['setoverall_softwarelicenses_group'] = setoverall_softwarelicenses_group04cba,
      codeStates['overall_softwarelicenses_group04cba'] = overall_softwarelicenses_group04cbaProps,
      codeStates['setoverall_softwarelicenses_group04cba'] = setoverall_softwarelicenses_group04cbaProps,
      codeStates['icon_text_group'] = icon_text_group44cf7,
      codeStates['seticon_text_group'] = seticon_text_group44cf7,
      codeStates['icon_text_group44cf7'] = icon_text_group44cf7Props,
      codeStates['seticon_text_group44cf7'] = seticon_text_group44cf7Props,
      codeStates['software_licenses_table'] = software_licenses_table75a5d,
      codeStates['setsoftware_licenses_table'] = setsoftware_licenses_table75a5d,
      codeStates['software_licenses_table75a5d'] = software_licenses_table75a5dProps,
      codeStates['setsoftware_licenses_table75a5d'] = setsoftware_licenses_table75a5dProps,
      codeStates['license_id'] = license_id87b4a,
      codeStates['setlicense_id'] = setlicense_id87b4a,
      codeStates['product_name'] = product_namedaa81,
      codeStates['setproduct_name'] = setproduct_namedaa81,
      codeStates['license_type'] = license_typeba0b9,
      codeStates['setlicense_type'] = setlicense_typeba0b9,
      codeStates['seats_total'] = seats_totalc4b88,
      codeStates['setseats_total'] = setseats_totalc4b88,
      codeStates['seats_used'] = seats_used910b8,
      codeStates['setseats_used'] = setseats_used910b8,
      codeStates['expiry_date'] = expiry_date7fb4b,
      codeStates['setexpiry_date'] = setexpiry_date7fb4b,
      codeStates['cost'] = cost0d30b,
      codeStates['setcost'] = setcost0d30b,
      codeStates['view'] = view113d0,
      codeStates['setview'] = setview113d0,
      codeStates['edit_btn'] = edit_btne7446,
      codeStates['setedit_btn'] = setedit_btne7446,
      codeStates['button_delete'] = button_delete6b394,
      codeStates['setbutton_delete'] = setbutton_delete6b394,
      codeStates['bt_add_doc'] = bt_add_doce2f55,
      codeStates['setbt_add_doc'] = setbt_add_doce2f55,
      codeStates['addlicenseview_v1'] = addlicenseview_v1Props,
      codeStates['setaddlicenseview_v1'] = setaddlicenseview_v1Props,
      codeStates['add_license_group'] = add_license_group1bee6,
      codeStates['setadd_license_group'] = setadd_license_group1bee6,
      codeStates['add_license_group1bee6'] = add_license_group1bee6Props,
      codeStates['setadd_license_group1bee6'] = setadd_license_group1bee6Props,
      codeStates['license_information_group'] = license_information_group4e03c,
      codeStates['setlicense_information_group'] = setlicense_information_group4e03c,
      codeStates['license_information_group4e03c'] = license_information_group4e03cProps,
      codeStates['setlicense_information_group4e03c'] = setlicense_information_group4e03cProps,
      codeStates['license_configuration_group'] = license_configuration_groupa329d,
      codeStates['setlicense_configuration_group'] = setlicense_configuration_groupa329d,
      codeStates['license_configuration_groupa329d'] = license_configuration_groupa329dProps,
      codeStates['setlicense_configuration_groupa329d'] = setlicense_configuration_groupa329dProps,
      codeStates['validity_financial_details_group'] = validity_financial_details_groupb8a9f,
      codeStates['setvalidity_financial_details_group'] = setvalidity_financial_details_groupb8a9f,
      codeStates['validity_financial_details_groupb8a9f'] = validity_financial_details_groupb8a9fProps,
      codeStates['setvalidity_financial_details_groupb8a9f'] = setvalidity_financial_details_groupb8a9fProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "356fd7ddf8ed4df7909d896283975a5d",
        "6b28809502244f41a769c1b385c113d0"
      );
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code);
      setPaginationData((pre: any) => ({
      ...pre,
          page: +orchestrationData?.data?.action?.pagination?.page || 1,
          pageSize: +orchestrationData?.data?.action?.pagination?.count || 1000
    }))
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    eventBus.on("triggerButton", (id:any) => {
      if (id === "view113d0") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[view113d0?.refresh])

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

  const handleClick=async()=>{
    try{  
      setIsProcessing(true);
      await delay(1000);
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "a1f54b62a6e841a3810307b90725a55a",
        "object": {
          "properties.license_id": "24ac99a9fde34b27a65ad2d8f4187b4a"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setaddlicenseview_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,add_license_group1bee6Props?.controls);
    setadd_license_group1bee6(bindData4||{})
    setadd_license_group1bee6Props({...add_license_group1bee6Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,license_information_group4e03cProps?.controls);
    setlicense_information_group4e03c(bindData6||{})
    setlicense_information_group4e03cProps({...license_information_group4e03cProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,license_configuration_groupa329dProps?.controls);
    setlicense_configuration_groupa329d(bindData8||{})
    setlicense_configuration_groupa329dProps({...license_configuration_groupa329dProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,validity_financial_details_groupb8a9fProps?.controls);
    setvalidity_financial_details_groupb8a9f(bindData10||{})
    setvalidity_financial_details_groupb8a9fProps({...validity_financial_details_groupb8a9fProps,presetValues:mainData||{}})  
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
    }
  }
    async function handleConfirmOnClick(){
      try{
        //confirmMsg
      }catch(err){
        toast(err, 'danger');
      }
    } 


    async function handleConfirmOnCancel(){
      try{
        //confirmMsg
      }catch(err){
        toast(err, 'danger');
      }
    }

 if (view113d0?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1','assetsoftwarelicenses','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="View Software Licenses"
        showOverlay = {true}
        position = {"center"}
        modalName = "addlicenseview"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddlicenseviewpage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {view113d0?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("View")}
        </Button>}
      </div>
    
  )
}

export default Buttonview

