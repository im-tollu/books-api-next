import { handleErrors as handleApiResponse } from "@/apiUtils/responseHandler"
import { dependencies } from "@/lib/dependencies"
import { AddTenantCommand, Tenant, addTenantCommandSchema } from "@/lib/tenant"
import { NextRequest } from "next/server"
export async function POST(request: NextRequest) {
    return handleApiResponse(async () => {
        const json = await request.json()
        const command = addTenantCommandSchema.parse(json)
        const response = await handle(command)

        return response
    })
}

export const revalidate = 0

async function handle(command: AddTenantCommand): Promise<Tenant> {
    // throw new MyError('Testing error handling in Next.js')

    const gateway = dependencies.tenantGateway
    const tenant = await gateway.addTenant({
        email: command.email
    })

    return tenant
}