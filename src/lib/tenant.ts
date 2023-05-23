import { z } from "zod"
import { PrismaClient, Prisma } from "@prisma/client";
import { TenantAlreadyRegistered } from "./errors";

export const addTenantCommandSchema = z.object({
    email: z.string().email()
})

export type AddTenantCommand = z.infer<typeof addTenantCommandSchema>

export interface NewTenant {
    email: string
}

export const tenantSchema = z.object({
    id: z.number().int(),
    email: z.string().email()
})

export type Tenant = z.infer<typeof tenantSchema>

export interface TenantGateway {
    addTenant: (newTenant: NewTenant) => Promise<Tenant>
}

export class DbAddTenantGateway implements TenantGateway {
    constructor(
        private db: PrismaClient
    ) { }

    addTenant = async (newTenant: NewTenant): Promise<Tenant> => {
        try {
            const insertedTenant = await this.db.dbTenant.create({
                data: {
                    email: newTenant.email
                }
            })

            return tenantSchema.parse(insertedTenant)
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
                throw new TenantAlreadyRegistered(newTenant.email)
            }
            throw (err)
        }
    }
}
