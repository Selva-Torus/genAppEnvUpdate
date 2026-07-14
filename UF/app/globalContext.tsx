


"use client"
import React, { useEffect } from 'react';
import { getCookie } from './components/cookieMgment';
import { usePathname } from 'next/navigation'
export interface TotalContextProps {
  currentToken: any 
  setCurrentToken: React.Dispatch<React.SetStateAction<any>>
  matchedAccessProfileData: any;
  setMatchedAccessProfileData: React.Dispatch<React.SetStateAction<any>>
  grouped023: any 
  setgrouped023: React.Dispatch<React.SetStateAction<any>>
  grouped023Props: any 
  setgrouped023Props: React.Dispatch<React.SetStateAction<any>>
  dynamicactionsc9120: any 
  setdynamicactionsc9120: React.Dispatch<React.SetStateAction<any>>
  dynamicactionsc9120Props: any 
  setdynamicactionsc9120Props: React.Dispatch<React.SetStateAction<any>>
  dynamicactionsa32986: any 
  setdynamicactionsa32986: React.Dispatch<React.SetStateAction<any>>
  dynamicactionsa32986Props: any 
  setdynamicactionsa32986Props: React.Dispatch<React.SetStateAction<any>>
  table12312058a8: any 
  settable12312058a8: React.Dispatch<React.SetStateAction<any>>
  table12312058a8Props: any 
  settable12312058a8Props: React.Dispatch<React.SetStateAction<any>>
  tab_group03bf3: any 
  settab_group03bf3: React.Dispatch<React.SetStateAction<any>>
  tab_group03bf3Props: any 
  settab_group03bf3Props: React.Dispatch<React.SetStateAction<any>>
  tab_header_119fae: any 
  settab_header_119fae: React.Dispatch<React.SetStateAction<any>>
  tab_header_119faeProps: any 
  settab_header_119faeProps: React.Dispatch<React.SetStateAction<any>>
  gggg721e2: any 
  setgggg721e2: React.Dispatch<React.SetStateAction<any>>
  gggg721e2Props: any 
  setgggg721e2Props: React.Dispatch<React.SetStateAction<any>>
  tab_header_2d8952: any 
  settab_header_2d8952: React.Dispatch<React.SetStateAction<any>>
  tab_header_2d8952Props: any 
  settab_header_2d8952Props: React.Dispatch<React.SetStateAction<any>>
  xbxvvcv42015: any 
  setxbxvvcv42015: React.Dispatch<React.SetStateAction<any>>
  xbxvvcv42015Props: any 
  setxbxvvcv42015Props: React.Dispatch<React.SetStateAction<any>>
  group123488888: any 
  setgroup123488888: React.Dispatch<React.SetStateAction<any>>
  group123488888Props: any 
  setgroup123488888Props: React.Dispatch<React.SetStateAction<any>>
  stateaa824: any 
  setstateaa824: React.Dispatch<React.SetStateAction<any>>
  stateaa824Props: any 
  setstateaa824Props: React.Dispatch<React.SetStateAction<any>>
  groupaaa97733: any 
  setgroupaaa97733: React.Dispatch<React.SetStateAction<any>>
  groupaaa97733Props: any 
  setgroupaaa97733Props: React.Dispatch<React.SetStateAction<any>>
  groupc0c048: any 
  setgroupc0c048: React.Dispatch<React.SetStateAction<any>>
  groupc0c048Props: any 
  setgroupc0c048Props: React.Dispatch<React.SetStateAction<any>>
  groupd487a8: any 
  setgroupd487a8: React.Dispatch<React.SetStateAction<any>>
  groupd487a8Props: any 
  setgroupd487a8Props: React.Dispatch<React.SetStateAction<any>>
  groupb8f3d7: any 
  setgroupb8f3d7: React.Dispatch<React.SetStateAction<any>>
  groupb8f3d7Props: any 
  setgroupb8f3d7Props: React.Dispatch<React.SetStateAction<any>>
  groupf6bcb: any 
  setgroupf6bcb: React.Dispatch<React.SetStateAction<any>>
  groupf6bcbProps: any 
  setgroupf6bcbProps: React.Dispatch<React.SetStateAction<any>>
  table7d435: any 
  settable7d435: React.Dispatch<React.SetStateAction<any>>
  table7d435Props: any 
  settable7d435Props: React.Dispatch<React.SetStateAction<any>>
  group0e6f3: any 
  setgroup0e6f3: React.Dispatch<React.SetStateAction<any>>
  group0e6f3Props: any 
  setgroup0e6f3Props: React.Dispatch<React.SetStateAction<any>>
  group0843e: any 
  setgroup0843e: React.Dispatch<React.SetStateAction<any>>
  group0843eProps: any 
  setgroup0843eProps: React.Dispatch<React.SetStateAction<any>>
  group7f2ed: any 
  setgroup7f2ed: React.Dispatch<React.SetStateAction<any>>
  group7f2edProps: any 
  setgroup7f2edProps: React.Dispatch<React.SetStateAction<any>>
  groupe0568: any 
  setgroupe0568: React.Dispatch<React.SetStateAction<any>>
  groupe0568Props: any 
  setgroupe0568Props: React.Dispatch<React.SetStateAction<any>>
  grouparray55d38: any 
  setgrouparray55d38: React.Dispatch<React.SetStateAction<any>>
  grouparray55d38Props: any 
  setgrouparray55d38Props: React.Dispatch<React.SetStateAction<any>>
  grouparray55d38_0: any 
  setgrouparray55d38_0: React.Dispatch<React.SetStateAction<any>>
  grouparray55d38_0Props: any 
  setgrouparray55d38_0Props: React.Dispatch<React.SetStateAction<any>>
  grouparray55d38_1: any 
  setgrouparray55d38_1: React.Dispatch<React.SetStateAction<any>>
  grouparray55d38_1Props: any 
  setgrouparray55d38_1Props: React.Dispatch<React.SetStateAction<any>>
  grouparray55d38_2: any 
  setgrouparray55d38_2: React.Dispatch<React.SetStateAction<any>>
  grouparray55d38_2Props: any 
  setgrouparray55d38_2Props: React.Dispatch<React.SetStateAction<any>>
  group7fd3f: any 
  setgroup7fd3f: React.Dispatch<React.SetStateAction<any>>
  group7fd3fProps: any 
  setgroup7fd3fProps: React.Dispatch<React.SetStateAction<any>>
  tablecb5d6: any 
  settablecb5d6: React.Dispatch<React.SetStateAction<any>>
  tablecb5d6Props: any 
  settablecb5d6Props: React.Dispatch<React.SetStateAction<any>>
  buttona0ee1f: any,
  setbuttona0ee1f:React.Dispatch<React.SetStateAction<any>>
  buttona0ee1fProps: any 
  setbuttona0ee1fProps: React.Dispatch<React.SetStateAction<any>>
  buttonbe1b8e: any,
  setbuttonbe1b8e:React.Dispatch<React.SetStateAction<any>>
  buttonbe1b8eProps: any 
  setbuttonbe1b8eProps: React.Dispatch<React.SetStateAction<any>>
  buttonc177ba: any,
  setbuttonc177ba:React.Dispatch<React.SetStateAction<any>>
  buttonc177baProps: any 
  setbuttonc177baProps: React.Dispatch<React.SetStateAction<any>>
  buttond0665e: any,
  setbuttond0665e:React.Dispatch<React.SetStateAction<any>>
  buttond0665eProps: any 
  setbuttond0665eProps: React.Dispatch<React.SetStateAction<any>>
  value9087e: any,
  setvalue9087e:React.Dispatch<React.SetStateAction<any>>
  value9087eProps: any 
  setvalue9087eProps: React.Dispatch<React.SetStateAction<any>>
  switch63dd1: any,
  setswitch63dd1:React.Dispatch<React.SetStateAction<any>>
  switch63dd1Props: any 
  setswitch63dd1Props: React.Dispatch<React.SetStateAction<any>>
  textinput123292f1: any,
  settextinput123292f1:React.Dispatch<React.SetStateAction<any>>
  textinput123292f1Props: any 
  settextinput123292f1Props: React.Dispatch<React.SetStateAction<any>>
  buttoncc181d5: any,
  setbuttoncc181d5:React.Dispatch<React.SetStateAction<any>>
  buttoncc181d5Props: any 
  setbuttoncc181d5Props: React.Dispatch<React.SetStateAction<any>>
  buttonbb596df: any,
  setbuttonbb596df:React.Dispatch<React.SetStateAction<any>>
  buttonbb596dfProps: any 
  setbuttonbb596dfProps: React.Dispatch<React.SetStateAction<any>>
  buttonaaf8012: any,
  setbuttonaaf8012:React.Dispatch<React.SetStateAction<any>>
  buttonaaf8012Props: any 
  setbuttonaaf8012Props: React.Dispatch<React.SetStateAction<any>>
  dateandtimef72a6: any,
  setdateandtimef72a6:React.Dispatch<React.SetStateAction<any>>
  dateandtimef72a6Props: any 
  setdateandtimef72a6Props: React.Dispatch<React.SetStateAction<any>>
  datepickerb9ae2: any,
  setdatepickerb9ae2:React.Dispatch<React.SetStateAction<any>>
  datepickerb9ae2Props: any 
  setdatepickerb9ae2Props: React.Dispatch<React.SetStateAction<any>>
  dropdown16aa0: any,
  setdropdown16aa0:React.Dispatch<React.SetStateAction<any>>
  dropdown16aa0Props: any 
  setdropdown16aa0Props: React.Dispatch<React.SetStateAction<any>>
  textinput1f103: any,
  settextinput1f103:React.Dispatch<React.SetStateAction<any>>
  textinput1f103Props: any 
  settextinput1f103Props: React.Dispatch<React.SetStateAction<any>>
  name31e2e: any,
  setname31e2e:React.Dispatch<React.SetStateAction<any>>
  name31e2eProps: any 
  setname31e2eProps: React.Dispatch<React.SetStateAction<any>>
  hh6c7c1: any,
  sethh6c7c1:React.Dispatch<React.SetStateAction<any>>
  hh6c7c1Props: any 
  sethh6c7c1Props: React.Dispatch<React.SetStateAction<any>>
  routee4686: any,
  setroutee4686:React.Dispatch<React.SetStateAction<any>>
  routee4686Props: any 
  setroutee4686Props: React.Dispatch<React.SetStateAction<any>>
  rrrrb3f0c: any,
  setrrrrb3f0c:React.Dispatch<React.SetStateAction<any>>
  rrrrb3f0cProps: any 
  setrrrrb3f0cProps: React.Dispatch<React.SetStateAction<any>>
  xcvxvxce4e1f: any,
  setxcvxvxce4e1f:React.Dispatch<React.SetStateAction<any>>
  xcvxvxce4e1fProps: any 
  setxcvxvxce4e1fProps: React.Dispatch<React.SetStateAction<any>>
  buttondfgdf29503: any,
  setbuttondfgdf29503:React.Dispatch<React.SetStateAction<any>>
  buttondfgdf29503Props: any 
  setbuttondfgdf29503Props: React.Dispatch<React.SetStateAction<any>>
  buttondsdfsd487f1: any,
  setbuttondsdfsd487f1:React.Dispatch<React.SetStateAction<any>>
  buttondsdfsd487f1Props: any 
  setbuttondsdfsd487f1Props: React.Dispatch<React.SetStateAction<any>>
  country0bab5: any,
  setcountry0bab5:React.Dispatch<React.SetStateAction<any>>
  country0bab5Props: any 
  setcountry0bab5Props: React.Dispatch<React.SetStateAction<any>>
  city886d7: any,
  setcity886d7:React.Dispatch<React.SetStateAction<any>>
  city886d7Props: any 
  setcity886d7Props: React.Dispatch<React.SetStateAction<any>>
  lock00a31: any,
  setlock00a31:React.Dispatch<React.SetStateAction<any>>
  lock00a31Props: any 
  setlock00a31Props: React.Dispatch<React.SetStateAction<any>>
  otherdetails9c51d: any,
  setotherdetails9c51d:React.Dispatch<React.SetStateAction<any>>
  otherdetails9c51dProps: any 
  setotherdetails9c51dProps: React.Dispatch<React.SetStateAction<any>>
  ddd73ecf: any,
  setddd73ecf:React.Dispatch<React.SetStateAction<any>>
  ddd73ecfProps: any 
  setddd73ecfProps: React.Dispatch<React.SetStateAction<any>>
  text23423bb984: any,
  settext23423bb984:React.Dispatch<React.SetStateAction<any>>
  text23423bb984Props: any 
  settext23423bb984Props: React.Dispatch<React.SetStateAction<any>>
  text234245d6a: any,
  settext234245d6a:React.Dispatch<React.SetStateAction<any>>
  text234245d6aProps: any 
  settext234245d6aProps: React.Dispatch<React.SetStateAction<any>>
  combobox1231f35a2: any,
  setcombobox1231f35a2:React.Dispatch<React.SetStateAction<any>>
  combobox1231f35a2Props: any 
  setcombobox1231f35a2Props: React.Dispatch<React.SetStateAction<any>>
  text54509a93: any,
  settext54509a93:React.Dispatch<React.SetStateAction<any>>
  text54509a93Props: any 
  settext54509a93Props: React.Dispatch<React.SetStateAction<any>>
  datepicker123acd53: any,
  setdatepicker123acd53:React.Dispatch<React.SetStateAction<any>>
  datepicker123acd53Props: any 
  setdatepicker123acd53Props: React.Dispatch<React.SetStateAction<any>>
  text1231c2aa3: any,
  settext1231c2aa3:React.Dispatch<React.SetStateAction<any>>
  text1231c2aa3Props: any 
  settext1231c2aa3Props: React.Dispatch<React.SetStateAction<any>>
  dropdown4af30: any,
  setdropdown4af30:React.Dispatch<React.SetStateAction<any>>
  dropdown4af30Props: any 
  setdropdown4af30Props: React.Dispatch<React.SetStateAction<any>>
  comboboxa2ee09: any,
  setcomboboxa2ee09:React.Dispatch<React.SetStateAction<any>>
  comboboxa2ee09Props: any 
  setcomboboxa2ee09Props: React.Dispatch<React.SetStateAction<any>>
  dateandtime26c68: any,
  setdateandtime26c68:React.Dispatch<React.SetStateAction<any>>
  dateandtime26c68Props: any 
  setdateandtime26c68Props: React.Dispatch<React.SetStateAction<any>>
  buttonba9c0: any,
  setbuttonba9c0:React.Dispatch<React.SetStateAction<any>>
  buttonba9c0Props: any 
  setbuttonba9c0Props: React.Dispatch<React.SetStateAction<any>>
  textinputaee10: any,
  settextinputaee10:React.Dispatch<React.SetStateAction<any>>
  textinputaee10Props: any 
  settextinputaee10Props: React.Dispatch<React.SetStateAction<any>>
  comboboxb9056e: any,
  setcomboboxb9056e:React.Dispatch<React.SetStateAction<any>>
  comboboxb9056eProps: any 
  setcomboboxb9056eProps: React.Dispatch<React.SetStateAction<any>>
  comboboxccfb84: any,
  setcomboboxccfb84:React.Dispatch<React.SetStateAction<any>>
  comboboxccfb84Props: any 
  setcomboboxccfb84Props: React.Dispatch<React.SetStateAction<any>>
  textinput12354a98: any,
  settextinput12354a98:React.Dispatch<React.SetStateAction<any>>
  textinput12354a98Props: any 
  settextinput12354a98Props: React.Dispatch<React.SetStateAction<any>>
  datepicker0e91e: any,
  setdatepicker0e91e:React.Dispatch<React.SetStateAction<any>>
  datepicker0e91eProps: any 
  setdatepicker0e91eProps: React.Dispatch<React.SetStateAction<any>>
  advancesearch6c997: any,
  setadvancesearch6c997:React.Dispatch<React.SetStateAction<any>>
  advancesearch6c997Props: any 
  setadvancesearch6c997Props: React.Dispatch<React.SetStateAction<any>>
  dateandtimeb3eda: any,
  setdateandtimeb3eda:React.Dispatch<React.SetStateAction<any>>
  dateandtimeb3edaProps: any 
  setdateandtimeb3edaProps: React.Dispatch<React.SetStateAction<any>>
  country38670: any,
  setcountry38670:React.Dispatch<React.SetStateAction<any>>
  country38670Props: any 
  setcountry38670Props: React.Dispatch<React.SetStateAction<any>>
  statef29da: any,
  setstatef29da:React.Dispatch<React.SetStateAction<any>>
  statef29daProps: any 
  setstatef29daProps: React.Dispatch<React.SetStateAction<any>>
  button62ae4: any,
  setbutton62ae4:React.Dispatch<React.SetStateAction<any>>
  button62ae4Props: any 
  setbutton62ae4Props: React.Dispatch<React.SetStateAction<any>>
  textinput55664: any,
  settextinput55664:React.Dispatch<React.SetStateAction<any>>
  textinput55664Props: any 
  settextinput55664Props: React.Dispatch<React.SetStateAction<any>>
  textinputd0435: any,
  settextinputd0435:React.Dispatch<React.SetStateAction<any>>
  textinputd0435Props: any 
  settextinputd0435Props: React.Dispatch<React.SetStateAction<any>>
  textinput5daae3: any,
  settextinput5daae3:React.Dispatch<React.SetStateAction<any>>
  textinput5daae3Props: any 
  settextinput5daae3Props: React.Dispatch<React.SetStateAction<any>>
  dateandtimec481e: any,
  setdateandtimec481e:React.Dispatch<React.SetStateAction<any>>
  dateandtimec481eProps: any 
  setdateandtimec481eProps: React.Dispatch<React.SetStateAction<any>>
  datepicker019ca: any,
  setdatepicker019ca:React.Dispatch<React.SetStateAction<any>>
  datepicker019caProps: any 
  setdatepicker019caProps: React.Dispatch<React.SetStateAction<any>>
  textinput165d1d: any,
  settextinput165d1d:React.Dispatch<React.SetStateAction<any>>
  textinput165d1dProps: any 
  settextinput165d1dProps: React.Dispatch<React.SetStateAction<any>>
  textinput204f11: any,
  settextinput204f11:React.Dispatch<React.SetStateAction<any>>
  textinput204f11Props: any 
  settextinput204f11Props: React.Dispatch<React.SetStateAction<any>>
  textinput38ac83: any,
  settextinput38ac83:React.Dispatch<React.SetStateAction<any>>
  textinput38ac83Props: any 
  settextinput38ac83Props: React.Dispatch<React.SetStateAction<any>>
  textinput455cca: any,
  settextinput455cca:React.Dispatch<React.SetStateAction<any>>
  textinput455ccaProps: any 
  settextinput455ccaProps: React.Dispatch<React.SetStateAction<any>>
  country3b817: any,
  setcountry3b817:React.Dispatch<React.SetStateAction<any>>
  country3b817Props: any 
  setcountry3b817Props: React.Dispatch<React.SetStateAction<any>>
  my_id84e54: any,
  setmy_id84e54:React.Dispatch<React.SetStateAction<any>>
  my_id84e54Props: any 
  setmy_id84e54Props: React.Dispatch<React.SetStateAction<any>>
  save12f95: any,
  setsave12f95:React.Dispatch<React.SetStateAction<any>>
  save12f95Props: any 
  setsave12f95Props: React.Dispatch<React.SetStateAction<any>>
  textinputa3fbc: any,
  settextinputa3fbc:React.Dispatch<React.SetStateAction<any>>
  textinputa3fbcProps: any 
  settextinputa3fbcProps: React.Dispatch<React.SetStateAction<any>>
  username0985a: any,
  setusername0985a:React.Dispatch<React.SetStateAction<any>>
  username0985aProps: any 
  setusername0985aProps: React.Dispatch<React.SetStateAction<any>>
  approvec8dd3: any,
  setapprovec8dd3:React.Dispatch<React.SetStateAction<any>>
  approvec8dd3Props: any 
  setapprovec8dd3Props: React.Dispatch<React.SetStateAction<any>>
  user_id8eaea: any,
  setuser_id8eaea:React.Dispatch<React.SetStateAction<any>>
  user_id8eaeaProps: any 
  setuser_id8eaeaProps: React.Dispatch<React.SetStateAction<any>>
  name36041: any,
  setname36041:React.Dispatch<React.SetStateAction<any>>
  name36041Props: any 
  setname36041Props: React.Dispatch<React.SetStateAction<any>>

////// screen states 
  dynamicaction_v1: any 
  setdynamicaction_v1: React.Dispatch<React.SetStateAction<any>>
  dynamicaction_v1Props: any 
  setdynamicaction_v1Props: React.Dispatch<React.SetStateAction<any>>
  comboboxcheck_v1: any 
  setcomboboxcheck_v1: React.Dispatch<React.SetStateAction<any>>
  comboboxcheck_v1Props: any 
  setcomboboxcheck_v1Props: React.Dispatch<React.SetStateAction<any>>
  advancedsearch_v1: any 
  setadvancedsearch_v1: React.Dispatch<React.SetStateAction<any>>
  advancedsearch_v1Props: any 
  setadvancedsearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  sample_test_v1: any 
  setsample_test_v1: React.Dispatch<React.SetStateAction<any>>
  sample_test_v1Props: any 
  setsample_test_v1Props: React.Dispatch<React.SetStateAction<any>>
  sample_test1_v1: any 
  setsample_test1_v1: React.Dispatch<React.SetStateAction<any>>
  sample_test1_v1Props: any 
  setsample_test1_v1Props: React.Dispatch<React.SetStateAction<any>>
  ffff_v1: any 
  setffff_v1: React.Dispatch<React.SetStateAction<any>>
  ffff_v1Props: any 
  setffff_v1Props: React.Dispatch<React.SetStateAction<any>>
  maker_v1: any 
  setmaker_v1: React.Dispatch<React.SetStateAction<any>>
  maker_v1Props: any 
  setmaker_v1Props: React.Dispatch<React.SetStateAction<any>>
  checker_v1: any 
  setchecker_v1: React.Dispatch<React.SetStateAction<any>>
  checker_v1Props: any 
  setchecker_v1Props: React.Dispatch<React.SetStateAction<any>>

///////// dfd
  dfd_country_code_dfd_v1Props: any 
  setdfd_country_code_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_userdfd_v1Props: any 
  setdfd_userdfd_v1Props: React.Dispatch<React.SetStateAction<any>>

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
        const [grouped023, setgrouped023 ] = React.useState<any>({}) 
    const [grouped023Props, setgrouped023Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "value",
            "switch",
            "my_id",
            "dateandtime",
            "trs_created_date",
            "dropdown",
            "my_id",
      ]
      }) 
        const [dynamicactionsc9120, setdynamicactionsc9120 ] = React.useState<any>({}) 
    const [dynamicactionsc9120Props, setdynamicactionsc9120Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "buttona",
            "buttonb",
            "buttonc",
            "buttond",
      ]
      }) 
        const [dynamicactionsa32986, setdynamicactionsa32986 ] = React.useState<any>({}) 
    const [dynamicactionsa32986Props, setdynamicactionsa32986Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "buttoncc",
            "buttonbb",
            "buttonaa",
      ]
      }) 
    
    const [table12312058a8, settable12312058a8 ] = React.useState<any>([]) 
    const [table12312058a8Props, settable12312058a8Props ] = React.useState<any>({
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
        const [tab_group03bf3, settab_group03bf3 ] = React.useState<any>({}) 
    const [tab_group03bf3Props, settab_group03bf3Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "rrrr",
            "xcvxvxc",
      ]
      }) 
        const [tab_header_119fae, settab_header_119fae ] = React.useState<any>({}) 
    const [tab_header_119faeProps, settab_header_119faeProps ] = React.useState<any>({
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
        const [gggg721e2, setgggg721e2 ] = React.useState<any>({}) 
    const [gggg721e2Props, setgggg721e2Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "buttondfgdf",
      ]
      }) 
        const [tab_header_2d8952, settab_header_2d8952 ] = React.useState<any>({}) 
    const [tab_header_2d8952Props, settab_header_2d8952Props ] = React.useState<any>({
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
        const [xbxvvcv42015, setxbxvvcv42015 ] = React.useState<any>({}) 
    const [xbxvvcv42015Props, setxbxvvcv42015Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "buttondsdfsd",
      ]
      }) 
        const [group123488888, setgroup123488888 ] = React.useState<any>({}) 
    const [group123488888Props, setgroup123488888Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "comboboxa",
            "comboboxa",
            "dateandtime",
            "button",
            "textinput",
            "comboboxb",
            "comboboxb",
            "comboboxc",
            "comboboxc",
            "textinput123",
            "datepicker",
      ]
      }) 
    
    const [stateaa824, setstateaa824 ] = React.useState<any>([]) 
    const [stateaa824Props, setstateaa824Props ] = React.useState<any>({
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
        const [groupaaa97733, setgroupaaa97733 ] = React.useState<any>({}) 
    const [groupaaa97733Props, setgroupaaa97733Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "text23423",
      ]
      }) 
        const [groupc0c048, setgroupc0c048 ] = React.useState<any>({}) 
    const [groupc0c048Props, setgroupc0c048Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "text2342",
            "combobox1231",
      ]
      }) 
        const [groupd487a8, setgroupd487a8 ] = React.useState<any>({}) 
    const [groupd487a8Props, setgroupd487a8Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "text545",
            "datepicker123",
      ]
      }) 
        const [groupb8f3d7, setgroupb8f3d7 ] = React.useState<any>({}) 
    const [groupb8f3d7Props, setgroupb8f3d7Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "text1231",
            "dropdown",
      ]
      }) 
        const [groupf6bcb, setgroupf6bcb ] = React.useState<any>({}) 
    const [groupf6bcbProps, setgroupf6bcbProps ] = React.useState<any>({
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
            "dateandtime",
      ]
      }) 
    
    const [table7d435, settable7d435 ] = React.useState<any>([]) 
    const [table7d435Props, settable7d435Props ] = React.useState<any>({
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
        const [group0e6f3, setgroup0e6f3 ] = React.useState<any>({}) 
    const [group0e6f3Props, setgroup0e6f3Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "button",
      ]
      }) 
        const [group0843e, setgroup0843e ] = React.useState<any>({}) 
    const [group0843eProps, setgroup0843eProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "textinput",
      ]
      }) 
        const [group7f2ed, setgroup7f2ed ] = React.useState<any>({}) 
    const [group7f2edProps, setgroup7f2edProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "textinput",
            "my_id",
            "dateandtime",
            "datepicker",
            "textinput1",
            "textinput2",
            "textinput3",
            "textinput4",
      ]
      }) 
        const [groupe0568, setgroupe0568 ] = React.useState<any>({}) 
    const [groupe0568Props, setgroupe0568Props ] = React.useState<any>({
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
            "name",
            "save",
      ]
      }) 
        const [grouparray55d38, setgrouparray55d38 ] = React.useState<any>({}) 
    const [grouparray55d38Props, setgrouparray55d38Props ] = React.useState<any>({
      validation:false,

      length:3,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "textinput",
      ]
      }) 
        const [grouparray55d38_0, setgrouparray55d38_0 ] = React.useState<any>({}) 
    const [grouparray55d38_0Props, setgrouparray55d38_0Props ] = React.useState<any>({
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
        const [grouparray55d38_1, setgrouparray55d38_1 ] = React.useState<any>({}) 
    const [grouparray55d38_1Props, setgrouparray55d38_1Props ] = React.useState<any>({
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
        const [grouparray55d38_2, setgrouparray55d38_2 ] = React.useState<any>({}) 
    const [grouparray55d38_2Props, setgrouparray55d38_2Props ] = React.useState<any>({
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
        const [group7fd3f, setgroup7fd3f ] = React.useState<any>({}) 
    const [group7fd3fProps, setgroup7fd3fProps ] = React.useState<any>({
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
            "approve",
      ]
      }) 
    
    const [tablecb5d6, settablecb5d6 ] = React.useState<any>([]) 
    const [tablecb5d6Props, settablecb5d6Props ] = React.useState<any>({
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
   const [buttona0ee1f,setbuttona0ee1f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [buttonbe1b8e,setbuttonbe1b8e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [buttonc177ba,setbuttonc177ba] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [buttond0665e,setbuttond0665e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [value9087e,setvalue9087e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [switch63dd1,setswitch63dd1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textinput123292f1,settextinput123292f1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [buttoncc181d5,setbuttoncc181d5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [buttonbb596df,setbuttonbb596df] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [buttonaaf8012,setbuttonaaf8012] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dateandtimef72a6,setdateandtimef72a6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [datepickerb9ae2,setdatepickerb9ae2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dropdown16aa0,setdropdown16aa0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textinput1f103,settextinput1f103] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [name31e2e,setname31e2e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [hh6c7c1,sethh6c7c1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [routee4686,setroutee4686] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [rrrrb3f0c,setrrrrb3f0c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [xcvxvxce4e1f,setxcvxvxce4e1f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [buttondfgdf29503,setbuttondfgdf29503] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [buttondsdfsd487f1,setbuttondsdfsd487f1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [country0bab5,setcountry0bab5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [city886d7,setcity886d7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [lock00a31,setlock00a31] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [otherdetails9c51d,setotherdetails9c51d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [ddd73ecf,setddd73ecf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [text23423bb984,settext23423bb984] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [text234245d6a,settext234245d6a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [combobox1231f35a2,setcombobox1231f35a2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [text54509a93,settext54509a93] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [datepicker123acd53,setdatepicker123acd53] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [text1231c2aa3,settext1231c2aa3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dropdown4af30,setdropdown4af30] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [comboboxa2ee09,setcomboboxa2ee09] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dateandtime26c68,setdateandtime26c68] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [buttonba9c0,setbuttonba9c0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textinputaee10,settextinputaee10] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [comboboxb9056e,setcomboboxb9056e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [comboboxccfb84,setcomboboxccfb84] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textinput12354a98,settextinput12354a98] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [datepicker0e91e,setdatepicker0e91e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [advancesearch6c997,setadvancesearch6c997] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dateandtimeb3eda,setdateandtimeb3eda] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [country38670,setcountry38670] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [statef29da,setstatef29da] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [button62ae4,setbutton62ae4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textinput55664,settextinput55664] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textinputd0435,settextinputd0435] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textinput5daae3,settextinput5daae3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dateandtimec481e,setdateandtimec481e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [datepicker019ca,setdatepicker019ca] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textinput165d1d,settextinput165d1d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textinput204f11,settextinput204f11] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textinput38ac83,settextinput38ac83] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textinput455cca,settextinput455cca] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [country3b817,setcountry3b817] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [my_id84e54,setmy_id84e54] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [save12f95,setsave12f95] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textinputa3fbc,settextinputa3fbc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [username0985a,setusername0985a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [approvec8dd3,setapprovec8dd3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [user_id8eaea,setuser_id8eaea] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [name36041,setname36041] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
    ///////////
    const [refresh, setRefresh] = React.useState<Record<string, boolean>>({       buttonbuttona0ee1f:false,
       buttonbuttonbe1b8e:false,
       buttonbuttonc177ba:false,
       buttonbuttond0665e:false,
       textinputvalue9087e:false,
       switchswitch63dd1:false,
       textinputtextinput123292f1:false,
       buttonbuttoncc181d5:false,
       buttonbuttonbb596df:false,
       buttonbuttonaaf8012:false,
       dateandtimedateandtimef72a6:false,
       datepickerdatepickerb9ae2:false,
       dropdowndropdown16aa0:false,
       textinputtextinput1f103:false,
       columnname31e2e:false,
       buttonhh6c7c1:false,
       buttonroutee4686:false,
       buttonrrrrb3f0c:false,
       buttonxcvxvxce4e1f:false,
       buttonbuttondfgdf29503:false,
       buttonbuttondsdfsd487f1:false,
       columncountry0bab5:false,
       columncity886d7:false,
       buttonlock00a31:false,
       columnotherdetails9c51d:false,
       buttonddd73ecf:false,
       texttext23423bb984:false,
       texttext234245d6a:false,
       comboboxcombobox1231f35a2:false,
       texttext54509a93:false,
       datepickerdatepicker123acd53:false,
       texttext1231c2aa3:false,
       dropdowndropdown4af30:false,
       comboboxcomboboxa2ee09:false,
       dateandtimedateandtime26c68:false,
       buttonbuttonba9c0:false,
       textinputtextinputaee10:false,
       comboboxcomboboxb9056e:false,
       comboboxcomboboxccfb84:false,
       textinputtextinput12354a98:false,
       datepickerdatepicker0e91e:false,
       advancesearchadvancesearch6c997:false,
       dateandtimedateandtimeb3eda:false,
       columncountry38670:false,
       columnstatef29da:false,
       buttonbutton62ae4:false,
       textinputtextinput55664:false,
       textinputtextinputd0435:false,
       textinputtextinput5daae3:false,
       dateandtimedateandtimec481e:false,
       datepickerdatepicker019ca:false,
       textinputtextinput165d1d:false,
       textinputtextinput204f11:false,
       textinputtextinput38ac83:false,
       textinputtextinput455cca:false,
       textinputcountry3b817:false,
       textinputmy_id84e54:false,
       buttonsave12f95:false,
       textinputtextinputa3fbc:false,
       textinputusername0985a:false,
       buttonapprovec8dd3:false,
       columnuser_id8eaea:false,
       columnname36041:false,
       groupgrouped023:false,
       groupdynamicactionsc9120:false,
       groupdynamicactionsa32986:false,
       tabletable12312058a8:false,
       grouptab_group03bf3:false,
       grouptab_header_119fae:false,
       groupgggg721e2:false,
       grouptab_header_2d8952:false,
       groupxbxvvcv42015:false,
       groupgroup123488888:false,
       tablestateaa824:false,
       groupgroupaaa97733:false,
       groupgroupc0c048:false,
       groupgroupd487a8:false,
       groupgroupb8f3d7:false,
       groupgroupf6bcb:false,
       tabletable7d435:false,
       groupgroup0e6f3:false,
       groupgroup0843e:false,
       groupgroup7f2ed:false,
       groupgroupe0568:false,
       grouparraygrouparray55d38:false,
       grouparraygrouparray55d38_0:false,
       grouparraygrouparray55d38_1:false,
       grouparraygrouparray55d38_2:false,
       groupgroup7fd3f:false,
       tabletablecb5d6:false,
      })

  ////// screen states 
  const [dynamicaction_v1,setdynamicaction_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [dynamicaction_v1Props,setdynamicaction_v1Props] = React.useState<any>({})
  const [comboboxcheck_v1,setcomboboxcheck_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [comboboxcheck_v1Props,setcomboboxcheck_v1Props] = React.useState<any>({})
  const [advancedsearch_v1,setadvancedsearch_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [advancedsearch_v1Props,setadvancedsearch_v1Props] = React.useState<any>({})
  const [sample_test_v1,setsample_test_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [sample_test_v1Props,setsample_test_v1Props] = React.useState<any>({})
  const [sample_test1_v1,setsample_test1_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [sample_test1_v1Props,setsample_test1_v1Props] = React.useState<any>({})
  const [ffff_v1,setffff_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [ffff_v1Props,setffff_v1Props] = React.useState<any>({})
  const [maker_v1,setmaker_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [maker_v1Props,setmaker_v1Props] = React.useState<any>({})
  const [checker_v1,setchecker_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [checker_v1Props,setchecker_v1Props] = React.useState<any>({})

///////// dfd
  const [dfd_country_code_dfd_v1Props,setdfd_country_code_dfd_v1Props] = React.useState<any>([])
  const [dfd_userdfd_v1Props,setdfd_userdfd_v1Props] = React.useState<any>([])
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
    setbuttona0ee1f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbuttonbe1b8e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbuttonc177ba(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbuttond0665e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvalue9087e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setswitch63dd1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextinput123292f1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbuttoncc181d5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbuttonbb596df(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbuttonaaf8012(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdateandtimef72a6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdatepickerb9ae2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdropdown16aa0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextinput1f103(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setname31e2e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    sethh6c7c1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setroutee4686(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrrrrb3f0c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setxcvxvxce4e1f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbuttondfgdf29503(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbuttondsdfsd487f1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcountry0bab5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcity886d7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlock00a31(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setotherdetails9c51d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setddd73ecf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settext23423bb984(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settext234245d6a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcombobox1231f35a2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settext54509a93(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdatepicker123acd53(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settext1231c2aa3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdropdown4af30(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcomboboxa2ee09(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdateandtime26c68(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbuttonba9c0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextinputaee10(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcomboboxb9056e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcomboboxccfb84(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextinput12354a98(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdatepicker0e91e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadvancesearch6c997(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdateandtimeb3eda(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcountry38670(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatef29da(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbutton62ae4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextinput55664(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextinputd0435(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextinput5daae3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdateandtimec481e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdatepicker019ca(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextinput165d1d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextinput204f11(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextinput38ac83(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextinput455cca(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcountry3b817(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmy_id84e54(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsave12f95(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextinputa3fbc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setusername0985a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapprovec8dd3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuser_id8eaea(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setname36041(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
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
        grouped023, 
        setgrouped023,
        grouped023Props, 
        setgrouped023Props,
        dynamicactionsc9120, 
        setdynamicactionsc9120,
        dynamicactionsc9120Props, 
        setdynamicactionsc9120Props,
        dynamicactionsa32986, 
        setdynamicactionsa32986,
        dynamicactionsa32986Props, 
        setdynamicactionsa32986Props,
        table12312058a8, 
        settable12312058a8,
        table12312058a8Props, 
        settable12312058a8Props,
        tab_group03bf3, 
        settab_group03bf3,
        tab_group03bf3Props, 
        settab_group03bf3Props,
        tab_header_119fae, 
        settab_header_119fae,
        tab_header_119faeProps, 
        settab_header_119faeProps,
        gggg721e2, 
        setgggg721e2,
        gggg721e2Props, 
        setgggg721e2Props,
        tab_header_2d8952, 
        settab_header_2d8952,
        tab_header_2d8952Props, 
        settab_header_2d8952Props,
        xbxvvcv42015, 
        setxbxvvcv42015,
        xbxvvcv42015Props, 
        setxbxvvcv42015Props,
        group123488888, 
        setgroup123488888,
        group123488888Props, 
        setgroup123488888Props,
        stateaa824, 
        setstateaa824,
        stateaa824Props, 
        setstateaa824Props,
        groupaaa97733, 
        setgroupaaa97733,
        groupaaa97733Props, 
        setgroupaaa97733Props,
        groupc0c048, 
        setgroupc0c048,
        groupc0c048Props, 
        setgroupc0c048Props,
        groupd487a8, 
        setgroupd487a8,
        groupd487a8Props, 
        setgroupd487a8Props,
        groupb8f3d7, 
        setgroupb8f3d7,
        groupb8f3d7Props, 
        setgroupb8f3d7Props,
        groupf6bcb, 
        setgroupf6bcb,
        groupf6bcbProps, 
        setgroupf6bcbProps,
        table7d435, 
        settable7d435,
        table7d435Props, 
        settable7d435Props,
        group0e6f3, 
        setgroup0e6f3,
        group0e6f3Props, 
        setgroup0e6f3Props,
        group0843e, 
        setgroup0843e,
        group0843eProps, 
        setgroup0843eProps,
        group7f2ed, 
        setgroup7f2ed,
        group7f2edProps, 
        setgroup7f2edProps,
        groupe0568, 
        setgroupe0568,
        groupe0568Props, 
        setgroupe0568Props,
        grouparray55d38, 
        setgrouparray55d38,
        grouparray55d38Props, 
        setgrouparray55d38Props,
        grouparray55d38_0, 
        setgrouparray55d38_0,
        grouparray55d38_0Props, 
        setgrouparray55d38_0Props,
        grouparray55d38_1, 
        setgrouparray55d38_1,
        grouparray55d38_1Props, 
        setgrouparray55d38_1Props,
        grouparray55d38_2, 
        setgrouparray55d38_2,
        grouparray55d38_2Props, 
        setgrouparray55d38_2Props,
        group7fd3f, 
        setgroup7fd3f,
        group7fd3fProps, 
        setgroup7fd3fProps,
        tablecb5d6, 
        settablecb5d6,
        tablecb5d6Props, 
        settablecb5d6Props,
        buttona0ee1f,
        setbuttona0ee1f, 
        buttonbe1b8e,
        setbuttonbe1b8e, 
        buttonc177ba,
        setbuttonc177ba, 
        buttond0665e,
        setbuttond0665e, 
        value9087e,
        setvalue9087e, 
        switch63dd1,
        setswitch63dd1, 
        textinput123292f1,
        settextinput123292f1, 
        buttoncc181d5,
        setbuttoncc181d5, 
        buttonbb596df,
        setbuttonbb596df, 
        buttonaaf8012,
        setbuttonaaf8012, 
        dateandtimef72a6,
        setdateandtimef72a6, 
        datepickerb9ae2,
        setdatepickerb9ae2, 
        dropdown16aa0,
        setdropdown16aa0, 
        textinput1f103,
        settextinput1f103, 
        name31e2e,
        setname31e2e, 
        hh6c7c1,
        sethh6c7c1, 
        routee4686,
        setroutee4686, 
        rrrrb3f0c,
        setrrrrb3f0c, 
        xcvxvxce4e1f,
        setxcvxvxce4e1f, 
        buttondfgdf29503,
        setbuttondfgdf29503, 
        buttondsdfsd487f1,
        setbuttondsdfsd487f1, 
        country0bab5,
        setcountry0bab5, 
        city886d7,
        setcity886d7, 
        lock00a31,
        setlock00a31, 
        otherdetails9c51d,
        setotherdetails9c51d, 
        ddd73ecf,
        setddd73ecf, 
        text23423bb984,
        settext23423bb984, 
        text234245d6a,
        settext234245d6a, 
        combobox1231f35a2,
        setcombobox1231f35a2, 
        text54509a93,
        settext54509a93, 
        datepicker123acd53,
        setdatepicker123acd53, 
        text1231c2aa3,
        settext1231c2aa3, 
        dropdown4af30,
        setdropdown4af30, 
        comboboxa2ee09,
        setcomboboxa2ee09, 
        dateandtime26c68,
        setdateandtime26c68, 
        buttonba9c0,
        setbuttonba9c0, 
        textinputaee10,
        settextinputaee10, 
        comboboxb9056e,
        setcomboboxb9056e, 
        comboboxccfb84,
        setcomboboxccfb84, 
        textinput12354a98,
        settextinput12354a98, 
        datepicker0e91e,
        setdatepicker0e91e, 
        advancesearch6c997,
        setadvancesearch6c997, 
        dateandtimeb3eda,
        setdateandtimeb3eda, 
        country38670,
        setcountry38670, 
        statef29da,
        setstatef29da, 
        button62ae4,
        setbutton62ae4, 
        textinput55664,
        settextinput55664, 
        textinputd0435,
        settextinputd0435, 
        textinput5daae3,
        settextinput5daae3, 
        dateandtimec481e,
        setdateandtimec481e, 
        datepicker019ca,
        setdatepicker019ca, 
        textinput165d1d,
        settextinput165d1d, 
        textinput204f11,
        settextinput204f11, 
        textinput38ac83,
        settextinput38ac83, 
        textinput455cca,
        settextinput455cca, 
        country3b817,
        setcountry3b817, 
        my_id84e54,
        setmy_id84e54, 
        save12f95,
        setsave12f95, 
        textinputa3fbc,
        settextinputa3fbc, 
        username0985a,
        setusername0985a, 
        approvec8dd3,
        setapprovec8dd3, 
        user_id8eaea,
        setuser_id8eaea, 
        name36041,
        setname36041, 
        ////// screen states 
          dynamicaction_v1,
          setdynamicaction_v1,
          dynamicaction_v1Props,
          setdynamicaction_v1Props,
          comboboxcheck_v1,
          setcomboboxcheck_v1,
          comboboxcheck_v1Props,
          setcomboboxcheck_v1Props,
          advancedsearch_v1,
          setadvancedsearch_v1,
          advancedsearch_v1Props,
          setadvancedsearch_v1Props,
          sample_test_v1,
          setsample_test_v1,
          sample_test_v1Props,
          setsample_test_v1Props,
          sample_test1_v1,
          setsample_test1_v1,
          sample_test1_v1Props,
          setsample_test1_v1Props,
          ffff_v1,
          setffff_v1,
          ffff_v1Props,
          setffff_v1Props,
          maker_v1,
          setmaker_v1,
          maker_v1Props,
          setmaker_v1Props,
          checker_v1,
          setchecker_v1,
          checker_v1Props,
          setchecker_v1Props,
        //////////

        ///////// dfd
        dfd_country_code_dfd_v1Props,
        setdfd_country_code_dfd_v1Props,
        dfd_userdfd_v1Props,
        setdfd_userdfd_v1Props,
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