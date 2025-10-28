import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaUtensils } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #8B4513; /* Brown color */
  padding: 1rem 5%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: #FFF8DC; /* Cream color */
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #FFD700; /* Gold color on hover */
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #FFF8DC;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;
  
  &:hover {
    color: #FFD700;
  }
`;

const CartIcon = styled.div`
  position: relative;
  cursor: pointer;
  
  &:hover {
    color: #FFD700;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #FF4500;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
`;

const Navbar = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <FaUtensils /> Kimkles Cravings
        </Logo>
        
        <NavLinks>
          <NavLink to="/">
            <FaHome /> Home
          </NavLink>
          <NavLink to="/menu">
            <FaUtensils /> Menu
          </NavLink>
          <CartIcon onClick={() => navigate('/cart')}>
            <FaShoppingCart size={20} />
            {totalQuantity > 0 && <CartCount>{totalQuantity}</CartCount>}
          </CartIcon>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
