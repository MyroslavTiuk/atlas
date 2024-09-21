import {
  FormControl,
  InputBase,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { BlackBorderedSpace } from "../../../BlackBorderedSpace";
import CameraImage from "../../../../assets/Cameras_picture.png";

import styles from "./style.module.scss";

type Props = {
  title: string;
  notifications: number;
  total: string;
};

const CustomInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#1C1333",
    border: "1px solid #3A2E59",
    fontSize: 10,
    textAlign: "start",
    color: "white",
    height: "24px",
    padding: "0 26px 0 12px",
  },
  "& .MuiSvgIcon-root": {
    color: "white",
  },
}));

const CustomSelect = styled(Select)(() => ({
  "& .MuiSelect-icon": {
    color: "white",
  },
}));

const CameraItem = ({ notifications, title, total }: Props) => {
  return (
    <BlackBorderedSpace title={title} paddingTop={true} seeMore>
      <div className={styles.container}>
        <FormControl fullWidth>
          <CustomSelect
            hiddenLabel
            defaultValue={"All intersection"}
            input={<CustomInput />}
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: "#1C1333",
                  color: "white",
                },
              },
            }}
          >
            <MenuItem value="All intersection">All intersection</MenuItem>
          </CustomSelect>
        </FormControl>
        <img src={CameraImage} alt="camera" />
        <div className={styles.container_notifications}>
          <div className={styles.container_notifications_number}>
            {notifications}
          </div>
          <div className={styles.container_notifications_text}>
            Total {total}
          </div>
        </div>
      </div>
    </BlackBorderedSpace>
  );
};

export default CameraItem;
