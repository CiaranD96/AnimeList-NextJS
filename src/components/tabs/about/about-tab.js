export default function AboutTab({ description, trailer }) {
  return (
    <div className='about-tab'>
      {trailer && (
        <div className='show-trailer'>
          <iframe
            title='anime trailer'
            src={`${trailer}?autoplay=0`}
            height='415'
            width='620'
            className='show-trailer-frame'
          ></iframe>
        </div>
      )}
      <p className='show-description'>{description}</p>
    </div>
  );
}
