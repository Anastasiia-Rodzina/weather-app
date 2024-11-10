import "./modal.css";

const DeleteCardModal = ({ onClose, cardId, onDelete }) => {
  const handleDelete = (event) => {
    event.preventDefault();
    if (cardId) {
      onDelete(cardId);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleDelete}>
        <h2 className="newBoardTitle">
          Are you sure that you want to delete this card?
        </h2>

        <button type="submit" className="button" aria-label="Delete">
          <span className="button_title">Delete</span>
        </button>
      </form>
      <button className="close-button" onClick={onClose}>
        x
      </button>
    </div>
  );
};

export default DeleteCardModal;
