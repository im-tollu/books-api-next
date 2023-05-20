import { NextResponse } from "next/server"

type ApiHandler = () => Promise<object> | object

export async function handleErrors(handler: ApiHandler): Promise<NextResponse> {
    try {
        let result = handler()
        if (result instanceof Promise) {
            result = await result
        }

        return NextResponse.json({
            success: true,
            result
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    success: false,
                    result: {
                        message: error.message
                    }
                },
                {
                    status: 500,
                }
            )
        } else {
            throw error
        }
    }
}