import React, { useState, useMemo } from 'react';
import { studentsData } from '../data/students.js';
import Filters from '../components/Filters';
import SortDropdown from '../components/SortDropdown';
import StudentGrid from '../components/StudentGrid';
import StudentDetailModal from '../components/StudentDetailModal';

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sortOption, setSortOption] = useState('name-asc');
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const filteredAndSortedStudents = useMemo(() => {
    let result = [...studentsData];

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
  }, [searchTerm, ageRange, hasAvatar, sortOption]);

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">

      <div className="space-y-6">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          ageRange={ageRange}
          setAgeRange={setAgeRange}
          hasAvatar={hasAvatar}
          setHasAvatar={setHasAvatar}
        />
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
        <StudentGrid students={filteredAndSortedStudents} onViewDetails={handleViewDetails} />
      </div>
      
      {selectedStudent && (
        <StudentDetailModal 
            student={selectedStudent} 
            show={isModalVisible} 
            onHide={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default StudentsPage;