import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Emoji, EmojiProvider } from "react-apple-emojis";
import emojiData from 'react-apple-emojis/src/data.json';
import { db } from "../firebase"
import Navbar from "../Navbar/Navbar"

export const Leaderboard = ({ children }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const documents = collection(db, 'leaderboard');
        const q = query(documents);

        onSnapshot(q, querySnapshot => {
            setUsers(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });

        return;
    }, []);

    console.log(users);


    return (
        <>
            <Navbar />
            <p className="text-4xl text-center font-bold pt-32 pb-10 text-white">Leaderboard</p>
            <table className="rounded-t-lg m-5 w-4/5 mx-auto bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg">
                <thead>
                    <tr className="text-left border-b border-gray-300 rounded-t-lg">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3 flex justify-start items-center">
                            Streak
                            <div className="w-5 ml-2">
                                <EmojiProvider data={emojiData}>
                                    <Emoji className='w-8' name="fire" />
                                </EmojiProvider>
                            </div>
                        </th>
                        <th className="px-4 py-3">Total wins</th>
                        <th className="px-4 py-3">Total games</th>
                        <th className="px-4 py-3">Win %</th>
                    </tr>
                </thead>
                <tbody className="text-gray-200">
                    {children}
                        {
                            users.map((user, index) => {
                                return (
                                    <tr className="text-gray-700" key={index}>
                                        <td className="px-4 py-3">{index +1}</td>
                                        <td className="px-4 py-3">{user.name}</td>
                                        <td className="px-4 py-3">{user.streaksButtons}</td>
                                        <td className="px-4 py-3">{user.winsButtons}</td>
                                        <td className="px-4 py-3">{user.totalGamesButtons}</td>
                                        <td className="px-4 py-3">{Math.round((user.winsButtons / user.totalGamesButtons) * 100)}%</td>
                                    </tr>
                                )
                            }
                            )
                        }
                </tbody>
            </table>
        </>

    )
}