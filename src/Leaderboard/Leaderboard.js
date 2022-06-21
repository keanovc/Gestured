import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Emoji, EmojiProvider } from "react-apple-emojis";
import emojiData from 'react-apple-emojis/src/data.json';
import { db } from "../firebase"
import Navbar from "../Navbar/Navbar"

export const Leaderboard = ({ children }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getScores = async () => {
            const q = query(collection(db, "users"));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setUsers(users => [...users, doc.data()]);
            });

        }
        getScores();
    }, []);

    return (
        <>
            <Navbar />
            <p className="text-4xl text-center font-bold pt-32 pb-10 text-white">Leaderboard</p>
            <table className="rounded-t-lg m-5 w-4/5 mx-auto bg-opacity-40 backdrop-filter backdrop-blur-lg bg-white text-gray-700 rounded-b-lg">
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
                                        <td className="px-4 py-3">{user.scoreButtons}</td>
                                        <td className="px-4 py-3">{user.totalGamesButtons}</td>
                                        <td className="px-4 py-3">{(user.scoreButtons / user.totalGamesButtons) * 100}%</td>
                                    </tr>
                                )
                            }
                            )
                        }
                        {/* <td className="py-3"></td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3"></td> */}
                </tbody>
            </table>
        </>

    )
}