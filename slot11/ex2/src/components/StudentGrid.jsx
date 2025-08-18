import StudentCard from "./StudentCard";
import { Row, Col } from 'react-bootstrap';
const StudentGrid = ({ students, onViewDetails }) => {
  if (students.length === 0) {
    return <p className="text-center text-muted">No students found matching your criteria.</p>;
  }
  return (
    <Row>
      {students.map(student => (
        <Col xs={12} md={6} lg={4} key={student.id} className="mb-4">
            <StudentCard student={student} onViewDetails={onViewDetails} />
        </Col>
      ))}
    </Row>
  );
};

export default StudentGrid;