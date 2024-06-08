import { titleAyacuchano } from "@/fonts/fonts"
import Link from "next/link"
import { ForgotPasswordForm } from "./ui/form-forgot-pass"

export default function ForgotPassword() {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link href={'/'} className={`${titleAyacuchano.className} font-bold text-2xl sm:text-3xl text-gray-900 mb-6`}>
                    El Ayacuchano
                </Link>
                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">

                    <ForgotPasswordForm />
                </div>
            </div>
        </section>
    )
}
