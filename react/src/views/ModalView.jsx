import { useIdleTimer } from "react-idle-timer/legacy";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import TButton from "../components/core/TButton";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { goToAnimation } from "./../helpers/functions";
import { useNavigate } from "react-router-dom";

export default function ModalView() {
    const navigate = useNavigate();

    // Modal
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };
    // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
    // Modal.setAppElement("#yourAppElement");
    Modal.setAppElement(document.getElementById("yourAppElement"));
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }

    function closeModal() {
        setRemaining(50);
        setIsOpen(false);
    }

    const [modalContent, setModalContent] = useState();
    // END Modal

    // Idle timer
    const [state, setState] = useState("Active");
    const [count, setCount] = useState(0);
    const [remaining, setRemaining] = useState(1);

    const onIdle = () => {
        setState("Idle");
    };

    const onActive = () => {
        setState("Active");
    };

    const onAction = () => {
        setCount(count + 1);
    };

    const { getRemainingTime } = useIdleTimer({
        onIdle,
        onActive,
        onAction,
        timeout: 180_000,
        throttle: 500,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            // console.log("setRemaining");
            setRemaining(Math.ceil(getRemainingTime() / 1000));
        }, 500);

        return () => {
            // console.log("clearInterval");
            clearInterval(interval);
        };
    });
    // END Idle timer

    function goHome() {
        // setCurrentPatient();
        // console.log("goHome");
        // setCurrentPatient({});
        // console.log("currentPatient");
        // console.log(currentPatient);
        // verifyAvailableSurveys(currentPatient);
        navigate("/");
    }

    useEffect(() => {
        console.log("remaining");
        console.log(remaining);

        if (remaining === 30) {
            openModal();
        }
        // if (remaining10 === 10) {

        // }
        if (remaining === 0) {
            // goHome();
            window.location.replace(
                "https://bilan-sante.pharmacie-en-couleurs-eragny.com/"
            );
        }
    }, [remaining]);

    return (
        <div id="yourAppElement">
            {/* MODAL */}
            {/* <button onClick={openModal}>Open Modal</button> */}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                // className="items-center"
            >
                <h2>
                    {" "}
                    <span className="text-2xl font-bold">
                        Vous êtes toujours là ?
                    </span>
                </h2>

                <div className="w-80 flex flex-col items-center  border-t-4 border-green-500">
                    <div className="mb-2 mt-3">
                        <TButton
                            color="green"
                            onClick={closeModal}
                            className="w-60 flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            {" "}
                            <span className="text-xl">
                                Cliquez ici pour révenir
                            </span>
                        </TButton>
                    </div>

                    <div className="text-2xl font-bold">
                        Sinon l'enquete va redémarrer en {remaining} secondes.
                    </div>

                    <TButton
                        color="red"
                        onClick={goToAnimation}
                        className="mt-3 w-60 flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="text-xl">Revenir au debut</span>
                        <ExclamationTriangleIcon className="h-6 w-6 ml-2" />
                    </TButton>
                </div>

                {/* <form>
             <input />
             <button>tab navigation</button>
             <button>stays</button>
             <button>inside</button>
             <button>the modal</button>
         </form> */}
            </Modal>

            {/* END MODAL */}
        </div>
    );
}
