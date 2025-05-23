import { Navbar } from "@/app-features/eshop/components/navbar";
import { NavbarSidebar } from "@/app-features/eshop/components/navbar-sidebar";
import { SearchFilter } from "@/app-features/eshop/features/products/components/search-filters";
import PrefetchData from "./prefetch-data";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PrefetchData>
      <div>
        <Navbar />
        <SearchFilter />
        {children}
      </div>
    </PrefetchData>
  );
}
