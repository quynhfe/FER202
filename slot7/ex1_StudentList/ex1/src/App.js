import NameList from "./components/NameList";
import UserProfile from "./components/UserProfile";
import Welcome from "./components/Welcome";
import { Container, Row, Col } from "react-bootstrap";
import StudentCard from "./components/StudentCard";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const userData = { name: "traltb@fe.edu.vn", age: 39 };
  const namesList = ["traltb@fe.edu.vn", "test@fe.edu.vn"];

  const students = [
    {
      name: "traltb1@fe.edu.vn",
      age: 39,
      avatar:
        "https://i.pinimg.com/736x/5e/77/d4/5e77d493baac7d0302ab4f5866063fe9.jpg",
    },
    {
      name: "traltb2@fe.edu.vn",
      age: 40,
      avatar: "https://pbs.twimg.com/media/FIMUOPkVgAE74wz.jpg",
    },
    {
      name: "traltb3@fe.edu.vn",
      age: 41,
      avatar:
        "https://reactormag.com/wp-content/uploads/2025/04/Whisper-of-the-Heart-library.jpg",
    },
  ];

  return (
    <div className="App" style={{ padding: "20px" }}>
      <Welcome name="traltb@fe.edu.vn" />
      <UserProfile user={userData} />
      <NameList names={namesList} />
      <Container style={{ marginTop: "20px" }}>
        <h1 className="my-4 text-center">Student information</h1>
        <Row>
          {students.map((student, index) => (
            <Col key={index} sm={12} md={4}>
              <StudentCard student={student} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
