/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import noData from "../../../../assets/noData.svg";

export default function ConfirmDelete({
  show,
  deleteItem,
  deleteFun,
  closeModal,
}) {
  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <img src={noData} alt="no-data" />
          <h5>Delete this {deleteItem}?</h5>
          <div className="text-muted">
            Are you sure you want to delete this item? If you are sure, click on
            Delete
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={deleteFun}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
