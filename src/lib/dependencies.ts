import { PrismaClient } from '@prisma/client'
import { DbAddTenantGateway, TenantGateway } from './tenant'

export interface Dependencies {
    tenantGateway: TenantGateway
}

class DbDependencies implements Dependencies {
    prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    get tenantGateway(): TenantGateway {
        return new DbAddTenantGateway(this.prisma)
    }
}

export const dependencies = new DbDependencies()