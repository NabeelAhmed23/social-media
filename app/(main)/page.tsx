import { MainNewsFeed } from "@/components/main-newsfeed/main-newsfeed";
import { MainNewsfeedSidebar } from "@/components/main-newsfeed/main-newsfeed-sidebar";

export default function Home() {
  return (
    <main className="container px-12 mt-6">
      <div className="flex items-start gap-4">
        <MainNewsfeedSidebar />
        <MainNewsFeed />
        <div className="max-w-[380px] min-w-[300px] sticky top-24">
          Newsfeed Sidebar
        </div>
      </div>
    </main>
  );
}
