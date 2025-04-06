import { useMemo } from "react";
// @ts-ignore
import Supercluster from "supercluster";

export function useClustering(points: any[], region: any, zoom: number) {
  const cluster = useMemo(() => {
    const supercluster = new Supercluster({
      radius: 60,
      maxZoom: 20,
    });

    const geoPoints = points.map((point) => ({
      type: "Feature",
      properties: { point },
      geometry: {
        type: "Point",
        coordinates: [point.longitude, point.latitude],
      },
    }));

    supercluster.load(geoPoints);

    const clusters = supercluster.getClusters(
      [
        region.longitude - region.longitudeDelta,
        region.latitude - region.latitudeDelta,
        region.longitude + region.longitudeDelta,
        region.latitude + region.latitudeDelta,
      ],
      zoom
    );

    return { clusters, supercluster };
  }, [points, region, zoom]);

  return cluster;
}
