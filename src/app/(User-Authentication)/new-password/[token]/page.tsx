import { titleAyacuchano } from "@/fonts/fonts";
import Link from "next/link";
import { NewPasswordForm } from "./ui/form-new-pass";
import { confirm_token } from "@/actions";
import { redirect } from "next/navigation";


interface Props {
    params: {
        token: string;
    }
}

export default async function NewPasswordByToken({ params }: Props) {
    const { token } = params

    const validToken = await confirm_token(token)

    if (!validToken.ok) {
        redirect('/login')
    }

    return (
        <section className="bg-gray-50 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link href={'/'} className={`${titleAyacuchano.className} font-bold text-2xl sm:text-3xl text-gray-900 mb-6`}>
                    El Ayacuchano
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                        <NewPasswordForm token={token} />
                    </div>
                </div>
            </div>
        </section>
    )
}
