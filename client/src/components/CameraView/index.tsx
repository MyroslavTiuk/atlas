import ComponentModal from "../ComponentModal";
import Camera from "../../assets/camera_view.png";

const CameraView = () => {
  return (
    <ComponentModal title="View" padding={false} seeMore>
      <img src={Camera} alt="view" />
    </ComponentModal>
  );
};

export default CameraView;
