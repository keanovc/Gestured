import { GameLayout } from "../Design/GameLayout/GameLayout"
import Navbar from "../Navbar/Navbar"
import { Score } from "../Design/Score/Score"
import { useState } from "react"
import { RulesButton } from "../Design/RulesButton/RulesButton"
import { RulesModal } from "../Design/RulesModal/RulesModal"

const LocalButtons = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

    return (
        <>
            <Navbar />

            <Score />

            <GameLayout />

            <RulesButton text={'rules'} toggle={toggleModal} />
            {showModal && <RulesModal text={'rules'} show={showModal} toggle={toggleModal} />}
        </>
    )
}

export default LocalButtons
