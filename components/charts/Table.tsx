"use client"
import {
Table,
TableBody,
TableCaption,
TableCell,
TableFoot,
TableHead,
TableHeaderCell,
TableRoot,
TableRow,
} from "@/components/Table"
import { Button } from "../ui/button"
import { Workout } from "../providers/DataProvider"
import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Map, { Layer, LineLayerSpecification, MapRef, Marker, Source } from 'react-map-gl/mapbox';
import type {FeatureCollection} from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useUserPrefs } from "../providers/UserProviders"

export default function _Table({data}: {data : Workout[], openModal?: Workout, setOpenModal?: React.Dispatch<React.SetStateAction<Workout>>}) {
    const [openModal, setOpenModal] = useState<Workout|null>(null)
    const [center, setCenter] = useState<[number, number]>([0, 0])
    const leafletRef = useRef<MapRef|null>(null)
    const [geoData, setGeoData] = useState<FeatureCollection|null>(null)
    const [geoJson, setGeoJson] = useState<[number, number][]|null>(null)
    const {userData} = useUserPrefs()
    const lineLayer : LineLayerSpecification = {
        id: 'route',
        type: 'line',
        layout: {
            'line-join': 'round',
            'line-cap': 'square'
        },
        paint: {
            //orange
            'line-color': '#f90',
            'line-width': 8
        },
        source: 'route'
    }
    useEffect(()=>{
        const [type, geoJson] = [openModal?.geojson?.type, openModal?.geojson?.points]
        if (leafletRef.current && geoJson){
            leafletRef.current.setCenter(geoJson[0])
        }
        if (type && geoJson){
            const _geoData : FeatureCollection = {
                type : "FeatureCollection",
                features : [{
                    type : "Feature",
                    properties : {},
                    geometry : {type : "LineString", coordinates : geoJson}
                }, {
                    type : "Feature",
                    properties : {},
                    geometry : {type : "Point", coordinates : geoJson[0]}
                }, {
                    type : "Feature",
                    properties : {},
                    geometry : {type : "Point", coordinates : geoJson[geoJson.length-1]}
                }]
            }
            console.log(_geoData, [openModal?.geojson?.points[0][0], openModal?.geojson?.points[0][1]])
            setGeoData(_geoData)
        }
    }, [openModal])
    if (!userData) return (null)
    return (
        <>
            <Dialog open={openModal != null} onOpenChange={(e)=>setOpenModal(!e ? null : openModal)}>
                <DialogContent className="max-w-[425px] md:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Map of Workout</DialogTitle>
                    </DialogHeader>
                {openModal && <div className="grid gap-4 py-4 aspect-square w-full">
                    <Map
                        minZoom={12}
                        maxZoom={18}
                        ref={leafletRef}
                        style={{ width: '100%', height: '100%' }}
                        mapboxAccessToken="pk.eyJ1IjoibWFwYm94cmFtemkiLCJhIjoiY2xrZWdxcDRtMDNubDNtbzVscHg1cmFndiJ9.plNmIJsyoayQBmsdAiewFQ"
                        initialViewState={{
                            longitude: 13.3777,
                            latitude: 52.5163,
                            zoom: 14
                        }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                    >
                        {/* @ts-ignore */}
                        <Source id="route" type="geojson" data={geoData}>
                            <Layer {...lineLayer} />
                        </Source>
                        <Marker longitude={openModal?.geojson?.points[0][0]!} latitude={openModal?.geojson?.points[0][1]!} color="green" />
                        <Marker longitude={openModal?.geojson?.points[openModal?.geojson?.points.length-1][0]!} latitude={openModal?.geojson?.points[openModal?.geojson?.points.length-1][1]!} color="red" />
                    </Map>
                </div>}
            </DialogContent>
            </Dialog>
            <TableRoot>
            <Table>
                <TableCaption>Recent workouts.</TableCaption>
                <TableHead>
                <TableRow>
                    <TableHeaderCell>Date</TableHeaderCell>
                    <TableHeaderCell>Workout Type</TableHeaderCell>
                    <TableHeaderCell>Distance</TableHeaderCell>
                    <TableHeaderCell>Duration</TableHeaderCell>
                    <TableHeaderCell className="text-right">
                        View Map
                    </TableHeaderCell>
                </TableRow>
                </TableHead>
                <TableBody className="overflow-y-auto h-full">
                {data.map((item, idx) => {
                    const {unit} = userData?.preferences!
                    const standardizedUnit = unit == "imperial" ? "mi" : "km"
                    const distance = unit == "imperial" ? (item.distance_metric / 1000) * 0.621371 : item.distance_metric / 1000

                    return (
                        <TableRow key={idx+"-workout"}>
                            <TableCell>{item.date}</TableCell>
                            <TableCell className="">{item.type[0].toUpperCase()+item.type.slice(1)}</TableCell>
                            <TableCell>{distance.toFixed(2)} {standardizedUnit}</TableCell>
                            <TableCell>{item.duration / 60} mins</TableCell>
                            <TableCell className="text-right">
                                <Button className={`${item.geojson ? "" : "hidden"}`} onClick={() => {
                                    setOpenModal(item)
                                }}>
                                    Open Map
                                </Button>
                            </TableCell>
                        </TableRow>)
                })}
                </TableBody>
                <TableFoot>
                {/* <TableRow>
                    <TableHeaderCell colSpan={2} scope="row" className="text-right">
                    4,642
                    </TableHeaderCell>
                    <TableHeaderCell colSpan={3} scope="row" className="text-right">
                    497
                    </TableHeaderCell>
                </TableRow> */}
                </TableFoot>
            </Table>
            </TableRoot>
        </>
    )
}