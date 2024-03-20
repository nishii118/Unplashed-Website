import { Route, Routes } from "react-router-dom"
import { SearchHome } from "./pages/SearchHome"
import { DetailsProduct } from "./pages/DetailsProduct"
import { useAppDispatch, useAppSelector } from "./store/hooks"
import { useEffect } from "react";
import { getPins } from "./store/userSlice";

function App() {
  const dispatch = useAppDispatch();
  const pinsStored = useAppSelector((state) => state.user.pins);
  useEffect(() => {
    dispatch(getPins());
  },[dispatch]);
  console.log(pinsStored);
  return (
    <div className="font-bevnpro">
      <Routes>
        <Route path="/" element = {<SearchHome/>}/>
        <Route path="/pin/:id" element = {<DetailsProduct />}/>
      </Routes>
    </div>
  )
}

export default App
