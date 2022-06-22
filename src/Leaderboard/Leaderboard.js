import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
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
            <div className="flex justify-center pt-32 gap-5 pb-10">
                <h1 className="text-4xl text-center font-bold  text-white">Leaderboard</h1>
                <h2 className="text-white bg-red-500 flex rounded-xl justify-between items-center px-3
                 py-2 gap-5">
                    <span class="flex h-3 w-3 ">
                        <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                    Live
                </h2>
            </div>
            <div className='flex justify-center items-center'>
                <div class="w-3/5">
                    <div class="overflow-auto lg:overflow-visible ">
                        <table class="table w-full text-gray-500 border-separate space-y-6 text-sm">
                            <thead class="bg-indigo-500 text-white">
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
                                    <th class="p-3 text-left">Total wins</th>
                                    <th class="p-3 text-left">Total games</th>
                                    <th class="p-3 text-left">Win %</th>
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
                                            <td class="p-3">
                                                <div class="flex align-items-center">
                                                    <div class="ml-3">
                                                        <div class="">{user.name}</div>
                                                        <div class="text-gray-500">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="p-3">
                                                {
                                                    user.streaksButtons > 0 ?
                                                        user.streaksButtons
                                                        : 0
                                                }
                                            </td>
                                            <td class="p-3">
                                                {user.winsButtons}
                                            </td>
                                            <td class="p-3">
                                               {user.totalGamesButtons}
                                            </td>
                                            <td class="p-3">
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