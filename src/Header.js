import './Header.css';

function Header() {
  return (<div className="header">
    <img src={process.env.PUBLIC_URL + "/stackline_logo.png"} height={32} alt="Stackline Logo" />
  </div>)
}
export default Header;