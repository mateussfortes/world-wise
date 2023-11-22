import { useNavigate } from 'react-router-dom';

import Button from './Button';

function ButtonBack({ children, onClick, type}) {
    const navigate = useNavigate();
    return (
        <Button 
          type="back" 
          onClick={ (e) => { e.preventDefault(); navigate(-1)} }
        >Back</Button>
    );
}

export default ButtonBack;