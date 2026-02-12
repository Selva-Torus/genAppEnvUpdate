import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class Process_Fabric_For_ReimfastController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT003UFUFWAG001A001RequestScreenDailyv1CT003PFPFDAG001A001ProcessFabricForReimfastv1_b781f7340cc74a608278cc04b5c5d184_bb92a0e80a324d5c915b35603e4d507e111_RequestInitiated') 
        async CT003UFUFWAG001A001RequestScreenDailyv1CT003PFPFDAG001A001ProcessFabricForReimfastv1_b781f7340cc74a608278cc04b5c5d184_bb92a0e80a324d5c915b35603e4d507e111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWAG001A001RequestScreenOffsitev1CT003PFPFDAG001A001ProcessFabricForReimfastv1_b781f7340cc74a608278cc04b5c5d184_522000ac7e444a89a1ca65742ef5cae4111_RequestInitiated') 
        async CT003UFUFWAG001A001RequestScreenOffsitev1CT003PFPFDAG001A001ProcessFabricForReimfastv1_b781f7340cc74a608278cc04b5c5d184_522000ac7e444a89a1ca65742ef5cae4111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDAG001A001ProcessFabricForReimfastv1_aee807fbf8de4ac6bc5b2300f0523bb3_132fde95f173402fa219e829f07b8ae7_claimsformprocessed') 
        async CT003PFPFDAG001A001ProcessFabricForReimfastv1_aee807fbf8de4ac6bc5b2300f0523bb3_132fde95f173402fa219e829f07b8ae7_claimsformprocessed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDAG001A001ProcessFabricForReimfastv1_fb26c1b043bb45529b706cbfa30f9a01_d5sgj70a1y7g008ez510_claimssaveprocessed') 
        async CT003PFPFDAG001A001ProcessFabricForReimfastv1_fb26c1b043bb45529b706cbfa30f9a01_d5sgj70a1y7g008ez510_claimssaveprocessed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDAG001A001ProcessFabricForReimfastv1_80d0c627ebda42af87f0caa16f7972a6_d5shznya1y7g008ez780_daily_expense') 
        async CT003PFPFDAG001A001ProcessFabricForReimfastv1_80d0c627ebda42af87f0caa16f7972a6_d5shznya1y7g008ez780_daily_expense(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWAG001A001RequestScreenOffsitev1CT003PFPFDAG001A001ProcessFabricForReimfastv1_d34c2e439a9a40bb8d211e76527c02f0_d0c7d5b3ef0e4f5aba11c602ceff81431112_offsite_expense') 
        async CT003UFUFWAG001A001RequestScreenOffsitev1CT003PFPFDAG001A001ProcessFabricForReimfastv1_d34c2e439a9a40bb8d211e76527c02f0_d0c7d5b3ef0e4f5aba11c602ceff81431112_offsite_expense(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDAG001A001ProcessFabricForReimfastv1_5d3cb3e736544e25a379008a5e1fa6e5_d5shznya1y7g008ez790_claimsdetailformprocessed') 
        async CT003PFPFDAG001A001ProcessFabricForReimfastv1_5d3cb3e736544e25a379008a5e1fa6e5_d5shznya1y7g008ez790_claimsdetailformprocessed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDAG001A001ProcessFabricForReimfastv1_afe2c546ac7f48498e89217ec9f48110_d5shznya1y7g008ez79g_claimdetailsaveprocessed') 
        async CT003PFPFDAG001A001ProcessFabricForReimfastv1_afe2c546ac7f48498e89217ec9f48110_d5shznya1y7g008ez79g_claimdetailsaveprocessed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDAG001A001ProcessFabricForReimfastv1_0491dc2b1b08449cb4457747436a7ae5_d5shznya1y7g008ez7a0_updateamountprocessed') 
        async CT003PFPFDAG001A001ProcessFabricForReimfastv1_0491dc2b1b08449cb4457747436a7ae5_d5shznya1y7g008ez7a0_updateamountprocessed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDAG001A001ProcessFabricForReimfastv1_2e5337e050c84b50bc61314d9893d458_d5shznya1y7g008ez7ag_WaitingForApproval') 
        async CT003PFPFDAG001A001ProcessFabricForReimfastv1_2e5337e050c84b50bc61314d9893d458_d5shznya1y7g008ez7ag_WaitingForApproval(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWAG001A001DailyExpenseManagerTablev1CT003PFPFDAG001A001ProcessFabricForReimfastv1_f383279c59a6477f811c306b293051ef_4994c2faa28345cda1c200f42c54d3f0111_updatehrapprovalprocessed') 
        async CT003UFUFWAG001A001DailyExpenseManagerTablev1CT003PFPFDAG001A001ProcessFabricForReimfastv1_f383279c59a6477f811c306b293051ef_4994c2faa28345cda1c200f42c54d3f0111_updatehrapprovalprocessed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWAG001A001DailyExpenseManagerTablev1CT003PFPFDAG001A001ProcessFabricForReimfastv1_f383279c59a6477f811c306b293051ef_271c5940bad04144b9d17e8dfc0819e1111_updatehrapprovalprocessed') 
        async CT003UFUFWAG001A001DailyExpenseManagerTablev1CT003PFPFDAG001A001ProcessFabricForReimfastv1_f383279c59a6477f811c306b293051ef_271c5940bad04144b9d17e8dfc0819e1111_updatehrapprovalprocessed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWAG001A001OffsiteExpenseManagerTablev1CT003PFPFDAG001A001ProcessFabricForReimfastv1_f383279c59a6477f811c306b293051ef_30ccc2bd0e934f049e63731cd83e566a111_updatehrapprovalprocessed') 
        async CT003UFUFWAG001A001OffsiteExpenseManagerTablev1CT003PFPFDAG001A001ProcessFabricForReimfastv1_f383279c59a6477f811c306b293051ef_30ccc2bd0e934f049e63731cd83e566a111_updatehrapprovalprocessed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWAG001A001OffsiteExpenseManagerTablev1CT003PFPFDAG001A001ProcessFabricForReimfastv1_f383279c59a6477f811c306b293051ef_4c673f44f9da4729a67b9b3e7c95709e111_updatehrapprovalprocessed') 
        async CT003UFUFWAG001A001OffsiteExpenseManagerTablev1CT003PFPFDAG001A001ProcessFabricForReimfastv1_f383279c59a6477f811c306b293051ef_4c673f44f9da4729a67b9b3e7c95709e111_updatehrapprovalprocessed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWAG001A001ApprovalScreenDailyv1CT003PFPFDAG001A001ProcessFabricForReimfastv1_f383279c59a6477f811c306b293051ef_1a8d8b3319124f5f87f740c4bd628765111_updatehrapprovalprocessed') 
        async CT003UFUFWAG001A001ApprovalScreenDailyv1CT003PFPFDAG001A001ProcessFabricForReimfastv1_f383279c59a6477f811c306b293051ef_1a8d8b3319124f5f87f740c4bd628765111_updatehrapprovalprocessed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWAG001A001ApprovalScreenDailyv1CT003PFPFDAG001A001ProcessFabricForReimfastv1_f383279c59a6477f811c306b293051ef_18fd29f395e74dcb92e9a0d0e5a28a4c111_updatehrapprovalprocessed') 
        async CT003UFUFWAG001A001ApprovalScreenDailyv1CT003PFPFDAG001A001ProcessFabricForReimfastv1_f383279c59a6477f811c306b293051ef_18fd29f395e74dcb92e9a0d0e5a28a4c111_updatehrapprovalprocessed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWAG001A001ApprovalScreenOffsitev1CT003PFPFDAG001A001ProcessFabricForReimfastv1_f383279c59a6477f811c306b293051ef_4953fad632eb4cf2a806de7d667098ea111_updatehrapprovalprocessed') 
        async CT003UFUFWAG001A001ApprovalScreenOffsitev1CT003PFPFDAG001A001ProcessFabricForReimfastv1_f383279c59a6477f811c306b293051ef_4953fad632eb4cf2a806de7d667098ea111_updatehrapprovalprocessed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWAG001A001ApprovalScreenOffsitev1CT003PFPFDAG001A001ProcessFabricForReimfastv1_f383279c59a6477f811c306b293051ef_7adb497cc19543f99bbfc55627774228111_updatehrapprovalprocessed') 
        async CT003UFUFWAG001A001ApprovalScreenOffsitev1CT003PFPFDAG001A001ProcessFabricForReimfastv1_f383279c59a6477f811c306b293051ef_7adb497cc19543f99bbfc55627774228111_updatehrapprovalprocessed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDAG001A001ProcessFabricForReimfastv1_c34f31c272a74688a79cde4ee1214d94_d5shznya1y7g008ez7bg_hrapprovalprocessed') 
        async CT003PFPFDAG001A001ProcessFabricForReimfastv1_c34f31c272a74688a79cde4ee1214d94_d5shznya1y7g008ez7bg_hrapprovalprocessed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDAG001A001ProcessFabricForReimfastv1_eba0ebbf73d245bf83f56b9fd10a9448_d5shznya1y7g008ez7c0_Rejected') 
        async CT003PFPFDAG001A001ProcessFabricForReimfastv1_eba0ebbf73d245bf83f56b9fd10a9448_d5shznya1y7g008ez7c0_Rejected(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDAG001A001ProcessFabricForReimfastv1_170471fe247d4319bb07ff9e6cee7961_d5shznya1y7g008ez7cg_Approved') 
        async CT003PFPFDAG001A001ProcessFabricForReimfastv1_170471fe247d4319bb07ff9e6cee7961_d5shznya1y7g008ez7cg_Approved(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDAG001A001ProcessFabricForReimfastv1_9be18121c05f4209a081bf18a8be3423_d5shznya1y7g008ez7d0_finalupdateprocessed') 
        async CT003PFPFDAG001A001ProcessFabricForReimfastv1_9be18121c05f4209a081bf18a8be3423_d5shznya1y7g008ez7d0_finalupdateprocessed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDAG001A001ProcessFabricForReimfastv1_2c213d9e62644ac383d700d2923a87e3_d5shznya1y7g008ez7dg_updatestatusprocessed') 
        async CT003PFPFDAG001A001ProcessFabricForReimfastv1_2c213d9e62644ac383d700d2923a87e3_d5shznya1y7g008ez7dg_updatestatusprocessed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}