import { useAppSelector } from "../../store/hooks";
import { SearchBar } from "../SearchBar";
import { AddAlbumnComponent } from "./AddAlbumnComponent";

export function AddToCollectionDialog() {
  const collections = useAppSelector ((state) => state.user.collections);
  return (
    <div className="flex flex-col gap-5 bg-[#ffffff] p-5 rounded-xl">
      <h1 className="text-2xl font-bold">Add to Collections</h1>
      <SearchBar/>
      <p className="text-[12px]">{` matches`}</p>
      <div className="flex flex-col">
        {collections.map((albumn) => (
          <AddAlbumnComponent {...albumn} />
        ))}
      </div>
    </div>
  )
}