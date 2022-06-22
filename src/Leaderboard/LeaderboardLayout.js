import { collection, onSnapshot, query } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { db } from "../firebase"

const LeaderboardLayout = () => {

    // use params to determine which leaderboard to display
    const { mode } = useParams();

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const documents = collection(db, 'leaderboard');
        const q = query(documents);
        onSnapshot(q, querySnapshot => {
            const sortedUsers = querySnapshot.docs.sort((a, b) => {
                return b.data().streaksButtons - a.data().streaksButtons;
            }).map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }).slice(0, 10);
            setUsers(sortedUsers);
        });
        return;
    }, []);

    if (mode === 'buttons') {
        users.forEach(user => {
            user.streaks = user.streaksButtons;
            user.wins = user.winsButtons;
            user.totalGames = user.totalGamesButtons;
        });
    }else if (mode === 'webcam') {
        users.forEach(user => {
            user.streaks = user.streaksWebcam;
            user.wins = user.winsWebcam;
            user.totalGames = user.totalGamesWebcam;
        });
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
