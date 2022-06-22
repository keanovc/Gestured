import { collection, onSnapshot, query } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { db } from "../firebase"

const LeaderboardLayout = () => {

    const { mode } = useParams();

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const documents = collection(db, 'leaderboard');
        const q = query(documents);
        onSnapshot(q, (snapshot) => {
            const users = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            setUsers(users);
        });
        return;
    }, []);

    if (mode === 'buttons') {
        users.forEach(user => {
            user.streaks = user.streaksButtons;
            user.wins = user.winsButtons;
            user.totalGames = user.totalGamesButtons;
        });
        // sort descending by streaks
        users.sort((a, b) => {
            return b.streaks - a.streaks;
        })
    }else if (mode === 'webcam') {
        users.forEach(user => {
            user.streaks = user.streaksWebcam;
            user.wins = user.winsWebcam;
            user.totalGames = user.totalGamesWebcam;
        });
        users.sort((a, b) => {
            return b.streaks - a.streaks;
        })
    }
    return (
        <div>
            <Outlet
            context={ { users: users } }
            />
        </div>
    );
};

export default LeaderboardLayout;
