import { BlackBorderedSpace } from "../../BlackBorderedSpace";
import Pencil from "../../../assets/Pencil.svg";
import UploadPhoto from "../../../assets/conversation/upload.svg";

import styles from "./style.module.scss";

const Note = () => {
  return (
    <BlackBorderedSpace title="New Note" width={211} height={58}>
      <div className={styles.container}>
        <div className={styles.container_firstRow}>
          <div>Title</div>
          <img src={Pencil} alt="Pencil" width={16} height={16} />
        </div>
        <div className={styles.container_secondRow}>
          <div>Upload picture</div>
          <img src={UploadPhoto} alt="Upload Photo" width={16} height={16} />
        </div>
      </div>
    </BlackBorderedSpace>
  );
};

export default Note;
