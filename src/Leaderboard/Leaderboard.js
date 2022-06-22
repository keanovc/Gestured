import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Emoji, EmojiProvider } from "react-apple-emojis";
import emojiData from 'react-apple-emojis/src/data.json';
import { db } from "../firebase"
import Navbar from "../Navbar/Navbar"
import './Leaderboard.css'

export const Leaderboard = ({ children }) => {

    const [users, setUsers] = useState([]);

    console.log(users);

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
            <h1 className="pt-36 w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                Leaderboard
            </h1>
            <div className="w-full mb-20">
                <div className="h-1 mx-auto bg-gray-800 w-64 my-0 py-0 rounded-t"></div>
            </div>
            <div className='flex justify-center items-center'>
                <div className="w-3/5">
                    <div className="overflow-auto lg:overflow-visible ">
                        <table className="table w-full text-gray-500 border-separate space-y-6 text-sm">
                            <thead className="bg-gray-800 text-white">
                                <tr>
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