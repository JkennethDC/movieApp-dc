import { Card, Modal, Button } from 'react-bootstrap';
import { useState } from "react";
import PropTypes from 'prop-types';

export default function MovieCard({ productProp, isAdmin }) {
  const { title, director, year, description, genre, comments } = productProp;

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Card style={{ minWidth: '20rem', minHeight: '25rem' }} className='mb-2 text-center'>
        <Card.Img variant="top" src={`https://picsum.photos/200/300?random=${title}`} style={{ width:'30%', height: 'auto'}} className="mx-auto" />
        <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <Card.Title className='text-center'>{title}</Card.Title>
          {isAdmin ? (
            comments.map((comment, index) => (
              <Card.Text key={index} className='text-center'>
                <strong>User {comment.userId}:</strong> {comment.text}
              </Card.Text>
            ))
          ) : (
            <Card.Text className='text-center'>No comments available for non-admin users.</Card.Text>
          )}
          <Button className='btn btn-info' onClick={handleShow}>Details</Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Movie Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>{title}</h1>
          <h2>{director}</h2>
          <h3>{year}</h3>
          <h4>{genre}</h4>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

MovieCard.propTypes = {
  productProp: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      userId: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }))
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired
};

MovieCard.defaultProps = {
  isAdmin: false
};