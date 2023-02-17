import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const REVIEW = gql`
query GetReview($id: ID!) {
  review(id: $id) {
    data {
      id
      attributes {
        title,
        rating,
        body
      }
    }
  }
}
`;

export default function ReviewDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(REVIEW, {
    variables: {
      id
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log(data.review.data);

  const actualData = data.review.data.attributes;

  return (
    <div className='review-card'>
      <h2 className='review-card__title'>
        {actualData.title}
      </h2>
      <div className='review-card__rating'>
        {actualData.rating}
      </div>
      <div className='review-card__body'>
        {actualData.body}
      </div>
    </div>
  );
}
