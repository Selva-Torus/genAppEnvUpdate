import UOmapperData from '@/context/dfdmapperContolnames.json'


export function getRouteScreenDetails(key: string, artfactName: string,other:string=''): string {
  let assemblerKeys: any = [
  {
    "screenName": "user home screen",
    "screensName": "user_home_screen-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Dashboard_For_User:AFVK:v1"
  },
  {
    "screenName": "manager home screen",
    "screensName": "manager_home_screen-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Dashboard_For_Manager:AFVK:v1"
  },
  {
    "screenName": "user daily expense",
    "screensName": "user_daily_expense-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Daily_Expense_User_Table:AFVK:v1"
  },
  {
    "screenName": "user offsite expense",
    "screensName": "user_offsite_expense-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Offsite_Expense_User_Table:AFVK:v1"
  },
  {
    "screenName": "manager daily expense",
    "screensName": "manager_daily_expense-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Daily_Expense_Manager_Table:AFVK:v1"
  },
  {
    "screenName": "manager offsite expense",
    "screensName": "manager_offsite_expense-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Offsite_Expense_Manager_Table:AFVK:v1"
  },
  {
    "screenName": "report",
    "screensName": "report-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Report:AFVK:v1"
  }
]

  let routeScreen: string = artfactName
  let isKeyInAssem:boolean=false

  assemblerKeys.forEach((item: any) => {
    if (item.ufKey == key) {
      routeScreen = item.screensName.replace('-v','_v')
      isKeyInAssem=true
    }
  })
  if(other!=''&&isKeyInAssem==false)
  {
    return 'not in assembler'
  }

  return routeScreen
}

export function getFilterProps(filterProps:any=[],mainData:any={}) {
  let result:any = [];  
  try{
  filterProps?.map((dfdData:any)=>{
    dfdData?.nodeBasedData?.map((nodes:any)=>{
      let filterObj:any = {}
      Object.keys(nodes?.object||{}).map((keys:any)=>{
        const mapperEntry = nodes?.object[keys]
        const mapperData = (UOmapperData as Record<string, any>)[mapperEntry]
        if (!mapperData) return
        const value = mainData[mapperData["source"]]
        if (value !== undefined) filterObj[keys] = value
      })
      result.push({
      DFDkey:dfdData.key,
      nodeId:nodes.nodeId,
      ...filterObj
    })
    }) 
  })
  return result;
}catch(e){
  console.log(e);
}
}

