export const Highscore = ({ place, name, games, wins, winP }) => {
    return (
        <tr className="bg-black bg-opacity-80 backdrop-filter backdrop-blur-lg border-b ">
            <td className="px-4 py-3">{place}</td>
            <td className="px-4 py-3">{name}</td>
            <td className="px-4 py-3">{games}</td>
            <td className="px-4 py-3">{wins}</td>
            <td className="px-4 py-3">{winP}%</td>
        </tr>
    )
}