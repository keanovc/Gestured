export const Highscore = ({ place, name, games, wins, winP }) => {
    return (
        <tr class="bg-black bg-opacity-80 backdrop-filter backdrop-blur-lg border-b ">
            <td class="px-4 py-3">{place}</td>
            <td class="px-4 py-3">{name}</td>
            <td class="px-4 py-3">{games}</td>
            <td class="px-4 py-3">{wins}</td>
            <td class="px-4 py-3">{winP}%</td>
        </tr>
    )
}