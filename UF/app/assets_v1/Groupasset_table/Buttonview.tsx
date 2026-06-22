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
import PageNewassetviewpage2 from '@/app/newassetview_v1/newassetview_v1page';
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

  const {overall_asset_group7ded2, setoverall_asset_group7ded2}= useContext(TotalContext) as TotalContextProps;
  const {overall_asset_group7ded2Props, setoverall_asset_group7ded2Props}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group476bd, seticon_text_group476bd}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group476bdProps, seticon_text_group476bdProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_tablef2b38, setasset_tablef2b38}= useContext(TotalContext) as TotalContextProps;
  const {asset_tablef2b38Props, setasset_tablef2b38Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_id0e8f6, setasset_id0e8f6}= useContext(TotalContext) as TotalContextProps;
  const {asset_tagd67f5, setasset_tagd67f5}= useContext(TotalContext) as TotalContextProps;
  const {asset_name64bee, setasset_name64bee}= useContext(TotalContext) as TotalContextProps;
  const {category3fb9d, setcategory3fb9d}= useContext(TotalContext) as TotalContextProps;
  const {serial_no107f3, setserial_no107f3}= useContext(TotalContext) as TotalContextProps;
  const {status26d3e, setstatus26d3e}= useContext(TotalContext) as TotalContextProps;
  const {assigned_toea420, setassigned_toea420}= useContext(TotalContext) as TotalContextProps;
  const {location96640, setlocation96640}= useContext(TotalContext) as TotalContextProps;
  const {warranty_expiryd732d, setwarranty_expiryd732d}= useContext(TotalContext) as TotalContextProps;
  const {viewadef5, setviewadef5}= useContext(TotalContext) as TotalContextProps;
  const {bt_delete26265, setbt_delete26265}= useContext(TotalContext) as TotalContextProps;
  const {bt_edit17748, setbt_edit17748}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_docb191a, setbt_add_docb191a}= useContext(TotalContext) as TotalContextProps;
  const {newassetview_v1Props, setnewassetview_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {new_asset_group3261e, setnew_asset_group3261e}= useContext(TotalContext) as TotalContextProps;
  const {new_asset_group3261eProps, setnew_asset_group3261eProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupcc113, setasset_info_groupcc113}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupcc113Props, setasset_info_groupcc113Props}= useContext(TotalContext) as TotalContextProps;
  const {classification_groupd9d65, setclassification_groupd9d65}= useContext(TotalContext) as TotalContextProps;
  const {classification_groupd9d65Props, setclassification_groupd9d65Props}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_groupaff35, setadditional_details_groupaff35}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_groupaff35Props, setadditional_details_groupaff35Props}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_groupc3900, setpyrchase_details_groupc3900}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_groupc3900Props, setpyrchase_details_groupc3900Props}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_group67f77, setdisposal_details_group67f77}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_group67f77Props, setdisposal_details_group67f77Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_asset_group'] = overall_asset_group7ded2,
      codeStates['setoverall_asset_group'] = setoverall_asset_group7ded2,
      codeStates['overall_asset_group7ded2'] = overall_asset_group7ded2Props,
      codeStates['setoverall_asset_group7ded2'] = setoverall_asset_group7ded2Props,
      codeStates['icon_text_group'] = icon_text_group476bd,
      codeStates['seticon_text_group'] = seticon_text_group476bd,
      codeStates['icon_text_group476bd'] = icon_text_group476bdProps,
      codeStates['seticon_text_group476bd'] = seticon_text_group476bdProps,
      codeStates['asset_table'] = asset_tablef2b38,
      codeStates['setasset_table'] = setasset_tablef2b38,
      codeStates['asset_tablef2b38'] = asset_tablef2b38Props,
      codeStates['setasset_tablef2b38'] = setasset_tablef2b38Props,
      codeStates['asset_id'] = asset_id0e8f6,
      codeStates['setasset_id'] = setasset_id0e8f6,
      codeStates['asset_tag'] = asset_tagd67f5,
      codeStates['setasset_tag'] = setasset_tagd67f5,
      codeStates['asset_name'] = asset_name64bee,
      codeStates['setasset_name'] = setasset_name64bee,
      codeStates['category'] = category3fb9d,
      codeStates['setcategory'] = setcategory3fb9d,
      codeStates['serial_no'] = serial_no107f3,
      codeStates['setserial_no'] = setserial_no107f3,
      codeStates['status'] = status26d3e,
      codeStates['setstatus'] = setstatus26d3e,
      codeStates['assigned_to'] = assigned_toea420,
      codeStates['setassigned_to'] = setassigned_toea420,
      codeStates['location'] = location96640,
      codeStates['setlocation'] = setlocation96640,
      codeStates['warranty_expiry'] = warranty_expiryd732d,
      codeStates['setwarranty_expiry'] = setwarranty_expiryd732d,
      codeStates['view'] = viewadef5,
      codeStates['setview'] = setviewadef5,
      codeStates['bt_delete'] = bt_delete26265,
      codeStates['setbt_delete'] = setbt_delete26265,
      codeStates['bt_edit'] = bt_edit17748,
      codeStates['setbt_edit'] = setbt_edit17748,
      codeStates['bt_add_doc'] = bt_add_docb191a,
      codeStates['setbt_add_doc'] = setbt_add_docb191a,
      codeStates['newassetview_v1'] = newassetview_v1Props,
      codeStates['setnewassetview_v1'] = setnewassetview_v1Props,
      codeStates['new_asset_group'] = new_asset_group3261e,
      codeStates['setnew_asset_group'] = setnew_asset_group3261e,
      codeStates['new_asset_group3261e'] = new_asset_group3261eProps,
      codeStates['setnew_asset_group3261e'] = setnew_asset_group3261eProps,
      codeStates['asset_info_group'] = asset_info_groupcc113,
      codeStates['setasset_info_group'] = setasset_info_groupcc113,
      codeStates['asset_info_groupcc113'] = asset_info_groupcc113Props,
      codeStates['setasset_info_groupcc113'] = setasset_info_groupcc113Props,
      codeStates['classification_group'] = classification_groupd9d65,
      codeStates['setclassification_group'] = setclassification_groupd9d65,
      codeStates['classification_groupd9d65'] = classification_groupd9d65Props,
      codeStates['setclassification_groupd9d65'] = setclassification_groupd9d65Props,
      codeStates['additional_details_group'] = additional_details_groupaff35,
      codeStates['setadditional_details_group'] = setadditional_details_groupaff35,
      codeStates['additional_details_groupaff35'] = additional_details_groupaff35Props,
      codeStates['setadditional_details_groupaff35'] = setadditional_details_groupaff35Props,
      codeStates['pyrchase_details_group'] = pyrchase_details_groupc3900,
      codeStates['setpyrchase_details_group'] = setpyrchase_details_groupc3900,
      codeStates['pyrchase_details_groupc3900'] = pyrchase_details_groupc3900Props,
      codeStates['setpyrchase_details_groupc3900'] = setpyrchase_details_groupc3900Props,
      codeStates['disposal_details_group'] = disposal_details_group67f77,
      codeStates['setdisposal_details_group'] = setdisposal_details_group67f77,
      codeStates['disposal_details_group67f77'] = disposal_details_group67f77Props,
      codeStates['setdisposal_details_group67f77'] = setdisposal_details_group67f77Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "2f7c1caa85a04bb5bacd9e41b26f2b38",
        "58dbe034afeb408299058092447adef5"
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
      if (id === "viewadef5") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[viewadef5?.refresh])

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
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "19752269565d4be2be63be1bd8cf4ff6",
        "object": {
          "properties.asset_id": "823d024d095240bc9f127486d790e8f6"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setnewassetview_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    setnew_asset_group3261e(mainData||{})
    setnew_asset_group3261eProps({...new_asset_group3261eProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    setasset_info_groupcc113(mainData||{})
    setasset_info_groupcc113Props({...asset_info_groupcc113Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    setclassification_groupd9d65(mainData||{})
    setclassification_groupd9d65Props({...classification_groupd9d65Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    setadditional_details_groupaff35(mainData||{})
    setadditional_details_groupaff35Props({...additional_details_groupaff35Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    setpyrchase_details_groupc3900(mainData||{})
    setpyrchase_details_groupc3900Props({...pyrchase_details_groupc3900Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    setdisposal_details_group67f77(mainData||{})
    setdisposal_details_group67f77Props({...disposal_details_group67f77Props,presetValues:mainData||{}})  
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

 if (viewadef5?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1','assets','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="View Asset"
        showOverlay = {true}
        position = {"center"}
        modalName = "newassetview"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageNewassetviewpage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {viewadef5?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("View")}
        </Button>}
      </div>
    
  )
}

export default Buttonview

