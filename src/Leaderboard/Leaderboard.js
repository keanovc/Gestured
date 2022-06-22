import { Emoji, EmojiProvider } from "react-apple-emojis";
import emojiData from 'react-apple-emojis/src/data.json';
import Navbar from "../Navbar/Navbar"
import { Link, NavLink, useOutletContext } from "react-router-dom";
import './Leaderboard.css'

export const Leaderboard = () => {

    const { users } = useOutletContext();

    return (
        <>
            <Navbar />
            <div className="flex justify-center pt-32 gap-5 pb-5">
                <h1 className="text-4xl text-center font-bold  text-gray-800">Leaderboard</h1>
                <h2 className="text-white bg-red-500 flex rounded-xl justify-between items-center px-3 gap-2">
                    <span className="flex h-3 w-3 ">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                    Live
                </h2>
            </div>
            <div className="w-full">
                <div className="h-1 mx-auto bg-gray-800 w-64 my-0 py-0 rounded"></div>
            </div>
                {/* <button onClick={setButtonsData}>
                    Buttons
                </button>
                <button onClick={setWebcamData}>
                    Webcam
                </button> */}
                <div className="flex justify-center items-center gap-3">
                    <NavLink to='/leaderboard/buttons' className={({ isActive }) => (isActive ? 'mx-auto lg:mx-0 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-indigo-500 text-white' : 'mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out')}>Buttons</NavLink>
                    <NavLink to='/leaderboard/webcam' className={({ isActive }) => (isActive ? 'mx-auto lg:mx-0 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-indigo-500 text-white' : 'mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out')}>Webcam</NavLink>
                </div>
            <div className='flex justify-center items-center'>
                <div className="w-3/5">
                    <div className="overflow-auto lg:overflow-visible ">
                        <table className="table w-full text-gray-500 border-separate space-y-6 text-sm">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="p-3 text-left"></th>
                                    <th className="p-3 text-left">Rank</th>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="px-4 py-3 flex justify-start items-center text-left">
                                        Streak
                                        <div className="w-5 ml-2">
                                            <EmojiProvider data={emojiData}>
                                                <Emoji className='w-8' name="fire" />
                                            </EmojiProvider>
                                        </div>
                                    </th>
                                    <th className="p-3 text-left">Total wins</th>
                                    <th className="p-3 text-left">Total games</th>
                                    <th className="p-3 text-left">Win %</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                users.map((user, index) => {
                                    return (

                                        <tr className="bg-white" key={index}>
                                            <td className="p-3">
                                                {/* only for the first item */}
                                                {index === 0 && <div className="w-5">
                                                    <EmojiProvider data={emojiData}>
                                                        <Emoji className='w-8' name="1st-place-medal" />
                                                    </EmojiProvider>
                                                </div>}
                                                {/* only for the second item */}
                                                {index === 1 && <div className="w-5">
                                                    <EmojiProvider data={emojiData}>
                                                        <Emoji className='w-8' name="2nd-place-medal" />
                                                    </EmojiProvider>
                                                </div>}
                                                {/* only for the third item */}
                                                {index === 2 && <div className="w-5">
                                                    <EmojiProvider data={emojiData}>
                                                        <Emoji className='w-8' name="3rd-place-medal" />
                                                    </EmojiProvider>
                                                </div>}
                                            </td>
                                            <td className="p-3">
                                                <span className="font-bold">{index +1}</span>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex align-items-center">
                                                    <div className="ml-3">
                                                        <div className="">{user.name}</div>
                                                        <div className="text-gray-500">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                {
                                                    user.streaks > 0 ?
                                                        user.streaks
                                                        : 0
                                                }
                                            </td>
                                            <td className="p-3">
                                                {user.wins}
                                            </td>
                                            <td className="p-3">
                                               {user.totalGames}
                                            </td>
                                            <td className="p-3">
                                                {
                                                    user.totalGames > 0 ?
                                                    (
                                                        `${Math.round((user.wins / user.totalGames) * 100)} %`
                                                    )
                                                        : 0
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>

    )
}