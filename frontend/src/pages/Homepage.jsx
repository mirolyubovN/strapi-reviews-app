import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

export default function Homepage() {
  const {loading, error, data} = useFetch('http://localhost:1337/api/reviews');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      {data.map(review => (
        <div key={review.id} className='review-card'>
          <h2 className='review-card__title'>
            {review.attributes.title}
          </h2>
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
