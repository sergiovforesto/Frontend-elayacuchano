'use client'

import { get_summary_stats } from "@/actions";
import { useAuthSession } from "@/store/auth_session";
import { useEffect, useState } from "react";

interface Summary {
    ok?: boolean,
    totalPost: number,
    totalComments: number,
    totalLikes: number
}


export const SummaryStats = () => {

    const [summary, setSummary] = useState<Summary>()
    const session = useAuthSession(state => state.session_user)
    let error = ''

    useEffect(() => {
        const getSummary = async () => {

            if (!session) return
            const resume = await get_summary_stats(session)

            if (!resume.ok) {
                error = 'Error al obterner datos'
                return
            }
            setSummary(resume)

        }

        getSummary()
    }, [])

    return (


        <>
            {summary === undefined ? (
                <div className="grid grid-rows-3 gap-y-3 md:grid-rows-1 md:grid-cols-3 md:gap-y-0 gap-x-3 mt-5 animate-pulse">
                    <div className="border rounded-xl px-4 py-3">
                        <div>
                            <p className="bg-gray-200 p-4 w-full rounded-full"></p>
                            <span className="bg-gray-200 p-3 block w-2/6 rounded-full mt-2"></span>
                        </div>
                    </div>

                    <div className="border rounded-xl px-4 py-3">
                        <div>
                            <p className="bg-gray-200 p-4 w-full rounded-full"></p>
                            <span className="bg-gray-200 p-3 block w-2/6 rounded-full mt-2"></span>
                        </div>
                    </div>

                    <div className="border rounded-xl px-4 py-3">
                        <div>
                            <p className="bg-gray-200 p-4 w-full rounded-full"></p>
                            <span className="bg-gray-200 p-3 block w-2/6 rounded-full mt-2"></span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-rows-3 gap-y-3 md:grid-rows-1 md:grid-cols-3 md:gap-y-0 gap-x-3 mt-5">
                    <div className="border rounded-xl px-4 py-3">
                        <div>
                            <p className="font-bold text-xl">{summary?.totalPost}</p>
                            <span className="text-sm">Total Post</span>
                        </div>
                    </div>

                    <div className="border rounded-xl px-4 py-3">
                        <div>
                            <p className="font-bold text-xl">{summary?.totalLikes}</p>
                            <span className="text-sm">Total Reacciones</span>
                        </div>
                    </div>

                    <div className="border rounded-xl px-4 py-3">
                        <div>
                            <p className="font-bold text-xl">{summary?.totalComments}</p>
                            <span className="text-sm">Total Comentarios</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

