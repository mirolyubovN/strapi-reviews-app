import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        id,
        attributes {
          name
        }
      }
    }
  }
`;
export default function Header() {
  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const actualData = data.categories.data;

  console.log(actualData);

  return (
    <>
      <div className='header'>
        <Link to='/'><h1>Game reviews</h1></Link>
      </div>
      <nav className='categories'>
        <span>Filter reviews by category:</span>
        {actualData.map (cat => (
          <Link key={cat.id} to={`/category/${cat.id}`}>{cat.attributes.name}</Link>
        ))}
      </nav>
   </>
  )
}
