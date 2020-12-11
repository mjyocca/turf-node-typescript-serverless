import * as turf from '@turf/turf';
import { FeatureCollection, Point } from '@turf/turf';

interface ClusterResult {
    points: Point[],
    meta: {
        [key: string]: number
    },
}

export function clusterPoints(data) {
    const pointCollection = getPointsForCluster(data);
    const clusterOpts = { numberOfClusters: 3 };
    const clustered = turf.clustersKmeans(pointCollection, clusterOpts);
    const result = aggregateClusers(clustered);
    return result;
}


function getPointsForCluster(data): FeatureCollection<Point> {
    return turf.featureCollection(data.map((p) => {
        const { name, Latitude, Longitude } = p;
        return turf.point([Latitude, Longitude], { name });
    }))
}

function aggregateClusers(clustered): ClusterResult {
    const { features } = clustered;
    return features.reduce((acc, { geometry, properties: { cluster, name } } ) => {
        const { meta } = acc;
        if (meta[cluster]) {
            meta[cluster].count++;
        } else {
            meta[cluster] = { count: 1 };
        }
        acc.points.push({ name, geometry, cluster });
        return acc;
    }, { points: [], meta: {} });
}
