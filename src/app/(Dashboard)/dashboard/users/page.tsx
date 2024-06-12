import { UsersTable } from "@/components";
import { Suspense } from 'react';

interface Props {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default function DashboardUsers({ searchParams }: Props) {
    return (
        <div className='md:px-10 md:py-5'>
            <div className="border rounded-md bg-white p-5 text-gray-900">
                <div className="mb-5">
                    <h2 className="text-gray-900 font-bold text-3xl">
                        Usuarios
                    </h2>
                </div>

                <Suspense fallback={<p>LOADING..........</p>}>
                    <UsersTable searchParams={searchParams} />
                </Suspense>

            </div>
        </div>
    )
}
