'use client';
import { Inter } from "next/font/google";
import Script from "next/script";
import { useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Watch() {
  const [player, setPlayer] = useState(null);
  const playerRef = useRef(null);

  const handleStateChange = useCallback();
  const searchParams = useSearchParams();
  const videoId = searchParams.get('v');

  const handleVideoChange = (player, videoId) => {
    console.log("videoId:", videoId);
    if (player) {
      player.loadVideoById(videoId, 0, "highres");
    }
  };

  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player(playerRef.current, {
        events: {
          onReady: () => {
            console.log("Player is ready");
            setPlayer(player);
          },
          onStateChange: (event) => {
            // handleStateChange(event);
          },
        },
      });

      return () => {
        player.destroy();
      };
    };
  }, [handleStateChange]);


  useEffect(() => {
    if (player && videoId) {
      handleVideoChange(player, videoId);
    }
  }, [player, videoId]);

  return (
    <>
      <Script
        src="https://www.youtube.com/iframe_api"
        onLoad={() => {
          console.log("YT Script has loaded");
        }}
      />
      <div className="flex flex-col items-center justify-center p-16 w-full h-screen bg-neutral-800">
        <div className="aspect-video flex flex-1 rounded-2xl overflow-clip shadow-2xl">
          <iframe
            ref={playerRef}
            className="w-full h-full"
            src={
              "https://www.youtube.com/embed/0?mute=0&enablejsapi=1"
          }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          ></iframe>
        </div>
      </div>
    </>
  );
}
