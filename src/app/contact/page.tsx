import { Footer, NavBar, SideBar } from "@/components";
import { IconBrandFacebook, IconBrandX, IconMail } from "@tabler/icons-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Contacto - El ayacuchano',
    description: 'Contacto - El ayacuchano',
    keywords: ['elayacuchano', 'atures', 'amazonas-venezuela']
}

export default function Contact() {
    return (
        <>

            <header className="sticky top-0 z-10">
                <div>
                    <NavBar />
                </div>
            </header>

            <div className="container gap-x-4 pt-10">

                <div>
                    <SideBar />
                </div>


                <div>
                    <div className="flex flex-col gap-y-7 items-center py-5">

                        <div className="bg-white border rounded-md px-7 py-10 max-w-[672px] w-full">
                            <h2 className="font-bold text-4xl text-neutral-900">Contacto</h2>



                            <div className="mt-7 text-gray-800 ">
                                <ul className="space-y-2">
                                    <li className="flex items-center space-x-2">
                                        <IconMail />
                                        <Link href={'#'} className="text-blue-600 underline">elayacuchano1@gmail.com</Link>
                                    </li>

                                    <li className="flex items-center space-x-2">
                                        <IconBrandX />
                                        <Link href={'https://twitter.com/elayacuchano1'} className="text-blue-600 underline">@elayacuchano1</Link>
                                    </li>

                                    <li className="flex items-center space-x-2">
                                        <IconBrandFacebook />
                                        <Link href={'https://www.facebook.com/ElAyacuchano1'} className="text-blue-600 underline">Facebook</Link>
                                    </li>

                                </ul>
                            </div>


                        </div>


                    </div>


                    <Footer />
                </div>
                {/* antes: hidden sm:block border" */}
                <div className="hidden">
                    sidebar
                </div>
            </div>


        </>
    )
}
