import { titleAyacuchano } from "@/fonts/fonts"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex justify-center items-center mx-auto size-full mt-16">
            <div>

                <header className="mb-auto flex justify-center z-50 w-full py-4">
                    <nav className="px-4 sm:px-6 lg:px-8" aria-label="Global">
                        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <span className={`${titleAyacuchano.className} font-semibold text-3xl`}>El Ayacuchano</span>
                        </Link>
                    </nav>
                </header>

                <main>
                    <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
                        <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white">404</h1>
                        <p className="mt-3 text-gray-600">Oops, Algo salió mal. Lo sentimos,</p>
                        <p className="text-gray-600">no pudimos encontrar su página.</p>
                        <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                            <Link
                                href={'/'}
                                className="text-white bg-blue-600 font-medium px-4 py-2 text-sm rounded-md"
                            >
                                Regresar
                            </Link>
                        </div>
                    </div>
                </main>
            </div>


        </div>
    )
}