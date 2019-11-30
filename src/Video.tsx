import React, { useRef, useEffect, useState } from "react";
import QrScanner from "qr-scanner";
const p = `${process.env.PUBLIC_URL}/qr-scanner-worker.min.js`;
QrScanner.WORKER_PATH = p;
export const Video = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  console.log(p);
  useEffect(() => {
    if (ref.current) {
      navigator.getUserMedia(
        { audio: false, video: true },
        stream => {
          ref.current!.srcObject = stream;
          // ref.current!.play();
        },
        err => {
          console.log(err);
        }
      );

      scannerRef.current = new QrScanner(ref.current, (result: any) =>
        console.log("decoded qr code:", result)
      );
      scannerRef.current!.start();
    }
    return () => {
      if (scannerRef.current) {
        scannerRef.current.destroy();
      }
    };
  });
  return (
    <div>
      hoge
      <video ref={ref}></video>
    </div>
  );
};
