
'use client'
import React, { useContext, useState, useEffect, useRef } from 'react';
import { AxiosService } from "@/app/components/axiosService";
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useGlobal } from '@/context/GlobalContext'
import { te_refreshDto,api_paginationDto} from '@/app/interfaces/interfaces';
import { TimeLine } from '@/components/TimeLine';
import {Modal} from '@/components/Modal';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { useRouter } from 'next/navigation'
import PageWpstranjourneydetailspage2 from '@/app/wpstranjourneydetails_v1/wpstranjourneydetails_v1page';
const TimeLinetrn_jrny = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing}:any) => { 
  const { token } = useGlobal();
  const decodedTokenObj:any = decodeToken(token);
  const routes = useRouter();
  const {dfd_tranjourney_v1Props, setdfd_tranjourney_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
      const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
  
  const loadingMoreRef = useRef<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null)
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({})
  const [allCode,setAllCode]=useState<any>("");
  const [steps, setSteps] = useState<any[]>([]);
  const [dstKey, setDstKey] = useState<string>("");
  const [isInitialLoaded, setIsInitialLoaded] = useState<boolean>(false);
  let timelineData: any[] = [];
    /////////////
  //another screen
  const {wpstranjourneydetails_v1Props, setwpstranjourneydetails_v1Props}= useContext(TotalContext) as TotalContextProps; 



  const {grp_overall_tran_jrny_list67aa9, setgrp_overall_tran_jrny_list67aa9}= useContext(TotalContext) as TotalContextProps
  const {grp_overall_tran_jrny_list67aa9Props, setgrp_overall_tran_jrny_list67aa9Props}= useContext(TotalContext) as TotalContextProps
  const {btn_back886c3, setbtn_back886c3}= useContext(TotalContext) as TotalContextProps
  const {tbl_tran_jrny_list6d62f, settbl_tran_jrny_list6d62f}= useContext(TotalContext) as TotalContextProps
  const {tbl_tran_jrny_list6d62fProps, settbl_tran_jrny_list6d62fProps}= useContext(TotalContext) as TotalContextProps
  const {trn_jrny23739, settrn_jrny23739}= useContext(TotalContext) as TotalContextProps
  const {journey_details_group764b7, setjourney_details_group764b7}= useContext(TotalContext) as TotalContextProps
  const {journey_details_group764b7Props, setjourney_details_group764b7Props}= useContext(TotalContext) as TotalContextProps
  const {req_data_group8d4d7, setreq_data_group8d4d7}= useContext(TotalContext) as TotalContextProps
  const {req_data_group8d4d7Props, setreq_data_group8d4d7Props}= useContext(TotalContext) as TotalContextProps
  const {res_data_group9d75a, setres_data_group9d75a}= useContext(TotalContext) as TotalContextProps
  const {res_data_group9d75aProps, setres_data_group9d75aProps}= useContext(TotalContext) as TotalContextProps
  //////////////

const statusMap: Record<string, { icon: any; color: string }> = {
  "SUCCESS": { icon: "MdCheck", color: "#4caf50" },
  "FAILURE": { icon: "MdClear", color: "#f44336" },
}
  const handleStepClick = async (step: Record<string, any>, index: number) => {
    console.log('Clicked step:', step, 'at index:', index)
    // showArtifactAsModal
    let filterProps2:any =  [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:tranJourney:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "417be61b10d94087a2fd0d1c670abf33",
        "object": {
          "properties.uuid": "col_tran_uuid"
        }
      }
    ]
  }
];
  let filterData2 = await getFilterProps(filterProps2,{...grp_overall_tran_jrny_list67aa9});
    setwpstranjourneydetails_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    // copyFormData
      // copyFormData controller
      setjourney_details_group764b7(step);
      setjourney_details_group764b7Props({...journey_details_group764b7Props,presetValues:step});
    // copyFormData
      // copyFormData controller
      setreq_data_group8d4d7(step);
      setreq_data_group8d4d7Props({...req_data_group8d4d7Props,presetValues:step});
    // copyFormData
      // copyFormData controller
      setres_data_group9d75a(step);
      setres_data_group9d75aProps({...res_data_group9d75aProps,presetValues:step});
  }
  const handleMapper = async () => {
    // If grp_overall_tran_jrny_list67aa9 data exists, use it directly without API calls
    if (Array.isArray(grp_overall_tran_jrny_list67aa9?.uuid) && grp_overall_tran_jrny_list67aa9?.uuid.length > 0) {
      setSteps(grp_overall_tran_jrny_list67aa9.uuid)
      setHasMore(false)
      setIsInitialLoaded(true)
      return
    }
    let orchestrationBody : any = {
      key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:transactionListWithJourney:AFVK:v1",
      componentId: "dd9490e33a4cbd3ca6f1680c3a167aa9",
      controlId: "919cc72bb65442d8847dbdbbea023739",
      isTable: false,
      accessProfile:accessProfile,
      from:"TimeLine"
    }
    if(encryptionFlagCont) {
    orchestrationBody["dpdKey"] = encryptionDpd
    orchestrationBody["method"] = encryptionMethod
    } 
    const orchestrationData: any = await AxiosService.post(
      '/UF/Orchestration',
      orchestrationBody,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    setAllCode(orchestrationData?.data?.code)
    
    let key = orchestrationData.data?.mapper[0]?.sourceKey[0]?.split('|')[0] + ':' || ''
    key = key.replace(':AFC:', ':AFCP:').replace(':AF:', ':AFP:').replace(':DF-DFD:', ':DF-DST:')
    setDstKey(key)

    const currentPageSize = orchestrationData.data?.action.pagination?.count || 10
    setPageSize(currentPageSize)

    await fetchPagination(key, 1, currentPageSize)
    setIsInitialLoaded(true)
  }

  const fetchPagination = async (key: string, page: number, count: number) => {
    if (Array.isArray(grp_overall_tran_jrny_list67aa9?.uuid) && grp_overall_tran_jrny_list67aa9?.uuid.length > 0) {
      const journeyData = grp_overall_tran_jrny_list67aa9.uuid
      setSteps(journeyData)
      timelineData = journeyData
      setHasMore(false)
      return
    }

    if (page === 1) {
      setSteps([])
      timelineData = []
    }

    const api_paginationBody: api_paginationDto = {
      key: key,
      page: page || 1,
      count: count,
      searchFilter: {"uuid":grp_overall_tran_jrny_list67aa9?.uuid},
    }
    if (encryptionFlagCont) {
      api_paginationBody['dpdKey'] = encryptionDpd
      api_paginationBody['method'] = encryptionMethod
    }
    const api_pagination = await AxiosService.post(
      '/UF/pagination',
      api_paginationBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    
    const newRecords = api_pagination?.data?.records || []
    if (newRecords.length < count) {
      setHasMore(false)
    }
    if (page === 1) {
      timelineData = newRecords
      setSteps(newRecords)
    } else {
      timelineData = [...timelineData, ...newRecords]
      setSteps((prev: any[]) => [...prev, ...newRecords])
    }


  }
  // Load more - only calls pagination (no orchestration)
  const loadMore = async () => {
    if (!hasMore || loadingMoreRef.current || !dstKey) return;
    loadingMoreRef.current = true;
    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await fetchPagination(dstKey, nextPage, pageSize);
    setIsLoadingMore(false);
    loadingMoreRef.current = false;
  }
  //   useEffect(() => {
  //  //   if(Array.isArray(dfd_tranjourney_v1Props) && dfd_tranjourney_v1Props.length > 0){
  //       setgrp_overall_tran_jrny_list67aa9((pre:any)=>({...pre,uuid:dfd_tranjourney_v1Props[0]?.uuid}));
  //   }
  //// }, [dfd_tranjourney_v1Props]);

  useEffect(() => {
    if (!false && !grp_overall_tran_jrny_list67aa9?.uuid) {
      setSteps([]);
      setHasMore(false);
      return;
    }
    setCurrentPage(1);
    setHasMore(true);
    setIsInitialLoaded(false);
    handleMapper();
    },[ grp_overall_tran_jrny_list67aa9?.uuid])

    useEffect(() => {
    if (grp_overall_tran_jrny_list67aa9?.uuid && grp_overall_tran_jrny_list67aa9?.uuid.length > 0) {
      setSteps(grp_overall_tran_jrny_list67aa9.uuid);
      setHasMore(false);
      setIsInitialLoaded(true);
    }
  },[ grp_overall_tran_jrny_list67aa9?.uuid])

  return (
    <div className="" style={{gridColumn: `19 / 25`,gridRow: `13 / 157`, gap:``, height: `100%`, overflow: 'hidden'}} >
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setValidate({});
          setValidateRefetch({ value: false, init: 0 });
        }}
        showOverlay = {false}
        position = {"center"}
        modalName='wpstranjourneydetails'
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageWpstranjourneydetailspage2/>
      </Modal>
      <TimeLine
        steps={steps}
        statusMap={statusMap}
        title={"trs_process_code"}
        status={"result"}
        date={"trs_created_date"}
        view={'vertical'}
        className={'h-full !bg-white'}
        onStepClick={handleStepClick}
        onLoadMore={isInitialLoaded ? loadMore : undefined}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        headerPosition='top'
        headerText="Transaction Journey"

      />
    </div>
  )
}

export default TimeLinetrn_jrny
