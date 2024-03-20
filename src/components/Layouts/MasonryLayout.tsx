import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useRef } from "react";
import { Photo, getMorePhotoList, getPhotoList } from "../../store/photoSlice";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import { ImageListItem } from "@mui/material";
import { addNewPin, userActions } from "../../store/userSlice";



export function MasonaryLayout() {
  const dispatch = useAppDispatch();

  const photoList = useSelector((state: RootState) => state.photo.photoList);
  const currentPage = useAppSelector(
    (state: RootState) => state.photo.currentPage
  );
  const query = useAppSelector((state: RootState) => state.photo.query);

  // const params = useParams();
  //get common photo list
  useEffect(() => {
    dispatch(getPhotoList());
  }, [dispatch]);

  // observer for infinite scroll
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // dispatch(getPhotoList());
          // console.log(currentPage);
          dispatch(getMorePhotoList({ page: currentPage, queryString: query }));
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, dispatch]);

  // console.log(photoList);
  return (
    <div className="p-5 md:p-12 ">
      <ImageList variant="masonry" cols={4} gap={10}>
        {photoList.map((photo: Photo) => (
          <ImageListItem >
            <Link to={`/pin/${photo.id}`} className="" >
              <img
                key={photo.id}
                src={photo.urls.small}
                alt={photo.alt_description}
                className="rounded-lg"
                loading="lazy"
                onClick={() => {
                  dispatch(userActions.setIsCheckedPin(photo));
                  dispatch(addNewPin(photo))
                }}
              />
            </Link>
          </ImageListItem>
        ))}
        <div ref={observerTarget}></div>
      </ImageList>
    </div>
  );
}
