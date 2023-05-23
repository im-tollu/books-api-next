export class TenantAlreadyRegistered extends Error {
    name: string = TenantAlreadyRegistered.name

    constructor(public email: string) {
        super(`Tenant already registered: ${email}`)
    }
}