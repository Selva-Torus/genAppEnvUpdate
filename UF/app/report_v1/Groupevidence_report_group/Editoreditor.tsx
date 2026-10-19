
'use client'
import axios from 'axios';
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { getMapperDetailsDto, te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import { Pagination } from '@/components/Pagination';
import { useGlobal } from '@/context/GlobalContext'
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import { DocumentViewer } from "react-documents";
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

  
export default function Editoreditor({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagCompData, isFormOpen,controlData}: any){
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { token } = useGlobal();
  const {dfd_report_v1Props, setdfd_report_v1Props} = useContext(TotalContext) as TotalContextProps; 
   function filtetKeyname(str = '', filterString = '') {
    return str?.replace(filterString, '')
  }
  const [paginationData, setPaginationData] = React.useState({
    page: 1,
    pageSize: 1,
    total: 0
  });
  const [orchestrationDataMapper, setorchestrationDataMapper] = React.useState([]);

  function getValueByPath(obj: any, path: string) {
    return path
      .split('.')
      .reduce(
        (acc: { [x: string]: any }, key: string | number) => acc?.[key],
        obj
      )
  }
  function setValueByPath(obj: any, path: string, value: any) {
    const keys = path.split('.')
    let current = obj
    keys.forEach((key: string | number, index: number) => {
      if (index === keys.length - 1) {
        current[key] = value
      } else {
        if (!current[key] || typeof current[key] !== 'object') {
          current[key] = {}
        }
        current = current[key]
      }
    })
  }
  async function getMapperDetails(){
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
      "e533b2e79a06484484c6906969ee2f8d",
      "e952872f7b004625bdc92d0075b4dba0"
    );
    if(orchestrationData?.data?.mapper?.length > 0){
      setorchestrationDataMapper(orchestrationData?.data?.mapper);
      let filteredata:any=[];
      if (dfd_report_v1Props.length >0) {
      dfd_report_v1Props?.map((items:any)=>{
        let temp:any={}
        orchestrationData?.data?.mapper?.map((mapItem:any)=>{
          let sourceKey = mapItem?.sourceKey?.split('|').at(-1)
          sourceKey = filtetKeyname(sourceKey, 'items.properties.')
          sourceKey = filtetKeyname(sourceKey, 'properties.')
          let targetKey = mapItem?.targetKey?.split('|').at(-1)
          targetKey = filtetKeyname(targetKey, 'items.properties.')
          targetKey = filtetKeyname(targetKey, 'properties.')
          sourceKey=sourceKey.replaceAll("properties.","")
          targetKey=targetKey.replaceAll("properties.","")
          const value = getValueByPath(items, sourceKey)
          setValueByPath(temp, targetKey, value)
        })
        filteredata.push(temp)
      })
      if(filteredata?.length>0){
        fetchReport(filteredata[0])
      }
    }
    }
  }


  const handleUpdate = (data: { page: number; pageSize: number }) => {
    const { page, pageSize } = data;
    setPaginationData(prevState => ({ ...prevState, page, pageSize }));
    if(orchestrationDataMapper?.length > 0){
      let filteredata:any=[];
      if (dfd_report_v1Props.length >0) {
        dfd_report_v1Props?.map((items:any)=>{
          let temp:any={}
          orchestrationDataMapper?.map((mapItem:any)=>{
            let sourceKey = mapItem?.sourceKey?.split('|').at(-1)
            sourceKey = filtetKeyname(sourceKey, 'items.properties.')
            sourceKey = filtetKeyname(sourceKey, 'properties.')
            let targetKey = mapItem?.targetKey?.split('|').at(-1)
            targetKey = filtetKeyname(targetKey, 'items.properties.')
            targetKey = filtetKeyname(targetKey, 'properties.')
            sourceKey=sourceKey.replaceAll("properties.","")
            targetKey=targetKey.replaceAll("properties.","")
            const value = getValueByPath(items, sourceKey)
            setValueByPath(temp, targetKey, value)
          })
          filteredata.push(temp)
        })
      }

      fetchReport(filteredata[page - 1])
    }
  }

  const fetchReport = async (templadteData:any) => {
    let postData: any = {
        template: {
          content: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>AI Passport</title>
    <style>
        :root {
            --surface: #EDEFF2;
            --panel: #fff;
            --sunk: #F5F7F9;
            --rule: #D2D8DE;
            --rule2: #AEB8C2;
            --ink: #1B2229;
            --muted: #5C6773;
            --faint: #8A949E;
            --petrol: #14425F;
            --petrol-l: #E4EDF3;
            --t1: #A2321E
        }

        * {
            box-sizing: border-box
        }

        body {
            margin: 0;
            padding: 16px;
            background: var(--surface);
            color: var(--ink);
            font: 14px/1.5 "IBM Plex Sans", Arial, sans-serif
        }

        .mono {
            font-family: "IBM Plex Mono", Consolas, monospace
        }

        .passport,
        .panel {
            background: var(--panel);
            border: 1px solid var(--rule2);
            border-radius: 2px;
            margin-bottom: 16px
        }

        .band {
            background: #0D2E43;
            border-bottom: 3px solid var(--t1);
            color: #fff;
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            gap: 16px;
            flex-wrap: wrap
        }

        .name {
            font-size: 19px;
            font-weight: 600
        }

        .code {
            font-size: 12px;
            color: #A9C1D0;
            margin-top: 3px
        }

        .seal {
            text-align: right;
            font-size: 12px;
            color: #C8D5DC;
            border-left: 1px solid #45606f;
            padding-left: 20px
        }

        .seal b {
            display: block;
            font-size: 14px;
            color: #fff
        }

        .fields {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            border-top: 1px solid var(--rule)
        }

        .field {
            padding: 11px 16px;
            border-right: 1px solid var(--rule);
            border-bottom: 1px solid var(--rule)
        }

        .field:nth-child(4n) {
            border-right: none
        }

        .field .l {
            font-size: 11px;
            color: var(--faint);
            margin-bottom: 3px
        }

        .field .v {
            font-size: 13.5px;
            font-weight: 500
        }

        .mrz {
            background: var(--sunk);
            padding: 10px 16px;
            font-size: 11px;
            color: #36576a;
            overflow-x: auto;
            white-space: nowrap
        }

        .body {
            padding: 16px
        }

        .sec {
            margin-bottom: 26px
        }

        .sec-h {
            background: #102d3e;
            border-left: 3px solid #ff5f5f;
            color: #fff;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            height: 40px;
            margin-bottom: 14px
        }

        .sec-n {
            width: 22px;
            height: 22px;
            margin: 0 10px 0 14px;
            border-radius: 50%;
            background: #fff;
            color: #102d3e;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px
        }

        .g2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px
        }

        .blk {
            margin-bottom: 18px;
            min-width: 0
        }

        h3 {
            font-size: 13px;
            margin: 0 0 9px;
            font-weight: 600
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px
        }

        td,
        th {
            padding: 8px 10px;
            border-bottom: 1px solid var(--rule);
            text-align: left;
            vertical-align: top
        }

        th {
            background: var(--sunk);
            font-size: 11.5px;
            color: var(--muted);
            font-weight: 600;
            white-space: nowrap
        }

        td.k {
            color: var(--muted);
            width: 42%
        }

        td.e {
            color: var(--faint)
        }

        .scroll {
            overflow-x: auto
        }

        .callout {
            border-left: 3px solid var(--petrol);
            background: var(--petrol-l);
            padding: 11px 14px;
            font-size: 12.5px
        }

        @media(max-width:900px) {
            .fields {
                grid-template-columns: 1fr 1fr
            }

            .field:nth-child(4n) {
                border-right: 1px solid var(--rule)
            }

            .field:nth-child(2n) {
                border-right: none
            }

            .g2 {
                grid-template-columns: 1fr
            }
        }

        @media(max-width:560px) {
            .fields {
                grid-template-columns: 1fr
            }

            .field {
                border-right: none !important
            }
        }
    </style>
</head>

<body>
    <!-- All values are {{column_alias}} placeholders. Repeating groups (tables) have one template row; repeat it per record. -->

    <div class="passport">
        <div class="band">
            <div>
                <div class="name">{{asset_name}}</div>
                <div class="code mono">{{asset_code}} · {{asset_type_code}} · {{business_unit_name}}</div>
            </div>
            <div class="seal"><b>{{cert_status_code}}</b>{{risk_tier_code}}<br>Expires {{cert_expiry_date}}</div>
        </div>
        <div class="fields">
            <div class="field">
                <div class="l">Business owner</div>
                <div class="v">{{business_owner_name}}</div>
            </div>
            <div class="field">
                <div class="l">Technical owner</div>
                <div class="v">{{technical_owner_name}}</div>
            </div>
            <div class="field">
                <div class="l">Vendor</div>
                <div class="v">{{vendor_name}}</div>
            </div>
            <div class="field">
                <div class="l">Hosting</div>
                <div class="v">{{hosting_location}}</div>
            </div>
            <div class="field">
                <div class="l">Use case</div>
                <div class="v">{{use_case_code}}</div>
            </div>
            <div class="field">
                <div class="l">Risk tier</div>
                <div class="v">{{risk_tier_code}}, derived by <span class="mono"
                        style="font-size:12px">{{rule_code}}</span></div>
            </div>
            <div class="field">
                <div class="l">Agent authority</div>
                <div class="v">{{authority_level_code}}</div>
            </div>
            <div class="field">
                <div class="l">Kill switch</div>
                <div class="v">{{kill_switch_state_code}}</div>
            </div>
            <div class="field">
                <div class="l">Data handled</div>
                <div class="v">{{data_class_code}}</div>
            </div>
            <div class="field">
                <div class="l">Automated decision</div>
                <div class="v">{{is_automated_decision}}</div>
            </div>
            <div class="field">
                <div class="l">Live since</div>
                <div class="v">{{go_live_date}}</div>
            </div>
            <div class="field">
                <div class="l">Passport version</div>
                <div class="v">{{current_version_no}} <span style="font-size:11px;color:var(--faint)">of
                        {{version_total}}</span></div>
            </div>
        </div>
        <div class="mrz mono">{{passport_line}}</div>
    </div>

    <div class="panel">
        <div class="body">
            <div class="sec">
                <div class="sec-h"><span class="sec-n">1</span>Identity</div>
                <div class="g2">
                    <div>
                        <div class="blk">
                            <h3>Asset</h3>
                            <table>
                                <tr>
                                    <td class="k">Ai asset id</td>
                                    <td>{{ai_asset_id}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Asset details</td>
                                    <td>{{asset_details}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Asset code</td>
                                    <td>{{asset_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Asset name</td>
                                    <td>{{asset_name}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Asset type code</td>
                                    <td>{{asset_type_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Short description</td>
                                    <td>{{short_description}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Lifecycle status code</td>
                                    <td>{{lifecycle_status_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Asset is active</td>
                                    <td>{{asset_is_active}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Is third party</td>
                                    <td>{{is_third_party}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Current version no</td>
                                    <td>{{current_version_no}}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="blk">
                            <br>
                            <br>
                            <br>
                            <h3>Registration</h3>
                            <table>
                                <tr>
                                    <td class="k">Business unit id</td>
                                    <td>{{business_unit_id}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Business unit name</td>
                                    <td>{{business_unit_name}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Discovery source code</td>
                                    <td>{{discovery_source_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Integration source id</td>
                                    <td>{{integration_source_id}}</td>
                                </tr>
                                <tr>
                                    <td class="k">External reference</td>
                                    <td>{{external_reference}}</td>
                                </tr>
                                <tr>
                                    <td class="k">First discovered on</td>
                                    <td>{{first_discovered_on}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Last seen on</td>
                                    <td>{{last_seen_on}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Go live date</td>
                                    <td>{{go_live_date}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Retirement date</td>
                                    <td>{{retirement_date}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div class="blk">
                            <h3>Accountability</h3>
                            <table>
                                <tr>
                                    <td class="k">Business owner id</td>
                                    <td>{{business_owner_id}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Business owner name</td>
                                    <td>{{business_owner_name}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Business owner job title</td>
                                    <td>{{business_owner_job_title}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Technical owner id</td>
                                    <td>{{technical_owner_id}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Technical owner name</td>
                                    <td>{{technical_owner_name}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Technical owner job title</td>
                                    <td>{{technical_owner_job_title}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Vendor name</td>
                                    <td>{{vendor_name}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Hosting location</td>
                                    <td>{{hosting_location}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Current certification id</td>
                                    <td>{{current_certification_id}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Cert expiry date</td>
                                    <td>{{cert_expiry_date}}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="blk">
                            <h3>Business purpose</h3>
                            <div class="callout">{{business_purpose}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sec">
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <div class="sec-h"><span class="sec-n">2</span>Purpose and risk</div>
                <div class="g2">
                    <div>
                        <div class="blk">
                            <h3>Purpose</h3>
                            <table>
                                <tr>
                                    <td class="k">Use case code</td>
                                    <td>{{use_case_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Criticality code</td>
                                    <td>{{criticality_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Is customer facing</td>
                                    <td>{{is_customer_facing}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Is automated decision</td>
                                    <td>{{is_automated_decision}}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="blk">
                            <h3>Risk classification</h3>
                            <table>
                                <tr>
                                    <td class="k">Risk tier code</td>
                                    <td>{{risk_tier_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Risk tier source</td>
                                    <td>{{risk_tier_source}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Rule code</td>
                                    <td>{{rule_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Assessment type</td>
                                    <td>{{assessment_type}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Assessed on</td>
                                    <td>{{assessed_on}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div class="blk">
                            <h3>Tier assessment</h3>
                            <table>
                                <tr>
                                    <td class="k">Tier assessment id</td>
                                    <td>{{tier_assessment_id}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Assessed tier code</td>
                                    <td>{{assessed_tier_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Previous tier code</td>
                                    <td>{{previous_tier_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Matched rule id</td>
                                    <td>{{matched_rule_id}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Justification</td>
                                    <td>{{justification}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Approved by user id</td>
                                    <td>{{approved_by_user_id}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Evaluation trace</td>
                                    <td>{{evaluation_trace}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Assessed by</td>
                                    <td>{{assessed_by}}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="blk">
                            <h3>Risk rule</h3>
                            <table>
                                <tr>
                                    <td class="k">Risk rule id</td>
                                    <td>{{risk_rule_id}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Rule name</td>
                                    <td>{{rule_name}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Risk rule description</td>
                                    <td>{{risk_rule_description}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Result tier code</td>
                                    <td>{{result_tier_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Priority order</td>
                                    <td>{{priority_order}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Match mode</td>
                                    <td>{{match_mode}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Rule effective from</td>
                                    <td>{{rule_effective_from}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Rule effective to</td>
                                    <td>{{rule_effective_to}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Risk rule is active</td>
                                    <td>{{risk_rule_is_active}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sec">
                <div class="sec-h"><span class="sec-n">3</span>Models and data</div>
                <div class="g2">
                    <div>
                        <div class="blk">
                            <h3>Data classification</h3>
                            <table>
                                <tr>
                                    <td class="k">Asset data class id</td>
                                    <td>{{asset_data_class_id}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Data class code</td>
                                    <td>{{data_class_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Is primary</td>
                                    <td>{{is_primary}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Data class notes</td>
                                    <td>{{data_class_notes}}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="blk">
                            <h3>Grounding</h3>
                            <table>
                                <tr>
                                    <td class="k">Grounding source</td>
                                    <td>{{grounding_source}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Uses rag</td>
                                    <td>{{uses_rag}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Vector store name</td>
                                    <td>{{vector_store_name}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div class="blk">
                            <h3>Validation</h3>
                            <table>
                                <tr>
                                    <td class="k">Last validated on</td>
                                    <td>{{last_validated_on}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Next validation due</td>
                                    <td>{{next_validation_due}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="blk">
                    <h3>Models</h3>
                    <div class="scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>Asset model id</th>
                                    <th>Model name</th>
                                    <th>Model family code</th>
                                    <th>Model version</th>
                                    <th>Model provider</th>
                                    <th>Training source</th>
                                    <th>Model is active</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{asset_model_id}}</td>
                                    <td>{{model_name}}</td>
                                    <td>{{model_family_code}}</td>
                                    <td>{{model_version}}</td>
                                    <td>{{model_provider}}</td>
                                    <td>{{training_source}}</td>
                                    <td>{{model_is_active}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="sec">
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <div class="sec-h"><span class="sec-n">4</span>Access and agent controls</div>
                <div class="g2">
                    <div>
                        <div class="blk">
                            <h3>Authority and oversight</h3>
                            <table>
                                <tr>
                                    <td class="k">Agent control id</td>
                                    <td>{{agent_control_id}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Authority level code</td>
                                    <td>{{authority_level_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Requires human approval</td>
                                    <td>{{requires_human_approval}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Approval threshold amt</td>
                                    <td>{{approval_threshold_amt}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Approval threshold ccy</td>
                                    <td>{{approval_threshold_ccy}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Max actions per day</td>
                                    <td>{{max_actions_per_day}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Kill switch state code</td>
                                    <td>{{kill_switch_state_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Kill switch updated by</td>
                                    <td>{{kill_switch_updated_by}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Kill switch updated on</td>
                                    <td>{{kill_switch_updated_on}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Segregation notes</td>
                                    <td>{{segregation_notes}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Agent control is active</td>
                                    <td>{{agent_control_is_active}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div class="blk">
                            <h3>Identity</h3>
                            <table>
                                <tr>
                                    <td class="k">Agent identity ref</td>
                                    <td>{{agent_identity_ref}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Identity provider</td>
                                    <td>{{identity_provider}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="blk">
                    <h3>Tool permissions</h3>
                    <div class="scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>Agent action id</th>
                                    <th>Action name</th>
                                    <th>Target system</th>
                                    <th>Tool or api</th>
                                    <th>Limit description</th>
                                    <th>Is permitted</th>
                                    <th>Is high risk</th>
                                    <th>Approval required</th>
                                    <th>Agent action is active</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{agent_action_id}}</td>
                                    <td>{{action_name}}</td>
                                    <td>{{target_system}}</td>
                                    <td>{{tool_or_api}}</td>
                                    <td>{{limit_description}}</td>
                                    <td>{{is_permitted}}</td>
                                    <td>{{is_high_risk}}</td>
                                    <td>{{approval_required}}</td>
                                    <td>{{agent_action_is_active}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="sec">
                <div class="sec-h"><span class="sec-n">5</span>Certification</div>
                <div class="g2">
                    <div>
                        <div class="blk">
                            <h3>Certification</h3>
                            <table>
                                <tr>
                                    <td class="k">Certification id</td>
                                    <td>{{certification_id}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Cert code</td>
                                    <td>{{cert_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Cert status code</td>
                                    <td>{{cert_status_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Tier at initiation</td>
                                    <td>{{tier_at_initiation}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Effective date</td>
                                    <td>{{effective_date}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Expiry date</td>
                                    <td>{{expiry_date}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Initiated by user id</td>
                                    <td>{{initiated_by_user_id}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Initiated on</td>
                                    <td>{{initiated_on}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Completed on</td>
                                    <td>{{completed_on}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Is recertification</td>
                                    <td>{{is_recertification}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Supersedes cert id</td>
                                    <td>{{supersedes_cert_id}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Current stage seq</td>
                                    <td>{{current_stage_seq}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Overall decision</td>
                                    <td>{{overall_decision}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Certification is active</td>
                                    <td>{{certification_is_active}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div class="blk">
                            <h3>Template</h3>
                            <table>
                                <tr>
                                    <td class="k">Cert template id</td>
                                    <td>{{cert_template_id}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Template code</td>
                                    <td>{{template_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Template name</td>
                                    <td>{{template_name}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Applies tier code</td>
                                    <td>{{applies_tier_code}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Applies use case</td>
                                    <td>{{applies_use_case}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Applies asset type</td>
                                    <td>{{applies_asset_type}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Validity months</td>
                                    <td>{{validity_months}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Template version</td>
                                    <td>{{template_version}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Template effective from</td>
                                    <td>{{template_effective_from}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Template effective to</td>
                                    <td>{{template_effective_to}}</td>
                                </tr>
                                <tr>
                                    <td class="k">Template is active</td>
                                    <td>{{template_is_active}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="blk">
                    <h3>Stage decisions</h3>
                    <div class="scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>Cert stage id</th>
                                    <th>Stage sequence</th>
                                    <th>Stage type code</th>
                                    <th>Stage name</th>
                                    <th>Assigned role id</th>
                                    <th>Assigned user id</th>
                                    <th>Stage status code</th>
                                    <th>Decision code</th>
                                    <th>Decision comment</th>
                                    <th>Decided by user id</th>
                                    <th>Decided on</th>
                                    <th>Opened on</th>
                                    <th>Due on</th>
                                    <th>Evidence count</th>
                                    <th>Certification stage is active</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{cert_stage_id}}</td>
                                    <td>{{stage_sequence}}</td>
                                    <td>{{stage_type_code}}</td>
                                    <td>{{stage_name}}</td>
                                    <td>{{assigned_role_id}}</td>
                                    <td>{{assigned_user_id}}</td>
                                    <td>{{stage_status_code}}</td>
                                    <td>{{decision_code}}</td>
                                    <td>{{decision_comment}}</td>
                                    <td>{{decided_by_user_id}}</td>
                                    <td>{{decided_on}}</td>
                                    <td>{{opened_on}}</td>
                                    <td>{{due_on}}</td>
                                    <td>{{evidence_count}}</td>
                                    <td>{{certification_stage_is_active}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="sec">
                <br>
                <br>
                <br>

                <div class="sec-h"><span class="sec-n">6</span>Evidence</div>
                <div class="blk">
                    <h3>Evidence attached</h3>
                    <div class="scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>Evidence id</th>
                                    <th>Evidence title</th>
                                    <th>Evidence type code</th>
                                    <th>Owner entity</th>
                                    <th>Owner id</th>
                                    <th>Evidence description</th>
                                    <th>File name</th>
                                    <th>File mime type</th>
                                    <th>File size bytes</th>
                                    <th>Storage reference</th>
                                    <th>File hash sha256</th>
                                    <th>External url</th>
                                    <th>Uploaded by user id</th>
                                    <th>Uploaded on</th>
                                    <th>Evidence is active</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{evidence_id}}</td>
                                    <td>{{evidence_title}}</td>
                                    <td>{{evidence_type_code}}</td>
                                    <td>{{owner_entity}}</td>
                                    <td>{{owner_id}}</td>
                                    <td>{{evidence_description}}</td>
                                    <td>{{file_name}}</td>
                                    <td>{{file_mime_type}}</td>
                                    <td>{{file_size_bytes}}</td>
                                    <td>{{storage_reference}}</td>
                                    <td>{{file_hash_sha256}}</td>
                                    <td>{{external_url}}</td>
                                    <td>{{uploaded_by_user_id}}</td>
                                    <td>{{uploaded_on}}</td>
                                    <td>{{evidence_is_active}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="blk">
                    <h3>Evidence exports</h3>
                    <div class="scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>Export id</th>
                                    <th>Export code</th>
                                    <th>Export format code</th>
                                    <th>As at timestamp</th>
                                    <th>Sections included</th>
                                    <th>Requested by user id</th>
                                    <th>Requested on</th>
                                    <th>Export completed on</th>
                                    <th>Export status code</th>
                                    <th>Export storage reference</th>
                                    <th>Export file hash sha256</th>
                                    <th>Page count</th>
                                    <th>Purpose note</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{export_id}}</td>
                                    <td>{{export_code}}</td>
                                    <td>{{export_format_code}}</td>
                                    <td>{{as_at_timestamp}}</td>
                                    <td>{{sections_included}}</td>
                                    <td>{{requested_by_user_id}}</td>
                                    <td>{{requested_on}}</td>
                                    <td>{{export_completed_on}}</td>
                                    <td>{{export_status_code}}</td>
                                    <td>{{export_storage_reference}}</td>
                                    <td>{{export_file_hash_sha256}}</td>
                                    <td>{{page_count}}</td>
                                    <td>{{purpose_note}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="sec">
                <div class="sec-h"><span class="sec-n">7</span>Dependencies</div>
                <div class="blk">
                    <h3>Upstream and downstream</h3>
                    <div class="scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>Dependency id</th>
                                    <th>Direction</th>
                                    <th>Dependency name</th>
                                    <th>Dependency type code</th>
                                    <th>Related asset id</th>
                                    <th>Is critical</th>
                                    <th>Dependency notes</th>
                                    <th>Dependency is active</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{dependency_id}}</td>
                                    <td>{{direction}}</td>
                                    <td>{{dependency_name}}</td>
                                    <td>{{dependency_type_code}}</td>
                                    <td>{{related_asset_id}}</td>
                                    <td>{{is_critical}}</td>
                                    <td>{{dependency_notes}}</td>
                                    <td>{{dependency_is_active}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="sec">
                <div class="sec-h"><span class="sec-n">8</span>Change history</div>
                <div class="blk">
                    <h3>Passport versions</h3>
                    <div class="scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>Asset version id</th>
                                    <th>Version no</th>
                                    <th>Valid from</th>
                                    <th>Valid to</th>
                                    <th>Change type code</th>
                                    <th>Change reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{asset_version_id}}</td>
                                    <td>{{version_no}}</td>
                                    <td>{{valid_from}}</td>
                                    <td>{{valid_to}}</td>
                                    <td>{{change_type_code}}</td>
                                    <td>{{change_reason}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="sec">
                <div class="sec-h"><span class="sec-n">9</span>Audit</div>
                <div class="blk">
                    <h3>Audit events</h3>
                    <div class="scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>Audit event id</th>
                                    <th>Event timestamp</th>
                                    <th>Event type code</th>
                                    <th>Entity name</th>
                                    <th>Entity id</th>
                                    <th>Actor user id</th>
                                    <th>Actor login</th>
                                    <th>Actor role code</th>
                                    <th>Action summary</th>
                                    <th>Old value json</th>
                                    <th>New value json</th>
                                    <th>Source ip</th>
                                    <th>Session ref</th>
                                    <th>Correlation ref</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{audit_event_id}}</td>
                                    <td>{{event_timestamp}}</td>
                                    <td>{{event_type_code}}</td>
                                    <td>{{entity_name}}</td>
                                    <td>{{entity_id}}</td>
                                    <td>{{actor_user_id}}</td>
                                    <td>{{actor_login}}</td>
                                    <td>{{actor_role_code}}</td>
                                    <td>{{action_summary}}</td>
                                    <td>{{old_value_json}}</td>
                                    <td>{{new_value_json}}</td>
                                    <td>{{source_ip}}</td>
                                    <td>{{session_ref}}</td>
                                    <td>{{correlation_ref}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>

</html>`,
        engine: 'handlebars',
        recipe: 'chrome-pdf',
      },
      data:templadteData,
    };
    let reportData: any = await axios.post(
      'https://jsreport9x.toruslowcode.com/api/report',
      postData,
      {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const blob = new Blob([reportData.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);

  }

  useEffect(() => {
    getMapperDetails()
  }, [dfd_report_v1Props]);
  return (
    <div 
      //style={{gridColumn: `1 / 25`,gridRow: `1 / 160`, gap:``, height: `100%`, overflow: 'auto'}}
      className='w-full h-full'
      >
     
      {pdfUrl && dfd_report_v1Props.length >0 ? (
       <div className={`flex flex-col w-full h-full gap-3`}>
       <DocumentViewer
          url={pdfUrl}
          viewer='pdf'
          className='h-full w-full'
        />
        <Pagination
        className='flex w-full items-center justify-center'
        page={paginationData.page}
        pageSize={1}
        pageSizeOptions={[1]}
        total={dfd_report_v1Props.length}
        onUpdate={handleUpdate}
        //showInput={true}
        //size='s'
      />
        </div>
      ) : (
        <p></p>
      )}
    </div>
  )
}
