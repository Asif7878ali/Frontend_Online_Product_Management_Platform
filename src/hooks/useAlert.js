import { showAlert } from "@/store/slices/alertSlice";
import { useDispatch } from "react-redux";

const useAlert = () => {
  const dispatch = useDispatch();

  const alert = (message, alertType) => {
    dispatch(
      showAlert({
        visible: true,
        message,
        alertType,
      }),
    );
  };

  return alert;
};

export default useAlert;
