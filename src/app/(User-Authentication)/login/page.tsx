import { titleAyacuchano } from "@/fonts/fonts"
import Link from "next/link"
import { LoginForm } from "./ui/form-login"

export default function Login() {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link href={'/'} className={`${titleAyacuchano.className} font-bold text-2xl sm:text-3xl text-gray-900 mb-6`}>
                    El Ayacuchano
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Ingresa a tu cuenta
                        </h1>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </section>
    )
}
