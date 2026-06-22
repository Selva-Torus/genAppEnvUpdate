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
import PageAddsoftwarelicensesdocumentpage2 from '@/app/addsoftwarelicensesdocument_v1/addsoftwarelicensesdocument_v1page';
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
 

const Buttonbt_add_doc = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const {addsoftwarelicensesdocument_v1Props, setaddsoftwarelicensesdocument_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupc3d26, setdoc_attached_groupc3d26}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupc3d26Props, setdoc_attached_groupc3d26Props}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_doc_table265b6, setsoftware_licenses_doc_table265b6}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_doc_table265b6Props, setsoftware_licenses_doc_table265b6Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group7bc52, settable_group7bc52}= useContext(TotalContext) as TotalContextProps;
  const {table_group7bc52Props, settable_group7bc52Props}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['addsoftwarelicensesdocument_v1'] = addsoftwarelicensesdocument_v1Props,
      codeStates['setaddsoftwarelicensesdocument_v1'] = setaddsoftwarelicensesdocument_v1Props,
      codeStates['doc_attached_group'] = doc_attached_groupc3d26,
      codeStates['setdoc_attached_group'] = setdoc_attached_groupc3d26,
      codeStates['doc_attached_groupc3d26'] = doc_attached_groupc3d26Props,
      codeStates['setdoc_attached_groupc3d26'] = setdoc_attached_groupc3d26Props,
      codeStates['software_licenses_doc_table'] = software_licenses_doc_table265b6,
      codeStates['setsoftware_licenses_doc_table'] = setsoftware_licenses_doc_table265b6,
      codeStates['software_licenses_doc_table265b6'] = software_licenses_doc_table265b6Props,
      codeStates['setsoftware_licenses_doc_table265b6'] = setsoftware_licenses_doc_table265b6Props,
      codeStates['table_group'] = table_group7bc52,
      codeStates['settable_group'] = settable_group7bc52,
      codeStates['table_group7bc52'] = table_group7bc52Props,
      codeStates['settable_group7bc52'] = settable_group7bc52Props,
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
        "e294b65167f549478a2dac6692ee2f55"
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
      if (id === "bt_add_doce2f55") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[bt_add_doce2f55?.refresh])

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
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:softwareDocTable:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "f5167bb22af252cf69d95c4613936d43",
        "object": {
          "properties.license_id": "24ac99a9fde34b27a65ad2d8f4187b4a"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setaddsoftwarelicensesdocument_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,doc_attached_groupc3d26Props?.controls);
    setdoc_attached_groupc3d26(bindData4||{})
    setdoc_attached_groupc3d26Props({...doc_attached_groupc3d26Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,software_licenses_doc_table265b6Props?.controls);
    setsoftware_licenses_doc_table265b6(bindData6||{})
    setsoftware_licenses_doc_table265b6Props({...software_licenses_doc_table265b6Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,table_group7bc52Props?.controls);
    settable_group7bc52(bindData8||{})
    settable_group7bc52Props({...table_group7bc52Props,presetValues:mainData||{}})  
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

 if (bt_add_doce2f55?.isHidden) {
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
        title="Attachments"
        showOverlay = {true}
        position = {"center"}
        modalName = "addsoftwarelicensesdocument"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddsoftwarelicensesdocumentpage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {bt_add_doce2f55?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Attachments")}
        </Button>}
      </div>
    
  )
}

export default Buttonbt_add_doc

