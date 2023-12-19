import { debounce } from "lodash";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const AllContactsModal = () => {
  const [contacts, setContacts] = useState();
  const [showEven, setShowEven] = useState(false);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const [contactDetails, setContactDetails] = useState();

  // Modal c
  const [showModalC, setShwModalC] = useState(false);

  const handleClose = () => {
    navigate("/problem-2");
  };

  const getContacts = async () => {
    try {
      const response = await fetch(
        `https://contact.mediusware.com/api/contacts/?search=${query}`
      );
      const data = await response.json();

      setContacts(data.results);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleCOpen = (data) => {
    setShwModalC(true);
    setContactDetails(data);
  };

  //Handle Query
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const getApiCall = debounce(() => {
    getContacts();
  }, 2000);

  return (
    <div>
      <Modal show={true} onHide={handleClose}>
        {showModalC ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Contact Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table className="table table-striped ">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Country</th>
                    <th scope="col">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{contactDetails.country.id}</td>
                    <td>{contactDetails.country.name}</td>
                    <td>{contactDetails.phone}</td>
                  </tr>
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer className="justify-content-between ">
              <div className="d-flex gap-2">
                <Button
                  onClick={() => {
                    setShwModalC(false);
                  }}
                  variant="secondary"
                >
                  Back
                </Button>

                <Button variant="primary" onClick={handleClose}>
                  Close
                </Button>
              </div>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>All Contacts</Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                maxHeight: "400px",
                overflowY: "scroll",
              }}
            >
              <input
                type="text"
                name="query"
                id=""
                onChange={(e) => {
                  handleQuery(e);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    getContacts();
                  } else {
                    getApiCall();
                  }
                }}
              />
              <table className="table table-striped ">
                <thead>
                  <tr>
                    <th scope="col">Country</th>
                    <th scope="col">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {showEven
                    ? contacts
                        ?.filter((item) => item.id % 2 === 0)
                        .map((contact, index) => (
                          <tr onClick={() => handleCOpen(contact)} key={index}>
                            <td>{contact.country.name}</td>
                            <td>{contact.phone}</td>
                          </tr>
                        ))
                    : contacts?.map((contact, index) => (
                        <tr onClick={() => handleCOpen(contact)} key={index}>
                          <td>{contact.country.name}</td>
                          <td>{contact.phone}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer className="justify-content-between ">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  onChange={(e) => {
                    setShowEven(e.target.checked);
                  }}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Only Even
                </label>
              </div>
              <div className="d-flex gap-2">
                <Button
                  variant="secondary"
                  style={{
                    background: "#46139f",
                  }}
                  onClick={() => {
                    navigate("/problem-2/all");
                  }}
                >
                  All Contacts
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("/problem-2/us");
                  }}
                >
                  US Contacts
                </Button>

                <Button variant="primary" onClick={handleClose}>
                  Close
                </Button>
              </div>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default AllContactsModal;
