import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import Spinner from '../components/Spinner';

const CATEGORY = gql`
query GetCategory($id: ID!) {
  category(id: $id) {
    data {
      id
      attributes {
        name
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
    }
  }
}
`;

export default function Category() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: {
      id
    }
  });

  if (loading) return <Spinner/>;
  if (error) return <p>Error</p>;

  console.log(data, 'category');

  return (
    <div>
      <h2 class='category-header'>{data.category.data.attributes.name}</h2>
      {data.category.data.attributes.reviews.data.map(review => (
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
