import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ListPerson from './components/ListPerson';
import Filter from './components/Filter';
import SkillRanking from './components/SkillRanking';
import SearchSortStats from './components/SearchSortStats';

function App() {
  const [activeTab, setActiveTab] = useState('List Person');

  const renderContent = () => {
    switch (activeTab) {
      case 'List Person':
        return <ListPerson />;
      case 'Filter':
        return <Filter />;
      case 'Skill Ranking':
        return <SkillRanking />;
      case 'Search & Stats':
        return <SearchSortStats />;
      default:
        return <ListPerson />;
    }
  };

  return (
    <div className="container py-4">
      <h1>List person</h1>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'List Person' ? 'active' : ''}`}
            onClick={() => setActiveTab('List Person')}
          >
            List & Sort
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'Filter' ? 'active' : ''}`}
            onClick={() => setActiveTab('Filter')}
          >
             Filter
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'Skill Ranking' ? 'active' : ''}`}
            onClick={() => setActiveTab('Skill Ranking')}
          >
            Ranking
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'Search & Stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('Search & Stats')}
          >
            Search & Stats
          </button>
        </li>
      </ul>

      <div className="card">
        <div className="card-body">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;