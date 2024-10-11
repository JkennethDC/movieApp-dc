import { Card, Modal, Button, Table } from 'react-bootstrap';
import { useState } from "react";
import PropTypes from 'prop-types';

export default function MovieCard({ productProp}) {
  const { title, director, year, description, genre, comments } = productProp;

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>

      <Card style={{ minWidth:'20rem', minHeight: '25rem' }} className='mb-2 text-center'>
        <Card.Body style={{ display: 'flex', flexDirection: 'column', jusitfyContent: 'space-between', height: '100%' }}>
          <div style={{ flexGrow: 1, dispaly: 'flex', justifyContetn: 'center', alignItems: 'center', minHeight: '200px' }}>
            <img
              src={`https://picsum.photos/200/300?random=${title}`}
              alt={title}
              className= "img-fluid"
              style={{ maxWidth: "100%" , maxHeight: "300px", objectFit: '200px'}}
            />
          </div>
          <Card.Title>{title}</Card.Title>
          <Button className='btn btn-info' onClick={handleShow}>Details</Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Movie Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size="sm">
            <tbody>
              <tr>
                <td><strong>Title:</strong></td>
                <td>{title}</td>
              </tr>
              <tr>
                <td><strong>Director:</strong></td>
                <td>{director}</td>
              </tr>
              <tr>
                <td><strong>Year:</strong></td>
                <td>{year}</td>
              </tr>
              <tr>
                <td><strong>Genre:</strong></td>
                <td>{genre}</td>
              </tr>
              <tr>
                <td><strong>Description:</strong></td>
                <td>{description}</td>
              </tr>
            </tbody>
          </Table>
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