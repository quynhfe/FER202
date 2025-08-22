import { useState } from "react";
import { Container, Button, Alert, Card } from "react-bootstrap";
import ProfileWizard from "../components/ProfileWizard/ProfileWizard";

const ProfilePage = () => {
  const [showWizard, setShowWizard] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleAddStudent = (studentData) => {
    console.log("Profile Data Submitted:", studentData);
    setSubmittedData(studentData);
  };

  const handleCloseWizard = () => setShowWizard(false);
  const handleShowWizard = () => {
    setSubmittedData(null);
    setShowWizard(true);
  };

  return (
    <Container className="my-5">
      <Card className="p-4 p-md-5 text-center shadow-lg border-0">
        <Card.Body>
          <h1 className="display-4">Profile Management</h1>
          <p className="lead text-muted mb-4">
            Build and manage your personal and account information using our
            step-by-step wizard.
          </p>
          <Button variant="primary" size="lg" onClick={handleShowWizard}>
            Build Your Profile
          </Button>

          {submittedData && (
            <Alert variant="success" className="mt-4 text-start shadow-sm">
              <Alert.Heading>Submission Successful!</Alert.Heading>
              <p>
                Welcome,{" "}
                <strong>
                  {submittedData.firstName} {submittedData.lastName}
                </strong>
                ! Your profile has been created.
              </p>
              <hr />
              <p className="mb-0">
                A confirmation has been sent to{" "}
                <strong>{submittedData.email}</strong>.
              </p>
            </Alert>
          )}
        </Card.Body>
      </Card>

      <ProfileWizard
        show={showWizard}
        handleClose={handleCloseWizard}
        onAddStudent={handleAddStudent}
      />
    </Container>
  );
};

export default ProfilePage;
