// Import necessary dependencies from React and other libraries
import React, { useRef } from "react";
import { MdClose } from "react-icons/md";
import ReactDOM from "react-dom";

// Import custom styles for the modal
import "../styles/modal.css";

// Modal component that handles displaying modal content with backdrop
function Modal({ showModal, setShowModal, children, ...restProps }) {
  // Reference to the modal background for handling clicks
  const modalRef = useRef();

  // Function to close modal when clicking on backdrop
  function closeModel(e) {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  }

  // Function to handle body scroll lock when modal is open/closed
  const lockBody = () => {
    if (showModal) {
      document.body.style.position = "fixed";
      document.body.style.position = "static";
    } else {
      document.body.style.position = "static";
    }
  };

  // Render state containing modal structure and content
  const renderState = (
    <>
      {showModal ? (
        <>
          {/* Lock body scroll when modal is shown */}
          {lockBody()}
          <div
            className="myModal-background"
            onClick={closeModel}
            ref={modalRef}
          >
            {/* Modal container with content and close button */}
            <div className="myModal-container" >
              {children}
              <MdClose
                className="myModel-close-button "
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              />
            </div>
          </div>
        </>
      ) : (
        // Reset body scroll when modal is hidden
        lockBody()
      )}
    </>
  );

  // Create portal to render modal outside of normal DOM hierarchy
  return ReactDOM.createPortal(renderState, document.getElementById("modal"));
}

// Export the Modal component
export default Modal;
