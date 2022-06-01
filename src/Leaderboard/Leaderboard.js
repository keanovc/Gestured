import Navbar from "../Navbar/Navbar"

export const Leaderboard = () => {
    return (
        <>
            <Navbar />
            <p class="text-lg text-center font-bold m-5">Leaderboard</p>
            <table class="rounded-t-lg m-5 w-3/6 mx-auto bg-gray-800 text-gray-200">
                <tr class="text-left border-b border-gray-300">
                    <th class="px-4 py-3">Firstname</th>
                    <th class="px-4 py-3">Lastname</th>
                    <th class="px-4 py-3">Age</th>
                    <th class="px-4 py-3">Sex</th>
                </tr>
                <tr class="bg-gray-700 border-b border-gray-600">
                    <td class="px-4 py-3">Jill</td>
                    <td class="px-4 py-3">Smith</td>
                    <td class="px-4 py-3">50</td>
                    <td class="px-4 py-3">Male</td>
                </tr>
                <tr class="bg-gray-700 border-b border-gray-600">
                    <td class="px-4 py-3">Jill</td>
                    <td class="px-4 py-3">Smith</td>
                    <td class="px-4 py-3">50</td>
                    <td class="px-4 py-3">Male</td>
                </tr>
                <tr class="bg-gray-700 border-b border-gray-600">
                    <td class="px-4 py-3">Jill</td>
                    <td class="px-4 py-3">Smith</td>
                    <td class="px-4 py-3">50</td>
                    <td class="px-4 py-3">Male</td>
                </tr>
            </table>
        </>

    )
}