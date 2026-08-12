import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { assertAllowedOutboundHost } from 'src/utils/ssrf.util';

// The target here is a caller-configured URL (see assertAllowedOutboundHost),
// so a slow/hanging endpoint would otherwise occupy a worker slot for up to
// the full BullMQ lockDuration (120s in job.processor.ts) — see P8.
const OUTBOUND_TIMEOUT_MS = Number(process.env.SCHEDULER_HTTP_TIMEOUT_MS) || 15_000;

@Injectable()
export class HttpHandler {

    async execute(scheduledJob, payload){
        try {

            let apiUrl = scheduledJob.job_config.url
            let apiMethod = scheduledJob.job_config.method
            let apiParams = scheduledJob.job_config.params//headers

            payload = payload?.data || payload
            return await this.getDataFromTable(apiParams,apiMethod,apiUrl,payload)
            // if(apiMethod == 'POST'){
            //     let response = await axios.post(apiUrl,payload); //'http://192.168.2.96:5000/flow/externalApi'
            //     // console.log('response..',response);
            //     return response.data
            // }
        } catch (error) {
            console.log('ERROR',error);
            throw error
        }
    }

    async getDataFromTable(apiParams,method,url,data): Promise<any> {
        try {
            let response,axiosParams: any = { timeout: OUTBOUND_TIMEOUT_MS }

            if(apiParams?.path){
                url = url + '/' + apiParams.path
            }

            // Job configs are caller-supplied (sch_job_template/sch_scheduled_job),
            // so the target host must be allow-listed before this server fetches it
            // (SSRF) and a caller-declared Authorization header must never be
            // forwarded (token leakage/impersonation) — see security assessment P2.
            assertAllowedOutboundHost(url);

            if(apiParams?.query){
                axiosParams["params"] = apiParams?.query
            }

            // console.log('axiosParams',axiosParams);

            const requestConfig: AxiosRequestConfig = axiosParams

            if(method == 'GET'){
                response = await axios.get(url,requestConfig);
            }else if(method == 'POST' && data){
                response = await axios.post(url,data,requestConfig);
            }else if(method == 'PATCH' && data){
                response = await axios.patch(url,data,requestConfig);
            }
            if ([200,201,204].includes(response?.status) && response?.data) {
                return response?.data;
            }
        } catch (error) {
            throw error;
        }
    }
}