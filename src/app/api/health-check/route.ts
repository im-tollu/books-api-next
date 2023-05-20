import { handleErrors as handleApiResponse } from "@/apiUtils/responseHandler"

class MyError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export async function GET() {
    return handleApiResponse(handler)
}

export const revalidate = 0

async function handler() {
    // throw new MyError('Testing error handling in Next.js')

    return {
        at: new Date().toISOString()
    }
}