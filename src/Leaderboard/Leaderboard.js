import Navbar from "../Navbar/Navbar"

export const Leaderboard = ({ children }) => {
    return (
        <>
            <Navbar />
            <p class="text-4xl text-center font-bold m-10 text-white">Leaderboard</p>
            <table class="rounded-t-lg m-5 w-4/5 mx-auto bg-opacity-40 backdrop-filter backdrop-blur-lg bg-white text-gray-700 rounded-b-lg">
                <thead>
                    <tr class="text-left border-b border-gray-300 rounded-t-lg">
                        <th class="px-4 py-3">#</th>
                        <th class="px-4 py-3">Name</th>
                        <th class="px-4 py-3">Games</th>
                        <th class="px-4 py-3">Wins</th>
                        <th class="px-4 py-3">win%</th>
                    </tr>
                </thead>
                <tbody className="text-gray-200">
                    {children}
                    <tr class="text-gray-700">
                        <td class="py-3"></td>
                        <td class="px-4 py-3"></td>
                        <td class="px-4 py-3"></td>
                        <td class="px-4 py-3"></td>
                        <td class="px-4 py-3"></td>
                    </tr>
                </tbody>
            </table>
        </>

    )
}