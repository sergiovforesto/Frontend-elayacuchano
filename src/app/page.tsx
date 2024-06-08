export const revalidate = 0
import { NavBar, SideBar } from "@/components";
import LatestPosts from "@/components/posts/latest-posts";

export default async function Home() {


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


        <main className="space-y-7">
          <LatestPosts />
        </main>
        {/* antes: hidden sm:block border" */}
        <div className="hidden">
          sidebar
        </div>
      </div>

      <footer className="mt-auto text-center py-5">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">© El ayacuchano. {new Date().getFullYear()}</p>
        </div>
      </footer>





    </>
  );
}
