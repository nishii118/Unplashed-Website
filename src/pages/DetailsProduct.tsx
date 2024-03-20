import { useParams } from "react-router-dom";
// import { Button } from "../components/Button";
import { Button } from "@mui/material";
import { Header } from "../components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AlbumnComponent } from "../components/DetailsProduct/Albumn";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCollections } from "../store/userSlice";
import { useEffect, useState } from "react";
import { AddToCollectionDialog } from "../components/DetailsProduct/AddToCollectionDialog";

// interface DetailProduct {
//   image: string;
// }

export function DetailsProduct() {
  const dispatch = useAppDispatch();
  //get id from url
  const { id } = useParams();
  // console.log(id);

  //get photo list from store
  const photoList = useAppSelector((state) => state.photo.photoList);

  const pin = photoList.find((p) => p.id === id);
  console.log(pin);

  // dispatch(getCollections());
  useEffect(() => {
    dispatch(getCollections());
  }, [dispatch]);
  const collections = useSelector((state: RootState) => state.user.collections);
  console.log(collections);

  //isDisplayDialog
  const [isDisplayDialog, setIsDisplayDialog] = useState(false);

  if (!pin) {
    return <Header />;
  }
  return (
    <div className={`min-h-screen relative `}>
      <div
        className={`flex flex-col ${
          isDisplayDialog ? `opacity-75 bg-[#E5E7EBCC]` : `opacity-100`
        }`}
        onClick={() => {
          if (isDisplayDialog) setIsDisplayDialog(false);
        }}
      >
        <Header />
        <hr />
        <div className="flex flex-row py-20 px-72 gap-12 overflow-auto">
          <img
            src={pin?.urls.full || ""}
            alt="image"
            className="w-1/2 rounded-lg"
          />
          <div className="flex flex-col w-1/2 gap-5 ">
            <div className="flex flex-row items-center gap-3">
              <img
                src={pin?.user.profile_image.small || ""}
                alt=""
                className="rounded-full h-8 w-8 cursor-pointer"
              />
              <p className="font-bold cursor-pointer">{`${
                pin?.user.first_name || ""
              } ${pin?.user.last_name || ""}`}</p>
            </div>
            <p className="text-[12px]">{`Published on ${new Date(
              pin.created_at
            ).toLocaleDateString(undefined, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}`}</p>
            <div className="flex flex-row gap-4">
              <Button
                onClick={() => setIsDisplayDialog(!isDisplayDialog)}
                variant="text"
                className="text-[#6C727F] px-5 font-bold hover:text-[#121826] hover:bg-[#E5E7EBCC]  font-bevnpro"
              >
                Add to collections
              </Button>
              <Button
                variant="text"
                className="text-[#6C727F] px-5 font-bold hover:text-[#121826] hover:bg-[#E5E7EBCC]  font-bevnpro"
              >
                Download
              </Button>
            </div>
            <div className="flex flex-col gap-1 overflow-auto">
              <h1 className="text-[22px] font-bold pt-5">Collections</h1>
              {/* <Albumn/> */}
              {collections.map((albumn) => {
                if (pin.current_user_collections.includes(albumn.id)) {
                  return (
                    <AlbumnComponent
                      key={albumn.id}
                      {...albumn}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          isDisplayDialog ? `block` : `hidden`
        }`}
      >
        <AddToCollectionDialog />
      </div>
    </div>
  );
}
