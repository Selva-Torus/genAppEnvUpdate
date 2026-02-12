export function getRouteScreenDetails(key: string, artfactName: string): string {
  let assemblerKeys: any = [
  {
    "screenName": "user home screen",
    "screensName": "user_home_screen-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_User:AFVK:v1"
  },
  {
    "screenName": "manager home screen",
    "screensName": "manager_home_screen-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1"
  },
  {
    "screenName": "user daily expense",
    "screensName": "user_daily_expense-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Daily_Expense_User_Table:AFVK:v1"
  },
  {
    "screenName": "user offsite expense",
    "screensName": "user_offsite_expense-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Offsite_Expense_User_Table:AFVK:v1"
  },
  {
    "screenName": "manager daily expense",
    "screensName": "manager_daily_expense-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Daily_Expense_Manager_Table:AFVK:v1"
  },
  {
    "screenName": "manager offsite expense",
    "screensName": "manager_offsite_expense-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Offsite_Expense_Manager_Table:AFVK:v1"
  },
  {
    "screenName": "report",
    "screensName": "report-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Report:AFVK:v1"
  }
]

  let routeScreen: string = artfactName

  assemblerKeys.forEach((item: any) => {
    if (item.ufKey == key) {
      routeScreen = item.screensName.replace('-v','_v')
    }
  })

  return routeScreen
}

export function getFilterProps(filterProps:any=[],mainData:any={}) {
  let result:any = [];  
  filterProps.map((dfdData:any)=>{
    dfdData.nodeBasedData.map((nodes:any)=>{
      let filterObj=nodes?.object||{}
      Object.keys(nodes?.object).map((keys)=>{
        filterObj[keys]=mainData[filterObj[keys]] || ""
      })
      result.push({
      DFDkey:dfdData.key,
      nodeId:nodes.nodeId,
      ...filterObj
    })
    }) 
  })
  return result;
}

