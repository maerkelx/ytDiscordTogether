"use client";
import { Inter } from "next/font/google";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Watch() {
    const [player, setPlayer] = useState(null);
    const playerRef = useRef(null);

    const searchParams = useSearchParams();
    const videoId = searchParams.get("v");
    const timestamp = searchParams.get("t");

    const handleVideoChange = (player, videoId, timestamp) => {
        console.log("videoId:", videoId);
        if (player) {
            player.loadVideoById(videoId, timestamp, "highres");
            player.playVideo();
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
                        // handleStateChange(event, player);
                    },
                },
            });

            return () => {
                player.destroy();
            };
        };
    }, []);

    useEffect(() => {
        if (player && videoId && timestamp) {
            handleVideoChange(player, videoId, timestamp);
        }
    }, [player, videoId, timestamp]);

    useEffect(() => {
        if (player) {
            const interval = setInterval(() => {
                console.log("Current time: ", player.getCurrentTime());
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [player]);

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
