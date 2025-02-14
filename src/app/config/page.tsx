"use client";

import BackButton from "../components/BackButton/BackButton";
import StatusFailed from "../components/StatusFailed/StatusFailed";
import StatusOK from "../components/StatusOK/StatusOK";
import { useState } from "react";
import "./style.css";
import BluetoothIcon from "../utils/icons/bluetoothIcon";
import { useBluetooth } from "../utils/BluetoothContext";
import LightCard from "../components/LightCard/Lightcard";
 
export default function ConfigPage() {

    const [ isDeviceConnected, setIsDeviceConnected ] = useState(false);
    const [ error, setError] = useState(false);
    const { setDevice, setServer } = useBluetooth();
    
    const connectToDevice = async () => {
        try {
          const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ["12345678-1234-5678-1234-56789abcdef0"], // UUID del servicio de sensores
          });

          const server = await device.gatt?.connect();
          if (server) {
            setDevice(device);
            setServer(server);
            setIsDeviceConnected(true);
            setError(false);
          }else {
            console.error('Failed to connect to the device');
            setError(true);
          }
          
        } catch (error) {
          console.error('Error connecting to the device:', error);
          setIsDeviceConnected(false);
          setError(true);
        }
      };

    return (
        <div className="flex flex-col h-screen justify-between"> 
            <div className="mx-4">
                <div className="bg-black text-white text-4xl text-center font-bold mb-10 mt-10">
                    CONFIG
                </div> 
                <div className="text-xl text-center mt-6">
                    Press the <strong><span className="text-blue-500">Blue</span> Button</strong> in the Device and then press the &quot;CONNECT&ldquo; <strong>Button</strong> below.
                </div> 
                <button onClick={connectToDevice} className="check flex">CONNECT <BluetoothIcon className="w-6 h-6"/></button>
                        
                
                <div className="mt-[40vh]">
                  {isDeviceConnected && <StatusOK></StatusOK>} 
                  {error && <StatusFailed></StatusFailed>}
                </div>
                
            </div>
            <div className="ml-2 mx-2">    
                <BackButton/>
            </div>
        </div>
        );

}

