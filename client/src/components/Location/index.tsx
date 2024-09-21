import ComponentModal from "../ComponentModal";
import Circle from "../../assets/Green_circle.svg";
import LocationSvg from "../../assets/location.svg";

import styles from "./style.module.scss";
import { useScoresQuery } from "../../redux/api/home";
import { useLayoutEffect, useState } from "react";

const Location = () => {
  const [id, setId] = useState<null | string>(null);

  const { data, isLoading } = useScoresQuery(`${id}`, { skip: !id });

  useLayoutEffect(() => {
    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const id = searchParams.get("id");
      setId(id);
    };

    window.addEventListener("popstate", handlePopState);

    handlePopState();

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <ComponentModal
      title="Selected Location"
      svg={LocationSvg}
      width={170}
      height={230}
      isLoading={isLoading}
    >
      {!data ? (
        "Pick a point"
      ) : (
        <div className={styles.container}>
          <p>
            Intersection ID : <div>{data?.intersection_id}</div>
          </p>
          <p>
            Coordinates:
            <div>{data?.coordinates}</div>
          </p>
          <p>
            Condition:
            <div className={styles.container_live}>
              {data?.condition ? (
                <span>
                  <img src={Circle} alt="green" /> <span>Live</span>
                </span>
              ) : (
                <span>
                  <img src={Circle} alt="green" /> <span>Not live</span>
                </span>
              )}
            </div>
          </p>
        </div>
      )}
    </ComponentModal>
  );
};

export default Location;
