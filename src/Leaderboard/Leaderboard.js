import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Emoji, EmojiProvider } from "react-apple-emojis";
import emojiData from 'react-apple-emojis/src/data.json';
import { db } from "../firebase"
import Navbar from "../Navbar/Navbar"
import './Leaderboard.css'

export const Leaderboard = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const documents = collection(db, 'leaderboard');
        const q = query(documents);
        onSnapshot(q, querySnapshot => {
            setUsers(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });
        return;
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex justify-center pt-32 gap-5 pb-5">
                <h1 className="text-4xl text-center font-bold  text-gray-800">Leaderboard</h1>
                <h2 className="text-white bg-red-500 flex rounded-xl justify-between items-center px-3
                 py-2 gap-5">
                    <span class="flex h-3 w-3 ">
                        <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                    Live
                </h2>
            </div>
            <div className="w-full pb-16">
                <div className="h-1 mx-auto bg-gray-800 w-64 my-0 py-0 rounded"></div>
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

                                        <tr class="bg-white" key={index}>
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
                                                <span class="font-bold">{index +1}</span>
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
                                                    user.streaksButtons > 0 ?
                                                        user.streaksButtons
                                                        : 0
                                                }
                                            </td>
                                            <td className="p-3">
                                                {user.winsButtons}
                                            </td>
                                            <td className="p-3">
                                               {user.totalGamesButtons}
                                            </td>
                                            <td className="p-3">
                                                {Math.round((user.winsButtons / user.totalGamesButtons) * 100)}%
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