import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: 'Nosotros - El ayacuchano',
    description: 'Nosotros - El ayacuchano',
    keywords: ['nosotros', 'elayacuchano', 'atures', 'amazonas-venezuela']
}
import { Footer, NavBar, SideBar } from "@/components"

export default function AboutUs() {
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
                            <h2 className="font-bold text-4xl text-neutral-900">Nosotros</h2>

                            <div className="mt-7">

                                <header className="flex gap-x-3 items-center">
                                    <Image
                                        src={'/nelson-nosotros.jpg'}
                                        width={300}
                                        height={300}
                                        alt="Nelson photo"
                                        className="border border-gray-300 h-[200px] w-[200px] rounded-full object-cover"
                                    />

                                    <div>
                                        <p className="font-bold italic text-gray-900 md:text-xl">Editor y Fundador Nelson Ventura</p>
                                        <p className="font-semibold italic text-sm md:text-base text-gray-600">Fundado el 15 de mayo de 2016 en Puerto Ayacucho</p>

                                        <p className="font-light mt-1 italic text-sm md:text-base text-gray-900">La verdad por cualquier lado</p>

                                    </div>


                                </header>

                            </div>

                            <div className="mt-8">
                                <h2 className="font-bold text-lg text-neutral-900">Quienes Somos</h2>

                                <p className="text-wrap leading-6 mt-2">
                                    Medio de comunicación local que busca informar y comunicar a las comunidades y pueblos del estado Amazonas especialmente a los ciudadanos de su capital Puerto Ayacucho, con noticias e informaciones regionales y locales, especialmente en temática ambiental, cultural, histórica, derechos humanos, política y opinión
                                </p>
                            </div>



                            <div className="mt-8">
                                <h2 className="font-bold text-lg text-neutral-900">Cultura</h2>

                                <p className="text-wrap leading-6 mt-2">
                                    Visibilizar el ser humano de esta región, los protagonistas de la evolución local. El Ayacuchano promoverá en cada edición un hecho cultural, o un personaje, en secciones, columnas, entrevistas, reportajes que logren desarrollar este propósito. En especial promover la lectura, el arte, la poesía, la música entre otros géneros de la cultura.
                                </p>
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
