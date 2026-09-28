'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
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
import ExportOptionsModal from '../../utils/ExportOptionsModal';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import PageViewintegrationfieldmappage2 from '@/app/viewintegrationfieldmap_v1/viewintegrationfieldmap_v1page';
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
 

const Buttonview_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
  const { token } = useGlobal();
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
  const [exportModalOpen, setExportModalOpen] = React.useState<boolean>(false);
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
  const savedData=useRef<Record<string, any>>({});
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
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {integration_field_map_grp96a61, setintegration_field_map_grp96a61}= useContext(TotalContext) as TotalContextProps;
  const {integration_field_map_grp96a61Props, setintegration_field_map_grp96a61Props}= useContext(TotalContext) as TotalContextProps;
  const {integration_field_map_tablebda50, setintegration_field_map_tablebda50}= useContext(TotalContext) as TotalContextProps;
  const {integration_field_map_tablebda50Props, setintegration_field_map_tablebda50Props}= useContext(TotalContext) as TotalContextProps;
  const {field_map_id6f47d, setfield_map_id6f47d}= useContext(TotalContext) as TotalContextProps;
  const {source_field_path634e8, setsource_field_path634e8}= useContext(TotalContext) as TotalContextProps;
  const {target_entity002be, settarget_entity002be}= useContext(TotalContext) as TotalContextProps;
  const {target_attribute8c6c9, settarget_attribute8c6c9}= useContext(TotalContext) as TotalContextProps;
  const {transform_rule318b0, settransform_rule318b0}= useContext(TotalContext) as TotalContextProps;
  const {is_active297f0, setis_active297f0}= useContext(TotalContext) as TotalContextProps;
  const {view_btnef5f3, setview_btnef5f3}= useContext(TotalContext) as TotalContextProps;
  const {edit_btnd38b9, setedit_btnd38b9}= useContext(TotalContext) as TotalContextProps;
  const {del_btn7b833, setdel_btn7b833}= useContext(TotalContext) as TotalContextProps;
  const {viewintegrationfieldmap_v1Props, setviewintegrationfieldmap_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {add_field_map_grp74a39, setadd_field_map_grp74a39}= useContext(TotalContext) as TotalContextProps;
  const {add_field_map_grp74a39Props, setadd_field_map_grp74a39Props}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp2cb2f, setfield_rules_grp2cb2f}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp2cb2fProps, setfield_rules_grp2cb2fProps}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp99571, setsource_mapping_grp99571}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp99571Props, setsource_mapping_grp99571Props}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grp841a3, settarget_mapping_grp841a3}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grp841a3Props, settarget_mapping_grp841a3Props}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp75a9a, settransformation_grp75a9a}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp75a9aProps, settransformation_grp75a9aProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['integration_field_map_grp'] = integration_field_map_grp96a61,
      codeStates['setintegration_field_map_grp'] = setintegration_field_map_grp96a61,
      codeStates['integration_field_map_grp96a61'] = integration_field_map_grp96a61Props,
      codeStates['setintegration_field_map_grp96a61'] = setintegration_field_map_grp96a61Props,
      codeStates['integration_field_map_table'] = integration_field_map_tablebda50,
      codeStates['setintegration_field_map_table'] = setintegration_field_map_tablebda50,
      codeStates['integration_field_map_tablebda50'] = integration_field_map_tablebda50Props,
      codeStates['setintegration_field_map_tablebda50'] = setintegration_field_map_tablebda50Props,
      codeStates['field_map_id'] = field_map_id6f47d,
      codeStates['setfield_map_id'] = setfield_map_id6f47d,
      codeStates['source_field_path'] = source_field_path634e8,
      codeStates['setsource_field_path'] = setsource_field_path634e8,
      codeStates['target_entity'] = target_entity002be,
      codeStates['settarget_entity'] = settarget_entity002be,
      codeStates['target_attribute'] = target_attribute8c6c9,
      codeStates['settarget_attribute'] = settarget_attribute8c6c9,
      codeStates['transform_rule'] = transform_rule318b0,
      codeStates['settransform_rule'] = settransform_rule318b0,
      codeStates['is_active'] = is_active297f0,
      codeStates['setis_active'] = setis_active297f0,
      codeStates['view_btn'] = view_btnef5f3,
      codeStates['setview_btn'] = setview_btnef5f3,
      codeStates['edit_btn'] = edit_btnd38b9,
      codeStates['setedit_btn'] = setedit_btnd38b9,
      codeStates['del_btn'] = del_btn7b833,
      codeStates['setdel_btn'] = setdel_btn7b833,
      codeStates['viewintegrationfieldmap_v1'] = viewintegrationfieldmap_v1Props,
      codeStates['setviewintegrationfieldmap_v1'] = setviewintegrationfieldmap_v1Props,
      codeStates['add_field_map_grp'] = add_field_map_grp74a39,
      codeStates['setadd_field_map_grp'] = setadd_field_map_grp74a39,
      codeStates['add_field_map_grp74a39'] = add_field_map_grp74a39Props,
      codeStates['setadd_field_map_grp74a39'] = setadd_field_map_grp74a39Props,
      codeStates['field_rules_grp'] = field_rules_grp2cb2f,
      codeStates['setfield_rules_grp'] = setfield_rules_grp2cb2f,
      codeStates['field_rules_grp2cb2f'] = field_rules_grp2cb2fProps,
      codeStates['setfield_rules_grp2cb2f'] = setfield_rules_grp2cb2fProps,
      codeStates['source_mapping_grp'] = source_mapping_grp99571,
      codeStates['setsource_mapping_grp'] = setsource_mapping_grp99571,
      codeStates['source_mapping_grp99571'] = source_mapping_grp99571Props,
      codeStates['setsource_mapping_grp99571'] = setsource_mapping_grp99571Props,
      codeStates['target_mapping_grp'] = target_mapping_grp841a3,
      codeStates['settarget_mapping_grp'] = settarget_mapping_grp841a3,
      codeStates['target_mapping_grp841a3'] = target_mapping_grp841a3Props,
      codeStates['settarget_mapping_grp841a3'] = settarget_mapping_grp841a3Props,
      codeStates['transformation_grp'] = transformation_grp75a9a,
      codeStates['settransformation_grp'] = settransformation_grp75a9a,
      codeStates['transformation_grp75a9a'] = transformation_grp75a9aProps,
      codeStates['settransformation_grp75a9a'] = settransformation_grp75a9aProps,
      codeStates['response']  = savedData.current;
      codeStates['mainData'] = mainData,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "4c7299622f9e490b882f70683dbbda50",
        "a21ee5658ef046b7a66defc9f7cef5f3"
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
      if (id === "view_btnef5f3") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[view_btnef5f3?.refresh])


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
      if (onSelectLock && rowIndex !== undefined) {
        try {
          await onSelectLock([mainData[lockedData?.primaryColumn]]);
        } catch {
          return;
        }
      }

      setIsProcessing(true);
      await delay(1000);
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setviewintegrationfieldmap_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,add_field_map_grp74a39Props?.controls);
    setadd_field_map_grp74a39(bindData4||{})
    setadd_field_map_grp74a39Props({...add_field_map_grp74a39Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,source_mapping_grp99571Props?.controls);
    setsource_mapping_grp99571(bindData8||{})
    setsource_mapping_grp99571Props({...source_mapping_grp99571Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,target_mapping_grp841a3Props?.controls);
    settarget_mapping_grp841a3(bindData10||{})
    settarget_mapping_grp841a3Props({...target_mapping_grp841a3Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,transformation_grp75a9aProps?.controls);
    settransformation_grp75a9a(bindData12||{})
    settransformation_grp75a9aProps({...transformation_grp75a9aProps,presetValues:{...(mainData||{})}})
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
    }
  }
  const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
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

 if (view_btnef5f3?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1','integrationfieldmap','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "viewintegrationfieldmap"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageViewintegrationfieldmappage2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {view_btnef5f3?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("View")}
        </Button>}
      </div>
    
  )
}

export default Buttonview_btn

