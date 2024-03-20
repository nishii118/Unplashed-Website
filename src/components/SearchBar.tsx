import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useAppDispatch } from "../store/hooks";
import { getPhotoListBySearch, photoActions } from "../store/photoSlice";
export function SearchBar() {
  const searchInput = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  return (
    <div className="relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchInput.current) {
            console.log(searchInput.current.value);
            dispatch(photoActions.setQuery(searchInput.current.value));
            dispatch(getPhotoListBySearch(searchInput.current.value));
          }
        }}
      >
        <input
          ref={searchInput}
          type="text"
          placeholder="Enter your keywords..."
          className="w-[300px] md:w-[600px] shadow-lg border px-3 py-4 rounded-lg"
        />
        <button type="submit">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute top-5 right-3 h-5 cursor-pointer"
          />
        </button>
      </form>
    </div>
  );
}
