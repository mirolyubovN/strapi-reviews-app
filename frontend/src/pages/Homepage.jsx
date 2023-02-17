import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Spinner from '../components/Spinner';

const REVIEWS = gql`
  query GetReviews {
    reviews {
      data {
        id
        attributes {
          title
          body
          rating
          categories {
            data {
              id
              attributes {
              	name
              }
            }
          }
        }
      }
    }
  }
`;

export default function Homepage() {
  const { loading, error, data } = useQuery(REVIEWS);

  console.log(data);

  if (loading) return <Spinner/>;
  if (error) return <p>Error</p>;

  return (
    <div>
      {data.reviews.data.map(review => (
        <div key={review.id} className='review-card'>
          <h2 className='review-card__title'>
            {review.attributes.title}
          </h2>
          <div className='category-meta'>
            {review.attributes.categories.data.map(category => (
              <small key={category.id}>{category.attributes.name} </small>
            ))}
          </div>
          <div className='review-card__rating'>
            {review.attributes.rating}
          </div>
          <div className='review-card__body'>
            {review.attributes.body.substring(0, 200)}...
          </div>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}
