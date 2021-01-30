const Heading = ({ headingStyle, headingTitle }) => {
  return (
    <>
      <div className={headingStyle}>
        <h2>{headingTitle}</h2>
      </div>
    </>
  );
}
 
export default Heading;