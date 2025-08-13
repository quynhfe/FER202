import { recipes } from '../data/recipes';
import Filter from './Filter';
import RecipeList from './List';
import RecipeModal from './RecipeModal';
import { Alert } from 'react-bootstrap';
import { useMemo, useState } from 'react'

function RecipeManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [maxPrepTime, setMaxPrepTime] = useState('');
    const [maxCookTime, setMaxCookTime] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortOption, setSortOption] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const filteredRecipes = useMemo(() => {
        let result = recipes.filter(recipe => {
            const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPrepTime = !maxPrepTime || recipe.prep <= parseInt(maxPrepTime);
            const matchesCookTime = !maxCookTime || recipe.cook <= parseInt(maxCookTime);
            return matchesSearch && matchesPrepTime && matchesCookTime;
        });

        if (sortOption === 'name-asc') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === 'name-desc') {
            result.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortOption === 'prep-asc') {
            result.sort((a, b) => a.prep - b.prep);
        } else if (sortOption === 'prep-desc') {
            result.sort((a, b) => b.prep - a.prep);
        } else if (sortOption === 'cook-asc') {
            result.sort((a, b) => a.cook - b.cook);
        } else if (sortOption === 'cook-desc') {
            result.sort((a, b) => b.cook - a.cook);
        }

        return result;
    }, [searchTerm, maxPrepTime, maxCookTime, sortOption]);


    const handleViewRecipe = (recipe) => {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRecipe(null);
    };

    const handleAddToCart = (recipe) => {
        setAlertMessage(`${recipe.title} has been added to your cart!`);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);

        handleCloseModal();
    };
    return (
        <div>

            <h1
                className="text-center"
                style={{
                    color: '#fc933dff',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                }}
            >
                OUR RECIPES
            </h1>
            <Filter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                maxPrepTime={maxPrepTime}
                setMaxPrepTime={setMaxPrepTime}
                maxCookTime={maxCookTime}
                setMaxCookTime={setMaxCookTime}
                sortOption={sortOption}
                setSortOption={setSortOption}
            />
            {showAlert && (
                <Alert
                    variant="success"
                    onClose={() => setShowAlert(false)}
                    dismissible
                    className="text-center"
                >
                    {alertMessage}
                </Alert>
            )}
            <RecipeList
                recipes={filteredRecipes}
                onViewRecipe={handleViewRecipe}
            />

            <RecipeModal
                recipe={selectedRecipe}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAddToCart={handleAddToCart}
            />
        </div>
    )
}

export default RecipeManagement
