import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Modes = () => {
    return (
        <>
            <Navbar />
            <section id="modes" className="pt-32 pb-8">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                    Types of Games
                </h1>
                <div className="w-full mb-20">
                    <div className="h-1 mx-auto bg-white w-64 my-0 py-0 rounded-t"></div>
                </div>
                <div className="container mx-auto flex flex-wrap pt-4 pb-12">
                    <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                        <Link to={'/modes/localcam'}>
                            <div className="p-8 cursor-pointer rounded-3xl bg-white border transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl">
                                <div className="-mb-20 -translate-y-1/2 transform">
                                <img src="../../img/robot1.png" alt="User vs AI" title="User vs AI" className="mx-auto h-48" />
                                </div>
                                <div className="text-center">
                                <h3 className="text-center text-4xl font-bold">User VS AI</h3>
                                <span className="text-sm">Webcam</span>
                                </div>
                                <h1 className="mt-16 mb-20 flex justify-center text-center text-2xl">Play your favorite game against the AI with your webcam!</h1>
                                <div className="text-center">
                                <button className="rounded-xl bg-black w-full py-2 text-white">Select gamemode</button>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                        <Link to={'/modes/localbuttons'}>
                            <div className="p-8 cursor-pointer rounded-3xl bg-white border transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl">
                                <div className="-mb-20 -translate-y-1/2 transform">
                                <img src="../../img/user.png" alt="User VS AI" title="User VS AI" className="mx-auto h-48" />
                                </div>
                                <div className="text-center">
                                <h3 className="text-center text-4xl font-bold">User VS AI</h3>
                                <span className="text-sm">Buttons</span>
                                </div>
                                <h1 className="mt-16 mb-20 flex justify-center text-center text-2xl">Don't you have a webcam? Then play this mode with very easy!</h1>
                                <div className="text-center">
                                <button className="rounded-xl bg-black w-full py-2 text-white">Select gamemode</button>
                                </div>
                            </div>
                        </Link>
                    </div>
                        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                            <Link to={"/modes/multiplayer"}>
                            <div className="p-8 cursor-pointer rounded-3xl bg-white border transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl">
                                <div className="-mb-20 -translate-y-1/2 transform">
                                <img src="../../img/wifi.png" alt="User vs User" title="User vs User" className="mx-auto h-48" />
                                </div>
                                <div className="text-center">
                                <h3 className="text-center text-4xl font-bold">User VS User</h3>
                                <span className="text-sm">Online</span>
                                </div>
                                <h1 className="mt-16 mb-20 flex justify-center text-center text-2xl">Do you prefer to play with your friends online? Then choose this!</h1>
                                <div className="text-center">
                                <button className="rounded-xl bg-black w-full py-2 text-white">Select gamemode</button>
                                </div>
                            </div>
                            </Link>
                        </div>
                </div>
                </section>
        </>

    )
}

export default Modes;