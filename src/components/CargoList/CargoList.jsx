import { Link } from 'react-router-dom'

const CargoList = (props) => {
    return (
        <main>
        {props.cargos.map((cargo) => (
          <Link key={cargo._id} to={`/cargos/${cargo._id}`}>
            <article>
              <header>
                <h2>{cargo.title}</h2>
                <p>
                  {cargo.contact} posted on 
                  {new Date(cargo.createdAt).toLocaleDateString()}
                </p>
              </header>
              <p>{cargo.text}</p>
            </article>
          </Link>
        ))}
        </main>
    );
  };
  
  export default CargoList;