import { Bottom } from "../Design/BottomContent"
import Navbar from "../Navbar/Navbar"
import { Header } from "../Design/HeaderContent"
import { useState } from "react"
import { OutlineButton } from "../Design/OutlineButton"
import { Modal } from "../Design/Modal"

const LocalButtons = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

    return (
        <>
            <Navbar />

            <Header />

            <Bottom />

            <OutlineButton text={'rules'} toggle={toggleModal} />
            {showModal && <Modal text={'rules'} show={showModal} toggle={toggleModal} />}
        </>
    )
}

export default LocalButtons
