import UOmapperData from '@/context/dfdmapperContolnames.json'


export function getRouteScreenDetails(key: string, artfactName: string,other:string=''): string {
  let assemblerKeys: any = [
  {
    "screenName": "menu item 3",
    "screensName": "menu_item_3-v1",
    "ufKey": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:ad_search_table:AFVK:v1"
  },
  {
    "screenName": "barchart",
    "screensName": "barchart-v1",
    "ufKey": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:chart:AFVK:v1"
  },
  {
    "screenName": "grouparray",
    "screensName": "grouparray-v1",
    "ufKey": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:GroupArray:AFVK:v1"
  },
  {
    "screenName": "request form",
    "screensName": "request_form-v1",
    "ufKey": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:Request_form:AFVK:v1"
  },
  {
    "screenName": "table",
    "screensName": "table-v1",
    "ufKey": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:Table:AFVK:v1"
  },
  {
    "screenName": "set table",
    "screensName": "set_table-v1",
    "ufKey": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:set_memory_table:AFVK:v1"
  },
  {
    "screenName": "combodrop",
    "screensName": "combodrop-v1",
    "ufKey": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:combo_dropdown:AFVK:v1"
  },
  {
    "screenName": "set_memory",
    "screensName": "set_memory-v1",
    "ufKey": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:setMemoryValuesevent:AFVK:v1"
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

