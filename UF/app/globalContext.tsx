


"use client"
import React, { useEffect } from 'react';
import { getCookie } from './components/cookieMgment';
import { usePathname } from 'next/navigation'
export interface TotalContextProps {
  currentToken: any 
  setCurrentToken: React.Dispatch<React.SetStateAction<any>>
  matchedAccessProfileData: any;
  setMatchedAccessProfileData: React.Dispatch<React.SetStateAction<any>>
  group90e92: any 
  setgroup90e92: React.Dispatch<React.SetStateAction<any>>
  group90e92Props: any 
  setgroup90e92Props: React.Dispatch<React.SetStateAction<any>>
  group6dc33: any 
  setgroup6dc33: React.Dispatch<React.SetStateAction<any>>
  group6dc33Props: any 
  setgroup6dc33Props: React.Dispatch<React.SetStateAction<any>>
  tablee972d: any 
  settablee972d: React.Dispatch<React.SetStateAction<any>>
  tablee972dProps: any 
  settablee972dProps: React.Dispatch<React.SetStateAction<any>>
  jsonb_textb0818: any,
  setjsonb_textb0818:React.Dispatch<React.SetStateAction<any>>
  jsonb_textb0818Props: any 
  setjsonb_textb0818Props: React.Dispatch<React.SetStateAction<any>>
  employee_name9e7d9: any,
  setemployee_name9e7d9:React.Dispatch<React.SetStateAction<any>>
  employee_name9e7d9Props: any 
  setemployee_name9e7d9Props: React.Dispatch<React.SetStateAction<any>>
  employee_infoa1b53: any,
  setemployee_infoa1b53:React.Dispatch<React.SetStateAction<any>>
  employee_infoa1b53Props: any 
  setemployee_infoa1b53Props: React.Dispatch<React.SetStateAction<any>>
  jsoneditor0b2fe: any,
  setjsoneditor0b2fe:React.Dispatch<React.SetStateAction<any>>
  jsoneditor0b2feProps: any 
  setjsoneditor0b2feProps: React.Dispatch<React.SetStateAction<any>>
  savee80dc: any,
  setsavee80dc:React.Dispatch<React.SetStateAction<any>>
  savee80dcProps: any 
  setsavee80dcProps: React.Dispatch<React.SetStateAction<any>>
  employee_named69a0: any,
  setemployee_named69a0:React.Dispatch<React.SetStateAction<any>>
  employee_named69a0Props: any 
  setemployee_named69a0Props: React.Dispatch<React.SetStateAction<any>>
  employee_infob6487: any,
  setemployee_infob6487:React.Dispatch<React.SetStateAction<any>>
  employee_infob6487Props: any 
  setemployee_infob6487Props: React.Dispatch<React.SetStateAction<any>>

////// screen states 
  jsonb_v1: any 
  setjsonb_v1: React.Dispatch<React.SetStateAction<any>>
  jsonb_v1Props: any 
  setjsonb_v1Props: React.Dispatch<React.SetStateAction<any>>
  jsonb_tbale_v1: any 
  setjsonb_tbale_v1: React.Dispatch<React.SetStateAction<any>>
  jsonb_tbale_v1Props: any 
  setjsonb_tbale_v1Props: React.Dispatch<React.SetStateAction<any>>

///////// dfd
  dfd_jsonb_dfd_v1Props: any 
  setdfd_jsonb_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>

  refetch: any,
  setRefetch: React.Dispatch<React.SetStateAction<any>>
  searchParam: string,
  setSearchParam: React.Dispatch<React.SetStateAction<string>>
  disableParam: Record<string, boolean>,
  setDisableParam: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  globalState: Record<string, any>,
  setGlobalState: React.Dispatch<React.SetStateAction<Record<string, any>>>
  // for all textInput validation
  validate: Record<string, any>,
  setValidate: React.Dispatch<React.SetStateAction<Record<string, any>>>

  //its used for validate once again on button click
  validateRefetch: { value: boolean; init: number },
  setValidateRefetch: React.Dispatch<React.SetStateAction<{ value: boolean; init: number }>>
  accessProfile:any,
  setAccessProfile: React.Dispatch<React.SetStateAction<any>>
  memoryVariables: Record<string, string>
  setMemoryVariables: React.Dispatch<React.SetStateAction<Record<string, string>>>
  property: Record<string, any>
  setProperty: React.Dispatch<React.SetStateAction<Record<string, any>>>
  refresh: Record<string, boolean>,
  setRefresh: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  lockedData: Record<string, any>,
  setLockedData: React.Dispatch<React.SetStateAction<Record<string, any>>>
  tableData: Record<string, any>,
  setTableData: React.Dispatch<React.SetStateAction<Record<string, any>>>    
  paginationDetails: Record<string, any>,
  setpaginationDetails: React.Dispatch<React.SetStateAction<Record<string, any>>>
  eventEmitterData: any,
  setEventEmitterData: React.Dispatch<React.SetStateAction<any>>
  userDetails: Record<string, any>,
  setUserDetails: React.Dispatch<React.SetStateAction<Record<string, any>>>
  encAppFalg: Record<string, any>,
  setEncAppFalg: React.Dispatch<React.SetStateAction<Record<string, any>>>
}

export const TotalContext = React.createContext<TotalContextProps | {}>({})

const GlobalContext = ({children} : {children: React.ReactNode}) => {
    const [currentToken, setCurrentToken ] = React.useState<any>({})
    const [matchedAccessProfileData, setMatchedAccessProfileData] = React.useState<any>({})
    const pathname = usePathname()
      //////////
        const [group90e92, setgroup90e92 ] = React.useState<any>({}) 
    const [group90e92Props, setgroup90e92Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "jsonb_text",
            "employee_name",
            "employee_info",
            "employee_info",
            "save",
      ]
      }) 
        const [group6dc33, setgroup6dc33 ] = React.useState<any>({}) 
    const [group6dc33Props, setgroup6dc33Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [tablee972d, settablee972d ] = React.useState<any>([]) 
    const [tablee972dProps, settablee972dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      refresh:false,
      filterInitalLoad: false,
      }) 
   const [jsonb_textb0818,setjsonb_textb0818] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [jsonb_textb0818Props,setjsonb_textb0818Props] = React.useState<any>({}) 
   const [employee_name9e7d9,setemployee_name9e7d9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [employee_name9e7d9Props,setemployee_name9e7d9Props] = React.useState<any>({}) 
   const [employee_infoa1b53,setemployee_infoa1b53] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [employee_infoa1b53Props,setemployee_infoa1b53Props] = React.useState<any>({}) 
   const [jsoneditor0b2fe,setjsoneditor0b2fe] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [jsoneditor0b2feProps,setjsoneditor0b2feProps] = React.useState<any>({}) 
   const [savee80dc,setsavee80dc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [savee80dcProps,setsavee80dcProps] = React.useState<any>({}) 
   const [employee_named69a0,setemployee_named69a0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [employee_named69a0Props,setemployee_named69a0Props] = React.useState<any>({}) 
   const [employee_infob6487,setemployee_infob6487] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [employee_infob6487Props,setemployee_infob6487Props] = React.useState<any>({}) 
    ///////////
    const [refresh, setRefresh] = React.useState<Record<string, boolean>>({       textjsonb_textb0818:false,
       textinputemployee_name9e7d9:false,
       textareaemployee_infoa1b53:false,
       jsoneditorjsoneditor0b2fe:false,
       buttonsavee80dc:false,
       columnemployee_named69a0:false,
       columnemployee_infob6487:false,
       groupgroup90e92:false,
       groupgroup6dc33:false,
       tabletablee972d:false,
      })

  ////// screen states 
  const [jsonb_v1,setjsonb_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [jsonb_v1Props,setjsonb_v1Props] = React.useState<any>({})
  const [jsonb_tbale_v1,setjsonb_tbale_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [jsonb_tbale_v1Props,setjsonb_tbale_v1Props] = React.useState<any>({})

///////// dfd
  const [dfd_jsonb_dfd_v1Props,setdfd_jsonb_dfd_v1Props] = React.useState<any>([])
    const [searchParam , setSearchParam] = React.useState<string>("")
    const [disableParam , setDisableParam] = React.useState<Record<string, boolean>>({})
    const [globalState , setGlobalState] = React.useState<Record<string, any>>({})
    const [refetch, setRefetch] = React.useState<any>(false)
    const [validate, setValidate] = React.useState<Record<string, any>>({});
    const [validateRefetch, setValidateRefetch] = React.useState<{ value: boolean; init: number }>({
      value:false,
      init:0
    })
    const [accessProfile, setAccessProfile] = React.useState<any>([])
    const [property, setProperty] = React.useState<any>({})
    const [memoryVariables, setMemoryVariables] = React.useState<any>({})
    const [lockedData, setLockedData] = React.useState<any>({})
    const [tableData, setTableData] = React.useState<any>({})      
    const [paginationDetails, setpaginationDetails] = React.useState<any>({})

    const [eventEmitterData,setEventEmitterData] = React.useState<any>([])
    const [userDetails , setUserDetails] = React.useState<any>({})
    const [encAppFalg , setEncAppFalg] = React.useState<any>({})
    const theme = getCookie('cfg_theme')


  const emptifyStateValues=()=>{ // for refresh disable key values exapmle app RTGS
    setValidateRefetch({
      value:false,
      init:0
    })
    setValidate({})
    setjsonb_textb0818(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setemployee_name9e7d9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setemployee_infoa1b53(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setjsoneditor0b2fe(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsavee80dc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setemployee_named69a0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setemployee_infob6487(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 

        setgroup90e92({}) 
    setgroup90e92Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "jsonb_text",
            "employee_name",
            "employee_info",
            "employee_info",
            "save",
      ]
      }) 
        setgroup6dc33({}) 
    setgroup6dc33Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    settablee972d([]) 
    settablee972dProps({
      validation:false,
      required:false,
      refetch:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      primaryColunm: '',
      refresh:false,
      filterInitalLoad: false,
      }) 
  }
  useEffect(() => {
    if (pathname?.includes('select-context')) {
      emptifyStateValues()
    }
  }, [pathname])
    
  return (
    <TotalContext.Provider 
      value={
      {
      //
        currentToken,
        setCurrentToken,
        matchedAccessProfileData,
        setMatchedAccessProfileData,
        group90e92, 
        setgroup90e92,
        group90e92Props, 
        setgroup90e92Props,
        group6dc33, 
        setgroup6dc33,
        group6dc33Props, 
        setgroup6dc33Props,
        tablee972d, 
        settablee972d,
        tablee972dProps, 
        settablee972dProps,
        jsonb_textb0818,
        setjsonb_textb0818, 
        jsonb_textb0818Props,
        setjsonb_textb0818Props,
        employee_name9e7d9,
        setemployee_name9e7d9, 
        employee_name9e7d9Props,
        setemployee_name9e7d9Props,
        employee_infoa1b53,
        setemployee_infoa1b53, 
        employee_infoa1b53Props,
        setemployee_infoa1b53Props,
        jsoneditor0b2fe,
        setjsoneditor0b2fe, 
        jsoneditor0b2feProps,
        setjsoneditor0b2feProps,
        savee80dc,
        setsavee80dc, 
        savee80dcProps,
        setsavee80dcProps,
        employee_named69a0,
        setemployee_named69a0, 
        employee_named69a0Props,
        setemployee_named69a0Props,
        employee_infob6487,
        setemployee_infob6487, 
        employee_infob6487Props,
        setemployee_infob6487Props,
        ////// screen states 
          jsonb_v1,
          setjsonb_v1,
          jsonb_v1Props,
          setjsonb_v1Props,
          jsonb_tbale_v1,
          setjsonb_tbale_v1,
          jsonb_tbale_v1Props,
          setjsonb_tbale_v1Props,
        //////////

        ///////// dfd
        dfd_jsonb_dfd_v1Props,
        setdfd_jsonb_dfd_v1Props,
        refetch,
        setRefetch,
        searchParam,
        setSearchParam,
        disableParam,
        setDisableParam,
        globalState,
        setGlobalState,
        validate,
        setValidate,
        validateRefetch,
        setValidateRefetch,
        accessProfile,
        setAccessProfile,
        property,
        setProperty,
        setRefresh,
        refresh,
        memoryVariables,
        setMemoryVariables,
        lockedData,
        setLockedData,
        tableData,
        setTableData,
        paginationDetails,
        setpaginationDetails,
        eventEmitterData,
        setEventEmitterData,
        userDetails,
        setUserDetails,
        encAppFalg,
        setEncAppFalg
        }}
      >
      {children}
    </TotalContext.Provider>
  )
}

export default GlobalContext