import styled from 'styled-components';
import useDropdown from '../userDropdown';

const Navbar = () => {
  const {
    categoryData,
    hanldeDropDownEnter,
    hanldeDropDownLeave,
    categoryNavigation,
  } = useDropdown();

  return (
    <Nav>
      {categoryData.map((category, index) => (
        <Wrapper key={category.name}>
          <h6
            onMouseEnter={() => hanldeDropDownEnter(index)}
            onMouseLeave={() => hanldeDropDownLeave(index)}
          >
            {category.name}
          </h6>
          <CategoryDropdown
            onMouseEnter={() => hanldeDropDownEnter(index)}
            onMouseLeave={() => hanldeDropDownLeave(index)}
            className="ul-dropdown"
            style={{ display: category.visibility ? 'flex' : 'none' }}
          >
            {category.categories.map((data) => (
              <div key={data.query} className="li-control">
                <li
                  onClick={() => {
                    categoryNavigation(data.query), hanldeDropDownLeave(index);
                  }}
                >
                  {data.list}
                </li>
              </div>
            ))}
          </CategoryDropdown>
        </Wrapper>
      ))}
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  align-items: center;
  max-height: 20%;

  @media (max-width: 1270px) {
    padding: 0 36px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;

  &:hover {
    .ul-dropdown {
      display: flex;
    }
  }

  h6 {
    letter-spacing: 1.4px !important;
    margin-right: 34px;
    color: var(--main-color);
    cursor: pointer;
    font-weight: 800;
    font-size: 12px !important;
  }
`;

const CategoryDropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  transform: translate(-5%);
  width: 190px;
  background-color: white;
  flex-direction: column;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);

  .li-control {
    li {
      color: var(--main-color);
      margin: 16px 12px;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: -0.6px;

      &:hover {
        color: rgba(0, 0, 0, 0.78);
      }
    }
  }
`;

export default Navbar;
