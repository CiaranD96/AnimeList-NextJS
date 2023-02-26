import Image from 'next/image';
import dayjs from 'dayjs';

export default function ReviewCard({ review }) {
  const reviewDate = dayjs(review.date).format('DD/MM/YYYY');

  return (
    <div className='review-card'>
      <div className='review-section'>
        <Image
          src={review.user.images.webp.image_url}
          height={150}
          width={150}
          alt='review user profile picture'
          className='review-user-pic'
        />
        <p>
          Score: <strong className='score'>{review.score}/10</strong>
        </p>
        <p>Preliminary: {review.is_preliminary ? 'Yes' : 'No'}</p>
        <p>Spoilers: {review.spoilers ? 'Contains Spoilers' : 'None'}</p>
        <p>
          Episodes Watched:{' '}
          {review.episodes_watched !== null ? review.epsides_watched : 'N/A'}
        </p>
      </div>

      <div className='review-body'>
        <div className='review-title'>
          <h3>{review.user.username}</h3>
          <p>{reviewDate}</p>
          <div className='review-tags'>
            {review.tags.length > 0 &&
              review.tags.map((tag) => (
                <p key={tag} className='tag'>
                  {tag}
                </p>
              ))}
          </div>
        </div>

        <div className='review-contents'>{review.review}</div>
      </div>
    </div>
  );
}
