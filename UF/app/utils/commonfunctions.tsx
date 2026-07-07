
'use client'
import { TotalContext, TotalContextProps } from "@/app/globalContext";
import { useContext } from "react";
export function normalToDynamicArrayCopyFormData(copiedData:any,type:any,state:any,setState:any=()=>{})
{

    if(type=='object')
    {
        setState({...state,...copiedData})
    }else{

    }
}

export function useHandleGroupArrayCopyFormData(){
    const AllStates:any = useContext(TotalContext) as TotalContextProps;
    return(copiedData:any,type:any,arraygroupName:any)=>{

        if(arraygroupName=="grouparray81c1a")
        {
            normalToDynamicArrayCopyFormData(copiedData,type,AllStates.grouparray81c1a_0,AllStates.setgrouparray81c1a_0)
            normalToDynamicArrayCopyFormData(copiedData,type,AllStates.grouparray81c1a_1,AllStates.setgrouparray81c1a_1)
            normalToDynamicArrayCopyFormData(copiedData,type,AllStates.grouparray81c1a_2,AllStates.setgrouparray81c1a_2)
            normalToDynamicArrayCopyFormData(copiedData,type,AllStates.grouparray81c1a_3,AllStates.setgrouparray81c1a_3)
            normalToDynamicArrayCopyFormData(copiedData,type,AllStates.grouparray81c1a_4,AllStates.setgrouparray81c1a_4)
            normalToDynamicArrayCopyFormData(copiedData,type,AllStates.grouparray81c1a_5,AllStates.setgrouparray81c1a_5)
            normalToDynamicArrayCopyFormData(copiedData,type,AllStates.grouparray81c1a_6,AllStates.setgrouparray81c1a_6)
        }
    }
}


export function flattenKeepInner(obj:any, result:any = {}) {
  for (let key in obj) {
    const value = obj[key];

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      result[key] = value; // keep the parent key
      flattenKeepInner(value, result); // also spread inner keys
    } else {
      result[key] = value;
    }
  }
  return result;
}