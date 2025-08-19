import React, { useState, useMemo } from 'react';
import { Row ,Container } from 'react-bootstrap';
import { studentsData } from '../data/students.js';
import Filters from '../components/Filters';
import SortDropdown from '../components/SortDropdown';
import StudentGrid from '../components/StudentGrid';
import StudentDetailModal from '../components/StudentDetailModal';
import ProfileWizard from '../components/ProfileWizard/ProfileWizard';
import AppNavbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer.jsx';

const StudentsPage = () => {
  const [students, setStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sortOption, setSortOption] = useState('name-asc');

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const [showWizard, setShowWizard] = useState(false);
  const handleShowWizard = () => setShowWizard(true);
  const handleCloseWizard = () => setShowWizard(false);

  const handleAddStudent = (newProfile) => {
    const newStudent = {
      id: Date.now(),
      name: `${newProfile.firstName} ${newProfile.lastName}`,
      email: newProfile.email,
      age: newProfile.age || 20,
      avatar: newProfile.previewImage || ''
    };
    setStudents(prevStudents => [...prevStudents, newStudent]);
  };

  const filteredAndSortedStudents = useMemo(() => {
    let result = [...students];

    result = result.filter(student => {
      const matchesSearch = searchTerm.trim() === '' ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAge = !ageRange || (
        (ageRange === '<=20' && student.age <= 20) ||
        (ageRange === '21-25' && student.age >= 21 && student.age <= 25) ||
        (ageRange === '>25' && student.age > 25)
      );
      const matchesAvatar = !hasAvatar || (hasAvatar && student.avatar);
      return matchesSearch && matchesAge && matchesAvatar;
    });

    const [key, order] = sortOption.split('-');
    result.sort((a, b) => {
      if (key === 'name') {
        return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (key === 'age') {
        return order === 'asc' ? a.age - b.age : b.age - a.age;
      }
      return 0;
    });

    return result;
  }, [searchTerm, ageRange, hasAvatar, sortOption, students]);

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setIsDetailModalVisible(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalVisible(false);
  };

  return (
    <div>
      <AppNavbar onShowProfileWizard={handleShowWizard} />

      <main>
        <Hero />
        <Container className="my-5 mt-3">
          <div >
            <Filters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              ageRange={ageRange}
              setAgeRange={setAgeRange}
              hasAvatar={hasAvatar}
              setHasAvatar={setHasAvatar}
            />
            <Row className="mb-4 align-items-center">
              {/* <Col md={8}>
                <Button className="btn-accent-theme" onClick={handleShowWizard}>
                  + Add New Profile
                </Button>
              </Col> */}
              {/* <Col md={4}> */}
                <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
              {/* </Col> */}
            </Row>
            <StudentGrid students={filteredAndSortedStudents} onViewDetails={handleViewDetails} />

            {selectedStudent && (
              <StudentDetailModal
                student={selectedStudent}
                show={isDetailModalVisible}
                onHide={handleCloseDetailModal}
              />
            )}

            <ProfileWizard
              show={showWizard}
              handleClose={handleCloseWizard}
              onAddStudent={handleAddStudent}
            />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default StudentsPage;