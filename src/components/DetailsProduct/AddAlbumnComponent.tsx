import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Albumn, addNewPin } from "../../store/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export function AddAlbumnComponent(props: Albumn) {
  const dispatch = useAppDispatch();
  // const isCheckedPin = useAppSelector((state) => state.user.isCheckedPin);
  // props.pins.push(isCheckedPin);
  return (
    <div
      // onClick={() => {
      //   dispatch(addNewPin({pin: props, name: props.id}))
      // }}
      className="relative group flex flex-row gap-3 p-3 rounded-lg justify-start items-center hover:bg-[#e0dede] transition-colors cursor-pointer"
    >
      <img
        src="https://images.unsplash.com/photo-1682772226815-e13ffc0a3bc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4NDI0NjU0Mg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
        alt="img"
        className="rounded-md h-16 w-16"
      />
      <div className="flex flex-col">
        <h1 className="text font-bold">{props.name}</h1>
        <p className="">{`${props.pins.length} photos`}</p>
      </div>
      <div className="absolute flex flex-row items-center gap-3 top-8 right-7 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
        <FontAwesomeIcon icon={faPlus} />
        <p className="text-[14px]">Add to Collections</p>
      </div>
    </div>
  );
}
