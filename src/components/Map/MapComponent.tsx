import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { fromLonLat, toLonLat } from "ol/proj";
import { Box } from "@mui/material";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Icon, Text, Stroke } from "ol/style";
import { setCoordinatesAtom, Task } from "../../atoms/atoms";
import { useAtom } from "jotai";

interface OpenLayersMapProps {
  formMode: boolean;
  task?: Task;        
  mapPage: boolean;
}

const OpenLayersMap: React.FC<OpenLayersMapProps> = ({
  formMode,
  task,
  mapPage,
}) => {
  const [, setCords] = useAtom(setCoordinatesAtom);
  const mapDivRef = useRef<HTMLDivElement>(null);
  const [olMap, setOlMap] = useState<Map>();

  const formStyle = {
    width: "100%",
    height: "125px",
    borderRadius: "8px",
    overflow: "hidden",
  };

  const pageStyle = {
    position: "absolute",
    top: 0,
    bottom: "0px",
    left: 0,
    width: "100%",
  };

  useEffect(() => {
    if (!mapDivRef.current) return;

    const rasterLayer = new TileLayer({
      source: new OSM(),
    });

    const markerSource = new VectorSource();
    const markerLayer = new VectorLayer({
      source: markerSource,
    });

    const center = task?.coordinates
      ? fromLonLat([task.coordinates.longitude, task.coordinates.latitude])
      : fromLonLat([34.7999968, 32.083333]); 

    const map = new Map({
      target: mapDivRef.current as HTMLDivElement,
      layers: [rasterLayer, markerLayer],
      view: new View({
        center,
        zoom: 10,
      }),
    });

    setOlMap(map);

    const markerFeature = new Feature({
      geometry: task?.coordinates
        ? new Point(fromLonLat([task.coordinates.longitude, task.coordinates.latitude]))
        : new Point(fromLonLat([0, 0])),
      name: task ? task.name : "",
    });

    markerFeature.setStyle(
      new Style({
        image: new Icon({
          src: "src/img/duckIcon.png",
          anchor: [0.5, 1],
          scale: 0.1,
        }),
        text: new Text({
          text: markerFeature.get("name"),
          stroke: new Stroke({ color: "#fff", width: 2 }),
          font: "bold 14px Arial",
        }),
      })
    );
    markerSource.addFeature(markerFeature);

    if (typeof window !== "undefined") {
      (window as any).__OL_DEBUG__ = {
        map,
        markerFeature,
        getZoom: () => map.getView().getZoom(),
        getMarkerCoords: () => markerFeature.getGeometry()?.getCoordinates(),
      };
    }

    if (formMode) {
      map.on("click", (event) => {
        const coordinates = toLonLat(event.coordinate);
        setCords(coordinates);
        markerFeature.setGeometry(new Point(event.coordinate));
      });
    }

    return () => map.setTarget(undefined);
  }, [formMode, setCords, task]);

  return <Box data-test="task-map" ref={mapDivRef} sx={formMode ? formStyle : pageStyle} />;
};

export default OpenLayersMap;
