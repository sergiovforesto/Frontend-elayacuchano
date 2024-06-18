import { PostTable, SummaryStats } from "@/components";
import { Suspense } from 'react';
interface Props {
    searchParams: { [key: string]: string | string[] | undefined }
}
export default function Dashboard({ searchParams }: Props) {


    return (
        <div className='md:px-10 md:py-5'>
            <div className="border rounded-md bg-white p-5 text-gray-900">
                <div>
                    <h2 className="text-gray-900 font-bold text-3xl">
                        Dashboard
                    </h2>
                </div>

                <SummaryStats />



                <div className="mt-7 mb-3">
                    <h2 className="text-gray-900 font-bold text-xl">
                        Tus Posts
                    </h2>
                </div>

                <Suspense fallback={<p>LOADING..........</p>}>
                    <PostTable searchParams={searchParams} />
                </Suspense>


            </div>
        </div>
    )
}
