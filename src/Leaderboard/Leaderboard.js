import Navbar from "../Navbar/Navbar"

export const Leaderboard = ({ children }) => {
    return (
        <>
            <Navbar />
            <p className="text-4xl text-center font-bold pt-32 pb-10 text-white">Leaderboard</p>
            <table className="rounded-t-lg m-5 w-4/5 mx-auto bg-opacity-40 backdrop-filter backdrop-blur-lg bg-white text-gray-700 rounded-b-lg">
                <thead>
                    <tr className="text-left border-b border-gray-300 rounded-t-lg">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Games</th>
                        <th className="px-4 py-3">Wins</th>
                        <th className="px-4 py-3">win%</th>
                    </tr>
                </thead>
                <tbody className="text-gray-200">
                    {children}
                    <tr className="text-gray-700">
                        <td className="py-3"></td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3"></td>
                    </tr>
                </tbody>
            </table>
        </>

    )
}