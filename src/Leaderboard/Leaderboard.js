import ListGroup from 'react-bootstrap/ListGroup'

export const Leaderboard = () => {
    return (
        <div id='leaderboard' className='flex column w-screen h-screen justify-center'>
            <div id='header' className='flex row w-4/5 bg-indigo-500 h-16 justify-evenly rounded-t-2xl items-center divide-x-8'>
                <div>Rank</div> <div>User</div> <div>Games played</div> <div>Games won</div> <div>win %</div>
            </div>
        </div >
    )
}