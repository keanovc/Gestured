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

            <RulesButton toggle={toggleModal} />
            {showModal && <RulesModal text={'IDEA'} show={showModal} toggle={toggleModal} />}
        </>
    )
}

export default LocalButtons
