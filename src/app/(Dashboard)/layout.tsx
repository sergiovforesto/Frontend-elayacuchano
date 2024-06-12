import { DashboardSideBar, NavBar } from "@/components";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <NavBar />
            <div className="flex flex-col md:flex-row w-full">

                <div className="bg-white hidden md:block md:max-w-[325px] w-full h-svh border-x sticky top-0">
                    <DashboardSideBar />
                </div>

                <div className="w-full h-full">
                    {children}
                </div>
            </div>
        </>
    );
}