
import React, { useRef } from 'react'
import { createPortal } from 'react-dom'

const ModalsContainer = ({children, id, fullScreen, title, className, closeFunction, closeModal}) => {
  const modalRef = useRef()
  if(closeModal){
    modalRef.current.classList.remove("show")
    modalRef.current.style.display = "none"
    modalRef.current.role = null
    document.body.classList.remove("modal-open")
    document.body.style=null
  }
    return createPortal(
        <div
        className={`modal fade back_smoke animate__animated animate__fadeIn animate__fast ${className || ""}`}
        id={id}
        tabIndex="-1"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className={`modal-dialog animate__animated animate__fadeInDown animate__fast ${fullScreen ? "modal-fullscreen" : ""}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title flex-fill" id="exampleModalLabel">
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeFunction || null}
              ></button>
            </div>
            <div className="modal-body">
                {children}
            </div>
            <div className="modal-footer justify-content-start">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeFunction || null}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>,
        document.getElementById('modals-root')
    )
}

export default ModalsContainer
