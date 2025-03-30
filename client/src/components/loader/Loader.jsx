import ReactDOM from 'react-dom';
import "./Loading.css";

function Loader() {
  return ReactDOM.createPortal(
    <div className='wrapper'>
      <div className="loader"></div>
    </div>,
    document.getElementById("loader")
  )
}

export default Loader;