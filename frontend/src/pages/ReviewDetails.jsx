import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function ReviewDetails() {

  const { id } = useParams();

  const { data, loading, error } = useFetch('http://localhost:1337/api/reviews/' + id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className='review-card'>
      <h2 className='review-card__title'>
        {data.attributes.title}
      </h2>
      <div className='review-card__rating'>
        {data.attributes.rating}
      </div>
      <div className='review-card__body'>
        {data.attributes.body}
      </div>
    </div>
  );
}
