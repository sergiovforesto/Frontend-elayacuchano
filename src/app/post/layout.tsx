import { NavBar } from "@/components";

export default function PostLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="">
            <div className="sticky top-0 z-10">
                <div >
                    <NavBar />
                </div>
            </div>

            {children}
        </div>
    );
}