


"use client"
import React, { useEffect } from 'react';
import { getCookie } from './components/cookieMgment';
import { usePathname } from 'next/navigation'
export interface TotalContextProps {
  currentToken: any 
  setCurrentToken: React.Dispatch<React.SetStateAction<any>>
  matchedAccessProfileData: any;
  setMatchedAccessProfileData: React.Dispatch<React.SetStateAction<any>>
  groupb7cd7: any 
  setgroupb7cd7: React.Dispatch<React.SetStateAction<any>>
  groupb7cd7Props: any 
  setgroupb7cd7Props: React.Dispatch<React.SetStateAction<any>>
  advancesearchtable03366: any 
  setadvancesearchtable03366: React.Dispatch<React.SetStateAction<any>>
  advancesearchtable03366Props: any 
  setadvancesearchtable03366Props: React.Dispatch<React.SetStateAction<any>>
  advancegroupa9081: any 
  setadvancegroupa9081: React.Dispatch<React.SetStateAction<any>>
  advancegroupa9081Props: any 
  setadvancegroupa9081Props: React.Dispatch<React.SetStateAction<any>>
  group89800: any 
  setgroup89800: React.Dispatch<React.SetStateAction<any>>
  group89800Props: any 
  setgroup89800Props: React.Dispatch<React.SetStateAction<any>>
  table3c3b1: any 
  settable3c3b1: React.Dispatch<React.SetStateAction<any>>
  table3c3b1Props: any 
  settable3c3b1Props: React.Dispatch<React.SetStateAction<any>>
  group84b9c: any 
  setgroup84b9c: React.Dispatch<React.SetStateAction<any>>
  group84b9cProps: any 
  setgroup84b9cProps: React.Dispatch<React.SetStateAction<any>>
  grouparray494e0: any 
  setgrouparray494e0: React.Dispatch<React.SetStateAction<any>>
  grouparray494e0Props: any 
  setgrouparray494e0Props: React.Dispatch<React.SetStateAction<any>>
  grouparray494e0_0: any 
  setgrouparray494e0_0: React.Dispatch<React.SetStateAction<any>>
  grouparray494e0_0Props: any 
  setgrouparray494e0_0Props: React.Dispatch<React.SetStateAction<any>>
  grouparray494e0_1: any 
  setgrouparray494e0_1: React.Dispatch<React.SetStateAction<any>>
  grouparray494e0_1Props: any 
  setgrouparray494e0_1Props: React.Dispatch<React.SetStateAction<any>>
  grouparray494e0_2: any 
  setgrouparray494e0_2: React.Dispatch<React.SetStateAction<any>>
  grouparray494e0_2Props: any 
  setgrouparray494e0_2Props: React.Dispatch<React.SetStateAction<any>>
  grouparray494e0_3: any 
  setgrouparray494e0_3: React.Dispatch<React.SetStateAction<any>>
  grouparray494e0_3Props: any 
  setgrouparray494e0_3Props: React.Dispatch<React.SetStateAction<any>>
  grouparray494e0_4: any 
  setgrouparray494e0_4: React.Dispatch<React.SetStateAction<any>>
  grouparray494e0_4Props: any 
  setgrouparray494e0_4Props: React.Dispatch<React.SetStateAction<any>>
  grouparray494e0_5: any 
  setgrouparray494e0_5: React.Dispatch<React.SetStateAction<any>>
  grouparray494e0_5Props: any 
  setgrouparray494e0_5Props: React.Dispatch<React.SetStateAction<any>>
  group571d2: any 
  setgroup571d2: React.Dispatch<React.SetStateAction<any>>
  group571d2Props: any 
  setgroup571d2Props: React.Dispatch<React.SetStateAction<any>>
  group_two6135c: any 
  setgroup_two6135c: React.Dispatch<React.SetStateAction<any>>
  group_two6135cProps: any 
  setgroup_two6135cProps: React.Dispatch<React.SetStateAction<any>>
  group611f3: any 
  setgroup611f3: React.Dispatch<React.SetStateAction<any>>
  group611f3Props: any 
  setgroup611f3Props: React.Dispatch<React.SetStateAction<any>>
  table5ca87: any 
  settable5ca87: React.Dispatch<React.SetStateAction<any>>
  table5ca87Props: any 
  settable5ca87Props: React.Dispatch<React.SetStateAction<any>>
  group9be24: any 
  setgroup9be24: React.Dispatch<React.SetStateAction<any>>
  group9be24Props: any 
  setgroup9be24Props: React.Dispatch<React.SetStateAction<any>>
  table2f83e: any 
  settable2f83e: React.Dispatch<React.SetStateAction<any>>
  table2f83eProps: any 
  settable2f83eProps: React.Dispatch<React.SetStateAction<any>>
  table_oneb639c: any 
  settable_oneb639c: React.Dispatch<React.SetStateAction<any>>
  table_oneb639cProps: any 
  settable_oneb639cProps: React.Dispatch<React.SetStateAction<any>>
  groupa03b5: any 
  setgroupa03b5: React.Dispatch<React.SetStateAction<any>>
  groupa03b5Props: any 
  setgroupa03b5Props: React.Dispatch<React.SetStateAction<any>>
  groupdf36a: any 
  setgroupdf36a: React.Dispatch<React.SetStateAction<any>>
  groupdf36aProps: any 
  setgroupdf36aProps: React.Dispatch<React.SetStateAction<any>>
  tabled5efd: any 
  settabled5efd: React.Dispatch<React.SetStateAction<any>>
  tabled5efdProps: any 
  settabled5efdProps: React.Dispatch<React.SetStateAction<any>>
  searchba2ac: any,
  setsearchba2ac:React.Dispatch<React.SetStateAction<any>>
  searchba2acProps: any 
  setsearchba2acProps: React.Dispatch<React.SetStateAction<any>>
  country0de1c: any,
  setcountry0de1c:React.Dispatch<React.SetStateAction<any>>
  country0de1cProps: any 
  setcountry0de1cProps: React.Dispatch<React.SetStateAction<any>>
  state64484: any,
  setstate64484:React.Dispatch<React.SetStateAction<any>>
  state64484Props: any 
  setstate64484Props: React.Dispatch<React.SetStateAction<any>>
  city6c663: any,
  setcity6c663:React.Dispatch<React.SetStateAction<any>>
  city6c663Props: any 
  setcity6c663Props: React.Dispatch<React.SetStateAction<any>>
  advancesearchf4a44: any,
  setadvancesearchf4a44:React.Dispatch<React.SetStateAction<any>>
  advancesearchf4a44Props: any 
  setadvancesearchf4a44Props: React.Dispatch<React.SetStateAction<any>>
  barchartcf891: any,
  setbarchartcf891:React.Dispatch<React.SetStateAction<any>>
  barchartcf891Props: any 
  setbarchartcf891Props: React.Dispatch<React.SetStateAction<any>>
  countryf4ab0: any,
  setcountryf4ab0:React.Dispatch<React.SetStateAction<any>>
  countryf4ab0Props: any 
  setcountryf4ab0Props: React.Dispatch<React.SetStateAction<any>>
  state015fd: any,
  setstate015fd:React.Dispatch<React.SetStateAction<any>>
  state015fdProps: any 
  setstate015fdProps: React.Dispatch<React.SetStateAction<any>>
  cityfc3b9: any,
  setcityfc3b9:React.Dispatch<React.SetStateAction<any>>
  cityfc3b9Props: any 
  setcityfc3b9Props: React.Dispatch<React.SetStateAction<any>>
  daily_expense3c178: any,
  setdaily_expense3c178:React.Dispatch<React.SetStateAction<any>>
  daily_expense3c178Props: any 
  setdaily_expense3c178Props: React.Dispatch<React.SetStateAction<any>>
  expense_namec83ee: any,
  setexpense_namec83ee:React.Dispatch<React.SetStateAction<any>>
  expense_namec83eeProps: any 
  setexpense_namec83eeProps: React.Dispatch<React.SetStateAction<any>>
  email0c3ca: any,
  setemail0c3ca:React.Dispatch<React.SetStateAction<any>>
  email0c3caProps: any 
  setemail0c3caProps: React.Dispatch<React.SetStateAction<any>>
  expense_datee6e16: any,
  setexpense_datee6e16:React.Dispatch<React.SetStateAction<any>>
  expense_datee6e16Props: any 
  setexpense_datee6e16Props: React.Dispatch<React.SetStateAction<any>>
  claim_categoryf03f1: any,
  setclaim_categoryf03f1:React.Dispatch<React.SetStateAction<any>>
  claim_categoryf03f1Props: any 
  setclaim_categoryf03f1Props: React.Dispatch<React.SetStateAction<any>>
  category_total_amount49375: any,
  setcategory_total_amount49375:React.Dispatch<React.SetStateAction<any>>
  category_total_amount49375Props: any 
  setcategory_total_amount49375Props: React.Dispatch<React.SetStateAction<any>>
  receipt_image4f1bf: any,
  setreceipt_image4f1bf:React.Dispatch<React.SetStateAction<any>>
  receipt_image4f1bfProps: any 
  setreceipt_image4f1bfProps: React.Dispatch<React.SetStateAction<any>>
  comments7171e: any,
  setcomments7171e:React.Dispatch<React.SetStateAction<any>>
  comments7171eProps: any 
  setcomments7171eProps: React.Dispatch<React.SetStateAction<any>>
  save445f0: any,
  setsave445f0:React.Dispatch<React.SetStateAction<any>>
  save445f0Props: any 
  setsave445f0Props: React.Dispatch<React.SetStateAction<any>>
  edit423b5: any,
  setedit423b5:React.Dispatch<React.SetStateAction<any>>
  edit423b5Props: any 
  setedit423b5Props: React.Dispatch<React.SetStateAction<any>>
  dailyexpense64a4c: any,
  setdailyexpense64a4c:React.Dispatch<React.SetStateAction<any>>
  dailyexpense64a4cProps: any 
  setdailyexpense64a4cProps: React.Dispatch<React.SetStateAction<any>>
  expense_name136a1: any,
  setexpense_name136a1:React.Dispatch<React.SetStateAction<any>>
  expense_name136a1Props: any 
  setexpense_name136a1Props: React.Dispatch<React.SetStateAction<any>>
  expense_date7e93b: any,
  setexpense_date7e93b:React.Dispatch<React.SetStateAction<any>>
  expense_date7e93bProps: any 
  setexpense_date7e93bProps: React.Dispatch<React.SetStateAction<any>>
  claim_categoryf1c64: any,
  setclaim_categoryf1c64:React.Dispatch<React.SetStateAction<any>>
  claim_categoryf1c64Props: any 
  setclaim_categoryf1c64Props: React.Dispatch<React.SetStateAction<any>>
  category_total_amount395dd: any,
  setcategory_total_amount395dd:React.Dispatch<React.SetStateAction<any>>
  category_total_amount395ddProps: any 
  setcategory_total_amount395ddProps: React.Dispatch<React.SetStateAction<any>>
  receipt_imageb2aec: any,
  setreceipt_imageb2aec:React.Dispatch<React.SetStateAction<any>>
  receipt_imageb2aecProps: any 
  setreceipt_imageb2aecProps: React.Dispatch<React.SetStateAction<any>>
  commentse3b5b: any,
  setcommentse3b5b:React.Dispatch<React.SetStateAction<any>>
  commentse3b5bProps: any 
  setcommentse3b5bProps: React.Dispatch<React.SetStateAction<any>>
  saveec42b: any,
  setsaveec42b:React.Dispatch<React.SetStateAction<any>>
  saveec42bProps: any 
  setsaveec42bProps: React.Dispatch<React.SetStateAction<any>>
  switch7e8ff: any,
  setswitch7e8ff:React.Dispatch<React.SetStateAction<any>>
  switch7e8ffProps: any 
  setswitch7e8ffProps: React.Dispatch<React.SetStateAction<any>>
  checkbox53e8f: any,
  setcheckbox53e8f:React.Dispatch<React.SetStateAction<any>>
  checkbox53e8fProps: any 
  setcheckbox53e8fProps: React.Dispatch<React.SetStateAction<any>>
  expense_nameeac5c: any,
  setexpense_nameeac5c:React.Dispatch<React.SetStateAction<any>>
  expense_nameeac5cProps: any 
  setexpense_nameeac5cProps: React.Dispatch<React.SetStateAction<any>>
  cetegorycd65c: any,
  setcetegorycd65c:React.Dispatch<React.SetStateAction<any>>
  cetegorycd65cProps: any 
  setcetegorycd65cProps: React.Dispatch<React.SetStateAction<any>>
  country72935: any,
  setcountry72935:React.Dispatch<React.SetStateAction<any>>
  country72935Props: any 
  setcountry72935Props: React.Dispatch<React.SetStateAction<any>>
  statebf0ec: any,
  setstatebf0ec:React.Dispatch<React.SetStateAction<any>>
  statebf0ecProps: any 
  setstatebf0ecProps: React.Dispatch<React.SetStateAction<any>>
  button058e1: any,
  setbutton058e1:React.Dispatch<React.SetStateAction<any>>
  button058e1Props: any 
  setbutton058e1Props: React.Dispatch<React.SetStateAction<any>>
  state_two7430b: any,
  setstate_two7430b:React.Dispatch<React.SetStateAction<any>>
  state_two7430bProps: any 
  setstate_two7430bProps: React.Dispatch<React.SetStateAction<any>>
  combobox659b9: any,
  setcombobox659b9:React.Dispatch<React.SetStateAction<any>>
  combobox659b9Props: any 
  setcombobox659b9Props: React.Dispatch<React.SetStateAction<any>>
  carde8dd8: any,
  setcarde8dd8:React.Dispatch<React.SetStateAction<any>>
  carde8dd8Props: any 
  setcarde8dd8Props: React.Dispatch<React.SetStateAction<any>>
  setmemoryvaluese2c19: any,
  setsetmemoryvaluese2c19:React.Dispatch<React.SetStateAction<any>>
  setmemoryvaluese2c19Props: any 
  setsetmemoryvaluese2c19Props: React.Dispatch<React.SetStateAction<any>>
  state62a91: any,
  setstate62a91:React.Dispatch<React.SetStateAction<any>>
  state62a91Props: any 
  setstate62a91Props: React.Dispatch<React.SetStateAction<any>>
  state_two24376: any,
  setstate_two24376:React.Dispatch<React.SetStateAction<any>>
  state_two24376Props: any 
  setstate_two24376Props: React.Dispatch<React.SetStateAction<any>>
  country625d4: any,
  setcountry625d4:React.Dispatch<React.SetStateAction<any>>
  country625d4Props: any 
  setcountry625d4Props: React.Dispatch<React.SetStateAction<any>>
  textinput86330: any,
  settextinput86330:React.Dispatch<React.SetStateAction<any>>
  textinput86330Props: any 
  settextinput86330Props: React.Dispatch<React.SetStateAction<any>>
  button3a885: any,
  setbutton3a885:React.Dispatch<React.SetStateAction<any>>
  button3a885Props: any 
  setbutton3a885Props: React.Dispatch<React.SetStateAction<any>>
  country2114e: any,
  setcountry2114e:React.Dispatch<React.SetStateAction<any>>
  country2114eProps: any 
  setcountry2114eProps: React.Dispatch<React.SetStateAction<any>>
  statebbeaf: any,
  setstatebbeaf:React.Dispatch<React.SetStateAction<any>>
  statebbeafProps: any 
  setstatebbeafProps: React.Dispatch<React.SetStateAction<any>>
  city6731c: any,
  setcity6731c:React.Dispatch<React.SetStateAction<any>>
  city6731cProps: any 
  setcity6731cProps: React.Dispatch<React.SetStateAction<any>>
  button_one31b79: any,
  setbutton_one31b79:React.Dispatch<React.SetStateAction<any>>
  button_one31b79Props: any 
  setbutton_one31b79Props: React.Dispatch<React.SetStateAction<any>>

////// screen states 
  ad_search_table_v1: any 
  setad_search_table_v1: React.Dispatch<React.SetStateAction<any>>
  ad_search_table_v1Props: any 
  setad_search_table_v1Props: React.Dispatch<React.SetStateAction<any>>
  ad_search_v1: any 
  setad_search_v1: React.Dispatch<React.SetStateAction<any>>
  ad_search_v1Props: any 
  setad_search_v1Props: React.Dispatch<React.SetStateAction<any>>
  chart_v1: any 
  setchart_v1: React.Dispatch<React.SetStateAction<any>>
  chart_v1Props: any 
  setchart_v1Props: React.Dispatch<React.SetStateAction<any>>
  grouparray_v1: any 
  setgrouparray_v1: React.Dispatch<React.SetStateAction<any>>
  grouparray_v1Props: any 
  setgrouparray_v1Props: React.Dispatch<React.SetStateAction<any>>
  request_form_v1: any 
  setrequest_form_v1: React.Dispatch<React.SetStateAction<any>>
  request_form_v1Props: any 
  setrequest_form_v1Props: React.Dispatch<React.SetStateAction<any>>
  table_v1: any 
  settable_v1: React.Dispatch<React.SetStateAction<any>>
  table_v1Props: any 
  settable_v1Props: React.Dispatch<React.SetStateAction<any>>
  set_memory_table_v1: any 
  setset_memory_table_v1: React.Dispatch<React.SetStateAction<any>>
  set_memory_table_v1Props: any 
  setset_memory_table_v1Props: React.Dispatch<React.SetStateAction<any>>
  combo_dropdown_v1: any 
  setcombo_dropdown_v1: React.Dispatch<React.SetStateAction<any>>
  combo_dropdown_v1Props: any 
  setcombo_dropdown_v1Props: React.Dispatch<React.SetStateAction<any>>
  setmemoryvaluesevent_v1: any 
  setsetmemoryvaluesevent_v1: React.Dispatch<React.SetStateAction<any>>
  setmemoryvaluesevent_v1Props: any 
  setsetmemoryvaluesevent_v1Props: React.Dispatch<React.SetStateAction<any>>

///////// dfd
  dfd_advance_search_v1Props: any 
  setdfd_advance_search_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_combo_dfd_v1Props: any 
  setdfd_combo_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_group_array_dsd_v1Props: any 
  setdfd_group_array_dsd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_claims_dfd_v1Props: any 
  setdfd_claims_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_set_where_v1Props: any 
  setdfd_set_where_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_chart_data_v1Props: any 
  setdfd_chart_data_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_set_db_node_v1Props: any 
  setdfd_set_db_node_v1Props: React.Dispatch<React.SetStateAction<any>>

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
        const [groupb7cd7, setgroupb7cd7 ] = React.useState<any>({}) 
    const [groupb7cd7Props, setgroupb7cd7Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "search",
      ]
      }) 
    
    const [advancesearchtable03366, setadvancesearchtable03366 ] = React.useState<any>([]) 
    const [advancesearchtable03366Props, setadvancesearchtable03366Props ] = React.useState<any>({
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
        const [advancegroupa9081, setadvancegroupa9081 ] = React.useState<any>({}) 
    const [advancegroupa9081Props, setadvancegroupa9081Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "country",
      ]
      }) 
        const [group89800, setgroup89800 ] = React.useState<any>({}) 
    const [group89800Props, setgroup89800Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "country",
      ]
      }) 
    
    const [table3c3b1, settable3c3b1 ] = React.useState<any>([]) 
    const [table3c3b1Props, settable3c3b1Props ] = React.useState<any>({
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
        const [group84b9c, setgroup84b9c ] = React.useState<any>({}) 
    const [group84b9cProps, setgroup84b9cProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "save",
            "edit",
      ]
      }) 
        const [grouparray494e0, setgrouparray494e0 ] = React.useState<any>({}) 
    const [grouparray494e0Props, setgrouparray494e0Props ] = React.useState<any>({
      validation:false,

      length:6,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "daily_expense",
            "expense_name",
            "email_id",
            "expense_date",
            "claim_category",
            "total_amount",
            "receipt_image",
            "description",
      ]
      }) 
        const [grouparray494e0_0, setgrouparray494e0_0 ] = React.useState<any>({}) 
    const [grouparray494e0_0Props, setgrouparray494e0_0Props ] = React.useState<any>({
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
        const [grouparray494e0_1, setgrouparray494e0_1 ] = React.useState<any>({}) 
    const [grouparray494e0_1Props, setgrouparray494e0_1Props ] = React.useState<any>({
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
        const [grouparray494e0_2, setgrouparray494e0_2 ] = React.useState<any>({}) 
    const [grouparray494e0_2Props, setgrouparray494e0_2Props ] = React.useState<any>({
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
        const [grouparray494e0_3, setgrouparray494e0_3 ] = React.useState<any>({}) 
    const [grouparray494e0_3Props, setgrouparray494e0_3Props ] = React.useState<any>({
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
        const [grouparray494e0_4, setgrouparray494e0_4 ] = React.useState<any>({}) 
    const [grouparray494e0_4Props, setgrouparray494e0_4Props ] = React.useState<any>({
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
        const [grouparray494e0_5, setgrouparray494e0_5 ] = React.useState<any>({}) 
    const [grouparray494e0_5Props, setgrouparray494e0_5Props ] = React.useState<any>({
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
        const [group571d2, setgroup571d2 ] = React.useState<any>({}) 
    const [group571d2Props, setgroup571d2Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "dailyexpense",
            "expense_name",
            "expense_date",
            "claim_category",
            "category_total_amount",
            "receipt_image",
            "comments",
            "is_comment_enabled",
            "manager_comments",
      ]
      }) 
        const [group_two6135c, setgroup_two6135c ] = React.useState<any>({}) 
    const [group_two6135cProps, setgroup_two6135cProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "save",
      ]
      }) 
        const [group611f3, setgroup611f3 ] = React.useState<any>({}) 
    const [group611f3Props, setgroup611f3Props ] = React.useState<any>({
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
    
    const [table5ca87, settable5ca87 ] = React.useState<any>([]) 
    const [table5ca87Props, settable5ca87Props ] = React.useState<any>({
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
        const [group9be24, setgroup9be24 ] = React.useState<any>({}) 
    const [group9be24Props, setgroup9be24Props ] = React.useState<any>({
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
    
    const [table2f83e, settable2f83e ] = React.useState<any>([]) 
    const [table2f83eProps, settable2f83eProps ] = React.useState<any>({
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
    
    const [table_oneb639c, settable_oneb639c ] = React.useState<any>([]) 
    const [table_oneb639cProps, settable_oneb639cProps ] = React.useState<any>({
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
        const [groupa03b5, setgroupa03b5 ] = React.useState<any>({}) 
    const [groupa03b5Props, setgroupa03b5Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "name",
            "name",
      ]
      }) 
        const [groupdf36a, setgroupdf36a ] = React.useState<any>({}) 
    const [groupdf36aProps, setgroupdf36aProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "setmemoryvalues",
            "state",
            "state",
            "state_two",
            "state_two",
            "country",
            "country",
            "button",
      ]
      }) 
    
    const [tabled5efd, settabled5efd ] = React.useState<any>([]) 
    const [tabled5efdProps, settabled5efdProps ] = React.useState<any>({
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
   const [searchba2ac,setsearchba2ac] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [searchba2acProps,setsearchba2acProps] = React.useState<any>({}) 
   const [country0de1c,setcountry0de1c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [country0de1cProps,setcountry0de1cProps] = React.useState<any>({}) 
   const [state64484,setstate64484] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [state64484Props,setstate64484Props] = React.useState<any>({}) 
   const [city6c663,setcity6c663] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [city6c663Props,setcity6c663Props] = React.useState<any>({}) 
   const [advancesearchf4a44,setadvancesearchf4a44] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [advancesearchf4a44Props,setadvancesearchf4a44Props] = React.useState<any>({}) 
   const [barchartcf891,setbarchartcf891] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [barchartcf891Props,setbarchartcf891Props] = React.useState<any>({}) 
   const [countryf4ab0,setcountryf4ab0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [countryf4ab0Props,setcountryf4ab0Props] = React.useState<any>({}) 
   const [state015fd,setstate015fd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [state015fdProps,setstate015fdProps] = React.useState<any>({}) 
   const [cityfc3b9,setcityfc3b9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cityfc3b9Props,setcityfc3b9Props] = React.useState<any>({}) 
   const [daily_expense3c178,setdaily_expense3c178] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [daily_expense3c178Props,setdaily_expense3c178Props] = React.useState<any>({}) 
   const [expense_namec83ee,setexpense_namec83ee] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [expense_namec83eeProps,setexpense_namec83eeProps] = React.useState<any>({}) 
   const [email0c3ca,setemail0c3ca] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [email0c3caProps,setemail0c3caProps] = React.useState<any>({}) 
   const [expense_datee6e16,setexpense_datee6e16] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [expense_datee6e16Props,setexpense_datee6e16Props] = React.useState<any>({}) 
   const [claim_categoryf03f1,setclaim_categoryf03f1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [claim_categoryf03f1Props,setclaim_categoryf03f1Props] = React.useState<any>({}) 
   const [category_total_amount49375,setcategory_total_amount49375] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [category_total_amount49375Props,setcategory_total_amount49375Props] = React.useState<any>({}) 
   const [receipt_image4f1bf,setreceipt_image4f1bf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [receipt_image4f1bfProps,setreceipt_image4f1bfProps] = React.useState<any>({}) 
   const [comments7171e,setcomments7171e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [comments7171eProps,setcomments7171eProps] = React.useState<any>({}) 
   const [save445f0,setsave445f0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [save445f0Props,setsave445f0Props] = React.useState<any>({}) 
   const [edit423b5,setedit423b5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [edit423b5Props,setedit423b5Props] = React.useState<any>({}) 
   const [dailyexpense64a4c,setdailyexpense64a4c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dailyexpense64a4cProps,setdailyexpense64a4cProps] = React.useState<any>({}) 
   const [expense_name136a1,setexpense_name136a1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [expense_name136a1Props,setexpense_name136a1Props] = React.useState<any>({}) 
   const [expense_date7e93b,setexpense_date7e93b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [expense_date7e93bProps,setexpense_date7e93bProps] = React.useState<any>({}) 
   const [claim_categoryf1c64,setclaim_categoryf1c64] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [claim_categoryf1c64Props,setclaim_categoryf1c64Props] = React.useState<any>({}) 
   const [category_total_amount395dd,setcategory_total_amount395dd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [category_total_amount395ddProps,setcategory_total_amount395ddProps] = React.useState<any>({}) 
   const [receipt_imageb2aec,setreceipt_imageb2aec] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [receipt_imageb2aecProps,setreceipt_imageb2aecProps] = React.useState<any>({}) 
   const [commentse3b5b,setcommentse3b5b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [commentse3b5bProps,setcommentse3b5bProps] = React.useState<any>({}) 
   const [saveec42b,setsaveec42b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [saveec42bProps,setsaveec42bProps] = React.useState<any>({}) 
   const [switch7e8ff,setswitch7e8ff] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [switch7e8ffProps,setswitch7e8ffProps] = React.useState<any>({}) 
   const [checkbox53e8f,setcheckbox53e8f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [checkbox53e8fProps,setcheckbox53e8fProps] = React.useState<any>({}) 
   const [expense_nameeac5c,setexpense_nameeac5c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [expense_nameeac5cProps,setexpense_nameeac5cProps] = React.useState<any>({}) 
   const [cetegorycd65c,setcetegorycd65c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cetegorycd65cProps,setcetegorycd65cProps] = React.useState<any>({}) 
   const [country72935,setcountry72935] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [country72935Props,setcountry72935Props] = React.useState<any>({}) 
   const [statebf0ec,setstatebf0ec] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [statebf0ecProps,setstatebf0ecProps] = React.useState<any>({}) 
   const [button058e1,setbutton058e1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [button058e1Props,setbutton058e1Props] = React.useState<any>({}) 
   const [state_two7430b,setstate_two7430b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [state_two7430bProps,setstate_two7430bProps] = React.useState<any>({}) 
   const [combobox659b9,setcombobox659b9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [combobox659b9Props,setcombobox659b9Props] = React.useState<any>({}) 
   const [carde8dd8,setcarde8dd8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [carde8dd8Props,setcarde8dd8Props] = React.useState<any>({}) 
   const [setmemoryvaluese2c19,setsetmemoryvaluese2c19] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [setmemoryvaluese2c19Props,setsetmemoryvaluese2c19Props] = React.useState<any>({}) 
   const [state62a91,setstate62a91] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [state62a91Props,setstate62a91Props] = React.useState<any>({}) 
   const [state_two24376,setstate_two24376] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [state_two24376Props,setstate_two24376Props] = React.useState<any>({}) 
   const [country625d4,setcountry625d4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [country625d4Props,setcountry625d4Props] = React.useState<any>({}) 
   const [textinput86330,settextinput86330] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textinput86330Props,settextinput86330Props] = React.useState<any>({}) 
   const [button3a885,setbutton3a885] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [button3a885Props,setbutton3a885Props] = React.useState<any>({}) 
   const [country2114e,setcountry2114e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [country2114eProps,setcountry2114eProps] = React.useState<any>({}) 
   const [statebbeaf,setstatebbeaf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [statebbeafProps,setstatebbeafProps] = React.useState<any>({}) 
   const [city6731c,setcity6731c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [city6731cProps,setcity6731cProps] = React.useState<any>({}) 
   const [button_one31b79,setbutton_one31b79] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [button_one31b79Props,setbutton_one31b79Props] = React.useState<any>({}) 
    ///////////
    const [refresh, setRefresh] = React.useState<Record<string, boolean>>({       buttonsearchba2ac:false,
       columncountry0de1c:false,
       columnstate64484:false,
       columncity6c663:false,
       advancesearchadvancesearchf4a44:false,
       barchartbarchartcf891:false,
       columncountryf4ab0:false,
       columnstate015fd:false,
       columncityfc3b9:false,
       textdaily_expense3c178:false,
       textinputexpense_namec83ee:false,
       textinputemail0c3ca:false,
       datepickerexpense_datee6e16:false,
       dropdownclaim_categoryf03f1:false,
       textinputcategory_total_amount49375:false,
       documentuploaderreceipt_image4f1bf:false,
       textareacomments7171e:false,
       buttonsave445f0:false,
       buttonedit423b5:false,
       textdailyexpense64a4c:false,
       textinputexpense_name136a1:false,
       datepickerexpense_date7e93b:false,
       dropdownclaim_categoryf1c64:false,
       textinputcategory_total_amount395dd:false,
       documentuploaderreceipt_imageb2aec:false,
       textareacommentse3b5b:false,
       buttonsaveec42b:false,
       switchswitch7e8ff:false,
       checkboxcheckbox53e8f:false,
       columnexpense_nameeac5c:false,
       columncetegorycd65c:false,
       columncountry72935:false,
       columnstatebf0ec:false,
       buttonbutton058e1:false,
       columnstate_two7430b:false,
       comboboxcombobox659b9:false,
       cardcarde8dd8:false,
       textsetmemoryvaluese2c19:false,
       dropdownstate62a91:false,
       dropdownstate_two24376:false,
       textinputcountry625d4:false,
       textinputtextinput86330:false,
       buttonbutton3a885:false,
       columncountry2114e:false,
       columnstatebbeaf:false,
       columncity6731c:false,
       buttonbutton_one31b79:false,
       groupgroupb7cd7:false,
       tableadvancesearchtable03366:false,
       groupadvancegroupa9081:false,
       groupgroup89800:false,
       tabletable3c3b1:false,
       groupgroup84b9c:false,
       grouparraygrouparray494e0:false,
       grouparraygrouparray494e0_0:false,
       grouparraygrouparray494e0_1:false,
       grouparraygrouparray494e0_2:false,
       grouparraygrouparray494e0_3:false,
       grouparraygrouparray494e0_4:false,
       grouparraygrouparray494e0_5:false,
       groupgroup571d2:false,
       groupgroup_two6135c:false,
       groupgroup611f3:false,
       tabletable5ca87:false,
       groupgroup9be24:false,
       tabletable2f83e:false,
       tabletable_oneb639c:false,
       groupgroupa03b5:false,
       groupgroupdf36a:false,
       tabletabled5efd:false,
      })

  ////// screen states 
  const [ad_search_table_v1,setad_search_table_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [ad_search_table_v1Props,setad_search_table_v1Props] = React.useState<any>({})
  const [ad_search_v1,setad_search_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [ad_search_v1Props,setad_search_v1Props] = React.useState<any>({})
  const [chart_v1,setchart_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [chart_v1Props,setchart_v1Props] = React.useState<any>({})
  const [grouparray_v1,setgrouparray_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [grouparray_v1Props,setgrouparray_v1Props] = React.useState<any>({})
  const [request_form_v1,setrequest_form_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [request_form_v1Props,setrequest_form_v1Props] = React.useState<any>({})
  const [table_v1,settable_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [table_v1Props,settable_v1Props] = React.useState<any>({})
  const [set_memory_table_v1,setset_memory_table_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [set_memory_table_v1Props,setset_memory_table_v1Props] = React.useState<any>({})
  const [combo_dropdown_v1,setcombo_dropdown_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [combo_dropdown_v1Props,setcombo_dropdown_v1Props] = React.useState<any>({})
  const [setmemoryvaluesevent_v1,setsetmemoryvaluesevent_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [setmemoryvaluesevent_v1Props,setsetmemoryvaluesevent_v1Props] = React.useState<any>({})

///////// dfd
  const [dfd_advance_search_v1Props,setdfd_advance_search_v1Props] = React.useState<any>([])
  const [dfd_combo_dfd_v1Props,setdfd_combo_dfd_v1Props] = React.useState<any>([])
  const [dfd_group_array_dsd_v1Props,setdfd_group_array_dsd_v1Props] = React.useState<any>([])
  const [dfd_claims_dfd_v1Props,setdfd_claims_dfd_v1Props] = React.useState<any>([])
  const [dfd_set_where_v1Props,setdfd_set_where_v1Props] = React.useState<any>([])
  const [dfd_chart_data_v1Props,setdfd_chart_data_v1Props] = React.useState<any>([])
  const [dfd_set_db_node_v1Props,setdfd_set_db_node_v1Props] = React.useState<any>([])
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
    setsearchba2ac(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcountry0de1c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstate64484(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcity6c663(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadvancesearchf4a44(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbarchartcf891(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcountryf4ab0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstate015fd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcityfc3b9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdaily_expense3c178(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_namec83ee(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setemail0c3ca(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_datee6e16(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_categoryf03f1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_total_amount49375(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreceipt_image4f1bf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcomments7171e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsave445f0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setedit423b5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdailyexpense64a4c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_name136a1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_date7e93b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_categoryf1c64(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_total_amount395dd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreceipt_imageb2aec(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcommentse3b5b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsaveec42b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setswitch7e8ff(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcheckbox53e8f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_nameeac5c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcetegorycd65c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcountry72935(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatebf0ec(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbutton058e1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstate_two7430b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcombobox659b9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcarde8dd8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsetmemoryvaluese2c19(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstate62a91(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstate_two24376(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcountry625d4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextinput86330(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbutton3a885(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcountry2114e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatebbeaf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcity6731c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbutton_one31b79(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 

        setgroupb7cd7({}) 
    setgroupb7cd7Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "search",
      ]
      }) 
    
    setadvancesearchtable03366([]) 
    setadvancesearchtable03366Props({
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
        setadvancegroupa9081({}) 
    setadvancegroupa9081Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "country",
      ]
      }) 
        setgroup89800({}) 
    setgroup89800Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "country",
      ]
      }) 
    
    settable3c3b1([]) 
    settable3c3b1Props({
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
        setgroup84b9c({}) 
    setgroup84b9cProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "save",
            "edit",
      ]
      }) 
        setgrouparray494e0({}) 
    setgrouparray494e0Props({
      validation:false,

      length:6,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "daily_expense",
            "expense_name",
            "email_id",
            "expense_date",
            "claim_category",
            "total_amount",
            "receipt_image",
            "description",
      ]
      }) 
        setgrouparray494e0_0({}) 
    setgrouparray494e0_0Props({
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
        setgrouparray494e0_1({}) 
    setgrouparray494e0_1Props({
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
        setgrouparray494e0_2({}) 
    setgrouparray494e0_2Props({
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
        setgrouparray494e0_3({}) 
    setgrouparray494e0_3Props({
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
        setgrouparray494e0_4({}) 
    setgrouparray494e0_4Props({
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
        setgrouparray494e0_5({}) 
    setgrouparray494e0_5Props({
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
        setgroup571d2({}) 
    setgroup571d2Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "dailyexpense",
            "expense_name",
            "expense_date",
            "claim_category",
            "category_total_amount",
            "receipt_image",
            "comments",
            "is_comment_enabled",
            "manager_comments",
      ]
      }) 
        setgroup_two6135c({}) 
    setgroup_two6135cProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "save",
      ]
      }) 
        setgroup611f3({}) 
    setgroup611f3Props({
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
    
    settable5ca87([]) 
    settable5ca87Props({
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
        setgroup9be24({}) 
    setgroup9be24Props({
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
    
    settable2f83e([]) 
    settable2f83eProps({
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
    
    settable_oneb639c([]) 
    settable_oneb639cProps({
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
        setgroupa03b5({}) 
    setgroupa03b5Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "name",
            "name",
      ]
      }) 
        setgroupdf36a({}) 
    setgroupdf36aProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "setmemoryvalues",
            "state",
            "state",
            "state_two",
            "state_two",
            "country",
            "country",
            "button",
      ]
      }) 
    
    settabled5efd([]) 
    settabled5efdProps({
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
        groupb7cd7, 
        setgroupb7cd7,
        groupb7cd7Props, 
        setgroupb7cd7Props,
        advancesearchtable03366, 
        setadvancesearchtable03366,
        advancesearchtable03366Props, 
        setadvancesearchtable03366Props,
        advancegroupa9081, 
        setadvancegroupa9081,
        advancegroupa9081Props, 
        setadvancegroupa9081Props,
        group89800, 
        setgroup89800,
        group89800Props, 
        setgroup89800Props,
        table3c3b1, 
        settable3c3b1,
        table3c3b1Props, 
        settable3c3b1Props,
        group84b9c, 
        setgroup84b9c,
        group84b9cProps, 
        setgroup84b9cProps,
        grouparray494e0, 
        setgrouparray494e0,
        grouparray494e0Props, 
        setgrouparray494e0Props,
        grouparray494e0_0, 
        setgrouparray494e0_0,
        grouparray494e0_0Props, 
        setgrouparray494e0_0Props,
        grouparray494e0_1, 
        setgrouparray494e0_1,
        grouparray494e0_1Props, 
        setgrouparray494e0_1Props,
        grouparray494e0_2, 
        setgrouparray494e0_2,
        grouparray494e0_2Props, 
        setgrouparray494e0_2Props,
        grouparray494e0_3, 
        setgrouparray494e0_3,
        grouparray494e0_3Props, 
        setgrouparray494e0_3Props,
        grouparray494e0_4, 
        setgrouparray494e0_4,
        grouparray494e0_4Props, 
        setgrouparray494e0_4Props,
        grouparray494e0_5, 
        setgrouparray494e0_5,
        grouparray494e0_5Props, 
        setgrouparray494e0_5Props,
        group571d2, 
        setgroup571d2,
        group571d2Props, 
        setgroup571d2Props,
        group_two6135c, 
        setgroup_two6135c,
        group_two6135cProps, 
        setgroup_two6135cProps,
        group611f3, 
        setgroup611f3,
        group611f3Props, 
        setgroup611f3Props,
        table5ca87, 
        settable5ca87,
        table5ca87Props, 
        settable5ca87Props,
        group9be24, 
        setgroup9be24,
        group9be24Props, 
        setgroup9be24Props,
        table2f83e, 
        settable2f83e,
        table2f83eProps, 
        settable2f83eProps,
        table_oneb639c, 
        settable_oneb639c,
        table_oneb639cProps, 
        settable_oneb639cProps,
        groupa03b5, 
        setgroupa03b5,
        groupa03b5Props, 
        setgroupa03b5Props,
        groupdf36a, 
        setgroupdf36a,
        groupdf36aProps, 
        setgroupdf36aProps,
        tabled5efd, 
        settabled5efd,
        tabled5efdProps, 
        settabled5efdProps,
        searchba2ac,
        setsearchba2ac, 
        searchba2acProps,
        setsearchba2acProps,
        country0de1c,
        setcountry0de1c, 
        country0de1cProps,
        setcountry0de1cProps,
        state64484,
        setstate64484, 
        state64484Props,
        setstate64484Props,
        city6c663,
        setcity6c663, 
        city6c663Props,
        setcity6c663Props,
        advancesearchf4a44,
        setadvancesearchf4a44, 
        advancesearchf4a44Props,
        setadvancesearchf4a44Props,
        barchartcf891,
        setbarchartcf891, 
        barchartcf891Props,
        setbarchartcf891Props,
        countryf4ab0,
        setcountryf4ab0, 
        countryf4ab0Props,
        setcountryf4ab0Props,
        state015fd,
        setstate015fd, 
        state015fdProps,
        setstate015fdProps,
        cityfc3b9,
        setcityfc3b9, 
        cityfc3b9Props,
        setcityfc3b9Props,
        daily_expense3c178,
        setdaily_expense3c178, 
        daily_expense3c178Props,
        setdaily_expense3c178Props,
        expense_namec83ee,
        setexpense_namec83ee, 
        expense_namec83eeProps,
        setexpense_namec83eeProps,
        email0c3ca,
        setemail0c3ca, 
        email0c3caProps,
        setemail0c3caProps,
        expense_datee6e16,
        setexpense_datee6e16, 
        expense_datee6e16Props,
        setexpense_datee6e16Props,
        claim_categoryf03f1,
        setclaim_categoryf03f1, 
        claim_categoryf03f1Props,
        setclaim_categoryf03f1Props,
        category_total_amount49375,
        setcategory_total_amount49375, 
        category_total_amount49375Props,
        setcategory_total_amount49375Props,
        receipt_image4f1bf,
        setreceipt_image4f1bf, 
        receipt_image4f1bfProps,
        setreceipt_image4f1bfProps,
        comments7171e,
        setcomments7171e, 
        comments7171eProps,
        setcomments7171eProps,
        save445f0,
        setsave445f0, 
        save445f0Props,
        setsave445f0Props,
        edit423b5,
        setedit423b5, 
        edit423b5Props,
        setedit423b5Props,
        dailyexpense64a4c,
        setdailyexpense64a4c, 
        dailyexpense64a4cProps,
        setdailyexpense64a4cProps,
        expense_name136a1,
        setexpense_name136a1, 
        expense_name136a1Props,
        setexpense_name136a1Props,
        expense_date7e93b,
        setexpense_date7e93b, 
        expense_date7e93bProps,
        setexpense_date7e93bProps,
        claim_categoryf1c64,
        setclaim_categoryf1c64, 
        claim_categoryf1c64Props,
        setclaim_categoryf1c64Props,
        category_total_amount395dd,
        setcategory_total_amount395dd, 
        category_total_amount395ddProps,
        setcategory_total_amount395ddProps,
        receipt_imageb2aec,
        setreceipt_imageb2aec, 
        receipt_imageb2aecProps,
        setreceipt_imageb2aecProps,
        commentse3b5b,
        setcommentse3b5b, 
        commentse3b5bProps,
        setcommentse3b5bProps,
        saveec42b,
        setsaveec42b, 
        saveec42bProps,
        setsaveec42bProps,
        switch7e8ff,
        setswitch7e8ff, 
        switch7e8ffProps,
        setswitch7e8ffProps,
        checkbox53e8f,
        setcheckbox53e8f, 
        checkbox53e8fProps,
        setcheckbox53e8fProps,
        expense_nameeac5c,
        setexpense_nameeac5c, 
        expense_nameeac5cProps,
        setexpense_nameeac5cProps,
        cetegorycd65c,
        setcetegorycd65c, 
        cetegorycd65cProps,
        setcetegorycd65cProps,
        country72935,
        setcountry72935, 
        country72935Props,
        setcountry72935Props,
        statebf0ec,
        setstatebf0ec, 
        statebf0ecProps,
        setstatebf0ecProps,
        button058e1,
        setbutton058e1, 
        button058e1Props,
        setbutton058e1Props,
        state_two7430b,
        setstate_two7430b, 
        state_two7430bProps,
        setstate_two7430bProps,
        combobox659b9,
        setcombobox659b9, 
        combobox659b9Props,
        setcombobox659b9Props,
        carde8dd8,
        setcarde8dd8, 
        carde8dd8Props,
        setcarde8dd8Props,
        setmemoryvaluese2c19,
        setsetmemoryvaluese2c19, 
        setmemoryvaluese2c19Props,
        setsetmemoryvaluese2c19Props,
        state62a91,
        setstate62a91, 
        state62a91Props,
        setstate62a91Props,
        state_two24376,
        setstate_two24376, 
        state_two24376Props,
        setstate_two24376Props,
        country625d4,
        setcountry625d4, 
        country625d4Props,
        setcountry625d4Props,
        textinput86330,
        settextinput86330, 
        textinput86330Props,
        settextinput86330Props,
        button3a885,
        setbutton3a885, 
        button3a885Props,
        setbutton3a885Props,
        country2114e,
        setcountry2114e, 
        country2114eProps,
        setcountry2114eProps,
        statebbeaf,
        setstatebbeaf, 
        statebbeafProps,
        setstatebbeafProps,
        city6731c,
        setcity6731c, 
        city6731cProps,
        setcity6731cProps,
        button_one31b79,
        setbutton_one31b79, 
        button_one31b79Props,
        setbutton_one31b79Props,
        ////// screen states 
          ad_search_table_v1,
          setad_search_table_v1,
          ad_search_table_v1Props,
          setad_search_table_v1Props,
          ad_search_v1,
          setad_search_v1,
          ad_search_v1Props,
          setad_search_v1Props,
          chart_v1,
          setchart_v1,
          chart_v1Props,
          setchart_v1Props,
          grouparray_v1,
          setgrouparray_v1,
          grouparray_v1Props,
          setgrouparray_v1Props,
          request_form_v1,
          setrequest_form_v1,
          request_form_v1Props,
          setrequest_form_v1Props,
          table_v1,
          settable_v1,
          table_v1Props,
          settable_v1Props,
          set_memory_table_v1,
          setset_memory_table_v1,
          set_memory_table_v1Props,
          setset_memory_table_v1Props,
          combo_dropdown_v1,
          setcombo_dropdown_v1,
          combo_dropdown_v1Props,
          setcombo_dropdown_v1Props,
          setmemoryvaluesevent_v1,
          setsetmemoryvaluesevent_v1,
          setmemoryvaluesevent_v1Props,
          setsetmemoryvaluesevent_v1Props,
        //////////

        ///////// dfd
        dfd_advance_search_v1Props,
        setdfd_advance_search_v1Props,
        dfd_combo_dfd_v1Props,
        setdfd_combo_dfd_v1Props,
        dfd_group_array_dsd_v1Props,
        setdfd_group_array_dsd_v1Props,
        dfd_claims_dfd_v1Props,
        setdfd_claims_dfd_v1Props,
        dfd_set_where_v1Props,
        setdfd_set_where_v1Props,
        dfd_chart_data_v1Props,
        setdfd_chart_data_v1Props,
        dfd_set_db_node_v1Props,
        setdfd_set_db_node_v1Props,
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