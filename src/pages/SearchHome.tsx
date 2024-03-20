import { Header } from "../components/Header";
import { MasonaryLayout } from "../components/Layouts/MasonryLayout";
import { SearchBar } from "../components/SearchBar";
// import { useAppSelector } from "../store/hooks";
export function SearchHome() {
  // const isLoading = useAppSelector((state) => state.photo.isLoadingPhotos);


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <hr className="shadow-xl"></hr>
      <div className="flex flex-col items-center my-10">
        <SearchBar />
        <MasonaryLayout/>
      </div>
    </div>
  );
}
