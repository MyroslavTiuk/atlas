import ComponentModal from "../ComponentModal";

import styles from "./style.module.scss";
import StickChart from "../StickChart";
import { useScoresEventsMutation, useScoresQuery } from "../../redux/api/home";
import { useEffect, useLayoutEffect, useState } from "react";

const Scores = () => {
  const [id, setId] = useState<string | null>(null);

  const [scoresEvent, { isSuccess: successEvents }] = useScoresEventsMutation();
  const { data, isLoading } = useScoresQuery(`${id}`, {
    skip: !id && !successEvents,
  });

  useEffect(() => {
    if (id) {
      scoresEvent(`${id}`);
    }
  }, [id]);

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
      title="Scores"
      width={401}
      height={230}
      isLoading={isLoading}
      seeMore
    >
      {!data ? (
        "Pick a point"
      ) : (
        <div className={styles.container}>
          <StickChart
            title={data?.safety_scores?.[0].points}
            word1="Safety"
            word2="Score"
            colors={{
              red: data?.safety_scores?.[0].accident_rate,
              yellow: data?.safety_scores?.[0].near_misses,
              green: data?.safety_scores?.[0].speeding,
              purple: data?.safety_scores?.[0].traffic_violations,
              blue: data?.safety_scores?.[0].pedestrian_incidents,
              pink: data?.safety_scores?.[0].damaged_disabled_vehicle,
            }}
          />

          <StickChart
            title={data?.efficiency_scores?.[0].points}
            word1="Efficiency"
            word2="Score"
            colors={{
              red: data?.efficiency_scores?.[0].congestion_level,
              yellow: data?.efficiency_scores?.[0].average_traffic_speed,
              green: data?.efficiency_scores?.[0].traffic_volume,
              purple: data?.efficiency_scores?.[0].signal_timing_efficiency,
              blue: data?.efficiency_scores?.[0].pedestrian_wait_time,
              pink: data?.efficiency_scores?.[0].micro_mobility_wait_time,
            }}
          />
          <StickChart
            title={data.environmental_scores[0].points}
            word1="Environmental"
            word2="Score"
            colors={{
              red: data?.environmental_scores?.[0].vehicle_emissions,
              yellow: data?.environmental_scores?.[0].fuel_consumption,
              green: data?.environmental_scores?.[0].noise_pollution,
              purple: data?.environmental_scores?.[0].air_quality_index,
              blue: data?.environmental_scores?.[0].driving_conditions,
              pink: data?.environmental_scores?.[0].fire_detection,
            }}
          />
          <StickChart title="C+" word1="Cost" word2="Score" />
        </div>
      )}
    </ComponentModal>
  );
};

export default Scores;
